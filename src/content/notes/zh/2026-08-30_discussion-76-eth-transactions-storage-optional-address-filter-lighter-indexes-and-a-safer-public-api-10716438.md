---
title: "ETH-transactions-storage：可选地址过滤、更轻量的索引以及更安全的公共 API"
slug: "discussion-76-eth-transactions-storage-optional-address-filter-lighter-indexes-and-a-safer-public-api-10716438"
description: "ETH-transactions-storage 是一个自托管的以太坊索引器，它通过跟踪以太坊节点，将原生 ETH 和 ERC-20 transfer(address,uint256) 活动存储在 PostgreSQL 中，并提供 REST API。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/76"
publishedAt: "2026-08-30T20:51:54Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10716438"
locale: "zh"
placeholder: false
---

[ETH-transactions-storage](https://github.com/Adamant-im/ETH-transactions-storage) 是一个自托管的以太坊索引器，它通过跟踪以太坊节点，将原生 ETH 和 ERC-20 `transfer(address,uint256)` 活动存储在 PostgreSQL 中，并通过 PostgREST 以只读 REST API 的形式对外提供服务。由于以太坊节点无法直接响应地址历史查询，钱包、DApp、金库和运营商通常依赖第三方浏览器。本项目为您提供了一个可自行运行的替代方案——无需 API 密钥供应商，无追踪，无遥测。

`dev` 分支现已包含**可选地址过滤器**，该功能已在 [PR #29](https://github.com/Adamant-im/ETH-transactions-storage/pull/29) 中合并。全链索引仍为默认设置，这也是 ADAMANT 钱包所使用的模式。过滤模式主要面向那些仅需关注特定地址集合、且不希望存储全链数据的运营商。

## 为什么需要过滤器

公共以太坊索引器是一个庞大的数据库。在约 4.9 亿行数据的一年期主网数据集中，传统的全量索引集会占用数百 GB 的空间。许多运营商并不需要如此大规模的存储——无论是仅服务于自身用户的钱包或托管后端、监控少量运营地址的项目金库、针对特定应用地址集的自托管浏览器，还是需要保持轻量化的实验室和 CI 环境，都能从选择性存储中获益。该过滤器保留了现有的 API 契约：客户端依然可以查询 `/ethtxs`、`/max_block` 和 `/aval`。运营商改变的是存储内容，而非读取方式。

## 地址过滤器行为

过滤器默认处于禁用状态 (`ADDRESS_FILTER_ENABLED=false`)。启用后，`ADDRESS_FILTER_FILE` 将指向一个私有列表（默认为 `filter/addresses.txt`，该文件已被 gitignore 且不会复制到 Docker 镜像中）。列表每行接受一个以 `0x` 开头的 40 位十六进制地址，空行和以 `#` 开头的注释将被忽略，匹配不区分大小写。原生转账匹配 `txfrom` 或 `txto`。支持的 ERC-20 `transfer(address,uint256)` 调用匹配发送方 (`txfrom`)、代币合约 (`txto`) 以及 ABI 编码的接收方 (`contract_to`)。

列表会在每次同步前重新加载，因此有效的添加和删除操作无需重启索引器即可生效。无效、为空或缺失的列表将触发“故障安全”机制：索引进程将停止，直到文件被修正，而不是静默存储所有数据。对于过滤器拒绝的交易，将跳过回执 RPC。

现有的索引器限制保持不变：过滤器不会捕获内部 ETH 转账、非直接 `transfer(address,uint256)` 的 ERC-20 流（如 `transferFrom`、路由器、多签或批量/聚合调用），也不会在添加地址时自动回填历史数据。启用过滤器不会删除已存储的行。重建索引需由运营商手动操作：停止索引器，在同一个事务中截断 `ethtxs` 和 `sync_state`（或将两者回滚至区块 `N`），设置 `START_BLOCK`，然后重启。仅截断 `ethtxs` 不会触发重新扫描，因为检查点仍会将链状态报告为已完成。

## 持久化同步进度

过滤后的区块和空区块此前会被视为“无事发生”，导致索引器反复扫描。`dev` 分支现在维护一个单行 `public.sync_state` 检查点，并在处理该区块的插入操作时在同一个 PostgreSQL 事务中进行更新。`/max_block` 端点依然返回 `{ max, version }`，其中 `max` 为 `GREATEST(MAX(ethtxs.block), sync_state.last_block)`。启动时依然会回滚最后处理的区块，现在该操作与检查点更新是原子的。`create_tables.sql` 脚本具有幂等性：它会创建 `sync_state`，从现有的最高交易区块进行初始化，并在角色存在时向 `api_user` 和 `app_user` 授予 DML 权限。`web_anon` 角色无法直接读取或写入 `sync_state`。

## 索引、API 加固与运维

地址过滤器基于 [PR #28](https://github.com/Adamant-im/ETH-transactions-storage/pull/28) 中的其他 `dev` 工作构建，该版本尚未发布 GitHub Release（最新标签仍为 [v2.4.1](https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.4.1)）。一套最小化的五个索引集即可覆盖 ADAMANT Web 和 iOS 的查询需求，与传统的八个索引集相比，每一年数据集可节省约 90–110 GB 的空间。PostgREST 的匿名角色 `web_anon` 现在仅对 `ethtxs`、`aval` 和 `max_block` 拥有 `SELECT` 权限，且通过 `db-max-rows = 10000` 限制了序列化结果的大小，防止无限制的 `GET /ethtxs` 导致 API 内存溢出 (OOM)。

公共部署现已增加 nginx 防护：包含方法白名单 (`GET`/`HEAD`/`OPTIONS`)，要求 `/ethtxs` 必须包含 `txfrom` 或 `txto` 参数，并拒绝 `Prefer: count=exact` 和巨大的偏移量。`.env` 工作流现已通过模板记录，密钥不会提交到 Git，Compose 也不再包含硬编码的数据库密码。数据库诊断更加安全——连接 URI 可正确工作，且密码会从日志中脱敏。`AGENTS.md` 文件定义了存储库的贡献者和运营商契约。

现有的 systemd 主机应在代码和模式升级期间保留当前的 unit 文件。在启动新索引器之前，请使用 `ON_ERROR_STOP` 应用 `create_tables.sql`，并且在存在等效值的生产环境 `.env` 文件之前，不要复制存储库中的 `ethsync.service`。

## 适用场景

ADAMANT 使用此索引器，以便 [adamant-im](https://github.com/Adamant-im/adamant-im) 和 [adamant-iOS](https://github.com/Adamant-im/adamant-iOS) 能够在无需中心化浏览器的情况下显示以太坊和 ERC-20 历史记录。该二进制文件是一个通用的开源服务，适用于钱包、支付处理器、代币发行方以及任何希望在自己的 PostgreSQL 和访问策略下管理地址索引以太坊历史记录的用户。您可以选择自托管，为公共 API 保留全链模式，或者启用过滤器仅存储您实际服务的地址。

---
title: "ETH Transactions Storage 2.5.0：自主托管的地址历史记录"
slug: "eth-transactions-storage-2-5-0-address-history-you-host-yourself-b957c243edf3"
description: "以太坊执行客户端可以提供链头、区块、回执或日志，但无法回答钱包界面打开时最常问的问题：哪些交易涉及此地址，且按最新时间排序？"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/eth-transactions-storage-2-5-0-address-history-you-host-yourself-b957c243edf3"
publishedAt: "2026-09-05T14:44:58.348Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:b957c243edf3"
coverImage: "/images/engineering-notes/medium/b957c243edf3/001-a6ae0683b6.webp"
locale: "zh"
placeholder: false
---

以太坊执行客户端可以提供链头、区块、回执或日志，但无法回答钱包界面打开时最常问的问题：哪些交易涉及此地址，且按最新时间排序？公共索引器可以回答这个问题，但它们会记录用户查询的每一个地址，在流量增长时进行限速，且可能随时更改定价或停止服务。如果交易历史记录是您产品的一部分，那么这种依赖关系就处于关键路径上。

ETH Transactions Storage 是一个自托管索引器，它从您的以太坊节点读取区块，将原生 ETH 转账和 ERC-20 转账调用写入 PostgreSQL 数据库，并通过只读 REST API 提供地址历史记录。它没有遥测功能，不涉及第三方账户，且仅有两个出站连接：您配置的节点和数据库。其架构非常直观：以太坊节点 → ethsync.py → PostgreSQL → PostgREST → 您的应用程序。它适用于通过 HTTP、WebSocket 或 IPC 连接的 Geth、Nethermind、Besu 和 Erigon，以及任何暴露相同 JSON-RPC 接口的 EVM 兼容网络。

2.5.0 版本将这一构想转化为可分发、可操作且文档齐全的软件。生产环境中使用的 API 契约保持不变，但其底层软件已全面更新。此版本引入了可靠的同步机制、更精简的推荐索引集、可选地址过滤、明确的安全模型、已发布的容器镜像以及配套的文档网站。

### 可靠的同步与地址过滤

每个区块及其检查点都在同一个数据库事务中写入。重启后可以精确地从停止处恢复。启动时，索引器会移除最高区块并回退一步，确保崩溃后不会残留部分写入的区块。空区块和被过滤的区块不再干扰游标；即使在没有存储任何行的情况下，专用的 `sync_state` 行也会记录最后处理的高度。数据库错误会触发回滚并重试，而不是让检查点领先于数据。

全链历史记录是公共钱包 API 的正确默认设置，但对于预先已知地址集的财务监控或支持工具来说则不然。2.5.0 版本增加了可选的地址过滤器。加载后，索引器仅在发送方、原生接收方或代币接收方匹配时才存储转账记录。该列表在进程运行时可以重新加载。验证过程严格且采用故障关闭（fail-closed）原则：如果无法读取列表，索引过程将不会继续使用空过滤器。请注意，启用过滤器或添加地址不会回填先前的区块，因此请在启动前规划好所需的历史记录。

### 优化索引与安全性

推荐的数据库集现在包含五个 B-tree 索引，这些索引源自真实的生产查询流量，而非为每个潜在有用的列建立索引。在约 4.9 亿行的数据集上，这套更小的索引预计可节省 90–110 GB 的空间。在地址字段上使用 `citext` 可以在不使用 `LOWER()` 包装每个查询的情况下保持匹配的大小写不敏感。

索引器用户拥有写入权限，但公共 API 不应拥有。此版本记录并发布了一个 `web_anon` 角色，仅对 `ethtxs`、`aval` 和 `max_block` 拥有 SELECT 权限。PostgREST 的单次响应被限制在 10,000 行以内。安全指南涵盖了公共部署的反向代理规则，包括方法白名单、`/ethtxs` 上的强制地址过滤，以及针对昂贵的计数聚合和无界偏移量的防护。凭据从 `.env` 加载，支持 PostgreSQL 连接 URI，且诊断信息会屏蔽密码。

### 容器与 API 契约

发布的镜像为 `ghcr.io/adamant-im/eth-transactions-storage:2.5.0`，支持 linux/amd64 和 linux/arm64 架构。版本标签是不可变的；请在生产环境中锁定 2.5.0 版本。Docker Compose 默认运行此镜像，并配合 PostgreSQL、PostgREST、可选的本地 Geth 以及索引器。位于 eth-indexer.docs.adamant.im 的文档网站提供了架构、快速入门、配置和安全细节。

如此大规模的版本更新只有在现有客户端保持兼容的前提下才有意义。我们做到了。`/ethtxs`、`/max_block` 和 `/aval` 端点保持不变。

原生 ETH 转账，单次请求：

```http
GET /ethtxs?and=(contract_to.eq.,or(txfrom.eq.{address},txto.eq.{address}))&order=time.desc&limit=25
```

代币合约的 ERC-20 转账：

```http
GET /ethtxs?and=(txto.eq.{contract_address},or(txfrom.eq.{address},contract_to.eq.000000000000000000000000{address_without_0x}))&order=time.desc&limit=25
```

健康检查：

```http
GET /max_block
GET /aval
```

列名、编码和大小写不敏感的地址保持不变。`contract_to` 字段前导的 24 个零是 ABI 填充，并非以后需要清理的冗余数据。

### 范围与局限性

该索引器存储非零值的原生 ETH 转账，以及作为直接顶级 `transfer(address,uint256)` 调用提交的 ERC-20 转账。它不存储内部 ETH 转账、`transferFrom`、多重签名或路由流、其他代币标准或事件日志。索引器不会在事后自动修复深度的链重组；`CONFIRMATIONS_BLOCK` 使其保持在链头之后，这意味着深度重组需要对受影响的范围进行计划内的重新索引。如果您的应用程序必须反映每一种可能的代币变动，您需要一个基于日志的索引器。如果它只需要用户发起的转账（即钱包实际显示的历史记录），那么此工具正是为此而生，且运行成本低廉。

现有运维人员在部署前应阅读升级指南。请先应用增量模式，保留生产环境的值，不要将 Compose 镜像标签的升级视为 PostgreSQL 的升级。ETH Transactions Storage 是由 ADAMANT 开发者社区和 cryptofoundry 维护的开源基础设施。

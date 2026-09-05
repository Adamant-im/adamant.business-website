---
title: "ETH Transactions Storage v2.5.0"
slug: "release-eth-transactions-storage-v2-5-0-382952479"
description: "ETH Transactions Storage v2.5.0 将该项目转变为一个文档化、可分发的自托管以太坊交易索引器和 REST API 后端，适用于钱包、浏览器、会计和财务工具等。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.5.0"
publishedAt: "2026-09-04T18:56:20Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "ETH-transactions-storage"
tag: "v2.5.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:382952479"
locale: "zh"
placeholder: false
---

ETH Transactions Storage v2.5.0 将该项目转变为一个文档化、可分发的自托管以太坊交易索引器和 REST API 后端，适用于钱包、浏览器、会计和财务工具、监控服务以及自定义应用程序。它保留了 ADAMANT 客户端在生产环境中使用的现有 PostgREST API 契约。

此版本增加了可靠的逐块交易处理和检查点、启动恢复、数据库回滚和重试机制，以及处理空块或过滤块的进度跟踪。现在提供基于地址的可选索引功能，支持验证、发送方、原生接收方和代币接收方匹配、实时列表重载以及故障关闭行为。推荐的数据库索引集减少为 5 个，之前的 3 个索引可单独用于自定义查询；较小的索引集在约 4.9 亿行数据中估计可节省 90–110 GB 空间。新增了附加的 `sync_state` 模式、只读 `web_anon` 访问权限、10,000 行的 PostgREST 响应上限，以及保护公共 API 部署的指南。包含对 PostgreSQL 连接 URI 的支持（带凭据脱敏）、`.env` 加载、受限的 Python 依赖项、更新的诊断信息以及修订后的 systemd 单元。增加了 Python 3.11 容器、发布镜像的 Compose 设置、独立的本地构建覆盖、OCI 元数据以及由发布驱动的多架构 GHCR 发布。VitePress 文档站点位于 <https://eth-indexer.docs.adamant.im>，包含可重现的 Node 工具、文档 CI、Pages 部署和贡献者指南。该项目现已重新定位，可供任何兼容的消费者使用，同时保留了 ADAMANT 的所有权、来源证明和生产兼容性证据。

## 升级要求

在升级前，请停止现有的索引器并更新完整的检出代码。在启动 v2.5.0 之前，请以 PostgreSQL 管理员身份应用新模式：

```bash
sudo -u postgres psql -v ON_ERROR_STOP=1 -d index < create_tables.sql
```

然后为手动或 systemd 部署安装声明的 Python 依赖项：

```bash
pip3 install -r requirements.txt
```

请保留所有生产环境的值和凭据；存储库的 systemd 模板现在需要有效的 `.env` 文件。在使用 Docker Compose 之前，请设置 `POSTGRES_PASSWORD`。在采用 Compose PostgreSQL 14 镜像之前，请正确迁移现有的 PostgreSQL 12 数据；仅更改镜像标签并不等同于升级。在删除旧索引之前，请创建并验证推荐的索引集；在实时数据库上使用并发索引操作。在将 PostgREST 更改为 `web_anon` 之前，请应用 `create_tables.sql`，否则匿名 API 请求将会失败。请明确规划过滤后的历史记录：启用地址过滤器或添加地址不会回填之前的区块。

在部署此版本之前，请参阅 <https://eth-indexer.docs.adamant.im/guide/upgrading> 上的完整升级指南。

## 兼容性和当前范围

`/ethtxs`、`/max_block` 和 `/aval` 端点、数据库列、不区分大小写的地址处理、值编码以及已建立的客户端查询形状保持兼容。`/max_block.max` 现在也反映了未存储交易行的已处理区块。

索引器继续存储原生 ETH 转账和直接的顶级 ERC-20 `transfer(address,uint256)` 调用。它不索引内部 ETH 转账、`transferFrom`、多重签名、路由或批量流、其他代币标准或自动的深度重组修正。

## 分发

发布此稳定版本会触发 `linux/amd64` 和 `linux/arm64` 镜像的构建：

```text
ghcr.io/adamant-im/eth-transactions-storage:2.5.0
ghcr.io/adamant-im/eth-transactions-storage:latest
```

版本镜像标签是不可变的。在生产环境中，请锁定 `2.5.0` 而非 `latest`。

## 验证

所有 12 个 Python 单元测试均已通过。Python 语法、格式化、Markdown linting 和 VitePress 构建均已通过。在发布合并提交时，容器构建、操作员状态排除、OCI 元数据、两种 Compose 配置、API 进度和检查点重启冒烟测试均已通过。文档部署已通过，站点通过强制 HTTPS 提供服务。生产服务已部署并由其操作员确认运行状况良好。

包含的工作：#27、#28、#29、#31 和 #33。跟踪议题：#32。完整变更日志：<https://github.com/Adamant-im/ETH-transactions-storage/compare/v2.4.1...v2.5.0>。

### 重大变更

新的 `sync_state` 模式必须在启动 v2.5.0 之前通过 `create_tables.sql` 应用，并且必须在将 PostgREST 切换到 `web_anon` 之前应用，否则匿名 API 请求将会失败。systemd 模板现在需要有效的 `.env` 文件，因此没有该文件的现有部署在创建之前将无法启动。启用地址过滤器或添加地址不会回填之前的区块，这意味着除非操作员采取明确行动，否则之前未索引的历史记录将不会被追溯捕获。

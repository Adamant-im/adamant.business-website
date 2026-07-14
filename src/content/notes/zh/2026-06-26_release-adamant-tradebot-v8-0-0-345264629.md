---
title: "ADAMANT Tradebot v8.0.0"
slug: "release-adamant-tradebot-v8-0-0-345264629"
description: "ADAMANT Tradebot v8.0.0 是一个重大版本更新，将包版本从 7.0.1 升级至 8.0.0。启动流程已重构，支持数据库迁移和启动预热。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v8.0.0"
publishedAt: "2026-06-26T10:47:34Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v8.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:345264629"
locale: "zh"
placeholder: false
---

ADAMANT Tradebot v8.0.0 是一个开源做市机器人的重要版本发布，包版本从 7.0.1 升级至 8.0.0。

启动流程已重构，支持数据库迁移和启动预热。ADM 命令处理器现在以模块化形式组织在 `modules/commands/` 目录下，并引入了新的 ADM 交易处理管道，包含 `adamantApi`、`admTxChecker` 和 `admTxParser` 组件。

新增了一个可选的 WebUI API，基于 Fastify HTTP 构建，支持 JWT 认证、Zod 校验和 Socket.IO 传输。该 API 提供了账户、机器人状态、命令、市场数据、消息和交易参数的接口。

交易所连接器已更新：移除了 XeggeX，FameEX 已迁移到 FameEXnet，Azbit、P2PB2B、NonKYC、Coinstore 和 StakeCube 均已完成更新。

运行环境现在要求 Node.js v22.2+，并依赖 `adamant-api` 3.x 和 `mongodb` 7.x。开发工具已升级至 ESLint 10，Jest 测试套件已扩展，`types/` 目录下的 JSDoc 覆盖率也得到提升。文档方面新增了 `CONTRIBUTING.md`，并对 `README.md` 和 `config.default.jsonc` 进行了更新。

升级方法：拉取最新代码，安装依赖，审查并将 `config.jsonc` 与 `config.default.jsonc` 合并，然后启动机器人。

```bash
git pull
npm i
# Review and merge config.jsonc with config.default.jsonc
npm start
```

### 重大变更

现在要求 Node.js v22.2+，此前的最低要求为 v18+。数据库迁移将订单字段 `type` 重命名为 `side`。配置模式的变更需要审查 `config.default.jsonc` 并将更新合并到现有配置中。XeggeX 已被移除，FameEX 用户必须切换至 FameEXnet 连接器。许可证元数据已更改为 `UNLICENSED` 并设置 `private: true`。

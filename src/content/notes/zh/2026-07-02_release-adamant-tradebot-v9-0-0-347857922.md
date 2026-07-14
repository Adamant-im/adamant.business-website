---
title: "ADAMANT Tradebot v9.0.0"
slug: "release-adamant-tradebot-v9-0-0-347857922"
description: "ADAMANT Tradebot v9.0.0 是首个可分发的开源做市机器人版本，包版本从 8.0.0 升级至 9.0.0。安装方法、功能亮点、架构改进及 breaking 变更说明。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0"
publishedAt: "2026-07-02T06:12:07Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v9.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:347857922"
locale: "zh"
placeholder: false
---

# ADAMANT Tradebot v9.0.0

这是首个可分发的开源做市机器人的发布版本。包版本从 8.0.0 升级至 9.0.0。

## 安装

```bash
npm install -g adamant-tradebot
mm init
```

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

## 功能亮点

### 分发方式

机器人现在以 npm 包 `adamant-tradebot` 的形式发布，提供 `mm` 命令行工具，支持 `mm init`、`mm on`、`mm off`、`mm doctor` 等命令。Docker 镜像已发布至 GHCR，地址为 `ghcr.io/adamant-im/adamant-tradebot`，并附带用于 MongoDB 和本地运行的 `docker-compose` 堆栈。GitHub Actions 的发布工作流会自动将版本推送至 npm 和 GHCR。

### 架构（自 v8 基线以来）

代码库现在在 `modules/commands/` 下实现了模块化的 ADM 命令处理器。基于 Fastify、JWT、Zod 和 Socket.IO 建立了 WebUI API 基础架构。MM 模块——交易器（trader）、订单簿构建器（order book builder）、流动性提供者（liquidity provider）和价格监视器（price watcher）——均已重构。`types/` 下的 JSDoc 类型定义已扩展，并新增了 Jest 测试和 ESLint 扁平化配置。

### 交易所连接器

目前支持的交易所包括 Azbit、Coinstore、FameEXnet、NonKYC、P2PB2B 和 StakeCube。已移除 Bit-Z、CoinDeal 和 IDCM 的旧版连接器。

### 文档

README 已针对代币发行方和自托管做市场景进行全面重构。新增了 `CONTRIBUTING.md` 文件和 AI 代理操作说明。

### Breaking 变更

配置现采用 `config.default.jsonc` 结合 `mm init` 命令生成，不再使用提交至仓库的 `config.json` 文件。需要 Node.js v22.2 或更高版本。已移除旧版交易所连接器，用户必须迁移至受支持的交易所。npm 和本地安装的生命周期现由 CLI 命令 `mm on` 和 `mm off` 驱动。

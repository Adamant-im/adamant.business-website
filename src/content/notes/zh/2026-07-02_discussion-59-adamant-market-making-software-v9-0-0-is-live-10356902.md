---
title: "ADAMANT Market-Making Software v9.0.0 is live"
slug: "discussion-59-adamant-market-making-software-v9-0-0-is-live-10356902"
description: "ADAMANT 做市软件 v9.0.0 已发布。首个开源 ADAMANT 做市机器人公开版本现已上线，支持自托管，使用您自己的密钥在交易所账户上运行，无需第三方托管。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/59"
publishedAt: "2026-07-02T06:58:44Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10356902"
locale: "zh"
placeholder: false
---

# ADAMANT Market-Making Software v9.0.0 is live

首个开源 ADAMANT 做市机器人的公开版本现已上线。该软件支持自托管：您使用自己的密钥在自己的交易所账户上运行，不涉及任何第三方托管。

## 安装

该机器人以 npm 包和 Docker 镜像两种形式发布。

**npm (CLI `mm`):**

```bash
npm install -g adamant-tradebot
mm init
mm on
```

**Docker (GHCR):**

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

此外还提供了一个基于 `docker-compose` 的 shell 包装脚本；详情请参见 [README](https://github.com/Adamant-im/adamant-tradebot#readme)。

## v9.0.0 版本更新内容

本次发布引入了 `mm` 命令行工具，包含 `init`、`on`、`off`、`doctor`、`status` 和 `logs` 等命令，同时提供了托管在 GHCR 上的公开 Docker 镜像。做市引擎已重构为模块化组件，涵盖交易员（trader）、订单簿构建器（order book builder）、流动性提供者（liquidity provider）和价格监控器（price watcher）。目前已集成 Azbit、Coinstore、FameEXnet、NonKYC、P2PB2B 和 StakeCube 的交易所连接器。此外，本版本为 WebUI API 奠定了基础，并附带测试用例和更完善的文档。

[GitHub](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0) 上可查看发布说明和源代码。npm 包发布于 [npmjs.com](https://www.npmjs.com/package/adamant-tradebot)。

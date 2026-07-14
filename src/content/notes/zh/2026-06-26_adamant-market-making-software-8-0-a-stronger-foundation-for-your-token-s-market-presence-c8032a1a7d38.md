---
title: "ADAMANT Tradebot 8.0：为自托管做市提供更强大的基础"
slug: "adamant-market-making-software-8-0-a-stronger-foundation-for-your-token-s-market-presence-c8032a1a7d38"
description: "ADAMANT Tradebot 8.0 是多年来最大的开源更新。对于代币发行方而言，上架与真正市场的差距是真实存在的：稀疏的订单簿吓退交易者，过宽的价差增加交易成本。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-software-8-0-a-stronger-foundation-for-your-tokens-market-presence-c8032a1a7d38"
publishedAt: "2026-06-26T15:58:19.696Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/c8032a1a7d38/001-0-qywflgfw1krzccj5-png.webp"
cardSpan: "full"
originalId: "medium:c8032a1a7d38"
locale: "zh"
placeholder: false
---

版本 8.0 是多年来对开源 ADAMANT Tradebot 最重大的一次更新。对于代币发行方而言，上架与真正市场的差距是真实存在的：稀疏的订单簿吓退交易者，过宽的价差让每一笔兑换都变得昂贵，订单簿中的缺口则显得项目方疏于管理。该机器人通过在您的代币实际挂牌的交易所上维持价差、流动性和交易量策略，来填补这一鸿沟。

核心理念保持不变。您将机器人部署在自己的 VPS 上，通过 API 密钥连接到交易所，这些密钥始终保留在您的基础设施内，且您可以控制谁能够发送指令。版本 8.0 让机器人变得更可靠、更安全、更易于长期运维——从一个需要您时刻看护的工具，转变为可无人值守运行的基础设施。

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/002-1-swca0-a2gacbe1zvi17jjq-png.webp)

### 运维安全

版本 8.0 更新了依赖项，确保无高危或严重漏洞，收紧了可选管理 API 的访问模式，并将代码库与商业产品线采用的工程基线对齐——同时不引入仅限高级版的功能。您的交易所 API 密钥永远不会传输至 ADAMANT 或任何 SaaS 仪表盘。

### 管理接口

机器人可通过 ADAMANT Messenger（原始的加密、去中心化命令通道）、Telegram（高级版机器人提供）以及正在开发中的 Web UI 进行控制。底层方面，版本 8.0 新增了一个基于 Fastify 构建的现代化私有 WebUI API，支持 JWT 认证、请求模式验证，并通过 WebSocket 实现实时更新。对于大多数操作者而言，这些变化是透明的——您只会感受到启用 Web UI 后管理体验更流畅、更可靠。

日常操作中，您仍可执行以往的所有任务：查看余额、调整价差、启用交易量策略、设置价格区间、在市场异常时暂停模块。不同的是，底层机器人现在能更可靠地处理这些指令。

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/003-1-6ltktmqgyhhs6pniej4dcq-png.webp)

### 交易所支持

开源版机器人支持一组精选的中心化交易所：Azbit、P2PB2B、StakeCube、Coinstore、FameEX（通过 FameEXnet —— v8.0 中更新的连接器）以及 NonKYC。FameEX 用户请注意，机器人现在连接的是 FameEXnet，因此升级需要计划性地切换连接器，而不仅仅是简单的 `git pull`。免费版机器人专注于现货市场，采用以 REST 为主的架构，不支持复杂的期货功能。更广泛的 CEX 支持和高级策略模块属于 Premium 产品线。

### 底层改进

旧的单体式命令处理器已被拆分为专注的模块。ADAMANT 交易处理已基于 `adamant-api` 3.x 重建。启动时会等待数据库就绪，自动运行迁移以安全升级旧版订单数据，预热交易所元数据，之后才启动交易循环。

运行环境目标为 Node.js 22.2+，搭配 MongoDB 驱动 7.x 和更新的 HTTP 栈。私有 WebUI 层使用 JWT、模式验证、IP 白名单以及默认仅限本地访问的设置，确保管理便利性不会成为攻击面。新增的自动化测试套件覆盖了 WebUI API 和核心辅助模块，使技术团队在升级时更有信心。

### 升级说明

新项目可通过以下命令快速启动：

```bash
git clone https://github.com/Adamant-im/adamant-tradebot
cd adamant-tradebot
npm i
cp config.default.jsonc config.jsonc
# edit config.jsonc - pair, API keys, spread/volume settings
npm start
```

现有 v7.x 安装用户应先停止机器人，然后拉取更新、重新安装，将 `config.default.jsonc` 中的任何新字段合并到 `config.jsonc`，最后重启：

```bash
pm2 stop tradebot
git pull
npm i
# merge new config.default.jsonc fields into your config.jsonc
pm2 restart tradebot
```

本次发布在 [GitHub PR #110](https://github.com/Adamant-im/adamant-tradebot/pull/110) 中跟踪，并关闭了汇总问题 [#109](https://github.com/Adamant-im/adamant-tradebot/issues/109)。完整的安装和命令参考文档请见 [marketmaking.app](https://marketmaking.app/cex-mm/installation/)。

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/004-0-fcjgeqhiqq-h0grv-png.webp)

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/005-0-8ihrvb-is-qsshbb-png.webp)

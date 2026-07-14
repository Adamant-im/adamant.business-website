---
title: "ADAMANT Tradebot 8.0: A Stronger Foundation for Self-Hosted Market Making"
slug: "adamant-market-making-software-8-0-a-stronger-foundation-for-your-token-s-market-presence-c8032a1a7d38"
description: "Version 8.0 is the biggest update to the open source ADAMANT Tradebot in years. For token issuers, the gap between having a listing and having a market is real: a thin order boo…"
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
locale: "en"
placeholder: false
---

Version 8.0 is the biggest update to the open-source ADAMANT Tradebot in years. For token issuers, the gap between having a listing and having a market is real: a thin order book scares away traders, a wide spread makes every swap expensive, and gaps in the book look like neglect. The bot closes that gap by maintaining spread, liquidity, and volume policies on the exchanges where your token actually lists.

The core proposition is unchanged. You host the bot on your own VPS, connect it to your exchange via API keys that never leave your infrastructure, and control who can send commands. Version 8.0 makes the bot more reliable, more secure, and easier to operate long-term—shifting from something that works if you babysit it to infrastructure built to run unattended.

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/002-1-swca0-a2gacbe1zvi17jjq-png.webp)

### Operational security

Version 8.0 refreshes dependencies with a clean high/critical audit posture, tightens access patterns for optional management APIs, and aligns the codebase with the same engineering baseline used in the commercial product line—without pulling in premium-only features. Your exchange API keys never go to ADAMANT or any SaaS dashboard.

### Management interfaces

The bot can be controlled through ADAMANT Messenger (the original encrypted, decentralized command channel), Telegram (available in the Premium bot), and a Web UI currently in development. Under the hood, version 8.0 adds a modern private WebUI API built on Fastify with JWT authentication, validated request schemas, and real-time updates over WebSocket. For most operators this stays invisible—you just get a snappier, more dependable management experience when Web UI is enabled.

Day to day, you still do what you always did: check balances, tune spread, enable volume policies, set price ranges, and pause modules when the market gets weird. The difference is the bot underneath now handles those commands more predictably.

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/003-1-6ltktmqgyhhs6pniej4dcq-png.webp)

### Exchange support

The open-source bot supports a focused set of centralized exchanges: Azbit, P2PB2B, StakeCube, Coinstore, FameEX (via FameEXnet—updated connector in v8.0), and NonKYC. FameEX users should note that the bot now talks to FameEXnet, so upgrading requires a planned connector switch rather than a simple `git pull`. The free bot stays deliberately focused on spot markets with a REST-first approach and no futures complexity. Broader CEX coverage and advanced strategy modules are part of the Premium product line.

### Under the hood

The old monolithic command handler has been split into focused modules. ADAMANT transaction intake was rebuilt on `adamant-api` 3.x. Startup now waits for the database, runs automatic migrations so legacy order data upgrades safely, warms up exchange metadata, and only then starts trading loops.

The runtime targets Node.js 22.2+ with MongoDB driver 7.x and an updated HTTP stack. The private WebUI layer uses JWT, schema validation, IP allowlists, and localhost-first defaults so management convenience does not become an attack surface. New automated test suites cover the WebUI API and core helpers, making upgrades less of a leap of faith for technical teams.

### Upgrading

New projects can get started with:

```bash
git clone https://github.com/Adamant-im/adamant-tradebot
cd adamant-tradebot
npm i
cp config.default.jsonc config.jsonc
# edit config.jsonc - pair, API keys, spread/volume settings
npm start
```

Existing v7.x installations should stop the bot, pull, reinstall, merge any new fields from `config.default.jsonc` into `config.jsonc`, then restart:

```bash
pm2 stop tradebot
git pull
npm i
# merge new config.default.jsonc fields into your config.jsonc
pm2 restart tradebot
```

The release is tracked in [GitHub PR #110](https://github.com/Adamant-im/adamant-tradebot/pull/110) and closes umbrella issue [#109](https://github.com/Adamant-im/adamant-tradebot/issues/109). Full installation and command references are available at [marketmaking.app](https://marketmaking.app/cex-mm/installation/).

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/004-0-fcjgeqhiqq-h0grv-png.webp)

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/005-0-8ihrvb-is-qsshbb-png.webp)

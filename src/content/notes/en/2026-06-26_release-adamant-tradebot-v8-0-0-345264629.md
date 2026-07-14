---
title: "ADAMANT Tradebot v8.0.0"
slug: "release-adamant-tradebot-v8-0-0-345264629"
description: "ADAMANT Tradebot v8.0.0 is a major release of the open source market making bot, bumping the package version from 7.0.1 to 8.0.0. The bootstrap flow has been reworked to include…"
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
locale: "en"
placeholder: false
---

ADAMANT Tradebot v8.0.0 is a major release of the open-source market-making bot, bumping the package version from 7.0.1 to 8.0.0.

The bootstrap flow has been reworked to include database migrations and startup warmup. ADM command handlers are now modular under `modules/commands/`, and a new ADM transaction intake pipeline has been introduced with `adamantApi`, `admTxChecker`, and `admTxParser` components.

An optional WebUI API has been added, built on Fastify HTTP with JWT authentication, Zod validation, and Socket.IO transport. It exposes routes for account, bot status, commands, market data, messages, and trade parameters.

Exchange connectors have been updated: XeggeX has been removed, FameEX has been migrated to FameEXnet, and Azbit, P2PB2B, NonKYC, Coinstore, and StakeCube have been updated.

The runtime now requires Node.js v22.2+, along with `adamant-api` 3.x and `mongodb` 7.x. Tooling has been upgraded to ESLint 10, Jest test suites have been expanded, and JSDoc coverage under `types/` has been improved. Documentation additions include `CONTRIBUTING.md`, with updates to `README.md` and `config.default.jsonc`.

To upgrade, pull the latest code, install dependencies, review and merge your `config.jsonc` with `config.default.jsonc`, and start the bot.

```bash
git pull
npm i
# Review and merge config.jsonc with config.default.jsonc
npm start
```

### Breaking changes

Node.js v22.2+ is now required, raised from the previous v18+ baseline. A database migration renames the order field `type` to `side`. Config schema changes require reviewing `config.default.jsonc` and merging updates into existing configs. XeggeX has been removed, and FameEX users must switch to the FameEXnet connector. License metadata has changed to `UNLICENSED` with `private: true`.

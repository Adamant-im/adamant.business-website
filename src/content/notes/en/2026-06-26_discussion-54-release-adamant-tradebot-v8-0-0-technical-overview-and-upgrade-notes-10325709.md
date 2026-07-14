---
title: "Release: adamant-tradebot v8.0.0 — technical overview and upgrade notes"
slug: "discussion-54-release-adamant-tradebot-v8-0-0-technical-overview-and-upgrade-notes-10325709"
description: "Summary ADAMANT tradebot v8.0.0 is now released on the dev branch and tagged as v8.0.0. This major upgrade of the open source (Basic) market making bot realigns the OSS codebase…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/54"
publishedAt: "2026-06-26T16:06:12Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10325709"
locale: "en"
placeholder: false
---

## Summary

ADAMANT tradebot v8.0.0 is now released on the `dev` branch and tagged as v8.0.0. This major upgrade of the open-source (Basic) market-making bot realigns the OSS codebase with the current Premium engineering baseline while keeping OSS scope intact: REST-first, spot-focused, and without Premium-only modules reintroduced. If you operate the bot for a listed token, the practical outcome is a more dependable runtime with cleaner startup, safer upgrades on existing databases, refreshed exchange connectors, and an optional private WebUI API for external clients.

## Architecture

The bootstrap sequence in `app.js` is now explicit and ordered. It waits for the MongoDB connection and `db.ready`, runs registered database migrations, initializes services such as ADM socket/polling and optional WebUI API, warms up connector metadata, and finally starts active `mm_*` trading modules. This reduces race conditions on cold starts and makes upgrades safer.

The monolithic `modules/commandTxs.js` was split into focused handlers under `modules/commands/` (account, orders, trade, info, features) alongside shared plumbing. Commands still arrive via ADAMANT Messenger and Telegram where configured, but the code path is easier to maintain. Legacy ADM intake modules were replaced with `adamantApi.js`, `admTxChecker.js`, and `admTxParser.js`, aligning command intake with `adamant-api` 3.x and current socket/polling patterns.

Database migrations run one-off at startup via `modules/dbMigrations.js`. The first included migration safely renames the legacy order field `type` to `side`. Existing deployments should back up MongoDB before the first v8 start, then verify open orders and stats after migration.

## Optional WebUI API (Bot API v1)

v8.0 ships a private HTTP API located in the `api/` directory. It uses a Fastify HTTP server with JWT authentication, Zod request validation, and Socket.IO for transport hooks. Core routes under `/api/v1` include capabilities bootstrap, market, account, params, commands, and messages. The API is optional and off by default, designed for self-hosted graphical clients while the bot remains the only component talking to exchanges. Enable it via `private_webui` settings in config. Set a strong `private_webui_secret_key`, restrict `private_webui_allowed_ips`, and keep the API off the public internet unless you know what you are doing.

## Exchange Connectors

Supported connectors in the Basic edition include Azbit, P2PB2B, StakeCube, Coinstore, FameEX (via the new FameEXnet connector), and NonKYC. Operators should note breaking changes: the FameEX API surface requires switching config to FameEXnet, and XeggeX has been removed from OSS. Market-making modules were refreshed alongside trader adapters.

## Dependencies and Upgrade Guide

Notable runtime updates include `adamant-api` 3.x, `mongodb` 7, and the addition of `zod`, `fast-jwt`, and `json-parse-bigint`. Express was removed from the WebUI path. To upgrade from v7.x, stop the bot, pull the latest code, and install dependencies:

```bash
pm2 stop tradebot
cd adamant-tradebot
git pull
npm i
```

Ensure Node.js 22.2+ is installed. Merge new fields from `config.default.jsonc` into your `config.jsonc`, confirm FameEXnet connector settings, and back up your MongoDB database to let migrations run on the first start. If the WebUI API is enabled, review its security settings. Finally, restart the bot using your process manager. Named configs still work as expected.

## OSS Scope Boundary

v8.0 brings Premium-line engineering quality into the OSS tree without reintroducing Premium-only assumptions. The spot, REST-first baseline is preserved, with no mandatory WebSocket exchange connectors, perpetual/futures stack, or expanded exchange catalog.

---
title: "Private WebUI: Self-Hosted Fleet Console for ADAMANT Market-Making Software"
slug: "discussion-75-scenario-a-private-webui-self-hosted-fleet-console-live-situation-and-mm-health-10709518"
description: "Context This is a progress update on Scenario A of the private self hosted WebUI: a single operator console for a fleet of ADAMANT Market Making Software instances. Scenario B (…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/75"
publishedAt: "2026-08-29T09:35:34Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10709518"
locale: "en"
placeholder: false
---

## Context

This is a progress update on **Scenario A** of the private self-hosted WebUI: a single operator console for a fleet of ADAMANT Market-Making Software instances. Scenario B (public subscription WebUI, outbound relay, license token) is not covered here.

A key architectural rule for operators: the browser and the WebUI backend never talk to exchanges directly. Charts, order books, balances, parameters, and commands all flow through each bot's `/api/v1`. Exchange API keys remain on the bot.

## What you can run today

A local WebUI process (Vite UI + Fastify BFF) connects to one or more bots running with `private_webui` enabled and a shared HMAC secret. You add each bot by URL. The WebUI stores the fleet registry; the bot does not. Operator accounts, 2FA, and roles live on the WebUI, while the bot only verifies a signed JWT containing `{ login, role }`.

![WebUI sign-in](/images/engineering-notes/github/discussions/10709518/001-65a9054569.webp)

*Sign-in. Operator credentials live on the WebUI (email / ADM / ETH + mandatory 2FA). Each bot only checks the signed JWT — there is no login endpoint on the bot.*

## Fleet tabs and the market desk

Header tabs represent one bot each. Status dots come from the JWT-authenticated `GET /api/v1/status` endpoint, reporting `working`, `degraded`, or `stopped` — not from the public liveness probe. The public `GET /api/v1/health` endpoint returns only `{ status, transport }` so that a reachable bind address does not leak MM quality information.

The **Market** view provides candles with bot orders overlaid, a live order book with spread, 24h range and volume, pair inventory in both coin and USD, and manual limit order placement. Clicking a book row fills side, price, and amount. Cancel sends `{ id, market, side }` and drops the row when the exchange already treats the order as gone.

![Market desk](/images/engineering-notes/github/discussions/10709518/002-04f3b72fdc.webp)

*Market. Candles, order book, USD inventory, and place-order for `PENGUIN/USDT` on BiFinance — one tab in a multi-bot fleet.*

## Parameters and live situation

**Parameters** exposes the full `WebUiTradeParams` form: a master MM switch plus groups that follow bot `capabilities` (missing `trade/mm_*.js` modules stay locked). Liquidity, price watching, ladders, volume trader, analog hints, and other settings are edited through `PUT /params` and live-update over Socket.IO via `params:updated`.

**Live situation** displays a 12-hour strip in the browser: inventory (base + quote USD) and open-order notional by purpose. Bars fill while the bot stays connected. Yellow hour frames indicate that hour was `degraded`; grey means MM was `stopped`. The frame hugs the bar rather than the full chart height.

On the bot, MM quality is sampled outside `trade/mm_*.js`. Calling `/start` (or PUT MM on) stamps equal `mm_generalInitTs` and `mm_generalRestartTs`. A process reboot while MM is already on keeps init but bumps restart, so you can distinguish a clean start from a crash-restart.

![Parameters and Live situation](/images/engineering-notes/github/discussions/10709518/003-5723175f10.webp)

*Parameters. Master MM switch, 12-hour Live situation (inventory and open orders $), liquidity, price watching, and ladders — groups lock when the module is not in this bot build.*

## Commands and audit trail

**Commands** wraps the same handlers as messenger and CLI: fill, close, make-price, TWAP, transfer, withdraw, and queries. Destructive POSTs require confirmation. The right-hand console shows the bot's markdown feed (balances, cancels, epoch resets).

**Events** is the WebUI audit log stored in SQLite, recording who changed what (`admin@…` vs `bot`), covering both parameters and commands, with search, filter, and JSON export.

![Commands console](/images/engineering-notes/github/discussions/10709518/004-2adccfacb9.webp)

*Commands. Fill / close / make-price forms plus the live console — same command set as ADAMANT Messenger and CLI, structured for a desk.*

![Events audit](/images/engineering-notes/github/discussions/10709518/005-9665688ad1.webp)

*Events. Timestamped parameter toggles and command payloads, attributed to the operator or the bot.*

## Contract notes for operators

The `GET /health` endpoint requires no JWT and returns only `{ status, transport }`, still bound to `private_webui_bind_host` and the allowlist. The JWT-authenticated `GET /status` returns `mmActive`, `mmState`, optional init and restart timestamps, grace period, and degraded reasons. `GET /params` provides a full snapshot; `PUT /params` applies only dirty slices so unrelated modules are not re-enabled. `POST /commands/cancel` accepts an optional `side` field (`buy` or `sell`). Regarding roles, a `read-only` JWT cannot write, while tokens without a `role` field retain legacy full access. Older bots without `/status` still appear in the fleet — the WebUI falls back to a fat `/health` payload.

## Not in this drop

Scenario B (relay, payment session, license scope) is excluded. Ticker, book, and balance data still uses REST polling at roughly 10-second intervals rather than WebSocket push. The browser and WebUI do not talk to exchanges directly.

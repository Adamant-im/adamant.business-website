---
title: "Scenario A-3: Operator dashboard, safety events, and fleet polish in the private WebUI"
slug: "discussion-77-progress-scenario-a-3-operator-dashboard-safety-events-config-and-fleet-polish-in-the-priv-10761303"
description: "This is a progress update for scenario A (private self hosted WebUI, directHttp transport) for the ADAMANT TradeBot. The WebUI never connects to exchanges; all market, account,…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/77"
publishedAt: "2026-09-06T18:53:34Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10761303"
locale: "en"
placeholder: false
---

This is a progress update for scenario A (private self-hosted WebUI, `directHttp` transport) for the ADAMANT TradeBot. The WebUI never connects to exchanges; all market, account, and parameter data flows from the bot `/api/v1` API.

The per-bot Dashboard is now the primary landing view after selecting a bot tab. It provides an overview of the pair, exchange, and market-making state from `GET /api/v1/status`, alongside 24-hour price and volume. A feature edition badge is derived from installed bot capabilities rather than active modules. The dashboard includes a compact price chart with a forming candle, a color-coded modules grid, a trading parameters summary, and structured balances with open orders. Starting MM no longer sends a strategy override, allowing the bot to keep its current policy.

![Operator dashboard: MM state, feature edition, modules grid, params summary, and compact chart](/images/engineering-notes/github/discussions/10761303/001-32674fae63.webp)

Market views received polish, including forming candles on the OHLC chart, bot-order markers on the order book, and open-order overlays. Cancel actions send `{ id, market, side }`, and already-gone orders are treated as success for the operator.

![Market tab: open orders, order book with spread, buy/sell forms, balances](/images/engineering-notes/github/discussions/10761303/002-47dd4a54b7.webp)

The Parameters view now includes a 12-hour live situation strip showing inventory USD mix and open-order notional by purpose in the operator's timezone. Hour frames from local health history indicate degraded or stopped hours. When the bot auto-stops MM or pauses a ladder for safety, the WebUI surfaces a dialog from bot notify text and reflects the emergency state.

![Parameters: master MM switch, 12h live situation, liquidity & price-watching groups](/images/engineering-notes/github/discussions/10761303/003-bfb5b261fd.webp)

An Events board provides a parameter-change audit log with balance snapshots at change time, safety badges, and a resume ladder action directly from safety event rows.

![Events: parameter audit trail with safety auto-stop and balance context](/images/engineering-notes/github/discussions/10761303/004-241365a624.webp)

The admin Config view displays runtime health, pair metadata, and a live trade-params tree at equal height. It offers sanitized `config.json` summary and raw JSON tabs without exposing secrets.

![Config: runtime health, pair metadata, live trade-params tree, config summary](/images/engineering-notes/github/discussions/10761303/005-271ca78365.webp)

Fleet shell improvements include editable registry fields for Label and Account, with header tabs displaying this information. Keep-alive panes now survive bot tab switches, reading a frozen Redux snapshot instead of collapsing to an empty state.

This increment transitions the WebUI from a messenger-style interface to a persistent dashboard with charts, modules, and parameters. Safety events now include balance context and resume actions, replacing the previous guesswork around why MM stopped. Multi-bot tabs with keep-alive panes and a fleet overview prevent context loss when switching bots. The admin Config view surfaces runtime health and a sanitized configuration snapshot. MM-quality dots (`working`, `degraded`, `stopped`) are derived from `/status` with a 10-minute grace period after start. The system remains fully self-hosted: the WebUI sits behind a reverse proxy, bots run on operator infrastructure, no exchange API keys are stored in the WebUI, and 2FA is mandatory.

The stack consists of WebUI v0.2.0 built with Vite, React 18, Chakra UI, Fastify BFF, and a SQLite event log. The bot exposes endpoints like `GET /api/v1/bot`, `/status`, `/params`, and `/account/*`, alongside a `params:updated` WebSocket. Transport is limited to `DirectHttpTransport`. Scenario A private self-host is feature-complete for the MVP scope. Future work will focus on Scenario B, a public subscription WebUI via outbound relay and license token.

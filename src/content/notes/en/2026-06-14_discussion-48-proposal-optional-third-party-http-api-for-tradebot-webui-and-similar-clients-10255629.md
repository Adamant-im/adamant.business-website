---
title: "Proposal: Optional Third-Party HTTP API for TradeBot"
slug: "discussion-48-proposal-optional-third-party-http-api-for-tradebot-webui-and-similar-clients-10255629"
description: "This proposal introduces an optional Bot API v1, allowing external clients—such as a graphical WebUI—to monitor and control a trade bot without relying on ADAMANT Messenger or T…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/48"
publishedAt: "2026-06-14T12:09:43Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255629"
locale: "en"
placeholder: false
---

This proposal introduces an optional Bot API v1, allowing external clients—such as a graphical WebUI—to monitor and control a trade bot without relying on ADAMANT Messenger or Telegram. In this architecture, the WebUI communicates exclusively with the bot API, ensuring the bot remains the single source of truth for market data (ticker, order book, trades, OHLC), account state, trade parameters, and command execution.

The API aims to provide an optional inbound HTTP and WebSocket interface on the bot, utilizing a `private_webui` port in the configuration. Authentication will be handled via JWT verified on the bot using a `private_webui_secret_key`, while user accounts will reside in the external client. The API will expose structured JSON endpoints for market, account, and parameter data, alongside command wrappers. A `GET /bot` endpoint will serve as a bootstrap, returning capabilities such as installed `mm_*.js` modules and exchange feature flags. For live trade-parameter changes, a WebSocket `params:updated` event will be available. Transport modes will initially support `directHttp` for self-hosted clients, with `relayWs` for subscription hosting planned for later.

This discussion excludes payment, billing, or license UI, as well as specific WebUI implementation details. The community is invited to provide feedback on whether this API should live in the open-source `adamant-tradebot` repository as an optional module, which endpoints are required for a minimal useful client beyond messenger commands, and whether polling or push is preferred for market and account data in v1. A tracking issue will be opened in `adamant-tradebot` referencing this discussion. A premium reference implementation is currently in progress on the `adamant-tradebot-me` branch `refactor/new-webui-api`.

---
title: "Proposal: Modern graphical WebUI for ADAMANT TradeBot"
slug: "discussion-49-proposal-modern-graphical-webui-for-adamant-tradebot-private-self-host-public-subscription-10255630"
description: "Context The current WebUI experience is primarily text based, relying on messenger style command replies. This proposal outlines a modern graphical interface featuring charts, o…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/49"
publishedAt: "2026-06-14T12:09:51Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255630"
locale: "en"
placeholder: false
---

## Context

The current WebUI experience is primarily text-based, relying on messenger-style command replies. This proposal outlines a modern graphical interface featuring charts, order books, balances, open orders, trade-parameter forms, and module-aware control panels. A critical architectural rule is that the WebUI never connects directly to exchanges; all data must flow from the bot API.

## Deployment Models

Two deployment models are proposed. The first is a private self-hosted WebUI offered as a one-time purchase. In this model, the operator runs the WebUI behind HTTPS via a reverse proxy. The WebUI maintains a fleet registry of bots, using a shared `private_webui_secret_key` to sign JSON Web Tokens (JWT) after operator login, which includes local users and two-factor authentication. The WebUI server communicates with each bot using direct HTTP requests to the `/api/v1/*` endpoints, allowing a single WebUI address to manage multiple bots via tabs.

The second model is a public subscription WebUI. Users authenticate through an external payment and authentication service, then place a license token in their bot configuration. The bot establishes an outbound connection to a public relay, eliminating the need for an inbound bot port. Browser requests route through the public WebUI and relay to the bot via a one-to-one API tunnel. License scope is restricted to one exchange and one pair per license.

## MVP Scope

The minimum viable product prioritizes the private self-hosted scenario. It involves building a new stack using Vite and React 18, without supporting the legacy WebUI. The implementation includes a transport abstraction layer, starting with `DirectHttpTransport` and followed by `RelayWsTransport`. The UI bootstraps via a `GET /bot` request, where bot capabilities drive the visible UI blocks. Parameters are managed via WebSocket `params:updated` events alongside REST. Market and account data rely on REST polling at an initial interval of roughly 10 seconds, with plans to push data from the bot cache later.

## Non-Goals

This discussion explicitly excludes payment and billing implementation details, as well as the bot API design, which is covered in a companion discussion. A tracking issue will be opened in the `adamant-tradebot-webui` repository referencing this proposal.

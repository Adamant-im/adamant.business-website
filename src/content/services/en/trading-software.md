---
title: Trading Software
description: CEX/DEX automation, treasury tools, and market data pipelines — self-hosted trading software without profit promises.
cta: I want trading software
layoutStyle: split
proofLinks:
  - label: adamant-tradebot
    url: https://github.com/Adamant-im/adamant-tradebot
  - label: marketmaking.app
    url: https://marketmaking.app
---

Trading software is judged at the worst moment: an exchange API degrades, a websocket silently drops, a partial fill lands mid-restart. We build systems for those moments — self-hosted, observable, and under your team's control from the first commit.

## What a typical build includes

- **Exchange connectivity** — REST and websocket connectors for the CEXes and DEXes you use, with reconnection, clock-drift handling, and per-venue rate-limit budgets
- **Order engine** — order lifecycle tracking that survives restarts: every order is reconciled against the exchange, never assumed
- **Risk rails** — hard position caps, notional limits, kill switches, and sanity checks that sit between strategy code and the exchange
- **Market data pipeline** — normalized trades, order books, and candles across venues, stored where your analysts can query them
- **Operations view** — dashboards and alerts, so a human always knows what the system is doing and can stop it in one action

## Market making, specifically

A decade of running our own market-making software went into [adamant-tradebot](https://github.com/Adamant-im/adamant-tradebot) — specialized market-making and trading software with a free open-source edition, and a hosted premium experience at [marketmaking.app](https://marketmaking.app). For teams that need it on their own metal — custom pairs, custom venues, custom risk rules — we tailor self-hosted deployments of the same engine.

## Treasury and execution tooling

Not everything is a strategy. Funds and product companies come to us for the unglamorous layer: rebalancing across venues, TWAP-style execution of large positions, payout batching, and reporting that reconciles to the satoshi. This is where automation pays for itself fastest.

## What we will tell you upfront

- We do not promise profits, signals, or "guaranteed APY" — anyone who does is selling you risk
- We do not generate fake volume or artificial market activity
- We do not custody funds; keys live in your environment, scoped to minimum permissions
- Low-latency HFT colocation is a different industry — we build robust automation, not nanosecond racing

You get software, source code, documentation, and an engineering partner who maintains it. Strategy and responsibility stay with you.

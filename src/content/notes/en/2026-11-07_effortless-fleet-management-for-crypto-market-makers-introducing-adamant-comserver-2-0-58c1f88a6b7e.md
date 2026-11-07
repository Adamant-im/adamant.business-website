---
title: "ADAMANT ComServer 2.0: Fleet-Wide Management for Self-Hosted Crypto Market Makers"
slug: "effortless-fleet-management-for-crypto-market-makers-introducing-adamant-comserver-2-0-58c1f88a6b7e"
description: "As token projects and liquidity providers grow, maintaining deep order books, tight spreads, and healthy trading volume rarely happens on a single centralized exchange. A seriou…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/effortless-fleet-management-for-crypto-market-makers-introducing-adamant-comserver-2-0-58c1f88a6b7e"
publishedAt: "2026-11-07T10:12:13.811Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:58c1f88a6b7e"
coverImage: "/images/engineering-notes/medium/58c1f88a6b7e/001-5aba38788d.webp"
locale: "en"
placeholder: false
---

As token projects and liquidity providers grow, maintaining deep order books, tight spreads, and healthy trading volume rarely happens on a single centralized exchange. A serious market-making operation typically requires multiple bot instances spread across exchanges. ADAMANT Trade Bot Communication Server (ComServer) v2.0.0 addresses the operational friction of managing that fleet—replacing manual SSH sessions, log inspection, and ad-hoc scripts with a unified, authenticated command hub.

## Fleet-Wide Orchestration

ComServer is a self-hosted relay daemon that connects ADAMANT trade bots over an authenticated Socket.IO channel. Operators manage their entire fleet through a single communication hub rather than interacting with each bot in isolation.

For a quick balance overview across all connected exchanges, a single command suffices:

```
/remote balances all
```

ComServer routes the request to one bot per exchange account, gathers responses, and returns a deterministically sorted summary of assets by exchange and quote-coin priority.

Synchronized strategy adjustments are equally concise. Market volatility or major announcements often demand rapid parameter changes across every bot. Commands such as `/remote make price 1.1 USDT in 5 days -all` coordinate all bots toward a target price, `/remote enable pw 1.00–1.10 USDT -all` enforces tighter spread corridors across all books, and `/remote make volume +25% -all` scales liquidity depth fleet-wide. For surgical control, operators can target specific bots by unique identifier or unambiguous partial ID instead of broadcasting.

## What Changed in 2.0.0

Version 2.0.0 is a ground-up rewrite focused on transport security, operational resilience, and software minimalism.

### Transport Security

Because ComServer relays sensitive operational commands—placing orders, querying balances—transport security is critical. The wire protocol now uses **AES-256-GCM** authenticated encryption, upgrading from the legacy AES-256-CTR mode. Every frame is encrypted with an ephemeral 96-bit nonce and validated against tampering, forgery, and bit-flipping attacks.

Communication keys are derived dynamically from the shared `SECRET_KEY` using HKDF, ensuring strict role separation between server and bot. Additional Authenticated Data (AAD) cryptographically binds sender identity, role, and millisecond timestamps to every payload, stopping cross-bot frame reflections. A high-throughput, bucketed `ReplayCache` tracks single-use nonces up to a capacity of 100,000 frames; if the cache reaches capacity under attack, it safely rejects new frames rather than evicting old ones, eliminating any replay window. Client authentication is verified inside Socket.IO middleware prior to socket admission—unauthorized or malformed handshakes are terminated before a socket connection is established.

### Dependency Reduction

The dependency tree was radically streamlined. Total package count dropped from 615 to 141, clearing 32 historical security advisories—including 2 critical and 19 high vulnerabilities—down to zero.

### Engineering and Operations

The runtime targets Node.js 22.13+ with pure native ES modules, dependency injection, and no global state. When an active bot reconnects after a network interruption, ComServer immediately prunes lingering zombie sockets so commands never route to dead connections. Pending command queues are capped at 1,000 concurrent requests to prevent memory exhaustion under load. PM2 lifecycle handling is pre-configured via `ecosystem.config.cjs` for graceful signal handling (SIGINT, SIGTERM) with clean command timer teardown. The codebase includes 182 tests across unit, integration, and process lifecycle stages using the Node.js test runner with TypeScript-checked JSDoc.

## Self-Hosted Sovereignty

ADAMANT Market-Making Software and ComServer run entirely on the operator's own hardware or private cloud. No trade data, secret keys, or operational instructions touch a third-party server. ComServer provides the unified fleet control of an institutional trading desk while preserving the security model of open-source, self-hosted software: your keys, your tokens, your infrastructure.

ADAMANT ComServer v2.0.0 is available for users running the premium version of ADAMANT Trade Bot.

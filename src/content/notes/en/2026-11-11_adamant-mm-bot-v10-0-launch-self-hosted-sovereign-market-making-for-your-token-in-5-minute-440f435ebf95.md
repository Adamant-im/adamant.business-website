---
title: "ADAMANT mm Bot v10.0: Sovereign, Self-Hosted Market Making for Token Projects"
slug: "adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minute-440f435ebf95"
description: "The Token Liquidity Problem For token founders, listing on a centralized exchange exposes a harsh reality: an illiquid token is effectively dead. Without continuous liquidity an…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minutes-440f435ebf95"
publishedAt: "2026-11-11T07:09:05.209Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:440f435ebf95"
coverImage: "/images/engineering-notes/medium/440f435ebf95/001-9e1cee5966.webp"
locale: "en"
placeholder: false
---

## The Token Liquidity Problem

For token founders, listing on a centralized exchange exposes a harsh reality: an illiquid token is effectively dead. Without continuous liquidity and visible trading volume, projects lose aggregator rankings, arbitrage bots widen spreads, and retail buyers leave due to slippage. The traditional response is to hire a market-making agency, pay monthly retainers of $5,000 to $30,000 or more, and surrender custody of tokens and stablecoins to third-party accounts. Too many projects have seen treasury tokens dumped or market makers vanish during market stress.

The alternative is sovereign, self-hosted market making. With ADAMANT TradeBot v10.0.0, you can run an institutional-grade, fully automated market maker on a $5/month VPS or Docker container in under five minutes, without transferring custody of your tokens to anyone.

## Non-Custodial Design

The core philosophy is total financial sovereignty. ADAMANT TradeBot runs entirely in your own single-tenant environment. The bot requires only basic read and trade API permissions; withdrawal permissions are strictly disabled and prohibited. You never send tokens or stablecoins to ADAMANT, an agency, or a smart contract. Tokens never leave your exchange account, and all order calculations, algorithmic spreads, and balance reconciliations execute locally. You can modify spreads, volume targets, and price corridors on the fly through the ADAMANT Messenger interface or the WebUI API.

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR INFRASTRUCTURE                      │
│            ($5/mo VPS, Private Server, or Docker)           │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 ADAMANT mm bot                      │   │
│   │  [ Trader ]   [ OrderBook ]  [ Liquidity ]  [ Watcher]│ │
│   └──────────────────────────┬──────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────┘
                               │ API Keys
                               │ (Trade Permissions ONLY)
                               │ ❌ No Withdrawal Access
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     CENTRALIZED EXCHANGE                    │
│     (Gate, Coinstore, XT, NonKYC, MEXC, etc.)               │
│                                                             │
│  🔒 Tokens never leave your exchange account                │
│  📊 Orders placed directly via signed REST / WebSocket      │
└─────────────────────────────────────────────────────────────┘
```

## Four Algorithmic Engines

The open-source edition ships with four synchronized engines that together handle every dimension of market making.

The **Trader** engine generates consistent, natural-looking volume by executing self-matched trades within the spread or order book depth, keeping the project active on aggregators such as CoinMarketCap and CoinGecko without leaking capital.

The **Order Book Builder** continuously places, shifts, and replaces layered bid and ask orders, producing a dense, realistic order book with organic price variation and avoiding the empty-ladder appearance common on secondary exchanges.

The **Liquidity Provider** defends the order book against slippage, calculating optimal liquidity distribution from available balances and placing depth orders within your defined spread percentage so community buyers and sellers get fair execution.

The **Price Watcher** monitors token prices across reference markets such as Binance, DEXs, or major trading pairs. If external prices move, it automatically adjusts local price bounds and order corridors to prevent your liquidity from being drained by predatory cross-exchange arbitrage.

## What's New in v10.0.0

Version 10.0.0 is the most substantial architectural release in the project's history, focused on enterprise reliability, safety, and supply chain integrity.

**Concurrency-safe iteration locking** addresses the most common cause of duplicate orders and desynchronized state in high-frequency bots: overlapping execution ticks. v10.0 introduces `helpers/moduleIteration.js`, which implements strict locking. If an iteration is already awaiting an exchange API response, the next tick is cleanly postponed rather than executed concurrently, and iterations are safely rescheduled from `finally` blocks so the bot never hangs or crashes during transient network disconnects.

The **Azbit connector** has been completely rewritten. It now uses native HMAC-SHA256 signature generation with microsecond timestamps, precise decimal alignment adhering to Azbit lot and tick specifications, and instant balance cache invalidation with robust error recovery on throttled HTTP requests.

An **Inactivity Guard** protects against the scenario where the host server reboots or loses connectivity and the market moves significantly while the bot is offline. On boot, it checks heartbeat timestamps; if downtime exceeds your safety threshold, it triggers safe mode to prevent executing stale orders.

**Structured log rotation** uses daily Winston rotation with automatic gzip archiving, configurable retention policies, and sanitized logging to ensure API secrets never leak into log files.

**End-to-end supply chain security** rounds out the release. Docker images published to GitHub Container Registry include Sigstore provenance attestations, and npm packages are published via OpenID Connect trusted publishing with full build provenance on npmjs.com.

## Deployment

Deployment is straightforward via either the global npm CLI or Docker.

For the CLI approach, ensure Node.js 22+ is installed, then run the install, init, and start commands:

```
# 1. Install the bot globally
npm install -g adamant-tradebot

# 2. Initialize your configuration
mm init

# 3. Configure your exchange API keys & token pair
nano config/config.default.jsonc

# 4. Start the market maker
mm start

# 5. Check live status
mm status
```

For Docker, pull and run the provenance-verified container:

```
docker run -d \
  --name adamant-tradebot \
  --restart unless-stopped \
  -v $(pwd)/config:/app/config \
  -v $(pwd)/logs:/app/logs \
  ghcr.io/adamant-im/adamant-tradebot:10.0.0
```

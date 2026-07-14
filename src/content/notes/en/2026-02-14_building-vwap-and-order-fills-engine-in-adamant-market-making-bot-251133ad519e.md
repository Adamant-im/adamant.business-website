---
title: "Building VWAP & Order Fills Engine in ADAMANT Market-making Bot"
slug: "building-vwap-and-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
description: "In the ADAMANT Market making bot, dynamic order book management, spread control, liquidity provisioning, and volume strategies are already supported. However, without accurate f…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/building-vwap-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
publishedAt: "2026-02-14T13:30:19.720Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/251133ad519e/001-1-stivdc2giqxmbc5miuwkxa-png.webp"
cardSpan: "full"
originalId: "medium:251133ad519e"
locale: "en"
placeholder: false
---

In the ADAMANT Market-making bot, dynamic order book management, spread control, liquidity provisioning, and volume strategies are already supported. However, without accurate fill analytics, only half the picture is visible. [Issue #87](https://github.com/Adamant-im/adamant-tradebot/issues/87) introduces a major architectural upgrade: a dedicated VWAP engine and Order Fills engine (Premium module) that provides professional-grade execution analytics.

### Why VWAP Matters

Most exchange APIs provide fragmented information. Orders may be partially filled, status updates can lag, some exchanges return incomplete execution data, and restarts can cause loss of internal execution context. If a bot does not persist and verify fill data correctly, PnL becomes inaccurate, position tracking becomes unreliable, risk management logic breaks, and spread and liquidity adjustments are based on assumptions rather than reality.

To operate at an institutional level, the engine uses persistent execution tracking, verified fill reconciliation, proper VWAP computation, and inventory-aware analytics.

### The Solution: Dedicated VWAP & Fills Engine

Issue #87 introduces a dedicated subsystem with three main components.

**Raw fill event storage (append-only).** A dedicated `fillsDb` stores raw execution events in append-only mode, persisting across restarts without immediate aggregation. This ensures no execution data is lost or overwritten.

**Exchange verification layer.** Each fill event must be verified against the exchange API, confirmed as fully or partially executed, and marked as processed only after confirmation. This prevents false-positive fills when the bot lacks connectivity, exchange nodes are unavailable, or API responses are incomplete. Execution verification only happens when network connectivity exists and exchange endpoints are reachable; otherwise, valid trades risk being incorrectly marked as failed.

The core verification function implements an "always verify if possible" policy:

```javascript
/**
 * Verifies a fill order using exchange API.
 *
 * Policy "always verify if possible":
 *  - If api.getOrderDetails() is missing -> cannot disprove -> treat as confirmed
 *  - If status missing or exception -> return undefined (try again later)
 *  - If API says 'filled' -> confirmed
 *  - If API says explicitly not filled ('new'|'part_filled'|'cancelled') -> rejected
 *  - If API says 'unknown' -> keep (cannot disprove) but warn
 *
 * @param {FillOrder|Object} order Fill order record or Order object
 * @param {any} api API instance (spot first/second account, or other compatible trader api)
 * @param {string} callerName Log context id (usually module and method which calls) to quickly find related logs
 * @returns {Promise<VerifyFillResult | undefined>
 */
async function verifyOrderFilled(order, api, callerName)
```

**Aggregated execution statistics.** A second persistent store, `filledStatsDb`, accumulates total base asset bought and sold, total quote asset spent and received, and counters of full, partial, rejected, and missing fills. From this, core metrics are computed.

### Core Metrics

The base stats object structure:

```javascript
/**
 * Creates a base FillsEngineStatsResult object with zeroed / default values.
 *
 * @param {string} statsId Format: `${exchange}:${pair}:${purpose}:${startTs}`
 * @param {string} pair Trading pair, e.g., `BTC/USDT`
 * @param {FilledStatsRecord | undefined | null} stats Epoch stats (optional)
 * @returns {FillsEngineStatsResult}
 */
function createBaseEpochStats(statsId, pair, stats) {
  return {
    statsId,
    pair,
    updatedAt: stats?.updatedAt || 0,

    buy: stats?.buy ? { ...stats.buy } : emptySide(),
    sell: stats?.sell ? { ...stats.sell } : emptySide(),

    // Calculated later
    boughtVwap: 0,
    soldVwap: 0,

    hasBothSides: false,
    vwapSpread: 0,
    vwapSpreadPercent: 0,

    pnlQuoteCashflow: 0,
    inventoryBase: 0,
    markPrice: undefined,
    pnlQuoteMtm: undefined,
  };
}
```

**VWAP (Volume Weighted Average Price)** is computed per side as Buy VWAP and Sell VWAP using the formula `VWAP = Total Quote Volume / Total Base Volume`. This reflects actual execution quality, not just order placement price.

**VWAP spread** is the difference between Buy VWAP and Sell VWAP, showing the real realized trading spread rather than the theoretical spread.

**Inventory delta** is the difference between total base bought and total base sold, used for risk management, position exposure tracking, and rebalancing logic.

**Realized PnL** is the cashflow-based result from executed trades, with optional mark-to-market PnL using current market price.

### Architectural Impact

The new engine is a fully modular component that integrates cleanly into the existing architecture without disrupting current order placement logic. It operates alongside existing systems rather than replacing them, preserving stability while adding a deeper analytical layer.

```
          Exchange API
                │
                ▼
       Order Placement Engine
                │
                ▼
         Fills Collector
                │
                ▼
       Verification Engine
                │
                ▼
         Aggregation Engine
                │
                ▼
      VWAP / Inventory / PnL
                │
                ▼
    Risk & Strategy Modules
```

This architecture lays the groundwork for future expansion, transforming the bot from an order placement tool into a true execution analytics system. Advanced strategies such as liquidity bucket management and dynamic spread maintenance rely heavily on accurate execution data to function correctly. For premium trading modules, execution analytics is a core requirement for professional-grade operation.

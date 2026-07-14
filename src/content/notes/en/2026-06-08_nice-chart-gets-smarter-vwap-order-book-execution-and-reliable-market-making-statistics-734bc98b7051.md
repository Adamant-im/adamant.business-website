---
title: "Nice Chart gets smarter: VWAP, order-book execution, and reliable market-making statistics"
slug: "nice-chart-gets-smarter-vwap-order-book-execution-and-reliable-market-making-statistics-734bc98b7051"
description: "The latest adamant tradebot update (version 23.0.0) significantly upgrades Nice Chart, ADAMANT's premium market making mode. Rather than simply generating trading activity, the…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/nice-chart-gets-smarter-vwap-order-book-execution-and-reliable-market-making-statistics-734bc98b7051"
publishedAt: "2026-06-08T13:31:06.952Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/734bc98b7051/001-1-m2zzlsbbi-isnuqvz3kn9q-png.webp"
cardSpan: "full"
originalId: "medium:734bc98b7051"
locale: "en"
placeholder: false
---

The latest `adamant-tradebot` update (version 23.0.0) significantly upgrades Nice Chart, ADAMANT's premium market-making mode. Rather than simply generating trading activity, the execution engine now tracks more context around each trade, evaluates projected VWAP spread more precisely, and reports detailed statistics about trader behavior and recently closed orders. This helps operators understand not only what happened, but why.

## Better VWAP Spread Tracking

VWAP (Volume-Weighted Average Price) is one of the most important indicators for execution quality. The update improves VWAP handling in three ways. First, spread display precision has been fixed—previous percentage formatting could be misleading, and the new display is suited for basis-point-level analysis. Second, the allowed VWAP spread threshold has been adjusted to 0.6%, giving the strategy more practical flexibility when matching orders in real conditions. Third, the engine now handles negative projected VWAP spread scenarios more carefully, since certain order-book situations can look acceptable at first glance while the projected execution would actually distort the intended trade logic.

## Smarter Order-Book Execution

![Nice Chart gets smarter: VWAP, order-book execution, and reliable market-making statistics](/images/engineering-notes/medium/734bc98b7051/002-1-flqt3yboi63ap-dbqbejq-png.webp)

The updated engine introduces more explicit execution routing, making the strategy easier to reason about, debug, and operate. A new configuration parameter, `executeInOrderBookPercent`, controls what portion of a trade may be executed directly through the order book. This avoids overly aggressive consumption of visible liquidity and is especially useful for markets where the order book is shallow, uneven, or partially controlled by third-party traders. Instead of blindly executing the full amount, Nice Chart can now apply amount caps and make more careful decisions.

## More Transparent Execution Tracking

The bot now provides clearer logs around order-book actions, routing decisions, amount limiting, and trade execution behavior. When something unexpected happens—a partial fill, replacement, skip, or unexpected match—the logs provide more context. For trading systems, good logs are part of operational safety, not just developer convenience.

## Improved Trader Statistics

The `/orders t full` command has been enhanced with more context around recent closed orders, all-time statistics, trading volume, and epoch-based tracking. Operators can now answer questions such as how much volume has been generated since the current epoch started, how many recent orders were closed, and whether current activity aligns with all-time behavior.

![Nice Chart gets smarter: VWAP, order-book execution, and reliable market-making statistics](/images/engineering-notes/medium/734bc98b7051/003-1-go7ssfwyfsy0gje-f72-yg-png.webp)

## Better Fill Attribution

A new function, `attributeThirdPartyFillFromMatchPlan`, improves how the fills engine attributes third-party fills when order-book execution is involved. This makes statistics more accurate and helps separate internal strategy behavior from external market interaction.

## MTM PnL and USD Cashflow

Mark-to-Market PnL calculations have been enhanced with USD cashflow properties. This makes reporting clearer for pairs where operators need to understand performance in USD terms, not only in base or quote assets.

## Type System and Testing

New and updated type definitions were added for candlestick chart data, order-book information, execution configuration, price requests, trader settings, and Nice Chart configuration. Although the project remains JavaScript-based with JSDoc annotations, better type definitions catch mistakes earlier and reduce the risk of subtle execution bugs. Test coverage has also been expanded for order-book actions, amount limiting, fill processing, VWAP behavior, and utility functions, with mock data covering more realistic order-book situations.

## Configuration and Compatibility

![Nice Chart gets smarter: VWAP, order-book execution, and reliable market-making statistics](/images/engineering-notes/medium/734bc98b7051/004-1-4imanifwledhlg5xklk-ow-png.webp)

The default configuration has been extended with new Nice Chart execution settings, making it easier to tune order-book execution behavior without changing code. The update is backward-compatible with existing order data—no database migration is required, and new parameters have sensible defaults. Nice Chart order-book execution can also be disabled or rolled back while keeping the rest of the system operational.

## What Operators Should Monitor

After upgrading, operators should monitor VWAP spread behavior (the new 0.6% threshold may affect matching logic in tight or unstable spreads), order-book execution frequency (routing logic and amount caps may change how often trades hit existing liquidity), fill attribution (third-party fills should be compared with exchange records), and trader statistics (confirm that volume, recent closed orders, epoch metrics, and all-time statistics display correctly).

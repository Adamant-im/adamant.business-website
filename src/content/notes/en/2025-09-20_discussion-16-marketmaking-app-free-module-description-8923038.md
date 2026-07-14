---
title: "MarketMaking.App: Free Module Description"
slug: "discussion-16-marketmaking-app-free-module-description-8923038"
description: "MarketMaking.App: Free Module Description The free, open source edition of the ADAMANT market making bot is suitable for small crypto projects with low liquidity, traded on cent…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/16"
publishedAt: "2025-09-20T14:33:55Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:8923038"
locale: "en"
placeholder: false
---

# MarketMaking.App: Free Module Description

The free, open-source edition of the ADAMANT market-making bot is suitable for small crypto projects with low liquidity, traded on centralized exchanges from the supported list. The source code is available on [GitHub](https://github.com/Adamant-im/adamant-tradebot).

## Manual Order Execution Module

This module enables the operator to place specific buy and sell orders. A single market or limit order can be placed with the `/buy` or `/sell` commands, while multiple limit orders can be placed at once with `/fill`. The `/fill` command can also populate the entire order book instantly with layered bids and asks to meet exchange listing requirements. It works with any trading pair on the exchange and is useful for converting funds, buying or selling assets, or performing initial order book filling before starting automated market-making.

## Trade Volume Maker Module

This module simulates activity and volume on a market pair using internal trading. It supports three policies: spread-based, where trades occur within a defined bid/ask spread; orderbook-based, which mimics activity based on the existing order book shape; and optimal, which dynamically chooses price points for realistic-looking trades. This is useful for bootstrapping new markets, improving listing appearance, and meeting exchange volume requirements.

## Live-like Dynamic Order Book Builder

This module constructs a realistic, human-like order book to simulate organic market activity. It handles dynamic order placement and removal across visible price levels, with randomized order sizes, intervals, and price steps to avoid detection. Periodic reshuffling reflects realistic trader behavior, creating a market environment that feels alive and more attractive to external traders.

## Spread and Liquidity Maintainer

This module maintains a healthy trading spread and minimum liquidity levels to ensure tight markets and stable pair health. It constantly monitors best bid and ask levels, automatically placing liquidity within a configurable percentage spread threshold up to set maximum amounts. It ensures minimum liquidity on both sides of the book and auto-updates when orders are filled or the market moves.

## Market Watcher & Range Tracker

This module monitors key price metrics and external references to guide bot behavior or trigger commands. Price Range Watch enforces trading only within a defined static minimum and maximum price range. Cross-Exchange Watch syncs pricing or reacts to movements on another supported exchange. These functions help operators avoid volatile price zones, react to external market shifts, or align price movement with another exchange.

## Trading Pair & Bot State Inspector

This module provides real-time insight into the bot's current state and relevant trading pair information. Operators can view available balances for base and quote assets with `/balances`, list current active limit orders with `/orders`, and display market-making activity, generated volume, and spread width with `/stats`. Pair and coin metadata such as minimum trade size, tick size, and fees can be retrieved with `/info` or `/pair`, and deposit addresses for assets can be obtained with `/deposit`. This helps operators monitor bot health and market conditions in real time, validate setup, and track performance or fund status.

Some features have limited options in the basic version of the bot. More advanced settings are available in the premium version.

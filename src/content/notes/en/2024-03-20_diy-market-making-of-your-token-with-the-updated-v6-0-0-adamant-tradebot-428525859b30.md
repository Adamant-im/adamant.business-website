---
title: "DIY Market-making with ADAMANT TradeBot v6.0.0"
slug: "diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
description: "The ADAMANT Trading & Market Making Bot is an open source tool for token issuers and cryptocurrency exchanges that need autonomous market making. It places and executes orders t…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
publishedAt: "2024-03-20T08:47:50.471Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/428525859b30/001-0-nwojohhggiizs7us.webp"
cardSpan: "full"
originalId: "medium:428525859b30"
locale: "en"
placeholder: false
---

The ADAMANT Trading & Market Making Bot is an open-source tool for token issuers and cryptocurrency exchanges that need autonomous market-making. It places and executes orders to generate trading volume, maintain spread and liquidity, build dynamic order books, and monitor token prices. Version 6.0.0 introduces a range of refinements worth noting if you operate or customize the bot.

### Configuration and codebase changes

The codebase has been refactored to make customization easier for anyone working with the open-source project. Configuration is now simplified through a unified trade config draft that applies across all supported exchanges. Price functions such as `getSmartPrice()` and `getCleanPrice()`, along with utility functions, have been updated for better accuracy. The Price watcher and Dynamic order book builder have also been enhanced for more reliable market monitoring.

### Price watcher "prevent" action

Previously, the Price watcher's only action was "fill"—actively placing buy or sell orders to follow a reference price from another exchange. That approach can expose the bot to manipulation by third parties. The new "prevent" action takes a different approach: instead of forcing a price by placing orders, it defines a safe price range that other bot modules (such as liquidity) must respect, prohibiting buying high and selling low outside the range.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/002-0-p2uha5tzki-2klb.webp)

### New and extended commands

The `/deposit` command now shows deposit addresses for all available chains, making top-ups easier.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/003-0-tj9d8w7qcgqwofa4.webp)

A new `/info` command displays all available information for a specific coin, including chain details.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/004-0-raft4mu2likg0c8p.webp)

Order cancellation can now be filtered by module type (manual, order book builder, price watcher, liquidity, and so on), buy or sell side, and price. This gives administrators finer control when managing active orders.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/005-0-3slqf62rcikx-msf.webp)

When using `/amount`, `/interval`, or `/stats`, the bot now reports the estimated trading volume it generates, helping operators gauge expected activity.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/006-0-9eqmd9xwf7q7i7f6.webp)

The new `/account` command shows trading fees and monthly trading volume for the bot's account where the exchange exposes that data.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/007-0-llggirhb0bb42g5m.webp)

The `/stats` command has been extended to include trade pair prices, lows and highs, trading volume, order book highest bid and lowest ask with spread, order book liquidity, estimated market-making volume, and order statistics broken down by type with totals.

![DIY Market-making of your token with the updated v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/008-0-hr1rvff4aeshjtpw.webp)

### Exchange support

The bot now supports XeggeX and has updated exchange connectors for Azbit, Coinstore, FameEX, NonKYC, P2B, and StakeCube. Various bug fixes and miscellaneous improvements round out the release.

The release and changelog are available on GitHub: [adamant-tradebot v6.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0).

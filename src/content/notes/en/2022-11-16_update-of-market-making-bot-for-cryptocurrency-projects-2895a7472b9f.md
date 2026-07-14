---
title: "ADAMANT Trade & Market-making Bot v5.1.0 Released"
slug: "update-of-market-making-bot-for-cryptocurrency-projects-2895a7472b9f"
description: "ADAMANT Trade & Market making bot is free, open source software for running trades on cryptocurrency exchanges. It supports making trade volume, maintaining spread and liquidity…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/update-of-market-making-bot-for-cryptocurrency-projects-2895a7472b9f"
publishedAt: "2022-11-16T04:09:02.513Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2895a7472b9f/001-1-3lizhhkkfifjduf5z4zxtq-png.webp"
cardSpan: "full"
originalId: "medium:2895a7472b9f"
locale: "en"
placeholder: false
---

![Update of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/2895a7472b9f/002-1-ji7ldfgywe0whe5fgx-qag-gif.webp)

ADAMANT Trade & Market-making bot is free, open-source software for running trades on cryptocurrency exchanges. It supports making trade volume, maintaining spread and liquidity, setting a price range, and building a live-like dynamic order book. Version 5.1.0 is now available on the [ADAMANT GitHub repository](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.1.0).

The bot installs on your own server or VPS and can initially fill order books, then dynamically build them as trading progresses. It places buy and sell limit or market orders and offers three market-making policies: spread-based, orderbook-based, and optimal. Spread and liquidity are maintained continuously, and a configurable price range keeps trading within bounds. The bot also supports arbitrage of token prices across other trading pairs or exchanges. All management is handled through commands sent via ADAMANT Messenger.

A range of additional features is available by request as paid services. These include Telegram-based management, support for additional exchanges, and full setup, configuration, and ongoing support. Advanced order book capabilities include a strong anti-arbitrage system, anti-cheat mechanisms that clean price-manipulation orders, gap-free order books, high-frequency updates, and in-orderbook market-making without in-spread trading. Price chart smoothing and automatic live-like chart building within a configured price range are also offered.

Further paid options cover trading with two accounts or keys, balancing coins between accounts, and replenishing specific coin reserves. Trade volume can be configured with increased activity during pumps and dumps. Performance improvements include order book and balance caching to conserve exchange API limits, along with socket connections. Notifications can be delivered by email, Telegram, or other messengers. Additional capabilities include a withdraw feature, account information display, custom commands and statistics, cross-bot communication for running commands remotely across all bots simultaneously, token-to-USDT selling, alerts about large orders in the book, price support maintenance, market-making without actual buying and selling, and time-specific price targeting. A management interface or app can also be built on request.

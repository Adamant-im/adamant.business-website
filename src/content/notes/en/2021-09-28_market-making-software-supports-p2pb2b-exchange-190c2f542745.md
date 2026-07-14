---
title: "ADAMANT Trading & Market making v4.3.4 adds P2PB2B exchange support"
slug: "market-making-software-supports-p2pb2b-exchange-190c2f542745"
description: "ADAMANT Trading & Market making v4.3.4 now supports the P2PB2B exchange, enabling volume generation, order book filling, and spread/liquidity maintenance on that platform. The A…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/market-making-software-supports-p2pb2b-exchange-190c2f542745"
publishedAt: "2021-09-28T20:32:29.436Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/190c2f542745/001-1-kq44fxjolwz-4xefiypybg-png.webp"
cardSpan: "full"
originalId: "medium:190c2f542745"
locale: "en"
placeholder: false
---

ADAMANT Trading & Market making v4.3.4 now supports the P2PB2B exchange, enabling volume generation, order book filling, and spread/liquidity maintenance on that platform. The Atomars exchange has been removed from this release.

The bot now fetches decimals and trade pair information directly from exchanges where possible, reducing manual configuration. Dependencies have been updated, and the project now uses ADAMANT JS API v1.1.0. Internal improvements include eslint integration and general code refactoring.

Notification handling has been extended to support multiple addresses, and balances and orders are now saved separately for each sender. Commands have also been updated.

ADAMANT Trading & Market making is open source and free. The full changelog is available on the [v4.3.4 release page](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4).

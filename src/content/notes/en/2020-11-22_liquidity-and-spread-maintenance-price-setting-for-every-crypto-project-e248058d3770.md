---
title: "Liquidity and Spread Maintenance with the ADAMANT Market Making Bot v2.7.0"
slug: "liquidity-and-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
description: "When investors evaluate a cryptocurrency project, they look at liquidity and spread on exchanges. Liquidity indicates how many tokens users can buy or sell, while spread reflect…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/liquidity-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
publishedAt: "2020-11-22T19:34:30.866Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e248058d3770/001-1-3lizhhkkfifjduf5z4zxtq-png.webp"
cardSpan: "full"
originalId: "medium:e248058d3770"
locale: "en"
placeholder: false
---

When investors evaluate a cryptocurrency project, they look at liquidity and spread on exchanges. Liquidity indicates how many tokens users can buy or sell, while spread reflects the price difference between buying and selling. Even small projects can now maintain live liquidity and competitive spreads using the ADAMANT market making bot.

Version 2.7.0 introduces liquidity and spread maintenance as core features. Users can configure these parameters through the `/enable liq` command, which sets up both liquidity and spread targets for the bot to maintain on supported exchanges.

The release also adds price watching functionality. The `/make price` and `/enable pw` commands allow operators to set and monitor target prices, giving projects more control over token valuation on the market.

Several operational improvements round out the update. The `/balances` command now provides more detailed information, and logging has been updated for better observability. The bot now handles request timeouts more gracefully, and trend analysis for market making has been added to help the bot make more informed trading decisions.

The ADAMANT tradebot is an open-source project. Release notes and downloads are available on GitHub.

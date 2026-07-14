---
title: "Improved /balances Output in the ADAMANT TradeBot"
slug: "improved-balances-output-in-the-mm-bot-e7de04a88f8a"
description: "Open source market making tools are only as powerful as they are usable. A recent improvement to the ADAMANT TradeBot—a self hosted market making bot for crypto projects and exc…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improved-balances-output-in-the-mm-bot-e7de04a88f8a"
publishedAt: "2026-01-27T20:06:24.444Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/e7de04a88f8a/001-1-dqzndrygjqx5bkqeefcika-png.webp"
cardSpan: "full"
originalId: "medium:e7de04a88f8a"
locale: "en"
placeholder: false
---

Open-source market-making tools are only as powerful as they are usable. A recent improvement to the ADAMANT TradeBot—a self-hosted market-making bot for crypto projects and exchanges—focuses on making the interface more informative, particularly for essential commands like `/balances`.

The enhancement request, originally tracked as issue #89 on the ADAMANT GitHub repository, proposes several refinements. It aims to remove confusing notes when no unknown tokens are present, fix visual bugs in related commands, and add indicators of price strength in trade messages. For example, the bot can now show whether a sell was executed at a good or bad price relative to the market.

![Improved /balances output in the MM bot](/images/engineering-notes/medium/e7de04a88f8a/002-1-2xdmbg-cdiktreq64dog2w-png.webp)

To represent trade volumes, the bot uses a series of sea creature emojis, such as 🦐, 🍤, 🐟, 🐬, 🦈, and 🐳. These volume-to-emoji mappings are defined in the bot's configuration file using USD thresholds.

```json
  /** Volume thresholds in USD for different emoji levels */
  "volumes_thresholds_usd": {
    "🦐": 10,
    "🍤": 50,
    "🐟": 100,
    "🐬": 300,
    "🦈": 1000,
    "🐳": 5000,
    "🐳🐳": 10000,
    "🐳🐳🐳": 50000
  },
```

Additionally, the bot uses colored circles and arrows to indicate price strength compared to the market. A green circle denotes a good price, such as a low buy or high sell, while a red circle indicates a bad price, like a high buy or low sell. Arrows provide further granularity, showing if an asset was sold at a very high price or bought at a very low price.

Usability enhancements like these reduce cognitive load for bot operators and make the tool more accessible. While these changes are currently implemented in the Premium version of the bot, they will soon be available in the basic open-source version as well.

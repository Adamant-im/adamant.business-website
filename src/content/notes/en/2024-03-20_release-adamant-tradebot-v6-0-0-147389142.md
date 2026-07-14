---
title: "ADAMANT Tradebot v6.0.0"
slug: "release-adamant-tradebot-v6-0-0-147389142"
description: "This release introduces a major refactoring across the ADAMANT Tradebot, consolidating exchange configuration into a single tradeParams Default.js file used for all exchanges. T…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0"
publishedAt: "2024-03-20T08:46:40Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:147389142"
locale: "en"
placeholder: false
---

This release introduces a major refactoring across the ADAMANT Tradebot, consolidating exchange configuration into a single `tradeParams_Default.js` file used for all exchanges. The `getSmartPrice()` and `getCleanPrice()` functions have been updated, along with the `isOrderOutOfPriceWatcherRange()` function. Additional utility functions have been added to support these changes.

The Price watcher has been improved and now supports a `prevent` action. Volume estimation is now displayed on amount or interval updates. The `/stats` command provides extended information, and the `/info` command can retrieve coin withdrawal information and networks. Balances info has also been extended.

The `/account` command now provides information about trading fees and volume. The bot collects order fill information for all orders, and the Dynamic order book builder has been improved. After placing a market-making order, the bot checks if an order was filled. The `getMinOrderAmount()` function has been improved as well.

XeggeX exchange support has been added. Exchange connectors for Azbit, Coinstore, FameEX, NonKYC, P2B, and StakeCube have been updated. The release also includes miscellaneous improvements, bug fixes, and updated dependencies.

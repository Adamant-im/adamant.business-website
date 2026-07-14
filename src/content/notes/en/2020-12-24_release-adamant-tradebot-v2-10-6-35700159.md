---
title: "ADAMANT Tradebot v2.10.6"
slug: "release-adamant-tradebot-v2-10-6-35700159"
description: "This release focuses on performance and stability improvements for ADAMANT Tradebot. CPU usage has been optimized, and several issues affecting API limits and delayed request re…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v2.10.6"
publishedAt: "2020-12-24T13:13:19Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v2.10.6"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:35700159"
locale: "en"
placeholder: false
---

This release focuses on performance and stability improvements for ADAMANT Tradebot. CPU usage has been optimized, and several issues affecting API limits and delayed request responses have been resolved. Bit-Z response pagination has also been fixed to ensure reliable data retrieval from that exchange.

On the feature side, the `/balances`, `/orders`, `/rates`, and `/stats` commands now provide additional information to help operators monitor bot activity more effectively. A new `orderUtils` module has been introduced as part of ongoing refactoring work, and a new order type `man` is now supported for manually placed orders. Notifier frequency has been reduced to cut down on unnecessary alerts. Dependencies have been updated to their latest compatible versions.

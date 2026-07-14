---
title: "ADAMANT Tradebot v4.3.4"
slug: "release-adamant-tradebot-v4-3-4-50424674"
description: "This release adds support for the P2PB2B exchange and removes the Atomars exchange. The bot now fetches decimals and trade pair information directly from exchanges when possible…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4"
publishedAt: "2021-09-28T20:06:30Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v4.3.4"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:50424674"
locale: "en"
placeholder: false
---

This release adds support for the P2PB2B exchange and removes the Atomars exchange. The bot now fetches decimals and trade pair information directly from exchanges when possible, improving reliability of order placement and balance calculations.

Dependencies have been updated, including adoption of ADAMANT JS API v1.1.0. Commands have been updated and ESLint has been added to the project, accompanied by general code refactoring.

Notifications can now be sent to multiple addresses. Balances and orders are saved separately for each sender, ensuring cleaner state management across multiple users.

---
title: "ADAMANT Tradebot v7.0.0"
slug: "release-adamant-tradebot-v7-0-0-201883296"
description: "This release introduces a request caching feature and several new commands for interacting with exchanges, including /orderbook, /trades, /ticker, /order, and /cancel. The /help…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0"
publishedAt: "2025-02-23T05:56:49Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v7.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:201883296"
locale: "en"
placeholder: false
---

This release introduces a request caching feature and several new commands for interacting with exchanges, including `/orderbook`, `/trades`, `/ticker`, `/order`, and `/cancel`. The `/help` command has been updated to include information about the bot software and its configuration.

The Command, Order book, and Trader modules have been refactored for improved maintainability. A new `database` configuration setting has been added to support these changes. The `getOrderDetails()` function has been fixed in both the Azbit and P2B connectors.

Dependencies have been updated, and general bug fixes and improvements have been applied throughout the codebase. Logging has been improved, and TypeScript types have been added to enhance type safety and developer experience.

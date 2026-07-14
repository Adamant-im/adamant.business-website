---
title: "ADAMANT Tradebot v5.7.0"
slug: "release-adamant-tradebot-v5-7-0-128569473"
description: "This release of ADAMANT Tradebot introduces several improvements and maintenance updates. Market making orders are now cleared after placement, and the Price Watcher has been im…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.7.0"
publishedAt: "2023-11-08T16:48:40Z"
author: "just-software-dev"
authorUrl: "https://github.com/just-software-dev"
repo: "adamant-tradebot"
tag: "v5.7.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:128569473"
locale: "en"
placeholder: false
---

This release of ADAMANT Tradebot introduces several improvements and maintenance updates. Market-making orders are now cleared after placement, and the Price Watcher has been improved for better reliability. The bot now watches for external changes to the trade configuration file, enabling more dynamic configuration management without restarts. Logging has been enhanced for better observability during operation. Dependencies have been updated to their latest compatible versions, linter rules have been added to improve code quality, and several minor fixes have been applied.

### Breaking changes

If you are still using a `config.json` file, rename it to `config.jsonc`.

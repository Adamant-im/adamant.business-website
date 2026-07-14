---
title: "ADAMANT Tradebot v6.1.0"
slug: "release-adamant-tradebot-v6-1-0-170709710"
description: "This release introduces improvements to the Price Watcher along with broader reliability enhancements. Modules now verify whether a token price is actual before proceeding, whic…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.1.0"
publishedAt: "2024-08-17T09:45:28Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:170709710"
locale: "en"
placeholder: false
---

This release introduces improvements to the Price Watcher along with broader reliability enhancements. Modules now verify whether a token price is actual before proceeding, which helps prevent stale or incorrect data from influencing trading decisions. Additional refactoring work has been carried out to improve overall stability.

New `dev` and `clear_db` settings have been added, giving operators more control over development and database management workflows. Dependencies have been updated to their latest compatible versions, and several minor bugs have been fixed. Manual tests have been added to complement the existing test coverage, and the README has been updated with the new website link along with refreshed installation and usage guides.

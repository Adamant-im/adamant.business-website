---
title: "marketmaking.app Update: New Languages, Content Refresh, and Pricing Changes"
slug: "discussion-56-marketmaking-app-update-6-new-languages-content-refresh-and-pricing-changes-10333867"
description: "Overview cryptofoundry shipped a major update to marketmaking.app, introducing six new languages, refreshed positioning around the free basic bot for token issuers, updated docu…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/56"
publishedAt: "2026-06-28T14:14:24Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10333867"
locale: "en"
placeholder: false
---

## Overview

cryptofoundry shipped a major update to marketmaking.app, introducing six new languages, refreshed positioning around the free basic bot for token issuers, updated documentation, and several UX improvements.

## Languages

The site now supports eight languages. In addition to the existing English and Russian locales, cryptofoundry added Chinese (Simplified), Spanish, Arabic (RTL), French, Japanese, and German. All main pages were translated from English, with Russian used as a reference where needed. The header, modal menu, contact button, language switcher, navigation links, and logo now point to the correct locale-specific URLs.

## Content and Positioning

The "What is market making" section is now aligned with the current ADAMANT tradebot README concept, emphasizing a free basic version for token issuers alongside premium modules and services. The installation, quick start, and free market-making bot pages have been reviewed and updated. The command reference was synced with the bot codebase to add new commands and fix outdated descriptions.

Premium features were adjusted by removing the "No wash trading" block and adding "Balance watcher" and "Perpetual trading" (futures) blocks. Dollar prices were replaced with "Request" links that open the contact popup. The services page no longer lists fixed prices or the note about providing exchange API keys, and the homepage removed the $800 demo price from the "Order a demo" section. Various grammar fixes, broken links, and outdated dates were resolved across English and Russian strings.

## Contact and UX

A contact modal can now be opened from any page using the `#contact` anchor, such as `/cex-mm/free-market-making-bot/#contact`. Telegram was added as a third contact option via @adamant_business.

## Infrastructure

The server and WordPress stack were updated, including Ubuntu packages, PHP, MySQL, WordPress core, Polylang, Insert PHP, and WP Rocket. Duplicator was removed after migration. Full backups were taken before and after the update.

![Discussion screenshot 1](/images/engineering-notes/github/discussions/10333867/001-007bf37e.webp)

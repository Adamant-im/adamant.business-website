---
title: "ADAMANT Market-Making Software v9.0.0 is live"
slug: "discussion-59-adamant-market-making-software-v9-0-0-is-live-10356902"
description: "ADAMANT Market Making Software v9.0.0 is live The first public distribution of the open source ADAMANT market making bot is now available. It is self hosted: you run it against…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/59"
publishedAt: "2026-07-02T06:58:44Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10356902"
locale: "en"
placeholder: false
---

# ADAMANT Market-Making Software v9.0.0 is live

The first public distribution of the open-source ADAMANT market-making bot is now available. It is self-hosted: you run it against your own exchange account with your own keys, and no third-party custody is involved.

## Installation

The bot is distributed both as an npm package and as a Docker image.

**npm (CLI `mm`):**

```bash
npm install -g adamant-tradebot
mm init
mm on
```

**Docker (GHCR):**

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

A shell wrapper around `docker-compose` is also available; see the [README](https://github.com/Adamant-im/adamant-tradebot#readme) for details.

## What's in v9.0.0

This release introduces the `mm` CLI with commands such as `init`, `on`, `off`, `doctor`, `status`, and `logs`, along with a public Docker image hosted on GHCR. The market-making engine has been refactored into modular components covering the trader, order book builder, liquidity provider, and price watcher. Exchange connectors are included for Azbit, Coinstore, FameEXnet, NonKYC, P2PB2B, and StakeCube. The release also lays the groundwork for a WebUI API and ships with tests and expanded documentation.

Release notes and source code are available on [GitHub](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0). The npm package is published at [npmjs.com](https://www.npmjs.com/package/adamant-tradebot).

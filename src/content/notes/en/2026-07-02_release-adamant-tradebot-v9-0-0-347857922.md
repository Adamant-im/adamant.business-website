---
title: "ADAMANT Tradebot v9.0.0"
slug: "release-adamant-tradebot-v9-0-0-347857922"
description: "ADAMANT Tradebot v9.0.0 This is the first distributable release of the open source market making bot. The package version bumps from 8.0.0 to 9.0.0. Install Highlights Distribut…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0"
publishedAt: "2026-07-02T06:12:07Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v9.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:347857922"
locale: "en"
placeholder: false
---

# ADAMANT Tradebot v9.0.0

This is the first distributable release of the open-source market-making bot. The package version bumps from 8.0.0 to 9.0.0.

## Install

```bash
npm install -g adamant-tradebot
mm init
```

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

## Highlights

### Distribution

The bot is now distributed as an npm package, `adamant-tradebot`, with an `mm` CLI exposing commands such as `mm init`, `mm on`, `mm off`, `mm doctor`, and more. A Docker image is available on GHCR at `ghcr.io/adamant-im/adamant-tradebot`, along with a `docker-compose` stack for MongoDB and local runs. GitHub Actions publish workflows handle releases to both npm and GHCR.

### Architecture (since v8 baseline)

The codebase now features modular ADM command handlers under `modules/commands/`. A WebUI API foundation has been established using Fastify, JWT, Zod, and Socket.IO. The MM modules—trader, order book builder, liquidity provider, and price watcher—have been refactored. JSDoc types under `types/` have been expanded, alongside Jest tests and an ESLint flat config.

### Exchange connectors

Supported exchanges now include Azbit, Coinstore, FameEXnet, NonKYC, P2PB2B, and StakeCube. Legacy connectors for Bit-Z, CoinDeal, and IDCM have been removed.

### Documentation

The README has been overhauled for token issuers and self-hosted market making. A `CONTRIBUTING.md` file and AI agent instructions have been added.

### Breaking changes

Configuration now uses `config.default.jsonc` combined with `mm init` instead of a committed `config.json` file. Node.js v22.2 or later is required. Legacy exchange connectors have been removed, so users must migrate to supported exchanges. The lifecycle for npm and local installs is now CLI-driven via `mm on` and `mm off`.

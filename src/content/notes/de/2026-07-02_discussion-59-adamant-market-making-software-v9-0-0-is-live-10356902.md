---
title: "ADAMANT Market-Making Software v9.0.0 ist jetzt verfügbar"
slug: "discussion-59-adamant-market-making-software-v9-0-0-is-live-10356902"
description: "Die erste öffentliche Veröffentlichung des Open-Source-ADAMANT-Market-Making-Bots ist jetzt verfügbar. Er ist selbstgehostet: Sie betreiben ihn mit Ihrem eigenen Exchange-Konto und Ihren Schlüsseln."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/59"
publishedAt: "2026-07-02T06:58:44Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10356902"
locale: "de"
placeholder: false
---

# ADAMANT Market-Making Software v9.0.0 ist jetzt verfügbar

Die erste öffentliche Veröffentlichung des Open-Source-ADAMANT-Market-Making-Bots ist jetzt verfügbar. Er ist selbstgehostet: Sie betreiben ihn mit Ihrem eigenen Exchange-Konto und Ihren Schlüsseln, und es ist keine Drittanbieter-Verwahrung beteiligt.

## Installation

Der Bot wird sowohl als npm-Paket als auch als Docker-Image bereitgestellt.

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

Ein Shell-Wrapper um `docker-compose` ist ebenfalls verfügbar; Details finden Sie im [README](https://github.com/Adamant-im/adamant-tradebot#readme).

## Was ist neu in v9.0.0

Diese Version führt die `mm`-CLI mit Befehlen wie `init`, `on`, `off`, `doctor`, `status` und `logs` ein, zusammen mit einem öffentlichen Docker-Image, das auf GHCR gehostet wird. Die Market-Making-Engine wurde in modulare Komponenten umgestaltet, die den Trader, den Orderbuch-Builder, den Liquiditätsanbieter und den Preis-Beobachter umfassen. Exchange-Connectors sind für Azbit, Coinstore, FameEXnet, NonKYC, P2PB2B und StakeCube enthalten. Die Version legt außerdem den Grundstein für eine WebUI-API und wird mit Tests sowie erweiterter Dokumentation ausgeliefert.

Versionshinweise und Quellcode sind auf [GitHub](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0) verfügbar. Das npm-Paket ist unter [npmjs.com](https://www.npmjs.com/package/adamant-tradebot) veröffentlicht.

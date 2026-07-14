---
title: "ADAMANT Tradebot v9.0.0"
slug: "release-adamant-tradebot-v9-0-0-347857922"
description: "ADAMANT Tradebot v9.0.0: Erste verteilbare Version des Open-Source-Market-Making-Bots. Paketversion steigt von 8.0.0 auf 9.0.0. Installation, Highlights, Breaking Changes."
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
locale: "de"
placeholder: false
---

# ADAMANT Tradebot v9.0.0

Dies ist die erste verteilbare Version des Open-Source-Market-Making-Bots. Die Paketversion wurde von 8.0.0 auf 9.0.0 erhöht.

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

Der Bot wird nun als npm-Paket `adamant-tradebot` verteilt, mit einer `mm`-CLI, die Befehle wie `mm init`, `mm on`, `mm off`, `mm doctor` und mehr bereitstellt. Ein Docker-Image ist auf GHCR unter `ghcr.io/adamant-im/adamant-tradebot` verfügbar, zusammen mit einem `docker-compose`-Stack für MongoDB und lokale Ausführungen. GitHub Actions Publish-Workflows stellen sicher, dass Releases sowohl auf npm als auch auf GHCR veröffentlicht werden.

### Architecture (seit v8 Basis)

Der Codebase verfügt nun über modulare ADM-Befehlshandler unter `modules/commands/`. Eine WebUI-API-Grundlage wurde mit Fastify, JWT, Zod und Socket.IO eingerichtet. Die MM-Module – Trader, Order-Book-Builder, Liquidity Provider und Price Watcher – wurden überarbeitet. JSDoc-Typen unter `types/` wurden erweitert, ergänzt durch Jest-Tests und eine flache ESLint-Konfiguration.

### Exchange connectors

Unterstützte Börsen umfassen nun Azbit, Coinstore, FameEXnet, NonKYC, P2PB2B und StakeCube. Veraltete Connectors für Bit-Z, CoinDeal und IDCM wurden entfernt.

### Documentation

Die README wurde für Token-Emittenten und selbstgehostetes Market Making überarbeitet. Eine `CONTRIBUTING.md`-Datei sowie Anweisungen für KI-Agenten wurden hinzugefügt.

### Breaking changes

Die Konfiguration verwendet nun `config.default.jsonc` in Kombination mit `mm init` anstelle einer committed `config.json`-Datei. Node.js v22.2 oder höher ist erforderlich. Veraltete Exchange-Connectors wurden entfernt, daher müssen Nutzer zu unterstützten Börsen migrieren. Der Lebenszyklus für npm- und lokale Installationen erfolgt nun über die CLI mittels `mm on` und `mm off`.

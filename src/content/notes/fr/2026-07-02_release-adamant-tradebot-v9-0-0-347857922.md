---
title: "ADAMANT Tradebot v9.0.0"
slug: "release-adamant-tradebot-v9-0-0-347857922"
description: "Première version distribuable du bot open source de market making. Passage de la version 8.0.0 à 9.0.0. Découvrez les nouveautés et changements."
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
locale: "fr"
placeholder: false
---

# ADAMANT Tradebot v9.0.0

Ceci est la première version distribuable du bot open source de market making. La version du package passe de 8.0.0 à 9.0.0.

## Installation

```bash
npm install -g adamant-tradebot
mm init
```

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

## Fonctionnalités principales

### Distribution

Le bot est désormais distribué sous forme de package npm, `adamant-tradebot`, avec une interface CLI `mm` qui expose des commandes telles que `mm init`, `mm on`, `mm off`, `mm doctor`, et d'autres. Une image Docker est disponible sur GHCR à l'adresse `ghcr.io/adamant-im/adamant-tradebot`, accompagnée d'une pile `docker-compose` pour MongoDB et les exécutions locales. Les workflows de publication sur GitHub Actions gèrent les versions sur npm et GHCR.

### Architecture (depuis la version 8)

La base de code intègre désormais des gestionnaires de commandes ADM modulaires situés dans `modules/commands/`. Une base d'API pour une interface WebUI a été mise en place avec Fastify, JWT, Zod et Socket.IO. Les modules MM — trader, constructeur de carnet d'ordres, fournisseur de liquidités et observateur de prix — ont été refactorisés. Les types JSDoc dans `types/` ont été étendus, de même que les tests Jest et la configuration ESLint en format plat.

### Connecteurs d'échanges

Les échanges pris en charge incluent désormais Azbit, Coinstore, FameEXnet, NonKYC, P2PB2B et StakeCube. Les connecteurs obsolètes pour Bit-Z, CoinDeal et IDCM ont été supprimés.

### Documentation

Le fichier README a été entièrement revu pour les émetteurs de jetons et le market making auto-hébergé. Un fichier `CONTRIBUTING.md` ainsi que des instructions pour agents IA ont été ajoutés.

### Changements cassants

La configuration utilise désormais `config.default.jsonc` combiné à `mm init`, au lieu du fichier `config.json` précédemment versionné. Node.js v22.2 ou ultérieur est requis. Les connecteurs d'échanges obsolètes ont été supprimés, les utilisateurs devant migrer vers les échanges pris en charge. Le cycle de vie des installations npm et locales est désormais piloté par la CLI via `mm on` et `mm off`.

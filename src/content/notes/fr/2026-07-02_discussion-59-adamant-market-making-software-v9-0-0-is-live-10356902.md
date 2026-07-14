---
title: "ADAMANT Market-Making Software v9.0.0 est disponible"
slug: "discussion-59-adamant-market-making-software-v9-0-0-is-live-10356902"
description: "La version 9.0.0 du logiciel open source de market-making ADAMANT est disponible. Hébergé localement, vous le gérez avec vos propres clés."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/59"
publishedAt: "2026-07-02T06:58:44Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10356902"
locale: "fr"
placeholder: false
---

# ADAMANT Market-Making Software v9.0.0 est disponible

La première distribution publique du bot open source de market-making ADAMANT est désormais disponible. Il est auto-hébergé : vous l'exécutez sur votre propre compte d'échange avec vos propres clés, sans intervention d'un tiers détenant vos fonds.

## Installation

Le bot est distribué à la fois en tant que package npm et comme image Docker.

**npm (CLI `mm`) :**

```bash
npm install -g adamant-tradebot
mm init
mm on
```

**Docker (GHCR) :**

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

Un wrapper shell autour de `docker-compose` est également disponible ; consultez le [README](https://github.com/Adamant-im/adamant-tradebot#readme) pour plus de détails.

## Au programme de la v9.0.0

Cette version introduit le CLI `mm` avec des commandes telles que `init`, `on`, `off`, `doctor`, `status` et `logs`, ainsi qu'une image Docker publique hébergée sur GHCR. Le moteur de market-making a été restructuré en composants modulaires couvrant le trader, le générateur de carnet d'ordres, le fournisseur de liquidités et le surveillant de prix. Des connecteurs d'échange sont inclus pour Azbit, Coinstore, FameEXnet, NonKYC, P2PB2B et StakeCube. Cette version jette également les bases d'une API pour une interface WebUI et inclut des tests ainsi qu'une documentation étendue.

Les notes de version et le code source sont disponibles sur [GitHub](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0). Le package npm est publié sur [npmjs.com](https://www.npmjs.com/package/adamant-tradebot).

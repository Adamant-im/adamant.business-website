---
title: "ADAMANT Tradebot v8.0.0"
slug: "release-adamant-tradebot-v8-0-0-345264629"
description: "ADAMANT Tradebot v8.0.0 est une mise à jour majeure du bot open source de market making, passant la version du package de 7.0.1 à 8.0.0. Le flux d'initialisation a été repensé pour inclure…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v8.0.0"
publishedAt: "2026-06-26T10:47:34Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v8.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:345264629"
locale: "fr"
placeholder: false
---

ADAMANT Tradebot v8.0.0 est une mise à jour majeure du bot open source de market making, passant la version du package de 7.0.1 à 8.0.0.

Le flux d’initialisation a été repensé pour inclure des migrations de base de données et une phase de démarrage progressive. Les gestionnaires de commandes ADM sont désormais modulaires sous `modules/commands/`, et un nouveau pipeline de traitement des transactions ADM a été introduit avec les composants `adamantApi`, `admTxChecker` et `admTxParser`.

Une API WebUI optionnelle a été ajoutée, basée sur Fastify HTTP avec authentification JWT, validation via Zod et transport Socket.IO. Elle expose des routes pour le compte, l’état du bot, les commandes, les données de marché, les messages et les paramètres de trading.

Les connecteurs d’échanges ont été mis à jour : XeggeX a été supprimé, FameEX a migré vers FameEXnet, et Azbit, P2PB2B, NonKYC, Coinstore et StakeCube ont été mis à jour.

L’environnement d’exécution nécessite désormais Node.js v22.2+, ainsi que `adamant-api` 3.x et `mongodb` 7.x. Les outils ont été mis à jour vers ESLint 10, les suites de tests Jest ont été étendues, et la couverture JSDoc dans `types/` a été améliorée. Les ajouts à la documentation incluent `CONTRIBUTING.md`, ainsi que des mises à jour de `README.md` et `config.default.jsonc`.

Pour mettre à jour, récupérez le dernier code, installez les dépendances, vérifiez et fusionnez votre `config.jsonc` avec `config.default.jsonc`, puis démarrez le bot.

```bash
git pull
npm i
# Review and merge config.jsonc with config.default.jsonc
npm start
```

### Changements cassants

Node.js v22.2+ est désormais requis, contre v18+ précédemment. Une migration de base de données renomme le champ `type` des ordres en `side`. Les modifications du schéma de configuration exigent de consulter `config.default.jsonc` et d’intégrer les mises à jour dans les configurations existantes. XeggeX a été supprimé, et les utilisateurs de FameEX doivent passer au connecteur FameEXnet. Les métadonnées de licence ont été changées en `UNLICENSED` avec `private: true`.

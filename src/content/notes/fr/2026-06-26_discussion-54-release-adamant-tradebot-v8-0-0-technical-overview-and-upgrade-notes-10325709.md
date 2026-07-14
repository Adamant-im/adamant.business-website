---
title: "Publication : adamant-tradebot v8.0.0 — aperçu technique et notes de mise à jour"
slug: "discussion-54-release-adamant-tradebot-v8-0-0-technical-overview-and-upgrade-notes-10325709"
description: "Aperçu technique et notes de mise à jour pour adamant-tradebot v8.0.0, une mise à jour majeure du bot open source (Basic) de market making."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/54"
publishedAt: "2026-06-26T16:06:12Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10325709"
locale: "fr"
placeholder: false
---

## Résumé

ADAMANT tradebot v8.0.0 est désormais publié sur la branche `dev` et taggé v8.0.0. Cette mise à jour majeure du bot open source (Basic) de market making réaligne la base de code OSS sur la référence technique actuelle de la version Premium, tout en conservant l’étendue du code OSS : orienté REST en premier lieu, centré sur le spot, sans réintroduction de modules exclusifs à la version Premium. Si vous exploitez le bot pour un jeton coté, le résultat pratique est un environnement d’exécution plus fiable, avec un démarrage plus propre, des mises à jour plus sûres sur les bases de données existantes, des connecteurs d’échanges actualisés, et une API WebUI privée optionnelle pour les clients externes.

## Architecture

La séquence de démarrage dans `app.js` est désormais explicite et ordonnée. Elle attend la connexion MongoDB et `db.ready`, exécute les migrations de base de données enregistrées, initialise les services tels que le socket ADM/le sondage et l’API WebUI optionnelle, prépare les métadonnées des connecteurs, puis démarre enfin les modules de trading actifs `mm_*`. Cela réduit les conditions de course au démarrage à froid et rend les mises à jour plus sûres.

Le fichier monolithique `modules/commandTxs.js` a été divisé en gestionnaires spécialisés sous `modules/commands/` (account, orders, trade, info, features), accompagnés de composants partagés. Les commandes arrivent toujours via ADAMANT Messenger et Telegram là où configuré, mais le chemin du code est désormais plus facile à maintenir. Les anciens modules de réception ADM ont été remplacés par `adamantApi.js`, `admTxChecker.js` et `admTxParser.js`, alignant ainsi la réception des commandes sur `adamant-api` 3.x et les modèles actuels de socket/sondage.

Les migrations de base de données s’exécutent ponctuellement au démarrage via `modules/dbMigrations.js`. La première migration incluse renomme en toute sécurité l’ancien champ d’ordre `type` en `side`. Les déploiements existants doivent sauvegarder leur base MongoDB avant le premier démarrage en v8, puis vérifier les ordres ouverts et les statistiques après la migration.

## API WebUI optionnelle (Bot API v1)

La version v8.0 inclut une API HTTP privée située dans le répertoire `api/`. Elle utilise un serveur HTTP Fastify avec authentification JWT, validation des requêtes Zod et Socket.IO pour les hooks de transport. Les routes principales sous `/api/v1` incluent les fonctionnalités bootstrap, market, account, params, commands et messages. L’API est optionnelle et désactivée par défaut, conçue pour des clients graphiques auto-hébergés, tandis que le bot reste le seul composant communiquant avec les échanges. Activez-la via les paramètres `private_webui` dans la configuration. Définissez une clé secrète forte `private_webui_secret_key`, limitez `private_webui_allowed_ips`, et gardez l’API hors d’internet public sauf si vous savez ce que vous faites.

## Connecteurs d’échanges

Les connecteurs pris en charge dans l’édition Basic incluent Azbit, P2PB2B, StakeCube, Coinstore, FameEX (via le nouveau connecteur FameEXnet) et NonKYC. Les opérateurs doivent noter les changements incompatibles : l’interface API de FameEX exige de basculer la configuration vers FameEXnet, et XeggeX a été retiré de l’OSS. Les modules de market making ont été actualisés en parallèle des adaptateurs de trading.

## Dépendances et guide de mise à jour

Les mises à jour notables du runtime incluent `adamant-api` 3.x, `mongodb` 7, ainsi que l’ajout de `zod`, `fast-jwt` et `json-parse-bigint`. Express a été supprimé du chemin WebUI. Pour passer de la v7.x à la v8, arrêtez le bot, récupérez le dernier code et installez les dépendances :

```bash
pm2 stop tradebot
cd adamant-tradebot
git pull
npm i
```

Assurez-vous d’avoir installé Node.js 22.2 ou supérieur. Fusionnez les nouveaux champs de `config.default.jsonc` dans votre `config.jsonc`, vérifiez les paramètres du connecteur FameEXnet, et sauvegardez votre base de données MongoDB pour permettre aux migrations de s’exécuter au premier démarrage. Si l’API WebUI est activée, vérifiez ses paramètres de sécurité. Enfin, redémarrez le bot à l’aide de votre gestionnaire de processus. Les configurations nommées continuent de fonctionner comme prévu.

## Limite de portée OSS

La version v8.0 intègre la qualité d’ingénierie de la ligne Premium dans l’arborescence OSS sans réintroduire d’hypothèses propres à la version Premium. La base actuelle, orientée spot et REST en premier lieu, est préservée, sans connecteurs d’échanges WebSocket obligatoires, sans pile pour les perpétuels/futures, ni catalogue d’échanges élargi.

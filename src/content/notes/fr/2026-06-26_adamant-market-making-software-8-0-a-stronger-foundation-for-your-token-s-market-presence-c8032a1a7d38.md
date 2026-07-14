---
title: "ADAMANT Tradebot 8.0 : Des bases renforcées pour la création de marché auto-hébergée"
slug: "adamant-market-making-software-8-0-a-stronger-foundation-for-your-token-s-market-presence-c8032a1a7d38"
description: "La version 8.0 est la mise à jour la plus importante du ADAMANT Tradebot open source depuis des années. Pour les émetteurs de jetons, l'écart entre une cotation et un marché réel existe."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-software-8-0-a-stronger-foundation-for-your-tokens-market-presence-c8032a1a7d38"
publishedAt: "2026-06-26T15:58:19.696Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/c8032a1a7d38/001-0-qywflgfw1krzccj5-png.webp"
cardSpan: "full"
originalId: "medium:c8032a1a7d38"
locale: "fr"
placeholder: false
---

La version 8.0 est la mise à jour la plus importante du ADAMANT Tradebot open source depuis des années. Pour les émetteurs de jetons, l'écart entre une cotation et un marché réel est tangible : un carnet d'ordres mince effraie les traders, un écart important rend chaque échange coûteux, et les trous dans le carnet donnent l'impression d'un projet négligé. Le bot comble cet écart en maintenant des politiques de spread, de liquidité et de volume sur les exchanges où votre jeton est effectivement coté.

La proposition de base reste inchangée. Vous hébergez le bot sur votre propre VPS, vous le connectez à votre exchange via des clés API qui ne quittent jamais votre infrastructure, et vous contrôlez qui peut envoyer des commandes. La version 8.0 rend le bot plus fiable, plus sécurisé et plus facile à exploiter à long terme — passant d’un outil qui fonctionne si on le surveille constamment à une infrastructure conçue pour fonctionner sans surveillance.

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/002-1-swca0-a2gacbe1zvi17jjq-png.webp)

### Sécurité opérationnelle

La version 8.0 met à jour les dépendances avec un bilan d'audit propre (aucune vulnérabilité critique ou élevée), renforce les schémas d'accès aux API de gestion facultatives, et aligne la base de code sur la même référence technique utilisée dans la gamme de produits commerciaux — sans intégrer toutefois les fonctionnalités réservées aux versions Premium. Vos clés API d'échange ne sont jamais transmises à ADAMANT ni à un tableau de bord SaaS.

### Interfaces de gestion

Le bot peut être contrôlé via ADAMANT Messenger (le canal de commande d'origine, chiffré et décentralisé), Telegram (disponible dans la version Premium du bot), et une interface Web en cours de développement. En interne, la version 8.0 ajoute une API WebUI privée moderne basée sur Fastify, avec authentification JWT, schémas de requête validés et mises à jour en temps réel via WebSocket. Pour la plupart des opérateurs, cela reste transparent — vous bénéficiez simplement d'une expérience de gestion plus réactive et plus fiable lorsque l'interface Web est activée.

Au quotidien, vous faites toujours ce que vous faisiez auparavant : vérifier les soldes, ajuster le spread, activer les politiques de volume, définir des plages de prix et désactiver des modules lorsque le marché devient instable. La différence, c’est que le bot traite désormais ces commandes de manière plus prévisible.

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/003-1-6ltktmqgyhhs6pniej4dcq-png.webp)

### Support des exchanges

Le bot open source prend en charge un ensemble ciblé d'exchanges centralisés : Azbit, P2PB2B, StakeCube, Coinstore, FameEX (via FameEXnet — connecteur mis à jour en v8.0) et NonKYC. Les utilisateurs de FameEX doivent noter que le bot communique désormais avec FameEXnet, ce qui signifie que la mise à jour nécessite un changement planifié du connecteur, et non un simple `git pull`. Le bot gratuit reste délibérément centré sur les marchés au comptant, avec une approche priorisant les API REST, sans complexité liée aux contrats à terme. Une couverture étendue des CEX et des modules de stratégie avancés font partie de la gamme de produits Premium.

### En interne

L'ancien gestionnaire de commandes monolithique a été divisé en modules spécialisés. La réception des transactions ADAMANT a été reconstruite sur `adamant-api` 3.x. Le démarrage attend désormais la base de données, exécute des migrations automatiques pour mettre à jour en toute sécurité les anciennes données d'ordres, charge les métadonnées des exchanges, puis lance uniquement les boucles de trading.

Le runtime cible Node.js 22.2+ avec le pilote MongoDB 7.x et une pile HTTP mise à jour. La couche WebUI privée utilise JWT, la validation de schéma, des listes d'autorisation IP et des valeurs par défaut privilégiant localhost, afin que la commodité de gestion ne devienne pas une surface d'attaque. De nouveaux ensembles de tests automatisés couvrent l'API WebUI et les utilitaires principaux, rendant les mises à jour moins risquées pour les équipes techniques.

### Mise à niveau

Les nouveaux projets peuvent commencer avec :

```bash
git clone https://github.com/Adamant-im/adamant-tradebot
cd adamant-tradebot
npm i
cp config.default.jsonc config.jsonc
# edit config.jsonc - pair, API keys, spread/volume settings
npm start
```

Les installations existantes en v7.x doivent arrêter le bot, effectuer un pull, réinstaller, fusionner les nouveaux champs provenant de `config.default.jsonc` dans `config.jsonc`, puis redémarrer :

```bash
pm2 stop tradebot
git pull
npm i
# merge new config.default.jsonc fields into your config.jsonc
pm2 restart tradebot
```

Cette version est suivie dans [GitHub PR #110](https://github.com/Adamant-im/adamant-tradebot/pull/110) et clôture le ticket principal [#109](https://github.com/Adamant-im/adamant-tradebot/issues/109). La documentation complète d'installation et la référence des commandes sont disponibles sur [marketmaking.app](https://marketmaking.app/cex-mm/installation/).

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/004-0-fcjgeqhiqq-h0grv-png.webp)

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/005-0-8ihrvb-is-qsshbb-png.webp)

---
title: "ADAMANT Tradebot v2.10.6"
slug: "release-adamant-tradebot-v2-10-6-35700159"
description: "Cette version améliore les performances et la stabilité du ADAMANT Tradebot, avec une optimisation de l'utilisation du CPU et des correctifs pour les limites API et les réponses retardées."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v2.10.6"
publishedAt: "2020-12-24T13:13:19Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v2.10.6"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:35700159"
locale: "fr"
placeholder: false
---

Cette version se concentre sur l'amélioration des performances et de la stabilité du ADAMANT Tradebot. L'utilisation du CPU a été optimisée, et plusieurs problèmes affectant les limites d'API et les réponses aux requêtes retardées ont été résolus. La pagination des réponses de Bit-Z a également été corrigée afin de garantir une récupération fiable des données depuis cet échange.

Côté fonctionnalités, les commandes `/balances`, `/orders`, `/rates` et `/stats` fournissent désormais des informations supplémentaires pour aider les opérateurs à surveiller plus efficacement l'activité du bot. Un nouveau module `orderUtils` a été introduit dans le cadre du travail continu de refactoring, et un nouveau type d'ordre `man` est désormais pris en charge pour les ordres placés manuellement. La fréquence des notifications a été réduite afin de limiter les alertes inutiles. Les dépendances ont été mises à jour vers leurs dernières versions compatibles.

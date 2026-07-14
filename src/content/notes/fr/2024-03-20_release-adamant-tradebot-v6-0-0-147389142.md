---
title: "ADAMANT Tradebot v6.0.0"
slug: "release-adamant-tradebot-v6-0-0-147389142"
description: "Cette version introduit une refonte majeure du ADAMANT Tradebot, regroupant la configuration des échanges dans un seul fichier tradeParams_Default.js."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0"
publishedAt: "2024-03-20T08:46:40Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:147389142"
locale: "fr"
placeholder: false
---

Cette version introduit une refonte majeure du ADAMANT Tradebot, regroupant la configuration des échanges dans un seul fichier `tradeParams_Default.js` utilisé pour tous les échanges. Les fonctions `getSmartPrice()` et `getCleanPrice()` ont été mises à jour, ainsi que la fonction `isOrderOutOfPriceWatcherRange()`. De nouvelles fonctions utilitaires ont été ajoutées pour prendre en charge ces modifications.

Le Price watcher a été amélioré et prend désormais en charge une action `prevent`. L'estimation du volume est désormais affichée lors des mises à jour de montant ou d'intervalle. La commande `/stats` fournit des informations étendues, et la commande `/info` permet d'obtenir des informations sur le retrait de pièces et les réseaux. Les informations sur les soldes ont également été étendues.

La commande `/account` fournit désormais des informations sur les frais de trading et le volume. Le bot collecte les informations de remplissage des ordres pour tous les ordres, et le générateur dynamique de carnet d'ordres a été amélioré. Après la création d'un ordre de market-making, le bot vérifie si un ordre a été exécuté. La fonction `getMinOrderAmount()` a également été améliorée.

Le support de l'échange XeggeX a été ajouté. Les connecteurs d'échanges pour Azbit, Coinstore, FameEX, NonKYC, P2B et StakeCube ont été mis à jour. Cette version inclut également diverses améliorations, corrections de bogues et mises à jour de dépendances.

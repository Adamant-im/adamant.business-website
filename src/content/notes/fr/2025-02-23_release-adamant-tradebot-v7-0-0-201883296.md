---
title: "ADAMANT Tradebot v7.0.0"
slug: "release-adamant-tradebot-v7-0-0-201883296"
description: "Cette version introduit la mise en cache des requêtes et de nouvelles commandes comme /orderbook, /trades, /ticker, /order et /cancel. Mises à jour structurelles et correctifs."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0"
publishedAt: "2025-02-23T05:56:49Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v7.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:201883296"
locale: "fr"
placeholder: false
---

Cette version introduit une fonctionnalité de mise en cache des requêtes et plusieurs nouvelles commandes pour interagir avec les exchanges, notamment `/orderbook`, `/trades`, `/ticker`, `/order` et `/cancel`. La commande `/help` a été mise à jour pour inclure des informations sur le logiciel du bot et sa configuration.

Les modules Command, Order book et Trader ont été refactorisés pour une meilleure maintenabilité. Un nouveau paramètre de configuration `database` a été ajouté pour prendre en charge ces modifications. La fonction `getOrderDetails()` a été corrigée dans les deux connecteurs Azbit et P2B.

Les dépendances ont été mises à jour, et divers correctifs de bogues ainsi que des améliorations générales ont été appliqués sur l'ensemble du code. La journalisation a été améliorée, et des types TypeScript ont été ajoutés pour renforcer la sécurité des types et l'expérience des développeurs.

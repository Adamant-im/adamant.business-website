---
title: "Liquidité et maintien de l'écart avec le bot de market making ADAMANT v2.7.0"
slug: "liquidity-and-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
description: "La liquidité et l'écart sont cruciaux pour les projets cryptos. Découvrez comment le bot ADAMANT marketmaking.app maintient ces paramètres."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/liquidity-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
publishedAt: "2020-11-22T19:34:30.866Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e248058d3770/001-1-3lizhhkkfifjduf5z4zxtq-png.webp"
cardSpan: "full"
originalId: "medium:e248058d3770"
locale: "fr"
placeholder: false
---

Lorsque les investisseurs évaluent un projet de cryptomonnaie, ils examinent la liquidité et l'écart sur les exchanges. La liquidité indique le nombre de jetons que les utilisateurs peuvent acheter ou vendre, tandis que l'écart reflète la différence de prix entre l'achat et la vente. Même les petits projets peuvent désormais maintenir une liquidité active et des écarts compétitifs grâce au bot de market making ADAMANT.

La version 2.7.0 introduit la gestion de la liquidité et de l'écart comme fonctionnalités principales. Les utilisateurs peuvent configurer ces paramètres via la commande `/enable liq`, qui définit des objectifs de liquidité et d'écart que le bot maintiendra sur les exchanges pris en charge.

Cette version ajoute également une fonction de surveillance des prix. Les commandes `/make price` et `/enable pw` permettent aux opérateurs de définir et de surveiller des prix cibles, offrant ainsi un meilleur contrôle sur la valorisation du jeton sur le marché.

Plusieurs améliorations opérationnelles complètent cette mise à jour. La commande `/balances` fournit désormais des informations plus détaillées, et la journalisation a été améliorée pour une meilleure observabilité. Le bot gère désormais les délais de requête de manière plus robuste, et une analyse de tendance pour le market making a été ajoutée afin d'aider le bot à prendre des décisions commerciales plus éclairées.

Le ADAMANT tradebot est un projet open source. Les notes de version et les téléchargements sont disponibles sur GitHub.

---
title: "Présentation de Balance Watcher : une surveillance intelligente et en temps réel des soldes dans le bot de market-making"
slug: "introducing-balance-watcher-smart-real-time-balance-surveillance-in-the-market-making-bot-0cbdfcee131e"
description: "Balance Watcher est un module de surveillance en temps réel conçu pour protéger les fonds et améliorer la fiabilité du bot de market-making en conditions de marché volatiles."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-balance-watcher-smart-real-time-balance-surveillance-in-the-market-making-bot-0cbdfcee131e"
publishedAt: "2026-01-22T15:54:47.278Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/0cbdfcee131e/001-1-ugrxafukeqdczx8w8f4dxw-png.webp"
cardSpan: "full"
originalId: "medium:0cbdfcee131e"
locale: "fr"
placeholder: false
---

Dans le cadre du market-making algorithmique, la performance du bot et la prise de risque sont primordiales. Balance Watcher est un module de surveillance en temps réel des soldes conçu pour protéger les fonds et améliorer la fiabilité du bot en cas de conditions de marché volatiles. Il garantit qu’un bot de market-making n’opère pas à l’aveugle lorsque des événements imprévus affectent les soldes.

Les market makers évoluent dans des environnements où des variations rapides des prix, des stratégies agressives de bots, des erreurs d’API ou des pannes d’échange peuvent fortement impacter les soldes des comptes. Les systèmes traditionnels reprennent souvent le trading sans évaluer si les conditions sont sûres, exposant ainsi les fonds. Balance Watcher supervise en continu les soldes des comptes et compare les données en direct à des référentiels historiques définis. Si quelque chose ne va pas, il intervient en envoyant des alertes et en déclenchant des actions préventives au lieu de laisser le bot fonctionner sans contrôle.

Le système suit les derniers soldes des actifs ainsi que les mouvements de prix, et compare ces données à une capture stockée comme référence afin de détecter tout comportement anormal. Il surveille les baisses inattendues qui ne peuvent être justifiées par les mouvements de marché, y compris des situations comme des écarts soudains de liquidité ou des activités hostiles de bots. Lorsqu’une anomalie est détectée, Balance Watcher envoie des alertes détaillées avec contexte, aidant ainsi les opérateurs à prendre rapidement des décisions éclairées. Selon la configuration, il peut suspendre toute activité du bot ou passer en mode de sécurité avec une exposition au risque limitée.

![Présentation de Balance Watcher — une surveillance intelligente et en temps réel des soldes dans le bot de market-making](/images/engineering-notes/medium/0cbdfcee131e/002-0-z8beu6lxof-2s1qa.webp)

Balance Watcher combine deux techniques clés de surveillance. La première est le suivi absolu de la devise de base, qui évalue les baisses directes de votre devise de règlement (comme l’USDT ou le BTC), signalant souvent une utilisation ou des pertes d’actifs non planifiées. La seconde est le suivi normalisé du solde combiné. En convertissant les soldes de jetons en une référence commune, le système estime où devrait se situer votre valeur totale compte tenu des prix actuels. Si votre solde réel tombe en dessous de cette valeur attendue selon des seuils définis, une alerte est déclenchée.

![Présentation de Balance Watcher — une surveillance intelligente et en temps réel des soldes dans le bot de market-making](/images/engineering-notes/medium/0cbdfcee131e/003-0-e5ykx8yvvnxmgrxl.webp)

Cette double approche permet de détecter à la fois les anomalies évidentes et subtiles des soldes, avec une résilience même en cas de volatilité normale du marché. Pour plus de détails techniques et de paramètres, consultez la [description de la fonctionnalité sur GitHub](https://github.com/Adamant-im/adamant-tradebot/issues/85) pour le ADAMANT tradebot.

---
title: "ADAMANT InfoService v3.3.5 ajoute la validation croisée des taux"
slug: "reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
description: "ADAMANT InfoService agrège les taux de devises et cryptomonnaies depuis MOEX, Currency Api, Coinmarketcap, CryptoCompare et Coingecko, en les exposant via une API."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
publishedAt: "2022-02-15T10:59:58.332Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/791bd7d9e097/001-1-olubh0mvysjvmtykzm2u4a-png.webp"
cardSpan: "full"
originalId: "medium:791bd7d9e097"
locale: "fr"
placeholder: false
---

ADAMANT InfoService est un service qui agrège les taux de devises et de cryptomonnaies provenant de MOEX, Currency-Api, Coinmarketcap, CryptoCompare et Coingecko, en les exposant via une API destinée aux applications consommatrices.

La version v3.3.5 introduit Currency-Api comme source supplémentaire pour les taux fiat. Plus important encore, InfoService compare désormais les taux reçus depuis différents fournisseurs et signale les données incorrectes ou anormales lorsque des écarts sont détectés. Cette validation croisée entre sources améliore la fiabilité du service, car une source défaillante unique est moins susceptible de propager des taux erronés aux consommateurs.

Cette version inclut également des refontes internes, des corrections de bogues, l’intégration d’un linter et des mises à jour de dépendances.

La documentation de l’API est disponible sur le [wiki ADAMANT InfoService](https://github.com/Adamant-im/adamant-currencyinfo-services/wiki/InfoServices-API-documentation). Les notes complètes de la version sont accessibles sur la [page de publication v3.3.5](https://github.com/Adamant-im/adamant-currencyinfo-services/releases/tag/v3.3.5).

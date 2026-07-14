---
title: "ADAMANT InfoService v3.3.5 adds cross-source rate validation"
slug: "reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
description: "ADAMANT InfoService is a service that aggregates currency and cryptocurrency rates from MOEX, Currency Api, Coinmarketcap, CryptoCompare, and Coingecko, exposing them through an…"
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
locale: "en"
placeholder: false
---

ADAMANT InfoService is a service that aggregates currency and cryptocurrency rates from MOEX, Currency-Api, Coinmarketcap, CryptoCompare, and Coingecko, exposing them through an API for downstream applications.

The v3.3.5 release introduces Currency-Api as an additional source for fiat rates. More significantly, InfoService now compares rates received from different providers and flags incorrect or anomalous data when deviations are detected. This cross-source validation makes the service more reliable, since a single misbehaving source is less likely to propagate bad rates to consumers.

The release also includes internal refactoring, bug fixes, linter integration, and dependency updates.

API documentation is available on the [ADAMANT InfoService wiki](https://github.com/Adamant-im/adamant-currencyinfo-services/wiki/InfoServices-API-documentation). Full release notes are on the [v3.3.5 release page](https://github.com/Adamant-im/adamant-currencyinfo-services/releases/tag/v3.3.5).

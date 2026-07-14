---
title: "ADAMANT InfoService v3.3.5 fügt Querquellen-Validierung von Kursen hinzu"
slug: "reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
description: "ADAMANT InfoService aggregiert Devisen- und Kryptowährungskurse von MOEX, Currency Api, Coinmarketcap, CryptoCompare und Coingecko über eine API für nachgelagerte Anwendungen."
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
locale: "de"
placeholder: false
---

ADAMANT InfoService ist ein Dienst, der Devisen- und Kryptowährungskurse von MOEX, Currency-Api, Coinmarketcap, CryptoCompare und Coingecko aggregiert und über eine API für nachgelagerte Anwendungen bereitstellt.

Die Version v3.3.5 führt Currency-Api als zusätzliche Quelle für Fiat-Kurse ein. Noch bedeutender ist, dass InfoService nun Kurse aus verschiedenen Anbietern vergleicht und fehlerhafte oder auffällige Daten markiert, wenn Abweichungen erkannt werden. Diese Querquellen-Validierung erhöht die Zuverlässigkeit des Dienstes, da eine einzelne fehlerhafte Quelle weniger wahrscheinlich falsche Kurse an Nutzer weitergibt.

Zu den weiteren Änderungen gehören interne Refactorings, Fehlerbehebungen, die Integration eines Linters sowie Aktualisierungen von Abhängigkeiten.

Die API-Dokumentation ist im [ADAMANT InfoService-Wiki](https://github.com/Adamant-im/adamant-currencyinfo-services/wiki/InfoServices-API-documentation) verfügbar. Die vollständigen Release Notes finden sich auf der [v3.3.5-Release-Seite](https://github.com/Adamant-im/adamant-currencyinfo-services/releases/tag/v3.3.5).

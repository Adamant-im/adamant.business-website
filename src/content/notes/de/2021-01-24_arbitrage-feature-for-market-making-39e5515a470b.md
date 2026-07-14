---
title: "Arbitrage-Funktion für Market-Making"
slug: "arbitrage-feature-for-market-making-39e5515a470b"
description: "Der ADAMANT Trading- und Market-Making-Bot unterstützt jetzt eine Arbitrage-Funktion. Token-Besitzer können Preisüberwachung auf anderen Börsen einrichten."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/arbitrage-feature-for-market-making-39e5515a470b"
publishedAt: "2021-01-24T16:41:51.417Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/39e5515a470b/001-0-vcyqehma-vfieqdv-png.webp"
cardSpan: "full"
originalId: "medium:39e5515a470b"
locale: "de"
placeholder: false
---

Der ADAMANT Trading- und Market-Making-Bot unterstützt jetzt eine Arbitrage-Funktion. Token-Besitzer können Preisüberwachung auf anderen Börsen und Handelspaaren mit dem Befehl `/enable pw` einrichten.

Wenn ein Market-Maker einen Token über mehrere Paare oder Börsen handelt, kann er ein führendes Handelspaar innerhalb eines numerischen Bereichs festlegen und die verbleibenden Paare darauf ausrichten. Bei Empfang eines Preisbereichs von einem anderen Handelspaar platziert der Bot entweder direkte Gebote und Angebote gemäß der *strict*-Policy oder schätzt reale Preise gemäß der *smart*-Policy. Beispielsweise ergibt die *strict*-Policy basierend auf einem gegebenen Orderbuch einen Bereich von 0,0122–0,0128, während die *smart*-Policy einen breiteren Bereich von 0,0114–0,0133 ergibt.

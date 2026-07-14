---
title: "CoinOptimus Trading Bot auf Version 2.0.0 aktualisiert"
slug: "open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
description: "ADAMANT CoinOptimus, ein selbstgehosteter Kryptohandelbot für nicht-professionelle Trader, wurde auf Version 2.0.0 aktualisiert. Die Veröffentlichung umfasst Refactoring, Fehlerbehebungen und fünf neue Befehle."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
publishedAt: "2024-04-03T11:29:39.685Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/816935470693/001-1-yi0sr85whds3uma4ith6na-png.webp"
cardSpan: "full"
originalId: "medium:816935470693"
locale: "de"
placeholder: false
---

ADAMANT CoinOptimus, ein selbstgehosteter Kryptowährungs-Handelsbot für nicht-professionelle Trader, wurde auf Version 2.0.0 aktualisiert. Die Veröffentlichung umfasst Refactoring, Fehlerbehebungen und fünf neue Befehle: `/fill`, `/stats`, `/deposit`, `/account` und `/info`.

### Neue Befehle

Der Befehl `/fill` füllt ein Orderbuch mit einer Reihe von Aufträgen in einem einzigen Schritt.

![Open-source CoinOptimus Handelsbot auf v2.0.0 aktualisiert](/images/engineering-notes/medium/816935470693/002-0-p-pmlz9g0oqkhlzh.webp)

Der Befehl `/stats` zeigt Statistiken zum Handelspaar an, einschließlich Preise, Tiefststände, Höchststände, Handelsvolumen, höchster Bid, niedrigster Ask, Spread und Liquidität des Orderbuchs.

![Open-source CoinOptimus Handelsbot auf v2.0.0 aktualisiert](/images/engineering-notes/medium/816935470693/003-1-ghu8f-ht7mxhagdmaqo1ag-png.webp)

Der Befehl `/deposit` gibt eine Adresse zurück, um ein Exchange-Konto über verschiedene Chains aufzufüllen.

![Open-source CoinOptimus Handelsbot auf v2.0.0 aktualisiert](/images/engineering-notes/medium/816935470693/004-0-j-uwsyddj1i6k3d7.webp)

Der Befehl `/account` zeigt Handelsgebühren und das monatliche Handelsvolumen für das Bot-Konto an, sofern verfügbar.

![Open-source CoinOptimus Handelsbot auf v2.0.0 aktualisiert](/images/engineering-notes/medium/816935470693/005-0-vfvn8x-wf1ohwg8a.webp)

Der Befehl `/info` zeigt alle verfügbaren Informationen zu einer bestimmten Münze und Chain an.

![Open-source CoinOptimus Handelsbot auf v2.0.0 aktualisiert](/images/engineering-notes/medium/816935470693/006-0-n5uqmmhtmdcwjbe3.webp)

### Funktionsweise von CoinOptimus

CoinOptimus ist eine Node.js-Anwendung, die kontinuierlich auf einem Server oder VPS läuft. Sie konfigurieren sie mit einer Börse, einem Handelspaar und API-Schlüsseln aus Ihrem Exchange-Konto. Der Bot verwaltet Handelsstrategien und platziert Aufträge basierend auf Befehlen, die Sie über ADAMANT Messenger senden, und antwortet entsprechend.

Der Bot nutzt hauptsächlich die optimale Ladder/Grid-Handelsstrategie, bei der mehrere Kauf- und Verkaufsaufträge platziert werden, deren Preise am Spread beginnen. Wenn der dem Spread nächstgelegene Auftrag ausgeführt wird, fügt der Bot einen ähnlichen Auftrag auf der gegenüberliegenden Seite hinzu, gemäß dem Prinzip, günstiger zu kaufen als zu verkaufen und teurer zu verkaufen als zu kaufen. Dieser Ansatz ist besonders effektiv in volatilen Märkten.

![Open-source CoinOptimus Handelsbot auf v2.0.0 aktualisiert](/images/engineering-notes/medium/816935470693/007-0-twtuzn4rmej2q4s8.webp)

![Open-source CoinOptimus Handelsbot auf v2.0.0 aktualisiert](/images/engineering-notes/medium/816935470693/008-0-ruyx47yeeapvvo4r.webp)

Einrichtungsanleitungen sind in der [Repository-README](https://github.com/Adamant-im/adamant-coinoptimus#usage-and-installation) verfügbar. CoinOptimus ist keine Gewinnmaschine mit Garantie; die Nutzung erfolgt auf eigene Gefahr.

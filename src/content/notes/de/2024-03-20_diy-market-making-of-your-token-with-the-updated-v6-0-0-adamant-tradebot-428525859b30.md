---
title: "DIY-Market-Making mit dem ADAMANT TradeBot v6.0.0"
slug: "diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
description: "Der ADAMANT Trading- und Market-Making-Bot ist ein Open-Source-Tool für Token-Emittenten und Kryptobörsen, das autonomes Market-Making ermöglicht."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
publishedAt: "2024-03-20T08:47:50.471Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/428525859b30/001-0-nwojohhggiizs7us.webp"
cardSpan: "full"
originalId: "medium:428525859b30"
locale: "de"
placeholder: false
---

Der ADAMANT Trading- und Market-Making-Bot ist ein Open-Source-Tool für Token-Emittenten und Kryptobörsen, die autonomes Market-Making benötigen. Er platziert und führt Aufträge aus, um Handelsvolumen zu generieren, den Spread und die Liquidität aufrechtzuerhalten, dynamische Orderbücher aufzubauen und Tokenpreise zu überwachen. Version 6.0.0 bringt eine Reihe von Verbesserungen mit sich, die erwähnenswert sind, wenn Sie den Bot betreiben oder anpassen.

### Änderungen an Konfiguration und Codebasis

Die Codebasis wurde umstrukturiert, um die Anpassung für alle, die am Open-Source-Projekt arbeiten, zu vereinfachen. Die Konfiguration erfolgt nun über einen vereinheitlichten Handelskonfigurationsentwurf, der für alle unterstützten Börsen gilt. Preisfunktionen wie `getSmartPrice()` und `getCleanPrice()` sowie Hilfsfunktionen wurden aktualisiert, um eine bessere Genauigkeit zu gewährleisten. Der Preisüberwacher und der dynamische Orderbuch-Generator wurden ebenfalls verbessert, um eine zuverlässigere Marktüberwachung zu ermöglichen.

### „Prevent“-Aktion des Preisüberwachers

Bisher war die einzige Aktion des Preisüberwachers „fill“ – also das aktive Platzieren von Kauf- oder Verkaufsaufträgen, um einem Referenzpreis einer anderen Börse zu folgen. Dieser Ansatz kann den Bot Manipulationen durch Dritte aussetzen. Die neue „prevent“-Aktion verfolgt einen anderen Ansatz: Anstatt einen Preis durch Orderplatzierung durchzusetzen, definiert sie einen sicheren Preiskorridor, den andere Bot-Module (wie Liquidität) einhalten müssen, und verbietet damit das Kaufen zu hohen und das Verkaufen zu niedrigen Preisen außerhalb dieses Bereichs.

![DIY-Market-Making Ihres Tokens mit dem aktualisierten v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/002-0-p2uha5tzki-2klb.webp)

### Neue und erweiterte Befehle

Der Befehl `/deposit` zeigt nun Einzahlungsadressen für alle verfügbaren Chains an, wodurch Einzahlungen vereinfacht werden.

![DIY-Market-Making Ihres Tokens mit dem aktualisierten v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/003-0-tj9d8w7qcgqwofa4.webp)

Ein neuer Befehl `/info` zeigt alle verfügbaren Informationen zu einer bestimmten Coin an, einschließlich Chain-Details.

![DIY-Market-Making Ihres Tokens mit dem aktualisierten v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/004-0-raft4mu2likg0c8p.webp)

Die Stornierung von Aufträgen kann nun nach Modultyp (manuell, Orderbuch-Generator, Preisüberwacher, Liquidität usw.), Kauf- oder Verkaufsseite und Preis gefiltert werden. Dies gibt Administratoren eine feinere Kontrolle bei der Verwaltung aktiver Aufträge.

![DIY-Market-Making Ihres Tokens mit dem aktualisierten v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/005-0-3slqf62rcikx-msf.webp)

Bei Verwendung von `/amount`, `/interval` oder `/stats` meldet der Bot nun das geschätzte Handelsvolumen, das er generiert, und hilft so Betreibern, die erwartete Aktivität einzuschätzen.

![DIY-Market-Making Ihres Tokens mit dem aktualisierten v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/006-0-9eqmd9xwf7q7i7f6.webp)

Der neue Befehl `/account` zeigt Handelsgebühren und das monatliche Handelsvolumen für das Bot-Konto an, sofern die Börse diese Daten bereitstellt.

![DIY-Market-Making Ihres Tokens mit dem aktualisierten v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/007-0-llggirhb0bb42g5m.webp)

Der Befehl `/stats` wurde erweitert, um Preise des Handelspaares, Tiefst- und Höchststände, Handelsvolumen, höchsten Bid und niedrigsten Ask des Orderbuchs mit Spread, Orderbuch-Liquidität, geschätztes Market-Making-Volumen sowie Auftragsstatistiken nach Typ mit Gesamtsummen einzubeziehen.

![DIY-Market-Making Ihres Tokens mit dem aktualisierten v6.0.0 ADAMANT TradeBot](/images/engineering-notes/medium/428525859b30/008-0-hr1rvff4aeshjtpw.webp)

### Börsenunterstützung

Der Bot unterstützt nun XeggeX und verfügt über aktualisierte Börsen-Connectoren für Azbit, Coinstore, FameEX, NonKYC, P2B und StakeCube. Diverse Fehlerbehebungen und weitere Verbesserungen runden das Release ab.

Die Veröffentlichung und das Änderungsprotokoll sind auf GitHub verfügbar: [adamant-tradebot v6.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0).

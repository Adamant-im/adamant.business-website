---
title: "ADAMANT Tradebot v6.0.0"
slug: "release-adamant-tradebot-v6-0-0-147389142"
description: "Diese Version enthält eine umfassende Neustrukturierung der Konfiguration und verbesserte Funktionen für alle Börsen."
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
locale: "de"
placeholder: false
---

Diese Version führt eine umfassende Neustrukturierung im ADAMANT Tradebot durch und fasst die Börsenkonfiguration in einer einzigen `tradeParams_Default.js`-Datei zusammen, die für alle Börsen verwendet wird. Die Funktionen `getSmartPrice()` und `getCleanPrice()` wurden aktualisiert, ebenso wie die Funktion `isOrderOutOfPriceWatcherRange()`. Zusätzliche Hilfsfunktionen wurden hinzugefügt, um diese Änderungen zu unterstützen.

Der Preisüberwacher wurde verbessert und unterstützt nun eine `prevent`-Aktion. Die Volumenschätzung wird jetzt bei Aktualisierung des Betrags oder Intervalls angezeigt. Der Befehl `/stats` liefert erweiterte Informationen, und der Befehl `/info` kann Informationen zu Münzabhebungen und Netzwerken abrufen. Auch die Bilanzinformationen wurden erweitert.

Der Befehl `/account` liefert nun Informationen zu Handelsgebühren und Volumen. Der Bot sammelt Füllinformationen für alle Aufträge, und der dynamische Orderbuch-Generator wurde verbessert. Nach dem Platzieren eines Market-Making-Auftrags prüft der Bot, ob der Auftrag ausgeführt wurde. Die Funktion `getMinOrderAmount()` wurde ebenfalls verbessert.

Die Unterstützung für die Börse XeggeX wurde hinzugefügt. Die Börsen-Connectors für Azbit, Coinstore, FameEX, NonKYC, P2B und StakeCube wurden aktualisiert. Die Version enthält außerdem verschiedene Verbesserungen, Fehlerbehebungen und aktualisierte Abhängigkeiten.

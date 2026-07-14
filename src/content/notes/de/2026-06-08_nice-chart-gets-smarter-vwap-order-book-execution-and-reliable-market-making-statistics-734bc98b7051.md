---
title: "Nice Chart wird intelligenter: VWAP, Orderbuch-Ausführung und zuverlässige Market-Making-Statistiken"
slug: "nice-chart-gets-smarter-vwap-order-book-execution-and-reliable-market-making-statistics-734bc98b7051"
description: "Das neueste Update des ADAMANT Tradebot (Version 23.0.0) verbessert Nice Chart, den Premium-Market-Making-Modus, mit präziseren VWAP-Berechnungen und detaillierteren Statistiken."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/nice-chart-gets-smarter-vwap-order-book-execution-and-reliable-market-making-statistics-734bc98b7051"
publishedAt: "2026-06-08T13:31:06.952Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/734bc98b7051/001-1-m2zzlsbbi-isnuqvz3kn9q-png.webp"
cardSpan: "full"
originalId: "medium:734bc98b7051"
locale: "de"
placeholder: false
---

Das neueste `adamant-tradebot`-Update (Version 23.0.0) verbessert erheblich Nice Chart, den Premium-Market-Making-Modus von ADAMANT. Statt einfach nur Handelsaktivität zu generieren, verfolgt die Ausführungs-Engine nun mehr Kontext zu jedem Trade, bewertet die projizierte VWAP-Spread präziser und liefert detaillierte Statistiken über das Verhalten von Tradern und kürzlich geschlossene Orders. Dies hilft Betreibern zu verstehen, was passiert ist – und warum.

## Bessere VWAP-Spread-Verfolgung

VWAP (Volume-Weighted Average Price) ist einer der wichtigsten Indikatoren für die Ausführungsqualität. Das Update verbessert die VWAP-Verarbeitung auf drei Arten. Erstens wurde die Genauigkeit der Spread-Anzeige behoben – frühere Prozentformatierungen konnten irreführend sein, die neue Anzeige eignet sich besser für Analysen auf Basispunkt-Ebene. Zweitens wurde die erlaubte VWAP-Spread-Schwelle auf 0,6 % angepasst, wodurch die Strategie unter realen Bedingungen flexibler bei der Orderabgleichung ist. Drittens behandelt die Engine nun Szenarien mit negativem projiziertem VWAP-Spread sorgfältiger, da bestimmte Orderbuch-Situationen auf den ersten Blick akzeptabel erscheinen können, die projizierte Ausführung jedoch die gewünschte Handelslogik tatsächlich verzerren würde.

## Intelligentere Orderbuch-Ausführung

![Nice Chart wird intelligenter: VWAP, Orderbuch-Ausführung und zuverlässige Market-Making-Statistiken](/images/engineering-notes/medium/734bc98b7051/002-1-flqt3yboi63ap-dbqbejq-png.webp)

Die aktualisierte Engine führt eine explizitere Ausführungsweiterleitung ein, wodurch die Strategie leichter nachvollziehbar, debuggbar und bedienbar ist. Ein neuer Konfigurationsparameter, `executeInOrderBookPercent`, steuert, welcher Teil eines Trades direkt über das Orderbuch ausgeführt werden darf. Dies verhindert eine übermäßige Inanspruchnahme sichtbarer Liquidität und ist besonders nützlich für Märkte, bei denen das Orderbuch flach, ungleichmäßig oder teilweise von Drittanbietern kontrolliert wird. Anstatt den vollen Betrag blind auszuführen, kann Nice Chart nun Betragsobergrenzen anwenden und fundiertere Entscheidungen treffen.

## Transparentere Ausführungsverfolgung

Der Bot liefert nun klarere Logs zu Aktionen im Orderbuch, Routing-Entscheidungen, Betragsbegrenzungen und dem Verhalten bei der Trade-Ausführung. Wenn etwas Unerwartetes passiert – eine teilweise Ausführung, Ersetzung, Überspringung oder unerwartete Übereinstimmung – liefern die Logs mehr Kontext. Für Handelssysteme sind gute Logs Teil der Betriebssicherheit, nicht nur ein Entwickler-Komfort.

## Verbesserte Trader-Statistiken

Der Befehl `/orders t full` wurde um zusätzlichen Kontext zu kürzlich geschlossenen Orders, Langzeitstatistiken, Handelsvolumen und epochenbasierter Verfolgung erweitert. Betreiber können nun Fragen beantworten wie: Wie viel Volumen wurde seit Beginn der aktuellen Epoche generiert? Wie viele kürzliche Orders wurden geschlossen? Und entspricht die aktuelle Aktivität dem Langzeitverhalten?

![Nice Chart wird intelligenter: VWAP, Orderbuch-Ausführung und zuverlässige Market-Making-Statistiken](/images/engineering-notes/medium/734bc98b7051/003-1-go7ssfwyfsy0gje-f72-yg-png.webp)

## Bessere Zuordnung von Ausführungen

Eine neue Funktion, `attributeThirdPartyFillFromMatchPlan`, verbessert, wie die Fill-Engine Drittanbieter-Fills zuordnet, wenn die Orderbuch-Ausführung beteiligt ist. Dies erhöht die Genauigkeit der Statistiken und hilft, das interne Strategieverhalten von externen Marktinteraktionen zu trennen.

## MTM PnL und USD Cashflow

Die Mark-to-Market-PnL-Berechnungen wurden um USD-Cashflow-Eigenschaften erweitert. Dadurch wird die Berichterstattung klarer für Paare, bei denen Betreiber die Performance in USD verstehen müssen, nicht nur in Basis- oder Quote-Assets.

## Typsystem und Tests

Neue und aktualisierte Typdefinitionen wurden für Candlestick-Diagrammdaten, Orderbuch-Informationen, Ausführungs-Konfiguration, Preisabfragen, Trader-Einstellungen und Nice-Chart-Konfiguration hinzugefügt. Obwohl das Projekt weiterhin auf JavaScript mit JSDoc-Anmerkungen basiert, helfen bessere Typdefinitionen, Fehler früher zu erkennen und das Risiko subtiler Ausführungsfehler zu verringern. Die Testabdeckung wurde ebenfalls erweitert für Orderbuch-Aktionen, Betragsbegrenzungen, Fill-Verarbeitung, VWAP-Verhalten und Hilfsfunktionen, wobei Mock-Daten realistischere Orderbuch-Situationen abdecken.

## Konfiguration und Kompatibilität

![Nice Chart wird intelligenter: VWAP, Orderbuch-Ausführung und zuverlässige Market-Making-Statistiken](/images/engineering-notes/medium/734bc98b7051/004-1-4imanifwledhlg5xklk-ow-png.webp)

Die Standardkonfiguration wurde um neue Nice-Chart-Ausführungs-Einstellungen erweitert, wodurch es einfacher ist, das Verhalten der Orderbuch-Ausführung anzupassen, ohne Code zu ändern. Das Update ist abwärtskompatibel mit bestehenden Order-Daten – kein Datenbank-Migration ist erforderlich, und neue Parameter haben sinnvolle Standardwerte. Die Orderbuch-Ausführung von Nice Chart kann auch deaktiviert oder zurückgerollt werden, während der Rest des Systems weiterhin funktioniert.

## Was Betreiber überwachen sollten

Nach dem Upgrade sollten Betreiber das VWAP-Spread-Verhalten überwachen (die neue Schwelle von 0,6 % kann die Match-Logik bei engen oder instabilen Spreads beeinflussen), die Häufigkeit der Orderbuch-Ausführung (Routing-Logik und Betragsobergrenzen können beeinflussen, wie oft Trades auf vorhandene Liquidität treffen), die Zuordnung von Ausführungen (Drittanbieter-Fills sollten mit den Aufzeichnungen der Börse verglichen werden) und die Trader-Statistiken (sicherstellen, dass Volumen, kürzlich geschlossene Orders, Epochen-Metriken und Langzeitstatistiken korrekt angezeigt werden).

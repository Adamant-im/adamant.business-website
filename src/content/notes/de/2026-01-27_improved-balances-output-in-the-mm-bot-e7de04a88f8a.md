---
title: "Verbesserte /balances-Ausgabe im ADAMANT TradeBot"
slug: "improved-balances-output-in-the-mm-bot-e7de04a88f8a"
description: "Open-Source-Market-Making-Tools sind nur so leistungsfähig wie nutzbar. Eine Verbesserung im ADAMANT TradeBot macht die Ausgabe informativer."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improved-balances-output-in-the-mm-bot-e7de04a88f8a"
publishedAt: "2026-01-27T20:06:24.444Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/e7de04a88f8a/001-1-dqzndrygjqx5bkqeefcika-png.webp"
cardSpan: "full"
originalId: "medium:e7de04a88f8a"
locale: "de"
placeholder: false
---

Open-Source-Market-Making-Tools sind nur so leistungsfähig wie nutzbar. Eine kürzliche Verbesserung am ADAMANT TradeBot – einem selbstgehosteten Market-Making-Bot für Kryptoprojekte und Börsen – zielt darauf ab, die Benutzeroberfläche informativer zu gestalten, insbesondere für zentrale Befehle wie `/balances`.

Der Verbesserungsvorschlag, ursprünglich als Issue #89 im ADAMANT-GitHub-Repository verfolgt, schlägt mehrere Anpassungen vor. Er zielt darauf ab, verwirrende Hinweise zu entfernen, wenn keine unbekannten Token vorhanden sind, visuelle Fehler in verwandten Befehlen zu beheben und Indikatoren für die Preisqualität in Handelsnachrichten hinzuzufügen. Beispielsweise kann der Bot nun anzeigen, ob ein Verkauf zu einem guten oder schlechten Preis im Vergleich zum Markt ausgeführt wurde.

![Verbesserte /balances-Ausgabe im MM-Bot](/images/engineering-notes/medium/e7de04a88f8a/002-1-2xdmbg-cdiktreq64dog2w-png.webp)

Zur Darstellung von Handelsvolumina verwendet der Bot eine Reihe von Emoji mit Meerestieren wie 🦐, 🍤, 🐟, 🐬, 🦈 und 🐳. Diese Zuordnung von Volumen zu Emoji wird in der Konfigurationsdatei des Bots über USD-Schwellenwerte definiert.

```json
  /** Volume thresholds in USD for different emoji levels */
  "volumes_thresholds_usd": {
    "🦐": 10,
    "🍤": 50,
    "🐟": 100,
    "🐬": 300,
    "🦈": 1000,
    "🐳": 5000,
    "🐳🐳": 10000,
    "🐳🐳🐳": 50000
  },
```

Zusätzlich verwendet der Bot farbige Kreise und Pfeile, um die Preisqualität im Vergleich zum Markt anzuzeigen. Ein grüner Kreis steht für einen guten Preis, beispielsweise einen niedrigen Kauf- oder hohen Verkaufspreis, während ein roter Kreis einen schlechten Preis anzeigt, wie etwa einen hohen Kauf- oder niedrigen Verkaufspreis. Pfeile liefern zusätzliche Differenzierung, indem sie anzeigen, ob ein Asset zu einem sehr hohen Preis verkauft oder zu einem sehr niedrigen Preis gekauft wurde.

Solche nutzbarkeitsbezogenen Verbesserungen verringern die kognitive Belastung für Bot-Betreiber und machen das Tool zugänglicher. Während diese Änderungen derzeit in der Premium-Version des Bots implementiert sind, werden sie bald auch in der grundlegenden Open-Source-Version verfügbar sein.

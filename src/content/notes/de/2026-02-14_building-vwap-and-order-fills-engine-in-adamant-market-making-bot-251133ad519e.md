---
title: "Entwicklung der VWAP- und Order-Fills-Engine im ADAMANT Market-Making-Bot"
slug: "building-vwap-and-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
description: "Die ADAMANT Market-Making-Bot erhält eine dedizierte VWAP- und Order-Fills-Engine für präzise Ausführungsanalysen auf professionellem Niveau."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/building-vwap-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
publishedAt: "2026-02-14T13:30:19.720Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/251133ad519e/001-1-stivdc2giqxmbc5miuwkxa-png.webp"
cardSpan: "full"
originalId: "medium:251133ad519e"
locale: "de"
placeholder: false
---

Im ADAMANT Market-Making-Bot werden bereits dynamisches Orderbuch-Management, Spread-Kontrolle, Liquiditätsbereitstellung und Volumenstrategien unterstützt. Ohne genaue Fills-Analytik ist jedoch nur die halbe Wahrheit sichtbar. [Issue #87](https://github.com/Adamant-im/adamant-tradebot/issues/87) führt eine umfassende architektonische Verbesserung ein: eine dedizierte VWAP-Engine und Order-Fills-Engine (Premium-Modul), die professionelle Ausführungsanalysen bereitstellt.

### Warum VWAP wichtig ist

Die meisten Exchange-APIs liefern fragmentierte Informationen. Orders können teilweise ausgeführt werden, Statusaktualisierungen können verzögert eintreffen, einige Börsen geben unvollständige Ausführungsdaten zurück, und Neustarts können zum Verlust des internen Ausführungskontexts führen. Wenn ein Bot Fills-Daten nicht korrekt persistiert und verifiziert, wird die PnL ungenau, das Positions-Tracking unzuverlässig, die Risikosteuerung fehlerhaft, und Anpassungen von Spread und Liquidität basieren auf Annahmen statt auf Realität.

Um auf institutionellem Niveau zu operieren, verwendet die Engine persistente Ausführungsverfolgung, verifizierte Fills-Abstimmung, korrekte VWAP-Berechnung und inventarbasierte Analysen.

### Die Lösung: Dedizierte VWAP- und Fills-Engine

Issue #87 führt ein dediziertes Subsystem mit drei Hauptkomponenten ein.

**Speicherung von Raw-Fill-Events (nur Anhängen).** Ein dedizierter `fillsDb` speichert Raw-Ausführungsereignisse im Append-only-Modus und bleibt über Neustarts hinweg erhalten, ohne sofort aggregiert zu werden. Dadurch gehen keine Ausführungsdaten verloren oder werden überschrieben.

**Exchange-Verifizierungsschicht.** Jedes Fill-Event muss gegenüber der Exchange-API verifiziert, als vollständig oder teilweise ausgeführt bestätigt und erst nach Bestätigung als verarbeitet markiert werden. Dies verhindert falsch-positive Fills, wenn der Bot keine Verbindung hat, Exchange-Knoten nicht verfügbar sind oder API-Antworten unvollständig sind. Die Ausführungsverifizierung erfolgt nur, wenn die Netzwerkverbindung besteht und die Exchange-Endpunkte erreichbar sind; andernfalls besteht die Gefahr, dass gültige Trades fälschlicherweise als fehlgeschlagen markiert werden.

Die Kernverifizierungsfunktion implementiert eine „immer verifizieren, wenn möglich“-Richtlinie:

```javascript
/**
 * Verifies a fill order using exchange API.
 *
 * Policy "always verify if possible":
 *  - If api.getOrderDetails() is missing -> cannot disprove -> treat as confirmed
 *  - If status missing or exception -> return undefined (try again later)
 *  - If API says 'filled' -> confirmed
 *  - If API says explicitly not filled ('new'|'part_filled'|'cancelled') -> rejected
 *  - If API says 'unknown' -> keep (cannot disprove) but warn
 *
 * @param {FillOrder|Object} order Fill order record or Order object
 * @param {any} api API instance (spot first/second account, or other compatible trader api)
 * @param {string} callerName Log context id (usually module and method which calls) to quickly find related logs
 * @returns {Promise<VerifyFillResult | undefined>
 */
async function verifyOrderFilled(order, api, callerName)
```

**Aggregierte Ausführungsstatistiken.** Ein zweiter persistenter Speicher, `filledStatsDb`, sammelt das gesamte gekaufte und verkaufte Basisasset, das insgesamt ausgegebene und erhaltene Quote-Asset sowie Zähler für vollständige, teilweise, abgelehnte und fehlende Fills. Daraus werden Kernmetriken berechnet.

### Kernmetriken

Die Basis-Statistik-Objektstruktur:

```javascript
/**
 * Creates a base FillsEngineStatsResult object with zeroed / default values.
 *
 * @param {string} statsId Format: `${exchange}:${pair}:${purpose}:${startTs}`
 * @param {string} pair Trading pair, e.g., `BTC/USDT`
 * @param {FilledStatsRecord | undefined | null} stats Epoch stats (optional)
 * @returns {FillsEngineStatsResult}
 */
function createBaseEpochStats(statsId, pair, stats) {
  return {
    statsId,
    pair,
    updatedAt: stats?.updatedAt || 0,

    buy: stats?.buy ? { ...stats.buy } : emptySide(),
    sell: stats?.sell ? { ...stats.sell } : emptySide(),

    // Calculated later
    boughtVwap: 0,
    soldVwap: 0,

    hasBothSides: false,
    vwapSpread: 0,
    vwapSpreadPercent: 0,

    pnlQuoteCashflow: 0,
    inventoryBase: 0,
    markPrice: undefined,
    pnlQuoteMtm: undefined,
  };
}
```

**VWAP (Volume Weighted Average Price)** wird pro Seite als Buy-VWAP und Sell-VWAP nach der Formel `VWAP = Gesamtes Quote-Volumen / Gesamtes Basis-Volumen` berechnet. Dies spiegelt die tatsächliche Ausführungsqualität wider, nicht nur den Order-Platzierungspreis.

**VWAP-Spread** ist die Differenz zwischen Buy-VWAP und Sell-VWAP und zeigt den tatsächlich realisierten Handelsspread anstelle des theoretischen Spreads.

**Inventory-Delta** ist die Differenz zwischen insgesamt gekauftem und insgesamt verkauftem Basisasset und wird für Risikomanagement, Positions-Exposure-Tracking und Rebalancing-Logik verwendet.

**Realisierte PnL** ist das auf Cashflow basierende Ergebnis ausgeführter Trades, optional ergänzt durch mark-to-market-PnL unter Verwendung des aktuellen Marktpreises.

### Architektonische Auswirkungen

Die neue Engine ist ein vollständig modulares Komponente, die sich sauber in die bestehende Architektur integriert, ohne die aktuelle Order-Platzierungslogik zu stören. Sie arbeitet neben bestehenden Systemen, anstatt sie zu ersetzen, und bewahrt so die Stabilität, während eine tiefere analytische Ebene hinzugefügt wird.

```
          Exchange API
                │
                ▼
       Order Placement Engine
                │
                ▼
         Fills Collector
                │
                ▼
       Verification Engine
                │
                ▼
         Aggregation Engine
                │
                ▼
      VWAP / Inventory / PnL
                │
                ▼
    Risk & Strategy Modules
```

Diese Architektur schafft die Grundlage für zukünftige Erweiterungen und verwandelt den Bot von einem reinen Order-Platzierungstool in ein echtes Ausführungsanalysesystem. Fortgeschrittene Strategien wie das Management von Liquiditäts-Pools und dynamische Spread-Pflege hängen stark von genauen Ausführungsdaten ab, um korrekt zu funktionieren. Für Premium-Handelsmodule ist die Ausführungsanalysik eine Kernvoraussetzung für professionelle Operationen.

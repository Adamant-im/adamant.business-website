---
title: Trading-Software
description: CEX/DEX-Automatisierung, Treasury-Tools und Marktdaten-Pipelines — selbst gehostete Trading-Software ohne Gewinnversprechen.
cta: Ich möchte Trading-Software
layoutStyle: split
proofLinks:
  - label: adamant-tradebot
    url: https://github.com/Adamant-im/adamant-tradebot
  - label: marketmaking.app
    url: https://marketmaking.app
---

Trading-Software wird im schlimmsten Moment beurteilt: Eine Börsen-API degradiert, ein WebSocket bricht still ab, eine Teilausführung landet mitten im Neustart. Wir bauen Systeme für diese Momente — selbst gehostet, beobachtbar und unter der Kontrolle Ihres Teams vom ersten Commit an.

## Was ein typischer Build umfasst

- **Börsenanbindung** — REST- und WebSocket-Connectors für die CEXes und DEXes, die Sie nutzen, mit Wiederverbindung, Uhr-Drift-Behandlung und Rate-Limit-Budgets pro Venue
- **Order-Engine** — Auftrags-Lebenszyklus-Tracking, das Neustarts überlebt: Jeder Auftrag wird gegen die Börse abgeglichen, nie angenommen
- **Risiko-Schienen** — harte Positionsobergrenzen, Nominal-Limits, Kill Switches und Plausibilitätsprüfungen zwischen Strategiecode und Börse
- **Marktdaten-Pipeline** — normalisierte Trades, Orderbücher und Kerzen über Venues hinweg, gespeichert, wo Ihre Analysten sie abfragen können
- **Betriebssicht** — Dashboards und Alerts, damit ein Mensch immer weiß, was das System tut, und es mit einer Aktion stoppen kann

## Market Making, konkret

Ein Jahrzehnt Betrieb unserer eigenen Market-Making-Software floss in [adamant-tradebot](https://github.com/Adamant-im/adamant-tradebot) — spezialisierte Market-Making- und Trading-Software mit einer kostenlosen Open-Source-Edition und einer gehosteten Premium-Erfahrung unter [marketmaking.app](https://marketmaking.app). Für Teams, die es auf eigener Hardware brauchen — eigene Paare, eigene Venues, eigene Risikoregeln — passen wir selbst gehostete Deployments derselben Engine an.

## Treasury- und Ausführungstools

Nicht alles ist eine Strategie. Fonds und Produktunternehmen kommen zu uns für die unglamouröse Schicht: Rebalancing über Venues, TWAP-artige Ausführung großer Positionen, Auszahlungs-Batching und Reporting, das bis auf den Satoshi abstimmt. Hier zahlt sich Automatisierung am schnellsten aus.

## Was wir Ihnen vorab sagen

- Wir versprechen keine Gewinne, Signale oder „garantierte APY“ — wer das tut, verkauft Ihnen Risiko
- Wir erzeugen kein falsches Volumen oder künstliche Marktaktivität
- Wir verwahren keine Mittel; Schlüssel leben in Ihrer Umgebung, auf minimale Berechtigungen begrenzt
- Low-Latency-HFT-Colocation ist eine andere Branche — wir bauen robuste Automatisierung, kein Nanosekunden-Rennen

Sie bekommen Software, Quellcode, Dokumentation und einen Engineering-Partner, der sie wartet. Strategie und Verantwortung bleiben bei Ihnen.

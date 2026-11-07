---
title: "ADAMANT ComServer 2.0: Flottenweites Management für selbstgehostete Krypto-Market-Maker"
slug: "effortless-fleet-management-for-crypto-market-makers-introducing-adamant-comserver-2-0-58c1f88a6b7e"
description: "Mit der neuen Version 2.0 bietet der ADAMANT ComServer eine zentrale Steuerung für verteilte Trading-Bots, verbesserte Sicherheit und eine reduzierte Abhängigkeitsstruktur."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/effortless-fleet-management-for-crypto-market-makers-introducing-adamant-comserver-2-0-58c1f88a6b7e"
publishedAt: "2026-11-07T10:12:13.811Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:58c1f88a6b7e"
coverImage: "/images/engineering-notes/medium/58c1f88a6b7e/001-5aba38788d.webp"
locale: "de"
placeholder: false
---

Wenn Token-Projekte und Liquiditätsanbieter wachsen, lässt sich die Aufrechterhaltung tiefer Orderbücher, enger Spreads und eines gesunden Handelsvolumens selten über eine einzige zentralisierte Börse realisieren. Ein ernsthafter Market-Making-Betrieb erfordert in der Regel mehrere Bot-Instanzen, die über verschiedene Börsen verteilt sind. Der ADAMANT Trade Bot Communication Server (ComServer) v2.0.0 beseitigt die operativen Hürden bei der Verwaltung dieser Flotte – er ersetzt manuelle SSH-Sitzungen, die Log-Inspektion und Ad-hoc-Skripte durch eine vereinheitlichte, authentifizierte Befehlszentrale.

## Flottenweite Orchestrierung

ComServer ist ein selbstgehosteter Relay-Daemon, der ADAMANT-Trading-Bots über einen authentifizierten Socket.IO-Kanal verbindet. Betreiber verwalten ihre gesamte Flotte über einen einzigen Kommunikationsknotenpunkt, anstatt mit jedem Bot einzeln zu interagieren.

Für einen schnellen Überblick über die Salden auf allen verbundenen Börsen genügt ein einziger Befehl:

```
/remote balances all
```

ComServer leitet die Anfrage an einen Bot pro Börsenkonto weiter, sammelt die Antworten und gibt eine deterministisch sortierte Zusammenfassung der Vermögenswerte nach Börse und Quote-Coin-Priorität zurück.

Synchronisierte Strategieanpassungen sind ebenso präzise. Marktvolatilität oder wichtige Ankündigungen erfordern oft schnelle Parameteränderungen bei jedem Bot. Befehle wie `/remote make price 1.1 USDT in 5 days -all` koordinieren alle Bots auf einen Zielpreis, `/remote enable pw 1.00–1.10 USDT -all` erzwingt engere Spread-Korridore in allen Orderbüchern und `/remote make volume +25% -all` skaliert die Liquiditätstiefe flottenweit. Für gezielte Eingriffe können Betreiber einzelne Bots über eine eindeutige Kennung oder eine unmissverständliche Teil-ID ansprechen, anstatt Befehle an alle zu senden.

## Was hat sich in 2.0.0 geändert?

Version 2.0.0 ist eine vollständige Neuentwicklung mit Fokus auf Transportsicherheit, operative Resilienz und Software-Minimalismus.

### Transportsicherheit

Da der ComServer sensible operative Befehle weiterleitet – wie das Platzieren von Orders oder das Abfragen von Salden –, ist die Transportsicherheit entscheidend. Das Wire-Protokoll verwendet nun eine authentifizierte **AES-256-GCM**-Verschlüsselung, ein Upgrade vom bisherigen AES-256-CTR-Modus. Jeder Frame wird mit einer flüchtigen 96-Bit-Nonce verschlüsselt und gegen Manipulation, Fälschung und Bit-Flipping-Angriffe validiert.

Kommunikationsschlüssel werden dynamisch aus dem gemeinsamen `SECRET_KEY` mittels HKDF abgeleitet, was eine strikte Rollentrennung zwischen Server und Bot gewährleistet. Additional Authenticated Data (AAD) binden Identität des Absenders, Rolle und Zeitstempel in Millisekunden kryptografisch an jedes Payload, wodurch Cross-Bot-Frame-Reflektionen unterbunden werden. Ein hochperformanter, in Buckets unterteilter `ReplayCache` verfolgt Einweg-Nonces bis zu einer Kapazität von 100.000 Frames; sollte der Cache unter Last seine Kapazität erreichen, werden neue Frames sicher abgelehnt, anstatt alte zu verwerfen, wodurch jedes Replay-Zeitfenster eliminiert wird. Die Client-Authentifizierung wird innerhalb der Socket.IO-Middleware vor der Socket-Zulassung verifiziert – nicht autorisierte oder fehlerhafte Handshakes werden beendet, bevor eine Socket-Verbindung hergestellt wird.

### Reduzierung von Abhängigkeiten

Der Abhängigkeitsbaum wurde radikal gestrafft. Die Gesamtzahl der Pakete sank von 615 auf 141, wodurch 32 historische Sicherheitshinweise – darunter 2 kritische und 19 hochgradige Schwachstellen – auf null reduziert wurden.

### Technik und Betrieb

Die Laufzeitumgebung zielt auf Node.js 22.13+ mit reinen nativen ES-Modulen, Dependency Injection und ohne globalen Status ab. Wenn ein aktiver Bot nach einer Netzwerkunterbrechung die Verbindung wiederherstellt, bereinigt ComServer sofort verwaiste Zombie-Sockets, sodass Befehle niemals an tote Verbindungen geleitet werden. Warteschlangen für ausstehende Befehle sind auf 1.000 gleichzeitige Anfragen begrenzt, um Speichererschöpfung unter Last zu vermeiden. Das PM2-Lebenszyklus-Handling ist über `ecosystem.config.cjs` für ein sauberes Signal-Handling (SIGINT, SIGTERM) mit ordnungsgemäßem Abbruch der Befehls-Timer vorkonfiguriert. Die Codebasis umfasst 182 Tests für Unit-, Integrations- und Prozesslebenszyklus-Phasen unter Verwendung des Node.js-Test-Runners mit TypeScript-geprüftem JSDoc.

## Selbstgehostete Souveränität

Die ADAMANT Market-Making-Software und der ComServer laufen vollständig auf der eigenen Hardware oder in der privaten Cloud des Betreibers. Keine Handelsdaten, geheimen Schlüssel oder operativen Anweisungen gelangen auf einen Server Dritter. ComServer bietet die vereinheitlichte Flottensteuerung eines institutionellen Handelsschalters bei gleichzeitiger Wahrung des Sicherheitsmodells von Open-Source-Software: Ihre Schlüssel, Ihre Token, Ihre Infrastruktur.

ADAMANT ComServer v2.0.0 ist für Benutzer der Premium-Version von ADAMANT Trade Bot verfügbar.

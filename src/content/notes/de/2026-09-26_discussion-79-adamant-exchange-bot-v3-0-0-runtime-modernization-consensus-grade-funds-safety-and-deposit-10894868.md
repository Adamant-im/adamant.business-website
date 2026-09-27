---
title: "ADAMANT Exchange Bot v3.0.0: Runtime-Modernisierung und konsensbasierte Sicherheit für Guthaben"
slug: "discussion-79-adamant-exchange-bot-v3-0-0-runtime-modernization-consensus-grade-funds-safety-and-deposit-10894868"
description: "ADAMANT Exchange Bot ist eine selbst gehostete Software für den sofortigen, anonymen Kryptowährungshandel innerhalb Ende-zu-Ende-verschlüsselter ADAMANT Messenger-Chats."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/79"
publishedAt: "2026-09-26T17:12:03Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10894868"
locale: "de"
placeholder: false
---

ADAMANT Exchange Bot ist eine selbst gehostete Software für den sofortigen, anonymen Kryptowährungshandel innerhalb Ende-zu-Ende-verschlüsselter ADAMANT Messenger-Chats. Er betreibt Hot Wallets für Bitcoin, Ethereum, Dash, Dogecoin und ADAMANT ohne Drittanbieter oder offene Web-Interfaces. Version 3.0.0 modernisiert den Runtime-Stack, stellt Kryptografie und Blockchain-Integration auf aktuelle Bibliotheken um, erzwingt konsensbasierte Sicherheitsinvarianten für Guthaben durch UTXO- und anfragebasierte Mutex-Sperren und fügt einen externen Deposit-Claims-Watcher mit einem 5-minütigen Streitbeilegungsfenster hinzu. Sicherheitsaudits und Wartung werden von cryptofoundry in Zusammenarbeit mit der ADAMANT-Entwickler-Community durchgeführt.

## Modernisierung von Stack und Architektur

Die Codebasis ist nun auf Node.js 22.13+ LTS ausgelegt, mit aktualisierten `package.json`-Engines und `.nvmrc`-Beschränkungen. Ethereum- und ERC-20-Interaktionen ersetzen das veraltete `web3-eth` und `web3-utils` vollständig durch `ethers` v6, was deterministische Contract-Aufrufe, präzise Gas-Schätzungen und ein zuverlässiges Nonce-Management ermöglicht. Die Transaktionserstellung für Bitcoin, Dash und Dogecoin migriert auf Partially Signed Bitcoin Transactions (PSBT) mittels `bitcoinjs-lib` 7, wodurch der veraltete `TransactionBuilder` entfernt wurde. MongoDB 7-Abfragen über die Collections `payments`, `incomingtxs` und `systems` verwenden nun natives Promise-basiertes async/await, was Callback-Muster eliminiert. Die Node-Client-Integration wurde auf `adamant-api` 3.x aktualisiert, unter Verwendung von `AdamantApi` und `WebSocketClient` mit modernen Key-Derivation-Hilfsfunktionen. Die Unterstützung für das veraltete Lisk (LSK) wurde vollständig entfernt, einschließlich der `@liskhq/*`-Abhängigkeiten, `lsk_utils.js`, `lskBaseCoin.js` und zugehöriger Konfigurationsoptionen. Die Entwicklungstools setzen nun auf ESLint 9 Flat-Konfiguration, Prettier 3 und Jest 30.

## Concurrency-Garantien und Sicherheitsinvarianten für Guthaben

Der unbeaufsichtigte Exchange-Betrieb erfordert konsensbasierte finanzielle Sicherheit: Kurse, Gebühren, Dezimalstellen und Salden müssen exakt sein, und Auszahlungen oder Rückerstattungen müssen strikt idempotent bleiben.

Bei UTXO-basierten Chains riskierten gleichzeitige Auszahlungen oder Rückerstattungen zuvor Race Conditions, bei denen mehrere Transaktionen versuchten, dieselben unspent Outputs auszugeben. v3.0.0 führt einen asynchronen Memory-Mutex in `helpers/mutex.js` und `btcBaseCoin.js` ein, der ausgewählte UTXOs während der PSBT-Erstellung und -Signierung sperrt. UTXOs bleiben gesperrt, bis die Bestätigung der Übertragung im Netzwerk verifiziert wurde. Schlägt die Transaktionserstellung oder -übertragung fehl, werden gesperrte UTXOs sicher in den verfügbaren Pool zurückgegeben, was blockierte Salden verhindert, ohne das Risiko von Double-Spends einzugehen.

Eingehende Chat-Befehle, neue Transfer-Ereignisse und Stornierungsanfragen desselben Nutzers werden durch eine pro-Absender-Mutex-Sperre in `incomingTxsParser.js` synchronisiert, wodurch Race Conditions eliminiert werden, wenn Nutzer gleichzeitige Transfers senden oder Rückerstattungen während Zustandsübergängen auslösen. Jeder Zahlungsdatensatz durchläuft deterministische Zustände (`inProcessing`, `needToSendBack`, `sent`, `refunded`), die vor der Netzwerkübertragung in MongoDB persistiert werden. Sollte der Bot während eines Transfers neu starten oder die Verbindung verlieren, werden ausstehende Zahlungen abgeglichen und fortgesetzt, ohne dass es zu Double-Spends kommt.

## Deposit-Watcher und Claims-Lifecycle

Externe Einzahlungen erfordern die Korrelation von On-Chain-Transaktionen mit ADAMANT-Chat-Identitäten. `modules/depositWatcher.js` überwacht unbestätigte und eingehende Transaktionen über die `getPendingIncomingTransactions`-Implementierung jedes Adapters ohne zentralisierte Webhooks. `modules/depositClaims.js` verfolgt Deposit-Claims über ihren gesamten Lebenszyklus, um eine doppelte Beanspruchung desselben On-Chain-Transaktions-Hashs zu verhindern. Ein obligatorisches 5-minütiges Streitbeilegungsfenster schützt vor Blockchain-Reorgs, Race-Attacken und Double-Claim-Exploits vor der Ausführung der Auszahlung. `modules/deepExchangeValidator.js` verifiziert Einzahlungen kryptografisch gegen die ADAMANT Key-Value Storage (KVS)-Adressdatensätze des Absenders, inklusive Caching und automatischer Wiederholungslogik.

## Exchange-UX und Chat-Befehl-Erweiterungen

Nutzer, die eine Einzahlung ohne Angabe eines Handelspaares senden, können `/cancel` (oder `cancel`) im Chat verwenden, um den ausstehenden Tausch abzubrechen und die Einzahlung automatisch abzüglich der Netzwerk-Transaktionsgebühr zurückzuerhalten. Wenn ein Nutzer mit einer Einzahlung im Zustand `inUpdateState` einen weiteren Transfer sendet, anstatt die Zielwährung zu klären, stellt der Bot die vorherige Einzahlung nun für eine automatische Rückerstattung in die Warteschlange, anstatt sie zu verwerfen. Der `utils.formatNumber`-Helfer wurde refactored, um wissenschaftliche Notation (`e+` / `e-`) vor der Zifferngruppierung und Fettschreibung in menschenlesbare vollständige Dezimalstrings zu expandieren, wodurch fehlerhafte Leerzeichen oder Exponenten-Artefakte bei Zahlen mit hoher Größenordnung oder Tokens mit vielen Dezimalstellen behoben wurden. Native Konfigurations- und Registry-Unterstützung wurde für den Onyxcoin (XCN) ERC-20-Token hinzugefügt.

## Konfigurationsschema und Multi-Node-Failover

Konfigurationsdateien (`config.jsonc`, `config.default.jsonc`) werden beim Start strikt gegen deklarative Schemata in `modules/configSchema.js` validiert. Fehlende Schlüssel, unbekannte Kryptowährungen in `accepted_crypto` oder ohne Nodes konfigurierte Coins lösen sofortige Fail-Fast-Fehler aus. Der resiliente Multi-Node-Client in `helpers/cryptos/nodeClient.js` führt automatisch Round-Robin-Verfahren durch und schaltet bei HTTP- und JSON-RPC-Aufrufen über konfigurierte Endpunkte auf Failover um, wobei offline oder desynchronisierte Blockchain-Nodes gehandhabt werden. Betreiber können Ticker-spezifische Überschreibungen für Netzwerkgebühren (`exchange_fee_<COIN>`), erforderliche Bestätigungen (`min_confirmations_<COIN>`), tägliche USD-Volumenlimits (`daily_limit_usd_<COIN>`) und Preislimits (`fixed_buy_price_usd_<COIN>`, `min_sell_price_usd_<COIN>`) festlegen.

## Tests und AI-Betriebshandbuch

Die Testsuite umfasst 31 Jest-Testsuiten und 690 Unit-Tests, die Kern-Exchange-Module, Kryptowährungs-Adapter, Konfigurationsschemata und Hilfsprogramme abdecken, ohne dass Live-Nodes, MongoDB oder echte private Schlüssel erforderlich sind. Repository-Konventionen, technische Architektur, Invarianten-Richtlinien und Regeln zur Änderungsdisziplin sind in `AGENTS.md` formalisiert.

---
title: "ADAMANT Exchange Bot v3.0.0"
slug: "release-adamant-exchangebot-v3-0-0-397317563"
description: "ADAMANT Exchange Bot v3.0.0 ist ein Meilenstein-Release mit umfassender Modernisierung des Runtime-Stacks, Sicherheitsmechanismen für Guthaben und verbesserter Benutzerfreundlichkeit."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0"
publishedAt: "2026-09-26T16:47:34Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
repo: "adamant-exchangebot"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-exchangebot:397317563"
locale: "de"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0 ist ein bedeutendes Meilenstein-Release, das eine umfassende Modernisierung des Runtime-Stacks, Sicherheitsmechanismen für Guthaben auf Konsens-Ebene, eine umfassende Testabdeckung sowie Verbesserungen der Benutzerfreundlichkeit für Betreiber mit sich bringt.

### Modernisierung von Runtime und Architektur

Die Anforderungen an die Engine wurden auf das aktuelle LTS Node.js 22.13 oder höher aktualisiert. Veraltete `web3-eth`- und `web3-utils`-Abhängigkeiten wurden für das Management von Ethereum und ERC-20-Token durch `ethers` v6 ersetzt. Die Erstellung von Transaktionen für Bitcoin, Dash und Dogecoin wurde auf BitcoinJS-lib 7 unter Verwendung von Partially Signed Bitcoin Transactions (PSBT) umgestellt. Datenbankabfragen wurden mit dem MongoDB Driver 7 modernisiert, wobei die native Promise-basierte Async-API übernommen und veraltete Callbacks eliminiert wurden. Die Node-Konnektivität wurde auf `adamant-api` 3.x migriert, unter Verwendung von `AdamantApi` und `WebSocketClient`. Veraltete Lisk (LSK)-Module und Konfigurationsoptionen wurden vollständig entfernt. Das Projekt nutzt nun ESLint 9 (Flat Configuration), Prettier 3, Jest 30 und markdownlint für moderne Entwicklungswerkzeuge.

### Nebenläufigkeit, Einzahlungsverfolgung und Sicherheit von Guthaben

Die Überwachung von Mempool-Einzahlungen wurde mit einem fünfminütigen Streitbeilegungsfenster eingeführt, um vor Race Conditions und Double-Claim-Exploits zu schützen. Eine pro-UTXO-Sperrung wurde implementiert, um gleichzeitige Coin-Ausgaben auf UTXO-Blockchains wie BTC, DASH und DOGE zu verhindern. Eingehende Exchange- und Stornierungsanfragen werden nun pro Absender serialisiert, um Race Conditions zu vermeiden. Eine automatische Erkennung und beschleunigte Verarbeitung für Dash InstantSend-Transaktionen wurde hinzugefügt. Ein `unsupportedCoinGuard`-Schutzmechanismus wurde implementiert, um Übertragungen nicht unterstützter Coins und Netzwerkfehler sauber abzufangen.

### Chat-Befehle und Operator-UX

Ein `/cancel`-Chat-Befehl (auch als `cancel` erkannt) wurde hinzugefügt, der es Benutzern ermöglicht, ausstehende Exchanges zu stornieren, die auf eine Klärung der Ziel-Coin warten, und automatisierte Rückerstattungen abzüglich der Netzwerkgebühr zu erhalten. Frühere Einzahlungen werden nun automatisch für eine Rückerstattung in die Warteschlange gestellt, wenn ein Benutzer während des Status `inUpdateState` eine neue Übertragung sendet. Das `formatNumber`-Dienstprogramm wurde verbessert, um Exponentialzahlen (`e+` und `e-`) in eine für Menschen lesbare Dezimaldarstellung zu konvertieren. Die Unterstützung für den Onyxcoin (XCN) ERC-20-Token wurde in den Konfigurationen und im Coin-Verzeichnis hinzugefügt.

### Konfiguration und Node-Resilienz

In `configSchema.js` wurde eine reine Schema-Validierung mit Fail-Fast-Start-Prüfungen implementiert, um ungültige Konfigurationen sofort zu erkennen. Ein robuster `nodeClient.js` wurde entwickelt, der Round-Robin-Verfahren und automatisches Failover über mehrere RPC- und REST-Endpunkte bietet. Granulare, pro Coin konfigurierbare Überschreibungen wurden für Gebühren, Bestätigungslimits, tägliche USD-Limits und Preisgrenzen hinzugefügt.

### Tests und Dokumentation

Eine umfassende Testsuite mit 31 Jest-Testsuiten und 690 Unit-Tests wurde hinzugefügt. Diese decken Hilfsprogramme, Krypto-Adapter, Konfigurations-Schema-Validierungen und Exchange-Module ohne externe Netzwerk- oder Datenbankabhängigkeiten ab. Die Betriebsdokumentation wurde um ein `AGENTS.md` KI-Agenten-Handbuch, `CONTRIBUTING.md` und eine modernisierte `README.md` erweitert.

### Breaking Changes

Die minimal unterstützte Node.js-Version ist nun 22.13, was ein Upgrade der Runtime-Umgebung durch die Betreiber erfordert. Veraltete `web3-eth`- und `web3-utils`-Bibliotheken wurden durch `ethers` v6 ersetzt, was sich auf benutzerdefinierte Integrationen auswirken kann, die auf den vorherigen Ethereum-Bibliotheks-APIs basieren. Die Erstellung von Transaktionen für Bitcoin, Dash und Dogecoin verwendet nun BitcoinJS-lib 7 mit PSBT, was den internen Ablauf der Transaktionserstellung ändert. Der MongoDB Driver 7 ersetzt den vorherigen Treiber, wodurch auf Callbacks basierende Abfragemuster entfallen. Alle veralteten Lisk (LSK)-Module und Konfigurationsoptionen wurden vollständig entfernt; Betreiber mit LSK-bezogenen Konfigurationen müssen diese Einträge entfernen. Die strikte Schema-Validierung erzwingt nun einen Fail-Fast-Start, was bedeutet, dass zuvor tolerierte ungültige Konfigurationswerte dazu führen, dass der Bot nicht startet.

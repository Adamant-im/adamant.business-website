---
title: "ADAMANT API JS Client v3.0.0"
slug: "release-adamant-api-jsclient-v3-0-0-342548957"
description: "Wichtige SDK-Version in Kombination mit ADAMANT Node v0.10.0. Enthält API-Updates, modulare Paketstruktur, verbesserte Stabilität und neue Dokumentation."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.0.0"
publishedAt: "2026-06-21T15:22:41Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:342548957"
locale: "de"
placeholder: false
---

# ADAMANT API JS Client v3.0.0

Dies ist eine wichtige SDK-Version, die gemeinsam mit ADAMANT Node v0.10.0 veröffentlicht wurde. Sie aktualisiert den HTTP- und WebSocket-Client für die aktuelle Node-API, führt stabile, modulare Paketgrenzen ein, verbessert das Wiederholungs- und Failover-Verhalten, fügt deterministisch generierte Metadaten hinzu und ersetzt die veraltete Wiki-basierte Dokumentation durch eine quellgesteuerte VitePress- und TypeDoc-Dokumentationsseite.

## Unterstützung für ADAMANT Node v0.10.0

Die Veröffentlichung generiert API-DTOs neu aus einer festgelegten `adamant-schema`-Revision, einschließlich Millisekunden-Timestamps, Lade- und Statusdaten, numerischer Zähler und NULL-wertiger Felder für unbestätigte Transaktionen. Neue Abfrageparameter für Transaktionen und Chats werden hinzugefügt, wie `returnUnconfirmed`, `includeDirectTransfers`, Delegatensuche per Adresse sowie Abfragen für mehrere Transaktionstypen. Transaktionsfilter werden nun standardmäßig mit logischem `and` kombiniert, und Betragsfilter gelten nur für Transfer-Transaktionen. Das SDK unterstützt optional `timestampMs` bei der Transaktionserstellung und bietet `getEpochTimeMs`; da `timestampMs` nicht Teil der signierten Bytes, Hashes, IDs und Signaturen ist, bleiben diese unverändert. Die Health-Checks wurden an die konsolidierte Node-Statusantwort angepasst und unterstützen nun inklusive Filterung nach Mindest-Node-Version.

## Zuverlässigkeit und WebSocket-Verhalten

Der Client wiederholt explizit abgelehnte POST-Antworten nicht mehr, sondern gibt strukturierte, nicht wiederholbare HTTP-Fehler zurück, anstatt in eine Schleife zu geraten. Wiederholungen und Failover für aktive Nodes bleiben für sichere Anfragen und Netzwerkfehler ohne HTTP-Antwort erhalten. WebSocket-Abonnements unterstützen nun mehrere Adressen, Transaktionstypen und Chat-Asset-Typen, mit praktischen Handlern für Transaktionen und Nachrichten, Callbacks für Verbindung und Wiederverbindung, expliziten connect- und disconnect-Methoden, typisierten Verbindungsfehlern, Listener-Bereinigung und begrenztem Wiederverbindungsverhalten.

## Modularer SDK- und npm-Package

Der Paket-Root bleibt ADM-fokussiert und verhindert das Laden coin-spezifischer Implementierungen. Subpfad-Exports werden für ADM, API-DTOs, Transaktionen, Metadaten sowie Hilfsfunktionen für BTC, ETH, DASH und DOGE hinzugefügt, wobei sowohl CommonJS- als auch ESM-Unterstützung erhalten bleibt. Deterministische Wallet-Metadaten werden aus einer festgelegten `adamant-wallets`-Revision synchronisiert. Lisk- und Klayr-Code sowie Abhängigkeiten wurden entfernt, und die unterstützten externen Coin-Ableitungen und Adressvalidierungen wurden standardisiert. Die Version erfordert Node.js 22 oder höher, verwendet pnpm-Workspace-Metadaten, modernisiert TypeScript und Abhängigkeiten und fügt Tarball-Tests auf Consumer-Ebene hinzu.

## Behobene API-Probleme seit v2.4.0

Diese Version behebt Probleme mit Delegierten-Stimmabgaben und Health-Checks. Signalnachrichten können nun String-Nutzlasten enthalten, und Beträge werden nur für Nachrichtentypen validiert, die Beträge übertragen. Transaktions-IDs werden als Strings dargestellt, und Validierungshilfsfunktionen werden exportiert.

## Dokumentation, Automatisierung und Wartung

Die Dokumentation wird über eine VitePress-Website bereitgestellt, die eine von TypeDoc generierte API-Referenz und Anleitungen enthält. Die Veröffentlichung umfasst einen GitHub-Pages-Dokumentations-Workflow mit CNAME, aktualisierten README- und CONTRIBUTING-Dateien, deterministischen Prüfungen für Schema- und Metadatensynchronisation, einem benutzerdefinierten Jest-Runner, Paket-Consumer-Tests, erweiterter Testabdeckung und Modulgrenz-Tests. Linting- und TypeScript-Konfigurationen wurden auf den aktuellen Toolchain migriert, und veraltete Dateien wurden entfernt.

### Breaking changes

WebSocket-Abonnements verwenden nun standardmäßig `allDirections`. Bisher lieferte der Client nur eingehende Transaktionen mit einem hartcodierten `recipientId === admAddress`-Filter; jetzt werden standardmäßig sowohl eingehende als auch ausgehende Transaktionen ausgegeben. Um das alte Verhalten wiederherzustellen, übergeben Sie `direction: 'incoming'` in den WebSocket-Client-Optionen. Node.js 22 oder höher ist erforderlich. Coin-Hilfsfunktionen müssen nun aus expliziten Pfaden wie `adamant-api/coins/btc` importiert werden und sind nicht mehr aus dem Paket-Root exportiert. Die Unterstützung für Lisk und Klayr wurde entfernt. Transaktionsabfragefilter verwenden nun standardmäßig logisches `and`, und Betragsfilter gelten nur für Transfer-Transaktionen. Nutzer sollten die veraltete Nutzung von `withoutDirectTransfers` überprüfen und auf `includeDirectTransfers` migrieren.

Das Byte-Layout von Transaktionen, die Signierung, IDs und die Signatursemantik bleiben unverändert. Sowohl CommonJS- als auch ESM-Nutzer werden durch den getesteten Paket-Tarball abgedeckt.

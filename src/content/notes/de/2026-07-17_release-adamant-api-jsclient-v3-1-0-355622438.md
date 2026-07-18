---
title: "ADAMANT API JS Client v3.1.0"
slug: "release-adamant-api-jsclient-v3-1-0-355622438"
description: "Dieses Release ist ein SDK-Update abgestimmt auf ADAMANT Node v0.10.2. Es vervollständigt die typisierte Read-Only-Node-API-Oberfläche, fügt optionale Live-Block- und Guthaben-Subscriptions hinzu, synchronisiert Delegate- und Netzwerkstatus-DTOs mit dem maßgeblichen Schema und aktualisiert die Paket-Toolchain."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.1.0"
publishedAt: "2026-07-17T10:54:11Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:355622438"
locale: "de"
placeholder: false
---

Dieses Release ist ein SDK-Update abgestimmt auf ADAMANT Node v0.10.2. Es vervollständigt die typisierte Read-Only-Node-API-Oberfläche, fügt optionale Live-Block- und Guthaben-Subscriptions hinzu, synchronisiert Delegate- und Netzwerkstatus-DTOs mit dem maßgeblichen Schema und aktualisiert die Paket-Toolchain.

## Vollständige typisierte Read-Only-Node-API

Diese Version fügt `getTopAccounts()` mit typisierten `limit`-, `offset`- und `isDelegate`-Optionen hinzu, wobei `limit: 0` für reine Zähl-Metadaten verwendet werden kann. Es vervollständigt die Optionstypen für Blöcke, Delegates, Delegate-Suche und -Statistiken, Peers, gepoolte Transaktionen und Transaktions-Zeitbereiche. Das Release stellt typisierte Konsens-Codenamen und Aktivierungspläne, Block-Belohnungsmeilensteine und die gesamten von Delegaten erzeugten Beträge bereit. Es erweitert außerdem die mitgelieferten Consumer-Checks, sodass die neuen Methoden und Antwortverträge aus dem gebauten npm-Artefakt heraus verifiziert werden.

## Endpunktbewusste Abfragebehandlung

Das SDK beschränkt nun Direkt-Transfer- und andere Steuerparameter auf Endpunkte, die diese unterstützen. Es entfernt bekannte nicht unterstützte Steuerparameter, bevor eine Anfrage gesendet wird, anstatt zuzulassen, dass sie wirkungslos oder ungültige Filter werden, während die deterministische Reihenfolge der Query-Strings beibehalten wird. Der Client warnt, wenn gemischte `and`-/`or`-Bedingungen auf dem flachen, reihenfolgeabhängigen SQL-Ausdrucksmodell des Nodes beruhen, und beschränkt Betragsfilter auf `/api/transactions`, wo der Node sie tatsächlich anwendet.

## Client-WebSocket-Zustandssubscriptions

Dieses Release fügt optionale `onNewBlock()`-Subscriptions für kompakte Header neu angewendeter Blöcke sowie `onBalanceChange()`-Subscriptions für bestätigtes Guthaben, unbestätigtes Guthaben oder beides hinzu. Guthaben-Payloads werden als aktuelle absolute Werte und nicht als Deltas behandelt, und die teilweise Feldauslieferung ist dokumentiert. Block- und Guthaben-Subscriptions werden nach einer Wiederverbindung zum selben oder einem anderen gesunden Node automatisch wiederhergestellt. Handler-Fehler werden über den bestehenden `.catch()`-Pfad geleitet, und Handler können über `.off()` entfernt werden. Diese Ereignisse sind Best-Effort-Live-Benachrichtigungen, keine dauerhaften Streams. Anwendungen sollten ihren Zustand nach Verbindungsabbrüchen über REST wiederherstellen, wenn die Korrektheit von der vollständigen Historie abhängt.

## Maßgebliche DTO-Synchronisierung

API-Typen werden aus `Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90` neu generiert. Das Release fügt `consensusCodeName`, `consensusSchedule` und `milestoneSchedule` zu den Netzwerkstatus-Verträgen hinzu und ergänzt den Delegate-Lebenszeit-`forged`-Wert, während die eigenständige Form der Delegate-Suchantwort beibehalten wird. Es korrigiert die generierte Delegate-Eigenschaft `producedlocks` zur Laufzeiteigenschaft `producedblocks` und dokumentiert die Semantik für Next-Forger-, Delegate-, Peer- und gepoolte-Transaktions-Snapshots sowie Filterung.

## Paket- und Toolchain-Pflege

Die Paketversion wird auf `3.1.0` gesetzt und deklariert Node.js `>=22.12.0`. pnpm wird auf 11.13.1 aktualisiert mit erneuerten Laufzeit- und Entwicklungsabhängigkeiten, ohne direkte Abhängigkeiten hinzuzufügen. Der aufgelöste Lockfile-Graph wird von 886 auf 876 Paketeinträge reduziert. Die Formatierung wird auf Prettier 3.9 ausgerichtet, und lokale KI-Agent- und Editor-Verzeichnisse werden aus dem Repository herausgehalten. Die Veröffentlichung erfolgt über npm Trusted Publishing mit GitHub Actions Provenance.

## Kompatibilitätshinweise

Neue Funktionen für Top-Accounts, Netzwerkstatus, Delegates, Blöcke und Guthaben-Ereignisse erfordern ADAMANT Node v0.10.2. Transaktions-Byte-Layout, Hashes, IDs, Signaturen, Verschlüsselung, Root-Exporte, Node-Auswahl, Wiederholungsversuche und Failover-Verhalten bleiben unverändert. Das Diff umfasst 17 geänderte Dateien mit 1.471 Einfügungen und 513 Löschungen und deckt die vollständige `v3.0.0..master`-Historie für die typisierte API, generierte DTOs, WebSocket-Subscriptions, Tests, Dokumentation, Versionsmetadaten und Abhängigkeitsaktualisierung ab.

## Validierung

Verifiziert auf Node.js 22.23.1 und pnpm 11.13.1. Alle Prüfungen bestanden: `npm run compile`, `npm run typecheck`, `npm test` (19 Suiten und 253 Tests bestanden), `npm run lint`, `npm run test:package` (ESM, CommonJS, Live-Consumer, Paket-Subpfade und TypeScript-Deklarationen), `npm run api-types:check`, `npm run metadata:check`, `npm run docs:build` und `git diff --check`. Generierte API-Typen stimmen mit der festgelegten `adamant-schema`-Revision überein, und Wallet-Metadaten stimmen mit `Adamant-im/adamant-wallets@54a820b6dc5e0ec77c3a6fbac91d2f7809a2f5b7` überein.

### Breaking Changes

Die Paket-Engine-Mindestversion ändert sich von Node.js `>=22` auf `>=22.12.0`. Deployments, die auch ADAMANT Node v0.10.2 ausführen, sollten das vom Node erforderliche Node.js `>=22.13.0` verwenden. TypeScript-Consumer, die die falsch geschriebene Eigenschaft `DelegateDto.producedlocks` verwenden, müssen auf `producedblocks` migrieren. Consumer, die generierte Delegate- oder Netzwerkstatus-DTOs manuell konstruieren, müssen möglicherweise die neu erforderlichen Felder bereitstellen. TypeScript-Aufrufer, die endpunktinkompatible Abfragesteuerungen übergeben haben, müssen den Optionstyp für den vorgesehenen Endpunkt verwenden.

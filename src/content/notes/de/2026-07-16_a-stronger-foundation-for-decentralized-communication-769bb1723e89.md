---
title: "ADAMANT Node v0.10.2: Synchronisierungswiederherstellung, verifizierte Checkpoints und API-Verbesserungen"
slug: "a-stronger-foundation-for-decentralized-communication-769bb1723e89"
description: "ADAMANT Node v0.10.2 verbessert die Synchronisierungswiederherstellung, führt verifizierte Checkpoints für abgeleitete Zustände ein, erweitert REST- und Socket.IO-Funktionen und behebt API-Fehler."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-stronger-foundation-for-decentralized-communication-769bb1723e89"
publishedAt: "2026-07-16T18:30:13.394Z"
author: "Alex Web3"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:769bb1723e89"
coverImage: "/images/engineering-notes/medium/769bb1723e89/001-23318e9ae1.webp"
locale: "de"
placeholder: false
---

## Überblick

ADAMANT Node v0.10.2 verbessert die Synchronisierungswiederherstellung, führt verifizierte Checkpoints für abgeleitete Zustände ein, erweitert die REST- und Socket.IO-Funktionen, behebt mehrere API-Sonderfälle, optimiert Datenbankabfragen und aktualisiert Abhängigkeiten. Das Release bewahrt das bestehende Protokollverhalten und führt keinen Konsens-Fork ein.

Das vollständige Changelog ist auf [GitHub](https://github.com/Adamant-im/adamant/releases/tag/v0.10.2) verfügbar.

## Synchronisierungswiederherstellung

Ein dezentrales Netzwerk ist auf unabhängige Betreiber angewiesen, die Nodes unter unterschiedlichen Bedingungen betreiben. Wenn die Node-Software ständige Eingriffe oder Wiederherstellung auf Expertenniveau erfordert, wird die Teilnahme schwieriger und das Netzwerk wird in der Praxis weniger dezentral.

Bisher konnte ein unterbrochener Callback oder Datenbankfehler in der Synchronisierungspipeline dazu führen, dass eine Node glaubte, sie synchronisiere noch, obwohl ihre Blockhöhe nicht mehr voranschritt. Die Node blieb stecken, bis ein Betreiber dies bemerkte und sie neu startete.

v0.10.2 fügt einen fortschrittsbasierten Synchronisierungs-Watchdog hinzu, der zwischen einer langsamen Node, die noch Blöcke anwendet, und einem tatsächlich blockierten Synchronisierungslauf unterscheidet. Wenn innerhalb des konfigurierten Zeitfensters kein Fortschritt bei der Blockhöhe erzielt wird, bricht die Node diesen Lauf sicher ab, leert alle ausstehenden Zustandsänderungen und ermöglicht einen Neustart der Synchronisierung. Das Release behebt außerdem Datenbank-Ablehnungspfade, die Blockverarbeitungs-Callbacks stillschweigend unvollendet lassen konnten.

Dies ist keine Konsensänderung. Sie entscheidet nicht, welche Blöcke gültig sind; sie hilft einer Node, in den Normalbetrieb zurückzukehren, wenn die umgebende Ausführungspipeline stockt.

## Verifizierte Checkpoints für abgeleitete Zustände

ADAMANT Nodes pflegen abgeleitete `mem_*`-Tabellen für Salden, Delegierte, Runden und verwandte Zustände. Die Blockchain bleibt kanonisch, aber der Neuaufbau aller abgeleiteten Zustände nach einem unterbrochenen Shutdown kann bei einer reifen Kette sehr lange dauern.

v0.10.2 führt rotierende, persistierte Checkpoints für diese abgeleiteten Zustände ein. Jeder Checkpoint ist an einen bekannten Block und ein bekanntes Netzwerk gebunden, trägt einen kanonischen Digest und wird vor der Verwendung validiert. Wenn eine Node mit inkonsistenten Speicher-Mirrors startet, kann sie den neuesten verifizierten Checkpoint wiederherstellen und nur die Blöcke nachspielen, die danach kamen.

Das Sicherheitsmodell ist konservativ. Ein Checkpoint wird erst akzeptiert, nachdem seine Metadaten, Digest, Kettenreferenz, Netzwerk und Zustandsinvarianten verifiziert wurden. Unbestätigte Zustände werden neu aufgebaut, anstatt einem Checkpoint zu vertrauen. Wenn ein Validierungs- oder partieller Replay-Schritt fehlschlägt, fällt die Node auf den bestehenden vollständigen deterministischen Neuaufbau zurück. Kanonische Blöcke und deterministisches Replay bleiben die Quelle der Wahrheit, sodass der Checkpoint ein schnellerer Wiederherstellungspfad ist und kein Protokollzustand.

## REST-API-Verbesserungen

ADAMANT ist eine dezentrale Vertrauensschicht für Kommunikationsprodukte, nicht nur eine Blockchain-Datenbank. v0.10.2 fügt einen konsistenten Top-Accounts-Endpunkt mit deterministischer Sortierung, Paginierung, Delegiertenfilterung und Count-only-Anfragen hinzu, wodurch Node-spezifische Workarounds für Explorer und Analysetools entfallen.

Das Release legt außerdem den aktiven Konsens-Codename der Node, den effektiven Aktivierungsplan, den vollständigen Reward-Meilensteinplan und den lebenslangen Forge-Betrag jedes Delegierten offen. Monitoring-Systeme und Explorer können nun effektive Pläne direkt von einer Node abrufen, anstatt die Konfiguration in jedem Client zu duplizieren.

Mehrere bestehende Delegierten-APIs sind nun genauer. Single-Delegierten-Antworten melden wieder den echten Rang und den Produktivitätskontext. Delegierten-Wähler-Abfragen geben bei Verwendung eines Adresslisten-Filters nicht mehr unbeabsichtigt fremde Accounts zurück. Next-forger-Projektionen verwenden nun die korrekte nächste Blockhöhe an Rundengrenzen.

Die Blocks-API erhielt sowohl einen Korrektheits- als auch einen Performance-Fix: Sie verarbeitet nun `numberOfTransactions=0` korrekt, und ein neuer zusammengesetzter Datenbankindex verhindert einen teuren Scan bei Abfrage eines unbekannten Generators mit der Standard-Blockhöhen-Sortierung.

## Socket.IO-Live-Events

Anwendungen, die zeitnahe Aktualisierungen benötigen, können sich nun für zwei neue Client-Socket.IO-Event-Familien anmelden: kompakte `newBlock`-Benachrichtigungen und `balances/change`-Benachrichtigungen für bestätigte Salden, unbestätigte Salden oder beides.

Die Node unterhält dedizierte Abonnement-Indizes und bündelt betroffene Account-Lesungen um Block-Anwendung und Rollback, sodass sie nicht jeden verbundenen Client durchsucht oder unnötige Account-Abfragen durchführt, wenn niemand die geänderten Daten abonniert hat.

Diese Events sind nach bestem Bemühen und nicht persistent. Anwendungen sollten ihre Abonnements nach einer Wiederverbindung wiederherstellen und weiterhin kritische Zustände über REST abgleichen. Live-Events reduzieren Polling, ersetzen aber nicht die Verifizierung.

## Abhängigkeits-Baseline

Das Release aktualisiert Abhängigkeiten innerhalb ihrer bestehenden Major-Versionen, entfernt eine ungenutzte direkte npm-Laufzeitabhängigkeit und ihren großen gebündelten Unterbaum und wendet einen engen Kompatibilitäts-Override für eine transitive Toolchain-Abhängigkeit an. Die verifizierte npm-Audit-Baseline ging von vier moderaten und einem hohen Befund auf null moderate, hohe oder kritische Befunde zurück.

Kein kryptografisches Protokoll-, Signatur-, Mnemonic-, Peer-Handshake- oder Transaktionsvalidierungsverhalten wurde im Rahmen dieser Wartung geändert.

## Upgrade-Hinweise

Das Update auf v0.10.2 ist **nicht obligatorisch** für die Netzwerkkompatibilität. Das Release ändert nicht die Block- oder Transaktionsserialisierung, Signaturen, Delegiertenreihenfolge, Belohnungen, Gebühren, Aktivierungshöhen, Slot-Timing oder deterministisches Replay. Bestehende kompatible Nodes können weiterhin teilnehmen. cryptofoundry empfiehlt das Update für Betreiber, die eine bessere Synchronisierungswiederherstellung, schnellere Wiederherstellung nach unterbrochenen Shutdowns, Sicherheitswartung, verbesserte Abfrageleistung und die neuen API-Funktionen wünschen.

ADAMANT Node erfordert weiterhin Node.js 22.13.0 oder neuer. Der erste Start nach dem Upgrade wendet neue Datenbankmigrationen an. Betreiber sollten ihrem normalen Backup-Verfahren folgen, die Node ordnungsgemäß stoppen, auf `Cleaned up successfully` warten und ausreichend Zeit und Speicherplatz für die Erstellung der Checkpoint-Tabellen und neuen Indizes einplanen. Nach dem Start sollten der Nodestatus, der Synchronisierungsfortschritt, die Live-Blockverarbeitung und alle von verbundenen Diensten genutzten REST- oder Socket.IO-Funktionen überprüft werden.

Weitere Ressourcen sind in der [ADAMANT Node-Dokumentation](https://docs.adamant.im), dem [ADAMANT API-Schema](https://schema.adamant.im) und der [technischen Release-Diskussion](https://github.com/orgs/Adamant-im/discussions/66) verfügbar.

---
title: "ADAMANT Forging Pool v3.1.0: Korrekturen bei Belohnungen und Auszahlungen"
slug: "discussion-58-adamant-forging-pool-v3-1-0-recommended-update-for-reward-and-payout-fixes-10353267"
description: "ADAMANT Forging Pool v3.1.0 ist ein empfohlenes Update für Pool-Betreiber mit verbesserten Berechnungen und sichereren Auszahlungen."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/58"
publishedAt: "2026-07-01T14:33:27Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10353267"
locale: "de"
placeholder: false
---

ADAMANT Forging Pool v3.1.0 ist ein empfohlenes Update für Pool-Betreiber. Die Version korrigiert und stabilisiert die Berechnung von Belohnungen und die Handhabung geplanter Auszahlungen und führt mehrere strukturelle Änderungen ein, die vor einem Upgrade produktiver Pools geprüft werden sollten.

## Warum aktualisieren

Die wichtigsten Änderungen zielen auf die Sicherheit von Auszahlungen, den Schutz des Betreibers und die langfristige Wartbarkeit ab. Ausstehende Belohnungen werden nun vor der Buchung der Auszahlung normalisiert, und der Fortschritt der Belohnungen pro Wähler wird für geforgte Blöcke gespeichert. Wiederholungs- und Absturzpfade sind sicherer gegenüber doppelten Belohnungsaktualisierungen. Die Pfade für Auszahlungen, Blockverarbeitung und Speicherung verfügen nun über gezieltere Tests, und Protokolle sowie Benachrichtigungen sind klarer bei betrieblichen Fehlerzuständen.

## Speicherung und Migration

Die Pool-Speicherung erfolgt nun über MongoDB. Die Version enthält Migrationstools für ältere, auf LowDB basierende Pooldaten im Verzeichnis `scripts/migrate-lowdb-mongodb/`, zusammen mit Migrationstests, MongoDB-Index-Setup, einer aktualisierten Konfigurationsreferenz und Anleitungen im README. Betreiber sollten bestehende Pooldaten sichern, die Migration auf einer Kopie testen und die Summen ausstehender und empfangener Belohnungen prüfen, bevor produktive Auszahlungen auf den aktualisierten Pool umgestellt werden.

## Betreibersicherheit

v3.1.0 fügt die optionale Unterstützung für verschlüsselte Passphrasen hinzu. Bestehende Konfigurationen mit Klartext-Passphrasen werden weiterhin unterstützt, aber Betreiber können nun die Delegat-Passphrase verschlüsseln und den laufenden Pool nur entsperren, wenn Auszahlungen aktiviert werden sollen:

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```

Die Steuerschnittstelle nutzt einen lokalen Unix-Socket, der nur dem Besitzer zugänglich ist. Mit einer verschlüsselten Passphrase kann der Pool gesperrt gestartet werden: Block-Synchronisation, Dashboard und öffentliche API bleiben verfügbar, während Auszahlungen und ADM-Benachrichtigungen pausiert bleiben, bis der Pool entsperrt wird.

## Monitoring und Dashboard

Die Version fügt einen `/api/health`-Endpunkt für externes Monitoring ohne Geheimnisse hinzu sowie einen gesperrten Auszahlungsstatus im Dashboard. Die Filterung von Wählern und Transaktionen nach Adresse oder Name wird nun unterstützt, und Delegat- sowie Wähler-Namen werden unter den Adressen angezeigt, wenn verfügbar. Numerische Sortierkorrekturen, verbesserte Explorer-Links und Layout-Verbesserungen im Dashboard ergänzen die Änderungen.

## Hinweise zur Laufzeit und zum Upgrade

Die Mindestanforderungen an die Laufzeitumgebung sind nun Node.js 22.13.0+ und npm 10+. README, CONTRIBUTING und die Repository-Anleitungen wurden aktualisiert und beinhalten nun Setup-, Migrations-, Monitoring-, Geheimnisschutz- und Beitragungs-Workflows.

Bevor Sie aktualisieren, sichern Sie Konfiguration und Belohnungshistorie, prüfen Sie die MongoDB-Einstellungen in `config.default.jsonc` und testen Sie die Migration von LowDB zu MongoDB auf einer Datensicherung. Nach der Migration überprüfen Sie die Summen ausstehender und empfangener Belohnungen, prüfen Sie die Einstellungen für Auszahlungs- und Wartungswallets, bauen und testen Sie das Dashboard und prüfen Sie `/api/health`. Entsperrten Sie Auszahlungen erst nach Überprüfung der Startprotokolle und des Poolstatus.

Release und Repository: [github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)

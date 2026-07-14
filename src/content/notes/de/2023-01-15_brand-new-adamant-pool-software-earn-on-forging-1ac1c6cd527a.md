---
title: "ADAMANT Pool v3.0.0 — Software-Update für das Forging-Pool-System"
slug: "brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
description: "Ein Forging-Pool kombiniert das Stimmgewicht von Nutzern, um Blöcke in der ADAMANT-Blockchain zu generieren und ADM-Belohnungen automatisch zu verteilen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
publishedAt: "2023-01-15T15:59:48.033Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/1ac1c6cd527a/001-0-rvpkdxtavqcrrn3p.webp"
cardSpan: "full"
originalId: "medium:1ac1c6cd527a"
locale: "de"
placeholder: false
---

Ein Forging-Pool ermöglicht es Nutzern, ihr Stimmgewicht zu kombinieren, um Blöcke in der ADAMANT-Blockchain zu generieren und ADM-Belohnungen automatisch zu teilen. Die Pool-Software übernimmt die Berechnung und Verteilung der Belohnungen ohne manuellen Eingriff.

Version 3.0.0 des ADAMANT Forging-Pools ist jetzt als [Open Source](https://github.com/Adamant-im/pool) verfügbar. Der Code wurde vollständig überarbeitet und in ein neues Repository verschoben, wodurch das alte Repository als veraltet gilt. Die Neuentwicklung bringt aktualisierte Bibliotheksabhängigkeiten, verbesserte Leistung und geringeren Ressourcenverbrauch mit sich. Das Konfigurationsformat bleibt unverändert, und Betreibern, die von Version 2 aktualisieren, steht ein Migrationsskript zur Verfügung.

Die auffälligste Änderung für Wähler ist eine neue Web-Oberfläche, die mit dem `svelte`-Framework erstellt wurde und ein responsives Erlebnis sowohl auf Desktop- als auch auf Mobilgeräten bietet.

![ADAMANT Pool Web UI](/images/engineering-notes/medium/1ac1c6cd527a/002-0-eus0ye-v8djitrru.webp)

![ADAMANT Pool Web UI mobile](/images/engineering-notes/medium/1ac1c6cd527a/003-0-cdfhik804ra3jq2w.webp)

Das v3.0.0-Release aktualisiert alle Abhängigkeiten, schreibt das Dashboard in `svelte` neu und überarbeitet sowie optimiert den gesamten Codebase, während bekannte Fehler behoben werden.

Es gibt zwei inkompatible Änderungen zu beachten. Erstens wird nun Node.js 18.12.1 oder höher (aktuelle LTS-Version) benötigt; ältere Versionen werden nicht mehr unterstützt. Zweitens verwendet der Pool nun `lowdb` als Datenbank. Betreiber, die von v2 aktualisieren, sollten den Migrationsabschnitt in der README-Datei konsultieren.

Das Stimmen für einen Pool unterstützt das dezentrale ADAMANT-Netzwerk und generiert passives Einkommen in Form von Forging-Belohnungen. Eine Liste aktiver ADAMANT-Pools ist in der [ADAMANT-Dokumentation](https://medium.com/adamant-im/hodl-list-of-adamant-pools-join-in-and-get-rewards-491a98610f4b) verfügbar.

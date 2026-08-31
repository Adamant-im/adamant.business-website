---
title: "ETH-transactions-storage: Optionaler Adressfilter, schlankere Indizes und eine sicherere Public API"
slug: "discussion-76-eth-transactions-storage-optional-address-filter-lighter-indexes-and-a-safer-public-api-10716438"
description: "ETH-transactions-storage ist ein selbst gehosteter Ethereum-Indexer, der ETH- und ERC-20-Aktivitäten in PostgreSQL speichert und als REST-API bereitstellt."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/76"
publishedAt: "2026-08-30T20:51:54Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10716438"
locale: "de"
placeholder: false
---

[ETH-transactions-storage](https://github.com/Adamant-im/ETH-transactions-storage) ist ein selbst gehosteter Ethereum-Indexer, der einem Ethereum-Node folgt, native ETH- sowie ERC-20-`transfer(address,uint256)`-Aktivitäten in PostgreSQL speichert und diese über PostgREST als schreibgeschützte REST-API bereitstellt. Da Ethereum-Nodes Adressverlaufsabfragen nicht direkt beantworten können, sind Wallets, DApps, Treasuries und Betreiber normalerweise auf Drittanbieter-Explorer angewiesen. Dieses Projekt ist die Alternative, die Sie selbst betreiben – ohne API-Schlüssel-Anbieter, ohne Tracking und ohne Telemetrie.

Der `dev`-Branch enthält nun einen **optionalen Adressfilter**, der mit [PR #29](https://github.com/Adamant-im/ETH-transactions-storage/pull/29) zusammengeführt wurde. Die Vollketten-Indizierung bleibt der Standard und wird von ADAMANT-Wallets verwendet. Der gefilterte Modus richtet sich an Betreiber, die nur eine bekannte Menge an Adressen benötigen und nicht die gesamte Chain speichern möchten.

## Warum der Filter existiert

Ein öffentlicher Ethereum-Indexer ist eine große Datenbank. Bei einem Mainnet-Datensatz von etwa 490 Millionen Zeilen für ein Jahr verbrauchte der ursprüngliche vollständige Index hunderte Gigabyte. Viele Betreiber benötigen diese Größenordnung nicht – eine Wallet oder ein Custodial-Backend, das nur eigene Nutzer bedient, eine Projekt-Treasury, die einige wenige operative Adressen überwacht, ein selbst gehosteter Explorer für eine app-spezifische Adressmenge oder eine Labor- und CI-Umgebung, die kompakt bleiben soll, profitieren von einer selektiven Speicherung. Der Filter bewahrt den bestehenden API-Vertrag: Clients fragen weiterhin `/ethtxs`, `/max_block` und `/aval` ab. Betreiber ändern, was gespeichert wird, nicht wie es gelesen wird.

## Verhalten des Adressfilters

Der Filter ist standardmäßig deaktiviert (`ADDRESS_FILTER_ENABLED=false`). Die Aktivierung verweist `ADDRESS_FILTER_FILE` auf eine private Liste (Standard: `filter/addresses.txt`, git-ignoriert und nicht in das Docker-Image kopiert). Die Liste akzeptiert pro Zeile eine 40-stellige Hex-Adresse mit `0x`-Präfix; Leerzeilen und `#`-Kommentare werden ignoriert, der Abgleich erfolgt unabhängig von Groß- und Kleinschreibung. Native Transfers werden über `txfrom` oder `txto` abgeglichen. Unterstützte ERC-20-`transfer(address,uint256)`-Aufrufe werden über den Absender (`txfrom`), den Token-Contract (`txto`) und den ABI-kodierten Empfänger (`contract_to`) abgeglichen.

Die Liste wird vor jedem Synchronisationsdurchlauf neu geladen, sodass gültige Ergänzungen und Entfernungen wirksam werden, ohne den Indexer neu zu starten. Ungültige, leere oder fehlende Listen führen zu einem sicheren Abbruch: Die Indizierung stoppt, bis die Datei korrigiert wurde, anstatt stillschweigend alles zu speichern. Der Receipt-RPC wird für Transaktionen übersprungen, die der Filter ablehnt.

Bestehende Indexer-Limits bleiben unverändert: Der Filter erfasst keine internen ETH-Transfers, keine ERC-20-Flüsse, die kein direkter `transfer(address,uint256)` sind (wie `transferFrom`, Router, Multisigs oder Batch-/Aggregator-Aufrufe), und kein automatisches historisches Backfill, wenn eine Adresse hinzugefügt wird. Das Aktivieren des Filters löscht keine bereits gespeicherten Zeilen. Ein Neuaufbau ist ein manueller Schritt des Betreibers: Indexer stoppen, `ethtxs` und `sync_state` in einer Transaktion kürzen (oder beides auf Block `N` zurücksetzen), `START_BLOCK` setzen und neu starten. Das bloße Kürzen von `ethtxs` führt zu keinem erneuten Scan, da der Checkpoint die Chain weiterhin als abgeschlossen meldet.

## Robuster Synchronisationsfortschritt

Gefilterte und leere Blöcke sahen zuvor so aus, als wäre „nichts passiert“, sodass der Indexer sie erneut scannen konnte. Der `dev`-Branch führt nun einen einzeiligen `public.sync_state`-Checkpoint, der in derselben PostgreSQL-Transaktion wie die Inserts für den jeweiligen Block aktualisiert wird. Der `/max_block`-Endpunkt gibt weiterhin `{ max, version }` zurück, wobei `max` gleich `GREATEST(MAX(ethtxs.block), sync_state.last_block)` ist. Der Startvorgang setzt den zuletzt verarbeiteten Block nun atomar mit dem Checkpoint zurück. Das Skript `create_tables.sql` ist idempotent: Es erstellt `sync_state`, initialisiert es aus dem bestehenden höchsten Transaktionsblock und gewährt DML-Rechte an `api_user` und `app_user`, sofern diese Rollen existieren. Die Rolle `web_anon` kann `sync_state` nicht direkt lesen oder schreiben.

## Indizes, API-Härtung und Betrieb

Der Adressfilter baut auf weiteren `dev`-Arbeiten aus [PR #28](https://github.com/Adamant-im/ETH-transactions-storage/pull/28) auf, die noch kein GitHub-Release sind (der neueste Tag bleibt [v2.4.1](https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.4.1)). Ein minimales Set von fünf Indizes deckt die Abfragemuster von ADAMANT Web und iOS ab und spart etwa 90–110 GB pro Jahresdatensatz im Vergleich zum alten Set mit acht Indizes. Die PostgREST-Anonym-Rolle `web_anon` ist nun auf `SELECT` für `ethtxs`, `aval` und `max_block` beschränkt, und `db-max-rows = 10000` begrenzt die serialisierte Ergebnisgröße, sodass ein unbegrenzter `GET /ethtxs`-Aufruf den API-Speicher nicht überlasten kann.

Öffentliche Deployments erhalten Nginx-Schutzmaßnahmen: eine Methoden-Allow-List (`GET`/`HEAD`/`OPTIONS`), eine Anforderung für `txfrom` oder `txto` bei `/ethtxs` sowie die Ablehnung von `Prefer: count=exact` und riesigen Offsets. Der `.env`-Workflow ist nun mit einem Template dokumentiert, Secrets bleiben außerhalb von Git, und Compose liefert kein hartkodiertes Datenbankpasswort mehr aus. DB-Diagnosen sind sicherer – Verbindungs-URIs funktionieren korrekt und Passwörter werden aus Logs entfernt. Eine Datei `AGENTS.md` definiert den Vertrag für Mitwirkende und Betreiber des Repositorys.

Bestehende Systemd-Hosts sollten ihre aktuelle Unit während des Code- und Schema-Upgrades beibehalten. Wenden Sie `create_tables.sql` mit `ON_ERROR_STOP` an, bevor Sie den neuen Indexer starten, und kopieren Sie die `ethsync.service` des Repositorys erst, wenn eine produktive `.env` mit äquivalenten Werten existiert.

## Zielgruppe

ADAMANT verwendet diesen Indexer, damit [adamant-im](https://github.com/Adamant-im/adamant-im) und [adamant-iOS](https://github.com/Adamant-im/adamant-iOS) Ethereum- und ERC-20-Verläufe ohne zentralisierten Explorer anzeigen können. Dasselbe Binärprogramm ist ein universeller Open-Source-Dienst für Wallets, Zahlungsabwickler, Token-Emittenten und jeden, der adressindizierte Ethereum-Verläufe unter eigener PostgreSQL-Instanz und Zugriffspolitik wünscht. Hosten Sie es selbst, behalten Sie den Vollketten-Modus für eine öffentliche API bei oder aktivieren Sie den Filter, um nur die Adressen zu speichern, die Sie tatsächlich bedienen.

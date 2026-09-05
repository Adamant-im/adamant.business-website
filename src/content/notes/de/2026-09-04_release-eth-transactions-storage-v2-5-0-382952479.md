---
title: "ETH Transactions Storage v2.5.0"
slug: "release-eth-transactions-storage-v2-5-0-382952479"
description: "ETH Transactions Storage v2.5.0 macht das Projekt zu einem dokumentierten, verteilbaren Ethereum-Transaktionsindexer mit REST-API-Backend für Wallets und Analysetools."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.5.0"
publishedAt: "2026-09-04T18:56:20Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "ETH-transactions-storage"
tag: "v2.5.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:382952479"
locale: "de"
placeholder: false
---

ETH Transactions Storage v2.5.0 macht das Projekt zu einem dokumentierten, verteilbaren und selbst gehosteten Ethereum-Transaktionsindexer sowie einem REST-API-Backend für Wallets, Explorer, Buchhaltungs- und Treasury-Tools, Überwachungsdienste und kundenspezifische Anwendungen. Es behält den bestehenden PostgREST-API-Vertrag bei, der produktiv von ADAMANT-Clients genutzt wird.

Diese Version fügt zuverlässige Transaktionen und Checkpoints pro Block, Wiederherstellung beim Start, Datenbank-Rollback- und Wiederholungsmechanismen sowie Fortschrittsanzeigen für leere oder gefilterte Blöcke hinzu. Eine optionale adressbasierte Indizierung ist jetzt verfügbar, inklusive Validierung, Abgleich von Absender, nativem Empfänger und Token-Empfänger, Live-Listen-Aktualisierungen sowie einem Fail-Closed-Verhalten. Der empfohlene Satz an Datenbankindizes wurde auf fünf reduziert; die drei bisherigen Indizes sind separat für benutzerdefinierte Abfragen verfügbar. Das kleinere Set spart geschätzte 90–110 GB bei etwa 490 Millionen Zeilen. Ein additives `sync_state`-Schema, schreibgeschützter `web_anon`-Zugriff, eine Begrenzung der PostgREST-Antworten auf 10.000 Zeilen sowie Anleitungen zur Absicherung öffentlicher API-Bereitstellungen wurden ergänzt. Unterstützung für PostgreSQL-Verbindungs-URIs mit Anmeldedaten-Maskierung, `.env`-Laden, eingeschränkte Python-Abhängigkeiten, aktualisierte Diagnosen und eine überarbeitete systemd-Unit sind enthalten. Ein Python 3.11-Container, ein Compose-Setup mit veröffentlichtem Image, ein separates Local-Build-Override, OCI-Metadaten sowie eine releasegesteuerte Multi-Architektur-GHCR-Veröffentlichung wurden hinzugefügt. Die VitePress-Dokumentationsseite ist unter <https://eth-indexer.docs.adamant.im> verfügbar, inklusive reproduzierbarer Node-Tools, Dokumentations-CI, Pages-Deployment und Leitfäden für Mitwirkende. Das Projekt wurde für alle kompatiblen Konsumenten neu positioniert, wobei Eigentum, Herkunft und Produktionskompatibilität von ADAMANT gewahrt bleiben.

## Upgrade-Anforderungen

Stoppen Sie den bestehenden Indexer und aktualisieren Sie den vollständigen Checkout, bevor Sie das Upgrade durchführen. Wenden Sie das neue Schema als PostgreSQL-Administrator an, bevor Sie v2.5.0 starten:

```bash
sudo -u postgres psql -v ON_ERROR_STOP=1 -d index < create_tables.sql
```

Installieren Sie anschließend die deklarierten Python-Abhängigkeiten für manuelle oder systemd-Bereitstellungen:

```bash
pip3 install -r requirements.txt
```

Behalten Sie alle Werte und Anmeldedaten der Produktionsumgebung bei; die systemd-Vorlage des Repositorys erfordert nun eine gültige `.env`-Datei. Setzen Sie `POSTGRES_PASSWORD`, bevor Sie Docker Compose verwenden. Migrieren Sie bestehende PostgreSQL 12-Daten korrekt, bevor Sie das Compose PostgreSQL 14-Image übernehmen; das alleinige Ändern des Image-Tags stellt kein Upgrade dar. Erstellen und verifizieren Sie den empfohlenen Index-Satz, bevor Sie Legacy-Indizes entfernen; verwenden Sie gleichzeitige Index-Operationen auf einer Live-Datenbank. Wenden Sie `create_tables.sql` an, bevor Sie PostgREST auf `web_anon` umstellen, da sonst anonyme API-Anfragen fehlschlagen. Planen Sie gefilterte Historien explizit: Das Aktivieren des Adressfilters oder das Hinzufügen einer Adresse füllt keine früheren Blöcke nach.

Lesen Sie den vollständigen Upgrade-Leitfaden unter <https://eth-indexer.docs.adamant.im/guide/upgrading>, bevor Sie diese Version bereitstellen.

## Kompatibilität und aktueller Umfang

Die Endpunkte `/ethtxs`, `/max_block` und `/aval`, Datenbankspalten, die Berücksichtigung der Groß-/Kleinschreibung bei Adressen, Werte-Kodierungen und etablierte Client-Abfrageformen bleiben kompatibel. `/max_block.max` spiegelt nun auch verarbeitete Blöcke wider, die keine Transaktionszeilen gespeichert haben.

Der Indexer speichert weiterhin native ETH-Transfers und direkte Top-Level-ERC-20-`transfer(address,uint256)`-Aufrufe. Er indiziert keine internen ETH-Transfers, `transferFrom`, Multisig-, Router- oder Batch-Flows, andere Token-Standards oder automatische Korrekturen bei Deep-Reorganizations.

## Verteilung

Die Veröffentlichung dieses stabilen Releases löst Images für `linux/amd64` und `linux/arm64` aus:

```text
ghcr.io/adamant-im/eth-transactions-storage:2.5.0
ghcr.io/adamant-im/eth-transactions-storage:latest
```

Versions-Image-Tags sind unveränderlich. Pinnen Sie in der Produktion `2.5.0` anstelle von `latest`.

## Verifizierung

Alle 12 Python-Unit-Tests wurden bestanden. Python-Syntax, Formatierung, Markdown-Linting und der VitePress-Build waren erfolgreich. Smoke-Tests für Container-Build, Operator-Status-Ausschluss, OCI-Metadaten, beide Compose-Konfigurationen, API-Fortschritt und Checkpoint-Neustart wurden beim Release-Merge-Commit bestanden. Das Dokumentations-Deployment war erfolgreich und die Seite wird über erzwungenes HTTPS bereitgestellt. Der Produktionsdienst wurde bereitgestellt und vom Betreiber als fehlerfrei bestätigt.

Enthaltene Arbeiten: #27, #28, #29, #31 und #33. Tracking-Issue: #32. Vollständiges Changelog: <https://github.com/Adamant-im/ETH-transactions-storage/compare/v2.4.1...v2.5.0>.

### Breaking changes

Das neue `sync_state`-Schema muss vor dem Start von v2.5.0 über `create_tables.sql` angewendet werden; dies muss geschehen, bevor PostgREST auf `web_anon` umgestellt wird, da sonst anonyme API-Anfragen fehlschlagen. Die systemd-Vorlage erfordert nun eine gültige `.env`-Datei; bestehende Bereitstellungen ohne diese Datei starten erst, nachdem sie erstellt wurde. Das Aktivieren des Adressfilters oder das Hinzufügen einer Adresse füllt keine früheren Blöcke nach, was bedeutet, dass zuvor nicht indizierte Historien ohne explizite Aktion des Betreibers nicht rückwirkend erfasst werden.

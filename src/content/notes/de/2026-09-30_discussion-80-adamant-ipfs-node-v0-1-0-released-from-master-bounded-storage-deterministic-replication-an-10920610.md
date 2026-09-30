---
title: "ADAMANT IPFS Node v0.1.0: Begrenzter Speicher und deterministische Replikation"
slug: "discussion-80-adamant-ipfs-node-v0-1-0-released-from-master-bounded-storage-deterministic-replication-an-10920610"
description: "Das erste Release des ADAMANT IPFS Node ist als v0.1.0 verfügbar. Das Container-Image finden Sie unter ghcr.io/adamant-im/ipfs-node:0.1.0."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/80"
publishedAt: "2026-09-30T11:31:18Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10920610"
locale: "de"
placeholder: false
---

Das erste getaggte Release des ADAMANT IPFS Node ist nun als v0.1.0 verfügbar; das Container-Image finden Sie unter `ghcr.io/adamant-im/ipfs-node:0.1.0`. Diese eigenständige Node.js- und Helia-Anwendung fungiert als IPFS-Speicherknoten für die Bereitstellung von Anwendungsdateien. Es handelt sich nicht um einen Kubo-Wrapper, und es wird keine Kubo-kompatible API bereitgestellt. Während ADAMANT Messenger die Referenzimplementierung darstellt, kann jede Anwendung den Knoten selbst hosten.

Die Service-Runtime stellt eine Express-API über zwölf dokumentierte Pfade bereit, darunter Funktionen für Health-Checks, administrative Details, Multipart-Uploads, Downloads per CID sowie Speichermetriken. Zugriffsklassen werden zentral durchgesetzt, der Admin-Key ist standardmäßig gesperrt (fail-closed), und CORS-Zugriffe werden über eine explizite Positivliste gesteuert. Der Speicherlebenszyklus umfasst ein datengestütztes Dateiregister mit einer persistenten State Machine, Festplattenreservierung, Aufnahmebudget, temporäre Uploads mit TTL sowie eine wasserzeichengesteuerte Garbage Collection. Die Platzierung erfolgt mittels deterministischem Rendezvous-Hashing über die konfigurierte Peer-Gruppe, wobei die Kopienanzahl mit zunehmendem Dateialter abnimmt. Die Replikation erfolgt über versionierte Protokolle mit Prepare-, Commit- und Rollback-Staging. Jede Upload-Sitzung protokolliert die erstellten Blöcke, um sicherzustellen, dass bei abgelehnten oder abgebrochenen Anfragen genau diese Blöcke entfernt werden.

Health-Checkpoints sind netzwerkfähig, nutzen eine persistente monotone Höhe sowie eine explizite Mitgliedschaftsepoche und akzeptieren Attestierungen nur von konfigurierten Peers. Verbesserungen der Mesh-Zuverlässigkeit umfassen regelmäßige libp2p-Ping-Liveness-Prüfungen mit Sitzungs-Reset bei Fehlern sowie eine reaktive Wiederherstellung nach Fehlern in veralteten Replikations-Streams. Aktualisierungen bei CORS und Fehlercodes führen einen optionalen, exakten `app://.`-Desktop-Ursprung, maschinenlesbare `code`-Werte sowie `http(s)://*.onion`-Wildcards ein, die für die Tor-Browser-Kompatibilität auf v3-Hidden-Service-Formate beschränkt sind.

Der Container basiert auf `node:24.13.0-bookworm-slim` und verwendet ein mehrstufiges Dockerfile. Er wird als privilegierter `node`-Benutzer mit `HOME=/data` ausgeführt, wodurch ein einzelnes Volume ausreicht, um Blockstore, Datastore, Peer-Identität, Pins, Register, Reparatur-Cursor und Health-Checkpoints zu speichern. Das Image wird ohne Konfiguration ausgeliefert; Betreiber müssen eine Konfigurationsdatei unter `/app/config.json5` einbinden. Es wird für `linux/amd64` und `linux/arm64` mit SBOM- und Provenance-Attestierung veröffentlicht.

Der Knoten verzichtet explizit auf DHT, IPNS, öffentliche Gateways und Kubo-APIs. Gespeicherte Inhalte werden nicht im öffentlichen IPFS-Netzwerk angekündigt, und Inhalte aus dem öffentlichen Netzwerk können nicht über diesen Knoten abgerufen werden. Eine kontrollierte Peer-Topologie reduziert die öffentliche Sichtbarkeit von Content-Routing-Metadaten, macht eine Bereitstellung jedoch nicht inhärent privat, anonym, vertrauenslos oder zensursicher. Upload und Download sind konzeptbedingt nicht authentifiziert; der einzige Anmeldeinformations-Typ ist ein administrativer Schlüssel. Offene Aufgaben umfassen vom Uploader signierte Löschvorgänge, Peer-Discovery, Traffic-Accounting, absolute Datenverzeichnisse sowie Interoperabilität mit dem öffentlichen Netzwerk.

Um den Knoten auszuführen, erstellen Sie ein Daten-Volume und starten Sie den Container mit der entsprechenden Konfiguration und den Port-Mappings:

```bash
docker volume create ipfs-node-data

docker run -d \
  --name ipfs-node \
  --restart unless-stopped \
  --stop-timeout 20 \
  -v ipfs-node-data:/data \
  -v "$PWD/config.json5:/app/config.json5:ro" \
  -p 127.0.0.1:4000:4000 \
  -p 4001:4001 \
  ghcr.io/adamant-im/ipfs-node:0.1.0
```

Das Release wurde durch CI, Sicherheitsaudits und Container-Smoke-Tests auf beiden Architekturen verifiziert. Der Veröffentlichungs-Workflow bestätigt, dass das Tag ein Vorfahre von `master` ist, mit der `package.json`-Version übereinstimmt und vor einem zweiten Smoke-Test mit OCI-Labels, SBOM und Provenance neu erstellt wird.

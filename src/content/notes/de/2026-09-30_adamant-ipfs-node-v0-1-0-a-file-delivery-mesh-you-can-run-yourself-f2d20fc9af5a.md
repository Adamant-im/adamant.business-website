---
title: "ADAMANT IPFS Node v0.1.0: Ein selbstgehostetes Mesh für die Dateizustellung"
slug: "adamant-ipfs-node-v0-1-0-a-file-delivery-mesh-you-can-run-yourself-f2d20fc9af5a"
description: "ADAMANT IPFS Node v0.1.0 ist das erste Release mit Tag und das veröffentlichte Container-Image für den selbstgehosteten Dateizustellungsdienst von ADAMANT."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-ipfs-node-v0-1-0-a-file-delivery-mesh-you-can-run-yourself-f2d20fc9af5a"
publishedAt: "2026-09-30T18:36:13.519Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:f2d20fc9af5a"
coverImage: "/images/engineering-notes/medium/f2d20fc9af5a/001-275d9701d0.webp"
locale: "de"
placeholder: false
---

ADAMANT IPFS Node v0.1.0 ist das erste Release mit Tag und das veröffentlichte Container-Image für den selbstgehosteten Dateizustellungsdienst von ADAMANT. Es bündelt Content-Adressierung, eine REST-API, kontrollierte Peer-to-Peer-Zustellung, Speicherrichtlinien, Replikation, Reparaturmechanismen und Integritätsprüfungen in einer einzigen Node.js-Anwendung. ADAMANT Messenger nutzt diese Infrastruktur bereits für Anhänge; das Release erleichtert es anderen Entwicklern, sie zu evaluieren, bereitzustellen und anzupassen.

## Anwendungsbezogene Dateien

Die Integration beginnt mit zwei Schritten: Hochladen einer Datei über `POST /api/file/upload` und anschließendem Abruf über `GET /api/file/:cid`. Der zurückgegebene Content Identifier (CID) leitet sich vom Inhalt ab und nicht von der Serveradresse. Dadurch kann eine Anwendung diesen Bezeichner an einen Empfänger weitergeben, ohne festlegen zu müssen, welche Maschine die Datei bereitstellen soll. Ein Knoten kann seine lokale Kopie streamen oder Inhalte von konfigurierten Peers abrufen, die diese vorhalten sollten.

Dies eignet sich für Messenger-Anhänge, unveränderliche Anwendungsmedien und Dienste, deren Clients bereits Content Identifier austauschen. Im ADAMANT Messenger lädt der Client einen verschlüsselten Anhang hoch, überträgt dessen CID innerhalb einer Nachricht, und der Empfänger ruft die Datei über seinen eigenen Knoten ab. Die Verschlüsselung ist Teil des Client-Protokolls; der Speicherdienst verarbeitet lediglich die empfangenen Bytes.

## Ein Mesh mit expliziten Betriebsregeln

Der Knoten basiert direkt auf Helia und libp2p. Er betreibt einen eingebetteten IPFS-Stack parallel zur HTTP-API und nutzt TCP-Transport, Noise-Verschlüsselung für Peer-Verbindungen sowie Yamux-Stream-Multiplexing.

Die Betreiber konfigurieren die Peer-Gruppe. Rendezvous-Hashing ordnet die Halter für jede CID ein, sodass Knoten mit derselben Mitgliedschaft dieselbe Platzierung ableiten. Altersbasierte Stufen ermöglichen es einer Bereitstellung, die Zielanzahl der Kopien zu reduzieren, wenn eine Datei altert. Ein fortsetzbarer Reparaturzyklus prüft auf fehlende Kopien und versucht, die beabsichtigte Platzierung wiederherzustellen, solange Inhalte wiederherstellbar bleiben. Dies kombiniert Platzierung und Reparatur mit dem Dienst, der Dateien empfängt und zustellt, wodurch bei einer bekannten, gemeinsam konfigurierten Gruppe von Knoten kein separater Pin-Orchestrierungsdienst erforderlich ist.

![ADAMANT IPFS Node v0.1.0: Ein Mesh für die Dateizustellung, das Sie selbst betreiben können](/images/engineering-notes/medium/f2d20fc9af5a/002-1f2c5c003f.webp)

Der Lebenszyklus von v0.1.0 auf einen Blick: Aufnahme, deterministische Platzierung, Reparatur und Abruf, ergänzt durch Speicherlimits und Integritätsberichte.

## Begrenzter Speicherplatz erfordert echte Richtlinien

Speicherkontrollen sind Teil des Aufnahmepfads. Festplattenreserven, aggregierte Anfragelimits, Dateibeschränkungen und die Zulassung gleichzeitiger Übertragungen helfen dem Knoten, Anfragen abzulehnen, die er nicht sicher verarbeiten kann. Optionale temporäre Uploads können nach einer TTL ablaufen; die Garbage Collection nutzt Wasserzeichen und das Lebenszyklus-Register, um berechtigte Daten freizugeben.

Bestätigte Inhalte bleiben geschützt. Wenn bestätigte Dateien die verfügbare Kapazität belegen, sind Zulassungslimits entscheidend: Begrenzter Speicher bedeutet nicht, dass Dateien, die laut Richtlinie dauerhaft bleiben müssen, stillschweigend gelöscht werden. Betreiber wählen die Aufbewahrungs- und Replikationsrichtlinie, stellen Kapazitäten bereit und überwachen die Ergebnisse. Das Speicherverhalten kann überprüft und konfiguriert werden, einschließlich des Verhaltens bei Speicherplatzmangel.

## Zuverlässigkeit über eine offene Verbindung hinaus

Das Release enthält Korrekturen für einen subtilen Mesh-Fehler: Eine TCP-Verbindung kann bestehen bleiben, während Anwendungs-Streams nicht mehr funktionieren. Frühere Peering-Logiken konnten einen verbundenen Peer erkennen und eine blockierte Sitzung unangetastet lassen. PR #40 fügt Liveness-Checks und eine reaktive Sitzungswiederherstellung hinzu. PR #42 stärkt diesen Pfad weiter: Gleichzeitige Wiederherstellungsvorgänge werden zusammengeführt, fehlgeschlagene Streams können einen Reset auslösen, ohne durch einen erfolgreichen Ping blockiert zu werden, und die Platzierung kann bei einer frischen Verbindung einmalig erneut versucht werden.

Die Integritätsberichterstattung folgt demselben Prinzip. `GET /api/node/health` macht Zustände wie „starting“, „ready“, „stale“ oder „degraded“ sichtbar, zusammen mit einer gespeicherten Checkpoint-Höhe und Mitgliedschaftsinformationen. Die Höhe steigt, wenn erforderliche Prüfungen erfolgreich sind, und friert ein, wenn sie fehlschlagen; Höhen sind nur innerhalb derselben Mitgliedschaftsversion vergleichbar. Betreiber sollten diesen Status lesen und sich nicht nur auf HTTP 200 verlassen. Eine optionale Kulanzzeit für den Reparatur-Backlog kann eine konfigurierte Anzahl erfolgloser Reparaturzyklen tolerieren, während Backlog und Zyklusergebnisse für das Monitoring sichtbar bleiben. Die Standardeinstellung gewährt keine Kulanz.

## Integration von Desktop- und Tor-Clients

Version 0.1.0 enthält CORS-Anpassungen, die es Betreibern ermöglichen, explizit den Desktop-Ursprung `app://.` sowie entsprechende Onion-Ursprünge zuzulassen, einschließlich des undurchsichtigen Null-Ursprungs, den einige Anfragen des Tor Browsers senden. Upload- und Zulassungsfehler enthalten nun stabile, maschinenlesbare Fehlercodes, die es Clients ermöglichen, zwischen Ratenbegrenzung, Parallelitätslimits, unzureichendem Speicher, Fehlern beim Replikations-Quorum und Timeouts zu unterscheiden, ohne Textbausteine parsen zu müssen. CORS bleibt eine Kontrolle für die Browser-Kompatibilität; Bereitstellungen erfordern weiterhin die für ihre Anwendung angemessene Autorisierungs- und Offenlegungsrichtlinie.

## Bereitstellung

Der öffentliche Container ist für linux/amd64 und linux/arm64 verfügbar:

```
docker pull ghcr.io/adamant-im/ipfs-node:0.1.0
```

Das Image läuft als Benutzer ohne Privilegien und enthält eine SBOM sowie eine Build-Provenienz-Attestierung. Die Konfiguration wird separat unter `/app/config.json5` eingebunden. Ein einzelnes `/data`-Volume enthält den Blockstore, Datastore, die Peer-Identität, das Pin-Set, das Lebenszyklus-Register, den Reparatur-Cursor und den Integritäts-Checkpoint, wodurch der persistente Status über Container-Austausche hinweg erhalten bleibt. Die Release-Pipeline führt einen erneuten Pull und Smoke-Tests für beide Architekturen durch, wobei Start, Bereitschaft, Upload und Download, sauberes Herunterfahren sowie die Erhaltung von Inhalten und Peer-Identität geprüft werden.

Für eine Evaluierung beginnen Sie mit `docker/config.example.json5`, das keinem Netzwerk beitritt. Die Produktionsvorlage enthält die Peer-Liste von ADAMANT; Ihre eigene Bereitstellung sollte ihre eigenen Peers und Browser-Ursprünge definieren. Betreiben Sie den HTTP-Dienst hinter einem korrekt konfigurierten HTTPS-Reverse-Proxy.

## Architektonische Grenzen

Die konfigurierte Topologie vermeidet öffentliche DHT-Ankündigungen und öffentliches Gateway-Routing, was die öffentliche Sichtbarkeit von Content-Routing-Metadaten reduziert. Sie macht eine Bereitstellung für sich genommen nicht anonym oder vertraulich. Der Dienst verschlüsselt gespeicherte Dateien nicht; Uploads und Downloads sind standardmäßig nicht authentifiziert. Anwendungen, die Vertraulichkeit oder authentifizierten Zugriff erfordern, müssen diese Kontrollen oberhalb der Speicherschicht implementieren.

In diesem Release gibt es keine öffentliche IPFS-Interoperabilität, kein IPNS, kein öffentliches Gateway und keine Kubo-kompatible API. Hier gespeicherte Inhalte werden nicht im öffentlichen Netzwerk angekündigt, und Inhalte, die nur von öffentlichen Peers gehalten werden, können über diesen Knoten nicht abgerufen werden. Vom Uploader signierte Löschungen, dynamische Peer-Erkennung und Traffic-Accounting sind noch in Arbeit.

Für eine bekannte Peer-Gruppe und inhaltsadressierte Anwendungszustellung bilden diese Entscheidungen ein fokussiertes Betriebsmodell. Für die Teilnahme am öffentlichen IPFS, eine dynamische Flotte oder S3-artige Identitäts- und Zugriffskontrollen konsultieren Sie bitte den Vergleichsleitfaden, bevor Sie eine Speicherarchitektur wählen.

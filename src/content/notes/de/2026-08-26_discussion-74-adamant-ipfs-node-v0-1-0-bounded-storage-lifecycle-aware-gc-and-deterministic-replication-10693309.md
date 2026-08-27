---
title: "ADAMANT IPFS Node v0.1.0: Begrenzter Speicher, lebenszyklusbewusste Garbage Collection und deterministische Replikation"
slug: "discussion-74-adamant-ipfs-node-v0-1-0-bounded-storage-lifecycle-aware-gc-and-deterministic-replication-10693309"
description: "ADAMANT IPFS Node v0.1.0 führt einen produktionsorientierten Speicherlebenszyklus ein, der das Festplattenwachstum begrenzt, fehlerhafte Uploads bereinigt und Inhalte unterscheidet."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/74"
publishedAt: "2026-08-26T19:14:25Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10693309"
locale: "de"
placeholder: false
---

ADAMANT IPFS Node v0.1.0 führt einen produktionsorientierten Speicherlebenszyklus ein, der das Festplattenwachstum begrenzt, fehlerhafte Uploads bereinigt, dauerhafte Inhalte von wiederverwendbarem Cache unterscheidet, Replikate deterministisch über das ADAMANT-Node-Set verteilt, fehlende Kopien repariert und jeden bereits existierenden CID während eines Upgrades beibehält.

## Warum dies notwendig war

Die vorherige Implementierung konnte Blöcke in den Blockstore streamen, bevor alle Anfrage-Limits bekannt waren. Ein unterbrochener oder abgelehnter Upload konnte Blöcke hinterlassen, erfolgreiche Uploads blieben ohne Ablaufrichtlinie fixiert (pinned), und es gab keinen expliziten Replikations-Quorum- oder Reparaturprozess. Dies machte es unmöglich, zuverlässig zu beantworten, wie viel Festplattenspeicher ein Upload verbrauchen kann, welche Dateien dauerhaft oder wiederverwendbar sind, was passiert, wenn eine Anfrage während des Imports getrennt wird, welche Nodes für einen CID verantwortlich sind, ob eine Node Speicher freigeben kann, ohne bestätigte Inhalte zu löschen, und ob bestehende Dateien nach einem Cluster-Upgrade verfügbar bleiben.

## Zulassung erfolgt vor der Speicherung

Uploads werden abgelehnt, bevor sie unbegrenzten Festplattenspeicher verbrauchen können. Gleichzeitige Uploads sind durch `storage.maxConcurrentUploads` begrenzt (Antwort `429`). Die aggregierte Anfragegröße ist durch `storage.maxRequestSizeBytes` (`413`) gedeckelt, was sowohl gegen `Content-Length` als auch gegen tatsächlich gestreamte Bytes durchgesetzt wird, da Chunked-Anfragen ihre endgültige Größe nicht deklarieren. Eine durch `storage.diskReserveBytes` erzwungene Festplattenreserve gibt `507` zurück, wenn der freie Speicherplatz nicht ausreicht. Dateien pro Anfrage sind durch `maxFileCount` (`400`) und die individuelle Dateigröße durch `uploadLimitSizeBytes` (`400`) begrenzt. Gleichzeitige Anfragen reservieren Festplattenspeicher atomar, sodass mehrere Uploads nicht denselben freien Speicherplatz beanspruchen können.

Jede Anfrage besitzt eine Upload-Sitzung, die die erstellten Blöcke nachverfolgt. Eine Ablehnung durch den Parser, ein Importfehler, ein Routenfehler, ein Fehler beim strikten Quorum oder eine Trennung des Clients entfernt nur diese neuen Blöcke. Bereits existierende Blöcke, Blöcke, die von einem anderen gleichzeitigen Upload beibehalten werden, und fixierte Blöcke bleiben erhalten.

## Expliziter Dateilebenszyklus

Eine datastore-basierte Registrierung unter `/adm/files` protokolliert den Lebenszyklus und die Speicherabrechnung jedes bekannten CID. Der Status `temporary` repräsentiert einen Upload, der auf Bestätigung oder transaktionale Abwicklung wartet. `confirmed` repräsentiert dauerhafte Inhalte, die durch Richtlinien geschützt sind. `expired` repräsentiert Inhalte, die freigegeben wurden und unter Druck wiederverwendet werden können. `pinned` und `heldLocally` werden getrennt vom logischen Status nachverfolgt.

Lebenszyklusübergänge, Pin-Operationen, Registrierungsschreibvorgänge, Upload-Bereinigungen, Replikatsabwicklungen, Reparaturen und Garbage Collection werden mit Sperren pro CID und einem speicherweiten Sammel-Lease koordiniert. Fehlerkompensation stellt sowohl den Pin als auch den Registrierungseintrag auf ihren beobachteten Basiswert zurück, anstatt sie in widersprüchlichen Zuständen zu belassen.

Der Standardwert `storage.confirmationRequired: false` behält den bestehenden API-Vertrag bei, bei dem Uploads sofort dauerhaft werden. Bereitstellungen, die eine Bestätigung aktivieren, erhalten eine konfigurierbare TTL für abgebrochene Uploads und müssen den authentifizierten Bestätigungs-Endpunkt aufrufen.

## Druckgesteuerte, lebenszyklusbewusste Garbage Collection

Das Freigeben eines Pins und das Löschen von Blöcken sind bewusst getrennte Entscheidungen. Eine freigegebene Datei verbleibt im Blockstore und kann weiterhin Lesezugriffe kostenlos bedienen. Blöcke werden nur gelöscht, wenn der Blockstore die konfigurierte Obergrenze (High Watermark) überschreitet oder das Dateisystem in die Festplattenreserve fällt. Dies vermeidet das Verwerfen nützlicher Cache-Daten, die später erneut abgerufen werden müssten.

Der Collector verfügt über mehrere Sicherheitseigenschaften. Bestätigte Inhalte, die von dieser Node gehalten werden, werden niemals für die Räumung ausgewählt. Ein fehlender Schutz bei einer bestätigten Datei wird repariert, bevor eine Löschung beginnt. Ein Durchlauf, der dauerhafte Inhalte nicht verifizieren kann, bricht vor der ersten destruktiven Aktion ab. Teilweise GC-Fehler behalten Registrierungseinträge bei, sodass der nächste Durchlauf sicher wiederholen kann. Der Dry-Run-Modus meldet den genauen Freigabe- und Aufbewahrungsplan, ohne Pins oder Blöcke zu ändern. Geplante Durchläufe sind begrenzt und schreiten voran, anstatt wiederholt die gesamte Registrierung zu scannen.

Die dokumentierten Standardwerte sind eine 50 GiB Obergrenze, eine 40 GiB Untergrenze (Low Watermark), eine 5 GiB freie Speicherreserve und ein geplanter Durchlauf alle 15 Minuten. Alle Werte sind konfigurierbar. Die geplante GC ist standardmäßig aktiviert, führt jedoch keine Löschungen durch, solange der Speicherplatz über den Sicherheitsschwellenwerten liegt. Operatoren können den Plan mit folgendem Befehl prüfen:

bash
curl --fail-with-body \
  -X POST \
  -H "x-api-key: $ADMIN_API_KEY" \
  "https://ipfs.example.org/api/storage/gc?dryRun=true"

## Replikation über das bestehende libp2p-Netzwerk

Die Replikation erfolgt über `/adamant/replication/1.0.0`, nicht über einen zusätzlichen HTTP-Dienst. Der libp2p-Handshake beweist die Identität des Remote-Peers, daher benötigt die Replikation kein gemeinsames API-Geheimnis, keinen zweiten öffentlichen Port oder einen separaten Cluster-Daemon. Operationen, die diese Node für Inhalte verantwortlich machen, werden nur von Peers akzeptiert, die in `nodes` gelistet sind. Kontrollnachrichten sind längengeframed und begrenzt. Replikat-Transaktionen zeichnen ihren Ursprungs-Peer auf, und nur dieser Peer kann sie abwickeln.

Die Halter werden mittels Rendezvous-Hashing über den CID ausgewählt. Jede Node mit derselben Mitgliederliste berechnet unabhängig dieselbe Haltermenge ohne zentralen Koordinator. Die Standard-Platzierungsrichtlinie behält vier Kopien für neue Inhalte, drei Kopien nach 180 Tagen und zwei Kopien nach einem Jahr bei. Die Anzahl ist durch die tatsächliche Netzwerkgröße begrenzt, sodass ein Drei-Node-Netzwerk, das nach vier Kopien gefragt wird, eine Kopie auf jeder verfügbaren Node platziert. Die Platzierung schrumpft nach Dateialter statt nach letztem Zugriffszeitpunkt, da die Nachverfolgung von Lesezugriffen Metadaten darüber erstellen würde, wann Benutzer Dateien abrufen.

Strikte Upload-Dauerhaftigkeit ist optional. Wenn `replication.requireQuorumOnUpload` aktiviert ist, bilden die lokale Zulassung und Remote-Replikate eine rollback-fähige Transaktion: Peers stufen Kopien ein, der Ursprung verifiziert das konfigurierte Bestätigungs-Quorum und committet oder verwirft dann jedes vorbereitete Replikat. Eine strikte Konfiguration erfordert `ackQuorum >= 2`, was sicherstellt, dass der Erfolg mindestens eine Remote-Kopie beweist.

## Reparatur, Übergabe und Abruf

Der Reparatur-Job fragt einen Peer, ob er bereits einen CID besitzt und ob er Platz hat, bevor Daten übertragen werden. Die Aufnahme ist durch Nebenläufigkeit, Anfragegröße, Festplattenreservierung, Timeout und Budget pro Peer begrenzt. Eine Node außerhalb der aktuellen Haltermenge übergibt ihre dauerhafte Kopie an die designierten Halter und gibt ihren eigenen Pin erst frei, nachdem diese Halter bestätigt haben, dass sie die Datei besitzen. Wenn jeder Remote-Halter später verschwindet, während die Blöcke noch lokal sind, übernimmt die Node erneut die Verantwortung, anstatt zuzulassen, dass die letzte wiederherstellbare Kopie verschwindet.

Lesezugriffe nutzen ebenfalls Platzierungsinformationen. Bevor ein CID bedient wird, verbindet sich eine Node direkt mit den Peers, von denen erwartet wird, dass sie ihn halten, anstatt sich darauf zu verlassen, dass bereits ein nützlicher Bitswap-Peer verbunden ist. Periodisches Peering hält das konfigurierte Mesh nach dem Start verfügbar. Dies ist wichtig für ADAMANT Messenger: Sender und Empfänger nutzen normalerweise unterschiedliche Infrastruktur-Nodes, daher landet der erste Lesezugriff des Empfängers üblicherweise auf einer Node, die kein designierter Halter ist.

## Beibehaltung bestehender Dateien und CIDs

Das Upgrade importiert, schreibt oder benennt gespeicherte Inhalte nicht um. Die CID-Generierung bleibt mit dem vorherigen Stack kompatibel, sodass bestehende Nachrichten-Links weiterhin auf dieselben Dateien verweisen. Beim Start werden Pins, die vor der Lebenszyklus-Registrierung liegen, als bestätigte Datensätze nachgefüllt. Ihre DAG-Größen werden offline gemessen, und unvollständige Inhalte werden gemeldet, anstatt stillschweigend als dauerhaft registriert zu werden. Die API kann starten, während das Nachfüllen im Hintergrund fortgesetzt wird.

Eine Kapazitätsimplikation ist wichtig: Die ursprüngliche Upload-Zeit eines Legacy-Pins kann nicht wiederhergestellt werden, daher werden nachgefüllte Dateien zunächst als neu behandelt und treten in die breiteste Platzierungsebene ein. Operatoren sollten die Cluster-Kapazität für den bestehenden Bestand planen, nicht nur für zukünftige Uploads. Reparaturprozesse verarbeiten diesen Bestand in begrenzten, fortschreitenden Batches, anstatt zu versuchen, alles in einem Durchgang zu replizieren.

Derzeit wird nur `/adamant/replication/1.0.0` angeboten, daher ist dieses Release für ein koordiniertes clusterweites Upgrade vorgesehen. `GET /api/storage/metrics` legt die aktive Protokollversion offen, wodurch eine gemischte Bereitstellung sichtbar wird.

## Operative Sichtbarkeit und Zugriffsgrenzen

Öffentliche Read-Only-Routen legen Kapazität und Lebenszyklusstatus ohne Dateinamen, CID-Inventare oder Peer-Topologie offen: `GET /api/file/:cid/status`, `GET /api/storage/metrics` und `GET /api/storage/policy`. Administrative Mutationen wie Bestätigung, Freigabe, On-Demand-GC, Reparatur, Pin-Management und libp2p-Topologie-Operationen erfordern den konfigurierten `x-api-key`.

Der Speicherbericht enthält fixierte und wiederverwendbare Bytes, Dateisystemverfügbarkeit, reservierte und nutzbare Kapazität, Lebenszykluszahlen, gestagte Replikat-Transaktionen, Jobstatus und Replikationsgesundheit. Er bietet genügend Informationen, um ein Upgrade zu validieren und nachfolgende Sammel- und Reparaturdurchläufe zu überwachen, ohne private operative Details preiszugeben.

## Standardwerte, die Operatoren überprüfen sollten

Die Standardwerte passen zu einem dedizierten Speichervolumen und bewahren das aktuelle Verhalten des sofortigen Uploads. Die aggregierte Upload-Größe ist standardmäßig auf 512 MiB gesetzt, gleichzeitige Uploads auf 32, Festplattenreserve auf 5 GiB, temporäre TTL auf 24 Stunden, GC-Zeitplan auf alle 15 Minuten, Reparaturzeitplan auf alle 30 Minuten und frische Platzierung auf 4 Kopien. Das Upload-Bestätigungs-Quorum ist standardmäßig auf 1 gesetzt (Best-Effort-Replikation), und das strikte Upload-Quorum ist deaktiviert. Jeder Operator sollte vor der Bereitstellung Kapazität, Obergrenzen, Mitgliederlisten und Platzierungsebenen überprüfen.

## Verifizierung

Die zusammengeführte Implementierung bestand 232 Unit-Tests, 102 Integrationstests, den produktiven TypeScript-Build, ESLint- und Prettier-Prüfungen, ein Produktions-Abhängigkeits-Audit sowie Semgrep SAST- und Semgrep OSS-Scans. Sie wurde zudem in einem Vier-Node-Netzwerk getestet: 16 Dateien wurden im frischen Zustand auf drei Haltern platziert, konvergierten nach dem Altern in die nächste Ebene auf genau zwei Halter und wurden dann von allen vier Nodes über 64 erfolgreiche Cross-Node-Lesezugriffe byte-identisch zurückgelesen. Es wurde keine neue Laufzeitabhängigkeit eingeführt.

## Geplante Nachfolgearbeiten

Dieses Release etabliert begrenzten Speicher und Node-zu-Node-Dauerhaftigkeit, erhebt jedoch nicht den Anspruch, jedes Eigentums- oder Netzwerkmitgliedschaftsproblem zu lösen. Issue #27 verfolgt Löschungen, die durch die Signatur des ursprünglichen Uploaders autorisiert sind. Issue #28 verfolgt dezentrale Node-Entdeckung und Sybil-Resistenz. Issue #29 verfolgt Verkehrsabrechnung, Backoff und monatliche Limits. Die Inhaltsverschlüsselung bleibt in der Verantwortung des ADAMANT-Client-Protokolls; die Storage-Node verwaltet verschlüsselte Inhalte nach CID und benötigt keinen Klartextzugriff.

---
title: "ADAMANT Node v0.10.0: Eine stärkere Grundlage für dezentrale Kommunikation"
slug: "adamant-node-v0-10-0-a-stronger-foundation-for-decentralized-communication-bf99c758ff3a"
description: "ADAMANT Node v0.10.0 verbessert Geschwindigkeit, Debugging und API-Funktionalität für ein stabileres, sichereres Netzwerk."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v0-10-0-a-stronger-foundation-for-decentralized-communication-bf99c758ff3a"
publishedAt: "2026-06-16T11:50:08.717Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/bf99c758ff3a/001-1-a8dezfm7vyio0a-74gwt6q-png.webp"
cardSpan: "full"
originalId: "medium:bf99c758ff3a"
locale: "de"
placeholder: false
---

Das ADAMANT-Netzwerk basiert auf von der Community betriebenen Knoten – unabhängige Server, die verschlüsselte Nachrichten weiterleiten, APIs für Messenger bereitstellen und die Blockchain ehrlich halten. ADAMANT Node v0.10.0 ist ein umfangreiches Upgrade, das diese Infrastruktur schneller im Betrieb, einfacher im Debugging und besser abgestimmt auf die Funktionsweise moderner ADAMANT-Clients macht. ADAMANT verfolgt keine oberflächlichen Durchsatzwerte; stattdessen wird eine dezentrale Vertrauensebene für die Kommunikation aufgebaut, auf die sich Messenger, Wallets und Kommunikations-Forks verlassen können, ohne die Privatsphäre an einen zentralen Betreiber abzugeben.

### Bessere APIs für echte Messenger

Clients benötigen eine präzise Transaktionsreihenfolge, Zeitstempel in Millisekunden und die Möglichkeit, nicht bestätigte Nachrichten anzuzeigen, während ein Chat noch im Netzwerk propagiert. v0.10.0 liefert `timestampMs` für die Transaktionsordnung unterhalb einer Sekunde, ohne das bestehende Feld `timestamp` zu brechen. Listen-Endpunkte akzeptieren nun `?returnUnconfirmed=1`, um Transaktionen aus dem Mempool einzubeziehen, wo dies sinnvoll ist. Ein neuer Parameter `includeDirectTransfers` ersetzt die veraltete Logik von `withoutDirectTransfers` für eine sauberere Chat-Filterung. Das Feld `count` wird nun als Zahl und nicht mehr als Zeichenkette zurückgegeben, was die Client-Parsing-Logik über alle Listen-Endpunkte vereinfacht.

### Schnelleres, widerstandsfähigeres Netzwerk

Knoten können nun WebSocket-Verbindungen zwischen Peers aufrechterhalten, nicht nur HTTP. Dies reduziert die Latenz bei der Weitergabe von Blöcken und Transaktionen und gibt Betreibern mehr Flexibilität, wie ihre Knoten am Mesh-Netzwerk teilnehmen. In Kombination mit verbesserter Synchronisierungslogik und einem neu geschriebenen Transaktionspool verarbeitet der Knoten auch unter Last vorhersehbarer.

### Betreuer-Tools, die Ihre Zeit respektieren

Der Betrieb eines Knotens sollte keine tiefe Vertrautheit mit veralteten JavaScript-Praktiken erfordern. v0.10.0 enthält modernisierte Installations- und Reparaturskripte für Ubuntu/Debian und CentOS/RHEL, Hilfsprogramme für lokale Testnetze (localnet) für Entwickler, Konfigurations-Überschreibungen für gestaffelte Rollouts und strukturierte Protokollierung mit Rotation, sodass Betreiber Probleme effektiv diagnostizieren können. Die Veröffentlichung dokumentiert außerdem bewährte Verfahren für einen geordneten Herunterfahren – ein erzwungenes `kill -9` auf einem aktiven Knoten kann Spiegel des Speicherzustands beschädigen, daher macht v0.10.0 das korrekte Herunterfahren in der Betreiberdokumentation explizit.

### Sicherheit ohne Drama

Diese Version migriert die Kryptografie auf `sodium-native`-Bindungen und verschärft die P2P-Transaktionsannahme. Zeitstempelprüfungen, die bereits die öffentliche API schützten, gelten nun auch, wenn Transaktionen über Peer-Gossip eintreffen ([#246](https://github.com/Adamant-im/adamant/pull/246)), wodurch eine reale Angriffsmöglichkeit zur Pool-Vergiftung geschlossen wird, ohne die Konsens-Replay-Pfade zu beeinträchtigen. Aktualisierungen der Abhängigkeiten über mehrere Phasen reduzieren die Anfälligkeit gegenüber bekannten Problemen im Node.js-Ökosystem.

### Müssen Delegierte und Knotenbetreiber upgraden?

Empfohlen, aber nicht zwingend erforderlich. v0.10.0 führt keinen neuen zwingenden Konsens-Fork für Netzwerke ein, die bereits synchronisiert und normal betrieben werden; protokollbasiertes Verhalten bleibt konfigurationsgesteuert. Dennoch empfiehlt cryptofoundry Delegierten und unabhängigen Knotenbetreibern, ein Upgrade durchzuführen, sobald dies praktikabel ist. Neuere Messenger und APIs erwarten v0.10.0-Funktionen wie `timestampMs`, Abfragen für nicht bestätigte Transaktionen und WebSocket-Transport. Verbesserungen bei Installation und Protokollierung erleichtern den täglichen Betrieb erheblich, und die Sicherheitsverbesserungen profitieren das gesamte Mesh-Netzwerk, auch wenn die Konsensregeln unverändert bleiben. Der Verbleib auf sehr alten Knotenversionen bedeutet letztlich, dass Clients allein unterstützt werden, und führt dazu, dass die Zuverlässigkeitsverbesserungen, die die Community in Releases wie diesem bereitstellt, verloren gehen.

### Technische Highlights

Die Laufzeit erfordert nun Node.js ≥ 22.13.0; die Unterstützung für Node 18 wurde eingestellt. Auf der API-Seite sind `timestampMs`, `returnUnconfirmed`, `includeDirectTransfers` und numerisches `count` die wichtigsten Neuerungen. Die P2P-Schicht erhält WebSocket-Peer-Transport und Zeitstempelprüfungen beim Gossip-Empfang. Für den Betrieb gibt es moderne Installations- und Reparaturskripte, Localnet-Hilfsprogramme, Live-Test-Szenarien und Konfigurations-Überschreibungen. Verbesserungen der Entwicklererfahrung umfassen eine AGENTS.md-Datei, erweiterte CONTRIBUTING-Anleitungen und strukturierte Protokollierung. Veraltete HTTP-Endpunkte wurden entfernt, und docs.adamant.im ist nun die zentrale Dokumentationsquelle.

Ausführliche strukturierte Hinweise und die vollständige Liste der Pull-Requests sind im [GitHub Release v0.10.0](https://github.com/Adamant-im/adamant/releases/tag/v0.10.0) verfügbar. Bestehende Betreiber sollten die Upgrade-Hinweise prüfen, Node.js aktualisieren, v0.10.0 ziehen und den Knoten ordnungsgemäß neu starten. Neue Betreiber sollten die offiziellen Installations-Skripte aus dem Release-Tag verwenden. Entwickler sollten [CONTRIBUTING.md](https://github.com/Adamant-im/adamant/blob/master/.github/CONTRIBUTING.md) zur Vorbereitung von Localnet- und Live-Szenarien-Tests konsultieren.

ADAMANT ist eine von der Community besitzene Infrastruktur. Fragen, Probleme und Beiträge sind willkommen unter [github.com/Adamant-im/adamant](https://github.com/Adamant-im/adamant).

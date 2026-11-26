---
title: "ADAMANT Node v0.11.1: Sicherheit, Resilienz und klarere APIs"
slug: "adamant-node-v0-11-1-a-stronger-foundation-for-decentralized-communication-2e12e71b69b9"
description: "ADAMANT Node v0.11.1 ist ein Sicherheits- und Stabilitäts-Release, das den täglichen Betrieb stärkt, ohne die bestehenden Konsensregeln des Protokolls zu verändern."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v0-11-1-a-stronger-foundation-for-decentralized-communication-2e12e71b69b9"
publishedAt: "2026-11-25T17:54:29.629Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:2e12e71b69b9"
coverImage: "/images/engineering-notes/medium/2e12e71b69b9/001-866983f729.webp"
locale: "de"
placeholder: false
---

Dezentrale Kommunikation basiert auf unabhängig betriebenen Nodes, die Daten validieren, austauschen und speichern. ADAMANT Node v0.11.1 ist ein Sicherheits- und Stabilitäts-Release, das den täglichen Betrieb stärkt, ohne die bestehenden Konsensregeln des Protokolls zu verändern. Es ist das erste getaggte Release der v0.11-Reihe; der Code v0.11.0 wurde zwar zusammengeführt, aber nie getaggt. Da v0.11.1 einen zusätzlichen Fix für das Peer-Networking enthält, sollten Betreiber, die bereits diesen Code ausführen, ein Upgrade durchführen.

### Verringerung der Angriffsfläche

Das Release entfernt veraltete HTTP-Forging-Kontrollen und DApp-Laufzeit-Endpunkte. Diese Oberflächen umfassten serverseitige Ausführungs- und Signierungspfade, die nicht mehr in einen modernen Node gehören. Deren Entfernung adressiert das Advisory GHSA-vjhq-r5fg-85cx und macht die Betriebsgrenzen des Nodes leichter verständlich. Delegates konfigurieren das Forging nun über `forging.secret` und wenden Änderungen durch einen sauberen Neustart an. Optionale lokale CLI-Befehle ermöglichen das Entsperren und Sperren verschlüsselter Passphrasen. Schreibgeschützte DApp-APIs und die Konsensbehandlung für bestehende DApp-Transaktionstypen bleiben verfügbar; Clients sollten Transaktionen lokal signieren und über Standard-Transaktionsendpunkte einreichen.

### Verschlüsselte Delegate-Secrets

Betreiber können Forging-Passphrasen nun mit einem Betreiber-Passwort unter Verwendung von AES-256-GCM und scrypt verschlüsseln. Die Klartext-Konfiguration bleibt für bestehende Bereitstellungen kompatibel. Ein Node mit verschlüsselten Secrets kann weiterhin synchronisieren, Peers verwalten, APIs bereitstellen und seinen Mempool verarbeiten, während das Forging gesperrt ist. Nach jedem Neustart entsperrt der Betreiber das Forging über eine lokale Eingabeaufforderung oder einen Unix-Kontrollsocket, auf den nur der Eigentümer Zugriff hat. Monitoring-Unterstützung ermöglicht es Betreibern, den Sperrstatus zu beobachten, ohne die Identität des Delegates preiszugeben. Die Verschlüsselung schützt gespeicherte Passphrasen, entbindet den Betreiber jedoch nicht von der Verantwortung, den Host, das Passwort, Backups und den Zugriff zu sichern.

### Netzwerk-Resilienz

HTTP- und WebSocket-Anti-Missbrauchs-Limits für den Produktionsbetrieb sind standardmäßig aktiviert und decken öffentliche APIs, Peer-Traffic, Verbindungsversuche und Abonnements ab, wobei dokumentierte HTTP 429-Antworten für ratenbegrenzte Anfragen ausgegeben werden. Es gibt einen wichtigen Hinweis zu gemischten Versionen: Veraltete Peers, die den Aushandlungs-Header für Ratenbegrenzungen nicht senden, umgehen während der Übergangsphase die HTTP-Limits des Nodes. Betreiber sollten äußere Limits für `/peer/*` an ihrem Reverse-Proxy oder ihrer Firewall erzwingen. Bestehende Konfigurationen, die explizit veraltete `max: 0`-Einstellungen enthalten, behalten die betroffenen Limits deaktiviert, bis sie aktualisiert werden.

Das Release begrenzt zudem Peer-Gesundheitsprüfungen, behandelt nicht erreichbare Peers bewusster und verbessert die PostgreSQL-Wiederherstellung nach einem Verbindungsabbruch. Installations- und Reparatur-Skripte verifizieren nun Snapshots vor dem Standard-Datenbank-Austauschpfad, verwenden eine lockfile-basierte Abhängigkeitsinstallation und sind vorsichtiger beim Neustart eines Nodes, während dieser synchronisiert oder neu aufgebaut wird.

### Wiederherstellung von Echtzeit-Peer-Verbindungen

Der finale Fix in v0.11.1 stellt die ausgehende WebSocket-Peer-Auswahl wieder her. Im nicht getaggten Code v0.11.0 führten fehlende Standardwerte bei Live-Peer-Objekten dazu, dass die Kandidatenabfrage keine Peers zurückgab. Nodes konnten weiterhin über HTTP synchronisieren und eingehende WebSocket-Verbindungen empfangen, aber der ausgehende Echtzeit-Push von Blöcken und Transaktionen funktionierte nicht. Der Fix setzt die Standardwerte für die Live-Peer-Instanz, und Regressionstests decken die Peer-Standardwerte sowie die Auswahlabfrage ab.

### Replay-Korrektheit und strengere APIs

Die Round-Settlement-Logik berücksichtigt nun während eines Replays die aktuelle Blockhöhe, und das Rollback-Reward-Indexing ordnet jeden Delegate seinen eigenen Änderungen zu. Die Release-Notes berichten von Bit-für-Bit-Zustandsäquivalenzprüfungen im Mainnet und Testnet bei vollständigem Neuaufbau, Image-Start und Checkpoint-Wiederherstellung. Ein separates, bereits bestehendes Rollback-Problem wird weiterhin unter Issue #300 verfolgt.

Für Anwendungsentwickler ist die Filterbehandlung bei Zuständen, Chats und Chatrooms nun strenger. Unterstützte `and:`-Filter werden konsistent angewendet; nicht unterstützte `or:`-Filter und zuvor ignorierte Parameter werden abgelehnt. Der Batch-Key-Parameter ändert sich von `keysIds` zu `keyIds`. Dies sind beabsichtigte, Breaking-Changes der HTTP-API, daher sollten Integrationen vor der Bereitstellung überprüft werden.

### Einheitliche Dokumentation

Die Node-Dokumentation und die OpenAPI 3.2-Spezifikation befinden sich nun zusammen mit dem Code im Node-Repository, wodurch es möglich ist, Verhalten, Dokumentation und den API-Vertrag gemeinsam zu aktualisieren. Betreiber und Entwickler können die einheitliche [Dokumentation](https://docs.adamant.im/) und das [API-Schema](https://docs.adamant.im/schema/) erkunden, einschließlich neuer Anleitungen für Upgrades, Sicherheit, Monitoring und Tests.

### Upgrade-Hinweise

Das Upgrade führt keinen Konsens-Fork und keine neuen SQL-Migrationen ein. Block- und Transaktions-Serialisierung, Signaturen, Delegate-Reihenfolge, Rewards, Gebühren, Aktivierungshöhen und Slot-Timing bleiben gegenüber v0.10.2 unverändert. Es erfordert jedoch Aufmerksamkeit hinsichtlich der operativen und HTTP-API-Kompatibilität. Betreiber sollten den [Upgrade-Leitfaden](https://docs.adamant.im/own-node/upgrading.html) lesen und Integrationen auf entfernte Routen und strengere Filter prüfen. Eine unterstützte Node.js-Version ist erforderlich: `^22.22.2 || >=24.15.0`. Stoppen Sie den Node ordnungsgemäß, warten Sie auf die Bereinigung und überprüfen Sie dann die Ratenbegrenzungen, das Proxy-Vertrauensverhältnis und die Forging-Konfiguration, bevor Sie neu starten. Wenn Forging-Secrets verschlüsselt sind, entsperren Sie diese nach jedem Neustart und überprüfen Sie den lokalen Sperrstatus. Überprüfen Sie nach dem Upgrade den Node-Status, die Peer-Konnektivität und die Anti-Missbrauchs-Einstellungen.

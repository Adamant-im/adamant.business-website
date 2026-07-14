---
title: "ADAMANT Localnet und Config-Overrides: Schnellere Entwicklung, einfachere Tests, bessere Automatisierung"
slug: "adamant-localnet-and-config-overrides-faster-development-easier-testing-better-automation-c6756a10f6bd"
description: "Die ADAMANT-Entwicklung ist für Node-Betreiber, Mitwirkende und App-Entwickler einfacher und schneller geworden. Neben dem öffentlichen Testnet können Entwickler jetzt eine lokale Lightweight-Netzwerkumgebung nutzen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-localnet-and-config-overrides-faster-development-easier-testing-better-automation-c6756a10f6bd"
publishedAt: "2026-06-06T13:20:25.670Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/c6756a10f6bd/001-1-50jddzsw9tlqqlt95tevlg-png.webp"
cardSpan: "full"
originalId: "medium:c6756a10f6bd"
locale: "de"
placeholder: false
---

Die ADAMANT-Entwicklung ist für Node-Betreiber, Mitwirkende und Anwendungsentwickler einfacher und schneller geworden. Zusätzlich zum öffentlichen ADAMANT Testnet können Entwickler jetzt ein leichtgewichtiges lokales ADAMANT-Netzwerk direkt auf ihrer eigenen Maschine ausführen. Diese Localnet-Installation ist für schnelle Experimente, automatisierte Prüfungen, Szenariotests und Entwicklungsabläufe gedacht, die kein öffentliches Netzwerk oder schwere Infrastruktur benötigen. Gleichzeitig unterstützt der ADAMANT Node nun flexible Konfigurations-Overrides, wodurch Betreiber und Testautomatisierungsskripte die Node-Einstellungen beim Start ändern können, ohne `config.json` oder `test/config.json` manuell bearbeiten zu müssen.

### Vom Testnet zum Localnet

Das Testnet bleibt wichtig, da es Entwicklern eine gemeinsame, öffentliche Umgebung bietet, die realen Netzwerkbedingungen näherkommt. Es eignet sich zum Testen von Integrationen, Überprüfen des Anwendungsverhaltens, Validieren der Knotenkompatibilität und Experimentieren mit Funktionen, bevor sie das Mainnet erreichen. Nicht jede Entwicklungsarbeit benötigt jedoch ein öffentliches Netzwerk. Manchmal brauchen Entwickler etwas Kleineres und Schnelleres – mehrere Knoten lokal starten, konsensbezogene Änderungen testen, Peer-Erkennung und Synchronisation überprüfen, einen Fehler reproduzieren, automatisierte Szenariotests durchführen oder das Knotenverhalten validieren, bevor ein Pull Request geöffnet wird. Hier kommt das Localnet ins Spiel.

### Was ist das ADAMANT Localnet?

ADAMANT Localnet ist ein verwaltetes lokales Mehrknoten-ADAMANT-Netzwerk, das auf einem einzelnen Rechner läuft. Anstatt sich mit öffentlichen Testnet-Knoten zu verbinden, startet Localnet mehrere isolierte ADAMANT-Knoten lokal. Jeder Knoten verfügt über eigene Ports, Laufzeitstatus, Logs, Konfiguration, Prozessmetadaten und Datenbankeinstellungen.

Der grundlegende Ablauf ist einfach:

```bash
npm run start:localnet -- --nodes 3
npm run status:localnet
npm run stop:localnet
```

Wenn eine vollständige Bereinigung erforderlich ist, können persistente lokale Datenbanken mit `npm run drop:localnet` oder durch `npm run stop:localnet -- --dropOnStop` entfernt werden.

Localnet ist bewusst leichtgewichtig. Es erfordert keinen öffentlichen Server, keine VPS oder lange Synchronisation aus dem Netzwerk. Es läuft lokal, nutzt kontrollierte Testkonfigurationen und eignet sich für Entwicklungsrechner. Dies macht es nützlich für Mitwirkende, die Knotenänderungen vor der Einreichung testen, Maintainer, die schnelle Release-Prüfungen benötigen, Entwickler, die Anwendungen auf Basis der ADAMANT-APIs bauen, sowie Automatisierungsskripte oder CI-ähnliche Umgebungen.

### Was Localnet unter der Haube erstellt

Beim Start erzeugt Localnet isolierte Laufzeitdaten für jeden Knoten, einschließlich knotenspezifischer Konfigurationsdateien, Laufzeitstatus, PID-Dateien, eines Manifests, lokaler Ketten-Daten und separater Log-Ordner pro Knoten. Die Logs sind nach Knoten getrennt, z. B. unter `logs-localnet/node-1/`, `logs-localnet/node-2/` usw. Dies ist wichtig, da Mehrknoten-Probleme oft einen Vergleich des Verhaltens über verschiedene Peers hinweg erfordern – eine einzelne Log-Datei reicht nicht aus, wenn es um Debugging von Propagationsproblemen, Neuanbindungen, verpassten Blöcken, Split-Brain-Situationen, Forging-Verhalten oder Broadhash-Konsens geht. Die Localnet-Werkzeuge erzeugen außerdem maschinenlesbare Metadaten, die später von Szenariotest-Tools verwendet werden können.

Das Statusskript meldet knotenspezifische Informationen wie API-Status, Delegatenanzahl, letzte Forging-Zeit, Nethash und Live-Broadhash-Konsens. Der Broadhash-Konsens ist besonders nützlich, um zu prüfen, ob sich die lokalen Knoten nach dem Start tatsächlich synchronisiert haben. In einem lokalen Rauchtest wurde ein 3-Knoten-Localnet gestartet, der Status abgefragt, der Live-Broadhash-Konsens erreichte auf allen Knoten 100 % und anschließend wurde das Localnet ordnungsgemäß angehalten und entfernt.

Localnet wird nicht durch einfaches Beenden der Prozesse gestoppt. Das `stop:localnet`-Skript verwendet den normalen, kontrollierten Herunterfahrpfad des Knotens, was hilft, unnötige Datenbank- oder Laufzeitprobleme zu vermeiden und das lokale Testverhalten dem realen Betrieb näherzubringen. Standardmäßig sind lokale PostgreSQL-Datenbanken persistent. Die automatische Datenbankerstellung hängt davon ab, ob die lokale PostgreSQL-Rolle die Berechtigung `CREATEDB` besitzt; falls nicht, können Entwickler eine bestehende Datenbanknutzung oder dokumentierte Skip/Create-Optionen verwenden.

### Config-Overrides: Kein manuelles Bearbeiten von Konfigurationen mehr

Früher unterstützte der ADAMANT Node die Auswahl einer Konfigurationsdatei mit `--config` und hatte mehrere fest codierte CLI-Overrides wie `--port`, `--address`, `--peers`, `--log` und `--snapshot`. Das funktionierte für einfache Fälle, skalierte aber nicht gut. Betreiber und Automatisierungsskripte müssen oft verschachtelte Konfigurationswerte ändern – Ports, Redis-Einstellungen, Datenbankeinstellungen, Peer-Listen, Logging-Optionen, API-Einstellungen, Forging-Konfiguration, Aktivierungshöhen oder testspezifische Parameter. Das manuelle Bearbeiten kopierter Konfigurationsdateien ist fehleranfällig, die Hinzufügung eines CLI-Flags pro Konfigurationsschlüssel skaliert nicht, und das Ersetzen der gesamten Konfigurationsdatei ist oft zu aufwändig für kleine, umgebungsspezifische Änderungen.

Entwickler können jetzt einzelne Konfigurationswerte direkt beim Start übergeben, indem sie Dot-Path-Schlüssel verwenden, die der Struktur des bestehenden Konfigurationsobjekts entsprechen:

```bash
node app.js \
  --config test/config.json \
  --genesis test/genesisBlock.json \
  --config-set consensusActivationHeights.fairSystem=4359465 \
  --config-set redis='{ "url": "redis://127.0.0.1:6379/1", "password": null }'
```

Dies ermöglicht es Skripten, einen einzelnen verschachtelten Skalarwert oder einen ganzen Objektwert zu überschreiben. Werte werden nach Möglichkeit als JSON-kompatible Werte geparst, sodass Zahlen, Boolesche Werte, null, Arrays und Objekte korrekt dargestellt werden, anstatt als reine Zeichenketten behandelt zu werden.

Config-Overrides unterstützen auch Dateien. Eine env-artige Override-Datei kann Einträge wie folgt enthalten:

```ini
consensusActivationHeights.fairSystem=4359465
redis='{ "url": "redis://127.0.0.1:6379/1", "password": null }'
```

Die Implementierung unterstützt außerdem JSON-Teil-Override-Dateien. Dies ist nützlich für lokale Umgebungen, Testautomatisierung, CI-ähnliche Workflows und Maintainer, die eine wiederholbare Reihe von Änderungen wünschen, ohne die versionierten Konfigurationsdateien zu ändern. Localnet nutzt diesen Mechanismus standardmäßig über `test/config.localnet.json`, wodurch die Basis-Konfiguration stabil bleibt und localnet-spezifische Unterschiede über denselben validierten Override-Prozess angewendet werden.

### Validierung und Sicherheit

Die endgültig zusammengesetzte Konfiguration wird weiterhin gegen das bestehende ADAMANT-Konfigurationsschema validiert, nachdem Standardwerte, Override-Dateien, direkte Overrides und veraltete CLI-Abkürzungen aufgelöst wurden. Ungültige Pfade, ungültige Werttypen, fehlerhaftes JSON und unsichere Schlüssel sollen vor dem Start fehlschlagen, anstatt unvorhersehbares Laufzeitverhalten zu erzeugen. Sensible Werte werden aus den Config-Override-Logs ausgeblendet, einschließlich Passwörter, Passphrasen, Geheimnisse und Tokens. Veraltete Start-Abkürzungen werden über denselben validierten Override-Pipeline geleitet und behalten die höchste Override-Präzedenz, sodass bestehende Workflows weiterhin funktionieren, während neue Workflows eine generischere und konsistentere Konfigurationsmechanik erhalten.

Einige Konfigurationswerte sind konsensrelevant. Das Überschreiben von Schlüsseln wie `consensusActivationHeights.*` kann für lokale oder Test-Szenarien nützlich sein, aber die Verwendung netzwerkinkompatibler Aktivierungshöhen gegenüber der falschen Kette kann dazu führen, dass sich ein Knoten vom Netzwerk trennt. Config-Overrides sollen explizit und sichtbar sein. Sie sind nützlich für Localnet, Testnet, Automatisierung und kontrollierte Betriebsszenarien, sollten aber mit Vorsicht auf produktiven Mainnet-Knoten eingesetzt werden. Die Funktion ändert nur die Startkonfigurationsauflösung – sie verändert nicht direkt Blocklogik, Transaktionsserialisierung, Belohnungslogik, Gebührenlogik, Delegatenreihenfolge, Signaturprüfungen oder Konsensregeln.

### Localnet und Testnet arbeiten zusammen

Localnet ersetzt das Testnet nicht; sie lösen unterschiedliche Probleme. Localnet eignet sich am besten für schnelle, private, wiederholbare Entwicklung auf einem Rechner, bei der Entwickler volle Kontrolle, schnellen Start und isolierte Experimente benötigen. Testnet eignet sich am besten für öffentliche, gemeinsame, netzwerkebene Tests, bei denen Entwickler eine persistente Umgebung, öffentliche Peers, Test-ADM-Münzen, Zugriff auf den Explorer und anwendungsebene Prüfungen gegenüber einem gemeinsamen Netzwerk benötigen. Zusammen bieten sie ADAMANT-Mitwirkenden eine stärkere Entwicklungs-Pipeline: lokal mit Localnet testen, gegen das öffentliche Testnet validieren und dann sicherere Mainnet-Releases vorbereiten.

Das Lebenszyklusmanagement von Localnet wurde absichtlich von der Ausführung von Szenariotests getrennt. Die Localnet-Skripte sind für das Starten, Stoppen, Inspektionieren und Bereinigen des lokalen Netzwerks verantwortlich. Szenariotester können dann ein bereits verfügbares Localnet oder Testnet ansteuern und Berichte erstellen. Diese Trennung hält die Verantwortlichkeiten klar und erleichtert die Entwicklung zukünftiger Werkzeuge.

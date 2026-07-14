---
title: "ADAMANT v0.10.0: Eine neu aufgebaute Entwicklereinstiegsmöglichkeit für Blockchain-Messaging"
slug: "adamant-v0-10-0-we-rebuilt-the-developer-on-ramp-to-blockchain-messaging-68c29cbd6646"
description: "Dezentraler Messenger ist nur relevant, wenn Entwickler darauf aufbauen können. Mit ADAMANT Node v0.10.0 wurde die gesamte Entwicklererfahrung überarbeitet."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-v0-10-0-we-rebuilt-the-developer-on-ramp-to-blockchain-messaging-68c29cbd6646"
publishedAt: "2026-06-20T16:19:49.523Z"
author: "massivedev0 (Theo Bitner)"
authorUrl: "https://medium.com/@vr.dev0"
sourceAccount: "massive"
coverImage: "/images/engineering-notes/medium/68c29cbd6646/001-1-ujeffbtelp0ew-8wechc8g-png.webp"
cardSpan: "full"
originalId: "medium:68c29cbd6646"
locale: "de"
placeholder: false
---

Dezentraler Messaging ist nur dann relevant, wenn Entwickler tatsächlich darauf aufbauen können. Gemeinsam mit ADAMANT Node **v0.10.0** wurde die gesamte Entwicklererfahrung überarbeitet: eine neue API-Spezifikation, neu verfasste Dokumentation, ein lokales Netzwerk, das in Minuten eingerichtet werden kann, und ein frisch gestartetes Testnetz. Ziel ist es, die Integration in das ADAMANT Blockchain-Messaging-Ökosystem schnell, vorhersehbar und angenehm zu gestalten – egal ob Sie eine Wallet, einen Bot, einen Benachrichtigungsdienst oder etwas völlig Neues entwickeln.

### Eine moderne, interaktive API-Spezifikation

Der API-Vertrag liegt nun als klare **OpenAPI 3.2**-Spezifikation vor und wird als interaktive Swagger UI unter [schema.adamant.im](https://schema.adamant.im/) veröffentlicht. Das Schema wurde vollständig gegen den Live-Node überprüft, sodass das, was Sie lesen, genau das ist, was das Netzwerk tatsächlich zurückgibt – Konten, Transaktionen, Chats, Delegierte, Blöcke, Key-Value-Speicher und Node-Endpunkte, alles in einer durchsuchbaren Referenz.

Entwickler können Anfragen direkt im Browser ausprobieren. Die Spezifikation beinhaltet eine Live-Serverauswahl: Die UI pingt jeden öffentlichen Node, zeigt dessen aktuelle API-Version an und wählt automatisch einen gesunden Mainnet-Node aus, sodass „Probieren Sie es aus“-Aufrufe sofort funktionieren. Sie können nach jeder Operation nach Pfad, Methode, Name oder Zusammenfassung suchen, und da die Quelle ein echtes OpenAPI-Dokument ist, können Sie daraus direkt typisierte Clients (z. B. TypeScript) generieren. Der eigene [adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient) von ADAMANT nutzt genau dies.

### Tiefere Einblicke in den Node

Mehrere Ergänzungen in v0.10.0 sind kleine Felder mit großem Nutzen. Transaktionen enthalten nun ein `timestampMs`-Feld, das millisekundengenaue Zeitstempel neben dem bestehenden sekundengenauen `timestamp` bereitstellt. Für einen Messenger, bei dem die Reihenfolge wichtig ist, ermöglicht dies Clients, Nachrichten und Überweisungen mit Untersekunden-Genauigkeit zu sortieren. Clients sollten es, wenn vorhanden, bevorzugen und andernfalls auf `timestamp * 1000` zurückgreifen.

Die Antwort des Node-Status enthält nun `nodeTimestampMs`, `unixTimestampMs` sowie ein `loader`-Objekt, das den Synchronisierungsfortschritt meldet (`syncing`, `consensus`, `blocks`, `blocksCount`), sodass Betreiber und Tools den Gesundheits- und Synchronisierungsstatus eines Nodes auf einen Blick einschätzen können. Ein neuer `GET /peers/get`-Endpunkt sucht einen bestimmten Peer anhand von IP und Port, was nützlich ist, um Netzwerkmonitore und Konnektivitäts-Tools zu bauen. Chat- und Transaktionsabfragen sind durch neue Parameter `returnUnconfirmed` und `includeDirectTransfers` übersichtlicher geworden, die Clients präzise Kontrolle darüber geben, was zurückgegeben wird. Diese Ergänzungen sind abwärtskompatibel: Bestehende Integrationen funktionieren weiterhin, neue erhalten jedoch mehr Funktionalität.

### Dokumentation, aus der Sie tatsächlich entwickeln können

Die API ist nur die halbe Miete. Die Dokumentation unter [docs.adamant.im](https://docs.adamant.im/) wurde neu verfasst und erweitert, versionsgekennzeichnet zur Node-Version, sodass Anleitungen und Netzwerk nie auseinanderdriften. Neue und erweiterte Inhalte behandeln Konsens und Transaktionsvalidierung – wie Blöcke vereinbart werden und was eine Transaktion gültig macht – sowie das Synchronisieren und den loader/status-Endpunkt, sodass Sie genau verstehen, was ein Node tut, während er sich synchronisiert. Es gibt Installationsanleitungen (auch für macOS), Konfiguration, Autostart, Bootstrapping und Node-Wiederherstellung für den Betrieb Ihres eigenen Nodes sowie eine vollständige Dokumentation der `timestampMs`-Semantik, sodass Sie Zeit von Anfang an korrekt handhaben.

### Ein Netzwerk in Minuten starten: localnet + testnet

Sie können jetzt ein vollständiges ADAMANT-Netzwerk auf Ihrem eigenen Gerät mit **localnet** einrichten. Entwickeln und testen Sie gegenüber einer echten Blockchain, ohne die öffentliche Infrastruktur zu berühren, ohne auf Bestätigungen eines ausgelasteten Netzwerks warten zu müssen und ohne echte ADM auszugeben. Schnell iterieren, frei zurücksetzen. Wenn Sie bereit sind, über Ihren Laptop hinauszugehen, wurde das öffentliche **Testnetz** frisch neu gestartet und auf v0.10.0 ausgerichtet – eine gemeinsame, sichere Umgebung, um Integrationen unter realen Netzwerkbedingungen zu validieren, bevor Sie auf das Mainnet gehen. Der Weg von lokal → Testnetz → Mainnetz ist nun ein glatter, gut dokumentierter Pfad statt einer steilen Klippe.

### Was Sie bauen können

Mit einer typisierten API, ausführbaren Netzwerken und echter Dokumentation eröffnen sich schnell praktische Szenarien. ADAMANT ist ein vollständig dezentraler, Ende-zu-Ende-verschlüsselter Messenger auf eigener Blockchain, sodass Wallets und Messenger verschlüsselte Nachrichten und Werte im selben Protokoll senden können. Benachrichtigungs- und Alarmdienste können On-Chain-Ereignisse (Zahlungen, Nachrichten) in Ihre eigenen Apps pushen. Trading- und Börsenintegrationen erhalten programmatisches Konto-, Kontostand- und Überweisungsmanagement mit millisekundengenauer Reihenfolge. Bots und Automatisierungen – Chatbots, Zahlungsbots, Monitoring-Bots – nutzen alle diese API, und das ADAMANT-Ökosystem umfasst bereits Handelsbots und mehr. Maschinen-zu-Maschinen- und IoT-Messaging erhält einen zensurresistenten, anonymen Kanal, über den Geräte koordinieren und miteinander bezahlen können, und anonyme, serverlose Kommunikation wird möglich, wo kein zentraler Server beschlagnahmt, geleakt oder abgeschaltet werden kann.

Da Nachrichten und Zahlungen ein einheitliches Protokoll nutzen, können sich viele dieser Anwendungsfälle kombinieren: eine Wallet, die chattet, ein Bot, der zahlt, ein Gerät, das Nachrichten sendet und abrechnet – alles auf derselben Basis.

### Referenzen

- **API-Referenz:** [schema.adamant.im](https://schema.adamant.im/)
- **Dokumentation:** [docs.adamant.im](https://docs.adamant.im/)
- **Node-Quellcode:** [github.com/Adamant-im/adamant](https://github.com/Adamant-im/adamant)
- **JS-Client:** [github.com/Adamant-im/adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient)

---
title: "ADAMANT Console v3.1.0: CLI- und JSON-RPC-Anwendungsfälle"
slug: "adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
description: "ADAMANT Console v3.1.0 ist jetzt auf GitHub und npm verfügbar. Diese Version passt die Kompatibilität mit ADAMANT Node v0.10.0 an und verbessert die Entwicklererfahrung für CLI- und JSON-RPC-Nutzung."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
publishedAt: "2026-06-29T08:58:40.394Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/14a24cb7ac32/001-0-1kktbaowg0a7u8mr.webp"
cardSpan: "full"
originalId: "medium:14a24cb7ac32"
locale: "de"
placeholder: false
---

ADAMANT Console v3.1.0 ist jetzt auf GitHub und npm verfügbar. Diese Version bringt die Console mit ADAMANT Node v0.10.0 auf einen Stand und verbessert die Entwicklererfahrung im Umgang mit CLI-Nutzung, JSON-RPC-Integrationen und lokalen JavaScript-Wrappern. Sie richtet sich an alle, die ADAMANT in Skripten, Bots, Börseninfrastrukturen, internen Tools, Monitoring-Dashboards oder Zahlungsautomatisierungen verwenden.

### Was ist ADAMANT Console?

ADAMANT Console ist ein Kommandozeilen- und JSON-RPC-Tool zur Interaktion mit der ADAMANT-Blockchain. Es kann Konten, Blöcke, Transaktionen, Chats, Delegierte und den Knotenstatus überprüfen; ADM-Überweisungen und verschlüsselte Nachrichten senden; als lokaler JSON-RPC-Bridge für in beliebigen Sprachen geschriebene Dienste fungieren; und Transaktionen lokal signieren, sodass Passphrasen niemals an ADAMANT-Knoten gesendet werden. Dieser letzte Punkt ist entscheidend: Die Console basiert auf lokalem Signieren. Ihre Anwendung bereitet eine Aktion lokal vor, die Console signiert sie lokal, und nur die signierte Transaktion wird dem Netzwerk übermittelt.

### Was ist neu in v3.1.0

Das Hauptziel dieser Version ist die Kompatibilität mit ADAMANT Node v0.10.0. Zu den bemerkenswerten Änderungen gehören die Unterstützung für aktualisierte Antwort- und Abfrageverhalten des Knotens, ein Upgrade auf `adamant-api` v3, neue Unterstützung für `node status`, erweiterte Hilfsfunktionen für Chats und Transaktionen, `returnUnconfirmed`-Unterstützung bei Transaktionssuchen, Delegierte-Suche per Benutzernamen, öffentlichem Schlüssel oder ADAMANT-Adresse, aktualisierte Filter für Direktüberweisungen mit `includeDirectTransfers`, verbesserte CLI-Hilfebeispiele, erweiterter Umfang der unterstützten JSON-RPC-Methoden, eine generierte API-Dokumentation mit einer neuen Console-Dokumentationsseite und ein npm-Paket, das über Trusted Publishing mit Herkunftsnachweis veröffentlicht wurde. Die unterstützte Laufzeit ist nun Node.js 22.13.0 oder neuer.

Installation oder Aktualisierung:

```bash
npm install -g adamant-console
```

Überprüfen Sie anschließend Ihre lokale Konfiguration:

```bash
adm client version
adm node status
```

### Anwendungsfall: Ein Crypto-Operations-Bot für Team-Workflows

Ein Team, das Dienste betreibt, die von ADM-Zahlungen oder Knotenverfügbarkeit abhängen, kann ADAMANT Console als kleine lokale Bridge hinter einem Bot nutzen. Ein Telegram-, Discord- oder Slack-Bot kann Console-Befehle oder JSON-RPC-Methoden aufrufen, um Fragen zum Knotenstatus, Transaktionsstatus, Wallet-Guthaben und unbestätigten eingehenden Zahlungen zu beantworten.

Beispielhafte CLI-Prüfungen:

```bash
adm node status
adm get address U123456789
adm get transaction 123456789 returnUnconfirmed=1
adm get transactions recipientId=U123456789,limit=10
```

Dies ist nützlich für Support-Teams, Monitoring-Kanäle, Treasury-Operationen und interne Incident-Response. Der Bot muss das ADAMANT-Protokoll nicht im Detail kennen; er ruft die Console auf, verarbeitet das JSON-Ergebnis und zeigt klare Statusmeldungen für Menschen an.

### Anwendungsfall: ADM-gestützte App-Lizenzierung oder Zugriffskontrolle

Ein weiterer praktischer Anwendungsfall ist die leichte Lizenzverwaltung. Eine selbstgehostete App, ein Handelstool, ein Analyse-Dashboard oder ein Automatisierungsdienst kann Premium-Zugriff freischalten, wenn ein Nutzer ADM an eine Zahlungsadresse sendet. Das Backend weist dem Nutzer eine Einzahlungsadresse zu, überwacht eingehende Transaktionen, prüft Betrag und Transaktionsstatus, aktiviert automatisch den Zugriff und sendet optional eine verschlüsselte ADAMANT-Nachricht als Quittung.

Ein Dienst kann Transaktionen so abfragen:

```bash
adm get transactions recipientId=U123456789,limit=20,returnUnconfirmed=1
```

Oder eine Bestätigungsnachricht senden:

```bash
adm send message U123456789 "Your subscription is active"
```

Für größere Anwendungen kann derselbe Ablauf über JSON-RPC erfolgen, sodass das Haupt-Backend in PHP, Python, Go, Ruby, Java oder einer anderen Sprache geschrieben sein kann, die HTTP-Anfragen stellen kann. Die Console wird dann zur lokalen ADAMANT-Bridge.

### Anwendungsfall: Schnelle ADM-Einzahlungen und -Auszahlungen über JSON-RPC für Börsen

Börsen und verwahrende Dienste benötigen oft eine einfache, vorhersehbare Schnittstelle für Ein- und Auszahlungen. ADAMANT Console kann als lokaler JSON-RPC-Server betrieben werden:

```bash
adm rpc server
```

Standardmäßig lauscht sie auf dem konfigurierten RPC-Port, üblicherweise `5080`. Führen Sie den JSON-RPC-Server nur auf vertrauenswürdiger Infrastruktur hinter einer Firewall oder in einem privaten Netzwerk aus. Wenn der Server Zugriff auf Passphrasen hat, behandeln Sie ihn als Signierinfrastruktur.

Knotenstatus prüfen:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"nodeStatus","params":[],"id":1}'
```

Ein Konto für Einzahlungen generieren:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"accountNew","params":[],"id":2}'
```

Speichern Sie die generierten Anmeldeinformationen sicher. Protokollieren Sie keine Passphrasen oder privaten Schlüssel.

Einzahlungen überwachen:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactionsReceivedByAddress","params":["U123456789"],"id":3}'
```

Für flexiblere Transaktionssuchen:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactions","params":["recipientId=U123456789","limit=20","returnUnconfirmed=1"],"id":4}'
```

Ihr Börsen-Backend kann Einzahlungen nach Adresse, Transaktions-ID, Betrag, Zeitstempel und Bestätigungsrichtlinie abrechnen.

Auszahlungen bearbeiten:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"sendTokens","params":{"address":"U987654321","amount":"10ADM","passphrase":"your local passphrase"},"id":5}'
```

Für Produktionssysteme sollten Passphrasen aus sicherem lokalem Geheimnisspeicher stammen, niemals aus Protokollen, Screenshots, CI-Ausgaben oder geteiltem Shell-Verlauf.

### Warum diese Version wichtig ist

ADAMANT Console ist bewusst schlank gehalten. Sie versucht nicht, ein vollständiges SDK oder ein benutzerdefiniertes Backend zu ersetzen. Stattdessen bietet sie Entwicklern und Betreibern ein praktisches Werkzeug für schnelle Skripte, lokales Signieren, Bot-Integrationen, Börsenautomatisierung, Zahlungsprüfungen, operationelles Monitoring und JSON-RPC-Zugriff aus Nicht-JavaScript-Umgebungen. Mit v3.1.0 ist dieses Werkzeug nun auf dem Stand von ADAMANT Node v0.10.0 und dem aktuellen ADAMANT JavaScript API-Stack.

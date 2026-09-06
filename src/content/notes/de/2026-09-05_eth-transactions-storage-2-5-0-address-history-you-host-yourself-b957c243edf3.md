---
title: "ETH Transactions Storage 2.5.0: Adressverlauf in Eigenregie"
slug: "eth-transactions-storage-2-5-0-address-history-you-host-yourself-b957c243edf3"
description: "Ethereum-Execution-Clients liefern zwar den Chain-Head, Blöcke oder Logs, beantworten jedoch nicht die Frage nach dem Transaktionsverlauf einer Adresse."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/eth-transactions-storage-2-5-0-address-history-you-host-yourself-b957c243edf3"
publishedAt: "2026-09-05T14:44:58.348Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:b957c243edf3"
coverImage: "/images/engineering-notes/medium/b957c243edf3/001-a6ae0683b6.webp"
locale: "de"
placeholder: false
---

Ethereum-Execution-Clients können zwar den aktuellen Stand der Chain, einen Block, eine Quittung oder ein Log liefern, beantworten jedoch nicht die Frage, die jede Wallet-Oberfläche beim Öffnen stellt: Welche Transaktionen betreffen diese Adresse, sortiert von neu nach alt? Öffentliche Indexer beantworten diese Frage zwar, sehen aber auch jede Adresse, die Ihre Nutzer abfragen, drosseln bei steigendem Datenverkehr den Zugriff und können jederzeit ihre Preisgestaltung ändern oder den Dienst einstellen. Wenn der Transaktionsverlauf Teil Ihres Produkts ist, stellt diese Abhängigkeit ein kritisches Risiko dar.

ETH Transactions Storage ist ein selbst gehosteter Indexer, der Blöcke von Ihrem Ethereum-Node liest, native ETH-Transfers sowie ERC-20-Transfer-Aufrufe in Ihre PostgreSQL-Datenbank schreibt und den Adressverlauf über eine schreibgeschützte REST-API bereitstellt. Es gibt keine Telemetrie, keine Konten bei Drittanbietern und nur zwei ausgehende Verbindungen: zum Node und zur konfigurierten Datenbank. Die Architektur ist geradlinig: Ethereum-Node → ethsync.py → PostgreSQL → PostgREST → Ihre Anwendung. Sie funktioniert mit Geth, Nethermind, Besu und Erigon über HTTP, WebSocket oder IPC sowie mit EVM-kompatiblen Netzwerken, die dieselbe JSON-RPC-Schnittstelle bieten.

Version 2.5.0 macht dieses Konzept zu einer Lösung, die Sie verteilen, betreiben und dokumentieren können. Der API-Vertrag im Produktionsbetrieb bleibt identisch, doch die Software drumherum ist neu. Diese Version führt einen zuverlässigen Sync, ein kleineres empfohlenes Index-Set, optionale Adressfilterung, ein dokumentiertes Sicherheitsmodell, ein veröffentlichtes Container-Image und eine Dokumentations-Website ein.

### Zuverlässiger Sync und Adressfilterung

Jeder Block wird zusammen mit seinem Checkpoint in einer einzigen Datenbanktransaktion geschrieben. Neustarts setzen exakt dort fort, wo sie unterbrochen wurden. Beim Start entfernt der Indexer den höchsten Block und geht einen Schritt zurück, um sicherzustellen, dass ein teilweise geschriebener Block nach einem Absturz nicht bestehen bleibt. Leere oder gefilterte Blöcke täuschen den Cursor nicht mehr; eine dedizierte `sync_state`-Zeile protokolliert die zuletzt verarbeitete Höhe, selbst wenn diese Höhe keine Zeilen speicherte. Datenbankfehler führen zu einem Rollback und einem erneuten Versuch, anstatt den Checkpoint vor den Daten zu belassen.

Ein vollständiger Verlauf der gesamten Chain ist die richtige Standardeinstellung für eine öffentliche Wallet-API, jedoch die falsche für einen Treasury-Monitor oder ein Support-Tool, bei denen die Adressen im Voraus bekannt sind. Version 2.5.0 fügt einen optionalen Adressfilter hinzu. Wenn dieser geladen ist, speichert der Indexer einen Transfer nur dann, wenn der Absender, der native Empfänger oder der Token-Empfänger übereinstimmt. Die Liste wird während der Laufzeit neu geladen. Die Validierung ist streng und nach dem Fail-Closed-Prinzip implementiert: Wenn die Liste nicht gelesen werden kann, wird die Indizierung nicht mit einem leeren Filter fortgesetzt. Beachten Sie, dass das Aktivieren des Filters oder das Hinzufügen einer Adresse keine früheren Blöcke nachlädt; planen Sie den benötigten Verlauf also vor dem Start.

### Optimierte Indizierung und Sicherheit

Das empfohlene Datenbank-Set besteht nun aus fünf B-Tree-Indizes, die aus echtem Produktions-Abfrageverkehr abgeleitet wurden, anstatt jede potenziell nützliche Spalte zu indizieren. Bei einem Datensatz von etwa 490 Millionen Zeilen spart dieses kleinere Set geschätzte 90–110 GB ein. Die Verwendung von `citext` bei Adressfeldern ermöglicht einen case-insensitiven Abgleich, ohne jede Abfrage in `LOWER()` zu kapseln.

Der Indexer-Benutzer schreibt Daten, die öffentliche API darf dies jedoch nicht. Diese Version dokumentiert und liefert eine `web_anon`-Rolle mit ausschließlichen SELECT-Berechtigungen für `ethtxs`, `aval` und `max_block`. PostgREST ist auf 10.000 Zeilen pro Antwort begrenzt. Der Sicherheitsleitfaden behandelt Reverse-Proxy-Regeln für öffentliche Bereitstellungen, einschließlich Methoden-Allow-Lists, obligatorischer Adressfilter für `/ethtxs` sowie Schutzmaßnahmen gegen teure Count-Aggregate und unbegrenzte Offsets. Anmeldedaten werden aus `.env` geladen, PostgreSQL-Verbindungs-URIs werden unterstützt und Diagnosedaten maskieren Passwörter.

### Container und API-Vertrag

Das veröffentlichte Image lautet `ghcr.io/adamant-im/eth-transactions-storage:2.5.0` und ist für linux/amd64 sowie linux/arm64 erstellt. Versions-Tags sind unveränderlich; verwenden Sie 2.5.0 in der Produktion. Docker Compose führt dieses Image standardmäßig zusammen mit PostgreSQL, PostgREST, einem optionalen lokalen Geth und dem Indexer aus. Die Dokumentations-Website unter eth-indexer.docs.adamant.im bietet Informationen zu Architektur, Quick-Starts, Konfiguration und Sicherheit.

Eine derart umfangreiche Version ist nur nützlich, wenn bestehende Clients weiterhin funktionieren. Das tun sie. Die Endpunkte `/ethtxs`, `/max_block` und `/aval` bleiben unverändert.

Native ETH-Transfers, eine Anfrage:

```http
GET /ethtxs?and=(contract_to.eq.,or(txfrom.eq.{address},txto.eq.{address}))&order=time.desc&limit=25
```

ERC-20-Transfers für einen Token-Contract:

```http
GET /ethtxs?and=(txto.eq.{contract_address},or(txfrom.eq.{address},contract_to.eq.000000000000000000000000{address_without_0x}))&order=time.desc&limit=25
```

Status:

```http
GET /max_block
GET /aval
```

Spaltennamen, Kodierungen und case-insensitive Adressen bleiben wie bisher. Die 24 führenden Nullen bei `contract_to` sind ABI-Padding und keine Unstimmigkeit, die später bereinigt werden müsste.

### Umfang und Einschränkungen

Der Indexer speichert native ETH-Transfers mit einem Wert ungleich Null sowie ERC-20-Transfers, die als direkter Top-Level-Aufruf `transfer(address,uint256)` übermittelt wurden. Er speichert keine internen ETH-Transfers, `transferFrom`-Aufrufe, Multisig- oder Router-Flows, andere Token-Standards oder Event-Logs. Der Indexer repariert keine tiefgreifenden Chain-Reorganisationen automatisch im Nachhinein; `CONFIRMATIONS_BLOCK` hält ihn hinter dem Head, was bedeutet, dass eine tiefe Reorg eine geplante Neu-Indizierung des betroffenen Bereichs erfordert. Wenn Ihre Anwendung jede mögliche Token-Bewegung widerspiegeln muss, benötigen Sie einen log-basierten Indexer. Wenn sie nutzerinitiierte Transfers benötigt – also den Verlauf, den eine Wallet tatsächlich anzeigt – ist diese Lösung genau dafür gebaut und bleibt kostengünstig im Betrieb.

Bestehende Betreiber sollten vor der Bereitstellung den Upgrade-Leitfaden lesen. Wenden Sie zuerst das additive Schema an, behalten Sie Ihre Produktionsumgebungswerte bei und behandeln Sie ein Compose-Image-Tag-Update nicht als PostgreSQL-Upgrade. ETH Transactions Storage ist Open-Source-Infrastruktur, die von der ADAMANT-Entwickler-Community und cryptofoundry gepflegt wird.

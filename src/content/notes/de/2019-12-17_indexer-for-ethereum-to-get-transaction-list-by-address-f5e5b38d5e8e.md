---
title: "Indexer für Ethereum, um Transaktionslisten nach Adresse abzurufen"
slug: "indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
description: "Ethereum-Knoten unterstützen das Abrufen von Transaktionslisten für eine Adresse nicht nativ. Die Methode eth_listTransactions wurde oft angefordert, steht aber nicht auf dem Ethereum-Roadmap."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
publishedAt: "2019-12-17T09:47:40.803Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f5e5b38d5e8e/001-1-joo929ftoejwheza0gd8ka-png.webp"
cardSpan: "full"
originalId: "medium:f5e5b38d5e8e"
locale: "de"
placeholder: false
---

Ethereum-Knoten unterstützen das Abrufen einer Transaktionsliste für eine bestimmte Adresse nicht nativ. Die Methode `eth_listTransactions` wird seit Langem gewünscht, steht jedoch nicht auf dem Ethereum-Roadmap, wodurch Anwendungsentwickler – Messaging-Apps, Block-Explorer, Wallets – gezwungen sind, ihre eigene Indexierungsschicht zu erstellen.

Das ADAMANT-Team hat einen kostenlosen, quelloffenen [Ethereum-Transaktionsindexer](https://github.com/Adamant-im/ETH-transactions-storage) entwickelt, um diese Lücke zu schließen. Geschrieben in Python, läuft er als Hintergrunddienst, der sich mit einem Ethereum-Knoten verbindet (getestet mit geth und parity), Transaktionen über JSON-RPC abruft und diese – einschließlich Smart-Contract-Transaktionen – in einer Postgres-Datenbank speichert. Eine RESTful-API-Schicht wird anschließend über Postgrest bereitgestellt und ermöglicht Abfragen nach Adresse, ähnlich wie Etherscan sie anbietet.

### Funktionsweise

Der Indexer beginnt mit dem Speichern von Transaktionen ab einer von Ihnen angegebenen Blocknummer und fragt standardmäßig alle 20 Sekunden (intervallkonfigurierbar) nach neuen Blöcken ab. Sobald der Index gefüllt ist, können Sie über Postgrest Transaktionen nach Adresse abfragen. Die folgende Anfrage gibt beispielsweise die 25 neuesten Transaktionen zurück, an denen die Adresse `0x6b924750e56a674a2ad01fbf09c7c9012f16f094` beteiligt ist, sortiert nach Zeitstempel:

```
curl -k -X GET "http://localhost:3000/?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25"
```

Die vollständige API-Dokumentation finden Sie in der [Postgrest-Dokumentation](https://postgrest.org/en/v5.2/api.html).

### Einrichtung

Der Indexer läuft unter Linux (getestet unter Ubuntu 16 und 18). Sie benötigen einen synchronisierten geth- oder parity-Knoten sowie Python, Postgresql, Postgrest und nginx. Sie können den Indexer direkt oder als Daemon ausführen:

```
python3.6 you/path/to/script/ethsync.py <yourDB>
```

Die Indizierung benötigt Zeit. Um den Fortschritt zu überprüfen, fragen Sie den zuletzt indizierten Block ab und vergleichen ihn mit dem besten Block Ihres Knotens:

```
psql -d index -c 'SELECT MAX(block) FROM ethtxs;'
```

Ausführliche Installations- und Konfigurationsanweisungen finden Sie im [Repository](https://github.com/Adamant-im/ETH-transactions-storage).

### Öffentliche API

Postgrest veröffentlicht die API auf einem lokalen Port. Um sie öffentlich zugänglich zu machen, konfigurieren Sie nginx so, dass Anfragen an Postgrest weitergeleitet werden:

```
location /ethtxs {
    proxy_pass http://127.0.0.1:3000;
}

location /aval {
    proxy_pass http://127.0.0.1:3000;
}
```

Dies stellt zwei Endpunkte bereit: `/ethtxs` zum Abrufen von Ethereum-Transaktionen nach Adresse und `/aval` für den Dienststatus.

### Live-Beispiel

Eine funktionierende Instanz ist am ADAMANT-Knoten verfügbar. Wenn Sie die folgende URL in einem Browser öffnen, werden die neuesten Transaktionen für die Beispieladresse angezeigt:

```
https://ethnode1.adamant.im/ethtxs?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25
```

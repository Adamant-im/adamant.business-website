---
title: "Indexer (EthSync-Tool) für Ethereum mit zusätzlichen Indizes aktualisiert"
slug: "indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
description: "Ethereum-Knoten bieten RPC-APIs, aber keinen einfachen Zugriff auf Transaktionslisten nach Adresse – eine Funktion, die Block-Explorer wie Etherscan bieten."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
publishedAt: "2023-09-22T14:36:48.398Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/f828f2b7fdf6/001-0-2atpoq1jvo6rdiry.webp"
cardSpan: "full"
originalId: "medium:f828f2b7fdf6"
locale: "de"
placeholder: false
---

Ethereum-Knoten stellen RPC-APIs für viele Operationen bereit, bieten jedoch keine native Möglichkeit, einfach eine Transaktionsliste nach Adresse abzurufen – eine Funktion, die von Block-Explorern wie Etherscan gewöhnlich erwartet wird. Um dies zu ermöglichen, unterhält ADAMANT einen speziellen, auf Python basierenden Indexer, bekannt als EthSync-Tool, der eine effiziente Abfrage von ETH- und ERC20-Transaktionen nach Adresse ermöglicht.

Der Indexer arbeitet als Hintergrunddienst, der über HTTP-, WS- oder IPC-APIs mit Ethereum-Knoten verbunden ist und mit gängigen Clients wie Geth und Nethermind kompatibel ist. Die gesammelten Transaktionsdaten werden zur Sicherheit und schnellen Abfrage in einer Postgres-Datenbank gespeichert, und eine PostgREST-API stellt diese Daten für Client-Anwendungen bereit.

![Indexer (EthSync-Tool) für Ethereum mit zusätzlichen Indizes aktualisiert](/images/engineering-notes/medium/f828f2b7fdf6/002-0-9zuzrclpitfvpafs.webp)

Ein wesentlicher Verbesserung in dieser Version ist die Einführung zusätzlicher Datenbankindizes. Diese Indizes verbessern die Leistung bei komplexen Abfragen erheblich, beispielsweise beim Filtern nach reinen Ethereum- oder spezifischen Token-Transaktionen einer Adresse. Die Abfrage der letzten 25 USDT-Transaktionen für eine bestimmte Adresse kann beispielsweise mit folgender API-Anfrage durchgeführt werden:

```bash
curl -k -X GET “http://localhost:3000/ethtxs?and=(txto.eq.0xdac17f958d2ee523a2206206994597c13d831ec7,or(txfrom.eq.0xabfDF505fFd5587D9E7707dFB47F45AF1f03E275,contract_to.eq.000000000000000000000000abfDF505fFd5587D9E7707dFB47F45AF1f03E275))&order=time.desc&limit=25"
```

In Tests benötigen die meisten Abfragen, die diese neuen Indizes nutzen, weniger als 100 Millisekunden – eine deutliche Verbesserung gegenüber den mehreren Sekunden, die ohne sie erforderlich waren.

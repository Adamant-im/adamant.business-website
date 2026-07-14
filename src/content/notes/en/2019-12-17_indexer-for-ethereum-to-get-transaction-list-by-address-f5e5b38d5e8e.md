---
title: "Indexer for Ethereum to Get Transaction Lists by Address"
slug: "indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
description: "Ethereum nodes do not natively support fetching a transaction list for a given address. The eth listTransactions method has long been requested but is not on the Ethereum roadma…"
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
locale: "en"
placeholder: false
---

Ethereum nodes do not natively support fetching a transaction list for a given address. The `eth_listTransactions` method has long been requested but is not on the Ethereum roadmap, which leaves application developers—messaging apps, block explorers, wallets—to build their own indexing layer.

The ADAMANT team built a free, open-source [Ethereum Transaction Indexer](https://github.com/Adamant-im/ETH-transactions-storage) to fill this gap. Written in Python, it runs as a background service that connects to an Ethereum node (tested with geth and parity), fetches transactions via JSON RPC, and stores them—including smart contract transactions—in a Postgres database. A RESTful API layer is then provided through Postgrest, allowing queries by address similar to what Etherscan offers.

### How It Works

The indexer begins storing transactions from a block number you specify, then polls for new blocks every 20 seconds by default (the interval is configurable). Once the index is populated, you can query transactions by address through Postgrest. For example, the following request returns the 25 most recent transactions involving address `0x6b924750e56a674a2ad01fbf09c7c9012f16f094`, ordered by timestamp:

```
curl -k -X GET "http://localhost:3000/?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25"
```

For full API reference, consult the [Postgrest documentation](https://postgrest.org/en/v5.2/api.html).

### Setup

The indexer runs on Linux (tested on Ubuntu 16 and 18). You need a synchronized geth or parity node, plus Python, Postgresql, Postgrest, and nginx. You can run the indexer directly or as a daemon:

```
python3.6 you/path/to/script/ethsync.py <yourDB>
```

Indexing takes time. To check progress, query the last indexed block and compare it to your node's best block:

```
psql -d index -c 'SELECT MAX(block) FROM ethtxs;'
```

Detailed installation and configuration instructions are in the [repository](https://github.com/Adamant-im/ETH-transactions-storage).

### Public API

Postgrest publishes the API on a local port. To expose it publicly, configure nginx to proxy requests to Postgrest:

```
location /ethtxs {
    proxy_pass http://127.0.0.1:3000;
}

location /aval {
    proxy_pass http://127.0.0.1:3000;
}
```

This provides two endpoints: `/ethtxs` for fetching Ethereum transactions by address, and `/aval` for service status.

### Live Example

A working instance is available at the ADAMANT node. Opening the following URL in a browser returns recent transactions for the sample address:

```
https://ethnode1.adamant.im/ethtxs?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25
```

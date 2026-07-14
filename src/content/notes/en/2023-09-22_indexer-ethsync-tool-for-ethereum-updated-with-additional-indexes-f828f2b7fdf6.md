---
title: "Indexer (EthSync tool) for Ethereum updated with Additional Indexes"
slug: "indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
description: "Ethereum nodes provide RPC APIs for many operations but lack a native way to easily retrieve a transaction list by address, a feature commonly expected from block explorers like…"
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
locale: "en"
placeholder: false
---

Ethereum nodes provide RPC APIs for many operations but lack a native way to easily retrieve a transaction list by address, a feature commonly expected from block explorers like Etherscan. To address this, ADAMANT maintains a specialized Python-based Indexer, known as the EthSync tool, which enables efficient querying of both ETH and ERC20 transactions by address.

The Indexer operates as a background service connecting to Ethereum nodes via HTTP, WS, or IPC APIs, and is compatible with popular clients such as Geth and Nethermind. Collected transaction data is stored in a Postgres database for durability and fast access, and a PostgREST API exposes this data to client applications.

![Indexer (EthSync tool) for Ethereum updated with Additional Indexes](/images/engineering-notes/medium/f828f2b7fdf6/002-0-9zuzrclpitfvpafs.webp)

A significant upgrade in this version is the introduction of additional database indexes. These indexes drastically improve performance for complex queries, such as filtering for Ethereum-only or specific token transactions associated with an address. For example, retrieving the last 25 USDT transactions for a specific address can be accomplished using the following API request:

```bash
curl -k -X GET “http://localhost:3000/ethtxs?and=(txto.eq.0xdac17f958d2ee523a2206206994597c13d831ec7,or(txfrom.eq.0xabfDF505fFd5587D9E7707dFB47F45AF1f03E275,contract_to.eq.000000000000000000000000abfDF505fFd5587D9E7707dFB47F45AF1f03E275))&order=time.desc&limit=25"
```

In testing, most queries utilizing these new indexes execute in under 100 milliseconds, a substantial improvement over the tens of seconds required without them.

---
title: "EthSync Tool v2.1: Ethereum Transaction Indexer Update"
slug: "ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
description: "The EthSync tool indexes Ethereum and ERC20 transactions by address, providing wallet history similar to block explorers like Etherscan. It runs as a background service that con…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
publishedAt: "2022-07-06T15:40:23.802Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:6a4f00964d64"
locale: "en"
placeholder: false
---

The EthSync tool indexes Ethereum and ERC20 transactions by address, providing wallet history similar to block explorers like Etherscan. It runs as a background service that connects to an Ethereum node via HTTP, WebSocket, or IPC APIs—compatible with Geth, Nethermind, and other standard nodes—stores all transactions in a Postgres database, and exposes transaction data through a postgrest-powered API.

Version 2.1 brings several improvements. The script now retrieves all transaction data in a single request to the Ethereum node, making only one additional request per transaction to fetch its status, which significantly reduces node load. Logging has been expanded, and a new `LOG_FILE` environment variable lets operators specify an optional file path for log output; when unset, the tool falls back to `StreamHandler`.

This release also fixes issues with IPC and database connections that affected earlier versions. Two new test scripts are included: `ethtest.py` verifies connectivity to the Ethereum node, and `pgtest.py` checks the Postgres database connection, making deployment troubleshooting more straightforward.

The EthSync tool is part of the ADAMANT open-source project and is freely available. Full documentation, installation instructions, and usage examples are in the project [Readme](https://github.com/Adamant-im/ETH-transactions-storage#indexer-for-ethereum-to-get-transaction-list-by-eth-address).

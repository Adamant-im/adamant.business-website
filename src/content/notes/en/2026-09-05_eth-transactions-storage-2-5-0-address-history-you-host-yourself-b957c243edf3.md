---
title: "ETH Transactions Storage 2.5.0: Address History You Host Yourself"
slug: "eth-transactions-storage-2-5-0-address-history-you-host-yourself-b957c243edf3"
description: "Ethereum execution clients can tell you the chain head, a block, a receipt, or a log, but they cannot answer the question every wallet screen asks when it opens: which transacti…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/eth-transactions-storage-2-5-0-address-history-you-host-yourself-b957c243edf3"
publishedAt: "2026-09-05T14:44:58.348Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:b957c243edf3"
coverImage: "/images/engineering-notes/medium/b957c243edf3/001-a6ae0683b6.webp"
locale: "en"
placeholder: false
---

Ethereum execution clients can tell you the chain head, a block, a receipt, or a log, but they cannot answer the question every wallet screen asks when it opens: which transactions involve this address, newest first? Public indexers answer it, but they also see every address your users look up, rate-limit you when traffic grows, and can change pricing or disappear. If transaction history is part of your product, that dependency sits in the critical path.

ETH Transactions Storage is a self-hosted indexer that reads blocks from your Ethereum node, writes native ETH transfers and ERC-20 transfer calls into your PostgreSQL database, and serves address history over a read-only REST API. There is no telemetry, no third-party account, and only two outbound connections: the node and the database you configure. The architecture is straightforward: Ethereum node → ethsync.py → PostgreSQL → PostgREST → your application. It works with Geth, Nethermind, Besu, and Erigon over HTTP, WebSocket, or IPC, and with EVM-compatible networks that expose the same JSON-RPC surface.

Version 2.5.0 turns this idea into something you can distribute, operate, and document. The API contract used in production stays the same, but the software around it is new. This release introduces reliable sync, a smaller recommended index set, optional address filtering, a documented security model, a published container, and a documentation site.

### Reliable Sync and Address Filtering

Each block is written together with its checkpoint in a single database transaction. Restarts resume exactly where they stopped. On startup, the indexer removes the highest block and rewinds one step, ensuring a partially written block cannot survive a crash. Empty blocks and filtered blocks no longer fool the cursor; a dedicated `sync_state` row records the last processed height even when that height stored no rows. Database errors roll back and retry instead of leaving the checkpoint ahead of the data.

Full-chain history is the right default for a public wallet API, but the wrong default for a treasury monitor or support tool where the address set is known in advance. Version 2.5.0 adds an optional address filter. When loaded, the indexer stores a transfer only if the sender, native recipient, or token recipient matches. The list reloads while the process runs. Validation is strict and fail-closed: if the list cannot be read, indexing does not continue with an empty filter. Note that enabling the filter or adding an address does not backfill earlier blocks, so plan the history you need before starting.

### Optimized Indexing and Security

The recommended database set is now five B-tree indexes, derived from real production query traffic rather than indexing every potentially useful column. On a dataset of about 490 million rows, this smaller set saves an estimated 90–110 GB. The use of `citext` on address fields keeps matching case-insensitive without wrapping every query in `LOWER()`.

The indexer user writes, but the public API must not. This release documents and ships a `web_anon` role with SELECT only on `ethtxs`, `aval`, and `max_block`. PostgREST is capped at 10,000 rows per response. The security guide covers reverse-proxy rules for public deployments, including method allow-lists, mandatory address filters on `/ethtxs`, and guards against expensive count aggregates and unbounded offsets. Credentials are loaded from `.env`, PostgreSQL connection URIs are supported, and diagnostics redact passwords.

### Container and API Contract

The published image is `ghcr.io/adamant-im/eth-transactions-storage:2.5.0`, built for linux/amd64 and linux/arm64. Version tags are immutable; pin 2.5.0 in production. Docker Compose runs this image by default alongside PostgreSQL, PostgREST, an optional local Geth, and the indexer. The documentation site at eth-indexer.docs.adamant.im provides architecture, quick starts, configuration, and security details.

A release this large is only useful if existing clients keep working. They do. The `/ethtxs`, `/max_block`, and `/aval` endpoints remain unchanged.

Native ETH transfers, one request:

```http
GET /ethtxs?and=(contract_to.eq.,or(txfrom.eq.{address},txto.eq.{address}))&order=time.desc&limit=25
```

ERC-20 transfers for a token contract:

```http
GET /ethtxs?and=(txto.eq.{contract_address},or(txfrom.eq.{address},contract_to.eq.000000000000000000000000{address_without_0x}))&order=time.desc&limit=25
```

Health:

```http
GET /max_block
GET /aval
```

Column names, encodings, and case-insensitive addresses stay as they were. The 24 leading zeros on `contract_to` are ABI padding, not a quirk to clean up later.

### Scope and Limitations

The indexer stores native ETH transfers with a non-zero value and ERC-20 transfers submitted as a direct top-level `transfer(address,uint256)` call. It does not store internal ETH transfers, `transferFrom`, multisig or router flows, other token standards, or event logs. The indexer does not automatically repair a deep chain reorganization after the fact; `CONFIRMATIONS_BLOCK` keeps it behind the head, meaning a deep reorg requires a planned re-index of the affected range. If your application must reflect every possible token movement, you need a log-based indexer. If it needs user-initiated transfers—the history a wallet actually shows—this one is built for that job and stays cheap to run.

Existing operators should read the upgrade guide before deploying. Apply the additive schema first, keep your production environment values, and do not treat a Compose image-tag bump as a PostgreSQL upgrade. ETH Transactions Storage is open-source infrastructure maintained by the ADAMANT developer community and cryptofoundry.

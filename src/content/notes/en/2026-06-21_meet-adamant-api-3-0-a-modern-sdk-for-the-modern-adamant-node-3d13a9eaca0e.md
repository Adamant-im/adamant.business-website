---
title: "Meet adamant-api 3.0 — a modern SDK for the modern ADAMANT node"
slug: "meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
description: "The adamant api JavaScript/TypeScript SDK has released version 3.0.0, designed to work seamlessly with ADAMANT Node v0.10.0. This release introduces millisecond timestamps, rich…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
publishedAt: "2026-06-21T15:54:25.436Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3d13a9eaca0e/001-0-hkmpiqt1p-ubpghb.webp"
cardSpan: "full"
originalId: "medium:3d13a9eaca0e"
locale: "en"
placeholder: false
---

The `adamant-api` JavaScript/TypeScript SDK has released version 3.0.0, designed to work seamlessly with ADAMANT Node v0.10.0. This release introduces millisecond timestamps, richer query parameters, consolidated node-status responses, and inclusive minimum-version filtering. The SDK provides automatic health checks, retries, failover, typed responses, encrypted messaging, and real-time WebSocket subscriptions.

ADAMANT is a blockchain-based, end-to-end encrypted messenger with a built-in crypto wallet that requires no phone number or central server. The `adamant-api` SDK abstracts the network into clean function calls, allowing developers to build decentralized bots, tip jars, and wallets where users own their identity and funds.

### What’s New in 3.0

The SDK's API data transfer objects are regenerated from a pinned `adamant-schema` revision, ensuring correct typing for millisecond timestamps, loader/status data, and nullable unconfirmed-transaction fields. Query capabilities now include `returnUnconfirmed`, `includeDirectTransfers`, delegate lookup by address, and multi-type transaction queries. Transaction filters combine with logical `and` by default, and amount filters apply only to transfer transactions. Optional `timestampMs` construction and `getEpochTimeMs()` are available, though `timestampMs` is not part of the signed bytes, leaving hashes, IDs, and signatures unchanged.

Reliability improvements include stopping retry loops for explicitly rejected POSTs, returning structured non-retryable errors instead. Retry and active-node failover are preserved for safe requests and network failures. Height-aware node selection and inclusive `minVersion` filtering ensure communication with healthy, up-to-date nodes.

A real WebSocket client allows subscribing to multiple addresses, transaction types, and chat asset types over a single connection. It features typed connection errors, reconnection callbacks, explicit `connect()`/`disconnect()`, listener cleanup, and bounded reconnection.

The package is now modular by design. The root package stays ADM-focused, while subpath exports provide access to API DTOs, transactions, metadata, and BTC/ETH/DASH/DOGE helpers for both CommonJS and ESM. Coin metadata is deterministic and pinned from `adamant-wallets`. Documentation has moved to a source-controlled VitePress + TypeDoc site.

![Meet adamant-api 3.0 — a modern SDK for the modern ADAMANT node](/images/engineering-notes/medium/3d13a9eaca0e/002-0-bato9yeonu3b9-oz.webp)

### Quick Start

Install the package and initialize the client with a list of nodes. Health checks, retries, and failover are handled automatically.

```javascript
import {AdamantApi} from 'adamant-api';

const api = new AdamantApi({
  nodes: [
    'https://endless.adamant.im',
    'https://clown.adamant.im',
    'https://lake.adamant.im',
  ],
  checkHealthAtStartup: true,
  minVersion: '0.10.0', // inclusive — older nodes are excluded automatically
});

api.onReady(async () => {
  const response = await api.getBlocks();
  if (response.success) {
    console.log(response.blocks);
  } else {
    console.error(response.errorMessage);
  }
});
```

### Use Cases

You can build a decentralized chat bot that watches accounts in real time and responds to encrypted messages. End-to-end encryption is built in; the bot decrypts messages with its own passphrase, and the server never stores plaintext.

```javascript
import {AdamantApi, WebSocketClient, decodeMessage} from 'adamant-api';
import {config} from './config.js';

const api = new AdamantApi({nodes: config.nodes});

const ws = new WebSocketClient({
  admAddress: config.address,
  direction: 'incoming', // only messages sent *to* the bot
});
api.initSocket(ws);

ws.onMessage(async (tx) => {
  const text = decodeMessage(
    tx.asset.chat.message,
    tx.senderPublicKey,
    config.passphrase,
    tx.asset.chat.own_message,
  );

  if (text.trim() === '/ping') {
    await api.sendMessage(config.passphrase, tx.senderId, 'pong 🏓');
  }
});
```

For a crypto tip jar or payment bot, you can react to incoming token transfers and send tokens back. A single WebSocket connection can also watch many addresses and filter by type, which is useful for exchange ingest or accounting dashboards.

If you need a lightweight multi-coin wallet, you can derive BTC, ETH, DASH, or DOGE addresses from the same ADAMANT passphrase without bundling multiple crypto stacks into your ADM-only bot. Import exactly what you need via subpath exports to keep serverless bundles small.

```javascript
import {eth} from 'adamant-api/coins/eth';
import {btc} from 'adamant-api/coins/btc';

const {address: ethAddress} = eth.keys(process.env.PASSPHRASE);
const {address: btcAddress} = btc.keys(process.env.PASSPHRASE);

console.log({ethAddress, btcAddress});
```

### Migrating from 2.x

To migrate, bump Node to version 22 or higher in your runtime and CI. Audit WebSocket direction, adding `direction: 'incoming'` if your app assumed incoming-only. Update coin imports to `adamant-api/coins/*`, drop Lisk/Klayr code paths, and re-check query filters for the new logical-`and` default, swapping `withoutDirectTransfers` for `includeDirectTransfers`. Signing, transaction IDs, and CommonJS/ESM imports remain untouched.

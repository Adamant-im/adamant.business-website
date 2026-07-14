---
title: "ADAMANT Blockchain Node Update: Version 0.8.0"
slug: "adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
description: "ADAMANT, the open source decentralized messaging platform built on blockchain technology, has released node version 0.8.0. This update focuses on API enhancements and optimizati…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
publishedAt: "2023-03-20T08:43:48.499Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:35647db85081"
locale: "en"
placeholder: false
---

ADAMANT, the open-source decentralized messaging platform built on blockchain technology, has released node version 0.8.0. This update focuses on API enhancements and optimizations rather than consensus changes, so updating your node is optional.

## API Improvements

The `/api/transactions` and `/api/chats/get` endpoints now accept either `inId` or `isIn` as equivalent query parameters. For example, `/api/chats/get?InId=U6386412615727665758` and `/api/chats/get?isIn=U6386412615727665758` produce the same result. Additionally, user IDs in the `/api/chats/get` and `/api/chatrooms` endpoints are now case insensitive, meaning `/api/chatrooms/U6386412615727665758` and `/api/chatrooms/u6386412615727665758` are treated identically.

Transactions and `POST /api/accounts/delegates` now accept a transaction as either a plain object or nested inside a `transaction` property. Both forms below are valid:

```bash
curl -X POST https://endless.adamant.im/api/transactions/process -H 'Content-Type: application/json' -d '{"type": 0, "amount": 100000000, ...}'
# or {"transaction": { "type": 0, "amount": 100000000, ... }}
```

The `/api/states/get` endpoint now includes a `confirmations` property, and `generatorPublicKey` query performance has been optimized. A `cors` option has also been added to `config.json` for easier cross-origin configuration.

## Bug Fixes and Breaking Changes

The update resolves a "permission denied for schema public" error that affected some deployments. However, version 0.8.0 introduces a breaking change: the `/api/blocks` endpoint no longer returns a `count` property. Applications relying on that field will need to be updated accordingly.

Since this release does not alter consensus rules, existing nodes can continue operating on the previous version without compatibility issues.

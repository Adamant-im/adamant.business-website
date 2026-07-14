---
title: "Client WebSocket events for blocks and balances in ADAMANT Node"
slug: "discussion-65-client-websocket-events-for-blocks-and-balances-in-adamant-node-10428016"
description: "Overview ADAMANT Node now supports two opt in client WebSocket capabilities: newBlock events for successfully applied and saved blocks, and balances/change events for confirmed…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/65"
publishedAt: "2026-07-14T16:18:33Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10428016"
locale: "en"
placeholder: false
---

## Overview

ADAMANT Node now supports two opt-in client WebSocket capabilities: `newBlock` events for successfully applied and saved blocks, and `balances/change` events for confirmed `balance` and `unconfirmedBalance` updates. The implementation uses Socket.IO rather than a bare WebSocket connection. Subscriptions are scoped to a single socket and must be restored after reconnecting.

The implementation addresses [Node issue #256](https://github.com/Adamant-im/adamant/issues/256) and [Node issue #217](https://github.com/Adamant-im/adamant/issues/217), with documentation in [Adamant-im/docs#35](https://github.com/Adamant-im/docs/pull/35) and an OpenAPI companion contract in [Adamant-im/adamant-schema#48](https://github.com/Adamant-im/adamant-schema/pull/48).

## New block events

Clients explicitly enable block notifications by emitting `blocks: true`. The `newBlock` payload contains a compact public header: block ID, height, timestamp, generator public key, transaction count, total amount, total fee, and reward. It intentionally omits the transaction list, signatures, and payload hash; clients can request the full block through REST when needed.

```js
connection.emit('blocks', true);

connection.on('newBlock', (block) => {
  console.log('Applied block:', block);
});
```

The node emits this event only after the complete block application pipeline succeeds and the block is saved. Historical replay and memory-table rebuilds do not produce live-looking block events.

## Balance change events

Balance delivery requires both an address subscription and an explicit field subscription. The payload includes only subscribed fields that changed, with values as decimal strings in 1/10^8 ADM units.

```js
connection.emit('address', ['U1234567890123456']);
connection.emit('balances', ['balance', 'unconfirmedBalance']);

connection.on('balances/change', (account) => {
  console.log('Balance changed:', account);
});
```

`balance` represents confirmed blockchain state. `unconfirmedBalance` also reflects the node's current unconfirmed pool and may change when transactions are accepted, confirmed, expired, rolled back, or revalidated.

## Delivery and performance design

The main goal was to add useful events without turning every account mutation into a scan of every connected socket or an unnecessary database read. Dedicated block and per-address balance indexes select only interested sockets, and the node skips account reads when no subscriber needs the changed address and field. Block application and rollback batch internal balance mutations and perform one final account read per changed address. Nested batch suppression is latched until the outer batch closes, preventing partial publication after an inner failure. Failed block application, failed rollback, replay, rebuild, and completed snapshot truncation all suppress non-durable balance notifications. Socket matching, account lookup, and individual socket emission failures are isolated from block, round, and account processing. Round reward changes publish only after a completed durable round operation.

These changes do not modify consensus rules, block or transaction serialization, signatures, IDs, database schemas, rewards, fees, or peer protocol behavior.

## Best-effort event semantics

These events are low-latency notifications, not a durable event log. Clients can miss events during a disconnect and must reconcile important state through REST. Balance subscriptions do not send an initial snapshot, and asynchronous balance reads can complete out of order during rapid independent updates. Duplicate transaction and block IDs are suppressed for at least 60 seconds, with periodic cleanup extending the effective window to approximately two minutes. If a block is rolled back and the same ID is re-applied inside that window, the second notification can be suppressed.

The current balance string representation intentionally matches REST behavior; exact values beyond JavaScript's safe-integer range require a coordinated API-wide change rather than a WebSocket-only divergence. No arbitrary silent per-socket subscription ceiling was introduced. The current API has no acknowledgement mechanism for partial rejection, so a resource limit should be a separate configurable and documented contract with explicit client feedback.

## Validation

Validation included 226 passing feature-targeted Node tests covering WebSocket, account, transaction, block, and round paths, plus focused follow-up regression tests for snapshot suppression and nested batch discard. The broader fast unit suite passed 940 tests. Additional checks covered ESLint, a production VitePress documentation build, OpenAPI formatting and bundle validation, and real Socket.IO integration coverage for block and balance delivery. Unrelated long-running test suites were intentionally skipped because this feature does not change consensus validation, serialization, SQL, peer transport, or REST endpoints.

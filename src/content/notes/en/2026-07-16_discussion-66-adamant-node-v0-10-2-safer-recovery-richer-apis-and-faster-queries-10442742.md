---
title: "ADAMANT Node v0.10.2: Safer Recovery, Richer APIs, and Faster Queries"
slug: "discussion-66-adamant-node-v0-10-2-safer-recovery-richer-apis-and-faster-queries-10442742"
description: "ADAMANT Node v0.10.2 focuses on node liveness, faster recovery, safer database failure handling, richer observation APIs, and more efficient client subscriptions. Upgrading is r…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/66"
publishedAt: "2026-07-16T18:19:41Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10442742"
locale: "en"
placeholder: false
---

ADAMANT Node v0.10.2 focuses on node liveness, faster recovery, safer database failure handling, richer observation APIs, and more efficient client subscriptions. Upgrading is recommended but not mandatory for network compatibility: the release contains no consensus fork and does not change block or transaction serialization, signatures, delegate ordering, rewards, fees, activation heights, slot timing, or deterministic replay.

## Synchronization recovery

A callback or database failure in the synchronization pipeline could previously leave a node permanently reporting that it was syncing while making no progress. In that state it rejected live blocks, never started another sync, and required a manual restart. v0.10.2 introduces a progress-based watchdog that detects a sync run which has applied no new block for five minutes. The stalled run is aborted using a run-scoped stop signal, no new state mutation may begin after the abort signal, and in-flight block/account work drains before the loader releases its syncing state. Rejected PostgreSQL queries now propagate through block verification, block loading, and startup memory-table updates instead of silently parking callback chains. These are liveness and error-propagation changes only; they do not alter which blocks are valid.

## Persisted checkpoints

ADAMANT keeps consensus-derived state in `mem_*` tables. If a process is interrupted while those mirrors are being updated, the node must rebuild them from canonical blocks. v0.10.2 adds three rotating checkpoint slots for derived memory state. Each checkpoint records the block height/ID, round, nethash, schema version, status, and canonical SHA-256 digest. Startup accepts only checkpoints whose metadata, digest, chain reference, network, and state invariants pass validation. A valid checkpoint is restored and only later blocks are replayed; any validation or partial-replay failure falls back to the existing full deterministic rebuild. Unconfirmed junction tables are not checkpointed and are rebuilt from confirmed state. Canonical blocks and deterministic replay remain the source of truth—a checkpoint is only a local recovery cache and cannot redefine chain state.

## REST API improvements

`GET /api/accounts/top` is now available consistently on every node, providing deterministic `balance DESC, address ASC` ordering, pagination, an `isDelegate` filter, count metadata, and `limit=0` count-only requests.

Several delegate API bugs are fixed. `GET /api/delegates/get` again reports the delegate's real rank/rate and correct outsider productivity. `GET /api/delegates/voters` can no longer lose its address filter and return all accounts. `GET /api/delegates/getNextForgers` uses the next block height at round boundaries and reports a stable loading error before a chain tip exists.

Status and delegate APIs now expose the active `consensusCodeName`, the effective consensus activation schedule after defaults and runtime overrides, the complete block reward milestone schedule, and each delegate's lifetime `forged` amount as a base-10 integer string. This reduces dependence on duplicated hard-coded schedules and exposes the node's effective configuration without changing consensus behavior.

`GET /api/blocks` now honors `numberOfTransactions=0`. A new composite B-tree index on `(text_generatorPublicKey, height DESC)` prevents the expensive full-table filtering path for an unknown generator combined with the default ordering. The response contract is unchanged. On a large database, operators should allow time and disk space for the index migration during the first startup.

## Socket.IO block and balance events

Services can now subscribe to compact `newBlock` events and `balances/change` events for `balance`, `unconfirmedBalance`, or both. The node maintains dedicated subscription indexes so unrelated sockets are not scanned. Balance reads are batched around block apply/rollback, and event-publication failures are isolated from state mutation. These events are best-effort and non-durable; clients should restore subscriptions after reconnecting and use REST reconciliation for critical state.

## Dependency and audit maintenance

Runtime and development dependencies were updated within their current major versions. The unused direct `npm` runtime dependency and its bundled subtree were removed, and a narrow compatible Grunt/js-yaml override was added. The verified audit baseline changed from 4 moderate and 1 high finding to zero moderate, high, or critical findings. No cryptographic protocol, signature, mnemonic, peer-handshake, or transaction-validation behavior changed.

## Operator notes

Continue using Node.js 22.13.0 or newer. Back up the database using the normal procedure, stop the node gracefully, and wait for `Cleaned up successfully`. Allow the first v0.10.2 startup to finish migrations and checkpoint/index creation. Plan additional disk space for three rotating derived-state checkpoint slots. After startup, verify `/api/node/status`, synchronization progress, live block processing, and the REST/Socket.IO capabilities used by your services.

## References

- [GitHub Release v0.10.2](https://github.com/Adamant-im/adamant/releases/tag/v0.10.2)
- [ADAMANT Node documentation](https://docs.adamant.im)
- [ADAMANT API schema](https://schema.adamant.im)

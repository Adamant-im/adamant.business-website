---
title: "ADAMANT Docs & Schema: Top Accounts, Client WebSocket Events, and Consensus Visibility"
slug: "discussion-68-docs-and-schema-top-accounts-client-websocket-events-and-consensus-visibility-10447246"
description: "The ADAMANT documentation and schema repositories have been aligned with the current node API surface. All changes are additive and backward compatible — no consensus fork or wi…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/68"
publishedAt: "2026-07-17T12:40:07Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10447246"
locale: "en"
placeholder: false
---

The ADAMANT documentation and schema repositories have been aligned with the current node API surface. All changes are additive and backward-compatible — no consensus fork or wire-format break. Live documentation is available at `https://docs.adamant.im`, with the OpenAPI bundle at `https://schema.adamant.im`.

## Top Accounts API

`GET /api/accounts/top` is now part of the public contract. Ordering is deterministic: `balance DESC`, then `address ASC`. The endpoint supports `limit` and `offset` pagination, an optional `isDelegate` filter, response metadata (`count`), and `limit=0` for count-only requests. The legacy `topAccounts` configuration switch has been removed — the endpoint is registered on every node.

## Client WebSocket: `newBlock` and `balances/change`

The client Socket.IO interface gained opt-in compact `newBlock` events and field-level `balances/change` payloads, which can include `balance`, `unconfirmedBalance`, or both. Subscriptions are indexed by `address`, `types`, `assetChatTypes`, `balances`, and `blocks`. Delivery remains best-effort and non-durable: consumers must reconnect, re-subscribe, and reconcile critical state via REST. The OpenAPI package documents this under `x-client-websocket` with dedicated schemas in `specification/websocket/`.

## Status Schedules and Delegate `forged`

Public status APIs now expose the effective consensus activation schedule and the full block-reward milestone schedule, including `consensusCodeName`, `consensusSchedule.activationHeights`, and `milestoneSchedule` (comprising `offset`, `distance`, and `milestones`). Delegate list and get responses now include lifetime `forged` as a base-10 integer string in base units. Next-forger projection uses the next block height at round boundaries. The schema also corrected `producedlocks` to `producedblocks` and completed query-parameter coverage for peers, queued and unconfirmed transactions, and delegate search and `orderBy`.

## Blocks API Alignment

`GET /api/blocks` query semantics are now aligned with actual node behavior. `numberOfTransactions=0` works correctly, and `orderBy`, amount filters, and `offset`-after-ordering are documented accurately. The schema adds full parameter coverage and `generatorPublicKey` on `BlockInfoDto`. Incorrect `timestampMs` examples were removed from the docs.

## Operator Recovery: Mem-Table Checkpoints

Persisted rotating `mem_*` checkpoints are documented for crash recovery. The feature is controlled by `loading.memCheckpoints.enabled` and is on by default. The documentation covers SHA-256 verification, fail-closed restore, fallback to full deterministic rebuild, storage impact, and graceful shutdown behavior (`SIGINT`/`SIGTERM` → wait for `Cleaned up successfully`). Checkpoints serve as a local recovery cache; canonical blocks remain the source of truth.

## Release Context

These updates target ADAMANT node `v0.10.2`. Downstream consumers — especially `adamant-api-jsclient` — should regenerate types from the updated OpenAPI bundle. Relevant pull requests span the [docs](https://github.com/Adamant-im/docs/pull/39), [schema](https://github.com/Adamant-im/adamant-schema/pull/53), and [node](https://github.com/Adamant-im/adamant) repositories.

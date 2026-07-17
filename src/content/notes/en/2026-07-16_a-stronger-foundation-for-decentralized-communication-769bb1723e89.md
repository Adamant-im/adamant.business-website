---
title: "ADAMANT Node v0.10.2: Synchronization Recovery, Verified Checkpoints, and API Improvements"
slug: "a-stronger-foundation-for-decentralized-communication-769bb1723e89"
description: "Overview ADAMANT Node v0.10.2 improves synchronization recovery, introduces verified checkpoints for derived state, expands REST and Socket.IO capabilities, fixes several API ed…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-stronger-foundation-for-decentralized-communication-769bb1723e89"
publishedAt: "2026-07-16T18:30:13.394Z"
author: "Alex Web3"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:769bb1723e89"
coverImage: "/images/engineering-notes/medium/769bb1723e89/001-23318e9ae1.webp"
locale: "en"
placeholder: false
---

## Overview

ADAMANT Node v0.10.2 improves synchronization recovery, introduces verified checkpoints for derived state, expands REST and Socket.IO capabilities, fixes several API edge cases, optimizes database queries, and refreshes dependencies. The release preserves existing protocol behavior and does not introduce a consensus fork.

The complete changelog is available on [GitHub](https://github.com/Adamant-im/adamant/releases/tag/v0.10.2).

## Synchronization recovery

A decentralized network depends on independent operators running nodes under varying conditions. If node software requires constant intervention or expert-level recovery, participation becomes harder and the network becomes less decentralized in practice.

Previously, an interrupted callback or database error in the synchronization pipeline could leave a node believing it was still syncing even though its block height had stopped advancing. The node would remain stuck until an operator noticed and restarted it.

v0.10.2 adds a progress-based synchronization watchdog that distinguishes between a slow node still applying blocks and a genuinely stalled sync run. If no block-height progress is made for the configured window, the node safely aborts that run, drains any in-flight state mutation, and allows synchronization to start again. The release also fixes database rejection paths that could silently leave block-processing callbacks unfinished.

This is not a consensus change. It does not decide which blocks are valid; it helps a node return to normal operation when the surrounding execution pipeline stalls.

## Verified checkpoints for derived state

ADAMANT nodes maintain derived `mem_*` tables for balances, delegates, rounds, and related state. The blockchain remains canonical, but rebuilding all derived state after an interrupted shutdown can take a long time on a mature chain.

v0.10.2 introduces rotating, persisted checkpoints for that derived state. Each checkpoint is tied to a known block and network, carries a canonical digest, and is validated before use. When a node starts with inconsistent memory mirrors, it can restore the latest verified checkpoint and replay only the blocks that came after it.

The safety model is conservative. A checkpoint is accepted only after its metadata, digest, chain reference, network, and state invariants are verified. Unconfirmed state is rebuilt rather than trusted from a checkpoint. If any validation or partial replay step fails, the node falls back to the existing full deterministic rebuild. Canonical blocks and deterministic replay remain the source of truth, so the checkpoint is a faster recovery path rather than protocol state.

## REST API improvements

ADAMANT is a decentralized trust layer for communication products, not just a blockchain database. v0.10.2 adds a consistent top-accounts endpoint with deterministic ordering, pagination, delegate filtering, and count-only requests, eliminating node-specific workarounds for explorers and analytics tools.

The release also exposes the node's active consensus codename, effective activation schedule, complete reward milestone schedule, and each delegate's lifetime forged amount. Monitoring systems and explorers can now read effective schedules directly from a node instead of duplicating configuration in every client.

Several existing delegate APIs are more accurate. Single-delegate responses again report the real rank and productivity context. Delegate voter queries no longer risk returning unrelated accounts when an address-list filter is used. Next-forger projections now use the correct next-block height at round boundaries.

The blocks API received both a correctness and a performance fix: it now handles `numberOfTransactions=0` correctly, and a new composite database index prevents an expensive scan when querying an unknown generator with the default height ordering.

## Socket.IO live events

Applications that need timely updates can now opt in to two new client Socket.IO event families: compact `newBlock` notifications and `balances/change` notifications for confirmed balance, unconfirmed balance, or both.

The node maintains dedicated subscription indexes and batches affected account reads around block apply and rollback, so it does not scan every connected client or perform unnecessary account queries when nobody is subscribed to the changed data.

These events are best-effort and non-durable. Applications should restore subscriptions after reconnecting and continue to reconcile critical state through REST. Live events reduce polling but do not replace verification.

## Dependency baseline

The release updates dependencies within their existing major versions, removes an unused direct npm runtime dependency and its large bundled subtree, and applies a narrow compatibility override for a transitive toolchain dependency. The verified npm audit baseline moved from four moderate and one high finding to zero moderate, high, or critical findings.

No cryptographic protocol, signature, mnemonic, peer-handshake, or transaction-validation behavior was changed as part of this maintenance.

## Upgrade notes

Updating to v0.10.2 is **not mandatory** for network compatibility. The release does not change block or transaction serialization, signatures, delegate ordering, rewards, fees, activation heights, slot timing, or deterministic replay. Existing compatible nodes can continue participating. cryptofoundry recommends the update for operators who want better synchronization recovery, faster restoration after interrupted shutdowns, security maintenance, improved query performance, and the new API capabilities.

ADAMANT Node continues to require Node.js 22.13.0 or newer. The first startup after upgrading applies new database migrations. Operators should follow their normal backup procedure, stop the node gracefully, wait for `Cleaned up successfully`, and allow enough time and disk space for the checkpoint tables and new indexes to be created. After startup, verify node status, synchronization progress, live block processing, and any REST or Socket.IO capabilities used by connected services.

Further resources are available in the [ADAMANT Node documentation](https://docs.adamant.im), the [ADAMANT API schema](https://schema.adamant.im), and the [technical release discussion](https://github.com/orgs/Adamant-im/discussions/66).

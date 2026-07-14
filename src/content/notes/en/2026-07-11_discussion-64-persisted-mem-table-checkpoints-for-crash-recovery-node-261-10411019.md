---
title: "Persisted Mem-Table Checkpoints for Crash Recovery"
slug: "discussion-64-persisted-mem-table-checkpoints-for-crash-recovery-node-261-10411019"
description: "The ADAMANT node now supports persisted, rotating checkpoints of derived mem state. After a forced interruption that leaves memory mirrors inconsistent, startup can restore the…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/64"
publishedAt: "2026-07-11T14:36:39Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10411019"
locale: "en"
placeholder: false
---

The ADAMANT node now supports persisted, rotating checkpoints of derived `mem_*` state. After a forced interruption that leaves memory mirrors inconsistent, startup can restore the latest verified checkpoint and replay only blocks after the checkpoint height instead of rebuilding all memory tables from height 1. This implements the design from issue #227, merged in pull request #261. Checkpoints are a local recovery cache only; blocks and deterministic replay remain the source of truth. If verification or replay fails, the node falls back to the existing full rebuild path.

Derived tables like `mem_accounts`, `mem_round`, delegate and multisig junction tables, and their unconfirmed mirrors can become inconsistent if the process is killed while writes are in flight. Graceful shutdown via `SIGTERM` is still the required operational path, but checkpoints reduce recovery time when a forced kill happens anyway.

The implementation introduces a metadata table (`mem_state_checkpoint_meta`) and three rotating slot table sets (`mem_ckpt_0..2_*`) for confirmed state. Unconfirmed junction tables are not checkpointed; they are rebuilt from confirmed state on restore. The core logic is split across `logic/memCheckpoint.js` for digest and slot rotation, `modules/memCheckpoints.js` as a module wrapper, `sql/memCheckpoints.js` for SQL helpers, and modifications to `modules/loader.js` and `modules/blocks/chain.js` to trigger recovery and checkpoint creation.

Checkpoints are created only at completed round boundaries after the full `applyBlock` pipeline has persisted the block. At chain tip, this happens every completed round. During catch-up sync, it occurs every 100th round to avoid reducing sync throughput. Checkpoint creation uses a PostgreSQL `REPEATABLE READ` transaction to freeze the MVCC snapshot. The block-processing critical section is released as soon as the metadata row is persisted, while table copy and digest continue in the background against the frozen snapshot. This avoids holding the critical section for the entire copy operation.

Before a checkpoint is accepted for recovery, several invariants are checked: status must be complete, schema and nethash must match, the referenced block must exist, and the SHA-256 digest must match. Recovery tries all complete slots newest-first, so a corrupted newest slot does not force a full rebuild if an older valid slot exists. On startup, if `checkMemTables()` detects inconsistency, `memCheckpoints.tryRecover()` restores the slot, resets unconfirmed state, seeds the last block, and replays blocks from the checkpoint height to tip. If replay fails, the node discards the checkpoint state and performs a full rebuild from genesis.

The feature is enabled by default in `config.default.json`:

```json
"loading": {
  "memCheckpoints": {
    "enabled": true
  }
}
```

Operators should note that this introduces no protocol changes; checkpoints are never consensus input and tampered local data cannot bypass block validation. On mainnet-sized `mem_*` footprints, three slots require roughly 96–144 MB plus metadata, so reserving about 1 GB of headroom is recommended. Operators should still prefer graceful shutdowns, as checkpoints shorten recovery but do not replace correct shutdown procedures.

---
title: "ADAMANT Forging Pool v3.1.0: Safer Rewards, Easier Operations, Better Monitoring"
slug: "forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
description: "ADAMANT Forging Pool v3.1.0 is a recommended update for pool operators. It improves reward calculation and payout reliability, hardens accounting logic, modernizes the runtime,…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
publishedAt: "2026-07-01T18:03:33.378Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:c77f450abf44"
coverImage: "/images/engineering-notes/medium/c77f450abf44/001-5ca73690a5.webp"
locale: "en"
placeholder: false
---

ADAMANT Forging Pool v3.1.0 is a recommended update for pool operators. It improves reward calculation and payout reliability, hardens accounting logic, modernizes the runtime, and simplifies day-to-day operations.

### Why This Release Matters

A forging pool's primary responsibility is calculating voter rewards correctly and paying them safely. v3.1.0 focuses on exactly that. The reward and payout flows were reviewed and hardened to reduce edge-case risk around retries, partial failures, and stored reward values. Pending rewards are normalized before payout accounting, and per-voter reward progress is now tracked more safely so a crash or retry does not accidentally duplicate reward updates. This makes the release especially important for operators who care about payout correctness and long-running reliability.

### What's New in v3.1.0

The biggest infrastructure change is the move to MongoDB-backed storage, giving pool operators a more robust storage layer for blocks, voters, transactions, reward history, and operational data. For existing pools, v3.1.0 includes migration tooling for older LowDB-based data, so operators can move forward without losing historical reward state.

![Forging Pool v3.1.0: Safer Rewards, Easier Operations, Better Monitoring](/images/engineering-notes/medium/c77f450abf44/002-a7aa0fc331.webp)

The release also adds safer reward distribution and payout accounting, retry-safe reward progress tracking, improved payout and block-processing logs, a `/api/health` endpoint for external monitoring, optional encrypted delegate passphrase support, `adm-pool` CLI commands for encrypt, unlock, lock, and status, dashboard filtering by address or name, clearer voter/delegate display in tables, updated documentation, and a Node.js 22.13.0+ runtime baseline.

### Better Security for Operators

Pool operators can now encrypt the delegate passphrase with an operator password. This is optional, so existing plain passphrase setups remain supported, but the new workflow gives operators a safer production path. With encrypted passphrases, the pool can start in a locked state. Block sync, the dashboard, and public APIs remain available, while payouts and ADM notifications stay paused until the operator unlocks the pool. This means a server can recover or restart without immediately exposing payout capability.

### Easier Operations and Monitoring

The new `adm-pool` CLI gives operators simple commands for the most sensitive runtime actions:

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```
Instead of manually handling every sensitive state change inside configuration files or process logs, operators get a dedicated control workflow. The new `/api/health` endpoint provides a secret-free status snapshot for monitoring tools such as Zabbix, custom dashboards, or uptime checks. Combined with MongoDB storage and clearer logs, this makes the pool easier to observe, debug, and maintain over time.

### Recommended Upgrade

ADAMANT Forging Pool v3.1.0 is recommended for all pool operators, especially those running production pools with regular payouts. Before upgrading, operators should back up their configuration and reward history, review MongoDB settings, test the migration on a copy of existing data, and verify payout settings after migration.

Release: [https://github.com/Adamant-im/pool/releases/tag/v3.1.0](https://github.com/Adamant-im/pool/releases/tag/v3.1.0)
Repository: [https://github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)

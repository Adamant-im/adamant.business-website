---
title: "ADAMANT Forging Pool v3.1.0: Reward and Payout Fixes"
slug: "discussion-58-adamant-forging-pool-v3-1-0-recommended-update-for-reward-and-payout-fixes-10353267"
description: "ADAMANT Forging Pool v3.1.0 is a recommended update for pool operators. The release fixes and hardens reward calculations and scheduled payout handling, and introduces several s…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/58"
publishedAt: "2026-07-01T14:33:27Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10353267"
locale: "en"
placeholder: false
---

ADAMANT Forging Pool v3.1.0 is a recommended update for pool operators. The release fixes and hardens reward calculations and scheduled payout handling, and introduces several structural changes worth reviewing before upgrading production pools.

## Why Upgrade

The most important changes target payout safety, operator security, and long-term maintainability. Pending rewards are now normalized before payout accounting, and per-voter reward progress is persisted for forged blocks. Retry and crash paths are safer against duplicate reward updates. The payout, block parsing, and store behavior paths now have more focused tests, and logs and notifications are clearer for operational failure modes.

## Storage and Migration

Pool storage is now MongoDB-backed. The release includes migration tooling for older LowDB-based pool data, located in `scripts/migrate-lowdb-mongodb/`, along with migration tests, MongoDB index setup, an updated configuration reference, and README migration guidance. Operators should back up existing pool data, test migration on a copy, and verify pending and received reward totals before switching production payouts to the upgraded pool.

## Operator Security

v3.1.0 adds optional encrypted passphrase support. Existing plain passphrase configs remain supported, but operators can now encrypt the delegate passphrase and unlock the running pool only when payouts should be enabled:

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```

The control interface uses a local owner-only Unix socket. With an encrypted passphrase, the pool can start locked: block sync, the dashboard, and the public API stay available, while payouts and ADM notifications remain paused until unlock.

## Monitoring and Dashboard

The release adds a `/api/health` endpoint for secret-free external monitoring, along with locked payout status for the dashboard. Voter and transaction filtering by address or name is now supported, and delegate and voter names are shown under addresses when available. Numeric sorting fixes, improved explorer links, and dashboard layout improvements round out the changes.

## Runtime and Upgrade Notes

The runtime baseline is now Node.js 22.13.0+ and npm 10+. README, CONTRIBUTING, and repository guidance have been refreshed for setup, migration, monitoring, secret safety, and contribution workflow.

Before upgrading, back up config and reward history, review MongoDB settings in `config.default.jsonc`, and test the LowDB-to-MongoDB migration on a copy of the data. After migration, verify pending and received reward totals, review payout and maintenance wallet settings, build and smoke-test the dashboard, and check `/api/health`. Unlock payouts only after verifying startup logs and pool status.

Release and repository: [github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)

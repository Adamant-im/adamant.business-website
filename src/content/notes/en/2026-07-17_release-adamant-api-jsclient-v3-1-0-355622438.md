---
title: "ADAMANT API JS Client v3.1.0"
slug: "release-adamant-api-jsclient-v3-1-0-355622438"
description: "This release is an SDK update coordinated with ADAMANT Node v0.10.2. It completes the typed read only Node API surface, adds opt in live block and balance subscriptions, synchro…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.1.0"
publishedAt: "2026-07-17T10:54:11Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:355622438"
locale: "en"
placeholder: false
---

This release is an SDK update coordinated with ADAMANT Node v0.10.2. It completes the typed read-only Node API surface, adds opt-in live block and balance subscriptions, synchronizes delegate and network-status DTOs with the authoritative schema, and refreshes package tooling.

## Complete typed read-only Node API

This version adds `getTopAccounts()` with typed `limit`, `offset`, and `isDelegate` options, where `limit: 0` can be used for count-only metadata. It completes option types for blocks, delegates, delegate search and statistics, peers, pooled transactions, and transaction time ranges. The release exposes typed consensus codename and activation schedules, block reward milestones, and delegate lifetime forged amounts. It also extends the packaged consumer checks so the new methods and response contracts are verified from the built npm artifact.

## Endpoint-aware query handling

The SDK now scopes direct-transfer and other control parameters to endpoints that support them. It removes known unsupported controls before a request is sent instead of allowing them to become ineffective or invalid filters, while preserving deterministic query-string order. The client warns when mixed `and` / `or` conditions rely on the Node's flat, order-sensitive SQL expression model, and keeps amount filters limited to `/api/transactions`, where the Node actually applies them.

## Client WebSocket state subscriptions

This release adds opt-in `onNewBlock()` subscriptions for compact headers of newly applied blocks, as well as `onBalanceChange()` subscriptions for confirmed balance, unconfirmed balance, or both. Balance payloads are treated as current absolute values rather than deltas, and partial-field delivery is documented. Block and balance subscriptions are restored automatically after reconnecting to the same or another healthy node. Handler failures are routed through the existing `.catch()` path, and handlers can be removed through `.off()`. These events are best-effort live notifications, not durable streams. Applications should restore state through REST after disconnections when correctness depends on complete history.

## Authoritative DTO synchronization

API types are regenerated from `Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90`. The release adds `consensusCodeName`, `consensusSchedule`, and `milestoneSchedule` to network status contracts, and adds the delegate lifetime `forged` value while retaining the distinct delegate-search response shape. It corrects the generated delegate property `producedlocks` to the runtime property `producedblocks`, and documents next-forger, delegate, peer, and pooled-transaction snapshot and filtering semantics.

## Package and tooling maintenance

The package version is set to `3.1.0` and declares Node.js `>=22.12.0`. pnpm is updated to 11.13.1 with refreshed runtime and development dependencies without adding direct dependencies. The resolved lockfile graph is reduced from 886 to 876 package entries. Formatting is aligned with Prettier 3.9, and local AI-agent and editor directories are kept out of the repository. Publishing is done through npm Trusted Publishing with GitHub Actions provenance.

## Compatibility notes

New top-account, network-status, delegate, block, and balance-event capabilities require ADAMANT Node v0.10.2. Transaction byte layout, hashes, IDs, signatures, encryption, root exports, node selection, retries, and failover behavior are unchanged. The diff includes 17 files changed with 1,471 insertions and 513 deletions, covering the complete `v3.0.0..master` history for the typed API, generated DTOs, WebSocket subscriptions, tests, documentation, version metadata, and dependency refresh.

## Validation

Verified on Node.js 22.23.1 and pnpm 11.13.1. All checks passed: `npm run compile`, `npm run typecheck`, `npm test` (19 suites and 253 tests passed), `npm run lint`, `npm run test:package` (ESM, CommonJS, live consumers, package subpaths, and TypeScript declarations), `npm run api-types:check`, `npm run metadata:check`, `npm run docs:build`, and `git diff --check`. Generated API types match the pinned `adamant-schema` revision, and wallet metadata matches `Adamant-im/adamant-wallets@54a820b6dc5e0ec77c3a6fbac91d2f7809a2f5b7`.

### Breaking changes

The package engine floor changes from Node.js `>=22` to `>=22.12.0`. Deployments that also run ADAMANT Node v0.10.2 should use the Node's required Node.js `>=22.13.0`. TypeScript consumers using the typoed `DelegateDto.producedlocks` property must migrate to `producedblocks`. Consumers that manually construct generated delegate or network-status DTOs may need to provide the newly required fields. TypeScript callers that passed endpoint-incompatible query controls must use the option type for the intended endpoint.

---
title: "Complete typed read-only access to ADAMANT Node APIs"
slug: "discussion-67-complete-typed-read-only-access-to-adamant-node-apis-10446764"
description: "The adamant api SDK now exposes a complete typed surface for the read heavy ADAMANT Node APIs used by explorers, monitoring services, wallets, bots, and other integrations. Cons…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/67"
publishedAt: "2026-07-17T10:54:30Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10446764"
locale: "en"
placeholder: false
---

The `adamant-api` SDK now exposes a complete typed surface for the read-heavy ADAMANT Node APIs used by explorers, monitoring services, wallets, bots, and other integrations. Consumers no longer need generic `api.get()` calls or local response casts for the main account, block, delegate, peer, pool, and network-status queries introduced or expanded in ADAMANT Node v0.10.2.

## Coverage

The SDK exposes `getTopAccounts()` with typed pagination and delegate filtering. The response includes the Node's deterministic balance ordering and pagination metadata; `limit: 0` requests count-only metadata without returning account rows.

```ts
const topDelegates = await api.getTopAccounts({
  limit: 50,
  offset: 0,
  isDelegate: 1,
});

const countOnly = await api.getTopAccounts({limit: 0});
```

Public option types now cover block lists and lookups, delegate lists with single-delegate lookup, username search, forging statistics, voters, and next-forger projections, connected peer lists and exact peer lookup, pooled transaction lists and lookups, and inclusive transaction-time ranges. This makes the SDK usable as a typed boundary for read-only services rather than only as a signing and broadcast helper.

The generated contracts now expose `consensusCodeName`, the effective `consensusSchedule`, the complete block reward `milestoneSchedule`, and delegate lifetime `forged` values as base-10 integer strings. The runtime `producedblocks` property replaces the previous generated `producedlocks` typo. A service can retrieve the public chain projection without locally redefining the response:

```ts
const [network, node] = await Promise.all([
  api.getStatus(),
  api.getNodeStatus(),
]);

console.log(network.consensusCodeName);
console.log(node.consensusSchedule, node.milestoneSchedule);
```

## Endpoint-aware query semantics

The ADAMANT Node transaction query language is flat rather than a nested Boolean expression tree. It serializes conditions into one SQL expression in query-string order, with normal SQL precedence and no parentheses added for `and: {}` or `or: {}` objects. The SDK therefore combines ordinary top-level filters with `and` by default, preserves JavaScript object insertion order during serialization, and warns when mixed `and` / `or` conditions make wire order semantically significant. It scopes controls such as `includeDirectTransfers`, `returnAsset`, and `userId` to compatible endpoints, removes known unsupported controls before sending the request, and permits amount filters only on `/api/transactions`, where the Node actually applies them. This is intentionally stricter than forwarding every shared option to every endpoint — a typed call should represent behavior the selected Node route actually implements.

## Schema provenance and compatibility

`src/api/generated.ts` is reproducibly generated from `Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90`. The repository verifies the generated file with `npm run api-types:check`, while package-consumer tests compile the exported declarations and exercise the built ESM and CommonJS entry points. The `producedlocks` to `producedblocks` correction is a compile-time compatibility change; consumers that construct delegate or status fixtures manually may need to add the newly required fields. Runtime response handling remains pass-through — older Node responses are not transformed or rejected by the SDK.

## Live state alongside snapshot reads

The same Node v0.10.2 alignment adds opt-in WebSocket handlers for compact `newBlock` events and confirmed or unconfirmed `balances/change` events. Subscriptions are restored after reconnecting, and balance values are absolute replacements rather than deltas. These events complement the typed REST reads but do not replace them: there is no replay or initial balance snapshot, a balance payload can contain only the fields that changed, and events delivered while disconnected are not backfilled. Critical clients should reconcile blocks and balances through REST after reconnecting.

## Compatibility boundaries

New top-account, network-status, delegate, block, and balance-event capabilities require ADAMANT Node v0.10.2. Existing transaction construction, byte layout, hashing, IDs, signatures, encryption, retries, failover, and active-node selection are unchanged. The package root remains ADM-focused; external-coin helpers continue to use explicit subpath exports. The SDK requires Node.js 22.12.0 or newer, while ADAMANT Node v0.10.2 operators should follow the Node's 22.13.0-or-newer requirement.

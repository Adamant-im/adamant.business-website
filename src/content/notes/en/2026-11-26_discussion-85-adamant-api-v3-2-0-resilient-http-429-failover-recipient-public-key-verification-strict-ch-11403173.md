---
title: "adamant-api v3.2.0: HTTP 429 Failover, Public-Key Verification, and Strict Query Filters"
slug: "discussion-85-adamant-api-v3-2-0-resilient-http-429-failover-recipient-public-key-verification-strict-ch-11403173"
description: "With ADAMANT Node v0.11.0 introducing default REST/WebSocket anti abuse rate limits, strict AND only query validation on chat and KVS endpoints, and consolidated OpenAPI sources…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/85"
publishedAt: "2026-11-26T06:52:55Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:11403173"
locale: "en"
placeholder: false
---

With ADAMANT Node v0.11.0 introducing default REST/WebSocket anti-abuse rate limits, strict AND-only query validation on chat and KVS endpoints, and consolidated OpenAPI sources under `Adamant-im/adamant`, `adamant-api` has been updated to harden node failover, readiness, and query serialization across both v0.11.0+ and earlier nodes.

## Resilient HTTP 429 Failover and Cooldowns

ADAMANT Node v0.11.0 enforces per-IP aggregate (`all`) and route-class (`status`, `read`, `publish`) HTTP budgets and responds with `429`, `Retry-After` / `RateLimit-Reset`, and `RateLimit-Scope`.

Each request captures `targetNode = this.node` before sending so late concurrent errors never rotate `this.node` back onto a node that another request already failed over from. Concurrent `updateNodes()` calls share a single in-flight `updateNodesPromise` instead of returning early, and a forced failover joining a planned sweep upgrades it to forced rotation with `failedNode`.

Because `/api/node/status` is billed to the higher-cap `status` bucket (12,000/min vs 3,000/min for `read`), a rate-limited node still answers health checks. `NodeManager` now tracks per-node 429 cooldowns (`rateLimitedUntil`, capped at 60s) so both forced and planned sweeps prefer non-rate-limited synced nodes across 2-node and 3+-node pools.

When no alternate synced node is available, idempotent reads honor `Retry-After` / `RateLimit-Reset` with jitter up to 10s; if the node's reset window exceeds that cap or retries are exhausted, the SDK returns promptly with optional metadata on `AdamantApiResult`:

```ts
const response = await api.getBlocks();

if (!response.success) {
  if (response.status === 429 && response.retryAfterMs !== undefined) {
    console.warn(`Rate-limited (${response.rateLimitScope}), retry in ${response.retryAfterMs}ms`);
  }
}
```

Non-idempotent `POST` requests (transaction submissions) are never replayed on HTTP responses, including `429`.

## Plain Filter Names, Strict Endpoint Types, and POST /api/states/get

The `/api/states/get`, `/api/chats/get`, and `/api/chatrooms/*` endpoints now receive plain filter names. The `and: { ... }` wrappers are flattened, while unsupported `or` wrappers are rejected client-side with `success: false`. This fixes issue #97 on pre-v0.11.0 nodes and matches v0.11.0 strict validation.

`ChatroomsOptions`, `ChatTransactionsOptions`, and `KVSOptions` now mirror the exact fields accepted by ADAMANT Node v0.11.0, including `toHeight` on `/api/chats/get` and `/api/states/get`, while excluding height/range fields rejected on `/api/chatrooms/*`. The deprecated `userId` on `/api/chatrooms/*` is stripped at runtime with a dedicated deprecation warning.

Large KVS lookups can now use `POST /api/states/get`:

```ts
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

`getKVS(..., {method: 'POST'})` uses the SDK's idempotent read retry policy, preserving full 429 and 5xx failover.

## Usable-Node Readiness and Loader State Filtering

`NodeManager` now inspects `/api/node/status` `loader.loaded` and `loader.syncing` fields. Nodes that are still loading (`loaded: false`) or syncing (`syncing: true`) are excluded from active API selection and WebSocket connection lists; nodes without a `loader` object remain eligible. With `checkHealthAtStartup: true`, `onReady` waits until a usable node is actually selected rather than firing after a failed initial health sweep.

## Local Recipient and Delegate Public-Key Verification

`encodeMessage()` and `decodeMessage()` now reject non-canonical, off-curve, and small-order (orders 1, 2, 4, and 8) Ed25519 keys with `invalid key`. `getPublicKey()` validates ADM addresses locally before making a network request and verifies that node-returned keys locally derive the requested address before caching or returning them. `sendMessage()` locally re-verifies resolved keys before encrypting and returns `{success: false, errorMessage}` on mismatch; `voteForDelegate()` enforces address binding and uses per-client delegate caches.

## OpenAPI Source Consolidation and Supply-Chain Hardening

`scripts/sync-api-types.mjs` now pulls the OpenAPI 3.2 spec directly from `Adamant-im/adamant` (`openapi/specification/openapi.yaml`), generating `RateLimitErrorResponseDto` and `GetKVSRequestBody`. The `pnpm-workspace.yaml` enforces a 7-day dependency release-age quarantine (`minimumReleaseAge: 10080`) with explicit `allowBuilds` and 0 production audit vulnerabilities.

## References

- SDK PR (Node v0.11.0 alignment & dependencies): https://github.com/Adamant-im/adamant-api-jsclient/pull/105
- Recipient & delegate public-key verification: https://github.com/Adamant-im/adamant-api-jsclient/pull/110
- Plain chat & KVS filters fix: https://github.com/Adamant-im/adamant-api-jsclient/pull/101
- Usable-node `onReady` fix: https://github.com/Adamant-im/adamant-api-jsclient/pull/102
- ADAMANT Node v0.11.0: https://github.com/Adamant-im/adamant/pull/303
- SDK Documentation: https://js.docs.adamant.im
- OpenAPI Swagger UI: https://docs.adamant.im/schema/

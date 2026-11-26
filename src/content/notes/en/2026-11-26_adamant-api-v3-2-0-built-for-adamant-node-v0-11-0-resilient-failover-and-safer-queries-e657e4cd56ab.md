---
title: "adamant-api v3.2.0: Built for ADAMANT Node v0.11.0, Resilient Failover, and Safer Queries"
slug: "adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
description: "cryptofoundry presents a summary of adamant api v3.2.0, the official TypeScript and Node.js SDK for the ADAMANT blockchain, coordinated with ADAMANT Node v0.11.0. Building decen…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
publishedAt: "2026-11-26T07:08:23.535Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:e657e4cd56ab"
locale: "en"
placeholder: false
---

cryptofoundry presents a summary of adamant-api v3.2.0, the official TypeScript and Node.js SDK for the ADAMANT blockchain, coordinated with ADAMANT Node v0.11.0.

Building decentralized apps, trading bots, explorers, or payment integrations directly against raw blockchain HTTP endpoints means reinventing the same reliability and cryptography plumbing repeatedly: selecting synced nodes, retrying transient outages without duplicating transactions, encrypting messages with NaCl, signing deterministic transactions, and keeping TypeScript DTOs aligned with node upgrades. The SDK handles this out of the box with zero-boilerplate resilience (pass a list of independently operated HTTPS nodes and the SDK monitors health, checks sync heights, skips outdated or loading nodes, and fails over automatically), modular subpath imports, end-to-end TypeScript safety with DTOs generated from the authoritative ADAMANT Node OpenAPI 3.2 specification, and live Socket.IO subscriptions with automatic recovery after reconnects.

### Local Recipient & Delegate Public-Key Verification

Before encrypting a message or voting for a delegate, v3.2.0 verifies locally that every Ed25519 public key returned by a node is a canonical, on-curve, non-small-order 32-byte key and cryptographically derives the requested ADM address. Malformed, off-curve, small-order (orders 1, 2, 4, and 8), or mismatched keys are rejected cleanly before caching or encryption, and delegate caches are isolated per `AdamantApi` instance.

### Critical Correctness & Security Fix for KVS and Chat Queries

In v3.0.0 and v3.1.0, `getKVS()`, `getChatTransactions()`, `getChats()`, and `getChatMessages()` sent `and:`-prefixed filters that pre-v0.11.0 nodes silently ignored while still returning `success: true` with unfiltered records. In v3.2.0, these methods always send plain filter names (flattening explicit `and: { ... }` wrappers) and reject unsupported `and:` wrappers and pre-prefixed keys client-side. Every 3.x application reading KVS or chat data should upgrade to v3.2.0.

### Resilient HTTP 429 Handling for Node v0.11.0

ADAMANT Node v0.11.0 enables production HTTP and WebSocket anti-abuse limits by default. When a node returns HTTP 429, idempotent reads (GET and POST `/api/states/get`) rotate immediately to another cached synced node while the rate-limited node enters a bounded cooldown (up to 60 seconds) so health checks do not bounce traffic straight back to it. Parallel requests hitting a rate-limited node share a single deduplicated health sweep instead of hammering `/api/node/status` or flipping the active node back and forth. On single-node setups or when a node's reset window exceeds the SDK's 10-second bounded wait, `AdamantApiResult` now exposes optional `status`, `retryAfterMs`, and `rateLimitScope` fields so bots can schedule retries cleanly. Transaction-publishing POST calls are never replayed automatically after receiving an HTTP response.

### Smarter Startup Readiness

Services booting alongside a local node often saw `onReady` fire while the node was still loading memory tables or catching up with the chain. In v3.2.0, nodes reporting `loader.loaded: false` or `loader.syncing: true` are excluded from primary API and WebSocket selection. `onReady` (and `api.isReady`) waits with capped startup retry backoff (5s, 10s, 30s, 60s) until a usable node is actually ready to serve queries, and initialized clients have a height-bounded syncing fallback if all fully synced nodes go down.

### POST /api/states/get and Strict v0.11.0 Type Alignment

To query dozens or hundreds of KVS keys or sender addresses without hitting URL length limits, pass `{method: 'POST'}` to `getKVS()`:

```js
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

TypeScript interfaces (`ChatroomsOptions`, `ChatTransactionsOptions`, and `KVSOptions`) now mirror ADAMANT Node v0.11.0's strict query validation so unsupported fields are caught at compile time, and the OpenAPI generator now syncs directly from `Adamant-im/adamant`.

### Supply-Chain Security & 7-Day Quarantine

Following the ADAMANT security policy introduced in Node v0.11.0, adamant-api now enforces a 7-day release-age quarantine (`minimumReleaseAge: 10080` in `pnpm-workspace.yaml`), restricts dependency lifecycle scripts via `allowBuilds`, ships with 0 production `pnpm audit` vulnerabilities, and publishes to npm with GitHub Actions Trusted Publishing provenance.

```
npm install adamant-api@3.2.0
```

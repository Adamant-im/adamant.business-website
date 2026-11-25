---
title: "ADAMANT API JS Client v3.2.0"
slug: "release-adamant-api-jsclient-v3-2-0-458278457"
description: "ADAMANT API JS Client v3.2.0 is a security and correctness release coordinated with ADAMANT Node v0.11.0. All v3.0.0 and v3.1.0 consumers should upgrade to v3.2.0. Recipient and…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.2.0"
publishedAt: "2026-11-25T15:08:18Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:458278457"
locale: "en"
placeholder: false
---

ADAMANT API JS Client v3.2.0 is a security and correctness release coordinated with ADAMANT Node v0.11.0. All v3.0.0 and v3.1.0 consumers should upgrade to v3.2.0.

## Recipient and delegate public-key verification

The SDK now enforces canonical 32-byte on-curve Ed25519 validation, rejecting non-canonical, off-curve, and small-order Curve25519 keys of orders 1, 2, 4, and 8, and performs local ADM address derivation checks before caching or encrypting messages. The `getPublicKey()` method returns an empty string without a network request for invalid ADM addresses and returns an empty string without poisoning the cache when a node returns a mismatched or malformed key. `sendMessage()` locally re-verifies resolved recipient keys and rejects invalid or mismatched keys with a `{success: false, errorMessage}` result, while `voteForDelegate()` rejects delegate keys failing address binding. A `Map`-backed `publicKeysCache` is verified on both writes and reads, and network-dependent delegate caches (`byAddress`, `byUsername`) are isolated per `AdamantApi` instance.

## KVS and chat filter fix

The methods `getKVS()`, `getChatTransactions()`, `getChats()`, and `getChatMessages()` now emit plain filter names, flattening explicit `and: { ... }` wrappers, matching the documented node contract across every ADAMANT Node version. Unsupported `or` wrappers and pre-prefixed `and:` or `or:` filter keys on AND-only endpoints are rejected client-side with `{success: false, errorMessage}` instead of sending prefixes that older nodes ignore and v0.11.0+ nodes reject. This was verified with a recorded mainnet `/api/states/get` fixture test.

## Usable-node readiness and loader filtering

Nodes reporting `loader.loaded: false` or `loader.syncing: true` are excluded from primary active node selection and WebSocket connection lists, while legacy nodes without a `loader` object remain eligible. The `onReady` callback (and `api.isReady`) is held until a usable node is actually selected, retrying startup checks with capped backoff of 5s, 10s, 30s, and 60s, continuing even if an earlier sweep throws, instead of waiting for the 5-minute periodic sweep. When already initialized and all ready nodes fail or fall below `minVersion`, the SDK falls back with a warning to a `minVersion`-compatible loaded-but-syncing node only when a recent synced height reference is available within 10 minutes and the candidate is within 25 blocks of that height. The `onReady` callback is prevented from double-firing if it throws, and non-object responses such as HTML 200 maintenance pages, null, or incomplete `{success: true}` status payloads are safely skipped.

## ADAMANT Node v0.11.0 API, OpenAPI, and KVS POST alignment

Deterministic API DTO generation (`scripts/sync-api-types.mjs`) has migrated from the archived `Adamant-im/adamant-schema` repository to `Adamant-im/adamant` (`openapi/specification/openapi.yaml` at released v0.11.0 master commit `50568f37dc2b7da86f44991f96c40c8edde74d67`), reading exact installed tool versions via `createRequire`. The generated `src/api/generated.ts` has been regenerated with `RateLimitErrorResponseDto`, `GetKVSRequestBody`, and updated `https://docs.adamant.im/` links. Endpoint option types (`ChatroomsOptions`, new `ChatTransactionsOptions`, and `KVSOptions`) are aligned with ADAMANT Node v0.11.0 strict filter validation, with `toHeight` enforced on `/api/chats/get` and `/api/states/get` and height/range filters excluded from `/api/chatrooms/*`. `ChatroomsOptions.userId` is deprecated and stripped at runtime on `/api/chatrooms/*` with a dedicated one-time deprecation warning so legacy callers do not fail validation on v0.11.0+ nodes. Support for `POST /api/states/get` has been added via `api.getKVS(options, {method: 'POST'})` for large `keyIds` or `senderIds` queries, with full idempotent read failover matching `GET`.

## Resilient HTTP 429 and failover hardening

The SDK captures `targetNode` before each request so concurrent failures never flip `this.node` back to a failed node. On multi-node HTTP 429 responses, it switches immediately to another cached synced, non-rate-limited node without extra `/api/node/status` probes, skips health sweeps on single-node 429 responses, and handles 429 in `checkNode()` distinctly from offline nodes. Concurrent `updateNodes()` sweeps are deduplicated via an in-flight promise, and an in-flight planned sweep is upgraded to forced failover when a request reports a failed node. The SDK rotates away from `failedNode` across both 2-node and 3+-node synced sets and tracks per-node 429 cooldowns (`rateLimitedUntil`, capped at 60s) so forced and planned health sweeps avoid rate-limited nodes until the cooldown expires. It parses `Retry-After` (seconds or HTTP-date), `RateLimit-Reset`, and `RateLimit-Scope` headers, fails over immediately for idempotent reads (`GET` and `POST /api/states/get`) when another synced node exists, or honors bounded backoff with jitter up to 10s on a single node without tight-looping. Optional `status`, `retryAfterMs`, and `rateLimitScope` metadata are exposed on HTTP 429 failure results in `AdamantApiResult`, while write `POST` requests remain strictly non-replayed.

## Dependency security refresh and 7-day release-age quarantine

The release enforces `minimumReleaseAge: 10080` (7 days) and explicit `allowBuilds` settings (`'@parcel/watcher': false`, `esbuild: true`, `unrs-resolver: true`) in `pnpm-workspace.yaml` with zero release-age exclusions. Direct and transitive dependencies have been refreshed past the 7-day cutoff, including axios, bitcoinjs-lib, tiny-secp256k1, pbkdf2, socket.io-client, bip39, ecpair, semver, @redocly/cli, eslint, jest, prettier, and swagger-typescript-api, reducing production audit findings from 20 to 0. Publishing is performed via GitHub Actions npm Trusted Publishing with build provenance.

## Validation

Verified on Node.js v24.19.0 and pnpm 11.13.1. The full test suite (`pnpm test`) covers 20 suites and 333 tests with 100% function coverage, and `gts lint` passed. API type checks match the referenced ADAMANT and adamant-wallets commits. TypeDoc and VitePress documentation builds passed. Package tests for ESM, CommonJS, live consumers, package subpaths, and TypeScript declarations passed. Production audit reports 0 vulnerabilities, and all 893 locked packages have verified signatures.

### Breaking changes

The `encodeMessage()` and `decodeMessage()` functions now throw `invalid key` for non-canonical, off-curve, and small-order Ed25519 keys of orders 1, 2, 4, and 8. Legitimate mainnet keys are unaffected. The `getPublicKey()` method returns an empty string without a network request for invalid ADM addresses and also returns an empty string when the node's key does not derive the address. The `sendMessage()` method rejects such recipients with `{success: false, errorMessage}`, and `voteForDelegate()` rejects delegate keys failing address binding.

TypeScript query option narrowing changes `ChatroomsOptions` and `KVSOptions` so they no longer inherit unsupported `TransactionQueryParameters` fields that ADAMANT Node v0.11.0 rejects. The `getChatTransactions()` method now uses `ChatTransactionsOptions`, a superset of `ChatroomsOptions` retaining `fromHeight`, `toHeight`, `inId`, and `isIn`. `TransactionQueryParameters` remains exported unchanged.

Calling `transformTransactionQuery(query, 'states' | 'chats' | 'chatrooms')` directly with an `or` wrapper or pre-prefixed `and:` or `or:` filter keys now throws an `Error` with the `badParameter` message, whereas `AdamantApi` client methods return `{success: false, errorMessage}`.

The `toHeight` filter on `getKVS()` and `getChatTransactions()` is enforced only by ADAMANT Node v0.11.0+. Older nodes silently ignore `toHeight` and return newer records with `success: true`, so callers relying on an upper height bound should set `minVersion: '0.11.0'`.

The `userId` field on `/api/chatrooms/*` is deprecated on `ChatroomsOptions` and stripped at runtime with a dedicated warning. Callers should pass the account address only as the URL path argument of `getChats(address)` or `getChatMessages(address1, address2)`.

With `checkHealthAtStartup: true`, `onReady` now waits and `api.isReady` stays `false` until a usable, loaded, non-syncing node is selected, retrying startup checks with 5s, 10s, 30s, and 60s backoff.

Optional `status`, `retryAfterMs`, and `rateLimitScope` fields are added to the `success: false` variant of `AdamantApiResult` when a request fails with HTTP 429.

Transaction byte layout, hashes, IDs, signatures, encryption, wallet derivation, and root exports are unchanged.

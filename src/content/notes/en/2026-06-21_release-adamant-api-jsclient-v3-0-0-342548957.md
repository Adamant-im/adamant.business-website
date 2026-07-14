---
title: "ADAMANT API JS Client v3.0.0"
slug: "release-adamant-api-jsclient-v3-0-0-342548957"
description: "ADAMANT API JS Client v3.0.0 This is a major SDK release coordinated with ADAMANT Node v0.10.0. It updates the HTTP and WebSocket client for the current node API, introduces sta…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.0.0"
publishedAt: "2026-06-21T15:22:41Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:342548957"
locale: "en"
placeholder: false
---

# ADAMANT API JS Client v3.0.0

This is a major SDK release coordinated with ADAMANT Node v0.10.0. It updates the HTTP and WebSocket client for the current node API, introduces stable modular package boundaries, improves retry and failover behavior, adds deterministic generated metadata, and replaces the legacy Wiki-first documentation with a source-controlled VitePress and TypeDoc site.

## ADAMANT Node v0.10.0 support

The release regenerates API DTOs from a pinned `adamant-schema` revision, including millisecond timestamps, loader and status data, numeric counts, and nullable unconfirmed-transaction fields. It adds current transaction and chat query parameters such as `returnUnconfirmed`, `includeDirectTransfers`, delegate lookup by address, and multi-type transaction queries. Transaction query filters are now combined with logical `and` by default, and amount filters are scoped to transfer transactions. The SDK adds optional `timestampMs` transaction construction and `getEpochTimeMs`; because `timestampMs` is not part of signed bytes, hashes, IDs, and signatures are preserved. Health checks are updated for the consolidated node status response and support inclusive minimum-node-version filtering.

## Reliability and WebSocket behavior

The client no longer retries explicit rejected POST responses, returning structured, non-retryable HTTP failures instead of looping. Retry and active-node failover are preserved for safe requests and network failures that lack an HTTP response. WebSocket subscriptions now support multiple addresses, transaction types, and chat asset types, with transaction and message convenience handlers, connection and reconnection callbacks, explicit connect and disconnect, typed connection errors, listener cleanup, and bounded reconnection handling.

## Modular SDK and npm package

The package root remains ADM-focused and prevents loading coin-specific implementations. Subpath exports are added for ADM, API DTOs, transactions, metadata, and BTC, ETH, DASH, and DOGE helpers, retaining both CommonJS and ESM support. Deterministic wallet metadata is synced from a pinned `adamant-wallets` revision. Lisk and Klayr code and dependencies are removed, and supported external-coin derivation and address validation are standardized. The release requires Node.js 22 or later, adopts pnpm workspace metadata, modernizes TypeScript and dependencies, and adds consumer-level tarball tests.

## API fixes retained since v2.4.0

This release fixes delegate voting and health-check behavior. It allows string payloads for signal messages and validates amounts only for message types that carry amounts. Transaction IDs are represented as strings, and validator utilities are exported.

## Documentation, automation, and maintenance

Documentation is provided through a VitePress site with a TypeDoc-generated API reference and guides. The release includes a GitHub Pages docs workflow with CNAME, refreshed README and CONTRIBUTING files, deterministic schema and metadata sync checks, a custom Jest runner, package-consumer tests, expanded coverage, and module-boundary tests. Linting and TypeScript configuration are migrated to the current toolchain, and obsolete files are removed.

### Breaking changes

WebSocket subscriptions now default to `allDirections`. Previously the client delivered only incoming transactions with a hard-coded `recipientId === admAddress` filter; it now emits both incoming and outgoing transactions by default. To restore the old behavior, pass `direction: 'incoming'` in the WebSocket client options. Node.js 22 or later is required. Coin helpers must be imported from explicit paths such as `adamant-api/coins/btc` and are no longer exported from the package root. Lisk and Klayr support has been removed. Transaction query filters now use logical `and` by default, and amount filters apply only to transfer transactions. Consumers should review deprecated `withoutDirectTransfers` usage and migrate to `includeDirectTransfers`.

Transaction byte layout, signing, IDs, and signature semantics are unchanged. Both CommonJS and ESM consumers are covered by the packaged-tarball test.

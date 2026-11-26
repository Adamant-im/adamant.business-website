---
title: "ADAMANT Node v0.11.1: Security Hardening, Encrypted Forging, and Consolidated Docs"
slug: "discussion-84-adamant-node-v0-11-1-security-hardening-encrypted-forging-and-consolidated-docs-11400159"
description: "ADAMANT Node v0.11.1 is a major security and reliability release for node operators, delegates, pool operators, explorers, messengers, and other services that communicate with A…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/84"
publishedAt: "2026-11-25T19:56:21Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:11400159"
locale: "en"
placeholder: false
---

ADAMANT Node v0.11.1 is a major security and reliability release for node operators, delegates, pool operators, explorers, messengers, and other services that communicate with ADAMANT nodes. It is the first tagged release of the v0.11 line; v0.11.0 was merged to `master` but never tagged, so operators running from `master` should also upgrade.

Upgrading is strongly recommended. There is no consensus fork and no new SQL migration: serialization, signatures, delegate ordering, rewards, fees, activation heights, and slot timing are unchanged from v0.10.2. However, breaking changes in the HTTP API and runtime requirements mean operators should read the upgrading guide before proceeding.

## Before You Upgrade

Node.js 22.22.2+ (on 22.x) or 24.15.0+ is now required. Legacy forging and DApp runtime control APIs have been removed entirely (GHSA-vjhq-r5fg-85cx). Forging is now configured through `forging.secret` in `config.json`; read-only DApp APIs and DApp transaction types are unaffected. Filters on states, chats, and chatrooms are now strict: `and:` filters work as expected, while `or:`, misspelled, and unsupported parameters are rejected instead of silently ignored. The `keysIds` parameter has been renamed to `keyIds`. Rate limits are enabled by default; old `max: 0` limit blocks in `config.json` keep limiting disabled, so remove them to adopt the new defaults.

## Security and Hardening

The server-side DApp execution surface and HTTP forging control are removed entirely rather than patched, significantly reducing the attack surface.

Delegate passphrases in `forging.secret` can optionally be encrypted with an operator password using AES-256-GCM with scrypt key derivation. The node continues syncing and serving APIs while locked, and forging is unlocked locally with the `adm-node` CLI. Plaintext configs still work. Zabbix templates for lock state and delegate outcome are included.

Anti-abuse rate limits are added for public REST, peer HTTP, and WebSocket traffic, with a consistent `429` response. During the mixed-version rollout period, `/peer/*` requests without the new rate-limit header are not throttled, and any caller can omit it. Operators should add a limit for `/peer/*` at their reverse proxy or firewall until in-node enforcement is tracked and implemented.

Install and repair scripts are safer: snapshot checksums are verified, PM2 and systemd shutdown settings are graceful, and a syncing node is not restarted unless forced. Dependencies are refreshed with a 7-day release-age quarantine enforced in CI, with no moderate or higher audit findings.

## Reliability and Networking

The node now recovers PostgreSQL connections after a database restart instead of getting stuck. Peer health checks and response sizes are bounded, with backoff and eviction for unreachable peers. Outbound WebSocket connections are fixed for both peer rotation and the v0.11.0 regression where no outbound connections were made at all. Round settlement is bounded by height, and reward rollback is aligned per delegate; replay and recovery produced identical state on mainnet and testnet. A separate rollback issue remains open. A faster memory checkpoint guard query and updated seed peers round out the reliability work.

## API and Documentation

The `and:` filters now correctly honor `toHeight` and combined sender/recipient conditions. Documentation and the OpenAPI 3.2 specification now live in the node repository, so code, schema, and docs change together. The API schema is published at https://docs.adamant.im/schema/. Maintainers of API clients and tools should take the OpenAPI sources from the `openapi/` directory in the node repository going forward.

## How to Upgrade

Update Node.js to a supported version, then stop the node gracefully and wait for `Cleaned up successfully` — never use `kill -9`. Check out v0.11.1 and run `npm ci --omit=dev`. Review `config.json` for rate limit blocks, `trustProxy`, and any automation that calls removed endpoints. Start the node; with encrypted passphrases, run `npm run adm-node -- forging unlock` after every restart. Verify `/api/node/status`, sync progress, peer connections, and forging status.

Before release, v0.11.0 ran on a mainnet node with four delegates and encrypted passphrases for more than 16 hours: 471 blocks forged, none missed after restart. The one release-specific problem found — the outbound WebSocket regression — is fixed in v0.11.1.

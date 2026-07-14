---
title: "ADAMANT Wallet Metadata 2.6.0: Developer Notes for Wallet Integrations"
slug: "discussion-55-adamant-wallet-metadata-2-6-0-developer-notes-for-wallet-integrations-10329995"
description: "ADAMANT Wallet Metadata 2.6.0 is prepared for release. This update is mainly relevant for developers who integrate ADAMANT built in crypto wallets, wallet metadata, node lists,…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/55"
publishedAt: "2026-06-27T13:42:14Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10329995"
locale: "en"
placeholder: false
---

ADAMANT Wallet Metadata `2.6.0` is prepared for release. This update is mainly relevant for developers who integrate ADAMANT built-in crypto wallets, wallet metadata, node lists, service definitions, or downstream wallet UI/configuration sync.

## What changed for wallet and service developers

The `adamant-wallets` repository is the canonical source for coin, token, blockchain, node, service, icon, and schema metadata used by ADAMANT apps. Version `2.6.0` refreshes both the metadata itself and the documentation around how downstream consumers should read it.

The metadata override model is now documented more clearly. Shared fields live in `assets/general/<coin-or-token>/info.json`, blockchain defaults live in `assets/blockchains/<blockchain>/info.json`, and blockchain-specific token overrides live in `assets/blockchains/<blockchain>/<token>/info.json`. The `README.md` now restores and expands field explanations for wallet metadata parameters, including nodes, services, fees, precision, icons, health checks, status flags, and transfer limits. The `specification/openapi.json` covers more wallet metadata fields and nested structures, helping SDKs, validators, schema consumers, and generated documentation stay closer to the real JSON shape. Repository-specific maintenance rules, validation expectations, issue/PR conventions, and metadata safety rules are now documented in `AGENTS.md` and `.github/CONTRIBUTING.md`.

## Metadata updates to review downstream

If your app, service, SDK, bot, or backend consumes ADAMANT wallet metadata directly or through bundled ADAMANT wallets, review the following changes.

ADAMANT node metadata was refreshed, and three unavailable ADM proxy nodes were removed: `tauri.bbry.app`, `endless.bbry.app`, and `debate.bbry.app`. Bitcoin, Dash, and Dogecoin metadata were updated, and Dogecoin address validation examples were fixed. The DAI GitHub link was corrected, and GT token naming was updated. Deprecated USDS metadata and related icon assets were removed. Package metadata, dependency lockfile, Node.js engine information, validation scripts, and repository links were also refreshed.

## Recommended checks for integrators

If you consume this repository in a wallet, exchange integration, monitoring service, mobile app, PWA, SDK, or custom backend, resync wallet metadata after the `2.6.0` release is merged to `master`. Check whether your code has hardcoded references to removed USDS metadata or the removed ADM proxy nodes, and re-run your metadata validation against the updated OpenAPI schema if you use generated types, validators, or schema-aware tooling.

Re-check wallet UI behavior for fields such as `status`, `defaultVisibility`, `defaultOrdinalLevel`, `decimals`, `cryptoTransferDecimals`, `minBalance`, `minTransferAmount`, `fixedFee`, `defaultFee`, and icon paths. Re-check node and service selection logic if your app uses `nodes`, `services`, `healthCheck`, `minVersion`, `hasIndex`, `alt_ip`, `txFetchInfo`, `txConsistencyMaxTime`, `timeout`, or reliability gas settings. Make sure your integration treats metadata as list-based configuration and does not pin a single endpoint unless your own fallback strategy is explicit.

## References

- Release issue: https://github.com/Adamant-im/adamant-wallets/issues/137
- Release PR: https://github.com/Adamant-im/adamant-wallets/pull/138
- Repository: https://github.com/Adamant-im/adamant-wallets
- ADAMANT Improvement Proposals: https://aips.adamant.im/

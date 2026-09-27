---
title: "ADAMANT Exchange Bot v3.0.0"
slug: "release-adamant-exchangebot-v3-0-0-397317563"
description: "ADAMANT Exchange Bot v3.0.0 is a major milestone release featuring an extensive modernization of the runtime stack, consensus grade funds safety protections, comprehensive test…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0"
publishedAt: "2026-09-26T16:47:34Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
repo: "adamant-exchangebot"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-exchangebot:397317563"
locale: "en"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0 is a major milestone release featuring an extensive modernization of the runtime stack, consensus-grade funds-safety protections, comprehensive test coverage, and operator usability improvements.

### Runtime and Architecture Modernization

The engine requirements have been updated to modern LTS Node.js 22.13 or later. Legacy `web3-eth` and `web3-utils` dependencies have been replaced with `ethers` v6 for Ethereum and ERC-20 token management. Bitcoin, Dash, and Dogecoin transaction building has been upgraded to BitcoinJS-lib 7 using Partially Signed Bitcoin Transactions (PSBT). Database queries have been modernized with MongoDB Driver 7, adopting the native Promise-based async API and eliminating legacy callbacks. Node connectivity has been migrated to `adamant-api` 3.x, using `AdamantApi` and `WebSocketClient`. Legacy Lisk (LSK) modules and configuration options have been completely removed. The project has adopted ESLint 9 flat configuration, Prettier 3, Jest 30, and markdownlint for modern tooling.

### Concurrency, Deposit Tracking, and Funds Safety

Mempool deposit monitoring has been introduced with a five-minute dispute window to protect against race conditions and double-claim exploits. Per-UTXO locking has been implemented to eliminate concurrent coin spends on UTXO blockchains including BTC, DASH, and DOGE. Incoming exchange and cancellation requests are now serialized per sender to prevent race conditions. Automatic recognition and fast-path handling for Dash InstantSend transactions has been added. A `unsupportedCoinGuard` safeguard has been introduced to handle unsupported coin transfers and network transport failures gracefully.

### Chat Commands and Operator UX

A `/cancel` chat command (also recognized as `cancel`) has been added, allowing users to cancel pending exchanges awaiting target coin clarification and receive automated refunds minus the network fee. Previous deposits are now automatically queued for refund when a user sends a new transfer while in `inUpdateState`. The `formatNumber` utility has been enhanced to format exponential numbers (`e+` and `e-`) into human-readable full decimal representation. Support for the Onyxcoin (XCN) ERC-20 token has been added to configurations and the coin registry.

### Configuration and Node Resilience

Pure schema validation has been implemented in `configSchema.js` with fail-fast startup checks to detect invalid configurations immediately. A resilient `nodeClient.js` has been built with round-robin and automatic failover across multiple RPC and REST endpoints. Granular per-coin overrides have been added for fees, confirmation limits, USD daily limits, and price bounds.

### Testing and Documentation

A comprehensive test suite of 31 Jest test suites covering 690 unit tests has been added, spanning helpers, crypto adapters, config schema validation, and exchange modules without external network or database dependencies. Operational documentation has been expanded with an `AGENTS.md` AI agent manual, `CONTRIBUTING.md`, and a modernized `README.md`.

### Breaking changes

The minimum supported Node.js version is now 22.13, requiring operators to upgrade their runtime environment. Legacy `web3-eth` and `web3-utils` have been replaced by `ethers` v6, which may affect any custom integrations relying on the previous Ethereum library APIs. Bitcoin, Dash, and Dogecoin transaction building now uses BitcoinJS-lib 7 with PSBT, changing the internal transaction construction flow. MongoDB Driver 7 replaces the previous driver, removing callback-based query patterns. All legacy Lisk (LSK) modules and configuration options have been completely removed, and operators with LSK-related configuration will need to remove those entries. Strict schema validation now enforces fail-fast startup, meaning previously tolerated invalid configuration values will cause the bot to refuse to start.

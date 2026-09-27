---
title: "ADAMANT Exchange Bot v3.0.0: Runtime Modernization and Consensus-Grade Funds Safety"
slug: "discussion-79-adamant-exchange-bot-v3-0-0-runtime-modernization-consensus-grade-funds-safety-and-deposit-10894868"
description: "ADAMANT Exchange Bot is self hosted software for running an instant, anonymous cryptocurrency exchange inside end to end encrypted ADAMANT Messenger chats. It operates hot walle…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/79"
publishedAt: "2026-09-26T17:12:03Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10894868"
locale: "en"
placeholder: false
---

ADAMANT Exchange Bot is self-hosted software for running an instant, anonymous cryptocurrency exchange inside end-to-end encrypted ADAMANT Messenger chats. It operates hot wallets across Bitcoin, Ethereum, Dash, Dogecoin, and ADAMANT without third-party custodians or exposed web interfaces. Version 3.0.0 modernizes the runtime stack, transitions cryptography and blockchain integration to current libraries, enforces consensus-grade funds-safety invariants through UTXO and request-level mutex locking, and adds an external deposit claims watcher with a 5-minute dispute window. Security auditing and maintenance are handled by cryptofoundry in collaboration with the ADAMANT developer community.

## Stack and Architecture Modernization

The codebase now targets Node.js 22.13+ LTS, with updated `package.json` engines and `.nvmrc` constraints. Ethereum and ERC-20 interactions fully replace legacy `web3-eth` and `web3-utils` with `ethers` v6, giving deterministic contract calls, accurate gas estimation, and reliable nonce management. Bitcoin, Dash, and Dogecoin transaction construction migrates to Partially Signed Bitcoin Transactions (PSBT) via `bitcoinjs-lib` 7, removing the deprecated `TransactionBuilder`. MongoDB 7 queries across `payments`, `incomingtxs`, and `systems` collections use native Promise-based async/await, eliminating callback patterns. Node client integration upgrades to `adamant-api` 3.x using `AdamantApi` and `WebSocketClient` with modern key-derivation helpers. Legacy Lisk (LSK) support is fully purged, including `@liskhq/*` dependencies, `lsk_utils.js`, `lskBaseCoin.js`, and related configuration options. Development tooling adopts ESLint 9 flat configuration, Prettier 3, and Jest 30.

## Concurrency Guarantees and Funds Safety Invariants

Unattended exchange operation demands consensus-grade financial safety: rates, fees, decimals, and balances must be exact, and payouts or refunds must remain strictly idempotent.

On UTXO-based chains, concurrent payouts or refunds previously risked race conditions where multiple transactions attempted to spend the same unspent outputs. v3.0.0 introduces an asynchronous memory mutex in `helpers/mutex.js` and `btcBaseCoin.js` that locks selected UTXOs during PSBT creation and signing. UTXOs stay locked until broadcast confirmation is verified on the network. If transaction assembly or broadcast fails, locked UTXOs are safely released back to the available pool, preventing stalled balances without risking double-spends.

Incoming chat commands, new transfer events, and cancellation requests from the same user are synchronized through a per-sender mutex lock in `incomingTxsParser.js`, eliminating race conditions when users send simultaneous transfers or trigger refunds during state transitions. Every payment record transitions through deterministic states (`inProcessing`, `needToSendBack`, `sent`, `refunded`) persisted to MongoDB before network transmission. If the bot restarts or loses connectivity mid-transfer, pending payments are reconciled and resumed without double-spending.

## Deposit Watcher and Claims Lifecycle

External deposits require correlating on-chain transactions with ADAMANT chat identities. `modules/depositWatcher.js` monitors unconfirmed and incoming transactions via each adapter's `getPendingIncomingTransactions` implementation without centralized webhooks. `modules/depositClaims.js` tracks deposit claims across their lifecycle to prevent duplicate claiming of the same on-chain transaction hash. A mandatory 5-minute dispute window guards against blockchain reorgs, race attacks, and double-claim exploits before payout execution. `modules/deepExchangeValidator.js` cryptographically verifies deposits against the sender's ADAMANT Key-Value Storage (KVS) address records, with caching and automatic retry logic.

## Exchange UX and Chat Command Enhancements

Users who send a deposit without specifying an exchange pair can issue `/cancel` (or `cancel`) in chat to cancel the pending exchange and automatically receive the deposit back, minus the network transaction fee. If a user with a deposit in `inUpdateState` sends a subsequent transfer rather than clarifying the target currency, the bot now queues the previous deposit for automatic refund instead of abandoning it. The `utils.formatNumber` helper was refactored to expand scientific notation (`e+` / `e-`) into human-readable full decimal strings before digit grouping and bolding, fixing malformed spaces or exponent artifacts on high-magnitude numbers or high-decimal tokens. Native configuration and registry support was added for the Onyxcoin (XCN) ERC-20 token.

## Configuration Schema and Multi-Node Failover

Configuration files (`config.jsonc`, `config.default.jsonc`) are strictly validated against declarative schemas in `modules/configSchema.js` at startup. Missing keys, unknown cryptocurrencies in `accepted_crypto`, or coins configured without nodes trigger immediate fail-fast errors. The resilient multi-node client in `helpers/cryptos/nodeClient.js` automatically round-robins and fails over HTTP and JSON-RPC calls across configured endpoints, handling offline or desynchronized blockchain nodes. Operators can specify ticker-specific overrides for network fees (`exchange_fee_<COIN>`), required confirmations (`min_confirmations_<COIN>`), daily USD volume limits (`daily_limit_usd_<COIN>`), and pricing limits (`fixed_buy_price_usd_<COIN>`, `min_sell_price_usd_<COIN>`).

## Testing and AI Operating Manual

The test suite comprises 31 Jest test suites and 690 unit tests covering core exchange modules, cryptocurrency adapters, configuration schemas, and utilities without requiring live nodes, MongoDB, or real private keys. Repository conventions, technical architecture, invariant guidelines, and change discipline rules are formalized in `AGENTS.md`.

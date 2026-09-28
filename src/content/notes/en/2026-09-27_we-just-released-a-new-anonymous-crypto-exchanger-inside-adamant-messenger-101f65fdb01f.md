---
title: "ADAMANT Exchange Bot v3.0.0: A Self-Hosted Anonymous Crypto Exchanger Inside ADAMANT Messenger"
slug: "we-just-released-a-new-anonymous-crypto-exchanger-inside-adamant-messenger-101f65fdb01f"
description: "ADAMANT Exchange Bot v3.0.0 turns a chat into a self hosted instant crypto exchange with stronger funds safety controls, a modernized runtime, and a smoother operator experience…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/we-just-released-a-new-anonymous-crypto-exchanger-inside-adamant-messenger-101f65fdb01f"
publishedAt: "2026-09-27T13:54:25.207Z"
author: "Alex Web3"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:101f65fdb01f"
coverImage: "/images/engineering-notes/medium/101f65fdb01f/001-91e1d37743.webp"
locale: "en"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0 turns a chat into a self-hosted instant crypto exchange with stronger funds-safety controls, a modernized runtime, and a smoother operator experience. Crypto exchange does not have to mean accounts, dashboards, browser sessions, or handing custody to a third party. With ADAMANT Exchange Bot, the exchange flow happens directly inside ADAMANT Messenger: a user sends one asset in chat, specifies the asset they want back, and the bot quotes, verifies, and pays out.

This is a full modernization of the exchange engine, with a strong focus on security, reliability, and real-world operator usability.

### What makes this exchanger different

Most exchange products start with the web: accounts, forms, sessions, browser fingerprinting, and a large attack surface. ADAMANT Exchange Bot runs inside messenger chats instead. There is no web interface, no user registration, and no KYC surface built into the product flow. The operator runs the bot on their own infrastructure and controls their own hot wallets.

Exchange requests happen directly in chat, the interface is simple and familiar, operators stay in control of infrastructure and funds, and the attack surface is dramatically smaller than a conventional web exchanger. For communities that value privacy, simplicity, and self-hosting, this model makes a lot of sense.

### What is new in v3.0.0

On the user-facing side, the bot is now more forgiving and more practical in everyday use. A `/cancel` command lets users cancel a pending exchange when the bot is still waiting for clarification and receive an automatic refund minus the network fee. Handling for abandoned or interrupted exchange flows has also been improved, so stale deposits are less likely to leave users and operators in limbo.

On the operator side, configuration is stricter, startup checks are clearer, and resilience is better. The bot validates its configuration more aggressively and fails fast when it sees a setup it cannot safely serve. It also handles node connectivity more robustly with automatic failover across multiple RPC or REST endpoints.

### Built for real funds, not demo flows

When software moves cryptocurrency, "mostly works" is not good enough. Small race conditions or unclear transaction ownership rules can become real losses. A big part of v3.0.0 is about funds safety.

The release introduces a more defensive deposit tracking and claim model, including mempool-aware monitoring and dispute handling. Per-UTXO locking for Bitcoin-like chains prevents concurrent spends, and per-sender request serialization eliminates chat-level race conditions around exchange and cancellation requests. For Dash, the bot now supports InstantSend handling, allowing faster recognition of eligible transfers. More explicit safeguards for unsupported-coin scenarios and transport-level failures mean the system fails in a more controlled and reviewable way.

### A modernized technical foundation

v3.0.0 is a major technology refresh. The project moved to a current Node.js baseline and updated key blockchain and infrastructure libraries: Node.js 22.13+, ethers v6 for Ethereum and ERC-20 handling, bitcoinjs-lib v7 with PSBT for Bitcoin, Dash, and Dogecoin transaction construction, MongoDB Driver 7, and adamant-api 3.x. Linting, formatting, and test tooling were also modernized. Legacy pieces that no longer fit the project's direction, including old Lisk-related support, were removed.

This matters because long-lived crypto infrastructure needs a foundation that developers can maintain, audit, and extend without dragging years of technical debt behind it.

### Supported assets and exchange flow

ADAMANT Exchange Bot supports exchanges involving ADM, BTC, ETH, DASH, DOGE, USDT, USDC, DAI, and ERC-20 tokens.

The exchange flow is intentionally straightforward: the user interacts with the bot in ADAMANT Messenger, sends the source asset, specifies the target asset, and the bot processes the rest — quote, validation, confirmation tracking, payout, or refund if something prevents safe completion. That simplicity on the surface is backed by a modular processing pipeline underneath: message parsing, quote generation, deep blockchain validation, confirmation tracking, payout handling, refund handling, and final settlement checks.

### Better tested, better documented

v3.0.0 ships with a substantially expanded automated test suite covering the exchange pipeline, crypto adapters, config validation, and helper logic. The project now has hundreds of unit tests across dozens of test suites, with no dependency on live blockchains or a real database during test runs. Documentation and contributor guidance were also refreshed so operators and developers can understand the system more quickly and work with it more safely.

Release: [https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0](https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0)
ADAMANT Messenger: [https://adamant.im](https://adamant.im)

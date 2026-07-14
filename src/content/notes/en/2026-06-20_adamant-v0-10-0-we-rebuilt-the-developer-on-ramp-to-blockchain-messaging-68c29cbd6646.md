---
title: "ADAMANT v0.10.0: A Rebuilt Developer On-Ramp to Blockchain Messaging"
slug: "adamant-v0-10-0-we-rebuilt-the-developer-on-ramp-to-blockchain-messaging-68c29cbd6646"
description: "Decentralized messaging only matters if developers can actually build on it. Alongside ADAMANT Node v0.10.0 , the entire developer experience has been overhauled: a new API spec…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-v0-10-0-we-rebuilt-the-developer-on-ramp-to-blockchain-messaging-68c29cbd6646"
publishedAt: "2026-06-20T16:19:49.523Z"
author: "massivedev0 (Theo Bitner)"
authorUrl: "https://medium.com/@vr.dev0"
sourceAccount: "massive"
coverImage: "/images/engineering-notes/medium/68c29cbd6646/001-1-ujeffbtelp0ew-8wechc8g-png.webp"
cardSpan: "full"
originalId: "medium:68c29cbd6646"
locale: "en"
placeholder: false
---

Decentralized messaging only matters if developers can actually build on it. Alongside ADAMANT Node **v0.10.0**, the entire developer experience has been overhauled: a new API specification, rewritten documentation, a local network you can spin up in minutes, and a freshly restarted testnet. The goal is to make integrating with the ADAMANT blockchain-messaging ecosystem fast, predictable, and pleasant — whether you are building a wallet, a bot, a notification service, or something entirely new.

### A modern, interactive API specification

The API contract now lives as a clean **OpenAPI 3.2** specification, published as an interactive Swagger UI at [schema.adamant.im](https://schema.adamant.im/). The schema was audited end-to-end against the live node, so what you read is what the network actually returns — accounts, transactions, chats, delegates, blocks, key-value storage, and node endpoints, all in one explorable reference.

Developers can try requests right in the browser. The spec ships with live server selection: the UI pings every public node, shows its current API version, and auto-selects a healthy mainnet node so "try it out" calls just work. You can search across every operation by path, method, name, or summary, and because the source of truth is a real OpenAPI document, you can generate typed clients (e.g., TypeScript) straight from it. ADAMANT's own [adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient) does exactly this.

### Deeper node insight

Several v0.10.0 additions are small fields with big ergonomic payoffs. Transactions now carry a `timestampMs` field providing millisecond-precision timestamps alongside the existing second-level `timestamp`. For a messenger where ordering matters, this lets clients sort messages and transfers with sub-second accuracy. Clients should prefer it when present and fall back to `timestamp * 1000` otherwise.

The node-status response now exposes `nodeTimestampMs`, `unixTimestampMs`, and a `loader` object reporting sync progress (`syncing`, `consensus`, `blocks`, `blocksCount`), so operators and tooling can reason about a node's health and sync state at a glance. A new `GET /peers/get` endpoint looks up a specific peer by IP and port, useful for building network monitors and connectivity tooling. Chat and transaction queries are cleaner thanks to new `returnUnconfirmed` and `includeDirectTransfers` parameters that give clients precise control over what comes back. These are backward-compatible additions: existing integrations keep working, and new ones get more to work with.

### Documentation you can actually build from

The API is only half the story. Documentation at [docs.adamant.im](https://docs.adamant.im/) has been rewritten and expanded, version-tagged to the node release so the guides and the network never drift apart. New and expanded material covers consensus and transaction validation — how blocks are agreed on and what makes a transaction valid — as well as syncing and the loader/status endpoint, so you understand exactly what a node is doing while it catches up. There are installation guides (including macOS), configuration, autostart, bootstrapping, and node recovery for running your own node, plus full documentation of `timestampMs` semantics so you handle time correctly from day one.

### Spin up a network in minutes: localnet + testnet

You can now stand up a complete ADAMANT network on your own machine with **localnet**. Develop and test against a real blockchain without touching public infrastructure, without waiting on confirmations from a busy network, and without spending real ADM. Iterate fast, reset freely. When you are ready to move beyond your laptop, the public **testnet** has been freshly restarted and aligned with v0.10.0 — a shared, safe environment to validate integrations against real network conditions before shipping to mainnet. Local → testnet → mainnet is now a smooth, well-documented path instead of a cliff.

### What you can build

With a typed API, runnable networks, and real documentation, practical scenarios open up quickly. ADAMANT is a fully decentralized, end-to-end encrypted messenger on its own blockchain, so wallets and messengers can send encrypted messages and value in the same protocol. Notification and alerting services can push on-chain events (payments, messages) into your own apps. Trading and exchange integrations get programmatic account, balance, and transfer handling with millisecond-accurate ordering. Bots and automation — chat bots, payment bots, monitoring bots — all speak this API, and ADAMANT's ecosystem already includes trade bots and more. Machine-to-machine and IoT messaging gains a censorship-resistant, anonymous channel for devices to coordinate and pay each other, and anonymous, serverless communication becomes possible where there is no central server to subpoena, leak, or shut down.

Because messages and payments share one protocol, many of these combine: a wallet that chats, a bot that pays, a device that messages and settles — all on the same rails.

### References

- **API reference:** [schema.adamant.im](https://schema.adamant.im/)
- **Documentation:** [docs.adamant.im](https://docs.adamant.im/)
- **Node source:** [github.com/Adamant-im/adamant](https://github.com/Adamant-im/adamant)
- **JS client:** [github.com/Adamant-im/adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient)

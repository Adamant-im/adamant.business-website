---
title: "ADAMANT Node v0.10.0: A Stronger Foundation for Decentralized Communication"
slug: "adamant-node-v0-10-0-a-stronger-foundation-for-decentralized-communication-bf99c758ff3a"
description: "The ADAMANT network runs on community operated nodes — independent servers that relay encrypted messages, serve APIs to messengers, and keep the blockchain honest. ADAMANT Node…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v0-10-0-a-stronger-foundation-for-decentralized-communication-bf99c758ff3a"
publishedAt: "2026-06-16T11:50:08.717Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/bf99c758ff3a/001-1-a8dezfm7vyio0a-74gwt6q-png.webp"
cardSpan: "full"
originalId: "medium:bf99c758ff3a"
locale: "en"
placeholder: false
---

The ADAMANT network runs on community-operated nodes — independent servers that relay encrypted messages, serve APIs to messengers, and keep the blockchain honest. ADAMANT Node v0.10.0 is a substantial upgrade that makes that infrastructure faster to operate, easier to debug, and better aligned with how modern ADAMANT clients actually work. ADAMANT is not chasing vanity throughput numbers; it is building a decentralized trust layer for communication that messengers, wallets, and communication forks can rely on without surrendering privacy to a central operator.

### Better APIs for real messengers

Clients need precise transaction ordering, millisecond timestamps, and the ability to surface unconfirmed messages while a chat is still propagating across the network. v0.10.0 delivers `timestampMs` for sub-second transaction ordering without breaking the existing `timestamp` field. List endpoints now accept `?returnUnconfirmed=1` to include mempool transactions where appropriate. A new `includeDirectTransfers` parameter replaces the legacy `withoutDirectTransfers` quirk for cleaner chat filtering. The `count` field is now returned as a number rather than a string, simplifying client parsing across list endpoints.

### Faster, more resilient networking

Nodes can now maintain WebSocket connections between peers, not only HTTP. This reduces latency for block and transaction propagation and gives operators more flexibility in how their nodes participate in the mesh. Combined with improved sync logic and a rewritten transaction pool, the node handles busy network conditions more predictably.

### Operator tooling that respects your time

Running a node should not require deep familiarity with legacy JavaScript. v0.10.0 ships modernized installation and repair scripts for Ubuntu/Debian and CentOS/RHEL, localnet helpers for developers, config overrides for staged rollouts, and structured logging with rotation so operators can diagnose problems effectively. The release also documents graceful shutdown practices — a forced `kill -9` on a live node can corrupt in-memory state mirrors, so v0.10.0 makes the correct shutdown procedure explicit in operator docs.

### Security without drama

This release migrates cryptography to `sodium-native` bindings and tightens P2P transaction admission. Timestamp checks that already protected the Public API now also apply when transactions arrive via peer gossip ([#246](https://github.com/Adamant-im/adamant/pull/246)), closing a real-world pool-poisoning vector without touching consensus replay paths. Dependency refreshes across multiple phases reduce exposure to known issues in the Node.js ecosystem.

### Do delegates and node runners have to upgrade?

Recommended, not mandatory. v0.10.0 does not introduce a new mandatory consensus fork for networks that are already synced and operating normally; height-gated protocol behavior remains configuration-driven. However, cryptofoundry encourages delegates and independent node operators to upgrade when practical. Newer messengers and APIs expect v0.10.0 features such as `timestampMs`, unconfirmed queries, and WebSocket transport. Installation and logging improvements make day-two operations materially easier, and the security hardening benefits the whole mesh even when consensus rules are unchanged. Staying on very old node versions eventually means supporting clients alone and missing the reliability work the community ships in releases like this one.

### Technical highlights

The runtime now requires Node.js ≥ 22.13.0; Node 18 support has been dropped. On the API side, `timestampMs`, `returnUnconfirmed`, `includeDirectTransfers`, and numeric `count` are the key additions. The P2P layer gains WebSocket peer transport and timestamp admission checks on the gossip path. Operations benefit from modernized install and repair scripts, localnet helpers, live test scenarios, and config overrides. Developer experience improvements include an AGENTS.md file, expanded CONTRIBUTING guidance, and structured logging. Deprecated HTTP endpoints have been removed, and docs.adamant.im is now the documentation home.

Full structured notes and the complete PR list are available at the [GitHub Release v0.10.0](https://github.com/Adamant-im/adamant/releases/tag/v0.10.0). Existing operators should review the upgrade notes, upgrade Node.js, pull v0.10.0, and restart gracefully. New operators should use the official install scripts from the release tag. Developers should consult [CONTRIBUTING.md](https://github.com/Adamant-im/adamant/blob/master/.github/CONTRIBUTING.md) for localnet and live scenario testing.

ADAMANT is community-owned infrastructure. Questions, issues, and contributions are welcome at [github.com/Adamant-im/adamant](https://github.com/Adamant-im/adamant).

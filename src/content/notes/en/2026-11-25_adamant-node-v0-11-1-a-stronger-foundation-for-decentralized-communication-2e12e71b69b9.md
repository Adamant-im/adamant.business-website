---
title: "ADAMANT Node v0.11.1: Security, Resilience, and Clearer APIs"
slug: "adamant-node-v0-11-1-a-stronger-foundation-for-decentralized-communication-2e12e71b69b9"
description: "Decentralized communication depends on independently operated nodes that validate, exchange, and preserve data. ADAMANT node v0.11.1 is a security and reliability release that s…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v0-11-1-a-stronger-foundation-for-decentralized-communication-2e12e71b69b9"
publishedAt: "2026-11-25T17:54:29.629Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:2e12e71b69b9"
coverImage: "/images/engineering-notes/medium/2e12e71b69b9/001-866983f729.webp"
locale: "en"
placeholder: false
---

Decentralized communication depends on independently operated nodes that validate, exchange, and preserve data. ADAMANT node v0.11.1 is a security and reliability release that strengthens day-to-day operations while keeping the protocol's existing consensus rules intact. It is the first tagged release of the v0.11 line; the v0.11.0 code was merged but never tagged, and v0.11.1 includes an additional peer-networking fix, so operators already running that code should upgrade.

### Reducing the Attack Surface

The release removes legacy HTTP forging controls and DApp runtime endpoints. These surfaces included server-side execution and signing paths that no longer belong in a modern node. Their removal addresses advisory GHSA-vjhq-r5fg-85cx and makes the node's operational boundary easier to understand. Delegates now configure forging through `forging.secret` and apply changes with a graceful restart. Optional local CLI commands can unlock and lock encrypted passphrases. Read-only DApp APIs and consensus handling for existing DApp transaction types remain available; clients should sign transactions locally and submit them through standard transaction endpoints.

### Encrypted Delegate Secrets

Operators can now encrypt forging passphrases with an operator password using AES-256-GCM and scrypt. Plaintext configuration remains compatible for existing deployments. A node with encrypted secrets can still synchronize, maintain peers, serve APIs, and process its mempool while forging is locked. After each restart, the operator unlocks forging through a local prompt or an owner-only Unix control socket. Monitoring support lets operators observe lock state without exposing delegate identity. Encryption protects stored passphrases but does not remove the operator's responsibility to secure the host, password, backups, and access.

### Network Resilience

Production HTTP and WebSocket anti-abuse limits are enabled by default, covering public APIs, peer traffic, connection attempts, and subscriptions, with a documented HTTP 429 response for rate-limited requests. There is an important mixed-version caveat: legacy peers that do not send the rate-limit negotiation header bypass in-node peer HTTP limits during the transition. Operators should enforce outer limits on `/peer/*` at their reverse proxy or firewall. Existing configurations that explicitly contain legacy `max: 0` settings keep the affected limits disabled until updated.

The release also bounds peer health checks, handles unreachable peers more deliberately, and improves PostgreSQL recovery after a lost connection. Installation and repair scripts now verify snapshots before the default database replacement path, use lockfile-based dependency installation, and are more careful about restarting a node while it is syncing or rebuilding.

### Real-time Peer Connections Restored

The final v0.11.1 fix restores outbound WebSocket peer selection. In the untagged v0.11.0 code, missing defaults on live peer objects caused the candidate query to return no peers. Nodes could still synchronize over HTTP and receive inbound WebSocket connections, but outbound real-time block and transaction push did not work. The fix sets the defaults on the live peer instance, and regression tests cover the peer defaults and the selection query.

### Replay Correctness and Stricter APIs

Round settlement now respects the current block height during replay, and rollback reward indexing aligns each delegate with its own changes. The release notes report bit-for-bit state equivalence checks on canonical mainnet and testnet across full rebuild, image startup, and checkpoint recovery. A separate pre-existing rollback issue remains tracked in issue #300.

For application developers, filter handling on states, chats, and chatrooms is now stricter. Supported `and:` filters are applied consistently; unsupported `or:` filters and previously ignored parameters are rejected. The batch key parameter changes from `keysIds` to `keyIds`. These are intentional breaking HTTP API changes, so integrations should be checked before deployment.

### Unified Documentation

Node documentation and the OpenAPI 3.2 specification now live alongside the code in the node repository, making it possible to update behavior, documentation, and the API contract together. Operators and developers can explore the unified [documentation](https://docs.adamant.im/) and [API schema](https://docs.adamant.im/schema/), including new guidance for upgrading, security, monitoring, and testing.

### Upgrade Notes

The upgrade introduces no consensus fork and no new SQL migrations. Block and transaction serialization, signatures, delegate ordering, rewards, fees, activation heights, and slot timing remain unchanged from v0.10.2. It does require attention to operational and HTTP API compatibility. Operators should read the [upgrading guide](https://docs.adamant.im/own-node/upgrading.html) and check integrations for removed routes and stricter filters. A supported Node.js version is required: `^22.22.2 || >=24.15.0`. Stop the node gracefully and wait for cleanup, then review rate limits, proxy trust, and forging configuration before restarting. If forging secrets are encrypted, unlock them after each restart and verify the local lock state. After upgrading, check node status, peer connectivity, and anti-abuse settings.

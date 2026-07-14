---
title: "Docs & Schema updated for ADAMANT Node v0.10.0"
slug: "discussion-53-docs-and-schema-updated-for-adamant-node-v0-10-0-10292291"
description: "Alongside ADAMANT Node v0.10.0 , the developer facing stack has been refreshed to stay in lockstep with the node: the API specification (adamant schema) and the documentation (a…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/53"
publishedAt: "2026-06-20T18:25:34Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10292291"
locale: "en"
placeholder: false
---

Alongside **ADAMANT Node v0.10.0**, the developer-facing stack has been refreshed to stay in lockstep with the node: the API specification (`adamant-schema`) and the documentation (`adamant-docs`) are both updated, plus a local network and a freshly restarted testnet. Here's a short summary for anyone building on ADAMANT.

## adamant-schema (API specification)

The spec has been upgraded from **OpenAPI 3.0.3 → 3.2.0**, with its version aligned to `0.10.0` and audited against the live node. Transactions now support **`timestampMs`**, providing millisecond-precision timestamps alongside the existing second-level `timestamp`. Node status responses are richer, adding **`nodeTimestampMs`**, **`unixTimestampMs`**, and a **`loader`** object that exposes `syncing`, `consensus`, `blocks`, and `blocksCount`.

A new **`GET /peers/get`** endpoint lets you look up a peer by IP and port. New query parameters **`returnUnconfirmed`** and **`includeDirectTransfers`** replace the deprecated `withoutDirectTransfers`. Testnet nodes have been added to the server list.

The interactive Swagger UI at [schema.adamant.im](https://schema.adamant.im) now offers live operation search, per-node health checks with API-version labels, and auto-selection of a healthy mainnet node. Tooling has been refreshed to Node.js 22, TypeScript, and Express 5, with a regenerated, typed client path for consumers.

## adamant-docs (documentation)

The API reference is updated to **v0.10.0** and version-tagged in the sidebar so docs and network never drift. New pages cover **consensus and transaction validation**, **syncing**, and the **loader / node status** endpoint. The semantics of **`timestampMs`** are documented end-to-end, and the **peers** API documentation has been updated.

The **run-your-own-node** guides have been expanded to cover installation (including macOS), configuration, autostart, bootstrap, and node recovery. There are now dedicated pages for running a **localnet** and joining the **testnet**.

## Localnet & testnet

A **localnet** lets you stand up a complete ADAMANT network locally to develop and test without touching public infrastructure. The **testnet** has been restarted and aligned with v0.10.0, allowing you to validate integrations under real network conditions before mainnet. Together these make the **local → testnet → mainnet** path smooth and fully documented.

## Related resources

- API reference: https://schema.adamant.im
- Documentation: https://docs.adamant.im
- Node source: https://github.com/Adamant-im/adamant
- API spec repo: https://github.com/Adamant-im/adamant-schema
- Docs repo: https://github.com/Adamant-im/docs
- JS client: https://github.com/Adamant-im/adamant-api-jsclient

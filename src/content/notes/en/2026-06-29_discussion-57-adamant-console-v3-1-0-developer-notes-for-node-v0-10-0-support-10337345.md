---
title: "ADAMANT Console v3.1.0: developer notes for Node v0.10.0 support"
slug: "discussion-57-adamant-console-v3-1-0-developer-notes-for-node-v0-10-0-support-10337345"
description: "ADAMANT Console v3.1.0 introduces support for ADAMANT Node v0.10.0 and refreshes the developer surface for CLI, JSON RPC, and local JavaScript integrations. This release is prim…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/57"
publishedAt: "2026-06-29T08:48:18Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10337345"
locale: "en"
placeholder: false
---

ADAMANT Console v3.1.0 introduces support for ADAMANT Node v0.10.0 and refreshes the developer surface for CLI, JSON-RPC, and local JavaScript integrations. This release is primarily aimed at developers and operators using Console as a local signing tool, a scripting CLI, or a lightweight JSON-RPC bridge to ADAMANT nodes.

Console now uses `adamant-api` v3 and aligns with ADAMANT Node v0.10.0 response and query behavior. The supported runtime is Node.js 22.13.0 or newer. CLI, JSON-RPC, and JavaScript wrapper methods have been unified around the same Console behavior. A new `node status` command and wrapper provide node status support, while chat helpers have been expanded to cover chat rooms, chat messages, and legacy chat transactions. Transaction lookups now pass v0.10 query options such as `returnUnconfirmed`, and delegate lookups accept a username, public key, or ADAMANT address. For direct-transfer chat filters, the API now prefers `includeDirectTransfers`, though the older `withoutDirectTransfers` input remains normalized for backward compatibility. Public wrappers now include JSDoc and generated API reference pages, and the npm package is published with provenance via GitHub Actions OIDC and npm Trusted Publishing.

To install or update globally, use npm:

```sh
npm install -g adamant-console
```

The package exposes the `adm` binary for common operations:

```sh
adm client version
adm node status
adm get transaction 123456789 returnUnconfirmed=1
adm get chats U123456789 includeDirectTransfers=1
```

When upgrading, services using Console through JSON-RPC should review the expanded method surface and response handling. Code consuming transaction or chat responses should be tested against the v0.10.0 fields it relies on, particularly unconfirmed transaction data, chat direct-transfer inclusion, and `timestampMs`. For new JavaScript services, prefer `adamant-api` directly for full protocol coverage, reserving `adamant-console` wrappers for when you need Console-compatible CLI/RPC behavior or local operational scripts.

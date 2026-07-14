---
title: "ADAMANT Pool v3.0.0 — Forging Pool Software Update"
slug: "brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
description: "A forging pool lets users combine their voting weight to forge blocks on the ADAMANT blockchain and share ADM rewards automatically. The pool program handles reward calculation…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
publishedAt: "2023-01-15T15:59:48.033Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/1ac1c6cd527a/001-0-rvpkdxtavqcrrn3p.webp"
cardSpan: "full"
originalId: "medium:1ac1c6cd527a"
locale: "en"
placeholder: false
---

A forging pool lets users combine their voting weight to forge blocks on the ADAMANT blockchain and share ADM rewards automatically. The pool program handles reward calculation and distribution without manual intervention.

Version 3.0.0 of the ADAMANT forging pool is now available as [open source](https://github.com/Adamant-im/pool). The codebase was fully revised in a new repository, deprecating the old one. The rewrite brings updated library dependencies, improved performance, and lower resource usage. The configuration format remains unchanged, and a migration script is provided for operators upgrading from v2.

The most visible change for voters is a new Web UI built with the `svelte` framework, offering a responsive experience on both desktop and mobile devices.

![ADAMANT Pool Web UI](/images/engineering-notes/medium/1ac1c6cd527a/002-0-eus0ye-v8djitrru.webp)

![ADAMANT Pool Web UI mobile](/images/engineering-notes/medium/1ac1c6cd527a/003-0-cdfhik804ra3jq2w.webp)

The v3.0.0 release updates all dependencies, rewrites the dashboard in `svelte`, and redesigns and optimizes the entire codebase while fixing known bugs.

There are two breaking changes to note. First, Node.js 18.12.1 or later (current LTS) is now required; older versions are no longer supported. Second, the pool now uses `lowdb` for its database. Operators upgrading from v2 should consult the migration section in the README file.

Voting for a pool supports the ADAMANT decentralized network and earns passive income as forging rewards. A list of active ADAMANT pools is available in the [ADAMANT documentation](https://medium.com/adamant-im/hodl-list-of-adamant-pools-join-in-and-get-rewards-491a98610f4b).

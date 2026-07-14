---
title: "ADAMANT v4.11.0: More Reliable, Polished, Mature"
slug: "adamant-v4-11-0-more-reliable-polished-mature-80c9b4c0a888"
description: "ADAMANT v4.11.0 packages 20 merged pull requests and 437 commits, focusing on connection reliability, interface consistency, wallet flows, and overall product stability rather t…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-v4-11-0-more-reliable-polished-mature-80c9b4c0a888"
publishedAt: "2026-03-20T16:23:57.256Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/80c9b4c0a888/001-1-4agtbybzbmpaqqrwpbaz5q-png.webp"
cardSpan: "full"
originalId: "medium:80c9b4c0a888"
locale: "en"
placeholder: false
---

ADAMANT v4.11.0 packages 20 merged pull requests and 437 commits, focusing on connection reliability, interface consistency, wallet flows, and overall product stability rather than a single headline feature.

### Node Resiliency and Network Behavior
A major improvement in this release is node reliability. ADAMANT now includes alternative IP failover for nodes when domain access is unavailable, alongside improved healthcheck lifecycle and timeout handling. Recovery after device sleep or offline states is strengthened, and node status messaging is refined to reduce false sync signals. This directly targets failure points in unstable network conditions, making the messenger more resilient.

![ADAMANT v4.11.0: More Reliable, Polished, Mature](/images/engineering-notes/medium/80c9b4c0a888/002-1-bnmyyew25hm84-zwmg0y0w-png.webp)

### Interface Modernization
The release introduces broad visual improvements across chats, wallets, send-funds flows, settings, dialogs, and navigation. It implements shared design tokens, tighter spacing rules, improved typography, layout primitives, and theming cleanup driven by CSS variables. Expanded layout regression coverage helps preserve UI quality in future updates.

### Chat Experience Enhancements
The messaging side sees improvements to opened-chat layout, message status handling, retry indicators, emoji picker behavior, reply overflow handling, public key loading, and message grouping. It fixes stale date refresh behavior and null-scroll regressions when switching chats rapidly, ensuring smoother daily operation.

![ADAMANT v4.11.0: More Reliable, Polished, Mature](/images/engineering-notes/medium/80c9b4c0a888/003-1-mmpisulwbp1letrtngejyq-png.webp)

![ADAMANT v4.11.0: More Reliable, Polished, Mature](/images/engineering-notes/medium/80c9b4c0a888/004-1-6kfadiesjlisjwmvg9o4ww-png.webp)

### Wallet and Send-Funds Flows
Financial screens received substantial polish, including improved wallet cards, tabs, balance states, and transaction list layout. The update fixes self-transfer amount normalization for BTC, DOGE, and DASH, and normalizes persisted wallet symbols on restore to keep upgraded state consistent.

![ADAMANT v4.11.0: More Reliable, Polished, Mature](/images/engineering-notes/medium/80c9b4c0a888/005-1-ia-qldhd8-vcndnkepcjdw-png.webp)

### Klayr Support Removed
A notable product-scope decision is the full removal of Klayr (KLY) support across wallets, nodes, transactions, configs, icons, queries, node clients, store paths, and related UI. Pruning legacy paths helps simplify the codebase and reduce user-facing complexity.

### Toolchain and Documentation
Behind the scenes, the project upgraded from Node.js 20 to 22, migrated to ESLint 9, and updated Electron builds to include universal macOS support. Expanded Playwright smoke and regression workflows improve testing discipline. Documentation was also refreshed, including clearer self-hosting guidance in `README.md` and AI operating guidelines in `AGENTS.md`.

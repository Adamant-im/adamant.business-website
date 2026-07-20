---
title: "A Clearer View of ADAMANT: Redesigned Blockchain Explorer"
slug: "a-clearer-view-of-adamant-redesigned-blockchain-explorer-f97501b0dc55"
description: "A blockchain explorer should do more than display transactions and blocks. It should help people understand what is happening on the network—quickly, accurately, and with confid…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-clearer-view-of-adamant-redesigned-blockchain-explorer-f97501b0dc55"
publishedAt: "2026-07-19T11:11:20.263Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:f97501b0dc55"
coverImage: "/images/engineering-notes/medium/f97501b0dc55/001-00d120d06c.webp"
locale: "en"
placeholder: false
---

A blockchain explorer should do more than display transactions and blocks. It should help people understand what is happening on the network—quickly, accurately, and with confidence. The ADAMANT Blockchain Explorer has been completely redesigned with this principle in mind.

The redesign is not merely cosmetic. It reconsiders how information is structured, how transactions are explained, how network health is communicated, and how the Explorer works across desktop and mobile devices.

### Trust begins with clarity

A blockchain explorer is one of the most important verification tools in any blockchain ecosystem. Users open it to confirm that a transaction was included in the ledger, inspect an address, verify a delegate's activity, or understand the current state of the network. If the interface is confusing, inconsistent, or visually generic, it creates uncertainty precisely where users expect transparency.

The redesigned Explorer establishes a clearer visual hierarchy for blockchain data. Transaction IDs, addresses, amounts, confirmations, timestamps, and operation types are now easier to identify and compare. Network status is based on meaningful forging data rather than a purely decorative "online" indicator. The Explorer distinguishes between live, degraded, critical, delayed, and connecting states using the activity of ADAMANT delegates and the freshness of network updates. The design itself therefore becomes part of the trust model: users can understand not only what happened, but also how current and reliable the displayed information is.

### Responsive by design

Explorers are often designed as dense desktop tables and treated as technical tools for a narrow audience. In reality, people check transactions from mobile devices, monitor delegates over long sessions, and frequently move between overview pages and detailed records.

The new Explorer is responsive by design. Tables become readable mobile layouts instead of forcing users to navigate compressed columns. Known accounts and delegates show both their names and underlying addresses. Copy actions consistently copy the actual blockchain value. Amounts are compact where fast scanning matters and remain fully precise on detail pages.

A complete dark theme has been introduced as a first-class experience rather than a simple color inversion. It improves comfort during long monitoring sessions while preserving contrast for network states, transaction directions, map nodes, charts, and status indicators.

![A Clearer View of ADAMANT: Redesigned Blockchain Explorer](/images/engineering-notes/medium/f97501b0dc55/002-216920b6f7.webp)

Making blockchain data comfortable to use on any screen lowers the barrier between users and the network itself.

### A new visual identity

The interface is designed to feel professional and restrained without resembling a generic administration dashboard. The updated design uses a semantic system of surfaces, typography, spacing, borders, and status colors. Light and dark themes share the same information hierarchy while adapting their contrast and emphasis to the environment.

The redesign covers the entire Explorer: homepage and latest public operations, blocks and block details, transactions and transaction details, address and delegate pages, Top Accounts, Delegate Monitor, Network Monitor, Activity Graph, and all supporting components such as header, navigation, search, tooltips, tables, and footer. The content area now has a comfortable maximum width on large displays, while selected monitoring sections can still use the full viewport where additional space improves understanding.

### Transactions now explain more

Raw protocol transaction types are useful for machines, but they do not always describe the operation from a user's perspective. The Explorer now derives more meaningful transaction types from their context. Along with regular transfers, it can identify operations such as deposit, withdraw, welcome bonus, vote, unvote, vote & unvote, create delegate, DApp deposit and withdrawal, and message and state transactions.

Known exchange wallets are identified through the shared ADAMANT address book. This allows the Explorer to describe transfers to and from exchanges without maintaining a separate duplicated list in the frontend. Transaction semantics are now defined in a shared registry used by both the backend and frontend, making behavior more consistent and simplifying the addition of future protocol types.

### More stable and accurate live data

The redesign also provided an opportunity to improve several underlying data flows. The homepage now shows the 20 latest public operations. Transactions with identical timestamps are ordered deterministically using their height and ID, preventing rows from appearing to jump or disappear between updates. Confirmations and ledger status update as new blocks arrive. Delegate Monitor waits for a fresh and coherent forging snapshot when the first client connects, instead of briefly exposing data left from an earlier session.

![A Clearer View of ADAMANT: Redesigned Blockchain Explorer](/images/engineering-notes/medium/f97501b0dc55/003-0b5168c513.webp)

Unnecessary account lookups have been reduced, request coalescing and caching have been added, and the interface is now protected against temporary node failures and browsers where persistent storage is unavailable. These changes are mostly invisible—and that is exactly the point. A good Explorer should feel stable without requiring users to think about the complexity behind it.

### Precision without visual noise

Blockchain values require precision, but showing every decimal digit everywhere makes tables harder to scan. The new interface adapts formatting to context. Overview tables emphasize four significant digits, integer values use thousands separators, and full values remain available in tooltips. Detail pages preserve every meaningful on-chain decimal, insignificant trailing zeroes are removed, and timestamps use a consistent format with UTC time and a concise relative age. The same principle applies throughout the Explorer: provide complete information while emphasizing what matters most at each moment.

The new Explorer is currently available in the development repository, with a release planned soon.

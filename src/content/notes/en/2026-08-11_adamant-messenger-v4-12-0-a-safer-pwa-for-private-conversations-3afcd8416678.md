---
title: "ADAMANT Messenger v4.12.0: A Safer PWA for Private Conversations"
slug: "adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
description: "ADAMANT Messenger v4.12.0 is a coordinated security release for the decentralized messenger, wallet, and PWA experience. Users on browser, mobile, Tor, or desktop should update…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
publishedAt: "2026-08-11T00:19:47.725Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:3afcd8416678"
coverImage: "/images/engineering-notes/medium/3afcd8416678/001-e1683c8738.webp"
locale: "en"
placeholder: false
---

ADAMANT Messenger v4.12.0 is a coordinated security release for the decentralized messenger, wallet, and PWA experience. Users on browser, mobile, Tor, or desktop should update immediately to benefit from the hardened protections around sensitive data.

The refreshed PWA maintains the familiar interface for anonymous account creation, chat management, and multi-asset wallet controls. As always, no phone number, email address, or central operator is required. The user's passphrase remains the sole key for accessing an anonymous address and self-custodied wallet.

Behind the interface, v4.12.0 closes confirmed stored XSS paths, removes legacy v-html rendering, and hardens Markdown with SafeHtml. It also verifies node-supplied public keys against the addresses they claim to represent, an important boundary when a decentralized app interacts with public infrastructure. Local secret storage and the password key-derivation flow have been upgraded with versioned scrypt, while cryptographic helpers move to the modern @noble and @scure ecosystem. Strict Content Security Policy (CSP) coverage now spans PWA, Tor, testnet, Android, and Electron builds.

The release also improves system reliability. Lagging coin indexers are no longer treated as healthy nodes, and node-version checks now use real semantic versioning. Additionally, AIP-6 signal messages are kept out of visible chat history. For Android users, backup and data-extraction boundaries have been strengthened, resulting in fewer hidden assumptions and a safer path from sign-in to message delivery.

![ADAMANT Messenger v4.12.0: A Safer PWA for Private Conversations](/images/engineering-notes/medium/3afcd8416678/002-419a41b893.webp)

![ADAMANT Messenger v4.12.0: A Safer PWA for Private Conversations](/images/engineering-notes/medium/3afcd8416678/003-dc272cf2f1.webp)

![ADAMANT Messenger v4.12.0: A Safer PWA for Private Conversations](/images/engineering-notes/medium/3afcd8416678/004-c1c599fad0.webp)

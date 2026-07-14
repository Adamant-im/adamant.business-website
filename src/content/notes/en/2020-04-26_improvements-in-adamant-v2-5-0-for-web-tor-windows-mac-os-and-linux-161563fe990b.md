---
title: "Improvements in ADAMANT v2.5.0 for Web, Tor, Windows, Mac OS & Linux"
slug: "improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-and-linux-161563fe990b"
description: "ADAMANT v2.5.0 introduces several improvements and bug fixes across its Web, Tor, and desktop applications. As a blockchain based messenger, ADAMANT benefits from a higher numbe…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-linux-161563fe990b"
publishedAt: "2020-04-26T17:21:28.135Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/161563fe990b/001-0-rzxpq8psh7gjckqp.webp"
cardSpan: "full"
originalId: "medium:161563fe990b"
locale: "en"
placeholder: false
---

ADAMANT v2.5.0 introduces several improvements and bug fixes across its Web, Tor, and desktop applications. As a blockchain-based messenger, ADAMANT benefits from a higher number of network nodes for better decentralization. The web application now includes nine nodes, comprising three HTTP and six HTTPS types. When using an HTTPS connection, only HTTPS nodes are available, while the Windows, macOS, and Linux desktop applications can access all nine nodes.

The update also refines the exchange list for buying and selling ADM, removing IDCM and adding CoinDeal, alongside updated links for Resfinex and Bit-Z. ADAMANT's Markdown support has been improved to correctly display monospaced fonts for `code` blocks.

![Improvements in ADAMANT v2.5.0 for Web, Tor, Windows, Mac OS & Linux](/images/engineering-notes/medium/161563fe990b/002-0-sqpbhli5aps7yqjd.webp)

In the Tor version of the messenger, WebSocket connections have been fixed to ensure faster message delivery.

![Improvements in ADAMANT v2.5.0 for Web, Tor, Windows, Mac OS & Linux](/images/engineering-notes/medium/161563fe990b/003-0-fblaod14ec32orwh.webp)

Additional maintenance in this release includes updated dependencies, node protocol checks, and fixes for node statuses and socket connections on HTTP hosts. The update also addresses static chat names, pasted address validation in the "Start new Chat" flow, and QR code generation for ADM addresses on Windows and other apps. Localization improvements were made for "no public key" and "no hash" error messages.

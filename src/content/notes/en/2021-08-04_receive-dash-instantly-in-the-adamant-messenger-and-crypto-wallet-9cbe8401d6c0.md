---
title: "Receive DASH instantly in the ADAMANT Messenger and crypto Wallet"
slug: "receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
description: "ADAMANT Messenger version 2.12.0 introduces Dash InstantSend support, allowing DASH transfers to be received instantly without waiting for network confirmations. Typically, cryp…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
publishedAt: "2021-08-04T13:23:12.613Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9cbe8401d6c0/001-0-omadd6rxri1q0dfd.webp"
cardSpan: "full"
originalId: "medium:9cbe8401d6c0"
locale: "en"
placeholder: false
---

ADAMANT Messenger version 2.12.0 introduces Dash InstantSend support, allowing DASH transfers to be received instantly without waiting for network confirmations. Typically, cryptocurrency transfers require waiting for block confirmations, but Dash InstantSend leverages master nodes to verify transactions and promise their inclusion in subsequent blocks. Alongside this, the update improves the speed of transaction status updates for other supported cryptocurrencies.

The release also integrates an ADM Bounty bot directly into chats. This bot automatically and instantly pays rewards for completed tasks and currently supports Twitter campaigns. Users can send a `/help` command to the bot to learn the campaign rules.

![Receive DASH instantly in the ADAMANT Messenger and crypto Wallet](/images/engineering-notes/medium/9cbe8401d6c0/002-0-hofe2-yqoknm1e74.webp)

To ensure code reliability and safety, the update upgrades dependencies to versions with no known vulnerabilities. The application footprint has been reduced by removing unused non-English bip39 wordlists. Furthermore, cryptographic key generation for built-in crypto wallets has been optimized, making logging into a new account approximately six times faster through seed caching. Additional maintenance includes upgrading Ethereum libraries, removing the deprecated Atomars exchange link, and applying various bugfixes.

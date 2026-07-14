---
title: "ADAMANT Messenger: Secure ETH Transfers"
slug: "adamant-messenger-secure-eth-transfers-b27984a3ce05"
description: "ADAMANT has added integrated Ethereum (ETH) wallet support and transfers within its private messaging platform. The feature enables completely trustless cryptocurrency transfers…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-secure-eth-transfers-b27984a3ce05"
publishedAt: "2018-06-07T07:30:57.792Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b27984a3ce05/001-0-0qs-wuvvdq6a0uk2.webp"
cardSpan: "full"
originalId: "medium:b27984a3ce05"
locale: "en"
placeholder: false
---

ADAMANT has added integrated Ethereum (ETH) wallet support and transfers within its private messaging platform. The feature enables completely trustless cryptocurrency transfers inside the chat system, without third parties or intermediaries. This works similarly to the open-source client-side application MyEtherWallet: users hold their own private keys, and every transaction is signed client-side before being sent encrypted to an Ethereum node.

When a user sends ETH through the ADAMANT network, a private key is derived from the same ADAMANT wallet passphrase used to access the Messenger. This means the ADAMANT passphrase becomes the sole key to all bound cryptocurrency wallets, making secure passphrase storage critical. ADAMANT cannot recover funds or freeze accounts if a passphrase is lost or compromised through phishing.

![ADAMANT Messenger: Secure ETH Transfers](/images/engineering-notes/medium/b27984a3ce05/002-0-zzoel-pond1fmpkh.webp)

Currently in development are separate Ethereum nodes with specialized database indexes for retrieving transaction history. Users who prefer not to trust ADAMANT's infrastructure can run their own Ethereum node with such indexes and select it in the application. All ADAMANT source code is openly available on GitHub.

When a user creates an ADAMANT account, an Ethereum address is generated and the blockchain records a public entry in KVS to prove ownership. The account must hold more than 0.001 ADM to record this transaction. Once recorded, anyone in a chat can look up the ETH address from the blockchain to send a payment, eliminating the need to request an address separately.

An important privacy consideration: the ETH address is publicly visible on the blockchain, and anyone can see that a given ADAMANT address is bound to a specific ETH address. While this cannot be linked to a real-world identity, users concerned with anonymity should avoid sharing their ADAMANT address publicly. Users maintain full control over their ETH wallet and can transfer funds to any other Ethereum wallet, with standard Ethereum gas commissions applying.

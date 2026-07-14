---
title: "New security features in ADAMANT Messenger 2.11.0"
slug: "new-security-features-in-adamant-messenger-88c8daec0b75"
description: "Version 2.11.0 of ADAMANT Messenger introduces verification of cryptocurrency transactions, warnings for suspicious wallet addresses, and on demand transaction status updates. S…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-security-features-in-adamant-messenger-88c8daec0b75"
publishedAt: "2021-05-02T08:46:58.373Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/88c8daec0b75/001-0-0hsc7oe7vtwfo3p0.webp"
cardSpan: "full"
originalId: "medium:88c8daec0b75"
locale: "en"
placeholder: false
---

Version 2.11.0 of ADAMANT Messenger introduces verification of cryptocurrency transactions, warnings for suspicious wallet addresses, and on-demand transaction status updates.

### Suspicious wallets in KVS

ADAMANT stores wallet addresses in the blockchain's Key-Value Store (KVS), which allows in-chat crypto transfers. Saving an address requires the account passphrase, so third parties cannot inject incorrect addresses on a user's behalf. However, if a passphrase is compromised, an attacker could replace the account's cryptocurrency addresses with their own and intercept any funds sent to the victim.

The Messenger now checks wallet address consistency on login and notifies the user of any discrepancy. When sending crypto to a partner, the app also validates the partner's stored address.

### Cryptocurrency transfers in chats

In-chat transfers work by sending a special message on the ADAMANT blockchain first, followed by the cryptocurrency transaction itself. Inconsistencies can arise between the special message and the on-chain transaction — for example, mismatched amounts, recipients, senders, or transfer times. The Messenger now detects these inconsistencies and alerts the user.

![New security features in ADAMANT Messenger](/images/engineering-notes/medium/88c8daec0b75/002-0-bjwjfxdbbty8fily.webp)

Any in-chat cryptocurrency transfer should also appear in the wallet's transaction history under Wallet → Coin → Balance. Transaction status can now be rechecked manually from both the chat screen and the transaction details screen.

### Other updates

This release optimizes transaction update timings across coins, fixes UTXO handling for Doge, adds a node version display in the Nodes view, and resolves a bug where the transaction list appeared empty. The full changelog is available in the [v2.11.0 release notes](https://github.com/Adamant-im/adamant-im/releases/tag/v2.11.0).

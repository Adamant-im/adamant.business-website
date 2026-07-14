---
title: "Key-Value Store in ADAMANT: Storing Contact Names on the Blockchain"
slug: "what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
description: "ADAMANT introduced a key value store (KVS) mechanism for storing contact data on the blockchain, implemented in ADAMANT Blockchain version 0.2.0. KVS supports both public and pr…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
publishedAt: "2018-07-11T07:10:16.055Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ee5f82ab77f/001-0-tvpp-oomdjax-ek8.webp"
cardSpan: "full"
originalId: "medium:4ee5f82ab77f"
locale: "en"
placeholder: false
---

ADAMANT introduced a key-value store (KVS) mechanism for storing contact data on the blockchain, implemented in ADAMANT Blockchain version 0.2.0. KVS supports both public and private data storage. Public examples include Ethereum addresses, while private examples include address books.

Private KVS transactions are stored on-chain alongside other transaction types but are only accessible to their owners. The transaction content is encrypted using a hash of the owner's private key with added salt for additional security. Full technical details are specified in [AIP-3](https://aips.adamant.im/AIPS/aip-3).

ADAMANT uses incremental data storage, meaning the client application transmits only address book changes rather than the entire address book. This is an important consideration for blockchain-based storage, where minimizing on-chain data size matters. Each key maps to a specific value — for example, a contact's ADAMANT address (such as `U324242353425354`) maps to a display name (such as "John").

The ADAMANT Messenger web application has been updated to support this functionality. Users can rename a contact by clicking the header containing the ADAMANT address within a chat.

![Key-Value Store in ADAMANT](/images/engineering-notes/medium/4ee5f82ab77f/002-0-xzokd2tzoxh9eqk2.webp)

Address book support is planned for the iOS and Android applications in future releases.

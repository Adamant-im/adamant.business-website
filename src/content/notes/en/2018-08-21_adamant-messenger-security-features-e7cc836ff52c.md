---
title: "ADAMANT Messenger Security Features"
slug: "adamant-messenger-security-features-e7cc836ff52c"
description: "ADAMANT is a private messenger that operates entirely on a blockchain. By storing every message as an on chain transaction, it addresses security flaws typical of both peer to p…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-security-features-e7cc836ff52c"
publishedAt: "2018-08-21T13:14:09.919Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e7cc836ff52c/001-0-ed-frrpe89f-d93u.webp"
cardSpan: "full"
originalId: "medium:e7cc836ff52c"
locale: "en"
placeholder: false
---

ADAMANT is a private messenger that operates entirely on a blockchain. By storing every message as an on-chain transaction, it addresses security flaws typical of both peer-to-peer and centralized messengers, offering a different trust model for private communications.

## Encryption and Signing

Every message is a blockchain transaction, encrypted and signed using Ed25519 EdDSA, Curve25519, Salsa20, and Poly1305. Messages are encrypted on the sender's device and decrypted on the recipient's device. The client app never transmits a user's private key or mnemonic passphrase over the network; all cryptographic operations are performed locally.

Because each account is identified by its public key on-chain, sender and recipient authenticity is verifiable. Man-in-the-middle attacks are detectable: if an attacker intercepts and relays messages, the sender identifier will not match the expected public key, exposing the interception.

## Blockchain as Message Storage

The blockchain serves as a redundant, reliable storage layer for message history. Messages cannot be backdated or altered after confirmation, and delivery is both signed and confirmed by the network. Message history is never stored on the user's local machine; it is loaded directly from the blockchain on demand. This also means a user can access their full message history from any device, similar to a centralized storage model, but without a central authority controlling the data.

## Decentralized Architecture

ADAMANT runs on a decentralized network of blockchain nodes operated by users. No central authority can deactivate, pause, or block the service. Accounts cannot be closed or limited by anyone, including the project's developers. The developers do not control user actions on the network.

## Privacy and Anonymity

Unlike P2P messengers, where a peer's IP address may be visible, all ADAMANT communications route through blockchain nodes, making it impossible to directly obtain a user's IP address. This is conceptually similar to routing through a Tor network.

The messenger requests no access to the user's address book, location, or other device data. There are no phone numbers required for account creation or access recovery, eliminating SMS interception as an attack vector. Accounts can be created in seconds, and users can change both their UID and encryption keys at will. No personal identification is required.

## Open Source

ADAMANT is fully open-source, allowing independent review of the client applications and node software.

![ADAMANT Messenger Security Features](/images/engineering-notes/medium/e7cc836ff52c/002-0-qtvvnsefdgux9haq.webp)

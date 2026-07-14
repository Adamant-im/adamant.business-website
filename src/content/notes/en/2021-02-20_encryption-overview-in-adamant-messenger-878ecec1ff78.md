---
title: "Encryption overview in ADAMANT Messenger"
slug: "encryption-overview-in-adamant-messenger-878ecec1ff78"
description: "ADAMANT relies on the same well established cryptographic algorithms used by Bitcoin, Ethereum, Signal, Tor, OpenSSH, and many others. Cryptography is conservative by nature, an…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/encryption-overview-in-adamant-messenger-878ecec1ff78"
publishedAt: "2021-02-20T08:36:23.523Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/878ecec1ff78/001-1-z7yxhckijxqq1g7m-pnbq-png.webp"
cardSpan: "full"
originalId: "medium:878ecec1ff78"
locale: "en"
placeholder: false
---

ADAMANT relies on the same well-established cryptographic algorithms used by Bitcoin, Ethereum, Signal, Tor, OpenSSH, and many others. Cryptography is conservative by nature, and every cipher must stand the test of time. What distinguishes ADAMANT is that the blockchain itself guarantees decentralization, anonymity via pseudonymity, message integrity and ordering, permanent storage, reliable delivery, and resistance to Man-in-the-Middle attacks. Messages and transactions are verified by every node on the network, not by the recipient or a central authority. The cost of this decentralization is transaction fees that compensate node operators.

### Account and key pair

An ADAMANT account starts with a BIP39 mnemonic passphrase of 12 words, providing roughly 132 bits of entropy across about 2048¹² possible combinations. The BIP39 seed is hashed with SHA-256 to produce a 256-bit value, from which Ed25519 digital signature keys are derived: a 256-bit public key and a 512-bit private key. This offers security comparable to RSA with ~3000-bit keys or strong 128-bit block ciphers. The user-facing ADM address is a 'U' followed by 8 bytes of the SHA-256 hash of the public key, yielding a 64-bit identifier. The Ed25519 public key is published to the blockchain with the user's first outgoing transaction.

### Message encryption

For encrypted messaging, the user's Ed25519 signing keys are converted to Curve25519 Diffie-Hellman keys—a 256-bit public key and a 256-bit secret key—enabling asymmetric encryption between parties. Messages are encrypted with the Curve25519-XSalsa20-Poly1305 cipher (NaCl.box), which uses XSalsa20 with a 192-bit nonce and Poly1305 for authenticated encryption, verifying both data integrity and message authenticity.

### Key-value storage (KVS)

For key-value storage, the user's Ed25519 signing keys are used to derive an XSalsa20-Poly1305 secret key. The data is serialized into a JSON object with added noise, then encrypted with NaCl.secretbox, again using XSalsa20 with a 192-bit nonce and Poly1305 for integrity and authenticity verification.

### Transaction signatures

Transaction data—including the timestamp and any encrypted message—is hashed with SHA-256. The sender signs this hash with Ed25519 using their 256-bit public key and 512-bit private key. The transaction ID is 8 bytes of the SHA-256 hash of the resulting signature.

Detailed technical references for key generation, message encryption/decryption, and transaction signing are available in the ADAMANT project wiki on GitHub.

### Blockchain storage and quantum computers

Some users worry that permanent on-chain storage of encrypted messages creates a future vulnerability: once quantum computers mature, could all stored correspondence be decrypted retroactively?

This concern is not specific to ADAMANT. Quantum cryptanalysis threatens the entire IT landscape—state secrets, internet traffic, stored data—because virtually all modern systems rely on the same families of cryptographic primitives. Mass surveillance programs such as PRISM already capture and retain traffic, so encrypted data intercepted today could be targeted by future cryptanalytic advances regardless of the platform used.

Quantum cryptanalysis is not a magic wand. It offers theoretical speedups for certain problems, but current ciphers carry significant safety margins that may render these speedups ineffective in practice. Moreover, an attacker cannot bulk-decrypt an entire blockchain; each account uses distinct encryption keys, so effort must be spent per account. Since ADAMANT accounts are anonymous, an adversary would first need to identify which accounts are worth targeting.

Practical quantum cryptanalysis is likely decades away, and the dominant threat to cryptography during that time may turn out to be something other than quantum computers. If post-quantum algorithms become necessary, ADAMANT can adapt its cryptography, as can other messengers and protocols.

For operational security, ADAMANT is best used for one-time or short-term correspondence with frequent account switches. Creating a new account takes about one second, which makes rotating identities practical and limits the value of any single compromised account.

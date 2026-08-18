---
title: "Who Is Responsible for Data? And What Changes When We Put It on a Blockchain"
slug: "who-is-responsible-for-data-and-what-changes-when-we-put-it-on-a-blockchain-515660f258cb"
description: "Every digital product begins with recording data about someone or something. As data moves through applications, vendors, databases, and sometimes a blockchain, responsibility f…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/who-is-responsible-for-data-and-what-changes-when-we-put-it-on-a-blockchain-515660f258cb"
publishedAt: "2026-08-17T14:11:55.973Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:515660f258cb"
coverImage: "/images/engineering-notes/medium/515660f258cb/001-2915e505dd.webp"
locale: "en"
placeholder: false
---

Every digital product begins with recording data about someone or something. As data moves through applications, vendors, databases, and sometimes a blockchain, responsibility feels diffuse. But a blockchain can distribute custody; it cannot make accountability disappear.

The absence of a central database administrator does not mean the absence of decisions, duties, or consequences. Someone still chooses what enters the system, why it is needed, how long it should remain, and what happens when it is wrong.

### Data Never Becomes Ownerless

Ownership is only one legal metaphor. A more practical question is: who has which responsibility at each stage of the data lifecycle? The person described by the data has rights. The party deciding why and how data is used sets the rules. Service providers implement storage and security. Engineers translate policy into schemas and permissions. Infrastructure operators keep systems available. Auditors and regulators provide oversight.

Under GDPR, a controller determines the purposes and means of processing, while a processor acts on the controller's behalf. The controller must demonstrate compliance across principles like purpose limitation, data minimization, accuracy, and storage limitation. This structure travels across jurisdictions: Was collection necessary? Was the person informed? Can an error be corrected? Is there a real party able to answer a complaint?

### What a Blockchain Changes — and What It Does Not

A conventional application gives one operator broad technical control to edit, revoke, or delete records. That same control enables remediation but also censorship and tampering. A blockchain changes this: multiple nodes reproduce an ordered history, validate changes under shared rules, and make unilateral rewriting difficult. NIST describes blockchains as tamper-evident and tamper-resistant, not magically immutable.

This creates a new trade-off: the harder a record is to change without permission, the harder it is to correct when change is legitimate. Responsibility moves rather than vanishes. Application designers decide what to submit. Protocol developers define valid state transitions. Validators enforce rules. Node operators replicate history. Governance decides software evolution. France's CNIL reached a similar conclusion: the participant who decides to register data can be considered a controller. "The protocol did it" is not a serious accountability model.

### When to Write Data On-Chain

Blockchain is justified when multiple parties need a shared state, do not fully trust one another, require ordering and provenance, value independent verification, and when the record can legitimately remain durable. This makes on-chain storage compelling for consensus-critical state (balances, transfers), public commitments (timestamped hashes), status and revocation registries, shared audit events, and censorship-resistant communication state. Permanence is part of the product, not a side effect.

### When to Keep Data Off-Chain

Most application data does not meet that test. Raw personal profiles, medical histories, private documents, mutable preferences, and large media files are poor candidates for permanent replication. Encrypting a record protects contents today, but ciphertext may remain available for decades. Keys leak, algorithms age, and metadata reveals relationships. "Deleting the key" (crypto-shredding) is not identical to removing every copy. Hashes are not automatically anonymous; if linked to a person or compared against small input sets, they may function as pseudonymous personal data.

NIST's work on privacy-enhancing distributed ledgers begins from the observation that conventional immutability can conflict with privacy rules requiring revision or deletion. Researchers have explored redactable ledger structures that retain integrity while allowing controlled erasure. Blockchain is a design space, not one sacred data structure.

### The Practical Default: Prove On-Chain, Store Off-Chain

For many products, the strongest architecture is hybrid: keep sensitive records in encrypted, access-controlled systems and put only the smallest proof on-chain. Store a document off-chain and anchor a hash on-chain. Issue verifiable credentials with selective disclosure. Publish revocation entries without private contents. Use versioning to recognize corrected states. Encrypt with rotatable keys and define retention policies.

W3C's Verifiable Credentials model separates issuer, holder, subject, and verifier. A person can prove a fact without exposing an entire identity record. The goal is to make trust portable while sharing less.

Sometimes you do not need a blockchain at all. A well-governed database provides encryption, access control, signed audit events, and rapid correction. A transparency log using Merkle trees (like Certificate Transparency, RFC 9162) provides inclusion proofs without distributed consensus. The decisive question is not "Can we use blockchain?" but "Which failure are we trying to prevent?"

### A Seven-Question Test Before the First Transaction

Before making data permanent, a project must answer these questions in plain language. What exact claim must be verified? Who must agree on the state? Would one accountable operator be acceptable? Could the data become wrong, harmful, or legally erasable? Can a proof replace the payload? Who handles correction and redress? What happens in twenty years regarding key compromise and cryptographic aging?

### ADAMANT: Permanence for Transport, Privacy for Content

ADAMANT offers a concrete example of deliberate trade-off. The network uses a Delegated Proof of Stake blockchain as a decentralized trust layer for communication. Clients do not need to trust one company's server to preserve shared transaction history.

But the blockchain is not an excuse to publish plaintext. According to ADAMANT documentation, message transaction assets are encrypted before being packed into transactions, signed, and broadcast. Basic chat uses authenticated public-key encryption based on NaCl box; key-value records use NaCl secretbox. The client performs cryptographic work locally.

The encrypted message body remains private while the network needs transaction metadata — sender, recipient, timestamp, fee, signature — to validate and route activity. Encryption protects content; it does not make every relationship invisible. ADAMANT's architecture shows the legitimate blockchain case: communication should not disappear because one company closes an account, yet the system minimizes what public nodes need to understand about the private message itself.

### Responsibility Is a Feature

Trustworthy products will not win by collecting the most data or declaring every database immutable. They will win by making responsibility legible. Users should know what is recorded and what remains private. Developers should explain why each field exists. Operators should know their security duties. Governance should provide correction paths. Decentralization is strongest when it removes unnecessary control without removing accountability. Blockchain is strongest when it carries the proof — not the whole story.

![Who Is Responsible for Data? And What Changes When We Put It on a Blockchain](/images/engineering-notes/medium/515660f258cb/002-87fcd750d8.webp)

A practical decision map for choosing between off-chain, hybrid, and on-chain data.

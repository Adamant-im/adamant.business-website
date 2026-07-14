---
title: "Transaction Publishing, Normalization, Verification, and Broadcast on ADAMANT Nodes"
slug: "discussion-46-some-notes-about-transaction-publishing-normalization-verification-and-broadcast-on-adm-no-10016205"
description: "Functions Transaction.prototype.verify checks a transaction retrieved from other blocks, which may include old transactions. Transactions.prototype.publish checks incoming trans…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/46"
publishedAt: "2026-05-07T07:27:25Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10016205"
locale: "en"
placeholder: false
---

## Functions

`Transaction.prototype.verify` checks a transaction retrieved from other blocks, which may include old transactions. `Transactions.prototype.publish` checks incoming transactions from users, verifying fresh unconfirmed transactions. `verify` is also called after receiving a new transaction from the API, following the `publish` and `objectNormalize` methods. `publish` is only called when pushing transactions via the public API.

## Transaction Processing

When a node receives a new transaction from a client app via the API as the first node to see it, `Logic->Transaction.prototype.publish` creates a new transaction from the received data, validates the client's transaction properties (including `timestampMs`), adds a transaction ID, and processes the unconfirmed transaction as usual. If a node receives a new transaction from another peer at the current height, it validates the transaction and removes the peer if it is invalid, then processes the unconfirmed transaction. When fetching a transaction from another peer while arising or verifying the blockchain from height 0, the node validates the transaction, removes the peer if invalid, and processes the unconfirmed transaction while verifying multiple transactions at a time. Validation involves the node calling `objectNormalize()` for schema validation of a received transaction.

The unconfirmed transaction processing flow begins with `logic.transaction.process()`, which verifies the transaction ID and normalizes the sender ID. Next, the transaction is normalized: `logic.transaction.objectNormalize()` validates the transaction object against a schema and removes unnecessary properties, including `timestampMs` before spaceship activation. Finally, `logic.transaction.verify()` is called to verify all properties such as `timestamp`, `timestampMs`, and `signature`.

Removing a peer means removing it from the peer list until it is rediscovered; nodes do not ban peers, so the `BANNED` status is never applied. A node broadcasts a transaction to other nodes after processing the unconfirmed transaction. Besides `objectNormalize()`, the node has `normalize()`, which is only used for the POST `/transactions/normalize` endpoint that should be deprecated. The node has both `apply()` and `applyUnconfirmed()` because "apply" methods change the balances of the sender and recipient accounts, while `applyUnconfirmed()` changes the unconfirmed balance; the same applies to "undo" methods. When a node generates a new block, transactions are taken from an already verified list. Currently, `publish()` checks if the transaction timestamp is in the future or more than `constants.maxTransactionAgeSec` seconds in the past. There is no point in adding the same checks in `publish` as in `verify` because the latter must be called after `publish`. Also, `publish`'s checks cannot be included in `verify` because they depend on the current time, making it impossible to verify whether an old transaction is no more than 5 seconds old. A client app will receive error texts like `The difference between timestamp and timestampMs is greater than ${maxTimestampMsDelta}ms.` or `Invalid transaction timestamp. Timestamp is not in the int32 range` if they are not in `publish()` but in `verify()`.

## Timestamp Notes

Transaction `timestamp` is ADAMANT epoch time in seconds, not Unix time. Transaction `timestampMs` should be ADAMANT epoch time in milliseconds, not Unix time; Unix milliseconds can be derived as `constants.epochTime.getTime() + timestampMs`. The `timestampMs` field is not part of transaction bytes, signatures, transaction IDs, or hashes, even after the `spaceship` activation. After `spaceship`, consensus-sensitive validation should require `timestampMs` to be in the same ADAMANT epoch second as `timestamp`: `0 <= timestampMs - timestamp * 1000 < 1000`. This stricter same-second rule is intentional: `timestampMs` must refine the exact same ADAMANT epoch second stored in `timestamp`, and clients should compute `timestamp = Math.floor(timestampMs / 1000)`. Using `Math.round()` or `Math.ceil()` near a second boundary creates an inconsistent pair and should be rejected. A review of current clients and sources found that `adamant-api-jsclient`, the PWA, `adamant-console` (via `adamant-api@2.4.0`), iOS, and documentation examples all use `Math.floor` or equivalent truncation, with no outgoing ADM transaction timestamp generation path using `round` or `ceil`. Before `spaceship`, consensus-sensitive normalization should remove `timestampMs` so pre-activation behavior stays compatible with older nodes. Multiple transactions from the same sender within one second are allowed as long as they are distinct transactions; `timestampMs` helps clients sort fast chat messages but must not become a transaction nonce or signature input.

## Admission-Time Checks

The `publish()` method contains public API admission checks for freshly submitted transactions, which may depend on the node's current clock. If a transaction passes `publish()`, it is still processed by `verify()`, which intentionally has no current-time check and should keep only deterministic checks like schema, id, signatures, balances, and the `timestampMs` same-second rule. Current-time checks from `publish()` must not be moved into `verify()` because `verify()` is used for replay, synchronization, and historical transactions. The existing future check is slot-based: with 5-second slots, a client clock ahead by about 400 ms only causes `Transaction timestamp is in the future` when the rounded seconds timestamp crosses into the next slot. `maxTransactionFutureMs` is a non-consensus public API admission tolerance applied only in `publish()`, not in replay, peer/block verification, or consensus activation logic. The intended condition preserves the old slot-based admission policy while softening the boundary case by rejecting only when `transactionSlotNumber > currentSlotNumber` and the transaction time is more than `maxTransactionFutureMs` ahead of the node's current time. For this calculation, use `timestampMs` when the client provided it; otherwise fall back to `timestamp * 1000`. A small non-consensus grace in `publish()` (for example, 500 ms for the next slot) can improve UX for slightly fast client clocks without changing replay validation, though client apps should still keep a small timestamp reserve for compatibility with older nodes. A transaction whose `timestamp` is one second ahead of the current block can still be included in that block without breaking the blockchain, as transaction `timestamp` is signed transaction metadata, not the source of slot or block validity, and consensus does not require `tx.timestamp <= block.timestamp`. During replay, nodes do not compare transaction timestamps with local wall-clock time, so the admission-time grace cannot create replay divergence.

## Status Endpoint

The `/api/node/status` endpoint may return additional clock fields such as `nodeTimestampMs` (ADAMANT epoch milliseconds) and `unixTimestampMs` without consensus impact. `nodeTimestamp` remains ADAMANT epoch seconds.

## Activation Heights

Consensus activation heights should be configurable for testnet and ADAMANT-based chains while preserving mainnet defaults in code or config. The historical `fairSystemActivateBlock: 4359464` check used `height > fairSystemActivateBlock`, so the equivalent first active height for a named `fairSystem` activation is 4,359,465. The `spaceship` activation should gate only consensus-sensitive behavior such as accepting, normalizing, storing, and validating `timestampMs` during block, peer, and replay processing. Clock-relative `publish()` checks are admission policy and should remain outside consensus activation.

---
title: "ADM Blockchain Fork Recovery Procedure"
slug: "discussion-25-adm-blockchain-recovering-procedure-8951749"
description: "In the ADAMANT blockchain node software, short forks can occur when multiple delegate nodes produce blocks at the same time. The network must then decide which block to retain.…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/25"
publishedAt: "2025-09-27T12:49:14Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:8951749"
locale: "en"
placeholder: false
---

In the [ADAMANT blockchain node software](https://github.com/Adamant-im/adamant), short forks can occur when multiple delegate nodes produce blocks at the same time. The network must then decide which block to retain. The current consensus rule is to pick the oldest block, assuming the timestamp is trustworthy, or if timestamps are equal, to choose the block with the smallest ID. These short forks happen regularly in blockchains and do not escalate into larger or dangerous forks.

## Deleting the Last Block

A node logs "Deleting last block" when a fork is detected, either during recovery or upon receiving a new block. A common trigger is when the node receives a block with the same height and previous block ID as an existing block, but a different block ID itself. This is a normal recovery action that keeps the blockchain consistent without producing deeper forks.

## Example Log

The following log entry illustrates the recovery action. The block being deleted has height 48093334 and ID 15500937233239097229. The full transaction payloads are omitted here for brevity, but the key metadata shows the block version, totals, reward, generator, and timestamp:

```
[WRN] 2025-08-06 00:00:09 | Deleting last block - {"version":0,"totalAmount":12119967437,"totalFee":150000000,"reward":15000000,"payloadHash":"b04ed7f935bec1f74b7a179ff07557a36ca5ea38d6966381f1a5794ca9df7125","timestamp":250066805,"numberOfTransactions":3,"payloadLength":351,"previousBlock":"17914802164676259429","generatorPublicKey":"547919533beb2612d76e3a7d5f38e61145a2b0ecb96d971277f34fb8efd3bcb3","blockSignature":"64be4069540ab86f195d3bfb477ac8b2514dc99c33b881d98cdab103101b95e21c3f0cb1d6df5a128977a13992956c5390d7e69b18eb99055250c55d9b734802","height":48093334,"id":"15500937233239097229","relays":3}
```

## Summary

Forks are resolved automatically by selecting the oldest block or the block with the smallest ID. The "Deleting last block" action is a routine recovery step taken when conflicting blocks at the same height are detected, ensuring the blockchain remains consistent without producing deeper forks.

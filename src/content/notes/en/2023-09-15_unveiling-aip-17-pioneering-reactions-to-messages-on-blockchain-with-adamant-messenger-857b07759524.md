---
title: "AIP-17: Message Reactions on Blockchain with ADAMANT Messenger"
slug: "unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
description: "ADAMANT Improvement Proposal 17 (AIP 17) introduces emoji based reactions to messages in ADAMANT Messenger — a feature not previously available in any blockchain messaging app.…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
publishedAt: "2023-09-15T10:09:07.924Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/857b07759524/001-0-tn1uulgukvtmgwym.webp"
cardSpan: "full"
originalId: "medium:857b07759524"
locale: "en"
placeholder: false
---

ADAMANT Improvement Proposal 17 (AIP-17) introduces emoji-based reactions to messages in ADAMANT Messenger — a feature not previously available in any blockchain messaging app. The proposal defines a standardized structure for reactions that integrates with the existing message infrastructure.

## How It Works

Reactions are transmitted as ADM rich messages, following the conventions established in AIP-5 (Rich Content Messages). A new mandatory field, `reactto_id`, identifies the transaction ID of the message being reacted to. A second field, `react_message`, carries the emoji chosen by the user. Reactions can be edited or removed after creation.

A reaction payload looks like this:

```json
{
  "reactto_id": "Transaction_ID",
  "react_message": "👍"
}
```

Because every reaction is itself an on-chain transaction referencing another transaction by ID, the approach preserves ADAMANT's existing auditability and decentralization model while adding a lightweight expressive layer on top of standard chat messages.

Implementation is expected to land in ADAMANT apps across all platforms. Technical discussion and the full proposal are available on the [AIP-17 proposal page](https://github.com/Adamant-im/AIPs/issues/52).

![AIP-17: Message Reactions on Blockchain with ADAMANT Messenger](/images/engineering-notes/medium/857b07759524/002-1-zslip-kei08fk54o3-u34q-png.webp)

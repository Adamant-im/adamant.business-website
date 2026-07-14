---
title: "Fair Delegate System in dPoS"
slug: "fair-delegate-system-in-dpos-568e5c3c86c8"
description: "Decentralization is a critical attribute of ADAMANT, and the team has assessed possible improvements to the ecosystem by examining lessons from other dPoS networks such as Lisk.…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/fair-delegate-system-in-dpos-568e5c3c86c8"
publishedAt: "2018-07-14T10:22:15.269Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/568e5c3c86c8/001-0-b1b6dbg3hvdjf9i4.webp"
cardSpan: "full"
originalId: "medium:568e5c3c86c8"
locale: "en"
placeholder: false
---

Decentralization is a critical attribute of ADAMANT, and the team has assessed possible improvements to the ecosystem by examining lessons from other dPoS networks such as Lisk.

On Lisk, becoming an active delegate requires roughly 29 million LSK worth of votes, and over 1,600 delegates have been permanently relegated to Standby mode. The lowest-ranked active delegate holds a vote weight of nearly 28.7 million LSK — an extremely high entry barrier.

![Fair Delegate System in dPoS](/images/engineering-notes/medium/568e5c3c86c8/002-0-gyx2cakh6c0w-8a.webp)

The core problem is that in a conventional dPoS system, a single "thick" wallet can distribute equally thick votes to a large list of delegates at once. One wallet voting for 101 delegates can effectively subject the entire network to its control.

ADAMANT addresses this by **dividing the vote weight of each wallet by the number of delegates it votes for**:

> *Vote weight = ADM / Votes*

For example, if Bob holds 100 ADM and votes for two delegates while Alice holds 80 ADM and votes for one, Bob's vote is split to 50 per delegate. Alice's single delegate receives the full 80. Under Lisk's model, Bob's delegates would each receive 100 — more than Alice's — which is unfair. Under ADAMANT's model, Alice's delegate has greater influence, reflecting a more equitable distribution.

A second parameter, **Productivity**, further refines vote weight. The network requires diligent delegates who miss no blocks, ensuring messages on the ADAMANT Messenger are delivered without delay. Productivity ranges from 0.05% to 100%, reducing vote weight for delegates who do not maintain reliable nodes. When a delegate begins forging, productivity is not counted for the first 200 blocks (produced plus missed).

The final formula is:

> *Vote weight = ADM / Votes × Productivity*

This approach is called **Fair dPoS**. It reduces the influence of thick wallets to reasonable levels and lowers the entry barrier for forging. The productivity factor motivates delegates to run nodes on more powerful hardware rather than minimal setups. Because both token distribution and delegate productivity shift over time, the list of 101 forging delegates is regularly rebuilt, giving Standby delegates a realistic chance to return to forging.

Users with small ADM balances can also participate by forming pools. These changes went live starting with release 0.4.0, from block 4359464.

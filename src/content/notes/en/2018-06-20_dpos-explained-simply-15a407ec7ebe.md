---
title: "DPoS Explained — Simply"
slug: "dpos-explained-simply-15a407ec7ebe"
description: "Blockchain is a distributed technology. Unlike classical centralized systems, no single individual has extensive power over the network; only the entire connected community poss…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/dpos-explained-simply-15a407ec7ebe"
publishedAt: "2018-06-20T13:44:33.120Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/15a407ec7ebe/001-0-boc7uxzeiy2c0lhm.webp"
cardSpan: "full"
originalId: "medium:15a407ec7ebe"
locale: "en"
placeholder: false
---

Blockchain is a distributed technology. Unlike classical centralized systems, no single individual has extensive power over the network; only the entire connected community possesses such influence. For the system to be truly distributed, the **Proof-of-Work (PoW)** method was realized through a process known as mining (e.g., Bitcoin, Litecoin). If Bob's computer is faster than Alice's, he has more influence on the network.

Mining has a significant drawback, however: large electricity costs. An alternative method, **Proof-of-Stake (PoS)** (e.g., PeerCoin, NXT), was invented to address this. In PoS, a user's influence depends on their active share in the network. Suppose Bob has 100 network coins and Alice has 90. Bob has more influence, but if he sells 20 coins, he drops to 80 and Alice gains the greater influence.

The next improvement is **Delegated Proof-of-Stake (dPoS)** and its variations, used by projects such as BitShares, Lisk, and ADAMANT Messenger. This method works similarly to PoS, but with an important distinctive feature: you can transfer (delegate) your influence on the network to other users.

Suppose Bob has 100 coins and Alice has 80. Bob votes (delegates influence) for Bill and Helen, and Alice votes for Mark. In the case of Lisk's dPoS, Bill and Helen are more influential (100) than Mark (80), which is unfair by some assessments.

> ADAMANT improved this dPoS system by diminishing vote weight according to the number of votes. Since Bob votes for two delegates, his vote is 100/2 = 50. Bill and Helen then each have 50 in impact, while Mark has 80. Mark's influence becomes greater than that of Bill and Helen.

ADAMANT's improved dPoS also considers **node productivity**. Faster, more successful nodes that do not miss blocks receive a greater vote weight. This approach is called **Fair dPoS**.

Fair dPoS allows more significant network participants to ensure that everything runs as intended. Delegates are not only responsible for the proper functioning of the network, but also receive a reward in coins for their role.

To become a delegate on the ADAMANT network, you need to install a node, register as a delegate, and earn the votes of users who trust you. You must gather enough votes so that the sum of your voters' coins brings you into the list of the top 101 delegates.

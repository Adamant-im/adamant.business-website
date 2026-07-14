---
title: "DPoS 解释——简单明了"
slug: "dpos-explained-simply-15a407ec7ebe"
description: "区块链是分布式技术。与传统中心化系统不同，没有单一个人对网络拥有广泛权力；只有整个互联社区才具备这种影响力。"
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
locale: "zh"
placeholder: false
---

区块链是分布式技术。与传统中心化系统不同，没有单一个人对网络拥有广泛权力；只有整个互联社区才具备这种影响力。为了实现真正的去中心化，系统通过一种称为挖矿的过程实现了**工作量证明（Proof-of-Work, PoW）**方法（例如比特币、莱特币）。如果 Bob 的计算机比 Alice 的更快，那么他对网络的影响力就更大。

然而，挖矿存在一个显著缺点：电力消耗巨大。为此，人们发明了另一种方法——**权益证明（Proof-of-Stake, PoS）**（例如 PeerCoin、NXT）。在 PoS 中，用户的影响力取决于其在网络中的持币数量。假设 Bob 拥有 100 个网络代币，而 Alice 拥有 90 个，那么 Bob 的影响力更大；但如果 Bob 卖出 20 个代币，他的持有量降至 80，此时 Alice 的影响力就超过了 Bob。

接下来的改进是**委托权益证明（Delegated Proof-of-Stake, dPoS）**及其变体，被 BitShares、Lisk 和 ADAMANT Messenger 等项目采用。该方法的工作方式与 PoS 类似，但有一个重要区别：你可以将自己的网络影响力委托给其他用户。

假设 Bob 拥有 100 个代币，Alice 拥有 80 个。Bob 将他的投票权（影响力）委托给 Bill 和 Helen，而 Alice 将其委托给 Mark。在 Lisk 的 dPoS 机制下，Bill 和 Helen 的影响力各为 100，而 Mark 仅为 80，这在某些评估看来是不公平的。

> ADAMANT 改进了这一 dPoS 系统，根据投票数量降低每票的权重。由于 Bob 将投票权分配给了两位代表，他的总票数被均分，即每票为 100/2 = 50。因此，Bill 和 Helen 各获得 50 的影响力，而 Mark 拥有 80。此时 Mark 的影响力超过了 Bill 和 Helen。

ADAMANT 改进后的 dPoS 还考虑了**节点生产力**。运行更快、出块成功率更高且不遗漏区块的节点将获得更高的投票权重。这种方法被称为**公平 dPoS（Fair dPoS）**。

公平 dPoS 使更重要的网络参与者能够确保一切按预期运行。代表们不仅负责网络的正常运行，还会因其角色而获得代币奖励。

要在 ADAMANT 网络上成为代表，你需要安装一个节点，注册为代表，并赢得信任你的用户的投票。你必须积累足够的投票，使得支持你的用户所持代币总数足以让你进入前 101 名代表的名单。

---
title: "dPoS中的公平代表系统"
slug: "fair-delegate-system-in-dpos-568e5c3c86c8"
description: "ADAMANT团队通过研究Lisk等dPoS网络的经验，评估了生态系统可能的改进，以增强去中心化。"
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
locale: "zh"
placeholder: false
---

去中心化是ADAMANT的关键属性，团队通过研究Lisk等其他dPoS网络的经验，评估了对生态系统的可能改进。

在Lisk网络中，成为活跃代表需要约2900万LSK的投票支持，超过1,600名代表已被永久 relegated 至待机（Standby）模式。排名最低的活跃代表仍拥有近2870万LSK的投票权重——这一准入门槛极高。

![dPoS中的公平代表系统](/images/engineering-notes/medium/568e5c3c86c8/002-0-gyx2cakh6c0w-8a.webp)

核心问题在于，在传统的dPoS系统中，一个单一的“厚重”钱包可以一次性向大量代表均匀分配同样厚重的投票权。一个钱包为101个代表投票，实际上可能使整个网络受其控制。

ADAMANT通过**将每个钱包的投票权重除以其投票的代表数量**来解决此问题：

> *投票权重 = ADM / 投票数*

例如，如果Bob持有100 ADM并为两名代表投票，而Alice持有80 ADM但只为一名代表投票，则Bob的投票将被均分为每个代表50。Alice的单一代表则获得完整的80。在Lisk的模型下，Bob的每位代表都将获得100票——超过Alice的代表——这是不公平的。而在ADAMANT的模型下，Alice的代表拥有更大的影响力，体现了更公平的分配。

第二个参数——**出块率（Productivity）**——进一步优化了投票权重。网络要求代表持续稳定出块，确保ADAMANT Messenger的消息能及时送达。出块率范围为0.05%至100%，对未能维护可靠节点的代表降低其投票权重。当代表开始出块时，前200个区块（包括已出和错过的区块）不计入出块率统计。

最终公式为：

> *投票权重 = ADM / 投票数 × 出块率*

这种方法被称为**公平dPoS（Fair dPoS）**。它将厚重钱包的影响力控制在合理水平，并降低了出块的准入门槛。出块率机制激励代表使用更强大的硬件运行节点，而非最低配置。由于代币分布和代表出块率会随时间变化，101个出块代表的名单会定期重组，使待机代表有机会重新进入出块状态。

持有少量ADM余额的用户也可通过组建投票池参与其中。这些变更自0.4.0版本起生效，从区块4359464开始实施。

---
title: "公平 dPoS 代表系统正式上线"
slug: "fair-dpos-delegate-system-goes-live-3dc794635cec"
description: "公平 dPoS 代表系统已在 ADAMANT 网络上线，代表列表已据此重新排序。新的排名机制考虑两个因素：节点生产力和用户投票数量。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/fair-dpos-delegate-system-goes-live-join-channel-for-delegates-to-discuss-adamant-plans-3dc794635cec"
publishedAt: "2018-08-03T14:49:40.529Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3dc794635cec/001-0-lzmtq2zdlgz-z1tc.webp"
cardSpan: "full"
originalId: "medium:3dc794635cec"
locale: "zh"
placeholder: false
---

公平 dPoS 代表系统已在 ADAMANT 网络上线，代表列表已据此重新排序。

新的排名机制考虑两个因素：**Node Productivity** 和 **用户投票数量**。投票权重的最终公式为：

> **投票权重 = ADM / 投票数 × 生产力**

这意味着代表的有效投票权重由支持者持有的 ADM 数量除以收到的投票数，再乘以节点的生产力决定。该公式会奖励那些维护可靠节点的代表，同时通过惩罚拥有大量低质押投票的代表，来抑制投票集中现象。

**重要提示**：所有运行低于 0.4.0 版本的节点已被网络拒绝。节点运营者必须升级到当前版本，才能继续参与共识。

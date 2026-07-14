---
title: "在 ADAMANT 中实现即时通讯速度"
slug: "speed-comparable-to-classic-instant-messengers-9fd54197b221"
description: "区块链信使通常因区块生成频率限制而牺牲速度以换取安全性和匿名性。ADAMANT 通过优化将消息传递时间缩短至 0 到 2 秒。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/speed-comparable-to-classic-instant-messengers-9fd54197b221"
publishedAt: "2021-07-15T11:15:24.341Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9fd54197b221/001-0-nrvhmelzkoggifv.webp"
cardSpan: "full"
originalId: "medium:9fd54197b221"
locale: "zh"
placeholder: false
---

区块链信使通常在速度、安全性和匿名性之间做出权衡，因为消息传递通常受限于区块生成频率。ADAMANT 已解决这一限制，将消息传递时间缩短至 0 到 2 秒之间。

这一性能提升主要通过两项优化实现。首先，ADAMANT 实现了客户端与节点之间的套接字连接，以支持点对点通信速度。随后，节点配置得到更新，能够更快速地交换交易，特别优化了未确认交易在网络中的传播。因此，连接到不同网络节点的用户现在几乎可以即时收到消息，使通信体验与传统的中心化即时信使相当。

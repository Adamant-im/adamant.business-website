---
title: "Fair Delegate System Released, Adding Impact of Productivity"
slug: "fair-delegate-system-released-adding-impact-of-productivity-ce520991b69e"
description: "The ADAMANT Messenger team has implemented a Fair Delegate System that adds delegate productivity to the calculation of Vote Weight. Under this change, faster and more successfu…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/fair-delegate-system-released-adding-impact-of-productivity-also-ce520991b69e"
publishedAt: "2018-07-27T10:46:38.629Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/ce520991b69e/001-1-qphtcpiaasctmknauyllq-png.webp"
cardSpan: "full"
originalId: "medium:ce520991b69e"
locale: "en"
placeholder: false
---

The ADAMANT Messenger team has implemented a Fair Delegate System that adds delegate productivity to the calculation of Vote Weight. Under this change, faster and more successful nodes that do not miss blocks will receive a greater Vote Weight, incentivizing reliable block production across the network.

A separate fix addresses an error that caused nodes to become stuck on block 4078586.

This update is mandatory for all nodes on the network, including those that do not run delegates. The changes take effect from block 4359464, approximately August 3, 2018. Two days after that block, any node still running a version below 0.4.0 will be rejected by the network.

Release details are available on the [ADAMANT GitHub repository](https://github.com/Adamant-im/adamant/releases/tag/v0.4.0).

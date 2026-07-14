---
title: "Fair dPoS Delegate Systemが稼働開始"
slug: "fair-dpos-delegate-system-goes-live-3dc794635cec"
description: "Fair dPoS Delegate SystemがADAMANTネットワークで運用開始。新たなランキングシステムでは、ノードの生産性とユーザー投票数を考慮して委任者リストを再編成。"
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
locale: "ja"
placeholder: false
---

Fair dPoS Delegate SystemがADAMANTネットワークで稼働開始し、それに応じて委任者リストが再順序付けられました。

新しいランキングシステムは、**ノード生産性**と**ユーザー投票数**の2つの要素を考慮します。投票の重みの最終的な計算式は以下の通りです：

> **投票重み = ADM / 投票数 × 生産性**

これは、支持者の保有するADM量を獲得した投票数で割り、ノードの生産性を掛け合わせた値が、委任者の実効的な投票重みとなることを意味します。この式により、信頼性の高いノードを維持する委任者に報酬が与えられ、一方で少数のADMしか保有しない多数の投票を持つ委任者はペナルティを受け、投票の集中が抑制されます。

**重要：** バージョン0.4.0未満を実行しているすべてのノードは、ネットワークによって拒否されています。ノード運営者は、コンセンサスに継続参加するために最新バージョンへ更新する必要があります。

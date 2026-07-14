---
title: "Fair Delegate Systemがリリースされ、生産性の影響を追加"
slug: "fair-delegate-system-released-adding-impact-of-productivity-ce520991b69e"
description: "ADAMANT Messengerチームは、投票重みの計算にDelegateの生産性を追加するFair Delegate Systemを実装しました。これにより、より高速で成功したノードがより大きな投票重みを得ます。"
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
locale: "ja"
placeholder: false
---

ADAMANT Messengerチームは、投票重み（Vote Weight）の計算にDelegateの生産性を加味する「Fair Delegate System」を実装しました。この変更により、ブロックを欠かさず、より高速かつ高成功率で動作するノードがより大きな投票重みを得られるようになり、ネットワーク全体での信頼性の高いブロック生成が促進されます。

別途、ノードがブロック4078586で停止してしまう問題を修正しています。

このアップデートは、Delegateを実行していないノードを含め、ネットワーク上のすべてのノードに対して必須です。変更はブロック4359464から有効となり、これは約2018年8月3日に相当します。そのブロックから2日後には、バージョン0.4.0未満を実行しているノードはネットワークによって拒否されます。

リリースの詳細は[ADAMANT GitHubリポジトリ](https://github.com/Adamant-im/adamant/releases/tag/v0.4.0)で確認できます。

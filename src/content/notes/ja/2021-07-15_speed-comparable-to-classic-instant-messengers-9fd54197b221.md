---
title: "ADAMANTでインスタントメッセンジャー並の速度を実現"
slug: "speed-comparable-to-classic-instant-messengers-9fd54197b221"
description: "ADAMANTはブロック生成頻度の制約を超えて、メッセージ送信時間を0〜2秒に短縮しました。セキュリティと匿名性を維持しながら、リアルタイム通信に近づけました。"
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
locale: "ja"
placeholder: false
---

ブロックチェーンベースのメッセンジャーは、通常、ブロック生成の頻度にメッセージ送信が依存するため、速度よりもセキュリティと匿名性を優先しています。ADAMANTはこの課題に対処し、メッセージの配信時間を0〜2秒の範囲にまで短縮しました。

このパフォーマンスの向上は、主に2つの最適化によって達成されました。まず第一に、ADAMANTはクライアントとノード間のソケット接続を実装し、ピアツーピア通信の速度を高めました。次に、ノードの設定を更新してトランザクションをより迅速に交換できるようにし、特に未承認トランザクションのネットワーク内での伝播に注力しました。その結果、異なるネットワークノードに接続しているユーザー間でも、ほぼ即座にメッセージが届くようになり、従来の中央集権型インスタントメッセンジャーに匹敵する通信体験を実現しています。

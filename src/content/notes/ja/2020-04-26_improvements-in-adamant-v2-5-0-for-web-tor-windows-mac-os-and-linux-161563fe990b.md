---
title: "ADAMANT v2.5.0におけるWeb、Tor、Windows、Mac OS、Linux向けの改善点"
slug: "improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-and-linux-161563fe990b"
description: "ADAMANT v2.5.0では、Web、Tor、デスクトップアプリ向けの改善とバグ修正が多数含まれています。ブロックチェーンベースのメッセージングアプリとして、ADAMANTはネットワークノードの増加によりより高い分散化を実現しています。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-linux-161563fe990b"
publishedAt: "2020-04-26T17:21:28.135Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/161563fe990b/001-0-rzxpq8psh7gjckqp.webp"
cardSpan: "full"
originalId: "medium:161563fe990b"
locale: "ja"
placeholder: false
---

ADAMANT v2.5.0では、Web、Tor、およびデスクトップアプリケーション全体でいくつかの改善点とバグ修正が導入されています。ブロックチェーンベースのメッセージングアプリとして、ADAMANTはより多くのネットワークノードを持つことで分散性の向上を実現しています。Webアプリケーションには現在9つのノードが含まれており、その内訳はHTTPタイプ3つ、HTTPSタイプ6つです。HTTPS接続を使用する際はHTTPSノードのみが利用可能ですが、Windows、macOS、Linux向けのデスクトップアプリケーションではすべての9つのノードにアクセスできます。

このアップデートでは、ADMの売買が可能な取引所リストも見直され、IDCMが削除され、CoinDealが追加されました。また、ResfinexおよびBit-Zのリンクも更新されています。ADAMANTのMarkdownサポートも改善され、`code`ブロックの等幅フォントが正しく表示されるようになりました。

![ADAMANT v2.5.0におけるWeb、Tor、Windows、Mac OS、Linux向けの改善点](/images/engineering-notes/medium/161563fe990b/002-0-sqpbhli5aps7yqjd.webp)

Tor版のメッセージングアプリでは、WebSocket接続が修正され、メッセージの配信速度が向上しました。

![ADAMANT v2.5.0におけるWeb、Tor、Windows、Mac OS、Linux向けの改善点](/images/engineering-notes/medium/161563fe990b/003-0-fblaod14ec32orwh.webp)

本リリースにおけるその他のメンテナンス作業として、依存関係の更新、ノードプロトコルのチェック、HTTPホストにおけるノードステータスおよびソケット接続の修正が含まれます。また、固定チャット名の問題、「新しいチャットを開始」フロー内での貼り付けアドレスの検証、Windowsおよび他のアプリケーションにおけるADMアドレス向けのQRコード生成も修正されています。さらに、「公開鍵がありません」と「ハッシュがありません」のエラーメッセージのローカライズも改善されました。

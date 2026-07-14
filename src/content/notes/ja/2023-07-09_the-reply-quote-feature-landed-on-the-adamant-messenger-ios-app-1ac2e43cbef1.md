---
title: "ADAMANT Messenger iOSアプリに返信/引用機能が実装されました"
slug: "the-reply-quote-feature-landed-on-the-adamant-messenger-ios-app-1ac2e43cbef1"
description: "ADAMANT Messengerの最新iOSアプリアップデートで、返信/引用機能が追加されました。ブロックチェーン上でのメッセージやり取りがさらに使いやすく。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/the-reply-quote-feature-landed-on-the-adamant-messenger-ios-app-1ac2e43cbef1"
publishedAt: "2023-07-09T13:23:47.869Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/1ac2e43cbef1/001-0-f-bl9cbsppi6phqr.webp"
cardSpan: "full"
originalId: "medium:1ac2e43cbef1"
locale: "ja"
placeholder: false
---

ADAMANT Messengerは、すべてのメッセージがトランザクションとしてブロックチェーン上に記録される分散型コミュニケーションプラットフォームですが、その最新のiOSアプリアップデートで、返信/引用（Reply/Quote）機能を導入しました。ADAMANTは分散型アーキテクチャ上で動作しているため、従来の中央集権型メッセージアプリとは異なり、引用のような標準的なメッセージ機能を実装するには独自の技術的アプローチが必要です。

返信/引用機能は、メッセージを左にスワイプするか、長押しすることで起動できます。これに加えて、このアップデートでは「Contribute（貢献）」セクションも新たに導入され、ユーザーがプラットフォームの開発を直接支援できるようになりました。また、クラッシュ解析のオプション機能も追加されており、デフォルトでは無効になっていますが、ユーザーはContributeセクションからCrashlyticsを有効にして、開発者がアプリの安定性向上のためのデータを収集するのを支援できます。

![The Reply/Quote feature landed on the ADAMANT Messenger iOS app](/images/engineering-notes/medium/1ac2e43cbef1/002-0-pdyl0ofrnylbkm4e.webp)

今回のリリースでは、いくつかのウォレットおよびトランザクションに関する問題も修正されています。BTCウォレットのトランザクションにおいて、BC1（SegWit）アドレスが正常に機能するようになりました。ETHおよびERC20トランザクションのガスリミットの問題も修正され、ETH、ERC20、BTCのトランザクションでガス量を増加させるスイッチが追加されています。また、コインのアドレス検証機能が強化され、QRコード内の「amount」パラメータもサポートされるようになりました。

その他の改善点として、メッセージ表示時のスクロールバグの修正、検索フィールドから直接新しいチャットを開始できるようにする機能、macOS、iPad、iPhone向けのデザインバグの修正が含まれます。安定性とパフォーマンスを向上させるために新しいノードも追加されており、ユーザーは「Nodes（ノード）」画面で『Reset（リセット）』をタップすることで、最新のノードリストを取得できます。

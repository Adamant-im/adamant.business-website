---
title: "ADAMANT MessengerがGoogle Playで利用可能になりました"
slug: "welcome-adamant-on-google-play-8b975107cdb2"
description: "分散型メッセンジャーADAMANTがGoogle Playで利用可能になりました。アプリはデフォルトで権限を要求せず、位置情報や端末のアドレス帳へのアクセスを必要としません。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/welcome-adamant-on-google-play-8b975107cdb2"
publishedAt: "2020-06-18T07:25:14.710Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8b975107cdb2/001-1-ur5nxrzkjlbtszzcrt0pig-png.webp"
cardSpan: "full"
originalId: "medium:8b975107cdb2"
locale: "ja"
placeholder: false
---

分散型メッセンジャーADAMANTがGoogle Playで利用可能になりました。アプリはデフォルトで権限を要求せず、位置情報や端末のアドレス帳へのアクセスを要求しません。これは、プライバシーを重視した設計に沿ったものです。唯一のオプション権限は、アカウントアドレスのQRコードをスキャンする際に求められるカメラアクセスと、プッシュ通知を有効にする際に求められる通知アクセスのみです。

![Welcome ADAMANT on Google Play!](/images/engineering-notes/medium/8b975107cdb2/002-0-6f0bgzgr2q-tilo9.webp)

ADAMANTは従来のクライアント-サーバーアプリケーションではなく、ブロックチェーンベースのメッセンジャーとして動作するため、アカウントモデルやメッセージの流れが、多くのユーザーが想定するものとは異なります。アカウントは電話番号やメールアドレスではなく、暗号鍵によって識別され、メッセージは中央サーバーではなくオンチェーンに保存されます。このモデルに初めて触れるユーザーは、鍵の管理方法、メッセージ送信に伴うトランザクション手数料、完全に分散化された通信アーキテクチャの意味合いについて理解するために、プロジェクトのオンボーディングドキュメントを確認することをお勧めします。

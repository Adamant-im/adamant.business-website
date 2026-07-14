---
title: "P2P速度を実現したブロックチェーンメッセージング"
slug: "a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
description: "ADAMANT PWAバージョン2.4.0はWebSocketをサポートし、従来のP2Pメッセンジャーと競合できるほどの高速メッセージングを実現。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
publishedAt: "2020-02-07T03:03:50.348Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2c2cd58f8eb3/001-0-nhjz84euai2uyek8-png.webp"
cardSpan: "full"
originalId: "medium:2c2cd58f8eb3"
locale: "ja"
placeholder: false
---

ADAMANT PWAバージョン2.4.0ではWebSocketのサポートを導入し、メッセージング速度を大幅に向上させました。これにより、従来のP2Pメッセンジャーと肩を並べる速度を実現しました。WebSocketにより、ノードとメッセージアプリ間で即時データ共有が可能になり、新しいイベントや未承認のトランザクションをユーザーに即座に通知できます。

メッセージ送信時、最初に単一のノードが受信し、数瞬で「ノードに配信済み」✔のステータスが表示されます。これは、受信者がすでにメッセージを受信していることを意味します。その後、メッセージは分散型ネットワーク上の他のノードによって検証され、ブロックチェーンメッセージングのセキュリティ上の利点が保証されます。検証され、新しいブロックに取り込まれると、ステータスは「ブロックチェーンに保存保存済み」⚭に変化します。この検証プロセスには数秒かかります。

現在、ノード間の通信にはわずかな遅延があります。両ユーザーが同じノードに接続している場合、メッセージは即座に配信されます。異なるノードに接続している場合、配信に数秒かかることがあります。ユーザーは設定セクションの「ノード一覧」に移動し、1つを除くすべてのノードを無効にすることで、この挙動をテストできます。

![P2P速度を実現したブロックチェーンメッセージング](/images/engineering-notes/medium/2c2cd58f8eb3/002-0-7eq9vdfgyflcuptg-png.webp)

今後のアップデートでは、ソケットとノード間の接続をサポートすることで、ユーザーがどのノードに接続していても遅延を解消する予定です。WebSocketのサポートと新しいブロックチェーンステータスインジケーターに加え、バージョン2.4.0にはResfinex Token（RES）のサポート、Stably Dollar（USDS）の名称およびロゴの更新、トークンの購入・売却ダイアログの更新や送信トークンメニューの高さ調整などのインターフェース改善が含まれます。また、このリリースではBTCアドレスの検証機能を追加し、クリップボードからのアドレス貼り付けや負の金額送信に関連する問題を修正しています。

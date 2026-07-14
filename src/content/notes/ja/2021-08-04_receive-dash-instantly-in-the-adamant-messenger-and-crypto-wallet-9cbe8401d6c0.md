---
title: "ADAMANT MessengerでDASHを即座に受信、暗号資産ウォレット機能も搭載"
slug: "receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
description: "ADAMANT Messengerバージョン2.12.0はDash InstantSendをサポートし、ネットワークの承認待ちなしでDASHを即時受信可能にします。通常、暗号資産の送金ではブロック承認を待つ必要がありますが、Dash InstantSendはマスターノードを利用してトランザクションを検証し、次のブロックへの取り込みを保証します。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
publishedAt: "2021-08-04T13:23:12.613Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9cbe8401d6c0/001-0-omadd6rxri1q0dfd.webp"
cardSpan: "full"
originalId: "medium:9cbe8401d6c0"
locale: "ja"
placeholder: false
---

ADAMANT Messengerバージョン2.12.0はDash InstantSendのサポートを導入し、ネットワークの承認を待たずにDASHの送金を即座に受信できるようになりました。通常、暗号資産の送金ではブロック承認の完了を待つ必要がありますが、Dash InstantSendはマスターノードを活用してトランザクションを検証し、その後のブロックに確実に取り込まれることを保証します。これに加えて、他の対応暗号資産のトランザクション状態更新の速度も改善されています。

このリリースでは、ADM報酬ボットをチャット内に直接統合しています。このボットは、完了したタスクに対して自動的かつ即時に報酬を支払うもので、現在はTwitterキャンペーンをサポートしています。ユーザーはボットに`/help`コマンドを送信することで、キャンペーンのルールを確認できます。

![Receive DASH instantly in the ADAMANT Messenger and crypto Wallet](/images/engineering-notes/medium/9cbe8401d6c0/002-0-hofe2-yqoknm1e74.webp)

コードの信頼性と安全性を確保するため、既知の脆弱性を持たないバージョンへの依存関係のアップグレードが行われました。未使用の非英語版bip39ワードリストを削除することでアプリケーションのフットプリントを削減しています。さらに、内蔵暗号資産ウォレットの暗号鍵生成が最適化され、シードのキャッシュにより新しいアカウントへのログインが約6倍高速化されました。その他のメンテナンス作業として、Ethereumライブラリのアップグレード、非推奨となったAtomars取引所リンクの削除、および各種バグ修正が含まれます。

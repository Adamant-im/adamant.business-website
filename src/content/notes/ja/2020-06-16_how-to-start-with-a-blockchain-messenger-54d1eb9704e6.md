---
title: "ADAMANT ブロックチェーンメッセンジャーの使い方"
slug: "how-to-start-with-a-blockchain-messenger-54d1eb9704e6"
description: "ADAMANTは電話番号やメールアドレスを必要としない分散型メッセンジャーです。連絡先へのアクセスを要求せず、新しいチャットは匿名アドレスを使用して開始されます。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-start-with-a-blockchain-messenger-54d1eb9704e6"
publishedAt: "2020-06-16T17:29:36.667Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/54d1eb9704e6/001-0-ourcgeecqxb2jdjv.webp"
cardSpan: "full"
originalId: "medium:54d1eb9704e6"
locale: "ja"
placeholder: false
---

ADAMANTは電話番号やメールアドレスを必要としない分散型メッセンジャーです。連絡先へのアクセスを要求せず、新しいチャットは匿名アドレスを使用して開始されます。このメッセンジャーはWeb、Tor、iOS、Android、Windows、macOS、GNU/Linuxで利用可能です。

### アカウントの作成

アプリケーションの言語を選択した後、「新規作成」を選択し、生成されたパスフレーズを保存してください。このパスフレーズは任意の端末でログインする際に必要な唯一の認証情報であるため、秘密に保管する必要があります。紛失した場合、復旧はできません。パスフレーズ自体が一意であるため、ユーザー名は不要です。新規アカウントは、「アカウント」タブで「無料ADMトークン」をタップし、キャプチャを解くことで歓迎用のADMトークンを受け取ることができます。

### 設定

![How to start with a Blockchain Messenger](/images/engineering-notes/medium/54d1eb9704e6/002-0-cywyk7bs8vqaiuw8.webp)

単一の端末でログインを迅速に行うために、「ログイン状態を維持」を有効にし、ローカルパスワードを設定できます。他の端末でログインする際には、依然としてパスフレーズが必要です。プッシュ通知を有効にすることで、新しいメッセージの通知を受け取ることができます。

### 連絡先とチャットの開始

「アカウント」タブに表示されるあなたのADAMANTアドレスは `U8281862340475070014` のように表示され、一意です。このアドレスは、プレーンテキスト、リンク（例： `https://msg.adamant.im?address=U8281862340475070014`）、またはQRコードとして共有できます。ブラウザでこのリンクを開くと、相手はログインまたはアカウント作成後に直接あなたとのチャット画面に移動します。

![How to start with a Blockchain Messenger](/images/engineering-notes/medium/54d1eb9704e6/003-0-jb6t2kkgaqns5wsu.webp)

![How to start with a Blockchain Messenger](/images/engineering-notes/medium/54d1eb9704e6/004-0-lgzwassv0cfbikod.webp)

チャットを開始するには、「チャット」タブを開き、「新しいチャットを開始」をタップし、相手のアドレスを貼り付けたり、QRコードをスキャンしたりします。各連絡先にカスタム名を割り当てることができます。絵文字はモバイル端末ではネイティブキーボード、WindowsではWin + "."、macOSではCtrl + Cmd + Spaceで入力できます。

### 暗号資産ウォレットと送金

![How to start with a Blockchain Messenger](/images/engineering-notes/medium/54d1eb9704e6/005-0-gmegpvtzjfa13ucf.webp)

ADAMANTには内蔵の暗号資産ウォレットが含まれています。たとえば、「アカウント」タブでEthereumを選択すると、ETHの入金アドレスが表示され、外部ウォレットから資金を送金できます。送金が確定すると、残高と取引履歴が自動的に更新されます。

![How to start with a Blockchain Messenger](/images/engineering-notes/medium/54d1eb9704e6/006-0-qwhweawd2kux1bdl.webp)

「アカウント」タブから直接アドレス宛に暗号資産を送信するか、チャットの相手に直接送信できます。会話中に「+」を押して「ETHを送信」を選択し、金額と任意のコメントを入力します。送金はチャットに表示され、受信者の残高が更新されます。

### ボット

![How to start with a Blockchain Messenger](/images/engineering-notes/medium/54d1eb9704e6/007-0-y2farpvkrbe0m-4h.webp)

ADAMANTはボットをサポートしており、ウォレットにはあらかじめ暗号資産交換ボットや賭けボットがプリロードされています。交換ボットを使用するには、ボットに */help* を送信し、交換したい暗号資産を送金し、コメントに希望する出力通貨を指定します。

---
title: "iOS版ADAMANT Messengerでプッシュ通知を有効にする"
slug: "enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
description: "iOS版ADAMANT Messengerは、アプリが起動していなくてもADAMANT通知サービス（ANS）を通じて新着メッセージを通知します。動作手順とプライバシー保護の仕組みを解説します。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
publishedAt: "2021-09-02T20:37:14.112Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/5a77ecffeb32/001-0-gssgbcsz1xeu5gpg.webp"
cardSpan: "full"
originalId: "medium:5a77ecffeb32"
locale: "ja"
placeholder: false
---

iOS版ADAMANT Messengerは、アプリケーションが実行されていない場合でも、ADAMANT Notification Service（ANS）によってユーザーに新しいメッセージの通知を行うことができます。この処理は、ユーザーが一意のトークンを含む暗号化されたシグナルメッセージを、ANSのADAMANTアドレスを宛先としてADAMANTブロックチェーンノードに送信することから始まります。ANSはブロックチェーンをポーリングし、ユーザーのトークンを復号化して、ユーザーのADMアドレスが受信者となっているトランザクションをフィルタリングします。その後、ANSはAPNSに対して、これらのトランザクション（暗号化されたメッセージを含む）を一意のトークンで特定されるユーザーのデバイスに配信するよう要求します。最後に、APNSがデバイスに通知を送信し、Messengerアプリは自身のシークレットキー（パスフレーズ）を使用してメッセージを復号化します。

このアーキテクチャにより、ユーザーのデバイスがANSと直接通信することはありません。つまり、ANSはデバイスのIPアドレスやその他の識別情報を知ることはありません。両者の通信はブロックチェーンノードを介してのみ行われます。アプリでプッシュ通知を有効にするには、ユーザーは「ログイン状態を維持」オプションを有効にし、プッシュ通知の種類を選択する必要があります。

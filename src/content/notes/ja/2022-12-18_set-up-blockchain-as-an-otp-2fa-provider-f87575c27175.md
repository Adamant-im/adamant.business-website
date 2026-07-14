---
title: "ブロックチェーンをOTP 2FAプロバイダーとして設定する"
slug: "set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
description: "ADAMANTはブロックチェーンを介してワンタイムパスワードを提供する分散型の2FAサービスです。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
publishedAt: "2022-12-18T15:14:19.999Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f87575c27175/001-1-g0bpvqabqrk2sobncqoicw-png.webp"
cardSpan: "full"
originalId: "medium:f87575c27175"
locale: "ja"
placeholder: false
---

ADAMANTは、ブロックチェーン、エクスプローラー、暗号通貨ウォレット付きのメッセージングアプリ、エクスチェンジャー、フォージングプールソフトウェア、報酬ボット、およびOTP 2FAサービスプロバイダーを含む分散型メッセージングインフラです。OTP 2FAは、暗号資産取引所、メールプロバイダー、カストディウォレット、ソーシャルアカウントなどのウェブサイトやサービスへのログイン時に追加のセキュリティ層としてワンタイムパスワードを使用します。ADAMANTは、ワンタイムパスワードをブロックチェーン経由で提供する世界初の2FAプロバイダーです。

ブロックチェーンベースの2FAの主な利点はその分散化にあります。従来のOTPプロバイダーは、中央集権的なサーバーまたはSMSゲートウェイに依存しており、これらはいずれも改ざんやダウンのリスクがあります。一方、ADAMANTの2FAサービスは独自のブロックチェーンネットワークを通じて認証コードを配信するため、単一障害点が存在せず、認証メッセージを傍受または遅延させる第三者の仲介者も存在しません。

このサービスを試すには、まずADAMANT Messengerアカウントを作成してください。2FAコードはこのアカウントに届きます。次に、2FAデモアプリケーションを実行し、通常のログインとパスワードで新しいアカウントにサインアップします。ログイン後、「2FAを有効化」をタップし、自分のADAMANTアドレスを入力します。「2FAコードを取得」ボタンを押すと、2FAコードがADAMANT Messengerに送信されます。このコードを入力して「検証」を押してください。有効化後、ログアウトして再度ログインする際に2FAコードが求められ、完全な認証フローを確認できます。

ウェブサービスプロバイダーは、ADAMANT 2FAを統合してユーザーのアカウントセキュリティを強化できます。このサービスはオープンソースであり、2段階認証が必要な既存の認証ワークフローに組み込むように設計されています。

---
title: "世界初の実用化ブロックチェーンベース2FA：Resfinex上のADAMANT"
slug: "world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
description: "2段階認証は資金保護に不可欠ですが、すべての方法が同等に安全というわけではありません。SMS認証はSIMスワップ攻撃に特に脆弱です。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
publishedAt: "2020-03-01T07:19:10.858Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/7adf5554728d/001-0-hktm6vjfrwccv7kd.webp"
cardSpan: "full"
originalId: "medium:7adf5554728d"
locale: "ja"
placeholder: false
---

2段階認証（2FA）は資金を保護するために不可欠ですが、すべての2FA方式が同じレベルの安全性を持つわけではありません。SMSベースの2FAは特にSIMスワップ攻撃に対して脆弱であり、これにより多数の暗号資産の損失が発生してきました。ブロックチェーンベースの2FAは、オンチェーンメッセージングを通じて認証コードを配信することで、より信頼性の高い代替手段を提供し、通信事業者に起因する攻撃経路を完全に排除します。

### Resfinex取引所におけるADAMANT 2FA

Resfinex暗号資産取引所は、ADAMANT Messengerを用いて認証コードを配信する、世界初の実用化されたブロックチェーンベース2FAの事例です。設定手順は簡単です。ユーザーはセキュリティ設定に移動し、「ADAMANT Messenger 2FA」を選択し、認証コードを受信するためのADAMANTアドレスを入力します。新規のADAMANTユーザーはアカウントを初期化するために少量のADMが必要です。確認コードと取引所のパスワードを入力後、2FAが有効になります。

![世界初の実生活でのブロックチェーン上2FA](/images/engineering-notes/medium/7adf5554728d/002-0-xvtbn00u-d5nvyzb.webp)

![世界初の実生活でのブロックチェーン上2FA](/images/engineering-notes/medium/7adf5554728d/003-0-necwvzuliwggpf2c.webp)

![世界初の実生活でのブロックチェーン上2FA](/images/engineering-notes/medium/7adf5554728d/004-0-to4kuxsaixckgh5j.webp)

![世界初の実生活でのブロックチェーン上2FA](/images/engineering-notes/medium/7adf5554728d/005-0-kexa5qysqrmab0vf.webp)

![世界初の実生活でのブロックチェーン上2FA](/images/engineering-notes/medium/7adf5554728d/006-0-f1qr6w3udghq575k.webp)

![世界初の実生活でのブロックチェーン上2FA](/images/engineering-notes/medium/7adf5554728d/007-0-a-sfwulbvejil2rl.webp)

2FAを有効にすると、ログイン、出金確認、パスワード変更、APIキー作成、およびセキュリティ設定やその他の機微なアカウント設定の変更の際に、2FAコードの入力が求められるようになります。

### サービスへのブロックチェーン2FAの導入

取引所や金融機関を含むあらゆるサービスプロバイダーは、ADAMANT 2FAを統合することが可能です。ADAMANTは完全にオープンソースのプロジェクトであり、ドキュメントや実装ガイドが利用可能です。ADAMANT 2FAのデモアプリケーションのソースコードは[GitHub](https://github.com/Adamant-im/adamant-2fa)で公開されており、開発者向けの[接続ガイド](https://medium.com/adamant-im/go-to-secure-2fa-on-a-blockchain-344500a5f010#db04)も利用できます。

![世界初の実生活でのブロックチェーン上2FA](/images/engineering-notes/medium/7adf5554728d/008-0-1zqjg9sgj2eli5h5.webp)

![世界初の実生活でのブロックチェーン上2FA](/images/engineering-notes/medium/7adf5554728d/009-0-wdowhqndtnflq0oy.webp)

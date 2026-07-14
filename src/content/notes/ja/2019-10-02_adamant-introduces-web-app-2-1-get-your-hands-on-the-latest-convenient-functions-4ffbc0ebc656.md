---
title: "ADAMANT Web App 2.1：QR共有、ボットアクセス、およびトークン送金の改善"
slug: "adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
description: "ADAMANT Web App 2.1アップデートでは、メッセージングの効率化と簡単なオンボーディングを実現。新規アカウントは交換ボットと賭けボットに即時アクセス可能。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
publishedAt: "2019-10-02T06:50:35.550Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ffbc0ebc656/001-1-l-nswrbv8xnsm1omxvshqg-png.webp"
cardSpan: "full"
originalId: "medium:4ffbc0ebc656"
locale: "ja"
placeholder: false
---

ADAMANT Web App 2.1のアップデートでは、メッセージングの効率化と簡単なオンボーディングに重点を置いています。新規アカウントは、追加の設定なしで、交換用ボットと賭け用ボットの2つに即座にアクセスできるようになりました。

ウォレットアドレスをクリックすると、クリップボードにアドレスをコピー、共有可能なチャットリンクをコピー、またはQRコードを表示、の3つのオプションが表示されます。共有リンクの形式は `https://msg.adamant.im/?address=U14236667426471084862` というパターンに従っており、受信者がすぐにチャットを開始できるようになります。また、QRコードは、連絡先のアイコンをクリックした際に表示される「相手の情報」セクションでも表示されるようになりました。

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/002-1-ca218mdchy7u6byjnmqxha-png.webp)

QR共有は、対面での連絡先交換に便利であり、追跡可能な記録を残しません。1つのQRコードには、アドレスだけでなく、連絡先のラベル、トークンの金額、挨拶メッセージもエンコードできます。アプリはクリップボード内のリンクを自動的に解析し、関連するフィールドを自動入力します。たとえば、以下のリンクは、ラベル付きの連絡先とのチャットを、事前設定されたトークン金額とメッセージ付きで開きます：

```
https://msg.adamant.im/?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
```

トークンを送金する際、アプリは金額のクイックプリセットをサポートしており、すべての利用可能残高や3分の1といった分数の金額を手動入力せずに送信できます。

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/004-1-dmv7hxalesdxspouol49ka-png.webp)

これらの機能は、ADAMANT Improvement Proposals（AIP）によって推進されています。AIPは、[GitHubのAIPsリポジトリ](https://github.com/Adamant-im/AIPs)で公開されている、アプリ改善のための提案の集合です。Webアプリに加え、Tor、Windows、Linux向けビルドも更新され、[GitHubのリリース2.1](https://github.com/Adamant-im/adamant-im/releases/tag/v2.1.0)で利用可能です。

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/003-1-2hnq5ol3qs8fauymp6vxa-png.webp)

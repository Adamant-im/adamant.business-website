---
title: "ADAMANT Messenger for iOS v2.3.0：QRコード対応"
slug: "adamant-messenger-for-ios-v2-3-0-qr-codes-9c36d85efc18"
description: "ADAMANT Messenger for iOS v2.3.0では、アドレスやURIリンクを含むADAMANT QRコードのスキャンが可能になり、AndroidおよびDesktopクライアントと同等の機能になりました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-for-ios-v2-3-0-qr-codes-9c36d85efc18"
publishedAt: "2022-04-15T07:03:22.214Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9c36d85efc18/001-0-hn93mfg0ezhtedov.webp"
cardSpan: "full"
originalId: "medium:9c36d85efc18"
locale: "ja"
placeholder: false
---

ADAMANT Messenger for iOS v2.3.0では、アドレスやURIリンクを含むADAMANT QRコードのスキャンが可能になり、iOSアプリがAndroidおよびDesktopクライアントと同等の機能を持つようになりました。本実装は3つのADAMANT Improvement Proposals（AIP）に従っています。AIP-8およびAIP-9はADAMANTのURIフォーマットを定義し、AIP-15はADMアドレスのためのQRコード標準を規定しています。

ADMアドレスを共有するには、アカウントタブを開き、アドレスをタップしてから**Generate QR code**を選択してください。他のユーザーはAndroid、Desktop、iOSのいずれかのADAMANTクライアントでそのQRコードをスキャンすることで、チャットやトランザクションを開始できます。

本リリースでは、チャット名が正しく更新されず固定されたままになるバグも修正されています。

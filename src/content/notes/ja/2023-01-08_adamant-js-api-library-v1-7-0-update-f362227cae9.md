---
title: "ADAMANT JS APIライブラリv1.7.0のアップデート"
slug: "adamant-js-api-library-v1-7-0-update-f362227cae9"
description: "ADAMANT JavaScript APIライブラリv1.7.0では、初期化後のロジックにコールバックをサポート。api.setStartupCallback()とapiコンストラクタの第三引数にコールバックを追加。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-js-api-library-v1-7-0-update-f362227cae9"
publishedAt: "2023-01-08T14:33:18.085Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f362227cae9/001-1-fyo9k3w-4-kerjuoncf9fw-png.webp"
cardSpan: "full"
originalId: "medium:f362227cae9"
locale: "ja"
placeholder: false
---

ADAMANT JavaScript APIライブラリv1.7.0では、初期化後のロジックにコールバックをサポートしました。本リリースには2つの変更が含まれます。1つは新しい`api.setStartupCallback()`メソッド、もう1つは`api`コンストラクタの第3引数としてオプションでコールバックを受け取れるようにしたことです。これらの仕組みにより、ライブラリの初期化完了後にカスタムコードを実行できるようになります。これは、APIインスタンスの準備が整った後に実行する必要があるセットアップ処理に便利です。

完全なAPIドキュメントは[ADAMANT API client wiki](https://github.com/Adamant-im/adamant-api-jsclient/wiki/API-Specification)で確認できます。リリースの詳細は[v1.7.0リリースノート](https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v1.7.0)に記載されています。

---
title: "ADAMANT JavaScript API v1.1.0: Dash キー生成"
slug: "updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
description: "ADAMANT JavaScript API v1.1.0 は、ADAMANTアカウントのパスフレーズから直接Dashの公開鍵と秘密鍵を生成できます。これにより、クロスチェーン操作が簡素化されます。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
publishedAt: "2021-07-12T13:40:09.723Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/58a3e37d2ac2/001-1-8sz81txq44zqzikay5wamw-png.webp"
cardSpan: "full"
originalId: "medium:58a3e37d2ac2"
locale: "ja"
placeholder: false
---

ADAMANT JavaScript API v1.1.0 は、ADAMANTアカウントのパスフレーズから直接Dashの公開鍵と秘密鍵ペアを生成できます。これにより、ADAMANTアカウントで使用されるのと同じニーモニックからDashキーを派生させることができ、クロスチェーン操作が簡素化されます。

```js
const dashKeys = api.dash.keys(config.passPhrase);
```

`passPhrase` パラメータは、ADAMANTアカウントに関連付けられたニーモニックパスフレーズです。返された鍵ペアは、Dash APIでそのまま使用できます。

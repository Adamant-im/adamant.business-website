---
title: "ADAMANT JavaScript API v1.1.0：Dash 密钥生成"
slug: "updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
description: "ADAMANT JavaScript API v1.1.0 可直接从 ADAMANT 账户助记词生成 Dash 公钥和私钥，简化跨链操作。"
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
locale: "zh"
placeholder: false
---

ADAMANT JavaScript API v1.1.0 可直接从 ADAMANT 账户的助记词生成 Dash 公钥和私钥。这通过使用与 ADAMANT 账户相同的助记词来派生 Dash 密钥，从而简化了跨链操作。

```js
const dashKeys = api.dash.keys(config.passPhrase);
```

`passPhrase` 参数是与 ADAMANT 账户关联的助记词。返回的密钥对可直接用于 Dash API。

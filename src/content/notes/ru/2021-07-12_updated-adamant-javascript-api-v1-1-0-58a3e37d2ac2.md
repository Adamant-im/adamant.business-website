---
title: "ADAMANT JavaScript API v1.1.0: Генерация ключей Dash"
slug: "updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
description: "ADAMANT JavaScript API v1.1.0 может генерировать публичные и приватные ключи Dash напрямую из парольной фразы аккаунта ADAMANT. Это упрощает операции между блокчейнами."
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
locale: "ru"
placeholder: false
---

ADAMANT JavaScript API v1.1.0 может генерировать публичные и приватные ключи Dash напрямую из парольной фразы аккаунта ADAMANT. Это упрощает кросс-чейн операции за счёт вывода ключей Dash из той же мнемонической фразы, которая используется для аккаунта ADAMANT.

```js
const dashKeys = api.dash.keys(config.passPhrase);
```

Параметр `passPhrase` — это мнемоническая парольная фраза, связанная с аккаунтом ADAMANT. Полученная пара ключей готова к использованию с API Dash.

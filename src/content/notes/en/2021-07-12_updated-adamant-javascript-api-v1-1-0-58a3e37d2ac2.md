---
title: "ADAMANT JavaScript API v1.1.0: Dash Key Generation"
slug: "updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
description: "The ADAMANT JavaScript API v1.1.0 can generate Dash public and private key pairs directly from an ADAMANT account passphrase. This simplifies cross chain operations by deriving…"
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
locale: "en"
placeholder: false
---

The ADAMANT JavaScript API v1.1.0 can generate Dash public and private key pairs directly from an ADAMANT account passphrase. This simplifies cross-chain operations by deriving Dash keys from the same mnemonic used for the ADAMANT account.

```js
const dashKeys = api.dash.keys(config.passPhrase);
```

The `passPhrase` parameter is the mnemonic passphrase associated with an ADAMANT account. The returned key pair is ready for use with the Dash API.

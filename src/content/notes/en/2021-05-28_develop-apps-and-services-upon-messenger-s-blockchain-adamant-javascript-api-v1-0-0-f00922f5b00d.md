---
title: "Develop apps and services on the ADAMANT blockchain with JavaScript API v1.0.0"
slug: "develop-apps-and-services-upon-messenger-s-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
description: "ADAMANT is a public blockchain designed for anonymous messaging. What makes it unique is not the blockchain itself, but the services built upon it. Any developer can write progr…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/develop-apps-and-services-upon-messengers-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
publishedAt: "2021-05-28T20:22:13.112Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f00922f5b00d/001-0-fghvl6xn-ahzkh9m.webp"
cardSpan: "full"
originalId: "medium:f00922f5b00d"
locale: "en"
placeholder: false
---

ADAMANT is a public blockchain designed for anonymous messaging. What makes it unique is not the blockchain itself, but the services built upon it. Any developer can write programs that leverage its capabilities, including anonymous message and signal transfer, eternal encrypted storage, cross-device data access, fast temporary accounts, and high reliability.

Several applications already run on the ADAMANT blockchain. These include a messenger and crypto wallet, a crypto exchanger bot, a blockchain-based two-factor authentication service, and a bounty bot.

![Develop apps and services upon messenger's blockchain — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/002-0-dtmatfmf-pnkc0hj.webp)

![Develop apps and services upon messenger's blockchain — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/003-0-45fiuq9gnu-tgiot.webp)

![Develop apps and services upon messenger's blockchain — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/004-0-oyzmxof2phgcsl2c.webp)

### ADAMANT JavaScript API v1.0.0

The ADAMANT JavaScript API has been updated to [v1.0.0](https://www.npmjs.com/package/adamant-api). Compared to the previous version, the library is more reliable in making blockchain requests and easier to use. It demonstrates decentralization in practice: if one network node cannot fulfill a request, the library automatically redirects to another node, retrying multiple times until a result is returned. The developer does not need to handle node failover manually.

A basic example of querying the blockchain:

```javascript
api.get('blocks').then(response => {
  console.log(response.data)
})
```

The library was completely reworked with updated and pruned dependencies and rewritten internal functions. Version 1.0.0 is incompatible with the previous v0.5.3, but migration is straightforward. Full documentation is available at the [adamant-api-jsclient wiki](https://github.com/Adamant-im/adamant-api-jsclient/wiki).

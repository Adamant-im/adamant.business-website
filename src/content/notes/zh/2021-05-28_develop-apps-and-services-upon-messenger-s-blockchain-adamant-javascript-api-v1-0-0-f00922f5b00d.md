---
title: "使用 JavaScript API v1.0.0 在 ADAMANT 区块链上开发应用和服务"
slug: "develop-apps-and-services-upon-messenger-s-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
description: "ADAMANT 是一个专为匿名消息设计的公有区块链。其独特之处不在于区块链本身，而在于构建于其上的服务。任何开发者都可以编写利用其功能的程序。"
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
locale: "zh"
placeholder: false
---

ADAMANT 是一个专为匿名消息设计的公有区块链。其独特之处不在于区块链本身，而在于构建于其上的服务。任何开发者都可以编写程序，利用其功能，包括匿名消息和信号传输、永久加密存储、跨设备数据访问、快速临时账户以及高可靠性。

已有多个应用在 ADAMANT 区块链上运行。其中包括一个信使和加密钱包、一个加密货币兑换机器人、一个基于区块链的双因素身份验证服务，以及一个悬赏机器人。

![在信使的区块链上开发应用和服务 — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/002-0-dtmatfmf-pnkc0hj.webp)

![在信使的区块链上开发应用和服务 — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/003-0-45fiuq9gnu-tgiot.webp)

![在信使的区块链上开发应用和服务 — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/004-0-oyzmxof2phgcsl2c.webp)

### ADAMANT JavaScript API v1.0.0

ADAMANT JavaScript API 已更新至 [v1.0.0](https://www.npmjs.com/package/adamant-api)。与之前版本相比，该库在发起区块链请求时更加可靠，且更易于使用。它实际展示了去中心化的特性：如果某个网络节点无法完成请求，该库会自动重定向到另一个节点，并多次重试，直到返回结果。开发者无需手动处理节点故障转移。

查询区块链的基本示例：

```javascript
api.get('blocks').then(response => {
  console.log(response.data)
})
```

该库已完全重构，更新并精简了依赖项，重写了内部函数。v1.0.0 版本与之前的 v0.5.3 不兼容，但迁移过程简单直接。完整文档请参见 [adamant-api-jsclient wiki](https://github.com/Adamant-im/adamant-api-jsclient/wiki)。

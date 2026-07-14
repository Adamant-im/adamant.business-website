---
title: "区块链用于私密消息传递"
slug: "blockchain-for-private-messaging-825fadb77f36"
description: "隐私问题日益严重，日常技术收集越来越多的个人数据。在安装应用前，用户应仔细审查所授予的权限。区块链技术有助于恢复数字公平性和个人独立性。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/blockchain-for-private-messaging-825fadb77f36"
publishedAt: "2018-06-12T08:30:45.495Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/825fadb77f36/001-0-me1d2qmfax18ibvm.webp"
cardSpan: "full"
originalId: "medium:825fadb77f36"
locale: "zh"
placeholder: false
---

随着日常技术收集越来越多的个人数据，隐私问题日益严重。在安装应用程序之前，用户应仔细审查所授予的权限。区块链技术为恢复数字公平性和个人独立性提供了一条途径。

ADAMANT Messenger 是一款基于区块链的应用程序，利用密码学提供匿名消息服务。该系统的设计确保无法访问任何位置数据、用户身份或通讯录信息。用户完全掌控自己的私钥和助记词，账户无法被任何人（包括开发者）关闭、封锁或限制。

消息内容仅对预期接收者可见，由加密的助记词保护。即使开发者也无法查看消息内容。ADAMANT Messenger 和区块链代码是开源的，允许持续开发和审查。

安全特性包括发送者和接收者的认证真实性，以及中间人攻击（MITM）防护。如果发生中间人攻击，发送者标识将发生变化，从而使拦截行为可被检测。系统使用以下加密方案：Ed25519 EdDSA、Curve25519、Salsa20 和 Poly1305。

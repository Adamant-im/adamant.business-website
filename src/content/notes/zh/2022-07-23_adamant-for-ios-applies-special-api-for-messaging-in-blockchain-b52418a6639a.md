---
title: "ADAMANT for iOS 采用 Chatrooms API 实现更快的区块链消息传递"
slug: "adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
description: "ADAMANT for iOS 现在支持 Chatrooms API，区块链消息加载速度提升高达 50 倍。登录 ADM 账户后即可立即感受到这一改进。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
publishedAt: "2022-07-23T13:24:47.800Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:b52418a6639a"
locale: "zh"
placeholder: false
---

ADAMANT for iOS 现在支持用于区块链消息传递的 Chatrooms API，消息加载速度提升高达 50 倍。登录 ADM 账户后，这一改进立即可见。此前，桌面应用程序已实现了相同的 API。

Chatrooms API 提供两个主要端点。第一个是 `/api/chatrooms/U000000000000`，用于检索指定账户的聊天列表。第二个是 `/api/chatrooms/U000000000000/U000000000001`，用于获取两个特定账户之间的消息历史记录。为了优化数据传输，该 API 包含了分页功能。更多技术细节请参见 AIP 14。

iOS 应用程序 2.5.0 版本集成了 Chatrooms API，同时提升了加密货币汇率获取速度，进行了常规性能优化，支持 MacBook M1，并修复了多个问题。

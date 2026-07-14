---
title: "通过 ADAMANT 发送通知"
slug: "notify-via-adamant-e6116f7e55cc"
description: "ADAMANT 具备多种适合作为通知传输机制的特性：每条消息的送达都在链上验证，消息内容和顺序不可篡改，存储时间几乎无限，且访问不依赖特定设备。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/notify-via-adamant-e6116f7e55cc"
publishedAt: "2019-06-02T14:22:43.887Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e6116f7e55cc/001-1-8rvans74h-cl-ux-bpeiaw-png.webp"
cardSpan: "full"
originalId: "medium:e6116f7e55cc"
locale: "zh"
placeholder: false
---

ADAMANT 具备多种适合作为通知传输机制的特性：每条消息的送达都在链上验证，消息内容和顺序不可篡改，存储时间几乎无限，且访问不依赖特定设备。该项目为开源项目。一个实际的应用案例是加密货币矿池运营方通过 ADAMANT 消息接收矿池运行状态的通知。

开发者可以通过三种主要接口集成 ADAMANT 通知功能。ADAMANT Console 提供了 `send message` 命令，是一个与语言无关的命令行工具。对于 JavaScript 应用，ADAMANT API JS 客户端库中提供了 `send` 函数。最后，原生 ADAMANT 节点也暴露了自身的 API 以支持直接集成。

消息内容支持 Markdown 格式和 Emoji，可实现结构清晰、易于阅读的通知。

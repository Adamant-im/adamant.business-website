---
title: "Messenger 因 Chatrooms API 而变得更快速"
slug: "messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
description: "ADAMANT 将每条消息视为区块链交易，提升了隐私性和安全性，但也带来了速度和消息检索的挑战。标准区块链 API 需要获取所有交易以显示对话记录。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
publishedAt: "2021-11-24T14:07:09.171Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b7353317e7f8/001-0-tot3wyqtwfswo3kx.webp"
cardSpan: "full"
originalId: "medium:b7353317e7f8"
locale: "zh"
placeholder: false
---

ADAMANT 将每条消息视为一个区块链交易，这增强了隐私性和安全性，但也对消息加载速度和检索效率带来了挑战。传统的区块链 API 需要获取所有交易才能显示对话内容。新的 Chatrooms API 是专为即时通讯工具设计的，可使消息加载效率提升高达十倍，同时减少内存和 CPU 消耗。

![Messenger 因 Chatrooms API 而变得更快速](/images/engineering-notes/medium/b7353317e7f8/002-0-g1gbxwpdnkihcskz.webp)

在实际使用中，旧版本加载一个账户需要 25 秒，并消耗 80 MB 内存；而新版本仅需 3 秒，内存占用为 28 MB，速度提升了八倍。性能提升幅度随着账户中消息数量的增加而更加显著。

Chatrooms 提供了两个接口端点：`/api/chatrooms/U000000000000` 和 `/api/chatrooms/U000000000000/U000000000001`。前者用于获取特定账户的聊天列表，后者用于获取两个账户之间的消息。支持分页功能以最小化数据传输量，具体细节参见 AIP 14。这些端点可被任何应用程序调用，包括 Messenger 或机器人。

为支持这一功能，节点已更新以处理新的应用请求。与之前版本一次性下载所有消息以供离线查看不同，Chatrooms API 采用按需下载消息的方式，因此需要保持网络连接。

v3.0.0 版本在引入 Chatrooms API 的同时，还包含多项其他更新。该版本替换了 HTTP 节点，移除了 Resfinex 交易所及 RES 代币，并针对 Lisk Service 的 `includePending` bug 实现了临时解决方案。其他修复包括：修正亮/暗主题的 `background-color` 问题，解决 ADM 交易列表中的无限更新循环问题，以及更新相关依赖项。

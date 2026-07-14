---
title: "ADAMANT Node 0.5.1：聊天 API 已准备就绪用于生产环境"
slug: "adamant-node-0-5-1-chats-api-ready-to-go-c21273044372"
description: "ADAMANT Node 0.5.1 版本现已在 GitHub 发布，完成了一月份首次公布的 Chats API 功能。主要特性是 /api/chatrooms 端点，可显著加快联系人和聊天的检索速度。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-0-5-1-chats-api-ready-to-go-c21273044372"
publishedAt: "2019-05-25T11:16:05.701Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/c21273044372/001-0-ldhnafxy9xpuzvb9.webp"
cardSpan: "full"
originalId: "medium:c21273044372"
locale: "zh"
placeholder: false
---

ADAMANT Node 0.5.1 版本现已在 GitHub 发布，完成了一月份首次公布的 Chats API 功能。主要特性是 `/api/chatrooms` 端点，相比之前的 API 可显著加快检索联系人和聊天的速度。开发者应参考 [AIP-14 规范](https://aips.adamant.im/AIPS/aip-14) 了解具体实现细节。

此更新并非所有节点所有者都必须升级。然而，需要与 messenger 应用连接的节点必须升级到最新版本，以利用新的 API。ADAMANT Android 团队已通过新端点展示了可衡量的速度提升，预计其他 ADAMANT 应用在采用该端点后也将获得类似的性能提升。

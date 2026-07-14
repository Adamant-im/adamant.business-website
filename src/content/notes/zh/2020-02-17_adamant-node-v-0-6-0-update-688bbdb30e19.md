---
title: "ADAMANT Node v0.6.0 更新"
slug: "adamant-node-v-0-6-0-update-688bbdb30e19"
description: "去中心化信使依赖于区块链系统和客户端应用。区块链由网络节点维护，为应用提供数据并处理请求。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v-0-6-0-update-688bbdb30e19"
publishedAt: "2020-02-17T09:23:50.372Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/688bbdb30e19/001-1-fmo2vlyn2yehfv84inqtmq-png.webp"
cardSpan: "full"
originalId: "medium:688bbdb30e19"
locale: "zh"
placeholder: false
---

一个去中心化信使依赖于两个组件：区块链系统和客户端应用。区块链由网络节点维护，这些节点向应用程序提供数据并处理传入的请求。ADAMANT 已在项目的 GitHub 发布页面上发布了节点软件版本 0.6.0。

本次发布改进了套接字连接和交易 API。套接字连接现在会返回 `recipientPublicKey`，交易 API 端点（包括 KVS 和 Chats）的响应中现在包含 `block_timestamp` 字段。`/states/get/` 端点已扩展，支持 `SenderIds` 和 `keyIds` 参数以及 POST 请求。此次发布还包括迁移问题的修复和更新后的文档集。

此更新并非所有节点运营商都必须升级。然而，需要与信使应用程序连接的节点必须升级到最新版本。

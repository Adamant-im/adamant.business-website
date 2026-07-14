---
title: "ADAMANT v2.5.0 在 Web、Tor、Windows、Mac OS 和 Linux 上的改进"
slug: "improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-and-linux-161563fe990b"
description: "ADAMANT v2.5.0 对其 Web、Tor 和桌面应用程序进行了多项改进和错误修复。作为基于区块链的信使，ADAMANT 通过更多网络节点实现了更好的去中心化。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-linux-161563fe990b"
publishedAt: "2020-04-26T17:21:28.135Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/161563fe990b/001-0-rzxpq8psh7gjckqp.webp"
cardSpan: "full"
originalId: "medium:161563fe990b"
locale: "zh"
placeholder: false
---

ADAMANT v2.5.0 对其 Web、Tor 和桌面应用程序进行了多项改进和错误修复。作为基于区块链的信使，ADAMANT 通过更多网络节点实现了更好的去中心化。Web 应用现在包含九个节点，其中包括三个 HTTP 和六个 HTTPS 类型。使用 HTTPS 连接时，仅可访问 HTTPS 节点，而 Windows、macOS 和 Linux 桌面应用程序可以访问全部九个节点。

此次更新还优化了 ADM 买卖交易所列表，移除了 IDCM 并添加了 CoinDeal，同时更新了 Resfinex 和 Bit-Z 的链接。ADAMANT 的 Markdown 支持也得到改进，现在能正确显示 `code` 代码块的等宽字体。

![ADAMANT v2.5.0 在 Web、Tor、Windows、Mac OS 和 Linux 上的改进](/images/engineering-notes/medium/161563fe990b/002-0-sqpbhli5aps7yqjd.webp)

在信使的 Tor 版本中，WebSocket 连接问题已修复，以确保消息更快送达。

![ADAMANT v2.5.0 在 Web、Tor、Windows、Mac OS 和 Linux 上的改进](/images/engineering-notes/medium/161563fe990b/003-0-fblaod14ec32orwh.webp)

本次发布的其他维护工作包括更新依赖项、节点协议检查，以及修复 HTTP 主机上的节点状态和套接字连接问题。更新还解决了静态聊天名称问题、“开始新聊天”流程中的粘贴地址验证问题，以及 Windows 和其他应用程序中 ADM 地址的二维码生成问题。此外，对“无公钥”和“无哈希”错误消息的本地化也进行了改进。

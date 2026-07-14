---
title: "ADAMANT Messenger v4.5.1 更新说明"
slug: "meet-the-adamant-messenger-v4-5-1-update-29ce6e2d6a60"
description: "ADAMANT Messenger v4.5.1 引入草稿消息持久化、简体中文本地化、钱包和聊天中支持 STORJ 代币，以及多项依赖升级和错误修复。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/meet-the-adamant-messenger-v4-5-1-update-29ce6e2d6a60"
publishedAt: "2024-01-16T13:33:32.098Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/29ce6e2d6a60/001-0-44tyv1eodqdzthw.webp"
cardSpan: "full"
originalId: "medium:29ce6e2d6a60"
locale: "zh"
placeholder: false
---

ADAMANT Messenger v4.5.1 引入了草稿消息持久化、简体中文本地化、钱包和聊天中支持 STORJ 代币，以及多项依赖升级和错误修复。

### 草稿消息

用户现在可以撰写消息并将其保存为草稿，以便稍后发送。当消息无法在一次会话中完成时，此功能可防止已编写部分内容的丢失，从而改善间歇性使用时的消息处理流程。

![了解 ADAMANT Messenger v4.5.1 更新](/images/engineering-notes/medium/29ce6e2d6a60/003-0-k0dduujxur7pnr9.webp)

### 简体中文语言支持

应用程序现支持简体中文，扩大了对中文用户的本地化覆盖范围。此次更新还修正了俄语本地化中与交易相关字符串的复数形式错误。

![了解 ADAMANT Messenger v4.5.1 更新](/images/engineering-notes/medium/29ce6e2d6a60/002-0-l2314o6c9trohor6.webp)

### STORJ 代币集成

STORJ 现已作为支持的钱包资产上线，用户可在聊天中直接转账 STORJ，与其他此前支持的加密货币并列。

![了解 ADAMANT Messenger v4.5.1 更新](/images/engineering-notes/medium/29ce6e2d6a60/004-0-n9t5myjiuilzj6-d.webp)

### 错误修复与技术更新

已修复钱包左侧 Chevron 导航问题。底层库（包括 Vue、Vuetify 和 Electron）已升级，README 文件和国际化配置也进行了更新。

该版本已在 GitHub 发布，用户可从源码构建。ADAMANT Messenger 是一款渐进式网页应用，支持 Web、Tor、Android、Windows、Linux 和 macOS 平台。

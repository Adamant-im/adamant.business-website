---
title: "现有的在线即时通讯工具安全吗？"
slug: "are-present-online-messengers-safe-d6871314ee9f"
description: "在线文本通信无处不在，但很少有用户认真思考他们的个人数据是如何存储、传输和访问的。本文分析了多个流行通讯服务的加密方法和消息传递机制。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/are-present-messengers-safe-d6871314ee9f"
publishedAt: "2018-07-01T10:52:29.801Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d6871314ee9f/001-0-4pq2ekt1kq-x6n.webp"
cardSpan: "full"
originalId: "medium:d6871314ee9f"
locale: "zh"
placeholder: false
---

在线文本通信是一种无处不在的交流方式，然而很少有用户认真思考他们的个人数据是如何存储、传输和访问的。本文基于可验证的事实，而非媒体叙事，分析了多个流行即时通讯服务的加密方法和消息传递系统。

WhatsApp 拥有超过 15 亿的月活跃用户，于 2016 年推出了“端到端”加密。然而，关键的安全设置深藏在界面之中，研究人员发现了一个后门，攻击者可通过修改加密密钥和云端复制来操纵数据。由于 WhatsApp 采用闭源代码，其安全声明无法被独立验证。

Facebook Messenger 服务于 13 亿用户，同样仅在特殊配置下才提供“端到端”加密聊天。其闭源代码以及 Facebook 在用户数据隐私方面的历史记录引发了严重的信任问题。

微信在中国拥有超过十亿用户，声称用户隐私是其首要任务。然而其隐私声明中描述的加密方法复杂，却未提及端到端加密，且源代码仍然闭源。该服务运行于中国严格的数据留存和监控法规之下。另一款中国主流通讯工具 QQ Mobile 拥有近 8 亿用户，完全不支持端到端加密，且同样保持源代码私有。

其他知名服务——包括 Viber、Skype、Snapchat 和 Line——也存在同样的根本性缺陷：闭源代码导致无法进行独立的安全审计，尽管它们在营销中大力宣传隐私保护。

Telegram 因在中东地区支持私密通信而流行，但其并未完全开放源代码。虽然 API 和客户端应用是开源的，但服务器端代码至今未发布，尽管其曾声明“所有代码最终都会公开”。缺乏服务器端的透明性，使得用户消息的管理和存储方式无法被验证。

许多旨在实现保密性的应用由于固有的架构限制而未能达标。这些限制包括强制使用手机号注册、IP 地址暴露、设备端日志存储、任意封禁用户的能力以及集中式数据存储。

这些系统性缺陷促使了 ADAMANT 通讯工具的诞生，它采用区块链技术构建架构，从根本上采取了不同的方法。ADAMANT 完全开源的代码库允许对其安全特性进行独立验证。

![现有的在线即时通讯工具安全吗？](/images/engineering-notes/medium/d6871314ee9f/002-0-qsxqt626jqio99tb.webp)

通过利用区块链技术，ADAMANT 消除了对中心化服务器、开发者和内部身份识别系统的依赖。网络支持由用户自身提供，他们通过维护基础设施而获得内部货币奖励。该项目正处于积极开发中，最近已实现 ETH 支持。

![现有的在线即时通讯工具安全吗？](/images/engineering-notes/medium/d6871314ee9f/003-0-cgrras4imu0tlqjn.webp)

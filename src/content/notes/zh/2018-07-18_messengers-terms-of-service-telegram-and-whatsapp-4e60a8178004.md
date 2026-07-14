---
title: "信使服务条款：Telegram 和 WhatsApp"
slug: "messengers-terms-of-service-telegram-and-whatsapp-4e60a8178004"
description: "本文回顾了 Telegram 和 WhatsApp 两大主流通讯平台的隐私政策。尽管用户规模庞大且运营多年，两者均未公开完整的服务器端源代码，导致其安全声明无法被独立验证。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/messengers-terms-of-service-telegram-and-whatsapp-4e60a8178004"
publishedAt: "2018-07-18T13:49:15.655Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4e60a8178004/001-0-w-bbrzmuju79thvm.webp"
cardSpan: "full"
originalId: "medium:4e60a8178004"
locale: "zh"
placeholder: false
---

本文回顾了 Telegram 和 WhatsApp 这两个最广泛使用的即时通讯服务的官方隐私政策。尽管它们规模庞大且运营时间长，但这两个平台都未公开其完整的服务器端源代码，使得外界无法独立验证其安全声明的准确性。

## Telegram

Telegram 将自己描述为一个开源项目，邀请用户研究其 API、协议和源代码。然而在实践中，Telegram 从未完全开源其服务器基础设施、数据存储层或内部消息处理代码。这一差距引发了人们对标准云聊天与可选的“加密聊天”之间差异的疑问，也引发了对平台端到端加密覆盖范围的质疑。

Telegram 将云聊天中的消息、照片、视频和文档存储在其服务器上。它使用手机号码作为唯一标识符，并在同步联系人前请求用户授权。其政策声明 Telegram “仅存储正常运行所需的数据”，但并未具体说明这些数据包含哪些内容。

2018 年的一项更新提到，Telegram 基于自身的“合法利益”处理个人数据。用户名、头像和昵称始终是公开的。值得注意的是，ADAMANT 此前的研究已证实，这种设计允许通过官方应用程序提取用户的手机号码。

最关键的条款涉及消息访问权限。Telegram 的政策明确指出，审核人员可以检查收件人举报的消息，且自动化算法可能会分析云聊天中的消息以打击垃圾信息和网络钓鱼。该服务还会收集元数据，包括 IP 地址、设备信息、使用的 Telegram 应用版本以及用户名更改历史，并可能存储聚合后的元数据以支持跨设备功能。简而言之，Telegram 保留对云聊天内容的访问权限，并保留手动和自动检查的权利。

关于执法要求，Telegram 表示，如果收到法院命令确认某用户为恐怖嫌疑人，其可能会向相关当局披露该用户的 IP 地址和电话号码。一旦电话号码被披露，政府机构可进一步向 SIM 卡运营商请求用户订阅数据，从而扩大访问范围。

## WhatsApp

WhatsApp 于 2014 年被 Facebook（现为 Meta）收购，其隐私政策反映了这种企业关系。政策开篇即声明，WhatsApp 必须收集信息以“运营、提供、改进、理解、定制、支持和推广我们的服务”——这一宽泛的授权并未对每类数据收集提供具体理由。

用户必须提供手机号码和昵称。WhatsApp 还会定期收集用户通讯录中的电话号码，包括未使用该服务的联系人。如果消息无法立即送达，WhatsApp 可能在其服务器上保留长达 30 天，并在特定情况下保留更长时间。

收集的设备和连接信息包括硬件型号、操作系统、电池电量、信号强度、应用版本、浏览器信息、移动网络、ISP、语言、时区、IP 地址以及各种设备标识符。位置信息也通过 IP、GPS、蓝牙信号、附近的 Wi-Fi 接入点、信标和基站进行收集。

WhatsApp 还会从其他个人和企业获取有关用户的信息。当用户与企业账户通信时，该企业可能使用第三方公司代为存储、阅读和回复消息。WhatsApp 还与第三方服务提供商及其他 Facebook 公司合作，在企业生态系统内共享数据。

该政策保留权利：只要 WhatsApp 本着“善意信念”认为收集、使用、保留和共享用户信息“合理必要”，即可执行——这一标准赋予平台极大的自由裁量权。

## 核心要点

Telegram 和 WhatsApp 均收集大量元数据，并保留对用户通信不同程度的访问权限。Telegram 的云聊天默认不启用端到端加密，且会受到自动和人工审核。WhatsApp 深度集成于 Meta 企业生态，收集广泛的设备、位置和联系人数据。两个平台均未发布完整的服务器端源代码，无法独立验证其安全与隐私声明。关注数据主权的用户应查阅原始资料——[Telegram 的隐私政策](https://telegram.org/privacy) 和 [WhatsApp 的隐私政策](https://www.whatsapp.com/legal/?lang=en#privacy-policy)，并考虑采用架构可验证的开源替代方案。

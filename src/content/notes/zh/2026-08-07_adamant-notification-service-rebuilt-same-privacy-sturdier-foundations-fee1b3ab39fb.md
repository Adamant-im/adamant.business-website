---
title: "ADAMANT 通知服务重构：隐私如初，根基更稳"
slug: "adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
description: "ADAMANT 通知服务 (ANS) 发布了自 2019 年以来的最大更新，在为 iOS 用户保持零知识推送通知模型的同时，重构了底层基础设施。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
publishedAt: "2026-08-07T14:48:47.463Z"
author: "Sab Kabadas"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:fee1b3ab39fb"
coverImage: "/images/engineering-notes/medium/fee1b3ab39fb/001-50da4f2353.webp"
locale: "zh"
placeholder: false
---

ADAMANT 通知服务 (ANS) 发布了自 2019 年以来的最大更新，在为 iOS 用户保持零知识推送通知模型的同时，重构了底层基础设施。对于使用 ADAMANT Messenger 的 iPhone 用户而言，ANS 在后台静默运行，在不损害隐私的前提下提醒设备接收新消息。

大多数消息应用都面临一种权衡：推送通知需要某个系统组件知晓消息详情。ANS 通过轮询公共 ADAMANT 区块链以查找发送至已注册设备的交易来规避这一问题。当检测到交易时，它仅使用交易 ID 请求 Apple 通知设备。ANS 无法读取交易内容，也无法在推送负载中包含解密后的内容，因为解密需要仅保存在用户设备上的私钥。无论是 ANS 还是 Apple 都无法重构对话内容。

虽然这种隐私模型保持不变，但底层的运行时和可靠性机制已得到显著强化。ANS 现在运行在 .NET 8 上，取代了已停止维护的运行时版本。这使得该服务能够在当前的服务器操作系统上原生运行，而无需依赖老旧的兼容层。

此外，此前导致网络连接随时间推移而累积泄漏并需要定期重启服务的问题已得到修复，连接现在可以被正确复用。该服务还实现了针对区块链节点通信的真正故障转移。此前，单个节点无法访问就可能中断整个通知流程。现在，ANS 会利用 ADAMANT 网络的去中心化弹性，自动重试连接其他节点。

此次维护版本已由 cryptofoundry 进行了独立安全审计。通过实现运行时现代化并修复核心基础设施问题，ADAMANT 确保了 ANS 能够在未来多年内继续可靠地提供及时的零知识通知。

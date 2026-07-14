---
title: "在 iOS 版 ADAMANT Messenger 中启用推送通知"
slug: "enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
description: "iOS 版 ADAMANT Messenger 可在应用未运行时通知用户新消息，这由 ADAMANT 通知服务 (ANS) 实现。工作流程从用户发送加密信号消息开始……"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
publishedAt: "2021-09-02T20:37:14.112Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/5a77ecffeb32/001-0-gssgbcsz1xeu5gpg.webp"
cardSpan: "full"
originalId: "medium:5a77ecffeb32"
locale: "zh"
placeholder: false
---

iOS 版 ADAMANT Messenger 可在应用未运行时通知用户新消息，这由 ADAMANT 通知服务 (ANS) 实现。工作流程从用户向 ADAMANT 区块链节点发送一条包含唯一令牌的加密信号消息开始，消息接收方为 ANS 的 ADAMANT 地址。ANS 会轮询区块链以解密用户的令牌，并筛选出以该用户 ADM 地址为接收方的交易。然后，ANS 请求 APNS 将这些包含加密消息的交易推送到由唯一令牌指定的用户设备。最后，APNS 向设备发送通知，Messenger 应用使用其密钥（密码短语）解密消息。

该架构确保用户设备从不直接与 ANS 通信，这意味着 ANS 无法获知设备的 IP 地址或其他身份信息。它们仅通过区块链节点进行通信。要在应用中启用推送通知，用户必须启用“保持登录”选项并选择推送通知类型。

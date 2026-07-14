---
title: "ADAMANT Messenger 安全特性"
slug: "adamant-messenger-security-features-e7cc836ff52c"
description: "ADAMANT 是一款完全基于区块链运行的私密通讯工具。通过将每条消息存储为链上交易，它解决了典型的点对点和中心化通讯工具的安全缺陷。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-security-features-e7cc836ff52c"
publishedAt: "2018-08-21T13:14:09.919Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e7cc836ff52c/001-0-ed-frrpe89f-d93u.webp"
cardSpan: "full"
originalId: "medium:e7cc836ff52c"
locale: "zh"
placeholder: false
---

ADAMANT 是一款完全基于区块链运行的私密通讯工具。通过将每条消息存储为链上交易，它解决了典型的点对点和中心化通讯工具的安全缺陷，为私人通信提供了不同的信任模型。

## 加密与签名

每条消息都是一笔区块链交易，使用 Ed25519 EdDSA、Curve25519、Salsa20 和 Poly1305 进行加密和签名。消息在发送方设备上加密，在接收方设备上解密。客户端应用从不通过网络传输用户的私钥或助记口令；所有加密操作均在本地完成。

由于每个账户都通过其链上公钥进行标识，发送方和接收方的身份可验证。中间人攻击可以被检测：如果攻击者截获并转发消息，发送方标识将与预期的公钥不匹配，从而暴露拦截行为。

## 区块链作为消息存储

区块链作为消息历史的冗余且可靠的存储层。消息一旦确认，便无法被篡改或回溯，且消息的送达由网络进行签名和确认。消息历史从不存储在用户的本地设备上，而是按需直接从区块链加载。这意味着用户可以从任意设备访问其完整的消息历史，类似于中心化存储模型，但无需依赖控制数据的中心化机构。

## 去中心化架构

ADAMANT 运行在由用户运营的区块链节点构成的去中心化网络上。没有任何中心化机构可以停用、暂停或屏蔽该服务。账户无法被任何人（包括项目开发者）关闭或限制。开发者不控制用户在网络上的行为。

## 隐私与匿名性

与点对点通讯工具中可能暴露对等方 IP 地址不同，所有 ADAMANT 通信均通过区块链节点路由，使得无法直接获取用户的 IP 地址。这在概念上类似于通过 Tor 网络进行路由。

该通讯工具不请求访问用户的通讯录、位置或其他设备数据。注册账户或恢复访问权限时无需手机号码，从而消除了短信劫持作为攻击向量的可能性。账户可在数秒内创建，用户可随意更改其 UID 和加密密钥。无需提供任何个人身份信息。

## 开源

ADAMANT 完全开源，允许独立审查客户端应用和节点软件。

![ADAMANT Messenger 安全特性](/images/engineering-notes/medium/e7cc836ff52c/002-0-qtvvnsefdgux9haq.webp)

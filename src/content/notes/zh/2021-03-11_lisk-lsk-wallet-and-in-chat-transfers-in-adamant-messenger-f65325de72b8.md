---
title: "ADAMANT Messenger 中的 Lisk (LSK) 钱包与聊天内转账"
slug: "lisk-lsk-wallet-and-in-chat-transfers-in-adamant-messenger-f65325de72b8"
description: "ADAMANT Messenger v2.10.0 支持 LSK 代币，用户可在 Web、Tor、Android 和 iOS 平台的聊天中存储和转账 LSK。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/lisk-lsk-wallet-in-chat-transfers-in-adamant-messenger-f65325de72b8"
publishedAt: "2021-03-11T18:58:29.356Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f65325de72b8/001-0-efbl7d5pydhqvoaj.webp"
cardSpan: "full"
originalId: "medium:f65325de72b8"
locale: "zh"
placeholder: false
---

ADAMANT Messenger v2.10.0 引入了对 LSK 代币的支持，使用户能够在 Web、Tor、Android 和 iOS 平台的聊天中存储和转账 LSK。此项功能与现有的 ADM、比特币、以太坊、狗狗币、达世币、BNB、KSC、RES 和 USDS 支持并列。

ADAMANT 钱包完全开源，用户可自行从源码构建，而无需依赖闭源替代方案。私钥永远不会离开用户设备，一个助记词即可访问所有集成的加密钱包。用户还可以导出私钥用于备份。ADAMANT 的一大亮点功能是能够在聊天中直接转账加密货币。

ADAMANT 区块链本身基于 Lisk 代码构建，修改了特定的出块时间、手续费以及集成了用于去中心化消息传递的聊天室 API。未来计划包括在 ADAMANT 生态系统中支持新的 Lisk SDK、新地址类型以及各种 Lisk 侧链。此外，还考虑在 Lisk 平台上创建 Wrapped ADM 代币，以扩展服务和去中心化交易选项。

ADM 作为实用代币，其价值由消息和数据传输的手续费支撑，这些费用旨在覆盖匿名和安全传输的基础设施成本。ADAMANT 采用委托权益证明（dPoS）共识模型，并引入了称为“公平 dPoS”（Fair dPoS）的改进机制。该模型将每个钱包的投票权重除以其投票数量，从而降低大钱包的影响力，并降低锻造节点的参与门槛。此外，错过的区块会负面影响代理节点的生产率，进而影响其投票权重。

Lisk 是一个区块链应用平台，采用 JavaScript/TypeScript SDK 和 Node.js 核心，依赖 PoS/dPoS 共识机制。与以太坊相比，由于 JavaScript 的广泛流行，Lisk 拥有更广泛的开发者群体，对初学者更友好，交易手续费更低，且共识机制更节能。Lisk SDK 目前处于测试阶段，且已发布安全审计报告。

---
title: "具有P2P速度的区块链信使"
slug: "a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
description: "ADAMANT PWA 2.4.0版本引入WebSocket支持，显著提升消息速度，可与传统P2P信使媲美。WebSocket实现节点与应用间的即时数据共享。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
publishedAt: "2020-02-07T03:03:50.348Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2c2cd58f8eb3/001-0-nhjz84euai2uyek8-png.webp"
cardSpan: "full"
originalId: "medium:2c2cd58f8eb3"
locale: "zh"
placeholder: false
---

ADAMANT PWA 2.4.0版本引入WebSocket支持，显著提升消息速度，可与传统P2P信使媲美。WebSocket实现了节点与信使应用之间的即时数据共享，能够立即通知用户新事件和未确认交易。

发送消息时，消息首先被单个节点接收，并在不到一秒内显示为“已送达节点” ✔ 状态，这意味着接收方已经收到消息。随后，去中心化网络中的其他节点会对消息进行验证，以确保区块链信使的安全优势。一旦验证完成并被打包进新区块，状态将变为“已保存至区块链” ⚭。此验证过程通常需要几秒钟。

目前，节点之间的通信存在轻微延迟。如果双方用户连接到同一节点，消息将即时送达；若连接到不同节点，送达可能需要数秒。用户可通过进入设置中的节点列表，禁用除一个以外的所有节点来测试此效果。

![具有P2P速度的区块链信使](/images/engineering-notes/medium/2c2cd58f8eb3/002-0-7eq9vdfgyflcuptg-png.webp)

未来的更新将增加套接字与节点之间的受支持连接，以消除无论用户连接到哪个节点时的延迟。除WebSocket支持和新的区块链状态指示外，2.4.0版本还新增了Resfinex Token (RES)支持，更新了Stably Dollar (USDS)的名称和图标，并进行了多项界面调整，例如更新了“购买与出售代币”对话框以及调整了“发送代币”菜单的高度。该版本还引入了BTC地址验证功能，并修复了从剪贴板粘贴地址和发送负数金额的相关问题。

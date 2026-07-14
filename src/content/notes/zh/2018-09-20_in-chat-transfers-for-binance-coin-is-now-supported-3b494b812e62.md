---
title: "ADAMANT 现已支持在聊天中转账 Binance Coin"
slug: "in-chat-transfers-for-binance-coin-is-now-supported-3b494b812e62"
description: "ADAMANT 是一个集成了加密货币转账功能的去中心化消息平台。继今年早些时候实现在聊天中转账以太坊后，平台现也支持在聊天中转账 Binance Coin（BNB）。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/in-chat-transfers-for-binance-coin-is-now-supported-3b494b812e62"
publishedAt: "2018-09-20T07:18:50.354Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3b494b812e62/001-0-n7sxgkakooow6ma9.webp"
cardSpan: "full"
originalId: "medium:3b494b812e62"
locale: "zh"
placeholder: false
---

ADAMANT 是一个集成了加密货币转账功能的去中心化消息平台，而不仅仅是一个消息应用。继今年早些时候实现在聊天中转账以太坊（ETH）后，平台现也支持在聊天中直接转账 Binance Coin（BNB）。

Binance Coin 是由全球最大的加密货币交易所 Binance 推出的代币，可用于在该平台获得各种权益。支持 BNB 是 ADAMANT 实现更广泛集成 ERC20 代币的第一步。选择 Binance Coin 的另一个原因是，ADM 代币正在陆续上线各大交易所，而此次集成有助于团队更深入地理解交易所的运作机制。

![在聊天中转账 Binance Coin 现已支持](/images/engineering-notes/medium/3b494b812e62/002-1-lw2mpy0kvqgsvgs68oubog-png.webp)

### 在聊天中如何转账 BNB

要在聊天中发送 BNB，您首先需要为 ADAMANT Messenger 内的 BNB 钱包充值。您可以通过从其他钱包（例如 MyEtherWallet）或交易所（如 Binance）向其中转入 BNB 来完成充值。您的 Binance Coin 钱包地址可在“钱包”标签页中找到，点击复制图标即可复制地址。

![在聊天中转账 Binance Coin 现已支持](/images/engineering-notes/medium/3b494b812e62/003-1-cktw266pvgmcz6vcdip4g-png.webp)

要进行转账，请打开与接收方的聊天窗口，点击消息输入框左侧的加号，选择“发送 BNB”，输入金额并确认交易即可。

一个重要技术提示：由于 BNB 是一种 ERC20 代币，转账时需要使用 Ether 来支付网络手续费。因此，您必须在 ADAMANT 钱包中持有一定数量的 ETH，才能完成 BNB 转账。

### 安全性

Binance Coin 的支持采用了与以太坊相同的安全原则。用户的钱包完全由其个人掌控，平台不会托管任何资金。开发团队已完成内部安全审计，并启动了安全竞赛，下一步计划进行独立的外部安全审计。

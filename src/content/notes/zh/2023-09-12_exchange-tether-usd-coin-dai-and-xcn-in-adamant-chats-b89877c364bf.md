---
title: "在 ADAMANT 聊天中交换泰达币、USD Coin、DAI 和 XCN"
slug: "exchange-tether-usd-coin-dai-and-xcn-in-adamant-chats-b89877c364bf"
description: "ADAMANT Exchanger 机器人现已支持 ERC20 代币，除 ADM 外还新增 USDT、USDC、DAI 和 XCN。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/exchange-tether-usd-coin-dai-and-xcn-in-adamant-chats-b89877c364bf"
publishedAt: "2023-09-12T11:44:07.868Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b89877c364bf/001-1-vosdpbswphxo57go9nrwxa-png.webp"
cardSpan: "full"
originalId: "medium:b89877c364bf"
locale: "zh"
placeholder: false
---

ADAMANT Exchanger 机器人现在在其现有的加密货币选项基础上，新增支持 ERC20 代币。除了 ADM、BTC、DASH、DOGE、ETH 和 LSK 之外，用户现在可以直接在 ADAMANT 聊天中交换泰达币（USDT）、USD Coin（USDC）、DAI 和 Onyxcoin（XCN）。

![在 ADAMANT 聊天中交换泰达币、USD Coin、DAI 和 XCN](/images/engineering-notes/medium/b89877c364bf/002-0-ewiwfv0ogqnfwi-m.webp)

Exchanger 是开源的，任何人都可以运行自己的交易所机器人实例。ADAMANT 应用内置的聊天内加密货币转账功能实现了无缝集成，使用户无需离开聊天界面即可交换受支持的加密货币。

要使用 Exchanger，请打开与机器人 ID 为 `U5149447931090026688` 的对话，该 ID 已在您的聊天列表中。发送 `/help` 以获取有关交易流程和费用的详细信息。如需在不实际转账的情况下预览交易，可发送类似 `/test 0.1 ETH to XCN` 的命令。确认条件无误后，即可直接在聊天中进行交换。

所有交易和通信均在 ADAMANT 的隐私模型下保持机密。新增代币不会影响这一承诺。

交易所机器人 v2.6.0 版本新增了对 USDT、USDC、DAI 和 XCN 的支持，并包含错误修复和依赖项更新。源码可在 [GitHub](https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v2.6.0) 获取。

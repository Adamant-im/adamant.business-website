---
title: "ADAMANT Trading & Market making v4.3.4 增加对 P2PB2B 交易所的支持"
slug: "market-making-software-supports-p2pb2b-exchange-190c2f542745"
description: "ADAMANT Trading & Market making v4.3.4 现在支持 P2PB2B 交易所，可在该平台上生成交易量、填充订单簿并维持价差和流动性。Atomars 交易所已从本次发布中移除。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/market-making-software-supports-p2pb2b-exchange-190c2f542745"
publishedAt: "2021-09-28T20:32:29.436Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/190c2f542745/001-1-kq44fxjolwz-4xefiypybg-png.webp"
cardSpan: "full"
originalId: "medium:190c2f542745"
locale: "zh"
placeholder: false
---

ADAMANT Trading & Market making v4.3.4 现在支持 P2PB2B 交易所，可在该平台上实现交易量生成、订单簿填充以及价差/流动性维护。Atomars 交易所已从本次版本中移除。

在可能的情况下，机器人现在会直接从交易所获取小数位数和交易对信息，从而减少手动配置。依赖项已更新，项目现采用 ADAMANT JS API v1.1.0。内部改进包括集成 eslint 以及整体代码重构。

通知处理现已扩展为支持多个地址，余额和订单现在会按每个发送方分别保存。命令也已更新。

ADAMANT Trading & Market making 是开源且免费的。完整更新日志请见 [v4.3.4 发布页面](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4)。

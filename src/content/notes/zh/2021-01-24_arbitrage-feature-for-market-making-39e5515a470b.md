---
title: "做市商的套利功能"
slug: "arbitrage-feature-for-market-making-39e5515a470b"
description: "ADAMANT 交易与做市机器人现已支持套利功能。代币持有者可使用 /enable pw 命令在其他交易所和交易对上设置价格监控。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/arbitrage-feature-for-market-making-39e5515a470b"
publishedAt: "2021-01-24T16:41:51.417Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/39e5515a470b/001-0-vcyqehma-vfieqdv-png.webp"
cardSpan: "full"
originalId: "medium:39e5515a470b"
locale: "zh"
placeholder: false
---

ADAMANT 交易与做市机器人现已支持套利功能。代币持有者可以使用 `/enable pw` 命令在其他交易所和交易对上设置价格监控。

当做市商在多个交易对或交易所之间交易代币时，他们可以在一个数值范围内指定一个主导交易对，并将其他交易对与之关联。当从另一个交易对收到价格范围时，机器人将根据 *strict* 策略直接下买单和卖单，或根据 *smart* 策略估算实际价格。例如，基于给定的订单簿，*strict* 策略可能产生 0.0122–0.0128 的范围，而 *smart* 策略则产生更宽的 0.0114–0.0133 范围。

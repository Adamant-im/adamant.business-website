---
title: "在区块链上接受投注并以LSK、ETH和ADM支付奖励"
slug: "accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
description: "ADAMANT Bet Bot是一款匿名的、基于区块链验证的投注应用，支持处理投注并自动发放奖励。典型用例是针对比特币等加密货币价格进行投注。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
publishedAt: "2022-11-20T13:10:11.915Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8dd6abb45e2d/001-0-l0olsfjrwmjzcc-3.webp"
cardSpan: "full"
originalId: "medium:8dd6abb45e2d"
locale: "zh"
placeholder: false
---

ADAMANT Bet Bot 是一款匿名的、由区块链验证的投注应用，可处理投注并自动发放奖励。典型的使用场景是针对比特币等加密货币价格进行投注。随着 v2.0 版本的更新，该机器人现在除了支持 ADM 和以太坊外，还支持 Lisk（LSK）作为投注和发放奖励的币种。

该机器人直接从 ADAMANT Messenger 钱包接受加密货币投注，所有投注和支付行为均由区块链交易记录验证。准确预测比特币价格（或其他加密货币价格）的用户可以获得奖励。由于该投注机器人是开源的，任何人都可以部署自己的实例，对任意加密货币（而不仅仅是比特币）的价格进行投注。

## 如何对比特币价格进行投注

要下注，您需要在 ADAMANT 中创建一个匿名钱包，充值余额，然后向机器人发送投注。该机器人接受针对比特币（BTC）汇率的投注。新一轮每周日 10:00 UTC 开始，当周的投注从周日持续到周四接受。在周五或周六（即本轮结束前 48 小时内）提交的投注将计入下一轮。

可接受的预测误差范围为 ±500 美元。例如，如果您预测价格为 9,500 美元，而实际价格为 9,900 美元，您仍然属于获胜者。最低投注额为 0.1 美元，最低奖励发放金额也为 0.1 美元。更多详细信息，请在 ADAMANT 中向 Bet 机器人发送 `/help`。

要下注，请先充值您想使用的加密货币（ADM、LSK 或 ETH），在 ADAMANT 中打开 Bet 机器人的对话窗口，发送 `/rates BTC` 查看当前汇率。然后将您希望投注的金额发送给机器人，并在交易备注中填写您预测的价格——例如，发送 250 ADM 并附上备注“11300”，即表示您预测本轮结束时比特币价格为 11,300 美元。当本轮结束时，机器人将公布实际价格并向获胜者发放奖励。

![在区块链上接受投注，并以LSK、ETH和ADM支付奖励](/images/engineering-notes/medium/8dd6abb45e2d/002-0-yhlmw4fu3ffrh8-l.webp)

## v2.0.2 版本说明

v2.0.2 版本增加了对 Lisk 的支持，启用了套接字连接，更新了依赖项，并包含了重构和错误修复。

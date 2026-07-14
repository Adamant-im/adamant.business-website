---
title: "推出 Balance Watcher：市商机器人中的智能实时余额监控"
slug: "introducing-balance-watcher-smart-real-time-balance-surveillance-in-the-market-making-bot-0cbdfcee131e"
description: "Balance Watcher 是一款实时余额监控模块，可在市场波动期间保护资金并提升算法做市机器人的安全性与可靠性。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-balance-watcher-smart-real-time-balance-surveillance-in-the-market-making-bot-0cbdfcee131e"
publishedAt: "2026-01-22T15:54:47.278Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/0cbdfcee131e/001-1-ugrxafukeqdczx8w8f4dxw-png.webp"
cardSpan: "full"
originalId: "medium:0cbdfcee131e"
locale: "zh"
placeholder: false
---

在算法做市中，机器人性能和风险意识至关重要。Balance Watcher 是一个实时余额监控模块，旨在保护资金，并在市场波动期间提升机器人的可靠性。它确保做市机器人在意外事件影响余额时不会盲目运行。

做市商所处的环境可能因价格剧烈波动、激进的机器人策略、API 错误或交易所中断而显著影响账户余额。传统系统通常在未评估环境是否安全的情况下恢复交易，使资金面临风险。Balance Watcher 会持续监控账户余额，并将实时数据与预设的历史基准进行比较。一旦出现异常，它会主动发出警报并采取预防措施，而不是任由机器人无限制运行。

该系统会跟踪最新资产余额及价格变动，并将这些数据与存储的参考快照进行对比，以检测异常行为。它能够识别超出市场波动合理范围的意外余额下降，包括突发流动性缺口或恶意机器人活动等情况。当检测到异常时，Balance Watcher 会发送包含上下文的详细警报，帮助操作人员快速做出明智决策。根据配置，它可暂停所有机器人活动，或进入风险受限的安全模式。

![推出 Balance Watcher — 市商机器人中的智能实时余额监控](/images/engineering-notes/medium/0cbdfcee131e/002-0-z8beu6lxof-2s1qa.webp)

Balance Watcher 结合了两种关键监控技术。第一种是基础货币绝对值追踪，用于评估结算货币（如 USDT 或 BTC）的直接减少，通常可提示非计划性资产使用或损失。第二种是归一化综合余额追踪。通过将代币余额转换为统一的参考值，系统可估算在当前价格下您的总价值应处的位置。如果实际余额低于预期值并超过设定阈值，系统将触发警报。

![推出 Balance Watcher — 市商机器人中的智能实时余额监控](/images/engineering-notes/medium/0cbdfcee131e/003-0-e5ykx8yvvnxmgrxl.webp)

这种双重方法即使在正常市场波动期间也能可靠地捕捉明显和隐蔽的余额异常。更多技术细节和配置信息，请参阅 GitHub 上 ADAMANT tradebot 的 [功能说明](https://github.com/Adamant-im/adamant-tradebot/issues/85)。

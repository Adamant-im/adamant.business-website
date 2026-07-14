---
title: "ADAMANT TradeBot 中 /balances 输出的改进"
slug: "improved-balances-output-in-the-mm-bot-e7de04a88f8a"
description: "开源做市工具的强大程度取决于其可用性。ADAMANT TradeBot 最近改进了 /balances 等核心命令的界面信息展示，提升用户体验。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improved-balances-output-in-the-mm-bot-e7de04a88f8a"
publishedAt: "2026-01-27T20:06:24.444Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/e7de04a88f8a/001-1-dqzndrygjqx5bkqeefcika-png.webp"
cardSpan: "full"
originalId: "medium:e7de04a88f8a"
locale: "zh"
placeholder: false
---

开源的做市工具只有在易于使用时才真正强大。最近对 ADAMANT TradeBot —— 一款供加密项目和交易所自托管的做市机器人 —— 的改进，重点在于使界面更具信息性，尤其是针对 `/balances` 这类核心命令。

该改进需求最初在 ADAMANT 的 GitHub 仓库中以问题 #89 进行跟踪，提出了多项优化。其目标包括：在没有未知代币时移除令人困惑的提示、修复相关命令中的视觉错误，以及在交易消息中添加价格强度指示器。例如，机器人现在可以显示某笔卖出交易相对于市场价格是高价（好价格）还是低价（坏价格）执行的。

![MM 机器人中改进的 /balances 输出](/images/engineering-notes/medium/e7de04a88f8a/002-1-2xdmbg-cdiktreq64dog2w-png.webp)

为了表示交易量，机器人使用一系列海洋生物表情符号，例如 🦐、🍤、🐟、🐬、🦈 和 🐳。这些交易量到表情符号的映射在机器人的配置文件中通过美元（USD）阈值进行定义。

```json
  /** Volume thresholds in USD for different emoji levels */
  "volumes_thresholds_usd": {
    "🦐": 10,
    "🍤": 50,
    "🐟": 100,
    "🐬": 300,
    "🦈": 1000,
    "🐳": 5000,
    "🐳🐳": 10000,
    "🐳🐳🐳": 50000
  },
```

此外，机器人使用彩色圆点和箭头来指示相对于市场价格的价格强度。绿色圆点表示好价格，例如低价买入或高价卖出，而红色圆点表示坏价格，例如高价买入或低价卖出。箭头则提供更精细的指示，显示资产是否以极高的价格卖出或以极低的价格买入。

此类可用性改进降低了机器人操作者的认知负担，使工具更易于使用。尽管这些更改目前仅在机器人的 Premium 版本中实现，但它们很快也将出现在基础的开源版本中。

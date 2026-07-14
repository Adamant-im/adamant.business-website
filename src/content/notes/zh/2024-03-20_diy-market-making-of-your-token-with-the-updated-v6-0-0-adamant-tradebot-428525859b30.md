---
title: "使用 ADAMANT TradeBot v6.0.0 自主做市"
slug: "diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
description: "ADAMANT 交易与做市机器人是为需要自主做市的代币发行方和加密货币交易所提供的开源工具。它通过下单和执行交易来生成交易量、维持价差和流动性、构建动态订单簿并监控代币价格。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
publishedAt: "2024-03-20T08:47:50.471Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/428525859b30/001-0-nwojohhggiizs7us.webp"
cardSpan: "full"
originalId: "medium:428525859b30"
locale: "zh"
placeholder: false
---

ADAMANT 交易与做市机器人是一款为需要自主做市的代币发行方和加密货币交易所提供的开源工具。它通过下单和执行交易来生成交易量、维持价差和流动性、构建动态订单簿，并监控代币价格。版本 6.0.0 引入了一系列值得关注的改进，适用于运行或自定义该机器人的用户。

### 配置和代码库变更

代码库已重构，以便为使用该开源项目的开发者提供更便捷的自定义体验。现在通过统一的交易配置草案实现更简化的配置，该草案适用于所有支持的交易所。用于提高准确性的价格函数（如 `getSmartPrice()` 和 `getCleanPrice()`）以及实用函数均已更新。价格监控器和动态订单簿构建器也得到增强，以实现更可靠的市场监控。

### 价格监控器的“防止”操作

此前，价格监控器的唯一操作是“填充”——即主动下买单或卖单，以跟踪另一交易所的参考价格。这种方法可能使机器人面临被第三方操纵的风险。新的“防止”操作采用了不同的方法：不再通过下单强行影响价格，而是定义一个安全的价格区间，其他机器人模块（如流动性模块）必须遵守该区间，禁止在此区间之外高价买入或低价卖出。

![使用更新后的 v6.0.0 ADAMANT TradeBot 为您的代币自主做市](/images/engineering-notes/medium/428525859b30/002-0-p2uha5tzki-2klb.webp)

### 新增和扩展的命令

`/deposit` 命令现在会显示所有可用链的充值地址，使充值更加便捷。

![使用更新后的 v6.0.0 ADAMANT TradeBot 为您的代币自主做市](/images/engineering-notes/medium/428525859b30/003-0-tj9d8w7qcgqwofa4.webp)

新增 `/info` 命令，可显示特定币种的所有可用信息，包括链详情。

![使用更新后的 v6.0.0 ADAMANT TradeBot 为您的代币自主做市](/images/engineering-notes/medium/428525859b30/004-0-raft4mu2likg0c8p.webp)

现在可根据模块类型（手动、订单簿构建器、价格监控器、流动性等）、买卖方向以及价格对订单取消操作进行筛选。这为管理员管理活跃订单提供了更精细的控制能力。

![使用更新后的 v6.0.0 ADAMANT TradeBot 为您的代币自主做市](/images/engineering-notes/medium/428525859b30/005-0-3slqf62rcikx-msf.webp)

当使用 `/amount`、`/interval` 或 `/stats` 时，机器人现在会报告其生成的预估交易量，帮助运营人员评估预期活动水平。

![使用更新后的 v6.0.0 ADAMANT TradeBot 为您的代币自主做市](/images/engineering-notes/medium/428525859b30/006-0-9eqmd9xwf7q7i7f6.webp)

新的 `/account` 命令会显示机器人账户的交易手续费和月度交易量（前提是交易所提供该数据）。

![使用更新后的 v6.0.0 ADAMANT TradeBot 为您的代币自主做市](/images/engineering-notes/medium/428525859b30/007-0-llggirhb0bb42g5m.webp)

`/stats` 命令已扩展，现包含交易对价格、最低价和最高价、交易量、订单簿最高买价和最低卖价及其价差、订单簿流动性、预估做市交易量，以及按类型分类并包含总计的订单统计信息。

![使用更新后的 v6.0.0 ADAMANT TradeBot 为您的代币自主做市](/images/engineering-notes/medium/428525859b30/008-0-hr1rvff4aeshjtpw.webp)

### 交易所支持

该机器人现在支持 XeggeX，并更新了对 Azbit、Coinstore、FameEX、NonKYC、P2B 和 StakeCube 的交易所连接器。此外还包括各种错误修复和杂项改进。

该版本发布和更新日志可在 GitHub 上获取：[adamant-tradebot v6.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0)

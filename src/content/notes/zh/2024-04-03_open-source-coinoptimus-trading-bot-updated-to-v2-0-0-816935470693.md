---
title: "CoinOptimus 交易机器人更新至 v2.0.0"
slug: "open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
description: "ADAMANT CoinOptimus 是一款专为非专业交易者设计的自托管加密货币交易机器人，现已更新至 2.0.0 版本。本次更新包含重构、错误修复及五项新命令。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
publishedAt: "2024-04-03T11:29:39.685Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/816935470693/001-1-yi0sr85whds3uma4ith6na-png.webp"
cardSpan: "full"
originalId: "medium:816935470693"
locale: "zh"
placeholder: false
---

ADAMANT CoinOptimus 是一款专为非专业交易者设计的自托管加密货币交易机器人，现已更新至 2.0.0 版本。本次发布包含代码重构、错误修复，以及五个新命令：`/fill`、`/stats`、`/deposit`、`/account` 和 `/info`。

### 新增命令

`/fill` 命令可在单步操作中向订单簿填充一系列订单。

![开源 CoinOptimus 交易机器人更新至 v2.0.0](/images/engineering-notes/medium/816935470693/002-0-p-pmlz9g0oqkhlzh.webp)

`/stats` 命令可显示交易对的统计数据，包括价格、最低价、最高价、交易量、订单簿最高买价、最低卖价、价差以及订单簿流动性。

![开源 CoinOptimus 交易机器人更新至 v2.0.0](/images/engineering-notes/medium/816935470693/003-1-ghu8f-ht7mxhagdmaqo1ag-png.webp)

`/deposit` 命令可返回一个地址，用于在不同链上为交易所账户充值。

![开源 CoinOptimus 交易机器人更新至 v2.0.0](/images/engineering-notes/medium/816935470693/004-0-j-uwsyddj1i6k3d7.webp)

`/account` 命令可显示机器人账户的交易手续费及月度交易量（如可用）。

![开源 CoinOptimus 交易机器人更新至 v2.0.0](/images/engineering-notes/medium/816935470693/005-0-vfvn8x-wf1ohwg8a.webp)

`/info` 命令可显示特定币种和链的全部可用信息。

![开源 CoinOptimus 交易机器人更新至 v2.0.0](/images/engineering-notes/medium/816935470693/006-0-n5uqmmhtmdcwjbe3.webp)

### CoinOptimus 的工作原理

CoinOptimus 是一款基于 Node.js 的应用程序，可在服务器或 VPS 上持续运行。您需通过交易所、交易对以及交易所账户的 API 密钥进行配置。机器人将根据您通过 ADAMANT Messenger 发送的指令管理交易策略并下单，并作出相应响应。

该机器人主要采用最优阶梯/网格交易策略，从价差开始设置多个买入和卖出订单。当最接近价差的订单成交后，机器人会在相反方向添加一个类似的订单，遵循“买入价低于卖出价，卖出价高于买入价”的原则。该策略在波动性市场中尤为有效。

![开源 CoinOptimus 交易机器人更新至 v2.0.0](/images/engineering-notes/medium/816935470693/007-0-twtuzn4rmej2q4s8.webp)

![开源 CoinOptimus 交易机器人更新至 v2.0.0](/images/engineering-notes/medium/816935470693/008-0-ruyx47yeeapvvo4r.webp)

安装配置说明请参见 [代码仓库 README](https://github.com/Adamant-im/adamant-coinoptimus#usage-and-installation)。请注意，CoinOptimus 并非稳赚不赔的工具，请自行承担使用风险。

---
title: "ADAMANT 交易与做市机器人 v5.1.0 发布"
slug: "update-of-market-making-bot-for-cryptocurrency-projects-2895a7472b9f"
description: "ADAMANT 交易与做市机器人是用于在加密货币交易所执行交易的免费开源软件。支持制造交易量、维持价差和流动性、设置价格范围等。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/update-of-market-making-bot-for-cryptocurrency-projects-2895a7472b9f"
publishedAt: "2022-11-16T04:09:02.513Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2895a7472b9f/001-1-3lizhhkkfifjduf5z4zxtq-png.webp"
cardSpan: "full"
originalId: "medium:2895a7472b9f"
locale: "zh"
placeholder: false
---

![加密货币项目做市机器人更新](/images/engineering-notes/medium/2895a7472b9f/002-1-ji7ldfgywe0whe5fgx-qag-gif.webp)

ADAMANT 交易与做市机器人是用于在加密货币交易所执行交易的免费开源软件。它支持制造交易量、维持价差和流动性、设置价格范围，以及构建类似真实的动态订单簿。版本 5.1.0 现已在 [ADAMANT GitHub 仓库](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.1.0) 发布。

该机器人安装在您自己的服务器或 VPS 上，可初始填充订单簿，并在交易进行过程中动态构建订单簿。它可下达限价或市价的买入和卖出订单，并提供三种做市策略：基于价差、基于订单簿和最优策略。系统会持续维持价差和流动性，且可通过可配置的价格范围将交易控制在设定区间内。机器人还支持在其他交易对或交易所之间进行代币价格套利。所有管理操作均通过在 ADAMANT Messenger 中发送命令完成。

部分附加功能作为付费服务提供，可根据需求开通。包括基于 Telegram 的管理、对更多交易所的支持，以及全套的安装、配置和持续支持服务。高级订单簿功能包含强大的反向套利系统、可清除价格操纵订单的反作弊机制、无间隙订单簿、高频更新，以及在订单簿内部做市而不触发价差内交易。此外还提供价格图表平滑处理，以及在设定价格范围内自动构建类真实交易图表的功能。

其他付费选项包括使用两个账户或密钥进行交易、在账户间平衡代币、补充特定代币储备。交易量可配置为在价格拉升或暴跌期间增加活动频率。性能优化方面包含订单簿和余额缓存，以节省交易所 API 调用额度，并支持 socket 连接。通知可通过电子邮件、Telegram 或其他即时通讯工具发送。其他功能还包括提现功能、账户信息展示、自定义命令与统计、跨机器人通信（可同时远程控制所有机器人）、代币对 USDT 的自动卖出、大额订单预警、价格支撑位维持、无需实际买卖的做市、特定时间段的价格目标设定等。管理界面或应用程序也可根据需求定制开发。

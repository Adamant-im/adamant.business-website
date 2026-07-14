---
title: "使用 ADAMANT 做市机器人 v2.7.0 进行流动性与价差维护"
slug: "liquidity-and-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
description: "投资者评估加密项目时会关注交易所的流动性和价差。流动性表示用户可交易的代币数量，而价差反映买卖价格差异。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/liquidity-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
publishedAt: "2020-11-22T19:34:30.866Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e248058d3770/001-1-3lizhhkkfifjduf5z4zxtq-png.webp"
cardSpan: "full"
originalId: "medium:e248058d3770"
locale: "zh"
placeholder: false
---

当投资者评估一个加密货币项目时，他们会查看其在交易所的流动性和价差。流动性表示用户可以买入或卖出多少代币，而价差则反映了买卖价格之间的差异。即使是小型项目，现在也可以利用 ADAMANT marketmaking.app 做市机器人来维持实时流动性并提供有竞争力的价差。

版本 2.7.0 将流动性和价差维护作为核心功能引入。用户可以通过 `/enable liq` 命令配置这些参数，从而为机器人在支持的交易所上设定需维持的流动性和价差目标。

本次发布还新增了价格监控功能。`/make price` 和 `/enable pw` 命令允许运营者设定并监控目标价格，使项目方能更有效地控制代币在市场上的估值。

此次更新还包括多项操作性改进。`/balances` 命令现在提供更详细的信息，日志系统也已升级以提升可观测性。机器人现在能更优雅地处理请求超时，并新增了做市趋势分析功能，帮助机器人做出更明智的交易决策。

ADAMANT Tradebot 是一个开源项目。发行说明和下载地址可在 GitHub 上获取。

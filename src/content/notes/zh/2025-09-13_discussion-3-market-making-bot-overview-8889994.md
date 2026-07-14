---
title: "ADAMANT 做市机器人概述"
slug: "discussion-3-market-making-bot-overview-8889994"
description: "ADAMANT 做市机器人（adamant tradebot）是一款免费、自托管的加密货币项目做市工具，可管理交易量、价差、流动性、价格范围和动态订单簿。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/3"
publishedAt: "2025-09-13T11:43:38Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:8889994"
locale: "zh"
placeholder: false
---

ADAMANT 的做市机器人（adamant-tradebot）是一款免费、自托管的做市机器人，专为加密货币项目和代币发行方设计。它能够通过单一应用程序管理交易量、价差、流动性、价格范围以及动态订单簿。

## 版本

该机器人提供两个版本。公开的免费开源版本适用于流动性较低的小型加密项目，支持有限的中心化交易所列表。付费高级版本则增加了高级功能并支持更多交易所。您可以立即开始使用免费版本；高级版本可通过 marketmaking.app 网站获取。

## 目标用户

该机器人主要面向已创建自身代币、在交易所上市并希望维持健康市场表现的加密货币持有者和发行方。良好的做市行为有助于吸引交易者和投资者。加密交易所也可从中受益，既可以直接在目标交易对上运行该机器人，也可以激励已上线项目自行运行机器人，以提供更高流动性并保持订单簿充实。

## 免费版本功能

免费版本为自托管和自控制，意味着您完全掌握自己的交易所 API 密钥和资产余额。它可构建动态订单簿，并支持四种做市策略：价差（spread）、订单簿（order book）、最优（optimal）和深度（depth）。您可以维持价差和流动性，设置价格区间，并通过监控其他交易对和交易所的代币价格执行套利操作。

## 优势

与竞争产品相比，该机器人不收取任何月费或订阅费用。由于采用自托管模式，您的交易所 API 密钥永远不会离开您的服务器，也无需将 BTC、USDT 或代币转移至任何第三方。机器人由用户自主管理，可在运行期间随时更新做市参数。

## 快速开始

从 GitHub 仓库将机器人安装到您的服务器或 VPS 上并进行配置。设置完成后，您可以自定义交易参数，如交易金额、流动性及订单簿设置。机器人通过 ADAMANT Messenger 的文本命令进行管理。

## 报告问题

如有问题或建议，请在本类别下创建新的论坛主题。如遇漏洞或技术问题，请在 adamant-tradebot 仓库提交 GitHub Issue。

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8889994/001-60f408ea.webp)

![Discussion screenshot 2](/images/engineering-notes/github/discussions/8889994/002-c7ac25ed.webp)

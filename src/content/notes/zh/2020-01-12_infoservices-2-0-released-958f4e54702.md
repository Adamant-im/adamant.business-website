---
title: "InfoServices 2.0 发布"
slug: "infoservices-2-0-released-958f4e54702"
description: "ADAMANT InfoServices 已更新至 2.0 版本，新增多项功能并提升稳定性。服务现从 CryptoCompare 和 Coingecko 获取加密货币行情，同时减少 Coinmarketcap API 调用。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/infoservices-2-0-released-958f4e54702"
publishedAt: "2020-01-12T12:25:26.832Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/958f4e54702/001-0-zxv8izxs4xnlu4e.webp"
cardSpan: "full"
originalId: "medium:958f4e54702"
locale: "zh"
placeholder: false
---

ADAMANT InfoServices 已更新至 2.0 版本，带来多项新功能和稳定性改进。该服务现在从 CryptoCompare 和 Coingecko 获取加密货币行情，同时最小化调用 Coinmarketcap API 以优化使用。通过 ADAMANT 和 Slack 发送错误通知，并结合常规操作日志，进一步提升了可靠性。新增的配置读取器支持在配置文件中进行更精细的设置。本次更新共涉及 15 个文件变更，462 次插入和 75 次删除。

作为一款免费且开源的加密货币和法币汇率提供服务，ADAMANT InfoServices 聚合了来自 MOEX、Coinmarketcap、CryptoCompare 和 Coingecko 的数据。它能够计算交叉汇率，并通过 API 提供信息。对于加密开发者而言，自行托管该服务相比依赖第三方端点能更可靠地获取行情数据。

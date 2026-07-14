---
title: "ADAMANT InfoService v3.3.5 增加跨源汇率验证功能"
slug: "reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
description: "ADAMANT InfoService 从多个来源聚合货币和加密货币汇率，并通过 API 提供给下游应用使用。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
publishedAt: "2022-02-15T10:59:58.332Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/791bd7d9e097/001-1-olubh0mvysjvmtykzm2u4a-png.webp"
cardSpan: "full"
originalId: "medium:791bd7d9e097"
locale: "zh"
placeholder: false
---

ADAMANT InfoService 是一项从 MOEX、Currency-Api、Coinmarketcap、CryptoCompare 和 Coingecko 聚合货币及加密货币汇率的服务，并通过 API 向下游应用提供数据。

v3.3.5 版本引入了 Currency-Api 作为新的法币汇率数据源。更重要的是，InfoService 现在会对比来自不同提供商的汇率数据，并在检测到偏差时标记出错误或异常的数据。这种跨源验证机制显著提升了服务的可靠性，因为单个数据源的异常行为更难将错误的汇率传播给最终用户。

本次更新还包括内部重构、错误修复、代码检查工具（linter）集成以及依赖项升级。

API 文档请参见 [ADAMANT InfoService wiki](https://github.com/Adamant-im/adamant-currencyinfo-services/wiki/InfoServices-API-documentation)。完整发布说明请查看 [v3.3.5 发布页面](https://github.com/Adamant-im/adamant-currencyinfo-services/releases/tag/v3.3.5)。

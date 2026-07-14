---
title: "ADAMANT Tradebot v6.0.0"
slug: "release-adamant-tradebot-v6-0-0-147389142"
description: "本次更新对 ADAMANT Tradebot 进行了重大重构，将所有交易所的配置整合到单一的 tradeParams_Default.js 文件中。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0"
publishedAt: "2024-03-20T08:46:40Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:147389142"
locale: "zh"
placeholder: false
---

本次更新对 ADAMANT Tradebot 进行了重大重构，将所有交易所的配置整合到单一的 `tradeParams_Default.js` 文件中。`getSmartPrice()` 和 `getCleanPrice()` 函数已更新，同时更新了 `isOrderOutOfPriceWatcherRange()` 函数。此外，新增了多个工具函数以支持这些变更。

价格监视器（Price watcher）已改进，并新增支持 `prevent` 操作。在数量或时间间隔更新时，现在会显示交易量预估。`/stats` 命令提供了更详细的信息，而 `/info` 命令可获取代币提现信息及支持的网络。余额信息也已扩展。

`/account` 命令现在可显示交易手续费和交易量信息。机器人会收集所有订单的成交详情，动态订单簿构建器也已优化。在提交市价订单后，机器人会检查订单是否已成交。`getMinOrderAmount()` 函数也得到了改进。

新增支持 XeggeX 交易所。Azbit、Coinstore、FameEX、NonKYC、P2B 和 StakeCube 的交易所连接器已更新。本次发布还包含其他多项改进、错误修复以及依赖项更新。

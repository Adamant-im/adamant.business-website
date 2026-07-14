---
title: "ADAMANT Tradebot v2.10.6"
slug: "release-adamant-tradebot-v2-10-6-35700159"
description: "此版本重点提升 ADAMANT Tradebot 的性能与稳定性，优化了 CPU 使用率，修复了影响 API 限制和请求延迟的问题。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v2.10.6"
publishedAt: "2020-12-24T13:13:19Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v2.10.6"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:35700159"
locale: "zh"
placeholder: false
---

此版本重点提升 ADAMANT Tradebot 的性能与稳定性。CPU 使用率已得到优化，并解决了多个影响 API 限制和延迟请求响应的问题。Bit-Z 的响应分页问题也已修复，以确保从此交易所可靠地获取数据。

在功能方面，`/balances`、`/orders`、`/rates` 和 `/stats` 命令现在提供额外信息，帮助操作员更有效地监控机器人活动。作为持续重构工作的一部分，引入了新的 `orderUtils` 模块，并新增支持 `man` 订单类型，用于手动下单。通知频率已降低，以减少不必要的提醒。依赖项已更新至最新兼容版本。

---
title: "ADAMANT Tradebot v7.0.0"
slug: "release-adamant-tradebot-v7-0-0-201883296"
description: "此版本引入了请求缓存功能和多个用于与交易所交互的新命令，包括 /orderbook、/trades、/ticker、/order 和 /cancel。/help 命令已更新。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0"
publishedAt: "2025-02-23T05:56:49Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v7.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:201883296"
locale: "zh"
placeholder: false
---

此版本引入了请求缓存功能以及多个用于与交易所交互的新命令，包括 `/orderbook`、`/trades`、`/ticker`、`/order` 和 `/cancel`。`/help` 命令已更新，包含有关机器人软件及其配置的信息。

命令、订单簿和交易模块已重构，以提高可维护性。新增了 `database` 配置选项以支持这些更改。Azbit 和 P2B 连接器中的 `getOrderDetails()` 函数已修复。

依赖项已更新，代码库中已应用了常规错误修复和改进。日志功能已优化，并添加了 TypeScript 类型，以增强类型安全性和开发体验。

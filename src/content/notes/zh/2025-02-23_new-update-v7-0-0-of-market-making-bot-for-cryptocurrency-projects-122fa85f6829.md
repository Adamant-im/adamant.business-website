---
title: "做市机器人 v7.0.0：请求缓存、新命令和数据库配置"
slug: "new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
description: "ADAMANT 做市机器人是面向加密货币项目和交易所的免费、开源、自托管工具。它可生成交易量，维持价差和流动性，设定价格范围，并构建类似真实的动态订单簿。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
publishedAt: "2025-02-23T06:05:24.786Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/122fa85f6829/001-0-eevpacxefsrwodwf.webp"
cardSpan: "full"
originalId: "medium:122fa85f6829"
locale: "zh"
placeholder: false
---

ADAMANT 做市机器人是一款面向加密货币项目和交易所的免费、开源、自托管工具。它可生成交易量，维持价差和流动性，设定价格范围，并构建类似真实的动态订单簿。v7.0.0 版本引入了请求缓存、多个新命令、数据库配置功能，以及一系列错误修复和代码重构。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/002-0-vbzoksgzwcabzz-z.webp)

### 请求缓存

交易所 API 通常限制请求频率，在活跃做市期间，机器人可能会遇到 `429 Rate limit exceeded` 错误。这会中断交易，某些情况下甚至可能导致交易所封禁账户。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/003-0-sgbs6ithtx73pqm2.webp)

新的缓存功能通过在大约一到两秒的短时间内合并余额、订单簿和未成交订单的查询结果，解决了这一问题。此前为付费模块的缓存功能，现对所有用户开放。

### 新命令

`/help` 命令现在会报告机器人软件及其配置的基本信息。此外新增了多个命令，用于检查交易所状态和管理单个订单：

`/orderbook [pair] [count]` 返回订单簿中的当前买价和卖价。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/005-0-cu4bhsoehypr6ini.webp)

`/trades [pair] [count]` 返回最近的交易记录。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/006-0-syt1bu8k15rurvv0.webp)

`/ticker [pair]` 以 JSON 格式提供行情数据，类似于 `/rates`。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/007-0-uvfrkvq-y40vijsu.webp)

`/order {orderId}` 根据订单 ID 获取特定订单的详细信息。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/008-0-m50bnrxoc27z38oc.webp)

`/cancel {orderId}` 根据订单 ID 取消特定订单并返回其详细信息。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/009-0-um38pjzfvcanrry7.webp)

### 数据库配置

现在可以在配置文件中设置数据库参数，包括数据库名称。这使得在单台服务器上运行多个机器人实例成为可能。由于交易可能消耗大量 CPU 和内存资源，建议在并行运行多个实例前检查系统负载。

要配置数据库，请编辑 `config.jsonc` 并调整 `db` 参数：

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/010-0-yfdntcpmwdyzvj8c.webp)

此更改具有向后兼容性；如果未更新配置，机器人将使用默认数据库参数。

### 连接器修复及其他改进

Azbit 和 P2B 连接器修复了 `getOrderDetails()` 问题，并针对两家交易所 API 的不完善之处实现了兼容方案。Command、Order book 和 Trader 模块已完成重构，并作为持续提升代码质量工作的一部分，添加了 TypeScript 类型。此外还更新了依赖项，改进了日志记录，并修复了若干次要错误。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/011-0-la8ixtoq1x1d6nbm.webp)

机器人将继续提供详细的通知，以便运营人员监控交易活动。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/012-0-bb8s0ouz9vefnxus.webp)

发布版本及完整更新日志可在 GitHub 上获取：[v7.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0)。

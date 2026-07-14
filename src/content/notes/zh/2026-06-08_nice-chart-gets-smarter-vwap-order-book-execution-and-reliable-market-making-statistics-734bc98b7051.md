---
title: "Nice Chart 更智能：VWAP、订单簿执行和可靠的做市统计"
slug: "nice-chart-gets-smarter-vwap-order-book-execution-and-reliable-market-making-statistics-734bc98b7051"
description: "ADAMANT 交易机器人 v23.0.0 显著升级了 Nice Chart 模式，改进 VWAP 跟踪、订单簿执行和交易统计，提升做市效率与透明度。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/nice-chart-gets-smarter-vwap-order-book-execution-and-reliable-market-making-statistics-734bc98b7051"
publishedAt: "2026-06-08T13:31:06.952Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/734bc98b7051/001-1-m2zzlsbbi-isnuqvz3kn9q-png.webp"
cardSpan: "full"
originalId: "medium:734bc98b7051"
locale: "zh"
placeholder: false
---

最新的 `adamant-tradebot` 更新（版本 23.0.0）显著升级了 Nice Chart，即 ADAMANT 的高级做市模式。该执行引擎不再只是简单生成交易活动，而是现在能跟踪每笔交易的更多上下文，更精确地评估预期 VWAP 价差，并报告有关交易者行为和最近已关闭订单的详细统计数据。这有助于操作员不仅了解发生了什么，还能理解背后的原因。

## 更精准的 VWAP 价差跟踪

VWAP（成交量加权平均价格）是衡量执行质量最重要的指标之一。此次更新从三个方面改进了 VWAP 的处理。首先，修复了价差显示精度问题——此前的百分比格式可能产生误导，新的显示方式适用于基点级别的分析。其次，允许的 VWAP 价差阈值已调整为 0.6%，使策略在真实市场条件下匹配订单时具备更实用的灵活性。第三，引擎现在能更谨慎地处理负的预期 VWAP 价差情况，因为某些订单簿状态表面上看似合理，但预期执行实际上可能扭曲既定的交易逻辑。

## 更智能的订单簿执行

![Nice Chart 更智能：VWAP、订单簿执行和可靠的做市统计](/images/engineering-notes/medium/734bc98b7051/002-1-flqt3yboi63ap-dbqbejq-png.webp)

更新后的引擎引入了更明确的执行路由机制，使策略更易于理解、调试和操作。新增的配置参数 `executeInOrderBookPercent` 可控制交易中有多大比例可通过订单簿直接执行。这避免了对可见流动性的过度激进消耗，对于订单簿浅薄、不均衡或部分由第三方交易者控制的市场尤其有用。Nice Chart 现在可应用金额上限并做出更谨慎的决策，而非盲目执行全额交易。

## 更透明的执行跟踪

机器人现在对订单簿操作、路由决策、金额限制和交易执行行为提供了更清晰的日志。当发生异常情况——如部分成交、替换、跳过或意外匹配——日志会提供更丰富的上下文。对于交易系统而言，良好的日志不仅是开发者的便利工具，更是运行安全的重要组成部分。

## 改进的交易者统计

`/orders t full` 命令已增强，提供更多关于最近已关闭订单、历史统计数据、交易量和基于纪元（epoch）的跟踪信息。操作员现在可以回答诸如：自当前纪元开始以来生成了多少交易量、最近关闭了多少订单，以及当前活动是否与历史行为一致等问题。

![Nice Chart 更智能：VWAP、订单簿执行和可靠的做市统计](/images/engineering-notes/medium/734bc98b7051/003-1-go7ssfwyfsy0gje-f72-yg-png.webp)

## 更优的成交归因

新增函数 `attributeThirdPartyFillFromMatchPlan` 改进了在涉及订单簿执行时，成交引擎对第三方成交的归因方式。这使统计数据更准确，并有助于区分内部策略行为与外部市场交互。

## 按市价计算的盈亏与美元现金流

按市价计算的盈亏（MTM PnL）计算现已增强，加入了美元现金流属性。这使得在需要以美元衡量表现的交易对中，报告更加清晰，而不仅限于基础资产或报价资产。

## 类型系统与测试

为蜡烛图数据、订单簿信息、执行配置、价格请求、交易者设置和 Nice Chart 配置新增和更新了类型定义。尽管项目仍基于 JavaScript 并使用 JSDoc 注解，但更完善的类型定义能更早发现错误，降低出现细微执行 bug 的风险。测试覆盖范围也已扩展，涵盖订单簿操作、金额限制、成交处理、VWAP 行为和工具函数，并使用模拟数据覆盖更真实的订单簿场景。

## 配置与兼容性

![Nice Chart 更智能：VWAP、订单簿执行和可靠的做市统计](/images/engineering-notes/medium/734bc98b7051/004-1-4imanifwledhlg5xklk-ow-png.webp)

默认配置已扩展，新增了 Nice Chart 执行设置，使调整订单簿执行行为更加容易，无需修改代码。此次更新与现有订单数据向后兼容——无需数据库迁移，且新参数具有合理的默认值。在保持系统其余部分正常运行的同时，也可禁用或回滚 Nice Chart 的订单簿执行功能。

## 操作员应监控的内容

升级后，操作员应监控以下内容：VWAP 价差行为（新的 0.6% 阈值可能影响在狭窄或不稳定价差中的匹配逻辑）、订单簿执行频率（路由逻辑和金额上限可能改变交易触及现有流动性的频率）、成交归因（应将第三方成交与交易所记录进行比对）以及交易者统计（确认交易量、最近已关闭订单、纪元指标和历史统计数据是否正确显示）。

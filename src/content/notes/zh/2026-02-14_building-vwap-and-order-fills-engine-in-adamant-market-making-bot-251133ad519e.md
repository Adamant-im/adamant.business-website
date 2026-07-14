---
title: "在 ADAMANT 做市机器人中构建 VWAP 与订单成交引擎"
slug: "building-vwap-and-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
description: "ADAMANT 做市机器人已支持动态盘口管理、价差控制、流动性提供和交易量策略。但若缺乏准确的成交分析，则只能看到一半的情况。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/building-vwap-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
publishedAt: "2026-02-14T13:30:19.720Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/251133ad519e/001-1-stivdc2giqxmbc5miuwkxa-png.webp"
cardSpan: "full"
originalId: "medium:251133ad519e"
locale: "zh"
placeholder: false
---

在 ADAMANT 做市机器人中，已支持动态盘口管理、价差控制、流动性提供和交易量策略。然而，若缺乏准确的成交分析，则只能看到一半的情况。[问题 #87](https://github.com/Adamant-im/adamant-tradebot/issues/87) 引入了一项重大架构升级：一个专用的 VWAP 引擎和订单成交引擎（高级模块），可提供专业级别的执行分析功能。

### 为什么 VWAP 很重要

大多数交易所 API 提供的信息是碎片化的。订单可能部分成交，状态更新可能延迟，某些交易所返回的执行数据不完整，重启可能导致内部执行上下文丢失。如果机器人未能正确持久化和验证成交数据，盈亏计算将不准确，持仓追踪将不可靠，风险管理逻辑会失效，而价差和流动性调整也将基于假设而非实际情况。

为了达到机构级操作水平，该引擎采用持久化执行追踪、经验证的成交对账、正确的 VWAP 计算以及基于持仓的分析功能。

### 解决方案：专用 VWAP 与成交引擎

问题 #87 引入了一个包含三个主要组件的专用子系统。

**原始成交事件存储（仅追加）**。一个专用的 `fillsDb` 以仅追加模式存储原始成交事件，并在重启后仍能持久保存，无需立即聚合。这确保了不会丢失或覆盖任何执行数据。

**交易所验证层**。每个成交事件都必须通过交易所 API 进行验证，确认其完全或部分执行，并且仅在确认后才标记为已处理。当机器人失去连接、交易所节点不可用或 API 响应不完整时，此机制可防止出现误报成交。执行验证仅在网络连接正常且交易所端点可达时进行；否则，有效的交易可能被错误地标记为失败。

核心验证函数实现了“尽可能始终验证”的策略：

```javascript
/**
 * Verifies a fill order using exchange API.
 *
 * Policy "always verify if possible":
 *  - If api.getOrderDetails() is missing -> cannot disprove -> treat as confirmed
 *  - If status missing or exception -> return undefined (try again later)
 *  - If API says 'filled' -> confirmed
 *  - If API says explicitly not filled ('new'|'part_filled'|'cancelled') -> rejected
 *  - If API says 'unknown' -> keep (cannot disprove) but warn
 *
 * @param {FillOrder|Object} order Fill order record or Order object
 * @param {any} api API instance (spot first/second account, or other compatible trader api)
 * @param {string} callerName Log context id (usually module and method which calls) to quickly find related logs
 * @returns {Promise<VerifyFillResult | undefined>
 */
async function verifyOrderFilled(order, api, callerName)
```

**聚合执行统计**。第二个持久化存储 `filledStatsDb` 汇总已购买和售出的总基础资产、已花费和收到的总报价资产，以及完整成交、部分成交、被拒绝和缺失成交的计数器。基于这些数据计算核心指标。

### 核心指标

基础统计对象结构：

```javascript
/**
 * Creates a base FillsEngineStatsResult object with zeroed / default values.
 *
 * @param {string} statsId Format: `${exchange}:${pair}:${purpose}:${startTs}`
 * @param {string} pair Trading pair, e.g., `BTC/USDT`
 * @param {FilledStatsRecord | undefined | null} stats Epoch stats (optional)
 * @returns {FillsEngineStatsResult}
 */
function createBaseEpochStats(statsId, pair, stats) {
  return {
    statsId,
    pair,
    updatedAt: stats?.updatedAt || 0,

    buy: stats?.buy ? { ...stats.buy } : emptySide(),
    sell: stats?.sell ? { ...stats.sell } : emptySide(),

    // Calculated later
    boughtVwap: 0,
    soldVwap: 0,

    hasBothSides: false,
    vwapSpread: 0,
    vwapSpreadPercent: 0,

    pnlQuoteCashflow: 0,
    inventoryBase: 0,
    markPrice: undefined,
    pnlQuoteMtm: undefined,
  };
}
```

**VWAP（成交量加权平均价格）** 按买卖方向分别计算为买入 VWAP 和卖出 VWAP，使用公式 `VWAP = 总报价金额 / 总基础资产数量`。这反映了实际执行质量，而不仅仅是下单价格。

**VWAP 价差** 是买入 VWAP 与卖出 VWAP 之间的差值，显示实际实现的交易价差，而非理论价差。

**持仓变动** 是总买入基础资产与总卖出基础资产之间的差额，用于风险管理、头寸暴露追踪和再平衡逻辑。

**已实现盈亏（Realized PnL）** 是基于已执行交易现金流的结果，可选结合当前市场价格进行市值计价盈亏（mark-to-market PnL）。

### 架构影响

新引擎是一个完全模块化的组件，能够无缝集成到现有架构中，而不会干扰当前的下单逻辑。它与现有系统并行运行，而非取代它们，在保持稳定性的同时增加了更深层次的分析能力。

```
          Exchange API
                │
                ▼
       Order Placement Engine
                │
                ▼
         Fills Collector
                │
                ▼
       Verification Engine
                │
                ▼
         Aggregation Engine
                │
                ▼
      VWAP / Inventory / PnL
                │
                ▼
    Risk & Strategy Modules
```

该架构为未来的扩展奠定了基础，将机器人从一个简单的下单工具转变为真正的执行分析系统。诸如流动性桶管理与动态价差维持等高级策略，高度依赖准确的执行数据才能正常运作。对于高级交易模块而言，执行分析是实现专业级操作的核心要求。

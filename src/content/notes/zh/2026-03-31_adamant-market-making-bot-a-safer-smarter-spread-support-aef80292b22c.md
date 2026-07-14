---
title: "ADAMANT 做市机器人：更安全、更智能的价差支持"
slug: "adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
description: "价差支持（SS）流动性订单是ADAMANT做市机器人的核心功能之一，但也很敏感。新版通过模拟工具、模块化和镜像策略提升其安全性与可控性。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
publishedAt: "2026-03-31T18:05:33.126Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/aef80292b22c/001-1-yjio7wtzsgsnwh-gu1vzpa-png.webp"
cardSpan: "full"
originalId: "medium:aef80292b22c"
locale: "zh"
placeholder: false
---

价差支持（SS）流动性订单是 ADAMANT 做市机器人中最强大的功能之一，但也最为敏感。它们有助于维持较窄的价差和健康的订单簿，但简单的补单逻辑可能被利用：补单循环会重复暴露风险，波动环境会扭曲订单放置，单边行情可能将一个有用机制变为可避免风险的来源。

本次更新通过三个阶段的升级解决了这一问题：专用的模拟工具、将价差支持与安全流动性拆分为可选子模块，以及用有界的镜像策略替代旧的可重复补单逻辑，在保持价差紧密的同时避免了无限亏损循环。

### 本次升级的意义

流动性逻辑在压力下应表现可预测。与基于深度的流动性不同（其天然尊重平均买卖价格），SS 订单的存在是为了支持价差本身。这使得它们对恶意成交、突然的单边行情以及在平静条件下有效但在波动中失效的挂单规则非常敏感。本次发布专注于在保持价差支持实用性的同时，防止其成为无限风险的来源。

### 第一阶段：模拟与可视化工具

在更改核心逻辑之前，构建了一个独立工具，用于在受控环境中检查 SS 行为。该工具由 `trade/tests/liquidity_test.js` 和 `trade/tests/liquidity_test.html` 组成，作为一个 Express + Socket.io 应用运行。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/002-1-idogwktarx9lftmrmbspow-png.webp)

在 **模拟模式** 下，工具在内存中保留单个订单簿快照。SS 迭代可手动触发，点击某个价格水平会模拟该水平以下所有订单的完全成交，便于复现边界情况并检查反应。

在 **实时模式** 下，工具持续从交易所刷新订单簿，并使用真实的 `ordersDb` 记录。迭代仍需手动触发，但环境反映实际市场状况。

HTML 界面包含一个颜色编码的订单簿表格，区分外部订单、深度流动性、SS 订单和镜像订单。统计面板显示每侧的未平仓、已成交和已取消 SS 订单数量、买卖 VWAP 值以及每次迭代的增量。只读的 `tradeParams` 面板显示当前运行状态，而手动控件允许操作员触发 SS 迭代、检查状态变化并复制单元格值。每次迭代都会高亮变化内容，将流动性行为从日志推断变为直接可观测。

### 第二阶段：将安全流动性与价差支持拆分为可选模块

此前，核心安全流动性状态和 SS 挂单逻辑都位于 `mm_liquidity_provider` 内部，紧密耦合了多个不同关注点。本次发布将它们拆分为两个专用模块：`trade/mm_liquidity_safe.js` 和 `trade/mm_liquidity_ss.js`。

安全流动性模块封装了 `liqLimits` 状态及所有相关辅助函数（`updateLiqLimits`、`loadLiqLimits`、`storeLiqLimits`、`resetLiqLimits`、`getLiqLimits`、`getVwapRangeString`）。它仅使用严格的 `subPurpose === 'depth'` 过滤器处理深度成交，专注于基于深度的执行历史和衍生限制。

价差支持模块封装了 SS 行为，包括 `updateSsLiquidity(liquidityOrders, orderBookInfo)`、`updateSsVwap()`、SS 价格逻辑、SS 订单数量限制和镜像挂单逻辑。每侧 SS 订单的最小和最大数量等常量也已移至此处。

主模块 `mm_liquidity_provider.js` 现在通过 `utils.softRequire()` 加载这两个模块。这些模块是可选的：如果任一缺失，机器人仍能正常工作。深度流动性继续运行。如果 `mm_liquidity_safe` 缺失，安全流动性限制将简单地不生效。如果 `mm_liquidity_ss` 缺失，价差支持将不生效。不会崩溃，不会中断流程，也无需单独的代码分支。

该提供者在模块存在时还会将 SS 特定的平仓规则委托给 SS 模块，用 `ss.updateSsLiquidity()` 替代内联的 SS 挂单循环，并在 SS 挂单后刷新订单簿，以便深度订单能使用最新的中间价，从而提高挂单一致性。

### 第三阶段：用有界镜像策略替代补单循环

这是核心行为的改变。旧的可重复补单模式在某些成交场景下可能以不良方式不断重新暴露风险。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/003-1-747lh26q3v79vk3xcekrvq-png.webp)

#### 核心镜像规则

当一个常规 SS 订单成交时，机器人会在相反一侧的对称价格处挂出一个**镜像订单**，大小相同。它**不会**在同侧挂出替代订单。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/004-1-fwgdzzeu-axrb9noqz-o2q-png.webp)

系统不再无休止地在刚被消耗的流动性位置补单，而是承认成交并通过对称的有限反向订单作出响应。这在保持市场紧密的同时，避免了同侧无限补单的反馈循环。

#### 镜像订单属性

镜像订单被明确标记为 `subType: 'mirrored'`、`subTypeString: ' (ss mirrored)'` 和 `priceCorrected: true`。`priceCorrected` 字段允许现有的 `closeLiquidityOrders` 逻辑跳过有效的镜像订单，即使它们位于正常的 SS 价差窗口之外，从而确保镜像订单在应保留时不会被取消，无需单独的取消路径。

#### 级联预防

镜像逻辑中的一个主要风险是递归行为：镜像订单被成交后再次被镜像，如此循环。这一点被明确阻止。已成交的镜像订单不会再被镜像。模块会检查 `subType`，一旦创建了镜像，原始订单将被标记为镜像源，防止级联链，确保机制有界。

#### 风险控制

**镜像距离上限。** 如果数学上的“真实”镜像价格距离中间价过远，机器人会回退到 SS 价差边缘附近的有界价格，而不是盲目挂单。这防止镜像订单脱离有意义的流动性行为。

**VWAP 相关性保护。** SS 现在通过一个以 `subPurpose: 'ss'` 为键的专用 `fillsEngine` 周期维护自己的成交统计数据，将 SS 的 `buyVWAP` 和 `sellVWAP` 与深度流动性分开跟踪。如果 SS VWAP 与当前中间价偏离超过 2%，则被视为过时并在挂单限制中被忽略。这在强烈单边反转后尤为重要，否则旧的 VWAP 锚点可能使 SS 逻辑被困在市场一侧。

**宽价差放松机制。** 在波动市场中，外部价差可能暂时远宽于预期的 SS 区域。当价差扩大到定义的倍数时，镜像占用检查会被放宽，使价差支持能继续运行，而不是因不再符合市场的严格挂单假设而冻结。

**有界的新常规 SS 挂单。** 常规 SS 挂单现在在相关时会尊重 SS VWAP。新的常规买单挂于 SS `buyVWAP` 之下，新的常规卖单挂于 SS `sellVWAP` 之上，减少在越来越不利的价位重复添加新暴露的风险。

### 可观测性与操作员控制改进

`/stats` 命令现在通过 `parseCommandParams` 验证交易对，接受任意交易对或永续合约代码（不仅限于默认对），以粗体格式化 24 小时价差值，对 `volumeInCoin2` 使用稳定精度，仅对默认交易对显示交易量和已执行订单统计，将阶梯（`ld`）订单纳入已执行订单统计，并添加了“备注”部分。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/005-1-h4suuocfjjiiwmrko04igq-png.webp)

通过 `/orders liq full` 可访问新的丰富流动性统计视图。它包括一个深度流动性区块，显示状态、价差参数、订单数量、未平仓金额、安全流动性限制和成交历史；一个价差支持区块，显示 SS 价差范围、订单大小限制、常规和镜像订单数量、SS 成交统计、VWAP 和按市值计价的盈亏；一个汇总总区块，聚合深度和 SS 成交数据；当前流动性周期开始时间；交易所最小订单信息；以及通过可复用的深度辅助函数提供的当前订单簿信息。成交统计表使用紧凑的四列表格：标签、买入、卖出和增量。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/006-1-bnw14f3hsjeoscgu6x3y0g-png.webp)

常规的 `/orders liq` 列表现在显示部分成交订单的成交百分比，并包含 `subPurpose` 和 `subType` 标签，如 `ss, mirrored`。`/orderbook` 命令新增了 **Purpose** 列，显示每个价格水平对应的机器人模块，源自实时 `ordersDb` 记录。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/007-1-m8b7g-dtzbkcqrovk8i-0w-png.webp)

`/enable liq` 命令现在在更改流动性参数前包含确认步骤，并验证构建能力：如果 `mm_liquidity_safe` 缺失，则拒绝深度范围表示法；如果 `mm_liquidity_ss` 缺失，则拒绝 SS 参数，并给出明确提示。新增的 `/enable liq reset` 子命令在确认后重置 `mm_liquidityInitTs` 并清除 `liqLimits`，重启 VWAP 周期。

手动 `/buy` 和 `/sell` 命令获得了安全改进：如果请求的订单价格偏离市场超过 1000%，机器人将停止并要求通过 `/y` 确认，防止意外的极端价格订单。`/account` 命令现在能更优雅地处理交易所 API 返回的空费用列表。

### 无破坏性变更

`mm_liquidity_safe` 和 `mm_liquidity_ss` 均为可选模块。如果任一缺失，`mm_liquidity_provider` 仍能正常运行，深度流动性保持激活。唯一的格式级变化是 `fillsEngine` 统计键现在可能包含可选的 `:<subPurpose>` 段；不包含该段的现有记录仍有效且不受影响。

### 总结

本次升级实现了三点：通过模拟工具使价差支持变得可见，将隐藏的流动性行为变为可检查和可重放；通过将安全流动性与 SS 从单一提供路径中解耦，使其模块化；最重要的是，通过用有界镜像策略替代可重复补单模型，使价差支持更安全，旨在保持价差紧密的同时防止失控的亏损循环。

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/008-1-mnimve9mbrwsscd6m9gllq-png.webp)

对于做市系统而言，这是正确的方向：不是为了活动本身而增加活动，而是在真实市场压力下实现更智能的行为。价差支持现在更易理解、更易维护，也更难被利用。

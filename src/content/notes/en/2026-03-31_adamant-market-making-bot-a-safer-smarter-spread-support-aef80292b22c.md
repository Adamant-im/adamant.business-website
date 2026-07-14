---
title: "ADAMANT Market-Making Bot: A Safer, Smarter Spread Support"
slug: "adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
description: "Spread Support (SS) liquidity orders are among the most powerful features of the ADAMANT Market Making Bot, but also the most delicate. They keep spreads tight and books healthy…"
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
locale: "en"
placeholder: false
---

Spread Support (SS) liquidity orders are among the most powerful features of the ADAMANT Market-Making Bot, but also the most delicate. They keep spreads tight and books healthy, yet naive refill logic can become exploitable: refill loops recreate exposure, volatile conditions distort placement, and one-sided moves turn a useful mechanism into a source of avoidable risk.

This update addresses that with a three-phase upgrade: a dedicated simulation tool, separation of Spread Support and Safe Liquidity into optional submodules, and replacement of the old repeatable refill logic with a bounded mirror strategy that preserves tight spreads without opening unlimited loss loops.

### Why this upgrade matters

Liquidity logic should behave predictably under stress. Unlike depth-based liquidity, which naturally respects average buy and sell prices, SS orders exist to support the spread itself. That makes them sensitive to hostile fills, sudden directional moves, and placement rules that work in calm conditions but break down in volatile ones. This release focuses on keeping Spread Support useful without letting it become an open-ended risk source.

### Phase 1: Simulation and visualization tool

Before changing core logic, a standalone tool was built to inspect SS behavior in a controlled environment. The harness consists of `trade/tests/liquidity_test.js` and `trade/tests/liquidity_test.html`, running as an Express + Socket.io application.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/002-1-idogwktarx9lftmrmbspow-png.webp)

In **paper mode**, the tool keeps a single order book snapshot in memory. SS iterations can be triggered manually, and clicking a price level simulates full fills of all orders up to that level, making it easy to reproduce edge cases and inspect reactions.

In **live mode**, the tool continuously refreshes the order book from the exchange and works with real `ordersDb` records. Iterations are still manually triggered, but the environment reflects actual market conditions.

The HTML interface includes a color-coded order book table distinguishing external orders, depth liquidity, SS orders, and mirrored orders. A statistics panel shows open, filled, and cancelled SS counts per side, buy and sell VWAP values, and per-iteration deltas. A read-only `tradeParams` panel displays active runtime state, while manual controls let operators trigger SS iterations, inspect state changes, and copy cell values. Every iteration highlights what changed, turning liquidity behavior from something inferred from logs into something directly observable.

### Phase 2: Extracting Safe Liquidity and Spread Support into optional modules

Previously, core Safe Liquidity state and SS placement logic lived inside `mm_liquidity_provider`, tightly coupling several distinct concerns. This release separates them into two dedicated modules: `trade/mm_liquidity_safe.js` and `trade/mm_liquidity_ss.js`.

The Safe Liquidity module encapsulates the `liqLimits` state and all related helpers (`updateLiqLimits`, `loadLiqLimits`, `storeLiqLimits`, `resetLiqLimits`, `getLiqLimits`, `getVwapRangeString`). It processes only depth fills using a strict `subPurpose === 'depth'` filter, keeping it focused on depth-based execution history and derived limits.

The Spread Support module encapsulates SS behavior including `updateSsLiquidity(liquidityOrders, orderBookInfo)`, `updateSsVwap()`, SS price logic, SS order-count limits, and mirror placement logic. Constants such as minimum and maximum SS orders per side were moved here as well.

The main `mm_liquidity_provider.js` now loads both modules through `utils.softRequire()`. These modules are optional: if either is missing, the bot still works correctly. Depth liquidity continues to operate. If `mm_liquidity_safe` is absent, Safe Liquidity limits are simply inactive. If `mm_liquidity_ss` is absent, Spread Support is inactive. No crashes, no broken flow, no separate code branches needed.

The provider also delegates SS-specific closing rules to the SS module when present, replaces the inline SS placement loop with `ss.updateSsLiquidity()`, and refreshes the order book after SS placement so depth orders can use a current mid, improving placement consistency.

### Phase 3: Replacing refill loops with a bounded mirror strategy

This is the core behavioral change. The old repeatable refill pattern could keep recreating exposure in undesirable ways under certain fill scenarios.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/003-1-747lh26q3v79vk3xcekrvq-png.webp)

#### The core mirror rule

When a regular SS order is filled, the bot places a **mirror order** on the opposite side at the reflected price and with the same size. It does **not** place a replacement on the same side.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/004-1-fwgdzzeu-axrb9noqz-o2q-png.webp)

Instead of endlessly refilling where liquidity was just consumed, the system acknowledges the fill and responds with a bounded counterpart across the spread. This keeps the market tighter without creating an unlimited feedback loop of same-side replenishment.

#### Mirror order properties

Mirror orders are explicitly marked with `subType: 'mirrored'`, `subTypeString: ' (ss mirrored)'`, and `priceCorrected: true`. The `priceCorrected` field allows existing `closeLiquidityOrders` logic to skip valid mirrored orders even when they sit outside the normal SS spread window, so mirrors survive where they should without needing a separate cancellation pathway.

#### Cascade prevention

A major danger in mirrored logic is recursive behavior: a mirror gets filled, then mirrored again, and so on. This is explicitly blocked. Filled mirror orders are not mirrored further. The module checks `subType`, and once a mirror is created, the original order is marked as mirror-source, preventing cascade chains and keeping the mechanism bounded.

#### Risk controls

**Mirror distance cap.** If the mathematically "true" mirror price would land too far from mid, the bot falls back to a bounded price near the SS spread edge instead of blindly placing it there. This prevents mirrors from becoming detached from meaningful liquidity behavior.

**VWAP relevance guard.** SS now maintains its own fill statistics through a dedicated `fillsEngine` epoch keyed with `subPurpose: 'ss'`, tracking SS `buyVWAP` and `sellVWAP` separately from depth liquidity. If SS VWAP drifts more than 2% from current mid, it is treated as stale and ignored for placement constraints. This matters after strong directional reversals, where an old VWAP anchor could otherwise keep SS logic trapped on one side of the market.

**Wide-spread relaxation.** In volatile markets, the external spread may temporarily grow much wider than the intended SS zone. When that happens by a defined multiplier, mirror occupancy checks are relaxed so Spread Support can continue operating instead of freezing due to strict placement assumptions that no longer fit the market.

**Bounded new regular SS placement.** Regular SS placement now respects SS VWAP when relevant. New regular buys are placed below SS `buyVWAP`, and new regular sells above SS `sellVWAP`, reducing the chance of repeatedly adding fresh exposure at increasingly unfavorable levels.

### Observability and operator control improvements

The `/stats` command now validates pairs through `parseCommandParams`, accepts any pair or perpetual ticker (not just the default), formats 24h spread values in bold, uses stable precision for `volumeInCoin2`, shows trading volume and executed-order statistics only for the default pair, includes ladder (`ld`) orders in executed-order stats, and adds a Notes section.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/005-1-h4suuocfjjiiwmrko04igq-png.webp)

A new rich liquidity statistics view is available through `/orders liq full`. It includes a Depth liquidity block with status, spread parameters, order counts, open amounts, Safe Liquidity limits, and fill history; a Spread Support block with SS spread range, order-size limits, regular and mirrored order counts, SS fill stats, VWAP, and MTM PnL; a Combined total block aggregating depth and SS fill data; the current liquidity epoch start time; exchange minimum order information; and current order book information via reusable depth helpers. Fill statistics tables use a compact four-column layout: label, Buy, Sell, and Delta.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/006-1-bnw14f3hsjeoscgu6x3y0g-png.webp)

The regular `/orders liq` list now shows percentage filled for partially filled orders and includes `subPurpose` and `subType` labels such as `ss, mirrored`. The `/orderbook` command includes a new **Purpose** column showing which bot modules correspond to each price level, derived from live `ordersDb` records.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/007-1-m8b7g-dtzbkcqrovk8i-0w-png.webp)

The `/enable liq` command now includes a confirmation step before changing liquidity parameters and validates build capabilities: depth range notation is rejected if `mm_liquidity_safe` is absent, and SS parameters are rejected if `mm_liquidity_ss` is absent, with a clear message. A new `/enable liq reset` subcommand resets `mm_liquidityInitTs` and clears `liqLimits`, restarting the VWAP epoch after confirmation.

Manual `/buy` and `/sell` commands received a safety improvement: if a requested order price deviates from market by more than 1000%, the bot stops and asks for confirmation with `/y`, protecting against accidental extreme-price orders. The `/account` command now handles empty fee lists from exchange APIs more gracefully.

### No breaking changes

Both `mm_liquidity_safe` and `mm_liquidity_ss` are optional. If either is absent, `mm_liquidity_provider` continues to operate correctly with depth liquidity active. The only format-level evolution is that `fillsEngine` stats keys may now include an optional `:<subPurpose>` segment; existing records without that segment remain valid and unaffected.

### Summary

This upgrade does three things. It makes Spread Support visible through a simulation tool that turns hidden liquidity behavior into something inspectable and replayable. It makes Spread Support modular by untangling Safe Liquidity and SS from a single provider path. And most importantly, it makes Spread Support safer by replacing a repeatable refill model with a bounded mirror strategy designed to keep the spread tight without enabling runaway loss loops.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/008-1-mnimve9mbrwsscd6m9gllq-png.webp)

For market-making systems, that is the right direction: not more activity for its own sake, but smarter behavior under real market pressure. Spread Support is now more understandable, more maintainable, and much harder to exploit.

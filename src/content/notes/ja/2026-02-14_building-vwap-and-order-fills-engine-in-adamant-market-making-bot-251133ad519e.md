---
title: "ADAMANT マーケットメイキングBotにおけるVWAPと注文約定エンジンの構築"
slug: "building-vwap-and-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
description: "ADAMANTマーケットメイキングBotでは動的オーダーブック管理などがサポートされているが、正確な約定分析がなければ全体像の半分しか見えない。"
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
locale: "ja"
placeholder: false
---

ADAMANT Market-making botでは、動的オーダーブック管理、スプレッド制御、流動性供給、および取引量戦略がすでにサポートされています。しかし、正確な約定分析がなければ、全体像の半分しか見えません。[Issue #87](https://github.com/Adamant-im/adamant-tradebot/issues/87) は、主要なアーキテクチャのアップグレードを導入します。これは、プロフェッショナルグレードの執行分析を提供する、専用のVWAPエンジンおよびOrder Fillsエンジン（プレミアムモジュール）です。

### VWAPが重要な理由

ほとんどの取引所APIは断片的な情報を提供します。注文が部分的に約定される可能性があり、ステータス更新が遅れることがあり、一部の取引所は不完全な執行データを返すことがあり、再起動により内部の執行コンテキストが失われることもあります。ボットが正しく約定データを永続化および検証しなければ、損益（PnL）は不正確になり、ポジション追跡が信頼できなくなり、リスク管理ロジックが破綻し、スプレッドおよび流動性の調整が現実ではなく仮定に基づくものになります。

機関レベルで運用するため、本エンジンは永続的な執行追跡、検証済み約定の照合、適切なVWAP計算、および在庫状況を考慮した分析を採用しています。

### 解決策：専用のVWAPおよび約定エンジン

Issue #87は、3つの主要コンポーネントからなる専用サブシステムを導入します。

**生約定イベントのストレージ（追記専用）**
専用の `fillsDb` は、生の執行イベントを追記専用モードで保存し、集計を即座に行うことなく再起動後も永続化します。これにより、執行データが失われたり上書きされたりするのを防ぎます。

**取引所検証レイヤー**
各約定イベントは、取引所APIに対して検証され、完全または部分的に執行されたことを確認され、確認後にのみ処理済みとしてマークされます。これにより、ボットが接続できない場合、取引所ノードが利用不可の場合、またはAPI応答が不完全な場合に誤った約定検出を防ぎます。執行の検証は、ネットワーク接続が存在し、取引所のエンドポイントに到達可能な場合にのみ行われます。そうでなければ、有効な取引が誤って失敗とマークされるリスクがあります。

コアの検証関数は、「可能な限り常に検証する」というポリシーを実装しています：

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

**集計された執行統計**
2つ目の永続ストアである `filledStatsDb` は、購入および売却されたベース資産の合計、使われたおよび受け取ったクオート資産の合計、および完全約定、部分約定、拒否、欠落した約定のカウンタを集計します。これに基づき、主要なメトリクスが計算されます。

### 主要なメトリクス

ベース統計オブジェクトの構造：

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

**VWAP（出来高加重平均価格）** は、Buy VWAPおよびSell VWAPとしてサイドごとに計算され、式は `VWAP = 総クオート出来高 / 総ベース出来高` です。これは注文価格だけでなく、実際の執行品質を反映します。

**VWAPスプレッド** は、Buy VWAPとSell VWAPの差であり、理論上のスプレッドではなく、実際に実現された取引スプレッドを示します。

**在庫変動（Inventory delta）** は、購入されたベース資産合計と売却されたベース資産合計の差であり、リスク管理、ポジションエクスポージャーの追跡、およびリバランスロジックに使用されます。

**実現損益（Realized PnL）** は、執行された取引に基づくキャッシュフロー結果であり、現在の市場価格を使用したマーク・トゥ・マーケットPnLをオプションで追加できます。

### アーキテクチャへの影響

新しいエンジンは、既存のアーキテクチャにクリーンに統合される完全なモジュールコンポーネントであり、現在の注文配置ロジックを中断することなく動作します。これは既存システムに代わるものではなく、安定性を維持しつつ、より深い分析レイヤーを追加します。

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

このアーキテクチャは将来の拡張の基盤を築き、ボットを単なる注文配置ツールから真の執行分析システムへと変貌させます。流動性バケット管理や動的スプレッド維持などの高度な戦略は、正確な執行データに大きく依存しており、正しく機能するためにはそれが不可欠です。プレミアム取引モジュールにとって、執行分析はプロフェッショナルグレード運用のための必須要件です。

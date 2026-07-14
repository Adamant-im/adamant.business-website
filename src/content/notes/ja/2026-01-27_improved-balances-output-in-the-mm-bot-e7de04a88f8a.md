---
title: "ADAMANT TradeBot で改善された /balances 出力"
slug: "improved-balances-output-in-the-mm-bot-e7de04a88f8a"
description: "ADAMANT TradeBot の /balances コマンド出力が改善され、市場価格に対する取引価格の強度や取引量の視覚的表現が追加されました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improved-balances-output-in-the-mm-bot-e7de04a88f8a"
publishedAt: "2026-01-27T20:06:24.444Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/e7de04a88f8a/001-1-dqzndrygjqx5bkqeefcika-png.webp"
cardSpan: "full"
originalId: "medium:e7de04a88f8a"
locale: "ja"
placeholder: false
---

オープンソースのマーケットメイキングツールは、その使いやすさに応じて真価を発揮します。最近の ADAMANT TradeBot（暗号資産プロジェクトや取引所向けのセルフホスティング型マーケットメイキングボット）の改善では、特に `/balances` のような基本的なコマンドのインターフェースをより情報豊かにすることに焦点が当てられています。

この改善要望は、元々 ADAMANT の GitHub リポジトリで issue #89 として追跡されていました。不明なトークンが存在しない場合の不要な注意書きの削除、関連コマンドの表示バグの修正、および取引メッセージにおける価格強度のインジケーター追加が目的です。たとえば、ボットは現在、売買が市場に対して良い価格または悪い価格で実行されたかどうかを表示できるようになりました。

![Improved /balances output in the MM bot](/images/engineering-notes/medium/e7de04a88f8a/002-1-2xdmbg-cdiktreq64dog2w-png.webp)

取引量を表現するために、ボットは 🦐、🍤、🐟、🐬、🦈、🐳 などの海の生き物の絵文字を使用しています。これらの取引量と絵文字の対応は、ボットの設定ファイル内で USD での閾値を使って定義されています。

```json
  /** Volume thresholds in USD for different emoji levels */
  "volumes_thresholds_usd": {
    "🦐": 10,
    "🍤": 50,
    "🐟": 100,
    "🐬": 300,
    "🦈": 1000,
    "🐳": 5000,
    "🐳🐳": 10000,
    "🐳🐳🐳": 50000
  },
```

さらに、ボットは価格の強さを市場と比較して示すために、色付きの丸と矢印を使用します。緑色の丸は良い価格（例：安値での買い、高値での売り）を、赤色の丸は悪い価格（例：高値での買い、安値での売り）を示します。矢印はさらに詳細な情報を提供し、資産が非常に高い価格で売却されたか、非常に低い価格で購入されたかを示します。

このような使いやすさの向上は、ボットのオペレーターの認知負荷を軽減し、ツールをより使いやすくします。これらの変更は現在、ボットの Premium バージョンに実装されていますが、まもなく基本的なオープンソース版でも利用可能になる予定です。

---
title: "ADAMANT Market Making Bot v2.7.0 による流動性とスプレッドの維持"
slug: "liquidity-and-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
description: "投資家は暗号資産プロジェクトを評価する際、取引所における流動性とスプレッドを重視します。流動性は売買可能なトークン量を示し、スプレッドは買値と売値の価格差を示します。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/liquidity-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
publishedAt: "2020-11-22T19:34:30.866Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e248058d3770/001-1-3lizhhkkfifjduf5z4zxtq-png.webp"
cardSpan: "full"
originalId: "medium:e248058d3770"
locale: "ja"
placeholder: false
---

投資家が暗号資産プロジェクトを評価する際、取引所における流動性とスプレッドを確認します。流動性はユーザーがどれだけのトークンを売買できるかを示し、スプレッドは購入価格と売却価格の差を反映します。ADAMANT marketmaking.app を利用すれば、規模の小さいプロジェクトでもリアルタイムの流動性と競争力のあるスプレッドを維持できるようになります。

バージョン 2.7.0 では、流動性とスプレッドの維持がコア機能として追加されました。ユーザーは `/enable liq` コマンドを使用してこれらのパラメータを設定でき、対応する取引所でボットが維持すべき流動性およびスプレッドの目標値を指定できます。

このリリースには価格監視機能も追加されています。`/make price` および `/enable pw` コマンドを使用することで、運営者は目標価格を設定・監視でき、市場におけるトークン価値をより細かく管理できるようになります。

いくつかの運用面の改善も含まれています。`/balances` コマンドはより詳細な情報を提供するようになり、ログも観測性の向上に合わせて更新されています。また、ボットはリクエストタイムアウトをより適切に処理できるようになり、トレンド分析によるマーケットメイキング機能が追加され、より適切な取引判断が可能になりました。

ADAMANT tradebot はオープンソースプロジェクトです。リリースノートとダウンロードは GitHub で利用可能です。

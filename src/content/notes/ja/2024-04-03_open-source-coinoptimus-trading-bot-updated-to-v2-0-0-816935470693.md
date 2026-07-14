---
title: "CoinOptimus トレーディングボットが v2.0.0 に更新"
slug: "open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
description: "非専門のトレーダー向けに設計された自己ホスト型暗号資産トレーディングボット ADAMANT CoinOptimus がバージョン 2.0.0 にアップデートされました。リファクタリング、バグ修正、新コマンド5つ追加。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
publishedAt: "2024-04-03T11:29:39.685Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/816935470693/001-1-yi0sr85whds3uma4ith6na-png.webp"
cardSpan: "full"
originalId: "medium:816935470693"
locale: "ja"
placeholder: false
---

ADAMANT CoinOptimus は、非専門のトレーダー向けに設計された自己ホスト型の暗号資産トレーディングボットであり、このたびバージョン 2.0.0 に更新されました。本リリースではリファクタリング、バグ修正に加え、`/fill`、`/stats`、`/deposit`、`/account`、`/info` の5つの新しいコマンドが追加されています。

### 新しいコマンド

`/fill` コマンドは、一連の注文を一括で注文帳に登録します。

![オープンソースの CoinOptimus トレーディングボットが v2.0.0 に更新](/images/engineering-notes/medium/816935470693/002-0-p-pmlz9g0oqkhlzh.webp)

`/stats` コマンドは、価格、安値、高値、取引高、注文帳の最高買気配値、最低売気配値、スプレッド、注文帳の流動性など、取引ペアの統計情報を表示します。

![オープンソースの CoinOptimus トレーディングボットが v2.0.0 に更新](/images/engineering-notes/medium/816935470693/003-1-ghu8f-ht7mxhagdmaqo1ag-png.webp)

`/deposit` コマンドは、異なるチェーン間で取引所アカウントを入金するためのアドレスを返します。

![オープンソースの CoinOptimus トレーディングボットが v2.0.0 に更新](/images/engineering-notes/medium/816935470693/004-0-j-uwsyddj1i6k3d7.webp)

`/account` コマンドは、利用可能な場合に、ボットのアカウントにおける取引手数料および月間取引高を表示します。

![オープンソースの CoinOptimus トレーディングボットが v2.0.0 に更新](/images/engineering-notes/medium/816935470693/005-0-vfvn8x-wf1ohwg8a.webp)

`/info` コマンドは、特定のコインおよびチェーンに関するすべての利用可能な情報を表示します。

![オープンソースの CoinOptimus トレーディングボットが v2.0.0 に更新](/images/engineering-notes/medium/816935470693/006-0-n5uqmmhtmdcwjbe3.webp)

### CoinOptimus の動作方法

CoinOptimus は、サーバーまたは VPS 上で継続的に実行される Node.js アプリケーションです。ユーザーは取引所、取引ペア、および取引所アカウントの API キーでこれを設定します。ボットは、ADAMANT Messenger 経由で送信するコマンドに応じて、取引戦略を管理し注文を実行します。

ボットは主に「最適ラダー／グリッド取引戦略」を使用しており、スプレッドから始まる価格で複数の買い注文と売り注文を配置します。スプレッドに最も近い注文が約定すると、ボットは反対側に同様の注文を追加し、売り注文は買い注文より高く、買い注文は売り注文より安くするという原則に従います。このアプローチは、特にボラティリティの高い市場で効果的です。

![オープンソースの CoinOptimus トレーディングボットが v2.0.0 に更新](/images/engineering-notes/medium/816935470693/007-0-twtuzn4rmej2q4s8.webp)

![オープンソースの CoinOptimus トレーディングボットが v2.0.0 に更新](/images/engineering-notes/medium/816935470693/008-0-ruyx47yeeapvvo4r.webp)

セットアップ手順は [リポジトリの README](https://github.com/Adamant-im/adamant-coinoptimus#usage-and-installation) で確認できます。CoinOptimus は利益を保証するものではありません。ご利用は自己責任でお願いします。

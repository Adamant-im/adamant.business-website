---
title: "マーケットメイキングBot v7.0.0：リクエストキャッシュ、新コマンド、データベース設定"
slug: "new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
description: "ADAMANTのマーケットメイキングBotは、暗号資産プロジェクトや取引所向けの無料・オープンソース・セルフホスティングツールです。取引量を創出し、スプレッドと流動性を維持します。"
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
locale: "ja"
placeholder: false
---

ADAMANTのマーケットメイキングBotは、暗号資産プロジェクトや取引所向けの無料・オープンソース・セルフホスティングツールです。取引量を創出し、スプレッドと流動性を維持し、価格レンジを設定し、リアルな動的オーダーブックを構築します。バージョン7.0.0では、リクエストキャッシュ、複数の新コマンド、データベース設定、およびバグ修正とリファクタリングが行われました。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/002-0-vbzoksgzwcabzz-z.webp)

### リクエストキャッシュ

取引所のAPIはリクエストレートを制限しており、活発なマーケットメイキング中に`429 Rate limit exceeded`エラーが発生する可能性があります。これにより取引が中断され、場合によっては取引所からアカウントがブロックされるおそれがあります。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/003-0-sgbs6ithtx73pqm2.webp)

新しいキャッシュ機能は、残高、オーダーブック、未約定注文のクエリ結果を約1〜2秒の短い間隔で統合することで、この問題を解決します。以前は有料モジュールでしたが、現在はすべてのユーザーが利用可能になりました。

### 新しいコマンド

`/help`コマンドは、Botソフトウェアとその構成に関する基本情報を報告するようになりました。また、取引所の状態を確認したり個別注文を管理したりするための追加コマンドがいくつか追加されました。

`/orderbook [pair] [count]`は、現在のビッドとアスクをオーダーブックから返します。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/005-0-cu4bhsoehypr6ini.webp)

`/trades [pair] [count]`は、最新の取引を返します。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/006-0-syt1bu8k15rurvv0.webp)

`/ticker [pair]`はJSON形式でティッカー情報を提供し、`/rates`と類似しています。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/007-0-uvfrkvq-y40vijsu.webp)

`/order {orderId}`は、IDで特定の注文の詳細を取得します。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/008-0-m50bnrxoc27z38oc.webp)

`/cancel {orderId}`は、IDで特定の注文をキャンセルし、その詳細を返します。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/009-0-um38pjzfvcanrry7.webp)

### データベース設定

現在、データベース名を含むデータベースパラメータを設定ファイルで指定できます。これにより、単一のサーバー上で複数のBotインスタンスを実行することが可能になります。取引処理はCPUとRAMを大きく消費するため、複数のインスタンスを同時に実行する前にリソース負荷を確認してください。

データベースを設定するには、`config.jsonc`を編集し、`db`パラメータを調整します。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/010-0-yfdntcpmwdyzvj8c.webp)

この変更は下位互換性があります。設定が更新されていない場合、Botはデフォルトのデータベースパラメータを使用します。

### コネクタの修正およびその他の改善点

AzbitおよびP2Bコネクタの`getOrderDetails()`に修正が加えられ、両取引所APIの不完全さに対する回避策も含まれています。Command、Order book、Traderモジュールがリファクタリングされ、コード品質向上の一環としてTypeScriptの型が追加されました。依存関係が更新され、ログ出力が改善され、いくつかの軽微なバグが修正されました。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/011-0-la8ixtoq1x1d6nbm.webp)

Botは引き続き有益な通知を提供し、運用担当者が取引活動を監視できるようになっています。

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/012-0-bb8s0ouz9vefnxus.webp)

リリースおよび完全な変更履歴はGitHubで確認できます：[v7.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0)。

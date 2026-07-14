---
title: "ADAMANT TradeBot v6.0.0によるDIYマーケットメイキング"
slug: "diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
description: "ADAMANT取引およびマーケットメイキングBotは、トークン発行者や仮想通貨取引所向けのオープンソースツールです。自動マーケットメイキングを実現し、取引量の創出やスプレッド・流動性の維持、動的オーダーブックの構築、トークン価格の監視を行います。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
publishedAt: "2024-03-20T08:47:50.471Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/428525859b30/001-0-nwojohhggiizs7us.webp"
cardSpan: "full"
originalId: "medium:428525859b30"
locale: "ja"
placeholder: false
---

ADAMANT Trading & Market Making Botは、自律的なマーケットメイキングを必要とするトークン発行者や暗号資産交換業者向けのオープンソースツールです。このBotは注文の発注と執行を通じて取引高を創出し、スプレッドと流動性を維持し、動的なオーダーブックを構築し、トークン価格を監視します。バージョン6.0.0では、Botを運用またはカスタマイズするユーザーにとって注目すべき一連の改良が導入されています。

### 設定およびコードベースの変更

オープンソースプロジェクトに取り組むユーザーがカスタマイズしやすいよう、コードベースがリファクタリングされました。すべてのサポート対象取引所に共通する統一された取引設定草案により、設定がより簡素化されています。`getSmartPrice()`や`getCleanPrice()`といった価格関数に加え、ユーティリティ関数も精度向上のため更新されています。また、価格監視機能および動的オーダーブック構築機能も強化され、より信頼性の高い市場監視が可能になっています。

### 価格監視の「prevent」アクション

従来、価格監視機能が持つアクションは「fill」のみで、他の取引所の参照価格に追随するために積極的に買いまたは売りの注文を行うものでした。しかし、このアプローチでは第三者による価格操作のリスクが生じる可能性がありました。新たに追加された「prevent」アクションは異なるアプローチを採用しています。注文を出して価格を強制するのではなく、他のBotモジュール（流動性など）が遵守すべき安全な価格帯を定義し、その範囲外での高値買いや安値売りを禁止するものです。

![DIYマーケットメイキングを更新されたv6.0.0のADAMANT TradeBotで行う](/images/engineering-notes/medium/428525859b30/002-0-p2uha5tzki-2klb.webp)

### 新規および拡張されたコマンド

`/deposit`コマンドは、利用可能なすべてのチェーンの入金アドレスを表示するようになり、入金が容易になりました。

![DIYマーケットメイキングを更新されたv6.0.0のADAMANT TradeBotで行う](/images/engineering-notes/medium/428525859b30/003-0-tj9d8w7qcgqwofa4.webp)

新しい`/info`コマンドは、特定のコインに関するすべての利用可能な情報を表示します。これにはチェーンの詳細も含まれます。

![DIYマーケットメイキングを更新されたv6.0.0のADAMANT TradeBotで行う](/images/engineering-notes/medium/428525859b30/004-0-raft4mu2likg0c8p.webp)

注文のキャンセルは、モジュールの種類（手動、オーダーブック構築、価格監視、流動性など）、買いまたは売りのサイド、価格ごとにフィルタリングできるようになりました。これにより、管理者はアクティブな注文を管理する際により細かい制御が可能になります。

![DIYマーケットメイキングを更新されたv6.0.0のADAMANT TradeBotで行う](/images/engineering-notes/medium/428525859b30/005-0-3slqf62rcikx-msf.webp)

`/amount`、`/interval`、`/stats`を使用する際、Botは生成される予定の取引量を報告するようになりました。これにより、運用者は予想される活動量を把握しやすくなります。

![DIYマーケットメイキングを更新されたv6.0.0のADAMANT TradeBotで行う](/images/engineering-notes/medium/428525859b30/006-0-9eqmd9xwf7q7i7f6.webp)

新しい`/account`コマンドは、取引所がデータを公開している場合に、Botアカウントの取引手数料および月間取引量を表示します。

![DIYマーケットメイキングを更新されたv6.0.0のADAMANT TradeBotで行う](/images/engineering-notes/medium/428525859b30/007-0-llggirhb0bb42g5m.webp)

`/stats`コマンドは拡張され、取引ペアの価格、安値・高値、取引量、オーダーブックの最高買値および最低売値とスプレッド、オーダーブックの流動性、推定マーケットメイキング取引量に加え、注文タイプ別および合計の注文統計を含むようになりました。

![DIYマーケットメイキングを更新されたv6.0.0のADAMANT TradeBotで行う](/images/engineering-notes/medium/428525859b30/008-0-hr1rvff4aeshjtpw.webp)

### 取引所サポート

BotはXeggeXを新たにサポートし、Azbit、Coinstore、FameEX、NonKYC、P2B、StakeCube向けの取引所コネクタが更新されました。その他、さまざまなバグ修正およびその他の改善も含まれています。

リリースおよび変更履歴はGitHubで確認できます：[adamant-tradebot v6.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0)

---
title: "ADAMANT Tradebot v6.0.0"
slug: "release-adamant-tradebot-v6-0-0-147389142"
description: "このリリースでは、すべての取引所に共通の単一の設定ファイルに統合するなど、ADAMANT Tradebot の主要な再構築が導入されています。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0"
publishedAt: "2024-03-20T08:46:40Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:147389142"
locale: "ja"
placeholder: false
---

このリリースでは、ADAMANT Tradebot 全体にわたる主要な再構築が導入され、すべての取引所で使用される単一の `tradeParams_Default.js` ファイルに取引所設定が統合されました。`getSmartPrice()` および `getCleanPrice()` 関数に加え、`isOrderOutOfPriceWatcherRange()` 関数も更新されています。これらの変更をサポートするために、追加のユーティリティ関数も追加されています。

価格ウォッチャーが改善され、`prevent` アクションをサポートするようになりました。取引量の推定値は、数量または間隔の更新時に表示されるようになりました。`/stats` コマンドは情報を拡張し、`/info` コマンドはコインの出金情報およびネットワークを取得できるようになりました。残高情報も拡張されています。

`/account` コマンドは、取引手数料および取引量に関する情報を提供するようになりました。ボットはすべての注文について約定情報を収集し、動的注文ブックビルダーが改善されています。マーケットメイキング注文を出した後、ボットは注文が約定したかどうかを確認します。`getMinOrderAmount()` 関数も改善されています。

XeggeX 取引所のサポートが追加されました。Azbit、Coinstore、FameEX、NonKYC、P2B、StakeCube の各取引所コネクタも更新されています。このリリースには、その他の改善点、バグ修正、および依存関係の更新も含まれています。

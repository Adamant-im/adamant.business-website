---
title: "ADAMANT Tradebot v2.10.6"
slug: "release-adamant-tradebot-v2-10-6-35700159"
description: "このリリースでは、ADAMANT Tradebot のパフォーマンスと安定性の向上に注力しました。CPU 使用率が最適化され、API 制限や遅延応答に影響する問題が解決されました。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v2.10.6"
publishedAt: "2020-12-24T13:13:19Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v2.10.6"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:35700159"
locale: "ja"
placeholder: false
---

このリリースでは、ADAMANT Tradebot のパフォーマンスと安定性の向上に注力しています。CPU 使用率が最適化され、API 制限やリクエスト応答の遅延に影響するいくつかの問題が解決されました。Bit-Z のレスポンスのページネーションも修正され、当該取引所からのデータ取得が確実に行えるようになりました。

新機能面では、`/balances`、`/orders`、`/rates`、`/stats` コマンドに追加情報が追加され、オペレーターがボットの動作をより効果的に監視できるようになりました。継続中のリファクタリングの一環として、新しい `orderUtils` モジュールが導入されました。また、手動で注文を配置するための新しい注文タイプ `man` がサポートされるようになりました。不要な通知を削減するため、通知の頻度も低下されています。依存パッケージは最新の互換性のあるバージョンに更新されています。

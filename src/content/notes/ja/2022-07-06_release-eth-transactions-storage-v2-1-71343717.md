---
title: "ADAMANT ETH Transactions Storage v2.1"
slug: "release-eth-transactions-storage-v2-1-71343717"
description: "ETHトランザクションストレージツールのメンテナンスリリース。Ethereumノードへのリクエスト数を削減し、ログ出力を改善。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.1"
publishedAt: "2022-07-06T08:00:44Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "ETH-transactions-storage"
tag: "v2.1"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:71343717"
locale: "ja"
placeholder: false
---

このメンテナンスリリースでは、ETH-transactions-storageツールがEthereumノードに対して行うリクエスト数を削減し、アプリケーション全体でのログ出力を強化しています。EthereumノードへのIPC接続およびデータベース接続の修正により、全体的な信頼性が向上しました。

新しい環境変数 `LOG_FILE` が導入され、運用者がログ出力の書き込み先を設定できるようになりました。また、2つのヘルパースクリプトが追加されました：Ethereumノード接続をテストする `ethtest.py` と、PostgreSQLデータベース接続をテストする `pgtest.py` です。これらのスクリプトにより、デプロイ時の接続問題を診断しやすくなります。

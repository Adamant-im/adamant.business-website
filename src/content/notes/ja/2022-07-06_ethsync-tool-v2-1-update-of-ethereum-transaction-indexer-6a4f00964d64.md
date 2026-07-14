---
title: "EthSync Tool v2.1：Ethereumトランザクションインデクサの更新"
slug: "ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
description: "EthSyncツールはアドレスごとのEthereumおよびERC20トランザクションをインデックス化し、Etherscanのようなブロックエクスプローラと同様のウォレット履歴を提供します。これは、バックグラウンドサービスとして実行され…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
publishedAt: "2022-07-06T15:40:23.802Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:6a4f00964d64"
locale: "ja"
placeholder: false
---

EthSyncツールはアドレスごとにEthereumおよびERC20トランザクションをインデックス化し、Etherscanのようなブロックエクスプローラと同様のウォレット履歴を提供します。このツールはバックグラウンドサービスとして実行され、HTTP、WebSocket、またはIPC APIを介してEthereumノードに接続します。Geth、Nethermind、およびその他の標準的なノードと互換性があります。すべてのトランザクションはPostgresデータベースに保存され、postgrest対応のAPIを通じてトランザクションデータが公開されます。

バージョン2.1ではいくつかの改善が行われました。スクリプトは現在、Ethereumノードに対して単一のリクエストで全トランザクションデータを取得し、各トランザクションのステータスを取得するために追加で1回のリクエストを行うだけです。これにより、ノードへの負荷が大幅に削減されます。ログ機能も拡充され、新しい`LOG_FILE`環境変数により、運用担当者はログ出力のためのオプションのファイルパスを指定できるようになりました。未設定の場合は、ツールは`StreamHandler`にフォールバックします。

このリリースでは、以前のバージョンに影響を与えていたIPCおよびデータベース接続の問題も修正されています。2つの新しいテストスクリプトが含まれています：`ethtest.py`はEthereumノードへの接続性を検証し、`pgtest.py`はPostgresデータベースの接続をチェックします。これにより、導入時のトラブルシューティングがより簡単になります。

EthSyncツールはADAMANTのオープンソースプロジェクトの一部であり、誰でも自由に利用できます。完全なドキュメント、インストール手順、および使用例はプロジェクトの[Readme](https://github.com/Adamant-im/ETH-transactions-storage#indexer-for-ethereum-to-get-transaction-list-by-eth-address)に記載されています。

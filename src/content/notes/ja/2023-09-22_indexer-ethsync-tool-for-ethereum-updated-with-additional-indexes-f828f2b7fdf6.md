---
title: "Ethereum用インデクサー（EthSyncツール）が追加インデックスで更新"
slug: "indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
description: "EthereumノードはRPC APIを提供するが、アドレスごとのトランザクション一覧取得には対応していない。ADAMANTのEthSyncツールがこれを可能に。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
publishedAt: "2023-09-22T14:36:48.398Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/f828f2b7fdf6/001-0-2atpoq1jvo6rdiry.webp"
cardSpan: "full"
originalId: "medium:f828f2b7fdf6"
locale: "ja"
placeholder: false
---

Ethereumノードは多くの操作に対してRPC APIを提供していますが、Etherscanなどのブロックエクスプローラーで一般的に期待される、アドレスごとにトランザクション一覧を簡単に取得するためのネイティブな方法が欠けています。この課題に対処するため、ADAMANTはPythonベースの専用インデクサーであるEthSyncツールを維持・運用しており、ETHおよびERC20トランザクションをアドレスごとに効率的に照会できるようにしています。

インデクサーは、HTTP、WS、またはIPC APIを介してEthereumノードに接続するバックグラウンドサービスとして動作し、GethやNethermindなどの一般的なクライアントと互換性があります。収集されたトランザクションデータは耐久性と高速アクセスのためにPostgresデータベースに保存され、PostgREST APIを通じてクライアントアプリケーションがこのデータにアクセスできます。

![Indexer (EthSync tool) for Ethereum updated with Additional Indexes](/images/engineering-notes/medium/f828f2b7fdf6/002-0-9zuzrclpitfvpafs.webp)

本バージョンの大きなアップグレードとして、追加のデータベースインデックスが導入されました。これらのインデックスにより、特定のアドレスに関連するEthereumのみ、または特定のトークンのトランザクションをフィルタリングするような複雑なクエリのパフォーマンスが大幅に向上します。たとえば、特定のアドレスの最新25件のUSDTトランザクションを取得するには、以下のAPIリクエストを使用できます：

```bash
curl -k -X GET “http://localhost:3000/ethtxs?and=(txto.eq.0xdac17f958d2ee523a2206206994597c13d831ec7,or(txfrom.eq.0xabfDF505fFd5587D9E7707dFB47F45AF1f03E275,contract_to.eq.000000000000000000000000abfDF505fFd5587D9E7707dFB47F45AF1f03E275))&order=time.desc&limit=25"
```

テストでは、これらの新しいインデックスを使用するほとんどのクエリが100ミリ秒未で実行され、インデックスなしの場合は数十秒かかっていたことから比較して、著しい改善が確認されています。

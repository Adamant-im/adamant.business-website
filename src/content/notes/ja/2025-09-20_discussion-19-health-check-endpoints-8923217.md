---
title: "ヘルスチェック：エンドポイント"
slug: "discussion-19-health-check-endpoints-8923217"
description: "ヘルスチェックのアルゴリズムと一般的な説明も参照。ノードの高さまたはサービスの更新タイムスタンプを取得。ノードバージョンの取得はオプション。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/19"
publishedAt: "2025-09-20T16:14:17Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923217"
locale: "ja"
placeholder: false
---

関連情報: [ヘルスチェック：アルゴリズムと一般的な説明](https://github.com/orgs/Adamant-im/discussions/17)

ヘルスチェックでは、現在のノードの高さ（height）またはサービスの更新タイムスタンプを取得します。ノードバージョンの取得は任意であり、追加のリクエストを必要としない場合にのみ行われます。

## ノードおよびサービスのヘルスチェックエンドポイント

| **ノードまたはサービス** | **ヘルスチェックエンドポイント** | **コメント** |
|---|---|---|
| **adm-node** (サービス/インデクサーなし) | `https://endless.adamant.im/api/node/status` | ノードバージョンを含む |
| **Currencyinfo サービス** | `https://info.adamant.im/status` | ソフトウェアバージョンを含む |
| **btc-node** | `getblockchaininfo` と `getnetworkinfo` を組み合わせた単一のRPCリクエスト | ノードバージョンを含む |
| **btc-indexer** | `https://btcnode2.adamant.im/blocks/tip/height` | インデクサーのバージョンを取得するエンドポイントは存在しない |
| **eth-node** | `eth_blockNumber` と `web3_clientVersion` を組み合わせた単一のRPCリクエスト | ノードバージョンを含む |
| **eth-indexer** | `https://ethnode3.adamant.im/max_block` | ソフトウェアバージョンを含む |
| **doge-node** | `getblockchaininfo` と `getnetworkinfo` を組み合わせた単一のRPCリクエスト | ノードバージョンを含む |
| **doge-indexer** | `https://dogenode1.adamant.im/api/status` | ノード（サービス/インデクサー自体ではなく）のバージョンを含む |
| **dash-node** (サービス/インデクサーなし) | `getStatus` RPC（バージョン取得用の `getnetworkinfo` と高さ取得用の `getblockchaininfo` を組み合わせ） | ノードバージョンを含む |
| **lsk-node** (kly-node) | `system_getNodeInfo` RPC | ノードバージョンを含む |
| **lsk-service** (kly-service) | `https://klyservice2.adamant.im/api/v3/network/status` | ノード（サービス/インデクサー自体ではなく）のバージョンを含む |
| **ipfs-node** | `https://ipfs4.adm.im/api/node/info` | ノードバージョンを含む。ヘルスチェック用の追加IPFS情報は現在開発中 |

BTCおよびDogeノードでは、ブロックチェーン情報とネットワーク情報を取得するために単一のバッチRPCリクエストを使用し、余分な通信を回避しています。BTCのリクエスト例：

```
curl --data-binary '[{"jsonrpc":"1.0","id":"curltext1","method":"getblockchaininfo","params":[]}, {"jsonrpc":"1.0","id":"curltext2","method":"getnetworkinfo","params":[]}]' -H 'content-type:text/plain;' https://dogenode1.adamant.im
```

ETHノードでは、同様に `eth_blockNumber` と `web3_clientVersion` を組み合わせたバッチリクエストを使用します：

```
curl --data '[{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}, {"method":"web3_clientVersion","params":[],"id":2,"jsonrpc":"2.0"}]' -H "Content-Type: application/json" -X POST localhost:8545
```

ETHの応答では、ブロック番号は16進数で、クライアントバージョン文字列はたとえば `Geth/v1.13.5-stable-916d6a44/linux-amd64/go1.21.4` のように返されます。クライアント名は一般的に `Geth/v1.13.5` や `Nethermind/v1.22.0` といった形式に従います。

一部のインデクサーはバージョンエンドポイントを公開しておらず、高さまたはステータスのみを提供します。また、DogeおよびLSKサービスでは、返されるバージョンはインデクサーまたはサービスソフトウェア自体ではなく、基盤となるノードのバージョンを反映していることに注意してください。

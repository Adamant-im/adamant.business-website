---
title: "ADAMANT Blockchain Node Update: Version 0.8.0"
slug: "adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
description: "ADAMANTはブロックチェーン技術に基づくオープンソースの分散型メッセージングプラットフォームで、ノードバージョン0.8.0をリリースしました。このアップデートはAPIの強化と最適化に焦点を当てています。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
publishedAt: "2023-03-20T08:43:48.499Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:35647db85081"
locale: "ja"
placeholder: false
---

ADAMANTは、ブロックチェーン技術に基づくオープンソースの分散型メッセージングプラットフォームとして、ノードバージョン0.8.0をリリースしました。このアップデートはコンセンサスの変更ではなく、APIの強化と最適化に焦点を当てており、ノードの更新は任意です。

## APIの改善点

`/api/transactions`および`/api/chats/get`エンドポイントは、クエリパラメータとして`inId`または`isIn`のいずれかを受け付けるようになりました。これらは同等です。たとえば、`/api/chats/get?InId=U6386412615727665758`と`/api/chats/get?isIn=U6386412615727665758`は同じ結果を返します。さらに、`/api/chats/get`および`/api/chatrooms`エンドポイントにおけるユーザーIDは、大文字小文字を区別しなくなりました。つまり、`/api/chatrooms/U6386412615727665758`と`/api/chatrooms/u6386412615727665758`は同一として扱われます。

トランザクションおよび`POST /api/accounts/delegates`は、トランザクションをプレーンオブジェクトとして、または`transaction`プロパティ内にネストされた形式のいずれでも受け付けるようになりました。以下の両方の形式が有効です：

```bash
curl -X POST https://endless.adamant.im/api/transactions/process -H 'Content-Type: application/json' -d '{"type": 0, "amount": 100000000, ...}'
# or {"transaction": { "type": 0, "amount": 100000000, ... }}
```

`/api/states/get`エンドポイントには、現在`confirmations`プロパティが含まれるようになり、`generatorPublicKey`のクエリパフォーマンスも最適化されました。また、`config.json`に`cors`オプションが追加され、クロスオリジンの設定が容易になりました。

## バグ修正および破壊的変更

このアップデートでは、「publicスキーマに対するアクセスが拒否されました」というエラーが一部のデプロイメントで発生する問題を解決しています。ただし、バージョン0.8.0には破壊的変更が含まれています：`/api/blocks`エンドポイントは、`count`プロパティを返さなくなりました。このフィールドに依存しているアプリケーションは、それに応じて更新する必要があります。

このリリースはコンセンサスルールを変更していないため、既存のノードは以前のバージョンのまま運用を継続でき、互換性の問題は発生しません。

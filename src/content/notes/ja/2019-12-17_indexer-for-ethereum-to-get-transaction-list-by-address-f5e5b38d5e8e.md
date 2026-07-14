---
title: "アドレスごとのトランザクションリスト取得のためのEthereumインデクサー"
slug: "indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
description: "Ethereumノードはアドレスごとのトランザクションリスト取得をネイティブにサポートしていません。eth_listTransactionsメソッドは長年要望されていますが、ロードマップにはありません。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
publishedAt: "2019-12-17T09:47:40.803Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f5e5b38d5e8e/001-1-joo929ftoejwheza0gd8ka-png.webp"
cardSpan: "full"
originalId: "medium:f5e5b38d5e8e"
locale: "ja"
placeholder: false
---

Ethereumノードは、特定のアドレスに対するトランザクションリストの取得をネイティブにサポートしていません。`eth_listTransactions`メソッドは長年要望されていますが、Ethereumのロードマップには含まれておらず、これによりメッセージアプリ、ブロックエクスプローラ、ウォレットなどのアプリケーション開発者は、独自のインデクシング層を構築せざるを得ません。

ADAMANTチームはこのギャップを埋めるため、無料でオープンソースの[Ethereumトランザクションインデクサー](https://github.com/Adamant-im/ETH-transactions-storage)を開発しました。Pythonで書かれており、Ethereumノード（gethおよびparityでテスト済み）に接続し、JSON RPC経由でトランザクションを取得してPostgresデータベースに保存するバックグラウンドサービスとして動作します。これにはスマートコントラクトのトランザクションも含まれます。その後、Postgrestを通じてRESTful APIレイヤーを提供し、Etherscanと同様にアドレスごとのクエリが可能になります。

### 動作の仕組み

インデクサーは、指定したブロック番号からトランザクションの保存を開始し、デフォルトでは20秒ごとに新しいブロックをポーリングします（間隔は設定可能）。インデックスが構築された後、Postgrestを通じてアドレスごとにトランザクションをクエリできます。たとえば、以下のリクエストはアドレス`0x6b924750e56a674a2ad01fbf09c7c9012f16f094`に関係する直近25件のトランザクションをタイムスタンプ順に返します。

```
curl -k -X GET "http://localhost:3000/?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25"
```

APIの完全なリファレンスについては、[Postgrestドキュメント](https://postgrest.org/en/v5.2/api.html)を参照してください。

### セットアップ

インデクサーはLinux上で動作します（Ubuntu 16および18でテスト済み）。同期済みのgethまたはparityノード、およびPython、Postgresql、Postgrest、nginxが必要です。インデクサーは直接実行するか、デーモンとして実行できます。

```
python3.6 you/path/to/script/ethsync.py <yourDB>
```

インデクシングには時間がかかります。進捗を確認するには、最後にインデックスされたブロックをクエリし、ノードの最新ブロックと比較します。

```
psql -d index -c 'SELECT MAX(block) FROM ethtxs;'
```

詳細なインストールおよび設定手順は[リポジトリ](https://github.com/Adamant-im/ETH-transactions-storage)に記載されています。

### 公開API

PostgrestはAPIをローカルポートで公開します。これを外部に公開するには、nginxを設定してPostgrestにリクエストをプロキシするようにします。

```
location /ethtxs {
    proxy_pass http://127.0.0.1:3000;
}

location /aval {
    proxy_pass http://127.0.0.1:3000;
}
```

これにより、`/ethtxs`（アドレスごとのEthereumトランザクション取得用）と`/aval`（サービスステータス用）の2つのエンドポイントが提供されます。

### 実行例

ADAMANTノードで動作中のインスタンスが利用可能です。以下のURLをブラウザで開くと、サンプルアドレスの最近のトランザクションが返されます。

```
https://ethnode1.adamant.im/ethtxs?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25
```

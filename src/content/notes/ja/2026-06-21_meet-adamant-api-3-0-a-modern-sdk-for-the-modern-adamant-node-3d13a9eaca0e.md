---
title: "adamant-api 3.0 へようこそ — 現代の ADAMANT ノード向けのモダンな SDK"
slug: "meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
description: "adamant api JavaScript/TypeScript SDK はバージョン 3.0.0 をリリースしました。ADAMANT Node v0.10.0 とシームレスに連携します。ミリ秒単位のタイムスタンプ、豊富なクエリパラメータなどが追加されました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
publishedAt: "2026-06-21T15:54:25.436Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3d13a9eaca0e/001-0-hkmpiqt1p-ubpghb.webp"
cardSpan: "full"
originalId: "medium:3d13a9eaca0e"
locale: "ja"
placeholder: false
---

`adamant-api` JavaScript/TypeScript SDK は、ADAMANT Node v0.10.0 とシームレスに連携するように設計されたバージョン 3.0.0 をリリースしました。このリリースでは、ミリ秒単位のタイムスタンプ、豊富なクエリパラメータ、統合されたノードステータス応答、包括的な最小バージョンフィルタリングが導入されています。SDK は自動的なヘルスチェック、リトライ、フェイルオーバー、型付き応答、暗号化されたメッセージング、リアルタイムの WebSocket サブスクリプションを提供します。

ADAMANT は、電話番号や中央サーバーを必要としない、ブロックチェーンベースのエンドツーエンド暗号化メッセンジャーであり、内蔵の暗号資産ウォレットを備えています。`adamant-api` SDK はネットワークをシンプルな関数呼び出しに抽象化することで、開発者がユーザーが自身のアイデンティティと資金を所有する分散型ボット、ティップジャーやウォレットを構築できるようにします。

### 3.0 の新機能

SDK の API データ転送オブジェクト（DTO）は、固定された `adamant-schema` のリビジョンから再生成されており、ミリ秒単位のタイムスタンプ、ローダー／ステータスデータ、未確認トランザクションの null 許容フィールドに対して正しい型が保証されています。クエリ機能には、`returnUnconfirmed`、`includeDirectTransfers`、アドレスによるデリゲート検索、複数タイプのトランザクションクエリが含まれるようになりました。トランザクションフィルタはデフォルトで論理的な `and` で結合され、金額フィルタは送金トランザクションにのみ適用されます。オプションの `timestampMs` 構築と `getEpochTimeMs()` が利用可能ですが、`timestampMs` は署名済みバイトの一部ではないため、ハッシュ、ID、署名は変更されません。

信頼性の向上として、明示的に拒否された POST リクエストに対してはリトライループを停止し、代わりに構造化されたリトライ不可のエラーを返すようになりました。リトライおよびアクティブノードのフェイルオーバーは、安全なリクエストやネットワーク障害に対して維持されています。高さ（height）を考慮したノード選択と包括的な `minVersion` フィルタリングにより、健全で最新のノードとの通信が保証されます。

リアルな WebSocket クライアントを使用すると、単一の接続で複数のアドレス、トランザクションタイプ、チャットアセットタイプをサブスクライブできます。型付き接続エラー、再接続コールバック、明示的な `connect()`／`disconnect()`、リスナのクリーンアップ、制限付き再接続が特徴です。

パッケージは設計上、モジュール化されています。ルートパッケージは引き続き ADM に焦点を当てており、サブパスエクスポートにより、CommonJS および ESM 向けに API DTO、トランザクション、メタデータ、BTC/ETH/DASH/DOGE ヘルパーへのアクセスが提供されます。コインのメタデータは `adamant-wallets` から決定論的かつ固定されています。ドキュメントは、ソース管理された VitePress + TypeDoc サイトに移動しました。

![adamant-api 3.0 へようこそ — 現代の ADAMANT ノード向けのモダンな SDK](/images/engineering-notes/medium/3d13a9eaca0e/002-0-bato9yeonu3b9-oz.webp)

### クイックスタート

パッケージをインストールし、ノードのリストでクライアントを初期化します。ヘルスチェック、リトライ、フェイルオーバーは自動的に処理されます。

```javascript
import {AdamantApi} from 'adamant-api';

const api = new AdamantApi({
  nodes: [
    'https://endless.adamant.im',
    'https://clown.adamant.im',
    'https://lake.adamant.im',
  ],
  checkHealthAtStartup: true,
  minVersion: '0.10.0', // inclusive — older nodes are excluded automatically
});

api.onReady(async () => {
  const response = await api.getBlocks();
  if (response.success) {
    console.log(response.blocks);
  } else {
    console.error(response.errorMessage);
  }
});
```

### 使用例

リアルタイムでアカウントを監視し、暗号化されたメッセージに応答する分散型チャットボットを構築できます。エンドツーエンド暗号化は内蔵されており、ボットは自身のパスフレーズでメッセージを復号し、サーバーは平文を保存しません。

```javascript
import {AdamantApi, WebSocketClient, decodeMessage} from 'adamant-api';
import {config} from './config.js';

const api = new AdamantApi({nodes: config.nodes});

const ws = new WebSocketClient({
  admAddress: config.address,
  direction: 'incoming', // only messages sent *to* the bot
});
api.initSocket(ws);

ws.onMessage(async (tx) => {
  const text = decodeMessage(
    tx.asset.chat.message,
    tx.senderPublicKey,
    config.passphrase,
    tx.asset.chat.own_message,
  );

  if (text.trim() === '/ping') {
    await api.sendMessage(config.passphrase, tx.senderId, 'pong 🏓');
  }
});
```

暗号資産のティップジャーやペイメントボットの場合は、着信するトークントランスファーに反応し、トークンを返信できます。単一の WebSocket 接続で複数のアドレスを監視し、タイプでフィルタリングすることも可能で、取引所の取り込みや会計ダッシュボードに便利です。

軽量なマルチコインウォレットが必要な場合は、ADM 専用のボットに複数の暗号スタックをバンドルすることなく、同じ ADAMANT パスフレーズから BTC、ETH、DASH、DOGE のアドレスを派生できます。必要なものだけをサブパスエクスポートでインポートすることで、サーバーレスバンドルを小さく保てます。

```javascript
import {eth} from 'adamant-api/coins/eth';
import {btc} from 'adamant-api/coins/btc';

const {address: ethAddress} = eth.keys(process.env.PASSPHRASE);
const {address: btcAddress} = btc.keys(process.env.PASSPHRASE);

console.log({ethAddress, btcAddress});
```

### 2.x からの移行

移行するには、実行環境および CI で Node をバージョン 22 以上に更新してください。WebSocket の方向を確認し、アプリが着信のみを想定している場合は `direction: 'incoming'` を追加してください。コインのインポートを `adamant-api/coins/*` に更新し、Lisk/Klayr のコードパスを削除し、新しい論理 `and` デフォルトに対応してクエリフィルタを再確認し、`withoutDirectTransfers` を `includeDirectTransfers` に置き換えてください。署名、トランザクションID、CommonJS/ESMインポートは変更されません。

---
title: "adamant-api v3.2.0: ADAMANT Node v0.11.0対応、耐障害性の高いフェイルオーバーと安全なクエリ機能を実現"
slug: "adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
description: "cryptofoundryが、ADAMANTブロックチェーン向けの公式TypeScript/Node.js SDKであるadamant-api v3.2.0をリリースしました。ADAMANT Node v0.11.0に対応し、分散型アプリ開発を強化します。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
publishedAt: "2026-11-26T07:08:23.535Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:e657e4cd56ab"
locale: "ja"
placeholder: false
---

cryptofoundryは、ADAMANTブロックチェーン向けの公式TypeScript/Node.js SDKであるadamant-api v3.2.0をリリースしました。本バージョンはADAMANT Node v0.11.0に合わせて調整されています。

分散型アプリケーション、取引ボット、エクスプローラー、または決済統合機能をブロックチェーンのHTTPエンドポイントに対して直接構築する場合、同期済みノードの選択、トランザクションを重複させない一時的な障害の再試行、NaClを用いたメッセージ暗号化、決定論的トランザクションの署名、そしてノードのアップグレードに合わせたTypeScript DTOの維持といった、信頼性と暗号化に関わる煩雑な処理を繰り返し実装する必要があります。本SDKは、これらを標準で解決します。ゼロボイラープレートの耐障害性（独立運用されているHTTPSノードのリストを渡すだけで、SDKが健全性を監視し、同期高さを確認し、期限切れや読み込み中のノードをスキップして自動的にフェイルオーバー）、モジュール式のサブパスインポート、ADAMANT Node OpenAPI 3.2仕様から生成されたDTOによるエンドツーエンドのTypeScript安全性、そして再接続後の自動復旧機能を備えたライブSocket.IOサブスクリプションを提供します。

### ローカル受信者およびデリゲートの公開鍵検証

v3.2.0では、メッセージの暗号化やデリゲートへの投票を行う前に、ノードから返されたすべてのEd25519公開鍵が、標準的かつ曲線上にあり、小さなオーダーではない32バイトの鍵であることをローカルで検証し、要求されたADMアドレスを暗号学的に導出します。不正な形式、曲線外の鍵、小さなオーダー（オーダー1、2、4、8）の鍵、または不一致の鍵は、キャッシュや暗号化の前にクリーンに拒否されます。また、デリゲートキャッシュは`AdamantApi`インスタンスごとに分離されます。

### KVSおよびチャットクエリに関する重大な正確性とセキュリティの修正

v3.0.0およびv3.1.0では、`getKVS()`、`getChatTransactions()`、`getChats()`、および`getChatMessages()`が`and:`プレフィックス付きのフィルターを送信していましたが、v0.11.0以前のノードはこれを無視し、フィルターが適用されていないレコードを`success: true`として返していました。v3.2.0では、これらのメソッドは常にプレーンなフィルター名を送信し（明示的な`and: { ... }`ラッパーをフラット化）、サポートされていない`and:`ラッパーやプレフィックス付きのキーをクライアント側で拒否します。KVSまたはチャットデータを読み取るすべての3.xアプリケーションは、v3.2.0へアップグレードする必要があります。

### Node v0.11.0向けの耐障害性の高いHTTP 429処理

ADAMANT Node v0.11.0では、本番環境向けのHTTPおよびWebSocketの乱用防止制限がデフォルトで有効になっています。ノードがHTTP 429を返すと、冪等な読み取り（GETおよびPOST `/api/states/get`）は、キャッシュされた別の同期済みノードへ即座に切り替わります。同時に、制限を受けたノードは一定期間（最大60秒）のクールダウンに入り、健全性チェックによってトラフィックが即座に戻ることを防ぎます。レート制限を受けたノードに対する並列リクエストは、`/api/node/status`を過剰に叩いたり、アクティブノードを頻繁に切り替えたりすることなく、単一の重複排除された健全性チェックを共有します。単一ノード構成の場合や、ノードのリセット期間がSDKの10秒間の待機時間を超える場合、`AdamantApiResult`がオプションの`status`、`retryAfterMs`、および`rateLimitScope`フィールドを公開するようになったため、ボット側で再試行を適切にスケジュールできます。なお、トランザクションを発行するPOST呼び出しは、HTTPレスポンス受信後に自動的に再試行されることはありません。

### よりスマートな起動準備状態の管理

ローカルノードと並行して起動するサービスでは、ノードがメモリテーブルの読み込み中やチェーンの同期中に`onReady`が発火してしまうケースがありました。v3.2.0では、`loader.loaded: false`または`loader.syncing: true`を報告するノードは、プライマリAPIおよびWebSocketの選択対象から除外されます。`onReady`（および`api.isReady`）は、クエリに応答可能なノードが実際に準備完了となるまで、段階的なバックオフ（5秒、10秒、30秒、60秒）で待機します。また、初期化されたクライアントは、完全に同期されたノードがすべてダウンした場合に備えて、高さ制限付きの同期フォールバックを備えています。

### POST /api/states/get と厳格なv0.11.0型適合

URLの長さ制限に達することなく多数のKVSキーや送信者アドレスをクエリするには、`getKVS()`に`{method: 'POST'}`を渡します。

```js
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

TypeScriptインターフェース（`ChatroomsOptions`、`ChatTransactionsOptions`、および`KVSOptions`）は、ADAMANT Node v0.11.0の厳格なクエリ検証を反映するようになり、サポートされていないフィールドはコンパイル時に検出されます。また、OpenAPIジェネレーターは`Adamant-im/adamant`から直接同期されるようになりました。

### サプライチェーンセキュリティと7日間の検疫

Node v0.11.0で導入されたADAMANTセキュリティポリシーに従い、adamant-apiは7日間のリリース検疫（`pnpm-workspace.yaml`内の`minimumReleaseAge: 10080`）を強制します。また、`allowBuilds`を通じて依存関係のライフサイクルスクリプトを制限し、本番環境での`pnpm audit`脆弱性をゼロに保ち、GitHub ActionsのTrusted Publishingを使用してnpmへ公開されます。

```
npm install adamant-api@3.2.0
```

---
title: "adamant-api v3.2.0: HTTP 429フェイルオーバー、公開鍵検証、および厳格なクエリフィルタ"
slug: "discussion-85-adamant-api-v3-2-0-resilient-http-429-failover-recipient-public-key-verification-strict-ch-11403173"
description: "ADAMANT Node v0.11.0でのREST/WebSocketレート制限導入、チャット/KVSエンドポイントの厳格なクエリ検証、OpenAPIソースの統合に対応したadamant-apiのアップデート。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/85"
publishedAt: "2026-11-26T06:52:55Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:11403173"
locale: "ja"
placeholder: false
---

ADAMANT Node v0.11.0では、デフォルトのREST/WebSocketアンチアビュースレート制限、チャットおよびKVSエンドポイントでのANDのみの厳格なクエリ検証、そして`Adamant-im/adamant`へのOpenAPIソース統合が導入されました。これに伴い、`adamant-api`はv0.11.0以降およびそれ以前のノード全体で、ノードのフェイルオーバー、レディネスチェック、およびクエリシリアライズを強化するようアップデートされました。

## 耐障害性に優れたHTTP 429フェイルオーバーとクールダウン

ADAMANT Node v0.11.0は、IPごとの集計（`all`）およびルートクラス（`status`、`read`、`publish`）ごとのHTTPバジェットを強制し、`429`、`Retry-After` / `RateLimit-Reset`、および`RateLimit-Scope`で応答します。

各リクエストは送信前に`targetNode = this.node`をキャプチャするため、遅延した同時実行エラーによって、別のリクエストが既にフェイルオーバーしたノードに`this.node`が戻されることはありません。同時実行される`updateNodes()`呼び出しは、早期に終了するのではなく単一の`updateNodesPromise`を共有します。また、計画的なスイープに加わる強制フェイルオーバーは、`failedNode`を伴う強制ローテーションへとアップグレードされます。

`/api/node/status`はより高い上限を持つ`status`バケット（`read`の3,000/分に対し12,000/分）に計上されるため、レート制限されたノードでもヘルスチェックには応答します。`NodeManager`はノードごとの429クールダウン（`rateLimitedUntil`、最大60秒）を追跡するようになり、強制スイープと計画的スイープの両方で、2ノードおよび3ノード以上のプール全体から、レート制限されていない同期済みノードが優先的に選択されます。

同期済みの代替ノードが利用できない場合、冪等な読み取りリクエストは`Retry-After` / `RateLimit-Reset`を尊重し、最大10秒のジッターを適用します。ノードのリセットウィンドウがその上限を超える場合、またはリトライが使い果たされた場合、SDKは`AdamantApiResult`にオプションのメタデータを付与して即座に応答を返します。

```ts
const response = await api.getBlocks();

if (!response.success) {
  if (response.status === 429 && response.retryAfterMs !== undefined) {
    console.warn(`Rate-limited (${response.rateLimitScope}), retry in ${response.retryAfterMs}ms`);
  }
}
```

冪等ではない`POST`リクエスト（トランザクション送信など）は、`429`を含むHTTP応答に対して再試行されることはありません。

## プレーンなフィルタ名、厳格なエンドポイント型、およびPOST /api/states/get

`/api/states/get`、`/api/chats/get`、および`/api/chatrooms/*`エンドポイントは、プレーンなフィルタ名を受け取るようになりました。`and: { ... }`ラッパーはフラット化され、サポートされていない`or`ラッパーはクライアント側で`success: false`として拒否されます。これにより、v0.11.0以前のノードにおけるissue #97が修正され、v0.11.0の厳格な検証と整合性が保たれます。

`ChatroomsOptions`、`ChatTransactionsOptions`、および`KVSOptions`は、ADAMANT Node v0.11.0が受け入れる正確なフィールドを反映するようになりました。これには`/api/chats/get`および`/api/states/get`での`toHeight`が含まれ、`/api/chatrooms/*`で拒否される高さ/範囲フィールドは除外されます。`/api/chatrooms/*`で非推奨となった`userId`は、実行時に削除され、専用の非推奨警告が表示されます。

大規模なKVSルックアップでは、`POST /api/states/get`を使用できるようになりました。

```ts
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

`getKVS(..., {method: 'POST'})`はSDKの冪等な読み取りリトライポリシーを使用し、完全な429および5xxフェイルオーバーを維持します。

## 利用可能なノードのレディネスとローダー状態フィルタリング

`NodeManager`は、`/api/node/status`の`loader.loaded`および`loader.syncing`フィールドを検査するようになりました。ロード中（`loaded: false`）または同期中（`syncing: true`）のノードは、アクティブなAPI選択およびWebSocket接続リストから除外されます。`loader`オブジェクトを持たないノードは引き続き対象となります。`checkHealthAtStartup: true`を設定した場合、`onReady`は初期ヘルススイープの失敗後に発火するのではなく、実際に利用可能なノードが選択されるまで待機します。

## ローカルの受信者およびデリゲートの公開鍵検証

`encodeMessage()`および`decodeMessage()`は、非正規、オフカーブ、および小位数（位数1、2、4、8）のEd25519鍵を`invalid key`として拒否するようになりました。`getPublicKey()`はネットワークリクエストを行う前にADMアドレスをローカルで検証し、ノードから返された鍵が要求されたアドレスをローカルで導出できることを確認してからキャッシュまたは返却します。`sendMessage()`は暗号化前に解決された鍵をローカルで再検証し、不一致の場合は`{success: false, errorMessage}`を返します。`voteForDelegate()`はアドレスバインディングを強制し、クライアントごとのデリゲートキャッシュを使用します。

## OpenAPIソースの統合とサプライチェーンの強化

`scripts/sync-api-types.mjs`は、`Adamant-im/adamant`からOpenAPI 3.2仕様（`openapi/specification/openapi.yaml`）を直接取得し、`RateLimitErrorResponseDto`および`GetKVSRequestBody`を生成するようになりました。`pnpm-workspace.yaml`は、7日間の依存関係リリース経過期間（`minimumReleaseAge: 10080`）を強制し、明示的な`allowBuilds`設定とプロダクション環境での監査脆弱性ゼロを維持します。

## 参照

- SDK PR (Node v0.11.0準拠および依存関係): https://github.com/Adamant-im/adamant-api-jsclient/pull/105
- 受信者およびデリゲートの公開鍵検証: https://github.com/Adamant-im/adamant-api-jsclient/pull/110
- プレーンなチャットおよびKVSフィルタの修正: https://github.com/Adamant-im/adamant-api-jsclient/pull/101
- 利用可能なノードの`onReady`修正: https://github.com/Adamant-im/adamant-api-jsclient/pull/102
- ADAMANT Node v0.11.0: https://github.com/Adamant-im/adamant/pull/303
- SDKドキュメント: https://js.docs.adamant.im
- OpenAPI Swagger UI: https://docs.adamant.im/schema/

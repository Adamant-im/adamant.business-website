---
title: "ADAMANT Node APIに対する完全な型付きリードオンリーアクセス"
slug: "discussion-67-complete-typed-read-only-access-to-adamant-node-apis-10446764"
description: "adamant-api SDKは、エクスプローラー、監視サービス、ウォレット、ボット、その他のインテグレーションで使用されるリード負荷の高いADAMANT Node API向けに、完全な型付きインターフェースを公開するようになりました。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/67"
publishedAt: "2026-07-17T10:54:30Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10446764"
locale: "ja"
placeholder: false
---

`adamant-api` SDKは、エクスプローラー、監視サービス、ウォレット、ボット、その他のインテグレーションで使用されるリード負荷の高いADAMANT Node API向けに、完全な型付きインターフェースを公開するようになりました。利用者は、ADAMANT Node v0.10.2で導入または拡張されたメインアカウント、ブロック、デリゲート、ピア、プール、ネットワークステータスの各クエリに対して、汎用的な`api.get()`呼び出しやローカルでのレスポンスキャストを行う必要がなくなりました。

## カバレッジ

SDKは`getTopAccounts()`を型付きページネーションおよびデリゲートフィルタリング付きで公開します。レスポンスにはNodeの決定論的な残高順序とページネーションメタデータが含まれ、`limit: 0`のリクエストではアカウント行を返さずにカウントのみのメタデータを取得します。

```ts
const topDelegates = await api.getTopAccounts({
  limit: 50,
  offset: 0,
  isDelegate: 1,
});

const countOnly = await api.getTopAccounts({limit: 0});
```

パブリックオプションの型は、ブロック一覧および検索、単一デリゲート検索付きデリゲート一覧、ユーザー名検索、フォーミング統計、投票者、次フォーガーの予測、接続済みピア一覧および正確なピア検索、プール内トランザクション一覧および検索、包括的なトランザクション時間範囲をカバーするようになりました。これにより、SDKは署名およびブロードキャストのヘルパーとしてだけでなく、リードオンリーサービス向けの型付きバウンダリとして利用できるようになります。

生成されたコントラクトは、`consensusCodeName`、有効な`consensusSchedule`、完全なブロック報酬`milestoneSchedule`、およびデリゲートのライフタイム`forged`値を基数10の整数文字列として公開するようになりました。ランタイムの`producedblocks`プロパティは、以前の生成時のtypoであった`producedlocks`を置き換えます。サービスは、レスポンスをローカルで再定義することなくパブリックチェーンプロジェクションを取得できます。

```ts
const [network, node] = await Promise.all([
  api.getStatus(),
  api.getNodeStatus(),
]);

console.log(network.consensusCodeName);
console.log(node.consensusSchedule, node.milestoneSchedule);
```

## エンドポイント対応クエリセマンティクス

ADAMANT Nodeのトランザクションクエリ言語はフラットであり、ネストされたブール式ツリーではありません。条件はクエリ文字列の順序で1つのSQL式にシリアライズされ、通常のSQL優先順位が適用され、`and: {}`や`or: {}`オブジェクトに対して括弧は追加されません。したがってSDKは、通常のトップレベルフィルタをデフォルトで`and`で結合し、シリアライズ時にJavaScriptオブジェクトの挿入順序を保持し、混合された`and`/`or`条件によってワイヤ上の順序が意味的に重要になる場合に警告を発します。`includeDirectTransfers`、`returnAsset`、`userId`などの制御を互換性のあるエンドポイントにスコープし、既知の非対応制御はリクエスト送信前に削除し、金額フィルタはNodeが実際に適用する`/api/transactions`でのみ許可します。これは、共有オプションをすべてのエンドポイントに転送するよりも意図的に厳格です。型付き呼び出しは、選択されたNodeルートが実際に実装している動作を表すべきです。

## スキーマの由来と互換性

`src/api/generated.ts`は`Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90`から再現的に生成されます。リポジトリは`npm run api-types:check`で生成ファイルを検証し、パッケージ利用者のテストはエクスポートされた宣言をコンパイルしてビルドされたESMおよびCommonJSのエントリーポイントを動作確認します。`producedlocks`から`producedblocks`への修正はコンパイル時の互換性変更であり、デリゲートやステータスのフィクスチャを手動で構築している利用者は、新たに必須となったフィールドを追加する必要がある場合があります。ランタイムのレスポンス処理はパススルーのままであり、古いNodeのレスポンスがSDKによって変換または拒否されることはありません。

## スナップショットリードと並行するライブステート

同じくNode v0.10.2への整合により、コンパクトな`newBlock`イベントおよび確認済みまたは未確認の`balances/change`イベントに対するオプトインのWebSocketハンドラが追加されます。再接続後にサブスクリプションは復元され、残高値はデルタではなく絶対値による置換です。これらのイベントは型付きRESTリードを補完しますが、置き換えるものではありません。リプレイや初期残高スナップショットは存在せず、残高ペイロードには変更されたフィールドのみが含まれる可能性があり、切断中に配信されたイベントはバックフィルされません。重要なクライアントは、再接続後にRESTを通じてブロックと残高を照合すべきです。

## 互換性の境界

新しいトップアカウント、ネットワークステータス、デリゲート、ブロック、および残高イベントの機能にはADAMANT Node v0.10.2が必要です。既存のトランザクション構築、バイトレイアウト、ハッシュ、ID、署名、暗号化、リトライ、フェイルオーバー、およびアクティブノード選択は変更されていません。パッケージルートはADM中心のままであり、外部コインヘルパーは引き続き明示的なサブパスエクスポートを使用します。SDKにはNode.js 22.12.0以降が必要であり、ADAMANT Node v0.10.2のオペレーターはNodeの22.13.0以降の要件に従う必要があります。

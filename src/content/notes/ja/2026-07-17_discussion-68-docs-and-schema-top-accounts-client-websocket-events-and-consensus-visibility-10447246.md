---
title: "ADAMANT Docs & Schema: Top Accounts, Client WebSocket Events, and Consensus Visibility"
slug: "discussion-68-docs-and-schema-top-accounts-client-websocket-events-and-consensus-visibility-10447246"
description: "ADAMANTのドキュメントおよびスキーマリポジトリを現在のノードAPI仕様に合わせました。すべての変更は追加のみで後方互換性を維持しており、コンセンサスフォークやワイヤフォーマットの破壊的変更はありません。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/68"
publishedAt: "2026-07-17T12:40:07Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10447246"
locale: "ja"
placeholder: false
---

ADAMANTのドキュメントおよびスキーマリポジトリを現在のノードAPI仕様に合わせました。すべての変更は追加のみで後方互換性を維持しており、コンセンサスフォークやワイヤフォーマットの破壊的変更はありません。ライブドキュメントは `https://docs.adamant.im` で、OpenAPIバンドルは `https://schema.adamant.im` で公開されています。

## Top Accounts API

`GET /api/accounts/top` がパブリックコントラクトに追加されました。ソートは決定的です：`balance DESC`、次いで `address ASC` です。このエンドポイントは `limit` および `offset` によるページネーション、オプションの `isDelegate` フィルタ、レスポンスメタデータ（`count`）、およびカウントのみのリクエストのための `limit=0` をサポートしています。レガシーな `topAccounts` 設定スイッチは削除され、エンドポイントはすべてのノードで登録されるようになりました。

## Client WebSocket: `newBlock` および `balances/change`

クライアントSocket.IOインターフェースに、オプトインのコンパクトな `newBlock` イベントと、フィールドレベルの `balances/change` ペイロードが追加されました。これには `balance`、`unconfirmedBalance`、またはその両方を含めることができます。サブスクリプションは `address`、`types`、`assetChatTypes`、`balances`、および `blocks` でインデックスされます。配信はベストエフォート型で非永続です：コンシューマは再接続、再サブスクライブを行い、REST経由で重要な状態を調整する必要があります。OpenAPIパッケージでは、これを `x-client-websocket` として文書化し、`specification/websocket/` に専用スキーマを配置しています。

## Status Schedules および Delegate `forged`

パブリックステータスAPIは、有効なコンセンサスアクティベーションスケジュールと、ブロック報酬マイルストーンスケジュールの全体を公開するようになりました。これには `consensusCodeName`、`consensusSchedule.activationHeights`、および `milestoneSchedule`（`offset`、`distance`、`milestones` で構成）が含まれます。デリゲート一覧および取得レスポンスには、生涯 `forged` が基本単位のbase-10整数文字列として含まれるようになりました。次フォージャーの予測は、ラウンド境界における次のブロック高を使用します。またスキーマでは `producedlocks` を `producedblocks` に修正し、ピア、キューイング済みおよび未確認トランザクション、デリゲート検索および `orderBy` のクエリパラメータカバレッジを完成させました。

## Blocks API の整合

`GET /api/blocks` のクエリセマンティクスが実際のノードの動作に整合されました。`numberOfTransactions=0` が正しく動作し、`orderBy`、金額フィルタ、およびソート後の `offset` が正確に文書化されています。スキーマには完全なパラメータカバレッジと、`BlockInfoDto` 上の `generatorPublicKey` が追加されました。ドキュメントから不正確な `timestampMs` の例が削除されました。

## オペレーターリカバリ：Mem-Table チェックポイント

クラッシュリカバリ用の、永続化されたローテーション `mem_*` チェックポイントが文書化されました。この機能は `loading.memCheckpoints.enabled` で制御され、デフォルトで有効です。ドキュメントではSHA-256検証、フェイルクローズドリストア、完全な決定的リビルドへのフォールバック、ストレージへの影響、およびグレースフルシャットダウンの動作（`SIGINT`/`SIGTERM` → `Cleaned up successfully` を待機）について説明しています。チェックポイントはローカルリカバリキャッシュとして機能し、正準ブロックが信頼の源となります。

## リリースコンテキスト

これらの更新はADAMANTノード `v0.10.2` を対象としています。下流のコンシューマ、特に `adamant-api-jsclient` は、更新されたOpenAPIバンドルから型を再生成する必要があります。関連するプルリクエストは [docs](https://github.com/Adamant-im/docs/pull/39)、[schema](https://github.com/Adamant-im/adamant-schema/pull/53)、および [node](https://github.com/Adamant-im/adamant) リポジトリにまたがっています。

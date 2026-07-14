---
title: "ADAMANT API JS Client v3.0.0"
slug: "release-adamant-api-jsclient-v3-0-0-342548957"
description: "ADAMANT API JS Client v3.0.0。ADAMANT Node v0.10.0と連携したメジャーアップデート。HTTPおよびWebSocketクライアントの更新、モジュール構造の安定化、再試行・フェイルオーバーの改善、メタデータ生成の決定性化、ドキュメントの刷新を実装。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.0.0"
publishedAt: "2026-06-21T15:22:41Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:342548957"
locale: "ja"
placeholder: false
---

# ADAMANT API JS Client v3.0.0

これは ADAMANT Node v0.10.0 と連携したメジャーアップデートのSDKリリースです。現在のノードAPI向けにHTTPおよびWebSocketクライアントを更新し、安定したモジュラーなパッケージ境界を導入し、再試行およびフェイルオーバーの動作を改善し、決定性のある生成メタデータを追加し、従来のWiki中心のドキュメントをソース管理されたVitePressおよびTypeDocサイトに置き換えました。

## ADAMANT Node v0.10.0 対応

本リリースでは、`adamant-schema` の固定リビジョンからAPI DTOを再生成しており、ミリ秒単位のタイムスタンプ、ローダーおよびステータスデータ、数値カウント、未確認トランザクションフィールドのnull許容などを含みます。現在のトランザクションおよびチャットのクエリパラメータとして、`returnUnconfirmed`、`includeDirectTransfers`、アドレスによるデリゲート検索、複数タイプのトランザクションクエリを追加しました。トランザクションクエリフィルターは、デフォルトで論理的に `and` で結合されるようになり、金額フィルターは送金トランザクションに限定されるようになりました。SDKはオプションの `timestampMs` によるトランザクション構築および `getEpochTimeMs` を追加しました。`timestampMs` は署名済みバイトの一部ではないため、ハッシュ、ID、署名は保持されます。ヘルスチェックは統合されたノードステータス応答に対応し、最小ノードバージョンの包含フィルタリングをサポートするようになりました。

## 信頼性およびWebSocketの動作

クライアントは、明示的に拒否されたPOST応答に対して再試行を行わなくなり、ループする代わりに構造化された再試行不可のHTTPエラーを返します。安全なリクエストおよびHTTP応答のないネットワーク障害については、再試行およびアクティブノードへのフェイルオーバーが維持されます。WebSocketのサブスクリプションは、複数のアドレス、トランザクションタイプ、チャットアセットタイプをサポートし、トランザクションおよびメッセージの便利なハンドラー、接続および再接続のコールバック、明示的な接続および切断、型指定された接続エラー、リスナーのクリーンアップ、制限付きの再接続処理を備えています。

## モジュラーSDKおよびnpmパッケージ

パッケージのルートは引き続きADMに焦点を当てており、コイン固有の実装の読み込みを防ぎます。ADM、API DTO、トランザクション、メタデータ、およびBTC、ETH、DASH、DOGEのヘルパー向けにサブパスエクスポートが追加され、CommonJSおよびESMの両方のサポートが維持されます。決定性のあるウォレットメタデータは、固定された `adamant-wallets` リビジョンから同期されます。LiskおよびKlayrのコードおよび依存関係は削除され、サポートされる外部コインの派生およびアドレス検証が標準化されました。本リリースではNode.js 22以降が必要です。pnpmワークスペースのメタデータを採用し、TypeScriptおよび依存関係を最新化し、エンドユーザー向けのtarballテストを追加しました。

## v2.4.0以降に保持されているAPIの修正

本リリースでは、デリゲート投票およびヘルスチェックの動作を修正しています。シグナルメッセージに対して文字列ペイロードを許可し、金額を含むメッセージタイプに対してのみ金額の検証を行います。トランザクションIDは文字列として表現され、バリデーターユーティリティがエクスポートされます。

## ドキュメント、自動化、メンテナンス

ドキュメントは、TypeDocで生成されたAPIリファレンスおよびガイドを含むVitePressサイトを通じて提供されます。本リリースには、GitHub Pages向けのドキュメントワークフロー（CNAME付き）、更新されたREADMEおよびCONTRIBUTINGファイル、決定性のあるスキーマおよびメタデータ同期チェック、カスタムJestランナー、パッケージ利用者向けテスト、カバレッジの拡張、モジュール境界テストが含まれます。LintingおよびTypeScript設定は最新のツールチェーンに移行され、不要なファイルは削除されました。

### 重大な変更

WebSocketサブスクリプションは、デフォルトで `allDirections` になります。以前はクライアントがハードコードされた `recipientId === admAddress` フィルターにより着信トランザクションのみを配信していましたが、現在はデフォルトで着信および送信トランザクションの両方を発行します。古い動作を復元するには、WebSocketクライアントオプションに `direction: 'incoming'` を渡してください。Node.js 22以降が必要です。コインヘルパーは `adamant-api/coins/btc` のような明示的なパスからインポートする必要があり、パッケージルートからはエクスポートされなくなりました。LiskおよびKlayrのサポートは削除されました。トランザクションクエリフィルターはデフォルトで論理的に `and` を使用するようになり、金額フィルターは送金トランザクションにのみ適用されます。利用者は非推奨の `withoutDirectTransfers` の使用状況を確認し、`includeDirectTransfers` に移行する必要があります。

トランザクションのバイトレイアウト、署名、ID、署名のセマンティクスは変更されていません。CommonJSおよびESMの利用者双方とも、パッケージ化されたtarballテストでカバーされています。

---
title: "ADAMANT Tradebot v10.0.0"
slug: "release-adamant-tradebot-v10-0-0-439222935"
description: "ADAMANT Market Making Software v10.0.0は、アーキテクチャの再編、排他的な反復処理の安全性向上、エンタープライズログ管理、ロールベースのWebUI管理APIなどを導入した重要なマイルストーンリリースです。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v10.0.0"
publishedAt: "2026-11-09T14:19:19Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-tradebot"
tag: "v10.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:439222935"
locale: "ja"
placeholder: false
---

ADAMANT Market-Making Software v10.0.0は、アーキテクチャの再編、排他的な反復処理の安全性向上、エンタープライズログ管理、ロールベースのWebUI管理API、Azbitコネクタの全面的な書き直し、npm Trusted Publishing（OIDC経由）の導入、およびDockerコンテナの暗号学的ビルド証明を実現した重要なマイルストーンリリースです。

## インストール

```bash
# npm経由
npm install -g adamant-tradebot
mm init
mm doctor
mm on

# Docker / GHCR経由
docker pull ghcr.io/adamant-im/adamant-tradebot:10.0.0
docker run -d --name adamant-tradebot ghcr.io/adamant-im/adamant-tradebot:10.0.0
```

## サプライチェーンセキュリティとTrusted Publishing

npmの公開ワークフローは、永続的なリポジトリシークレット（`NPM_TOKEN`）を必要としないOIDC Trusted Publishingへ移行しました。`publishConfig.provenance: true`による検証済み証明を有効化し、issue #119を解決しています。GHCRのビルド証明アテステーションは、`actions/attest-build-provenance@v2`を使用して統合され、GitHub Packages上で検証可能なコンテナビルドのためにSigstore署名が導入されました。CI/CD公開ワークフローには、`workflow_dispatch`による手動検証トリガーが追加されています。

## アーキテクチャと実行時の信頼性

モジュール構造を再編し、マーケットメイキングモジュール用の`trade/features/`、取引所コネクタ用の`trade/trader/`、動的パラメータファイル用の`trade/settings/`へと明確に分離しました。`helpers/moduleIteration.js`（`runExclusiveIteration`）を通じて排他的な反復ロックを導入し、反復処理の重複実行を防ぐとともに、`finally`ブロックからの確実な再スケジュールを保証しています。

エンタープライズログローテーションと高速ログリーダーは、`helpers/logRotation.js`および`helpers/logReader.js`にて完全に書き直され、アクティブおよびアーカイブのライフサイクル管理、構造化された逆順読み込み、ページネーションによるログ取得をサポートしました。実行時の健全性評価は、`helpers/mmHealthEval.js`、`helpers/mmHealthState.js`、および`helpers/mmRuntimeHealth.js`を通じて追加され、リアルタイムでのマーケットメイキング状態監視が可能になりました。コマンド実行者の追跡は`helpers/commandInitiator.js`によって提供され、Messenger、WebUI API、CLI呼び出し全体で一貫したコンテキスト追跡を実現しています。

## 取引所コネクタ

Azbitコネクタは、`trade/trader/trader_azbit.js`および`trade/api/azbit_api.js`が全面的に書き直され、REST API v1およびv2、厳密な注文精度、レート制限をサポートし、包括的なAPIモックを用いた137件のユニットテストが実施されました。コネクタの精度と安全性は、Coinstore、FameEX、NonKYC、P2PB2B、StakeCube全体で標準化され、統一されたエラーハンドリング、精度の切り捨て、残高の事前検証が実装されています。

## WebUI RESTおよびWebSocket API

ロールベースのアクセス制御が導入され、`admin`、`manager`、`viewer`（読み取り専用）の各ロールをサポートしました。これには厳格なJWT検証、TTL強制、IPアクセスフィルタリングが含まれます。動的パラメータ調整（`PUT /api/v1/params`、`PUT /api/v1/params/strategy`）、ボットのライフサイクル管理、注文、ログクエリのための完全なボット管理エンドポイントが追加されました。WebSocketストリーミングにより、ボットの状態、取引ログ、市場ティッカー更新のリアルタイムイベント購読が可能になります。

## 品質保証と開発ツール

テストカバレッジは、一般、API WebUI、機能、トレーダー、ヘルパー、マーケットメイキングモジュールを網羅する33のテストスイート、計576件の自動テストに拡大しました。AIエージェントのガイドラインが`AGENTS.md`に追加され、安全性の不変条件、ディレクトリレイアウト、テストプロトコルを遵守したAI支援開発を促進します。JSDocの`@typedef`定義と`npm run typecheck:webui-api`によるTypeScriptチェックを通じて、型安全性が向上しました。

### 破壊的変更

本リリースでは、Node.jsバージョン22.12.0以上が必要です。内部ディレクトリレイアウトが変更され、機能モジュールとコネクタが`trade/features/`および`trade/trader/`へ移動しました。内部パスをインポートしているカスタム拡張機能は、適宜更新してください。WebUI APIは、すべてのプライベートエンドポイントにおいて、厳格なJWT有効期限とロール認証を強制します。

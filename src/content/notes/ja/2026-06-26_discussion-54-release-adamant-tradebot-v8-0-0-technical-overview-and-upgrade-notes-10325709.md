---
title: "リリース: adamant-tradebot v8.0.0 — 技術概要とアップグレード手順"
slug: "discussion-54-release-adamant-tradebot-v8-0-0-technical-overview-and-upgrade-notes-10325709"
description: "ADAMANT tradebot v8.0.0がdevブランチでリリース。OSSコードベースを最新のPremium基盤と統合し、安定性と保守性を向上。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/54"
publishedAt: "2026-06-26T16:06:12Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10325709"
locale: "ja"
placeholder: false
---

## 概要

ADAMANT tradebot v8.0.0が`dev`ブランチでリリースされ、v8.0.0としてタグ付けされました。このメジャーアップグレードは、オープンソース（Basic）マーケットメイキングボットのOSSコードベースを現在のPremiumエンジニアリング基盤に再整列させつつ、OSSの範囲を維持しています：REST優先、スポット取引中心、Premium専用モジュールは再導入されていません。上場トークン向けにボットを運用している場合、実際の成果として、より信頼性の高いランタイム、クリーンな起動、既存データベースでの安全なアップグレード、刷新された取引所コネクタ、および外部クライアント向けのオプションのプライベートWebUI APIが利用可能になります。

## アーキテクチャ

`app.js`内のブートストラップシーケンスは、現在明示的かつ順序立てられています。MongoDB接続と`db.ready`を待機し、登録されたデータベースマイグレーションを実行し、ADMソケット/ポーリングやオプションのWebUI APIなどのサービスを初期化し、コネクタメタデータをウォームアップさせ、最後にアクティブな`mm_*`取引モジュールを開始します。これにより、冷間起動時の競合状態が減少し、アップグレードがより安全になります。

単一の巨大な`modules/commandTxs.js`は、`modules/commands/`配下の特定機能向けハンドラ（account、orders、trade、info、features）と共有基盤コードに分割されました。コマンドは引き続き設定に応じてADAMANT MessengerおよびTelegram経由で到着しますが、コードパスの保守性が向上しています。レガシーなADM入力モジュールは、`adamantApi.js`、`admTxChecker.js`、`admTxParser.js`に置き換えられ、`adamant-api` 3.xおよび現在のソケット/ポーリングパターンとコマンド入力が統合されました。

データベースマイグレーションは、`modules/dbMigrations.js`により起動時に一度だけ実行されます。含まれる最初のマイグレーションでは、レガシー注文フィールド`type`を`side`に安全に名前変更します。既存のデプロイでは、初回のv8起動前にMongoDBをバックアップし、マイグレーション後に未決済注文と統計を確認する必要があります。

## オプションのWebUI API（Bot API v1）

v8.0には、`api/`ディレクトリにあるプライベートHTTP APIが搭載されています。Fastify HTTPサーバー、JWT認証、Zodによるリクエスト検証、およびトランスポートフック用のSocket.IOを使用しています。`/api/v1`以下のコアルートには、capabilities bootstrap、market、account、params、commands、messagesが含まれます。このAPIはオプションで、デフォルトでは無効です。ボットが引き続き取引所とのみ通信する構成を維持しつつ、自己ホスト型のグラフィカルクライアント向けに設計されています。`config`内の`private_webui`設定で有効化します。強力な`private_webui_secret_key`を設定し、`private_webui_allowed_ips`でアクセスを制限し、何をしているか明確でない限り、APIをパブリックインターネットに公開しないでください。

## 取引所コネクタ

Basicエディションでサポートされているコネクタには、Azbit、P2PB2B、StakeCube、Coinstore、FameEX（新しいFameEXnetコネクタ経由）、およびNonKYCが含まれます。運用者は以下の破壊的変更に注意してください：FameEXのAPI表面は設定をFameEXnetに切り替える必要があり、XeggeXはOSSから削除されました。マーケットメイキングモジュールはトレーダーアダプタとともに刷新されています。

## 依存関係とアップグレードガイド

注目すべきランタイムの更新には、`adamant-api` 3.x、`mongodb` 7、および`zod`、`fast-jwt`、`json-parse-bigint`の追加が含まれます。ExpressはWebUIパスから削除されました。v7.xからアップグレードするには、ボットを停止し、最新のコードを取得して依存関係をインストールします：

```bash
pm2 stop tradebot
cd adamant-tradebot
git pull
npm i
```

Node.js 22.2+がインストールされていることを確認してください。`config.default.jsonc`から新しいフィールドを`config.jsonc`にマージし、FameEXnetコネクタの設定を確認し、初回起動時にマイグレーションが実行できるようMongoDBデータベースをバックアップしてください。WebUI APIが有効になっている場合は、そのセキュリティ設定を再確認してください。最後に、プロセスマネージャーを使用してボットを再起動します。名前付き設定は引き続き正常に動作します。

## OSSの範囲の境界

v8.0は、Premium専用の前提を再導入せずに、Premiumレベルのエンジニアリング品質をOSSツリーに取り込んでいます。スポット取引、REST優先の基盤は維持されており、必須のWebSocket取引所コネクタ、ペリpetual/先物スタック、または拡張された取引所カタログは含まれていません。

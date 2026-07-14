---
title: "ADAMANT Tradebot v9.0.0"
slug: "release-adamant-tradebot-v9-0-0-347857922"
description: "ADAMANT Tradebot v9.0.0。これはオープンソースのマーケットメイキングボットの最初の配布可能リリースです。パッケージバージョンは8.0.0から9.0.0に引き上げられました。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0"
publishedAt: "2026-07-02T06:12:07Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v9.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:347857922"
locale: "ja"
placeholder: false
---

# ADAMANT Tradebot v9.0.0

これは、オープンソースのマーケットメイキングボットとして最初の配布可能リリースです。パッケージバージョンは8.0.0から9.0.0に引き上げられました。

## インストール

```bash
npm install -g adamant-tradebot
mm init
```

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

## ハイライト

### 配布形式

ボットは現在、`adamant-tradebot`というnpmパッケージとして配布されており、`mm init`、`mm on`、`mm off`、`mm doctor`などのコマンドを提供する`mm` CLIが含まれています。GHCR上では`ghcr.io/adamant-im/adamant-tradebot`にてDockerイメージが利用可能で、MongoDBおよびローカル実行用の`docker-compose`スタックも提供されています。GitHub Actionsのパブリッシュワークフローにより、npmおよびGHCRへのリリースが自動化されています。

### アーキテクチャ（v8ベースライン以降）

コードベースには、`modules/commands/`以下にモジュール化されたADMコマンドハンドラが導入されています。Fastify、JWT、Zod、Socket.IOを用いてWebUI APIの基盤が構築されました。トレーダー、オーダーブックビルダー、流動性プロバイダー、価格ウォッチャーといったMMモジュールがリファクタリングされています。`types/`以下のJSDoc型定義が拡充され、JestテストおよびESLint flat configも追加されています。

### 取引所コネクタ

サポート対象の取引所には、Azbit、Coinstore、FameEXnet、NonKYC、P2PB2B、StakeCubeが含まれます。旧式のBit-Z、CoinDeal、IDCM用コネクタは削除されました。

### ドキュメント

READMEはトークン発行者およびセルフホスティング型マーケットメイキング向けに全面的に見直されました。`CONTRIBUTING.md`ファイルおよびAIエージェント用の手順書が追加されています。

### 重大な変更

設定ファイルは、コミット済みの`config.json`ファイルではなく、`mm init`と組み合わせて使用する`config.default.jsonc`を使用するようになりました。Node.js v22.2以降が必要です。旧式の取引所コネクタは削除されているため、ユーザーはサポート対象の取引所へ移行する必要があります。npmおよびローカルインストールのライフサイクルは、`mm on`および`mm off`によるCLI駆動型に変更されました。

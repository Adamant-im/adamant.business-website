---
title: "ADAMANT Tradebot v8.0.0"
slug: "release-adamant-tradebot-v8-0-0-345264629"
description: "ADAMANT Tradebot v8.0.0は、パッケージバージョンを7.0.1から8.0.0に引き上げる、オープンソースのマーケットメイキングBotのメジャーリリースです。ブートストラップフローは再設計され…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v8.0.0"
publishedAt: "2026-06-26T10:47:34Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v8.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:345264629"
locale: "ja"
placeholder: false
---

ADAMANT Tradebot v8.0.0は、オープンソースのマーケットメイキングBotのメジャーリリースであり、パッケージバージョンを7.0.1から8.0.0に引き上げます。

ブートストラップフローは、データベースマイグレーションと起動時のウォームアップを含むように再設計されました。ADMコマンドハンドラは現在`modules/commands/`配下でモジュール化されており、`adamantApi`、`admTxChecker`、`admTxParser`コンポーネントを持つ新しいADMトランザクション受信パイプラインが導入されました。

オプションのWebUI APIが追加され、Fastify HTTP、JWT認証、Zodバリデーション、Socket.IOトランスポートを基盤としています。アカウント、Botステータス、コマンド、マーケットデータ、メッセージ、取引パラメータ用のルートを公開しています。

取引所コネクタが更新されました：XeggeXが削除され、FameEXがFameEXnetに移行し、Azbit、P2PB2B、NonKYC、Coinstore、StakeCubeが更新されました。

ランタイムは現在Node.js v22.2+を必要とし、`adamant-api` 3.xおよび`mongodb` 7.xとも連携します。ツールはESLint 10にアップグレードされ、Jestテストスイートが拡張され、`types/`配下のJSDocカバレッジが改善されました。ドキュメントの追加には`CONTRIBUTING.md`が含まれ、`README.md`および`config.default.jsonc`も更新されています。

アップグレードするには、最新のコードをプルし、依存関係をインストール、`config.jsonc`を`config.default.jsonc`と比較・統合してからBotを起動してください。

```bash
git pull
npm i
# Review and merge config.jsonc with config.default.jsonc
npm start
```

### ブレイキングチェンジ

Node.js v22.2+が必須となり、以前のv18+から引き上げられました。データベースマイグレーションにより注文フィールドの`type`が`side`にリネームされます。設定スキーマの変更に伴い、`config.default.jsonc`を確認し既存の設定ファイルに更新内容をマージする必要があります。XeggeXは削除され、FameEXユーザーはFameEXnetコネクタに切り替える必要があります。ライセンスメタデータは`UNLICENSED`に変更され、`private: true`が設定されています。

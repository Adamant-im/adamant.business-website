---
title: "ADAMANT Market-Making Software v9.0.0がリリース"
slug: "discussion-59-adamant-market-making-software-v9-0-0-is-live-10356902"
description: "ADAMANT Market Making Software v9.0.0がリリース。初の公開版となるオープンソースのADAMANTマーケットメイキングボットは自己ホスト型で、自身の取引所アカウントとキーを使用して実行可能"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/59"
publishedAt: "2026-07-02T06:58:44Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10356902"
locale: "ja"
placeholder: false
---

# ADAMANT Market-Making Software v9.0.0がリリース

オープンソースのADAMANTマーケットメイキングボットの初の公開配布版が利用可能になりました。自己ホスト型であり、自身の取引所アカウントとキーで実行でき、第三者による資産管理は一切ありません。

## インストール

ボットはnpmパッケージおよびDockerイメージの両方で配布されています。

**npm (CLI `mm`):**

```bash
npm install -g adamant-tradebot
mm init
mm on
```

**Docker (GHCR):**

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

`docker-compose`をラップするシェルスクリプトも利用可能です。詳細は[README](https://github.com/Adamant-im/adamant-tradebot#readme)を参照してください。

## v9.0.0の新機能

このリリースでは、`init`、`on`、`off`、`doctor`、`status`、`logs`などのコマンドを備えた`mm` CLIを導入しています。また、GHCRでホストされるパブリックDockerイメージも含まれます。マーケットメイキングエンジンは、トレーダー、オーダーブックビルダー、流動性プロバイダー、価格ウォッチャーをカバーするモジュール型コンポーネントに再構成されています。Azbit、Coinstore、FameEXnet、NonKYC、P2PB2B、StakeCube向けの取引所コネクターも含まれます。さらに、WebUI APIの基盤も整備されており、テストコードと拡充されたドキュメントも同梱されています。

リリースノートおよびソースコードは[GitHub](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0)で確認できます。npmパッケージは[npmjs.com](https://www.npmjs.com/package/adamant-tradebot)で公開されています。

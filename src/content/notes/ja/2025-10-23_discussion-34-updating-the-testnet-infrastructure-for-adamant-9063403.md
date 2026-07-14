---
title: "ADAMANTのTestnetインフラの更新"
slug: "discussion-34-updating-the-testnet-infrastructure-for-adamant-9063403"
description: "ADAMANTはテストネット環境の更新と安定化のためのインフラ改善タスク（Issue 148）を特定しました。健全なテストネットは信頼性の高いブロックチェーン開発に不可欠です。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/34"
publishedAt: "2025-10-23T15:40:31Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9063403"
locale: "ja"
placeholder: false
---

ADAMANTは、テストネット環境を更新・安定化させるためのインフラ改善タスク（Issue #148）を特定しました。健全なテストネットは、現実的なテストやコントリビューターのオンボーディングを可能にするため、信頼性の高いブロックチェーン開発に不可欠です。

## 利用可能なもの

テストネットデータベースの**ブートストラップスナップショット**が、`https://testnet.adamant.im/db_test_backup.sql.gz` からダウンロード可能になりました。これにより、開発者はゼロから同期せずに迅速にテストネットノードを立ち上げられます。

テストネット用ADMコイン（3500 ADM）は、メインネットと同じフェーシャーから取得できます：`https://adamant.im/free-adm-tokens/`。devブランチを実行しているテストネット版メッセンジャーアプリは `https://dev-adamant-testnet.surge.sh/` で利用可能で、テストネット用ブロックエクスプローラーは `https://testnet.adamant.im/` で確認できます。

パブリックテストネットノードの一覧は、GitHub上のデフォルト設定ファイルで管理されています：`https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json`。

実装の詳細については、元の記事 `https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56` を参照してください。

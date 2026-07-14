---
title: "ADAMANT Wallet Metadata 2.6.0: ウォレット統合向け開発者向けノート"
slug: "discussion-55-adamant-wallet-metadata-2-6-0-developer-notes-for-wallet-integrations-10329995"
description: "ADAMANT Wallet Metadata 2.6.0はリリース準備中。この更新は、ADAMANT内蔵ウォレット、メタデータ、ノードリストの統合を行う開発者に主に関係します。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/55"
publishedAt: "2026-06-27T13:42:14Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10329995"
locale: "ja"
placeholder: false
---

ADAMANT Wallet Metadata `2.6.0` はリリース準備が整いました。この更新は、ADAMANT内蔵の暗号資産ウォレット、ウォレットメタデータ、ノードリスト、サービス定義、または下流のウォレットUI/構成同期を統合している開発者にとって主に関係があります。

## ウォレットおよびサービス開発者向けの変更点

`adamant-wallets`リポジトリは、ADAMANTアプリが使用するコイン、トークン、ブロックチェーン、ノード、サービス、アイコン、スキーマのメタデータの公式な情報源です。バージョン`2.6.0`では、メタデータ自体に加え、下流の利用者がそれをどのように読み取るべきかに関するドキュメントも更新されています。

メタデータのオーバーライドモデルがより明確に文書化されました。共通フィールドは `assets/general/<coin-or-token>/info.json` に配置され、ブロックチェーンのデフォルトは `assets/blockchains/<blockchain>/info.json` に、ブロックチェーン固有のトークンオーバーライドは `assets/blockchains/<blockchain>/<token>/info.json` に配置されます。`README.md` では、ノード、サービス、手数料、精度、アイコン、ヘルスチェック、ステータスフラグ、送金制限など、ウォレットメタデータパラメータのフィールド説明が復元され、拡充されています。`specification/openapi.json` は、より多くのウォレットメタデータフィールドとネストされた構造をカバーしており、SDK、バリデーター、スキーマ利用者、および生成されたドキュメントが実際のJSON構造により近づくことを支援します。リポジトリ固有のメンテナンスルール、バリデーションの期待値、issue/PRの規約、およびメタデータの安全性に関するルールは、`AGENTS.md` および `.github/CONTRIBUTING.md` に記載されています。

## 下流での確認が必要なメタデータの更新

アプリ、サービス、SDK、ボット、またはバックエンドがADAMANTウォレットメタデータを直接、またはバンドルされたADAMANTウォレット経由で利用している場合、以下の変更を確認してください。

ADAMANTノードのメタデータが更新され、利用不可となった3つのADMプロキシノード `tauri.bbry.app`、`endless.bbry.app`、`debate.bbry.app` が削除されました。Bitcoin、Dash、Dogecoinのメタデータが更新され、Dogecoinのアドレス検証例が修正されました。DAIのGitHubリンクが修正され、GTトークンの名称が更新されました。非推奨となったUSDSのメタデータおよび関連するアイコンアセットが削除されました。パッケージメタデータ、依存関係ロックファイル、Node.jsエンジン情報、バリデーションスクリプト、リポジトリリンクも更新されています。

## 統合者向けの推奨チェック項目

このリポジトリをウォレット、取引所連携、監視サービス、モバイルアプリ、PWA、SDK、またはカスタムバックエンドで利用している場合、`2.6.0`リリースが`master`にマージされた後にウォレットメタデータを再同期してください。削除されたUSDSメタデータまたは削除されたADMプロキシノードへのハードコードされた参照がコード内にないか確認し、生成された型、バリデーター、スキーマ対応ツールを使用している場合は、更新されたOpenAPIスキーマに対してメタデータバリデーションを再実行してください。

`status`、`defaultVisibility`、`defaultOrdinalLevel`、`decimals`、`cryptoTransferDecimals`、`minBalance`、`minTransferAmount`、`fixedFee`、`defaultFee`、アイコンパスなどのフィールドについて、ウォレットUIの動作を再確認してください。アプリが `nodes`、`services`、`healthCheck`、`minVersion`、`hasIndex`、`alt_ip`、`txFetchInfo`、`txConsistencyMaxTime`、`timeout`、または信頼性ガス設定を使用している場合は、ノードおよびサービス選択ロジックを再確認してください。統合側では、メタデータをリスト形式の構成として扱い、明示的なフォールバック戦略がない限り、単一のエンドポイントに固定しないようにしてください。

## 参照

- リリースissue: https://github.com/Adamant-im/adamant-wallets/issues/137
- リリースPR: https://github.com/Adamant-im/adamant-wallets/pull/138
- リポジトリ: https://github.com/Adamant-im/adamant-wallets
- ADAMANT Improvement Proposals: https://aips.adamant.im/

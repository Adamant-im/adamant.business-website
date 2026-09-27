---
title: "ADAMANT Exchange Bot v3.0.0"
slug: "release-adamant-exchangebot-v3-0-0-397317563"
description: "ADAMANT Exchange Bot v3.0.0は、ランタイムスタックの刷新、資金安全保護機能の強化、包括的なテストカバレッジ、および運用性の向上を実現したメジャーリリースです。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0"
publishedAt: "2026-09-26T16:47:34Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
repo: "adamant-exchangebot"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-exchangebot:397317563"
locale: "ja"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0は、ランタイムスタックの大幅な刷新、コンセンサスグレードの資金安全保護機能、包括的なテストカバレッジ、および運用性の向上を実現したメジャーリリースです。

### ランタイムとアーキテクチャの刷新

エンジン要件を最新のLTSであるNode.js 22.13以降に更新しました。レガシーな`web3-eth`および`web3-utils`依存関係を、EthereumおよびERC-20トークン管理用の`ethers` v6に置き換えました。Bitcoin、Dash、Dogecoinのトランザクション構築は、Partially Signed Bitcoin Transactions (PSBT) を使用するBitcoinJS-lib 7にアップグレードされました。データベースクエリはMongoDB Driver 7で刷新され、ネイティブのPromiseベースの非同期APIを採用することで、レガシーなコールバックを排除しました。ノード接続は`adamant-api` 3.xに移行し、`AdamantApi`および`WebSocketClient`を使用するように変更されました。レガシーなLisk (LSK) モジュールおよび設定オプションは完全に削除されました。プロジェクトは最新のツールとしてESLint 9フラット設定、Prettier 3、Jest 30、およびmarkdownlintを採用しています。

### 並行処理、入金追跡、および資金の安全性

競合状態や二重請求エクスプロイトを防止するため、5分間の紛争ウィンドウを備えたメモリプール入金監視機能を導入しました。BTC、DASH、DOGEを含むUTXOブロックチェーンにおいて、コインの同時消費を排除するためにUTXO単位のロックを実装しました。受信した交換リクエストやキャンセルリクエストは、送信者ごとにシリアル化され、競合状態を防止します。DashのInstantSendトランザクションに対する自動認識および高速パス処理が追加されました。サポートされていないコインの転送やネットワーク転送エラーを適切に処理するため、`unsupportedCoinGuard`セーフガードを導入しました。

### チャットコマンドと運用UX

`/cancel`チャットコマンド（`cancel`としても認識）を追加しました。これにより、ターゲットコインの確認待ち状態にある保留中の交換をキャンセルし、ネットワーク手数料を差し引いた金額を自動的に返金できるようになりました。ユーザーが`inUpdateState`中に新しい転送を送信した場合、以前の入金は自動的に返金キューに入れられるようになります。`formatNumber`ユーティリティを強化し、指数形式の数値（`e+`および`e-`）を人間が読みやすい完全な10進数表現にフォーマットできるようになりました。設定およびコインレジストリにOnyxcoin (XCN) ERC-20トークンのサポートを追加しました。

### 設定とノードの回復力

`configSchema.js`に純粋なスキーマバリデーションを実装し、無効な設定を即座に検出するフェイルファスト起動チェックを追加しました。複数のRPCおよびRESTエンドポイント間でラウンドロビンと自動フェイルオーバーを行う、回復力の高い`nodeClient.js`を構築しました。手数料、確認制限、USD日次制限、価格範囲に対して、コインごとの詳細なオーバーライド設定を追加しました。

### テストとドキュメント

外部ネットワークやデータベースへの依存なしに、ヘルパー、暗号アダプター、設定スキーマバリデーション、交換モジュールを網羅する690のユニットテストを含む、31のJestテストスイートからなる包括的なテストスイートを追加しました。運用ドキュメントとして、AIエージェントマニュアル`AGENTS.md`、`CONTRIBUTING.md`、および刷新された`README.md`を追加し、拡充しました。

### 破壊的変更

サポートされるNode.jsの最小バージョンが22.13になりました。運用者はランタイム環境をアップグレードする必要があります。レガシーな`web3-eth`および`web3-utils`は`ethers` v6に置き換えられました。これにより、以前のEthereumライブラリAPIに依存していたカスタム統合に影響を与える可能性があります。Bitcoin、Dash、Dogecoinのトランザクション構築は、PSBTを使用するBitcoinJS-lib 7を使用するように変更され、内部のトランザクション構築フローが変更されました。MongoDB Driver 7への移行に伴い、以前のドライバーは削除され、コールバックベースのクエリパターンは使用できなくなりました。すべてのレガシーなLisk (LSK) モジュールと設定オプションは完全に削除されたため、LSK関連の設定を持つ運用者はそれらのエントリを削除する必要があります。厳格なスキーマバリデーションによりフェイルファスト起動が強制されるため、以前は許容されていた無効な設定値がある場合、ボットは起動を拒否します。

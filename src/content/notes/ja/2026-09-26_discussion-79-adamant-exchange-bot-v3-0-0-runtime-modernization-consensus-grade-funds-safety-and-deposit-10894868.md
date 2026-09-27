---
title: "ADAMANT Exchange Bot v3.0.0：ランタイムの近代化とコンセンサスレベルの資金安全性"
slug: "discussion-79-adamant-exchange-bot-v3-0-0-runtime-modernization-consensus-grade-funds-safety-and-deposit-10894868"
description: "ADAMANT Exchange Botは、エンドツーエンド暗号化されたADAMANT Messengerチャット内で、即時かつ匿名で暗号資産交換を行うためのセルフホスト型ソフトウェアです。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/79"
publishedAt: "2026-09-26T17:12:03Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10894868"
locale: "ja"
placeholder: false
---

ADAMANT Exchange Botは、エンドツーエンド暗号化されたADAMANT Messengerチャット内で、即時かつ匿名で暗号資産交換を行うためのセルフホスト型ソフトウェアです。本ソフトウェアは、サードパーティの管理者や公開されたWebインターフェースを介することなく、Bitcoin、Ethereum、Dash、Dogecoin、およびADAMANTのホットウォレットを運用します。バージョン3.0.0では、ランタイムスタックの近代化、暗号技術およびブロックチェーン統合の最新ライブラリへの移行、UTXOおよびリクエストレベルのミューテックスロックによるコンセンサスレベルの資金安全性不変条件の強制、ならびに5分間の紛争解決ウィンドウを備えた外部入金クレーム監視機能の追加が行われました。セキュリティ監査およびメンテナンスは、ADAMANT開発者コミュニティと協力してcryptofoundryが担当しています。

## スタックとアーキテクチャの近代化

コードベースはNode.js 22.13+ LTSをターゲットとし、`package.json`のenginesおよび`.nvmrc`の制約が更新されました。EthereumおよびERC-20の相互作用では、従来の`web3-eth`および`web3-utils`を`ethers` v6に完全に置き換え、決定論的なコントラクト呼び出し、正確なガス推定、信頼性の高いナンス管理を実現しています。Bitcoin、Dash、Dogecoinのトランザクション構築は、`bitcoinjs-lib` 7を介したPSBT（Partially Signed Bitcoin Transactions）へと移行し、非推奨となった`TransactionBuilder`を削除しました。`payments`、`incomingtxs`、`systems`の各コレクションに対するMongoDB 7のクエリは、ネイティブなPromiseベースのasync/awaitを使用するように変更され、コールバックパターンを排除しました。Nodeクライアントの統合は、最新の鍵導出ヘルパーを備えた`AdamantApi`および`WebSocketClient`を使用する`adamant-api` 3.xへアップグレードされました。Lisk（LSK）のレガシーサポートは、`@liskhq/*`依存関係、`lsk_utils.js`、`lskBaseCoin.js`、および関連する設定オプションを含め、完全に削除されました。開発ツールには、ESLint 9のフラット設定、Prettier 3、およびJest 30を採用しています。

## 同時実行性の保証と資金安全性の不変条件

無人での取引所運用には、コンセンサスレベルの財務的安全性が必要です。レート、手数料、小数点、残高は正確でなければならず、支払いまたは返金は厳密に冪等（べきとう）でなければなりません。

UTXOベースのチェーンにおいて、同時支払いまたは返金は、複数のトランザクションが同一の未使用出力を消費しようとする競合状態のリスクを伴っていました。v3.0.0では、`helpers/mutex.js`および`btcBaseCoin.js`に非同期メモリミューテックスを導入し、PSBTの作成および署名中に選択されたUTXOをロックします。UTXOは、ネットワーク上でブロードキャストの確認が取れるまでロックされたままとなります。トランザクションの組み立てやブロードキャストが失敗した場合、ロックされたUTXOは安全に利用可能なプールへ解放され、二重支払いのリスクを負うことなく、残高の停滞を防ぎます。

チャットコマンドの着信、新規転送イベント、および同一ユーザーからのキャンセルリクエストは、`incomingTxsParser.js`内の送信者ごとのミューテックスロックを通じて同期され、ユーザーが同時に転送を送信したり、状態遷移中に返金をトリガーしたりする際の競合状態を排除します。すべての支払い記録は、ネットワーク送信前にMongoDBに永続化される決定論的な状態（`inProcessing`、`needToSendBack`、`sent`、`refunded`）を遷移します。ボットが再起動したり、転送中に接続が切断されたりした場合でも、保留中の支払いは調整され、二重支払いなしで再開されます。

## 入金監視とクレームのライフサイクル

外部からの入金には、オンチェーンのトランザクションとADAMANTチャットのIDを関連付ける必要があります。`modules/depositWatcher.js`は、中央集権的なWebフックを使用せず、各アダプターの`getPendingIncomingTransactions`実装を通じて、未確認および着信中のトランザクションを監視します。`modules/depositClaims.js`は、同一のオンチェーン・トランザクションハッシュの重複請求を防ぐため、入金クレームをそのライフサイクル全体で追跡します。5分間の強制的な紛争解決ウィンドウにより、支払い実行前にブロックチェーンの再編成（リオーグ）、レースアタック、二重請求エクスプロイトから保護されます。`modules/deepExchangeValidator.js`は、送信者のADAMANT Key-Value Storage（KVS）アドレス記録と照合して入金を暗号学的に検証し、キャッシュおよび自動リトライロジックを備えています。

## 取引所のUXとチャットコマンドの強化

交換ペアを指定せずに入金を行ったユーザーは、チャットで`/cancel`（または`cancel`）を発行することで、保留中の交換をキャンセルし、ネットワーク手数料を差し引いた入金額を自動的に受け取ることができます。`inUpdateState`状態の入金を持つユーザーが、対象通貨を明示する代わりに後続の転送を送信した場合、ボットは以前の入金を破棄するのではなく、自動返金のためにキューに入れるようになりました。`utils.formatNumber`ヘルパーは、科学的表記法（`e+` / `e-`）を人間が読みやすい完全な10進数文字列に展開してから桁区切りやボールド化を行うようにリファクタリングされ、高桁数や高精度のトークンにおけるスペースの崩れや指数表記のアーティファクトを修正しました。Onyxcoin（XCN）ERC-20トークンのネイティブ設定およびレジストリサポートが追加されました。

## 設定スキーマとマルチノード・フェイルオーバー

設定ファイル（`config.jsonc`、`config.default.jsonc`）は、起動時に`modules/configSchema.js`内の宣言的スキーマに対して厳密に検証されます。キーの欠落、`accepted_crypto`内の未知の暗号資産、またはノードが設定されていないコインがある場合は、即座にフェイルファストエラーが発生します。`helpers/cryptos/nodeClient.js`内の回復力のあるマルチノードクライアントは、設定されたエンドポイント間でHTTPおよびJSON-RPC呼び出しを自動的にラウンドロビンおよびフェイルオーバーし、オフラインまたは同期がずれたブロックチェーンノードを処理します。オペレーターは、ネットワーク手数料（`exchange_fee_<COIN>`）、必要な確認数（`min_confirmations_<COIN>`）、1日あたりのUSD取引量制限（`daily_limit_usd_<COIN>`）、および価格制限（`fixed_buy_price_usd_<COIN>`、`min_sell_price_usd_<COIN>`）について、ティッカーごとのオーバーライドを指定できます。

## テストとAI運用マニュアル

テストスイートは31のJestテストスイートと690のユニットテストで構成されており、ライブノード、MongoDB、または実際の秘密鍵を必要とせずに、コア交換モジュール、暗号資産アダプター、設定スキーマ、およびユーティリティをカバーしています。リポジトリの慣習、技術アーキテクチャ、不変条件のガイドライン、および変更管理ルールは、`AGENTS.md`に正式に定義されています。

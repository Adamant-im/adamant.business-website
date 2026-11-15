---
title: "ADAMANT Messenger v4.12.1: 厳格なCSP、決定論的インデクサーページネーション、RTL UI、および検証可能なビルド"
slug: "discussion-83-adamant-messenger-v4-12-1-strict-csp-deterministic-indexer-pagination-8-language-rtl-ui-an-11310133"
description: "ADAMANT Messenger PWA v4.12.1は、v4.12.0をベースに69のコミット、12のプルリクエスト、14の課題を解決し、セキュリティ強化、RTL対応、多言語対応を実現しました。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/83"
publishedAt: "2026-11-14T17:50:00Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Messenger apps"
cardSpan: "half"
originalId: "github-discussion:11310133"
locale: "ja"
placeholder: false
---

ADAMANT Messenger PWA `v4.12.1` は、`v4.12.0` (`dfe094d3`) をベースに、`master` ブランチ (`074db965`) からリリースされました。本リリースには69のコミット、12のマージ済みプルリクエスト、14のクローズされたマイルストーン課題が含まれています。単なる機能追加にとどまらず、検証可能なトランスポートとランタイムの強化、分散型マルチオペレーターインフラストラクチャにおけるノードおよびインデクサーの決定論的ページネーション、アラビア語のRTL（右から左へ記述する言語）サポートを含む8言語の完全な対応、そしてWeb、デスクトップ、Androidターゲット全体にわたる透明性の高いビルド証明に重点を置いています。

## 厳格なCSP、evalを使用しないWeb3検証、および共有セキュリティヘッダー

統一されたセキュリティヘッダー契約（`vite-config/plugins/cspHardeningPlugin.ts` 内の `PWA_SECURITY_HEADERS`）が、ビルド全体で適用される唯一の真実のソースとして定義されました。これには `frame-ancestors 'none'`、`X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy: no-referrer`、`X-XSS-Protection: 0` が含まれ、`vercel.json` のキャッチオールヘッダーおよびnginx設定ファイルによってミラーリングされます。Web3 ABIおよび検証は、`web3-validator` に `config({ jitless: true })` を指定したZod 4へ、`web3-eth-abi` には `abitype` へと移行しました。これによりコンパイラのエントリーポイントが削除され、CSP強化プラグインがランタイムでの `eval` や `Function` エイリアスの使用を制限します。

サプライチェーンの強化として、リリースから7日以上経過したパッケージのみを許可する `.npmrc` の設定、依存関係のリリース経過チェックスクリプト、Dependabotのクールダウン期間設定、Electronのプロダクション用不要ファイル削除、Playwrightの認証情報およびアーティファクトの除外が実施されました。ライブデプロイメント検証プローブ（`cspDeployments.env.spec.ts`、`tests/e2e/production-csp.live.spec.ts`）により、本番環境、開発環境、GitHub Pages、Surgeの各デプロイメントにおいて、ヘッダーの存在とログイン画面でのスクリプト制限がCSP違反ゼロで検証されています。

## ノードの最小バージョン、制限付きPostgRESTクエリ、およびシングルノードページネーションの親和性

メインネット、テストネット、Tor全体でのADM APIの最小バージョンが `0.10.0` に引き上げられました。IPFSノードの最小バージョンは、一般的なサービスの下限値に依存せず、`ipfsService.minVersion` (`0.1.0`) から明示的に読み取られるようになりました。再配置されたノードのフォールバックIPは `adamant-wallets` レジストリを介して同期されます。

リアルタイムのADM直接送金機能も改善されました。スキーマでは `withoutDirectTransfers` が整数列挙型に置き換えられ、WebSocket接続はアンロック時にチャットトランザクションタイプ `[0, 8]` をサブスクライブして即座に確立されます。送金ステータスは、チャットプレビュー、トランザクションリスト、送金カードコンポーネント間で同期が維持されます。

`EthIndexerClient.ts` を介したETHインデクサークエリでは、すべての `/ethtxs` リクエストに `limit`（デフォルト25）が強制され、ネイティブETHの検索は2つの制限付きインデックスクエリに分割されてクライアント側でマージおよび重複排除されます。また、同一タイムスタンプの境界を解決するために `getTimestampGroup` が導入されました。BTC、DOGE、DASHのクロスチェーンページネーションガードにより、アクティブなページネーションは複数のオペレーターにまたがることなく、単一のインデクサーに固定されます。永続化されたモジュール状態は、保存時にキャッシュされたトランザクションを削除し、ページネーションセッションのカーソルをリセットすることで、古いカーソルのズレを防ぎます。

![モバイル版ADMおよびIPFSノードの最小バージョンと設定アクション](/images/engineering-notes/github/discussions/11310133/001-bcf4ca3db8.webp)

*`0.10.0` 未満のADMノードおよびプレーンHTTPエンドポイントは非サポートとしてフラグ付けされ、IPFSノードは `ipfsNode.minVersion` (`0.1.0`) に対して検証されます。*

![デスクトップ版の分割ペインチャット。ADM送金ステータスの同期とプレーンテキストXSSサニタイズ](/images/engineering-notes/github/discussions/11310133/002-4dc1da2b89.webp)

*チャットプレビューのスペースと配信確認アイコンはタイプ0のADM送金と同期され、サニタイズされていないペイロードのプレビューは安全に不活性なテキストとしてレンダリングされます。*

![デスクトップ版ADMウォレットのトランザクションリスト](/images/engineering-notes/github/discussions/11310133/003-a42684a993.webp)

*ライブメインネットのトランザクションフィードと、ADM、ETH/ERC-20、BTC、DOGE全体にわたるシングルノードページネーションアーキテクチャ。*

## ビルドID、HTTP IPFSマルチハッシュフォールバック、および分離されたネットワーク設定

ビルド情報プラグイン (`virtual:adamant-build-info`) により、ビルドダイアログ内でサニタイズされた `version`、`branch`、`commit`、`prNumber`、`author`、`buildDate`、`isTestnet` が表示されます。また、ユーザーの認証情報と暗号化されたIndexedDBの状態を保持したままCacheStorageをクリアする「強制リフレッシュ」Service Workerアクションが追加されました。テストネットビルドには明示的な `TESTNET` バッジが表示されます。

`crypto.subtle` が利用できない `.onion` ミラーなどのプレーンHTTPコンテキストでは、IPFS添付ファイルのフォールバックとして `@noble/hashes` によるSHA-256マルチハッシュ導出が使用されます。ネットワーク設定は `src/config/mainnet.json` に統合され、仮想モジュールを通じて公開されるため、サポートされていないViteモードやネットワーク間での設定漏洩はビルド時に失敗するようになっています。

![強制リフレッシュ、8言語セレクター、テストネットログインインジケーターを備えたBuildInfoDialog](/images/engineering-notes/github/discussions/11310133/004-4f8da5e80c.webp)

*強制リフレッシュ、8言語ドロップダウン、およびテストネットデプロイメント上の明確なTESTNETマーカーを備えたログインビルドダイアログ。*

## 8言語対応と完全なアラビア語RTLサポート

本リリースでは、スペイン語、フランス語、日本語、アラビア語の翻訳が追加され、ドイツ語、ロシア語、簡体字中国語の監査が完了しました。これにより、8つのロケールファイルすべてでキーの完全な整合性（各ロケール418個のリーフキー）が確保されています。`applyLocale()` 関数は `vue-i18n`、`dayjs`、Vuetifyのロケール、`dir`、`lang` を同期し、アラビア語、フランス語、ロシア語の100以上の数詞に対する正確な複数形ルールを追加しました。また、アラビア語の日付には `ar-u-nu-latn` 数字を選択し、`navigator.languages` からローカルの言語を自動検出します。

アラビア語の完全なRTLレイアウトは、Vuetifyの `rtl: { ar: true }` を介して有効化され、方向性アイコンコンポーネントによるナビゲーション矢印のミラーリング、ビュー全体でのCSS論理プロパティの使用、およびユーザーが作成したメッセージへの `dir="auto"` の適用が行われます（パスフレーズはLTRで強制されます）。回帰テスト（`RtlUiContract.spec.js`、`chat-rtl-layout-regression.spec.ts`）により、将来的なレイアウト崩れを防ぎます。

![チャット、ADM送金付きアクティブチャット、設定画面におけるアラビア語RTLモバイルビュー](/images/engineering-notes/github/discussions/11310133/005-94937d5ba6.webp)

*ラテン数字を使用した右寄せのチャットリスト、RTLチャットビュー内のミラーリングされた方向性アイコン付きアクティブ送金カード、およびミラーリングされた設定階層。*

![スペイン語、フランス語、日本語の設定画面](/images/engineering-notes/github/discussions/11310133/006-867e6e8b17.webp)

*ライブデプロイメント上で418個のUI文字列すべてが一致しているスペイン語、フランス語、日本語の設定画面。*

## パッケージングおよびプラットフォームに関する注記

Androidターゲットは `compileSdkVersion` および `targetSdkVersion` 36 にアップグレードされ、`minSdkVersion` は 24（Android 7.0以降）に引き上げられました。また、AGP 8.13.0、Gradle 8.14.3、Cordova Android 14.0.1 (`versionCode` 41201) を採用しています。

macOSでは、Appleによって開発者アカウントがブロックされたため、現在CIによる公証（notarization）は無効になっています。デスクトップ用の `.dmg` インストーラー（x64、arm64、universal）は引き続きDeveloper IDで署名されており、初回起動時にシステム設定 → プライバシーとセキュリティ → 「このまま開く」からインストール可能です。adamant.im 上のiOS App Storeボタンは、一時的にクリック不可となっており、その旨の通知が表示されています。

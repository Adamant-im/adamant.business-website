---
title: "ADAMANT v9.0.0によるCEX上場トークン向けのセルフホスティングマーケットメイキング"
slug: "your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
description: "CEX上場後、薄いオーダーブックや広いスプレッドに悩む発行体向け。ADAMANT v9.0.0で自己管理型マーケットメイキングを実現。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
publishedAt: "2026-07-02T07:55:48.528Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/42fcfb71beb3/001-1-abbad98f8omjn6vedmkhag-png.webp"
cardSpan: "full"
originalId: "medium:42fcfb71beb3"
locale: "ja"
placeholder: false
---

CEX上場後、トークン発行体はしばしば薄いオーダーブック、広いスプレッド、小さな取引でも価格が大きく動くチャートに直面します。従来の対策は、第三者のマーケットメーカーや不透明なインフラにトークンを貸出し、APIキーを共有することです。ADAMANT Market-Making Software v9.0.0はそれとは異なる選択肢を提供します。通常のソフトウェアのようにインストールできる、自己ホスト型で自己管理可能なマーケットメイキングスタックです。git cloneは不要で、資産の管理権を第三者に渡す必要もありません。

### モデル：セルフホスト、セルフコントロール

従来のマーケットメイキングでは、通常、第三者にトークンを送金し、ブラックボックス型のシステムにAPIキーを共有して、オーダーブックが健全に見えるようにし、資産を回収できるよう願うという流れになります。ADAMANTはこのモデルを逆転させ、ユーザー自身のサーバー上で、自身の取引所アカウントと自身のキーを使ってマーケットメイキングスタックを実行します。

![Your Token Deserves a Real Market — Not a Loan to a Black-Box Market Maker](/images/engineering-notes/medium/42fcfb71beb3/002-1-ej9ccmio-dhslxvzftc6xw-png.webp)

Custody MMとADAMANTのマーケットメイキングソフトウェアの比較

### v9がチャートに与える影響

無料のオープンソース版は、上場直後に特に重要な課題に焦点を当てています。オーダーブックの隙間を埋めることで、ブックが放置されていないように見せ、不快な第一印象を与えないようにスプレッドを狭く保ち、小さな取引でも価格が急変しないよう十分な流動性を提供します。ユーザーが定義した価格帯を監視し、スプレッド、オーダーブック、流動性、最適化モードにわたってボリュームポリシーを適用します。監視は透過的で、ADAMANT Messengerを通じてコマンドベースで残高、注文、統計を確認できます。デフォルトでは、公開可能な管理画面は一切露出しません。

OSSビルドでサポートされているCEXコネクタには、Azbit、P2PB2B、StakeCube、Coinstore、FameEX、NonKYCが含まれます。プレミアムおよびカスタムコネクタは、追加の取引所向けに利用可能です。

### 導入手順（npm経由）

LinuxサーバーまたはMac（またはnpmを提供する任意のマシン）、Node.js 22+、MongoDB、および自身のアカウント用CEX APIキーが必要です。

![Your Token Deserves a Real Market — Not a Loan to a Black-Box Market Maker](/images/engineering-notes/medium/42fcfb71beb3/003-1-duiackkmcteg8he9ccmqdq-png.webp)

公式npmレジストリ

パッケージをグローバルにインストールし、作業ディレクトリを作成します：

```bash
npm install -g adamant-tradebot
mkdir my-mm && cd my-mm
```

CLIコマンドは `mm` です。対話型ウィザードでボットを設定し、次にヘルスチェックを実行します：

```bash
mm init    # interactive wizard - exchange, pair, API keys
mm doctor  # checks config, MongoDB, exchange API
```

マーケットメーカに資金を提供するために取引所からトークンを移動する必要はありません。自身のマシン上のボットに自身のAPI資格情報を接続するだけです。起動してステータスを確認します：

```bash
mm on
mm status
```

ADM管理者アカウントからボットに `/balances` を送信すれば、即座に稼働します。いつでも `mm off` で停止でき、`mm logs` でログを確認できます。

### Docker代替案

GitHub Container Registryから公開済みのイメージを取得することもできます：

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

MongoDBはアプリケーションとComposeで連携動作し、設定ファイルとログはユーザーが制御するローカルボリュームに保存されます。

### v9がマイルストーンである理由

v9以前は、リポジトリをクローンして依存関係を手動で構築する必要があり、開発者には適していますが、健全なオーダーブックをすぐに欲しい創業者にとってはハードルが高かったのです。v9.0.0では、npmおよびGHCRによる正式な配布、`init`、`on`、`off`、`doctor`、`status`、`logs`、`config` コマンドを備えた `mm` CLI、GitHubリリースごとのCIによるnpmおよびDockerの自動公開、トレーダー、オーダーブックビルダー、流動性プロバイダー、価格ウォッチャーをカバーするリファクタリング済みエンジン、Jestテストスイート、およびドキュメントが提供されています。

ADAMANTは10年にわたり公開開発を続けているオープンソースの暗号資産プロジェクトです。

### 対象ユーザー

このソフトウェアは、CEX上場後、弱いまたは空のオーダーブックに直面しているトークン発行体、高額のリテンション料やトークン貸出ができないチーム、不透明な第三者にキーを渡すことを信頼できない創業者、コードを読め、ログを確認でき、キルスイッチを自ら所有したい透明性を求めるプロジェクト向けです。高度な戦略、Web UI、追加取引所、または手厚いセットアップ支援にはプレミアムモジュールがあります。無料のOSS版は、単体でも意図的に十分な有用性を持たせています。

### 責任に関する注意

マーケットメイキングは取引所の規則および適用される法律に従う必要があります。ADAMANTは、資産の管理や取引の執行ではなく、ソフトウェアを提供します。ユーザーが設定し、実行し、その使用方法について責任を負い続けます。

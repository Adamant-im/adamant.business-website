---
title: "ADAMANT mm Bot v10.0: トークンプロジェクト向け、自律型・セルフホスト型マーケットメイキング"
slug: "adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minute-440f435ebf95"
description: "トークンの流動性問題：中央集権型取引所への上場は、流動性の欠如という厳しい現実を突きつけます。ADAMANT TradeBot v10.0.0は、資産の管理権を保持したまま、機関投資家レベルのマーケットメイキングを自動化します。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minutes-440f435ebf95"
publishedAt: "2026-11-11T07:09:05.209Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:440f435ebf95"
coverImage: "/images/engineering-notes/medium/440f435ebf95/001-9e1cee5966.webp"
locale: "ja"
placeholder: false
---

## トークンの流動性問題

トークン創設者にとって、中央集権型取引所への上場は、流動性がなければトークンは事実上死んでいるという厳しい現実を突きつけます。継続的な流動性と目に見える取引高がなければ、プロジェクトはアグリゲーターのランキングから脱落し、アービトラージボットによってスプレッドが拡大し、スリッページを嫌気した個人投資家が離れていきます。従来の手法は、マーケットメイキング専門業者を雇い、月額5,000ドルから30,000ドル以上の報酬を支払い、トークンやステーブルコインの管理権を第三者に委ねることでした。しかし、多くのプロジェクトが、市場の混乱期にトレジャリー（財務）トークンを投げ売りされたり、マーケットメイカーが姿を消したりする事態を経験しています。

その代替案が、自律的なセルフホスト型マーケットメイキングです。ADAMANT TradeBot v10.0.0を使用すれば、月額5ドルのVPSやDockerコンテナ上で、機関投資家レベルの完全自動マーケットメイカーを5分以内に稼働させることができます。しかも、トークンの管理権を他者に移転する必要はありません。

## ノンカストディアル設計

核となる哲学は、完全な財務的自律性です。ADAMANT TradeBotは、完全にユーザー自身のシングルテナント環境で実行されます。ボットが必要とするのは基本的な読み取りと取引のAPI権限のみであり、出金権限は厳格に無効化・禁止されています。トークンやステーブルコインをADAMANTや代理店、スマートコントラクトに送る必要は一切ありません。トークンは取引所アカウントから離れることはなく、注文計算、アルゴリズムによるスプレッド調整、残高照合はすべてローカルで実行されます。スプレッド、目標取引高、価格帯などは、ADAMANT MessengerインターフェースやWebUI APIを通じて即座に変更可能です。

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR INFRASTRUCTURE                      │
│            ($5/mo VPS, Private Server, or Docker)           │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 ADAMANT mm bot                      │   │
│   │  [ Trader ]   [ OrderBook ]  [ Liquidity ]  [ Watcher]│ │
│   └──────────────────────────┬──────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────┘
                               │ API Keys
                               │ (Trade Permissions ONLY)
                               │ ❌ No Withdrawal Access
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     CENTRALIZED EXCHANGE                    │
│     (Gate, Coinstore, XT, NonKYC, MEXC, etc.)               │
│                                                             │
│  🔒 Tokens never leave your exchange account                │
│  📊 Orders placed directly via signed REST / WebSocket      │
└─────────────────────────────────────────────────────────────┘
```

## 4つのアルゴリズムエンジン

オープンソース版には、マーケットメイキングのあらゆる側面を処理する4つの同期エンジンが搭載されています。

**Trader（トレーダー）**エンジンは、スプレッド内または板の深さで自己売買を実行し、一貫性のある自然な取引高を生成します。これにより、資本を流出させることなく、CoinMarketCapやCoinGeckoなどのアグリゲーター上でプロジェクトをアクティブに保ちます。

**Order Book Builder（板構築）**エンジンは、階層化された買い注文と売り注文を継続的に配置、シフト、置換します。これにより、有機的な価格変動を伴う密度の高いリアルな板を生成し、二次市場でよく見られる「スカスカな板」の状態を回避します。

**Liquidity Provider（流動性提供）**エンジンは、スリッページから板を守ります。利用可能な残高から最適な流動性配分を計算し、定義されたスプレッド内で深度注文を配置することで、コミュニティの買い手と売り手が公正な約定を得られるようにします。

**Price Watcher（価格監視）**エンジンは、BinanceやDEX、主要な取引ペアなどの参照市場全体でトークン価格を監視します。外部価格が変動した場合、ローカルの価格帯や注文レンジを自動的に調整し、他取引所とのアービトラージによって流動性が枯渇するのを防ぎます。

## v10.0.0の新機能

バージョン10.0.0は、プロジェクト史上最も重要なアーキテクチャの刷新であり、エンタープライズレベルの信頼性、安全性、サプライチェーンの完全性に焦点を当てています。

**同時実行を考慮した反復ロック（Iteration locking）**は、高頻度ボットにおいて重複注文や状態の不整合を引き起こす最大の原因である「実行ティックの重複」に対処します。v10.0では `helpers/moduleIteration.js` が導入され、厳格なロックが実装されました。反復処理が取引所のAPIレスポンスを待機している場合、次のティックは同時実行されずに確実に延期されます。また、反復処理は `finally` ブロックから安全に再スケジュールされるため、一時的なネットワーク切断時にもボットがハングアップしたりクラッシュしたりすることはありません。

**Azbitコネクタ**は完全に書き直されました。マイクロ秒単位のタイムスタンプを用いたネイティブなHMAC-SHA256署名生成、Azbitのロットおよびティック仕様に準拠した正確な小数点調整、スロットル制限時の堅牢なエラーリカバリを備えた即時残高キャッシュ無効化機能が実装されています。

**Inactivity Guard（非アクティブ保護）**は、ホストサーバーの再起動や接続切断が発生し、ボットがオフラインの間に市場が大きく動いた場合のシナリオから保護します。起動時にハートビートのタイムスタンプを確認し、ダウンタイムが安全しきい値を超えている場合はセーフモードをトリガーして、古い注文の実行を防ぎます。

**構造化ログローテーション**は、Winstonによる日次ローテーションを採用し、自動gzipアーカイブ、構成可能な保持ポリシー、およびAPIシークレットがログファイルに漏洩しないためのサニタイズ処理を備えています。

**エンドツーエンドのサプライチェーンセキュリティ**も本リリースの特徴です。GitHub Container Registryに公開されるDockerイメージにはSigstoreによる来歴証明（provenance attestation）が含まれ、npmパッケージはOpenID Connectによる信頼された公開プロセスを通じて、npmjs.com上で完全なビルド来歴と共に公開されます。

## デプロイメント

デプロイメントは、グローバルなnpm CLIまたはDockerを使用して簡単に行えます。

CLIを使用する場合は、Node.js 22以上がインストールされていることを確認し、インストール、初期化、起動コマンドを実行してください。

```
# 1. Install the bot globally
npm install -g adamant-tradebot

# 2. Initialize your configuration
mm init

# 3. Configure your exchange API keys & token pair
nano config/config.default.jsonc

# 4. Start the market maker
mm start

# 5. Check live status
mm status
```

Dockerを使用する場合は、来歴が検証されたコンテナをプルして実行してください。

```
docker run -d \
  --name adamant-tradebot \
  --restart unless-stopped \
  -v $(pwd)/config:/app/config \
  -v $(pwd)/logs:/app/logs \
  ghcr.io/adamant-im/adamant-tradebot:10.0.0
```

---
title: "ADAMANT Tradebot 8.0：自己ホスティング型マーケットメイキングのためのより強固な基盤"
slug: "adamant-market-making-software-8-0-a-stronger-foundation-for-your-token-s-market-presence-c8032a1a7d38"
description: "ADAMANT Tradebotのv8.0は数年ぶりの大型アップデート。トークン発行者にとって、上場と実需市場のギャップを埋める強力なツールです。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-software-8-0-a-stronger-foundation-for-your-tokens-market-presence-c8032a1a7d38"
publishedAt: "2026-06-26T15:58:19.696Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/c8032a1a7d38/001-0-qywflgfw1krzccj5-png.webp"
cardSpan: "full"
originalId: "medium:c8032a1a7d38"
locale: "ja"
placeholder: false
---

バージョン8.0は、オープンソースのADAMANT Tradebotにとって数年ぶりの最大規模のアップデートです。トークン発行者にとって、上場していることと実際の取引市場を持つことの間には明確なギャップがあります。薄いオーダーブックはトレーダーを遠ざけ、広いスプレッドはすべてのスワップを高価にし、注文板の隙間は無関心に映ります。このボットは、トークンが実際に上場している取引所でスプレッド、流動性、取引高のポリシーを維持することで、このギャップを埋めます。

基本的な価値提案は変わりません。ユーザーはVPS上にボットを自己ホスティングし、インフラを離れないAPIキーで取引所に接続し、誰がコマンドを送れるかを制御できます。バージョン8.0は、ボットをより信頼性が高く、セキュアで、長期運用しやすくすることを目指しており、常に監視が必要な存在から、無人で動作するインフラへと進化させます。

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/002-1-swca0-a2gacbe1zvi17jjq-png.webp)

### 運用セキュリティ

バージョン8.0では、クリティカル／ハイのセキュリティ監査結果を持つ依存関係を更新し、オプションの管理用APIに対するアクセスパターンを厳格化し、商用製品ラインで使用されているのと同じエンジニアリング基準にコードベースを整合させました。ただし、プレミアム専用機能は含まれていません。取引所のAPIキーはADAMANTやSaaSダッシュボードに送信されることはありません。

### 管理インターフェース

ボットはADAMANT Messenger（元からの暗号化・分散型コマンドチャネル）、Telegram（プレミアム版で利用可能）、および現在開発中のWeb UIを通じて制御できます。内部では、バージョン8.0にFastifyベースのモダンなプライベートWebUI APIが追加され、JWT認証、リクエストスキーマの検証、WebSocketによるリアルタイム更新をサポートしています。ほとんどの運用者にとってこれは見えない部分ですが、Web UIを有効にすると、より高速で信頼性の高い管理体験が得られます。

日常的な操作はこれまで通り：残高の確認、スプレッドの調整、取引高ポリシーの有効化、価格範囲の設定、市場が異常なときにモジュールの一時停止などです。違いは、その下で動作するボットがこれらのコマンドをより予測可能に処理するようになった点です。

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/003-1-6ltktmqgyhhs6pniej4dcq-png.webp)

### 取引所サポート

オープンソース版のボットは、Azbit、P2PB2B、StakeCube、Coinstore、FameEX（FameEXnet経由 — v8.0で更新されたコネクタ）、NonKYCという、絞られた中心化取引所をサポートしています。FameEXユーザーは、ボットが現在FameEXnetと通信するようになったため、単なる`git pull`ではなく、計画的なコネクタ切り替えが必要であることに注意してください。無料版のボットは、REST優先のアプローチでスポット市場に焦点を当てており、先物取引などの複雑な機能は含まれません。より広範なCEX対応や高度な戦略モジュールは、プレミアム製品ラインに含まれます。

### 内部の変更点

従来のモノリシックなコマンドハンドラーは、目的別に分割されたモジュールに再設計されました。ADAMANTのトランザクション受信処理は`adamant-api` 3.x上で再構築されました。起動時にはデータベース接続を待機し、自動マイグレーションにより旧バージョンの注文データを安全にアップグレードし、取引所のメタデータを事前読み込みした後で、ようやく取引ループを開始します。

ランタイムはNode.js 22.2+、MongoDBドライバー7.x、更新されたHTTPスタックを対象としています。プライベートWebUIレイヤーはJWT、スキーマ検証、IP許可リスト、およびlocalhost優先のデフォルト設定を採用しており、管理の利便性が攻撃面になることを防ぎます。新しい自動テストスイートはWebUI APIとコアヘルパーをカバーし、技術チームによるアップグレードがより安心なものになっています。

### アップグレード方法

新規プロジェクトは以下で開始できます：

```bash
git clone https://github.com/Adamant-im/adamant-tradebot
cd adamant-tradebot
npm i
cp config.default.jsonc config.jsonc
# edit config.jsonc - pair, API keys, spread/volume settings
npm start
```

既存のv7.x環境では、ボットを停止し、pullして再インストールし、`config.default.jsonc`から`config.jsonc`へ新しいフィールドをマージしてから再起動してください：

```bash
pm2 stop tradebot
git pull
npm i
# merge new config.default.jsonc fields into your config.jsonc
pm2 restart tradebot
```

本リリースは[Github PR #110](https://github.com/Adamant-im/adamant-tradebot/pull/110)で追跡されており、アッパーバーイシュー[#109](https://github.com/Adamant-im/adamant-tradebot/issues/109)をクローズしています。完全なインストール手順およびコマンドリファレンスは[marketmaking.app](https://marketmaking.app/cex-mm/installation/)で確認できます。

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/004-0-fcjgeqhiqq-h0grv-png.webp)

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/005-0-8ihrvb-is-qsshbb-png.webp)

---
title: "ADM-Paymentの紹介：支払い、サブスクリプション、ソフトウェアライセンスのための暗号資産最適化プラットフォーム"
slug: "introducing-adm-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-46b6f4ec4e95"
description: "ADM Paymentは、Web3、トレーディング、SaaS、自動化向けに、切断されたサービスの連鎖に依存せずにソフトウェア収益化を可能にする自己ホスティング型プラットフォームです。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-a-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-licensing-46b6f4ec4e95"
publishedAt: "2026-06-10T16:33:29.168Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/46b6f4ec4e95/001-1-ikwbquslxdsnxlvmcfgy5a-png.webp"
cardSpan: "full"
originalId: "medium:46b6f4ec4e95"
locale: "ja"
placeholder: false
---

### ADM-Paymentの紹介

ソフトウェアの収益化に、分断されたサービスの不安定な連鎖を必要とすべきではありません。多くの製品——特にWeb3、トレーディング、SaaS、自動化、セルフホスト型インフラストラクチャにおいて——真の課題は支払いを受け取ることではなく、認証、チェックアウト、請求ロジック、サブスクリプション、ライセンス配布、ライセンス検証、管理操作、ユーザー管理、更新、トライアル、製品アクセスなどを含む完全な商用フローを管理することです。

ADAMANT Payment（*ADM-Payment*）は、支払い、サブスクリプション、ソフトウェアライセンス管理のための、暗号資産（crypto）を最優先に設計されたユニバーサルなセルフホスト型プラットフォームです。現在は開発中の状態でリリースされており、利用可能なベータ版が提供されています。このプラットフォームは、ADAMANT Messengerや特定のアプリケーションに縛られない、独立した製品として設計されています。最初の内部統合ターゲットはADAMANT Tradebot WebUIのサブスクリプションですが、ボット、SaaSプラットフォーム、デスクトップアプリケーション、Web3サービス、プライベートツール、商用API、セルフホスト型ソフトウェアなど、はるかに広い範囲の製品向けに構築されています。

### 開発の背景

現代のソフトウェア収益化スタックの多くは、伝統的な法定通貨決済を前提に設計されています。これは多くのビジネスには適していますが、製品が暗号資産ネイティブ、グローバル、セルフホスト型、プライバシー重視である場合、または従来の銀行インフラに依存したくないユーザー向けに販売される場合には制限が生じます。典型的な構成では、認証、支払い、サブスクリプション、ライセンスキー用に個別のサービスが必要になり、製品アクセス用のカスタムスクリプト、ゼロから構築された管理パネル、Webhook、コールバック、データベースの接合、手動サポートフローなども必要になります。

ADM-Paymentは、これらの要素を1つの整合性のあるプラットフォームに統合します。製品所有者は、プランの定義、暗号資産による支払いの受付、ライセンスの発行、ユーザー管理を行い、外部ソフトウェアがAPIを通じてアクセスを検証できるようになります。これにより、収益化レイヤーを繰り返し再構築する必要がなくなります。

### コアモジュール

このプラットフォームは、認証、請求、暗号資産決済、トライアルおよび有料ライセンス、サブスクリプション、プロモーションおよび手動ライセンス、ユーザー向けWebポータル、管理ダッシュボード、ライセンス検証API、製品ブランド化、国際化、運用セキュリティ機能を、1つのセルフホスト可能なソリューションに統合しています。

支払いは、後付けではなく、設計上から暗号資産を最優先としています。現時点の範囲には、セルフホスト型BTCPay Server経由のBitcoin支払い、一意の入金アドレスとオンチェーン監視機能を備えたネイティブADAMANT支払い、およびフローのテスト用の開発用プロバイダーが含まれます。アーキテクチャは、追加の支払いプロバイダー（Ethereum、ERC20、ステーブルコイン、その他）およびブロックチェーンを、請求コアを再構築することなく後から追加できるように設計されています。

![Sign in with Ethereum wallet](/images/engineering-notes/medium/46b6f4ec4e95/002-1-uvvnwb38hzdf94wtr5rkra-png.webp)

![Accepting payments in crypto](/images/engineering-notes/medium/46b6f4ec4e95/003-1-18j1i2bwffpurrfyebeoqg-png.webp)

ユーザーにとってADM-Paymentは、ログイン、カタログ閲覧、チェックアウト、ライセンス管理のための明確なWebインターフェースを提供します。製品所有者には、アカウント、ライセンス、請求書、ウォレット、プラン、アクセス権限を管理するための管理ダッシュボードを提供します。外部ソフトウェアには、APIベースのライセンス検証を提供するため、ボット、SaaSバックエンド、リレー、デスクトップアプリ、その他の製品がプログラムでユーザーのアクティブアクセスを確認できます。

### ターゲットユースケース

ADM-Paymentは、単なる支払いページではなく、収益化のためのレイヤーです。ライセンスベースのアクセス、サブスクリプションプラン、取引所や市場ごとの制限、プライベート展開を必要とするトレーディングボットや自動化ツールに特に有用です。トレーディングボット開発者はBasic、Pro、Enterpriseなどのプランを作成でき、ユーザーは暗号資産で支払い、ライセンスを受け取り、ボットはAPIを通じてアクセスを検証します。ライセンスは、取引所や取引ペアといった製品固有のパラメータでスコープを設定可能であり、単純な「支払い済み／未払い」モデルを超えたきめ細かいアクセス制御が可能です。

暗号資産ネイティブユーザーを持つSaaS製品にとっては、従来の決済プロセッサーに完全に依存することなく、暗号資産の受付、サブスクリプション管理、アクセス制御を行う手段を提供します。デスクトップアプリケーションやプライベートツールは、検証APIを呼び出してライセンスの有効性を確認することで、ライセンスおよび請求バックエンドとして利用できます。Web3サービスは、従来のメールベースのログインに加えて、ADMおよびEthereumウォレットによるログインを含む、暗号資産指向の認証フローの恩恵を受けられます。セルフホスト型の商用製品は、クローズドなライセンスSaaSに依存するのではなく、自らのルールに合わせてプラットフォームを展開・カスタマイズできます。

プラットフォームは、定義されたスコープごとに1回のトライアルというルールを強制しつつ、自動登録をサポートしています。また、有料、トライアル、プロモーション、手動ライセンスの各タイプを備えており、データベースを直接編集せずに運用者が柔軟に対応できます。ブランド化は環境変数で設定可能であり、データモデルはハードコードされたADAMANT固有の想定ではなく汎用的な製品スラグを使用しているため、複数の製品にまたがるホワイトラベル展開に適しています。

### 技術アーキテクチャ

ADM-Paymentは、`pnpm`およびTurborepoを使用したモダンなモノレポとして構築されています。v1.0.0の範囲には、Fastify 5 APIバックエンド、Prisma ORM、PostgreSQLデータベース、React 18フロントエンド（Vite使用）、ユーザー用Webアプリと管理用アプリの分離、共通ロジック用の共有パッケージ、JWTセッションとリフレッシュクッキー、ADMメッセージコード認証、Ethereum SIWE認証、メールとパスワード認証、Turnstileキャプチャ、Bitcoin支払いのためのBTCPay Server統合、一意の入金アドレスとオンチェーンウォッチャーを備えたネイティブADAMANT支払いプロバイダー、べき等Webhook、管理APIキー、オプションの2FA、IPおよびフィンガープリントによるロックアウト、監査ログ、i18nローカライゼーション、インストール、Prisma生成、ビルド、lint、型チェックのためのGitHub Actions CIが含まれます。

アーキテクチャは、ユーザー向け領域と管理向け領域を分離しています。外部製品は、ライセンスの検証やサブスクリプション状態の確認のためにAPIエンドポイントを通じてプラットフォームと連携します。このAPIファーストのアプローチにより、ADM-Paymentはチェックアウトページにとどまらず、他のソフトウェアが依存できるバックエンドサービスとなります。

セキュリティ制御はアーキテクチャレベルで組み込まれています：ユーザーと管理者の領域の分離、保護された認証フロー、アクセス制御、安全なライセンス検証API、管理APIキー、オプションのADMおよびETH 2FA、キャプチャサポート、IPおよびフィンガープリントによるロックアウト、監査ログなどです。ウォレットベースの認証により、ユーザーはメールのみのアカウントに強制されることなく、暗号資産のアイデンティティフローで認証できます。一方で、従来のユーザー向けにはメールとパスワードによるログインも引き続き利用可能です。

### 現在の状況

ADM-Paymentは開発中のプロジェクトであり、利用可能なベータ版が提供されています。基盤はすでに使用可能ですが、フローの洗練、ドキュメントの拡充、実際の統合からのフィードバック収集を通じて、引き続き改善が進められています。現在のリリースの方向性はv1.0.0のプラットフォーム基盤であり、最初の本番環境統合はADAMANT Tradebot WebUIのサブスクリプションに焦点を当てています。ロードマップには、追加の支払いプロバイダー、追加のチェーン、OpenAPIドキュメント、サブスクリプションの自動更新、サードパーティ製品との統合が含まれます。

### スクリーンショット

![User interface: Sign in options](/images/engineering-notes/medium/46b6f4ec4e95/004-1-cqwvqqbxknkp-uvuuknxrq-png.webp)

![User interface: Subscription plans](/images/engineering-notes/medium/46b6f4ec4e95/005-1-t37cypcdhaysabgjilzivg-png.webp)

![User interface: Licenses](/images/engineering-notes/medium/46b6f4ec4e95/006-1-3kfx3yvszqtpokjjjvsexa-png.webp)

![Admin dashboard: Accounts](/images/engineering-notes/medium/46b6f4ec4e95/007-1-bp6rl5dl-yi5cq0-elmo1q-png.webp)

![Admin dashboard: Licenses](/images/engineering-notes/medium/46b6f4ec4e95/008-1-wpdhnvtgoltez8bgcjxjyg-png.webp)

![Admin dashboard: Invoices](/images/engineering-notes/medium/46b6f4ec4e95/009-1-o-3ouw6yormfxhtyk3npbw-png.webp)

![Admin dashboard: Manual license issue (option)](/images/engineering-notes/medium/46b6f4ec4e95/010-1-kg3c6muwymo6kftbchh2jg-png.webp)

![Admin dashboard: ADM payments](/images/engineering-notes/medium/46b6f4ec4e95/011-1-ypzmklcvz81nqi7rh7fyrg-png.webp)

![Admin dashboard: BTC payments](/images/engineering-notes/medium/46b6f4ec4e95/012-1-pygj4qnhxawlioosdttx5a-png.webp)

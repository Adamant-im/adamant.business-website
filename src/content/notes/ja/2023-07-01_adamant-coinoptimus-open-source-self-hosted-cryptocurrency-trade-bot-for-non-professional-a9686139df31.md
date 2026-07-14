---
title: "ADAMANT CoinOptimus: オープンソースのセルフホステッド暗号資産取引ボット"
slug: "adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-a9686139df31"
description: "ADAMANT CoinOptimusは、鍵の管理を第三者に委ねることなく自動取引をしたい一般ユーザー向けのセルフホステッド暗号資産トレードボットです。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-traders-a9686139df31"
publishedAt: "2023-07-01T12:39:55.877Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/a9686139df31/001-0-ygfhry-dhfu9rszm.webp"
cardSpan: "full"
originalId: "medium:a9686139df31"
locale: "ja"
placeholder: false
---

ADAMANT CoinOptimusは、非専門のトレーダー向けに設計されたセルフホステッドの暗号資産取引ボットです。第三者サービスにAPIキーを預けることなく、自動取引を実現できます。ユーザー自身のサーバー上で動作するため、プライバシーを重視するユーザーでも取引所のAPI資格情報を完全に管理下に置けます。また、カジュアルな暗号資産愛好家だけでなく、注文ブックの充実や流動性向上を目的としたプロジェクト運営者やマーケットメーカーにも、ラダー／グリッド戦略の採用により適しています。

ボットはNode.jsで構築され、VPS上で常時稼働します。`config.jsonc`ファイルで対象取引所と取引ペアを設定し、APIキー（可能であれば出金権限のない取引専用キー）を提供します。ボットの操作はADAMANT Messengerを通じてスラッシュ付きコマンドで行います。リアルタイムの取引通知はADAMANT Messenger、Slack、Discordに送信可能です。初回リリース時からBinance、Bitfinex、P2PB2B、Azbit、StakeCubeをサポートしています。

### ラダー／グリッド戦略

CoinOptimusは主に最適化されたラダー／グリッド戦略を採用しています。ボットはスプレッドから始まる複数の買い注文と売り注文を配置します。最も近い注文が約定すると、反対側に同条件の注文を再配置し、売りは買いより高く、買いは売りより低い価格で取引を行う原則に基づいています。この戦略はボラティリティの高い市場で特に有効です。

![ADAMANT CoinOptimus: オープンソースのセルフホステッド暗号資産取引ボット for 非専門トレーダー](/images/engineering-notes/medium/a9686139df31/002-0-tfo-ftrmwbt1zl7r.webp)

![ADAMANT CoinOptimus: オープンソースのセルフホステッド暗号資産取引ボット for 非専門トレーダー](/images/engineering-notes/medium/a9686139df31/003-0-2twg79hid4ph-cia.webp)

### インストールと設定

CoinOptimusはUbuntu 18–22およびCentOS 8を対象としており、Node.js v16+とMongoDB v6+が必要です。インストールには[GitHubリポジトリ](https://github.com/Adamant-im/adamant-coinoptimus)のクローンと`npm install`の実行が必要です。設定は`config.jsonc`ファイルで行い、ボットのADAMANTパスフレーズ、コマンド発行を許可する管理者アカウントのアドレス、取引所情報、APIキーを指定します。Gitでソースコードを更新する際は、デフォルト設定ファイルの変更点を`config.jsonc`に反映し、その後ボットを再起動してください。

### ADAMANT Messengerによる操作

ボットは12語のパスフレーズで保護されたADAMANTブロックチェーンアカウントを使用します。インストール後、ADAMANT Messengerからコマンドを送信して操作します。たとえば、`/buy ADM/USDT amount=200 price=0.005`と送信すると、200 ADMを0.005 USDTで購入する注文を出します。ラダー戦略を6つの注文、3%の価格間隔、1注文あたり約100 USDTで開始するには、`/start ld 100 USDT 6 3%`と入力します。コマンドの完全なリファレンスは[CoinOptimus Wiki](https://github.com/Adamant-im/adamant-coinoptimus/wiki)に記載されています。

![ADAMANT CoinOptimus: オープンソースのセルフホステッド暗号資産取引ボット for 非専門トレーダー](/images/engineering-notes/medium/a9686139df31/004-0-jinplg771dicgjt7.webp)

### 免責事項

CoinOptimusは利益を保証するものではありません。ご利用は自己責任でお願いします。

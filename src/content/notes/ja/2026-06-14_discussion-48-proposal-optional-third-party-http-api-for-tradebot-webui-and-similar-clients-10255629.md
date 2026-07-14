---
title: "提案：TradeBot向けオプションのサードパーティHTTP API"
slug: "discussion-48-proposal-optional-third-party-http-api-for-tradebot-webui-and-similar-clients-10255629"
description: "この提案では、ADAMANT MessengerやTelegramに依存せずにトレードボットを監視・制御可能なオプションのBot API v1を導入します。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/48"
publishedAt: "2026-06-14T12:09:43Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255629"
locale: "ja"
placeholder: false
---

この提案では、外部クライアント（例えばグラフィカルなWebUIなど）がADAMANT MessengerやTelegramに頼らずにトレードボットを監視および制御できるようにするオプションのBot API v1を導入します。このアーキテクチャでは、WebUIはボットAPIとのみ通信を行い、ティッカー、注文帳、取引、OHLC、アカウント状態、取引パラメーター、コマンド実行といった市場データに関してボットが真の唯一の情報源となるようにします。

このAPIは、設定内の`private_webui`ポートを利用して、ボット上にオプションの受信HTTPおよびWebSocketインターフェイスを提供することを目的としています。認証は、`private_webui_secret_key`を使用してボット側で検証されるJWTによって処理され、ユーザーのアカウントは外部クライアント側に保持されます。APIは、市場データ、アカウント、パラメーターデータ用の構造化されたJSONエンドポイントとコマンドラッパーを公開します。`GET /bot`エンドポイントはブートストラップとして機能し、インストール済みの`mm_*.js`モジュールや取引所の機能フラグといった機能情報を返します。リアルタイムでの取引パラメーター変更には、WebSocketの`params:updated`イベントを利用できます。トランスポートモードは、自己ホスト型クライアント向けの`directHttp`を初期サポート対象とし、サブスクリプションホスティング用の`relayWs`は後続の段階で計画されています。

本議論では、支払い、課金、ライセンスUIや特定のWebUI実装の詳細については対象外とします。コミュニティの皆様には、このAPIをオープンソースの`adamant-tradebot`リポジトリ内にオプションモジュールとして含めるべきかどうか、メッセンジャーコマンドに加えて最小限の有用なクライアントに必要なエンドポイントは何か、v1において市場およびアカウントデータにポーリングとプッシュのどちらが好ましいか、についてのフィードバックを求めます。本議論を参照する追跡用の課題（tracking issue）が`adamant-tradebot`に作成されます。プレミアムリファレンス実装は現在、`adamant-tradebot-me`ブランチの`refactor/new-webui-api`で進行中です。

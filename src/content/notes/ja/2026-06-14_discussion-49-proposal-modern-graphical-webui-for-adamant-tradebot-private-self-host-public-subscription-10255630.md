---
title: "提案：ADAMANT TradeBot向けの現代的なグラフィカルWebUI"
slug: "discussion-49-proposal-modern-graphical-webui-for-adamant-tradebot-private-self-host-public-subscription-10255630"
description: "現在のテキスト中心のWebUIから進化し、チャートや注文書、残高表示などを備えた現代的なグラフィカルインターフェースを提案します。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/49"
publishedAt: "2026-06-14T12:09:51Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255630"
locale: "ja"
placeholder: false
---

## 背景

現在のWebUIは主にテキストベースであり、メッセージアプリ風のコマンド応答に依存しています。本提案では、チャート、注文書、残高、注文中の注文、取引パラメータ入力フォーム、モジュール対応の制御パネルを備えた、現代的なグラフィカルインターフェースを提示します。重要なアーキテクチャ上のルールとして、WebUIは取引所に直接接続しないこと。すべてのデータはボットAPIを経由して取得される必要があります。

## デプロイモデル

二つのデプロイモデルが提案されています。一つ目は、一回限りの購入で提供されるプライベートなセルフホスト型WebUIです。このモデルでは、運用者はリバースプロキシ経由でHTTPS上にWebUIを実行します。WebUIはボットのフリートレジストリを保持し、運用者のログイン後に共有された`private_webui_secret_key`を使用してJSON Web Token (JWT) を署名します。この際、ローカルユーザーおよび二段階認証（2FA）もサポートします。WebUIサーバーは各ボットに対して`/api/v1/*`エンドポイントへの直接HTTPリクエストを送信し、単一のWebUIアドレスでタブ経由で複数のボットを管理できるようにします。

二つ目のモデルは、パブリックなサブスクリプション型WebUIです。ユーザーは外部の支払いおよび認証サービスを通じて認証を行い、その後、ライセンストークンを自身のボット設定に配置します。ボットはパブリックリレーへ発信接続を行い、インバウンドポートを開く必要をなくします。ブラウザからのリクエストはパブリックWebUIとリレーを経由し、一对一のAPIトンネルを介してボットと通信します。ライセンスの範囲は、ライセンスごとに1つの取引所と1つの通貨ペアに制限されます。

## MVPの範囲

最小限の実現可能な製品（MVP）は、プライベートなセルフホスト型のシナリオを最優先します。ViteおよびReact 18を使用した新しいスタックの構築が対象であり、従来のWebUIのサポートは行いません。実装にはトランスポート抽象化レイヤーを含み、初期は`DirectHttpTransport`、その後に`RelayWsTransport`を実装します。UIは`GET /bot`リクエストにより起動し、ボットの機能情報に基づいて表示されるUIブロックが決定されます。パラメータ管理はWebSocketの`params:updated`イベントとRESTの両方で行います。市場およびアカウントデータは、初期では約10秒間隔のRESTポーリングに依存し、将来的にはボットのキャッシュからデータをプッシュする予定です。

## 非目標

本議論では、支払いおよび課金の実装詳細、および別途議論されているボットAPI設計については明示的に除外します。追跡用の課題は`adamant-tradebot-webui`リポジトリ内に作成され、本提案が参照されます。

---
title: "ADAMANT Explorerのセキュリティと信頼性のレビュー"
slug: "discussion-69-adamant-explorer-security-and-reliability-review-by-cryptofoundry-10464221"
description: "ADAMANT Explorerは、公開HTTP表面、ADAMANT Node境界、Redisキャッシュ動作、Socket.IOライフサイクル、リバースプロキシ信頼、ブラウザレンダリングに関するセキュリティと信頼性のレビューを完了しました。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/69"
publishedAt: "2026-07-20T20:32:14Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10464221"
locale: "ja"
placeholder: false
---

ADAMANT Explorerは、公開HTTP表面、ADAMANT Node境界、Redisキャッシュ動作、Socket.IOライフサイクル、リバースプロキシ信頼、およびブラウザレンダリングに焦点を当てたセキュリティと信頼性のレビューを完了しました。この強化は[adamant-explorer#37](https://github.com/Adamant-im/adamant-explorer/pull/37)にマージされ、イシュー[#23](https://github.com/Adamant-im/adamant-explorer/issues/23)、[#25](https://github.com/Adamant-im/adamant-explorer/issues/25)、および[#33](https://github.com/Adamant-im/adamant-explorer/issues/33)を解決します。レビューでは、Expressミドルウェアの順序、公開APIの公開、バリデーション、レート制限、リバースプロキシ信頼、信頼できないデータ境界としてのADAMANT Nodeレスポンス、Redisキャッシュの正確性と障害動作、Socket.IOポーリングと再接続、Nodeおよびピアが制御する値のブラウザレンダリング、オプション依存関係の障害、為替レートの継続性、運用ヘルスレポート、およびリポジトリの脅威モデリングをカバーしました。

## 公開HTTPおよびAPI境界

Explorerは現在、UIに必要な12の同一オリジンAPIルートと`GET /api/networkHealth`のみを公開しています。16のレガシールートルート登録とワイルドカードCORSは削除されました。リクエストはRedisルックアップまたはADAMANT準備チェックの前に正確なAPI表面に対してチェックされ、削除されたエンドポイントが古いキャッシュエントリを通じて復活するのを防ぎます。公開クエリパラメータは厳密なバリデーションと制限付きページネーションを使用するようになりました。アプリケーションは、クライアントごとに1分あたり300のAPIリクエストの、プロキシ対応のインプロセス固定ウィンドウ制限を適用し、制限付きIDストレージとフェイルクローズのオーバーフローバケットを備えています。リバースプロキシ信頼は明示的で検証されます。セキュリティヘッダー、制約付きContent Security Policy、安定したエラーレスポンス、HTTPタイムアウト、およびデータを最小限に抑えたリクエストログが、公開される攻撃面をさらに削減します。

## 可用性と状態の正確性

`GET /api/networkHealth`は、一貫した`live`、`degraded`、`critical`、または`unavailable`状態を報告し、一貫したNodeスナップショットを生成できない場合にのみHTTP `503`を返します。Redisおよびオプションの外部サービス障害は、コアHTTPおよび静的配信をダウンさせなくなりました。キャッシュIDは必要な場所でブロックセンシティブであり、為替レートリフレッシュパスは使用可能な最後の既知の値を保持しながら、重複するリフレッシュを回避します。Socket.IOポーリングは直列化され、ライフサイクルを認識し、アップストリーム障害時に制限されます。世代追跡、明示的なタイマー所有権、および古いコールバックの抑制により、切断または再起動された名前空間が古い作業を継続するのを防ぎます。

## 信頼できないデータとブラウザの安全性

ADAMANT Nodeおよびピアペイロードは、正規化または検証されるまで信頼できないままです。Network Monitorの値はテキストとしてレンダリングされ、ルートターゲット、CSS派生値、および座標は使用前に制約されます。フロントエンドとバックエンドのAPIパスは、契約のドリフトを防ぐために1つの信頼できる情報源を共有するようになりました。

## 互換性と統合への影響

保持されたExplorer APIは、Web UIの実装詳細であり、汎用統合APIではありません。外部アプリケーションは、直接ADAMANT Node統合に[adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient)を使用する必要があります。オペレーターは、Explorerモニタリングに`GET /api/networkHealth`を使用できます。既存のフロントエンドルートとディープリンクは互換性を維持します。リバースプロキシの背後にあるデプロイメントは、実際のトポロジに一致するように`trustedProxies`を設定する必要があります。HTTPS Nodeが推奨されます。互換性のために1つのレガシープレーンテキストHTTPフォールバックが残っています。

## 範囲とフォローアップ

これはExplorerとそのランタイム信頼境界のリポジトリコードおよびアーキテクチャ監査であり、暗号プロトコルまたはブロックチェーンコンセンサスの監査ではありません。レートリミッターは意図的にプロセスごとに設定されているため、マルチレプリカデプロイメントはエッジで集約制限も適用する必要があります。[リポジトリ脅威モデル](https://github.com/Adamant-im/adamant-explorer/blob/dev/adamant-explorer-threat-model.md)および完全な[セキュリティと信頼性のレビュー](https://github.com/Adamant-im/adamant-explorer/blob/dev/security_best_practices_report.md)が利用可能です。オープンなフォローアップ項目には、[オプションのピアIPプライバシー制御](https://github.com/Adamant-im/adamant-explorer/issues/20)、[主要なフロントエンド依存関係のアップグレード](https://github.com/Adamant-im/adamant-explorer/issues/34)、[ADAMANT Nodeレスポンススキーマのバリデーション](https://github.com/Adamant-im/adamant-explorer/issues/35)、および[障害時のリトライとログの統合](https://github.com/Adamant-im/adamant-explorer/issues/36)が含まれます。

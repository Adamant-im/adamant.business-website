---
title: "ETH Transactions Storage v2.5.0"
slug: "release-eth-transactions-storage-v2-5-0-382952479"
description: "ETH Transactions Storage v2.5.0は、文書化された配布可能な自己ホスト型EthereumトランザクションインデクサーおよびREST APIバックエンドへと進化しました。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.5.0"
publishedAt: "2026-09-04T18:56:20Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "ETH-transactions-storage"
tag: "v2.5.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:382952479"
locale: "ja"
placeholder: false
---

ETH Transactions Storage v2.5.0は、ウォレット、エクスプローラー、会計・財務ツール、監視サービス、およびカスタムアプリケーション向けの、文書化された配布可能な自己ホスト型EthereumトランザクションインデクサーおよびREST APIバックエンドへと進化しました。ADAMANTクライアントが本番環境で使用している既存のPostgREST APIコントラクトはそのまま維持されます。

本リリースでは、ブロックごとの信頼性の高いトランザクション処理とチェックポイント機能、起動時のリカバリ、データベースのロールバックおよびリトライ動作、空ブロックやフィルタリングされたブロックの処理進捗管理が追加されました。アドレスベースのインデックス作成機能が利用可能となり、検証、送信者、ネイティブ受信者、トークン受信者のマッチング、ライブリストのリロード、およびフェイルクローズ動作がサポートされます。推奨されるデータベースインデックスセットは5つに削減されました。以前の3つのインデックスはカスタムクエリ用に個別に利用可能です。この削減により、約4億9000万行のデータに対して推定90～110 GBの容量を節約できます。さらに、追加型の`sync_state`スキーマ、読み取り専用の`web_anon`アクセス、PostgRESTの1万行レスポンス制限、および公開APIデプロイメントを保護するためのガイダンスが追加されました。PostgreSQL接続URIのサポート（認証情報の秘匿化機能付き）、`.env`ファイルの読み込み、Python依存関係の制約、診断機能の更新、およびsystemdユニットの改訂が含まれています。Python 3.11コンテナ、公開イメージを使用したComposeセットアップ、ローカルビルドのオーバーライド、OCIメタデータ、およびリリース駆動型のマルチアーキテクチャGHCR公開が実装されました。VitePressドキュメントサイトは <https://eth-indexer.docs.adamant.im> で公開されており、再現可能なNodeツール、ドキュメントCI、Pagesデプロイメント、およびコントリビューター向けガイドが含まれています。本プロジェクトは、ADAMANTの所有権、出自、および本番環境の互換性を維持しつつ、互換性のあるあらゆるコンシューマー向けに再定義されました。

## アップグレード要件

既存のインデクサーを停止し、アップグレード前にチェックアウト全体を更新してください。v2.5.0を開始する前に、PostgreSQL管理者として新しいスキーマを適用してください：

```bash
sudo -u postgres psql -v ON_ERROR_STOP=1 -d index < create_tables.sql
```

次に、手動デプロイまたはsystemdデプロイ用に宣言されたPython依存関係をインストールします：

```bash
pip3 install -r requirements.txt
```

本番環境のすべての値と認証情報を保持してください。リポジトリのsystemdテンプレートでは、有効な`.env`ファイルが必要になりました。Docker Composeを使用する前に`POSTGRES_PASSWORD`を設定してください。ComposeのPostgreSQL 14イメージを採用する前に、既存のPostgreSQL 12データを正しく移行してください。イメージタグを変更するだけではアップグレードになりません。推奨されるインデックスセットを作成・検証してからレガシーインデックスを削除してください。ライブデータベース上では同時インデックス操作を使用してください。PostgRESTを`web_anon`に変更する前に`create_tables.sql`を適用してください。そうしないと、匿名APIリクエストが失敗します。フィルタリングされた履歴については明示的に計画してください。アドレスフィルターを有効にしたりアドレスを追加したりしても、過去のブロックはバックフィルされません。

このバージョンをデプロイする前に、<https://eth-indexer.docs.adamant.im/guide/upgrading> にある完全なアップグレードガイドを参照してください。

## 互換性と現在のスコープ

`/ethtxs`、`/max_block`、`/aval`エンドポイント、データベースカラム、大文字小文字を区別しないアドレス処理、値のエンコーディング、および確立されたクライアントクエリの形式は引き続き互換性を維持します。`/max_block.max`は、トランザクション行が格納されなかった処理済みブロックも反映するようになりました。

インデクサーは引き続き、ネイティブETH転送および直接的なトップレベルのERC-20 `transfer(address,uint256)`呼び出しを格納します。内部ETH転送、`transferFrom`、マルチシグ、ルーター、バッチフロー、その他のトークン規格、または自動的なディープリオーガナイゼーションの修正はインデックスされません。

## 配布

この安定版リリースの公開により、`linux/amd64`および`linux/arm64`用のイメージが生成されます：

```text
ghcr.io/adamant-im/eth-transactions-storage:2.5.0
ghcr.io/adamant-im/eth-transactions-storage:latest
```

バージョンイメージタグは不変です。本番環境では`latest`ではなく`2.5.0`を固定してください。

## 検証

12個のPythonユニットテストすべてに合格しました。Pythonの構文、フォーマット、Markdownのリンティング、およびVitePressのビルドは正常に完了しました。コンテナビルド、オペレーター状態の除外、OCIメタデータ、両方のCompose構成、APIの進捗、およびチェックポイント再起動のスモークテストは、リリース用のマージコミットで合格しました。ドキュメントのデプロイメントは成功し、サイトは強制HTTPS経由で提供されます。本番サービスはデプロイ済みであり、オペレーターによって正常性が確認されています。

含まれる作業：#27、#28、#29、#31、および#33。追跡課題：#32。完全な変更履歴：<https://github.com/Adamant-im/ETH-transactions-storage/compare/v2.4.1...v2.5.0>。

### 破壊的変更

v2.5.0を開始する前に`create_tables.sql`を介して新しい`sync_state`スキーマを適用する必要があります。これを適用せずにPostgRESTを`web_anon`に切り替えると、匿名APIリクエストが失敗します。systemdテンプレートには有効な`.env`ファイルが必要になったため、ファイルが存在しない既存のデプロイメントは、作成されるまで起動しません。アドレスフィルターを有効にしたりアドレスを追加したりしても過去のブロックはバックフィルされないため、明示的なオペレーターの操作がない限り、以前にインデックスされなかった履歴は遡及的に取得されません。

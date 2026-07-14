---
title: "ADAMANT Console v3.1.0"
slug: "release-adamant-console-v3-1-0-346144062"
description: "ADAMANT Console v3.1.0は、ADAMANT Node v0.10.0向けにコンソールを更新し、CLI、JSON-RPC、JavaScriptラッパー、ドキュメント、検証ツールチェーンを刷新しました。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v3.1.0"
publishedAt: "2026-06-29T08:31:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:346144062"
locale: "ja"
placeholder: false
---

ADAMANT Console v3.1.0は、ADAMANT Node v0.10.0向けにコンソールを更新し、CLI、JSON-RPC、JavaScriptラッパー、ドキュメント、検証ツールチェーンを刷新しました。このリリースでは、`adamant-api` v3を通じてADAMANT Node v0.10.0のレスポンスおよびクエリのサポートを追加しています。また、ノードステータス、チャットルーム／メッセージ、チャットトランザクション、トランザクションの`returnUnconfirmed`、デリゲート検索、ダイレクトトランスファークエリの処理に関するアップデートも導入しています。パッケージメタデータおよび依存関係の更新に加え、新しいVitePressドキュメントサイト、生成されたTypeDoc APIリファレンス、リリース時のGitHub Pagesへのデプロイも実施しました。その他の改善には、CLIヘルプの例の追加、JSON-RPCのカバレッジ拡大、パブリックAPIのJSDoc、整形されたJSON出力のシンタックスハイライト、APIラッパー、CLIヘルプの動作、設定／クライアントメタデータ、プロンプト履歴、ログ出力に対するテストカバレッジの拡大が含まれます。

検証は以下のコマンドで実行できます：
@@CODEBLOCKn@@
### 重大な変更
ADAMANT Consoleを実行するには、Node.js 22.13.0以降が必須になりました。

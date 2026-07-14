---
title: "ADAMANT Console v3.1.0：Node v0.10.0対応のための開発者向けノート"
slug: "discussion-57-adamant-console-v3-1-0-developer-notes-for-node-v0-10-0-support-10337345"
description: "ADAMANT Console v3.1.0はADAMANT Node v0.10.0に対応し、CLI、JSON-RPC、ローカルJavaScript連携向けの開発者機能を刷新しました。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/57"
publishedAt: "2026-06-29T08:48:18Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10337345"
locale: "ja"
placeholder: false
---

ADAMANT Console v3.1.0は、ADAMANT Node v0.10.0のサポートを導入し、CLI、JSON-RPC、およびローカルJavaScript連携向けの開発者向けインターフェースを刷新しました。このリリースは、Consoleをローカル署名ツール、スクリプト用CLI、またはADAMANTノードへの軽量JSON-RPCブリッジとして利用する開発者および運用担当者を主な対象としています。

Consoleは現在、`adamant-api` v3を使用しており、ADAMANT Node v0.10.0のレスポンスおよびクエリ動作と一致しています。サポート対象のランタイムはNode.js 22.13.0以降です。CLI、JSON-RPC、JavaScriptラッパーの各メソッドは、すべて統一されたConsoleの動作に基づいて整理されています。新しい`node status`コマンドおよびラッパーによりノードのステータス確認が可能になり、チャットヘルパーも拡張され、チャットルーム、チャットメッセージ、および従来のチャットトランザクションに対応するようになりました。トランザクションの検索では、`returnUnconfirmed`などのv0.10クエリオプションが利用可能になり、デリゲート検索ではユーザー名、公開鍵、またはADAMANTアドレスのいずれかを使用できます。ダイレクトトランスファーのチャットフィルターに関しては、APIは現在`includeDirectTransfers`を優先しますが、後方互換性のため、以前の`withoutDirectTransfers`入力も正規化されたまま維持されています。公開用ラッパーにはJSDocが含まれるようになり、生成されたAPIリファレンスページも利用可能になりました。また、npmパッケージはGitHub ActionsのOIDCとnpm Trusted Publishingを介して真正性情報を付与して公開されています。

インストールまたはグローバルな更新を行うには、npmを使用してください：

```sh
npm install -g adamant-console
```

このパッケージは一般的な操作用に`adm`バイナリを提供します：

```sh
adm client version
adm node status
adm get transaction 123456789 returnUnconfirmed=1
adm get chats U123456789 includeDirectTransfers=1
```

アップグレード時には、JSON-RPC経由でConsoleを利用するサービスにおいて、拡張されたメソッドのインターフェースおよびレスポンスの処理を確認してください。トランザクションまたはチャットのレスポンスを処理するコードについては、特に未確認トランザクションデータ、チャットのダイレクトトランスファーの包含、および`timestampMs`など、依存するv0.10.0のフィールドに対してテストを行う必要があります。新しいJavaScriptサービスでは、完全なプロトコル対応を求める場合、`adamant-api`を直接使用することを推奨します。`adamant-console`のラッパーは、Console互換のCLI/RPC動作またはローカル運用スクリプトが必要な場合に限定して使用してください。

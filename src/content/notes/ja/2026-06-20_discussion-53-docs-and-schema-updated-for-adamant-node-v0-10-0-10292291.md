---
title: "ADAMANT Node v0.10.0 向けのドキュメントとスキーマが更新されました"
slug: "discussion-53-docs-and-schema-updated-for-adamant-node-v0-10-0-10292291"
description: "ADAMANT Node v0.10.0 に合わせて、API仕様とドキュメントが更新され、ローカルネットおよびテストネットが再開されました。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/53"
publishedAt: "2026-06-20T18:25:34Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10292291"
locale: "ja"
placeholder: false
---

**ADAMANT Node v0.10.0** に合わせて、ノードと連動した開発者向けスタックが更新されました。API仕様（`adamant-schema`）とドキュメント（`adamant-docs`）が更新されたことに加え、ローカルネットワークおよび新たに再起動されたテストネットが利用可能になっています。ADAMANT 上で開発を行う方のために、概要を以下に示します。

## adamant-schema（API仕様）

仕様は **OpenAPI 3.0.3 → 3.2.0** へアップグレードされ、バージョンは `0.10.0` に揃えられ、実際のノードに対して検証が行われました。トランザクションは新たに **`timestampMs`** をサポートし、従来の秒単位の `timestamp` に加えてミリ秒精度のタイムスタンプが利用可能になりました。ノードのステータス応答も拡張され、**`nodeTimestampMs`**、**`unixTimestampMs`**、および `syncing`、`consensus`、`blocks`、`blocksCount` を公開する **`loader`** オブジェクトが追加されました。

新しい **`GET /peers/get`** エンドポイントにより、IP アドレスとポート番号でピアを照会できるようになりました。新しいクエリパラメータ **`returnUnconfirmed`** および **`includeDirectTransfers`** が、非推奨となった `withoutDirectTransfers` を置き換えました。テストネット用ノードがサーバーリストに追加されています。

[https://schema.adamant.im](https://schema.adamant.im) のインタラクティブな Swagger UI では、ライブ操作検索、APIバージョンラベル付きのノードごとのヘルスチェック、正常なメインネットノードの自動選択が可能になりました。ツールチェーンは Node.js 22、TypeScript、Express 5 に更新され、利用者向けに再生成された型付きクライアントパスが提供されています。

## adamant-docs（ドキュメント）

APIリファレンスは **v0.10.0** に更新され、サイドバーでバージョンが明示されるため、ドキュメントとネットワークの乖離が防げます。新たに **合意形成とトランザクション検証**、**同期（syncing）**、**loader / ノードステータス** エンドポイントに関するページが追加されています。**`timestampMs`** の意味論はエンドツーエンドで文書化され、**peers** APIのドキュメントも更新されています。

**自身のノードを運用する方法（run-your-own-node）** に関するガイドは、インストール（macOSを含む）、設定、自動起動、ブートストラップ、ノードのリカバリーまでを網羅するように拡充されました。また、**ローカルネット（localnet）** の構築と **テストネット（testnet）** への参加については、専用のページが用意されています。

## ローカルネットおよびテストネット

**ローカルネット** を使用すると、公共インフラに影響を与えることなく、ローカル環境で完全なADAMANTネットワークを構築し、開発およびテストが行えます。**テストネット** は再起動され、v0.10.0 と同期されています。これにより、本番ネット（mainnet）へのデプロイ前に、実際のネットワーク条件下で統合テストを検証できます。これらの機能により、**ローカル → テストネット → メインネット** という開発フローがスムーズで完全に文書化されたものになります。

## 関連リソース

- APIリファレンス: https://schema.adamant.im
- ドキュメント: https://docs.adamant.im
- ノードのソースコード: https://github.com/Adamant-im/adamant
- API仕様リポジトリ: https://github.com/Adamant-im/adamant-schema
- ドキュメントリポジトリ: https://github.com/Adamant-im/docs
- JSクライアント: https://github.com/Adamant-im/adamant-api-jsclient

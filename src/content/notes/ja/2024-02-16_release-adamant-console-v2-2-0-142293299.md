---
title: "ADAMANT Console v2.2.0"
slug: "release-adamant-console-v2-2-0-142293299"
description: "Wikiが最新の変更に合わせて更新されました。依存関係が最新バージョンに更新されました。コードベースがESモジュール(.mjs)を使用するように書き直されました。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.2.0"
publishedAt: "2024-02-16T09:24:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v2.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:142293299"
locale: "ja"
placeholder: false
---

Wikiが最新の変更内容に合わせて更新されました。依存関係が現在のバージョンに更新されています。コードベースは、最新のライブラリをサポートするためにESモジュール(.mjs)を使用するように書き直されました。コード整形のためPrettierが追加されました。

### 重大な変更点

設定ファイルの形式が変更されました。設定ファイル内の `passPhrase` キーは `passphrase` に名前が変更されました。設定ファイル `config.json` および `config.default.json` はそれぞれ `config.jsonc` および `config.default.jsonc` に名前が変更されました。`account new` コマンドの応答は、以前の `passPhrase` ではなく、現在では `passphrase` を返すようになっています。コマンドラインフラグ `--passPhrase` は `--passphrase` に名前が変更されたため、`adm --passPhrase=""` は現在では `adm --passphrase=""` とする必要があります。

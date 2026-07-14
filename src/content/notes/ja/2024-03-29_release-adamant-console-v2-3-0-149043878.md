---
title: "ADAMANT Console v2.3.0"
slug: "release-adamant-console-v2-3-0-149043878"
description: "このリリースでは、adm init [path] コマンドが追加され、デフォルト設定ファイルを ~/.adm/ または指定したディレクトリにコピーできるようになりました。互換性を損なう変更はありません。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.3.0"
publishedAt: "2024-03-29T17:13:09Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-console"
tag: "v2.3.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:149043878"
locale: "ja"
placeholder: false
---

このリリースでは、`adm init [path]` コマンドが追加され、ユーザーがデフォルトの設定ファイルを `~/.adm/` または指定したディレクトリパスにコピーできるようになります。

```bash
# to copy to ~/.adm/$ADM_CONFIG_FILENAME
$ adm init
# to copy to the specific directory
$ adm init ./my-dir
```

このリリースでは、互換性を損なう変更は導入されていません。

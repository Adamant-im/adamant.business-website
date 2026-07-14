---
title: "ADAMANT Console v1.3.0"
slug: "release-adamant-console-v1-3-0-13940917"
description: "このリリースでは、account new と get transactions の2つの新しいコマンドが導入されました。また、--passPhrase オプションがサポートされ、ユーザーはコマンド実行時に直接パスフレーズを指定できるようになりました。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.3.0"
publishedAt: "2018-11-11T16:19:44Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.3.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:13940917"
locale: "ja"
placeholder: false
---

このリリースでは、`account new` および `get transactions` の2つの新しいコマンドが導入されています。また、`--passPhrase` オプションがサポートされたことで、ユーザーはコマンド実行時に直接パスフレーズを提供できるようになりました。

このリリースにはいくつかの修正も含まれています。非推奨の `new Buffer()` 呼び出しは置き換えられ、誤った設定の読み込みを引き起こしていたバグも修正されました。また、dthree/vorpal#322 のマージが保留中のため、一時的な依存関係の更新が適用されています。

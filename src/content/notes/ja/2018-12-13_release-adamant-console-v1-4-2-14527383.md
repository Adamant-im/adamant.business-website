---
title: "ADAMANT Console v1.4.2"
slug: "release-adamant-console-v1-4-2-14527383"
description: "ADAMANT Consoleのこのリリースでは、新しいget blocksコマンドとgetBlocks、getTransactionsInBlockByHeight、getTransactionsInBlockByIdのJSON-RPCメソッドが追加されました。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.4.2"
publishedAt: "2018-12-13T22:26:43Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.4.2"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:14527383"
locale: "ja"
placeholder: false
---

このADAMANT Consoleのリリースでは、新しい `get blocks` コマンドが導入され、`getBlocks`、`getTransactionsInBlockByHeight`、`getTransactionsInBlockById` といった複数のJSON-RPCメソッドが追加されました。

いくつかの修正が含まれています。このリリースでは、一部のUbuntuバージョンで環境変数内の `~` が正しく展開されない問題を修正しています。カスタム設定ファイルでデフォルトパラメータが上書きされない問題も解決されています。さらに、コメント付きで受信した取引をスキップしていた `getTransactionsReceivedByAddress` の問題も修正されました。

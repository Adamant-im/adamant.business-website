---
title: "ADAMANT Console v2.0.0"
slug: "release-adamant-console-v2-0-0-72141835"
description: "このリリースではADAMANT Consoleの完全なリファクタリングを実施。adamant-api上に再構築され、メッセージの復号化やコマンドのヘルプ機能が追加されました。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.0.0"
publishedAt: "2022-07-16T09:28:30Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v2.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:72141835"
locale: "ja"
placeholder: false
---

このリリースにより、ADAMANT Consoleが完全にリファクタリングされ、現在は adamant-api 上に構築されています。コンソールはメッセージを復号化する機能を獲得し、利用可能なコマンドについては組み込みのヘルプが提供されるようになりました。また、使用を簡素化するためのインタラクティブモードが導入されました。

このパッケージは、JavaScriptライブラリとしてインクルード可能になり、コマンドラインに加えてより幅広い統合オプションが利用できるようになりました。依存関係が更新され、いくつかのバグ修正も含まれています。

### Breaking changes

完全なリファクタリングにより、内部構造およびAPIが大きく変更されました。以前のアーキテクチャに依存する既存のスクリプトや統合は、新しい adamant-api ベースの基盤で動作させるために更新が必要です。

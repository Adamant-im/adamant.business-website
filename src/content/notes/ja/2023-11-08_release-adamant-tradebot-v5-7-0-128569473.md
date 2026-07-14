---
title: "ADAMANT Tradebot v5.7.0"
slug: "release-adamant-tradebot-v5-7-0-128569473"
description: "ADAMANT Tradebot v5.7.0では、複数の改善とメンテナンス更新を導入。マーケットメイク注文の配置後に注文がクリアされ、Price Watcherの信頼性が向上。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.7.0"
publishedAt: "2023-11-08T16:48:40Z"
author: "just-software-dev"
authorUrl: "https://github.com/just-software-dev"
repo: "adamant-tradebot"
tag: "v5.7.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:128569473"
locale: "ja"
placeholder: false
---

このリリースのADAMANT Tradebotでは、いくつかの改善とメンテナンス更新が導入されています。マーケットメイク注文は配置後にクリアされるようになり、Price Watcherは信頼性が向上しました。ボットは現在、取引設定ファイルに対する外部からの変更を監視するため、再起動せずに動的な設定管理が可能になっています。ログ機能も強化され、運用中の可観測性が向上しました。依存パッケージは最新の互換バージョンに更新され、コード品質向上のためのリンタールールが追加され、いくつかの軽微な修正も適用されています。

### 互換性を損なう変更

まだ`config.json`ファイルを使用している場合は、それを`config.jsonc`に名前変更してください。

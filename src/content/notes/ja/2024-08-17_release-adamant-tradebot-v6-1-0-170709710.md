---
title: "ADAMANT Tradebot v6.1.0"
slug: "release-adamant-tradebot-v6-1-0-170709710"
description: "Price Watcherの改善と信頼性の向上。モジュールはトークン価格の有効性を確認し、開発・DB管理用の新設定も追加。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.1.0"
publishedAt: "2024-08-17T09:45:28Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:170709710"
locale: "ja"
placeholder: false
---

このリリースでは、Price Watcherの改善に加え、より広範な信頼性の向上が実施されています。モジュールは処理を進める前にトークン価格が実際のものであるかを検証するようになったため、古くなったり誤ったデータが取引判断に影響を与えるのを防ぎます。また、全体的な安定性を高めるために追加のリファクタリングが行われました。

`dev`および`clear_db`の新しい設定が追加され、運用者が開発およびデータベース管理のワークフローをより細かく制御できるようになりました。依存パッケージは最新の互換バージョンに更新され、いくつかの軽微なバグが修正されています。既存のテスト網を補完するための手動テストが追加され、READMEには新しいウェブサイトリンクに加えて、更新されたインストールおよび使用ガイドが反映されました。

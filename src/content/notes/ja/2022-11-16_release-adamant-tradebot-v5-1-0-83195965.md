---
title: "ADAMANT Tradebot v5.1.0"
slug: "release-adamant-tradebot-v5-1-0-83195965"
description: "ADAMANT Tradebot v5.1.0では.jsonc設定ファイルのサポートを追加し、コメントや末尾のカンマが利用可能になり、設定の保守が容易になりました。通知機能も拡充されています。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.1.0"
publishedAt: "2022-11-16T03:49:18Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v5.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:83195965"
locale: "ja"
placeholder: false
---

このリリースのADAMANT Tradebotでは、`.jsonc`設定ファイルのサポートが導入され、コメントや末尾のカンマをボットの設定に使用できるようになり、保守が容易になりました。通知システムは拡張され、複数のチャネルに同時にメッセージを送信できるようになりました。また、新たな優先順位付き通知機構により、重要なアラートが運用担当者に確実かつ迅速に届くようになっています。

コマンドのエイリアスが利用可能になり、ユーザーは頻繁に使用するコマンドに対して短縮名を定義できるようになりました。`/buy`、`/sell`、`/fill`コマンドには対話型の確認機能が追加され、誤った取引を防ぐのに役立ちます。また、注文帳（オーダーブック）に対して直接取引を行う際の実行信頼性が、注文通りの取引によって向上しています。

---
title: "ADAMANT Tradebot v7.0.0"
slug: "release-adamant-tradebot-v7-0-0-201883296"
description: "このリリースではリクエストキャッシュ機能と取引所と連携するための新しいコマンドが導入されました。/orderbook、/trades、/ticker、/order、/cancel など。/help コマンドも更新されています。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0"
publishedAt: "2025-02-23T05:56:49Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v7.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:201883296"
locale: "ja"
placeholder: false
---

このリリースでは、リクエストキャッシュ機能と `/orderbook`、`/trades`、`/ticker`、`/order`、`/cancel` などの取引所と連携するための新しいコマンドが導入されました。`/help` コマンドは、ボットソフトウェアとその構成に関する情報が含まれるように更新されています。

Command、Order book、Trader モジュールは、保守性の向上のためにリファクタリングされました。これらの変更をサポートするため、新しい `database` 設定オプションが追加されています。`getOrderDetails()` 関数は Azbit および P2B コネクタの両方で修正されています。

依存関係が更新され、コードベース全体で一般的なバグ修正と改善が行われました。ログ機能が強化され、型安全性と開発者体験を向上させるために TypeScript の型が追加されています。

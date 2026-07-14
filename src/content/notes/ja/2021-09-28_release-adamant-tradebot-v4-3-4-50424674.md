---
title: "ADAMANT Tradebot v4.3.4"
slug: "release-adamant-tradebot-v4-3-4-50424674"
description: "P2PB2B取引所のサポートを追加し、Atomarsを削除。小数点や取引ペア情報を取引所から直接取得可能に。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4"
publishedAt: "2021-09-28T20:06:30Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v4.3.4"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:50424674"
locale: "ja"
placeholder: false
---

このリリースでは、P2PB2B取引所のサポートを追加し、Atomars取引所のサポートを削除しました。ボットは可能であれば、小数点の桁数や取引ペアの情報を直接取引所から取得するようになり、注文の実行や残高計算の信頼性が向上しました。

依存関係が更新され、ADAMANT JS API v1.1.0の採用が含まれます。コマンドが更新され、ESLintがプロジェクトに追加され、それに伴う一般的なコードのリファクタリングも行われました。

通知を複数のアドレスに送信できるようになりました。残高と注文は各送信者ごとに別々に保存されるため、複数ユーザー間での状態管理がより明確になります。

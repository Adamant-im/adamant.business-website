---
title: "ADAMANT Trading & Market making v4.3.4でP2PB2B取引所をサポート"
slug: "market-making-software-supports-p2pb2b-exchange-190c2f542745"
description: "ADAMANT Trading & Market making v4.3.4はP2PB2B取引所をサポートし、取引量の生成、注文ブックの充実、スプレッド/流動性の維持を可能にします。Atomarsはこのリリースで削除されました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/market-making-software-supports-p2pb2b-exchange-190c2f542745"
publishedAt: "2021-09-28T20:32:29.436Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/190c2f542745/001-1-kq44fxjolwz-4xefiypybg-png.webp"
cardSpan: "full"
originalId: "medium:190c2f542745"
locale: "ja"
placeholder: false
---

ADAMANT Trading & Market making v4.3.4は、P2PB2B取引所をサポートするようになりました。これにより、同プラットフォーム上で取引量の生成、注文ブックの充実、スプレッドおよび流動性の維持が可能になります。Atomars取引所は本リリースから削除されました。

ボットは、可能であれば小数点以下の桁数や取引ペアの情報を取引所から直接取得するようになり、手動での設定が削減されました。依存関係が更新され、プロジェクトは現在ADAMANT JS API v1.1.0を使用しています。内部の改善にはeslintの統合や一般的なコードリファクタリングが含まれます。

通知の処理は複数のアドレスに対応するように拡張され、残高と注文は送信者ごとに個別に保存されるようになりました。コマンドも更新されています。

ADAMANT Trading & Market makingはオープンソースで無料です。完全な変更履歴は[v4.3.4リリースページ](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4)で確認できます。

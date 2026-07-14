---
title: "裁定取引機能のマーケットメイキングへの実装"
slug: "arbitrage-feature-for-market-making-39e5515a470b"
description: "ADAMANTトレーディングおよびマーケットメイキングボットが裁定取引機能をサポート。トークン保有者は他取引所での価格監視を /enable pw コマンドで設定可能。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/arbitrage-feature-for-market-making-39e5515a470b"
publishedAt: "2021-01-24T16:41:51.417Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/39e5515a470b/001-0-vcyqehma-vfieqdv-png.webp"
cardSpan: "full"
originalId: "medium:39e5515a470b"
locale: "ja"
placeholder: false
---

ADAMANT トレーディングおよびマーケットメイキングボットが、新たに裁定取引機能をサポートしました。トークン保有者は、他取引所での価格監視（price watching）および取引ペアの設定を `/enable pw` コマンドを使用して行えます。

マーケットメーカーが複数のペアまたは取引所にまたがってトークンを取引する場合、数値範囲内でリーディングとなる取引ペアを指定し、残りのペアをそれに追従させることができます。他の取引ペアから価格範囲を受信した際、ボットは *strict* ポリシーでは直接的なビッドとアスクを提示し、*smart* ポリシーでは実際の価格を推定します。たとえば、特定のオーダーブックに基づく場合、*strict* ポリシーでは 0.0122–0.0128 の範囲が得られる一方、*smart* ポリシーではより広い 0.0114–0.0133 の範囲が得られます。

---
title: "ADAMANT InfoService v3.3.5 がクロスソースレート検証を追加"
slug: "reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
description: "ADAMANT InfoServiceは、MOEX、Currency Api、Coinmarketcap、CryptoCompare、Coingeckoから為替・暗号資産レートを集約し、API経由で提供するサービスです。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
publishedAt: "2022-02-15T10:59:58.332Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/791bd7d9e097/001-1-olubh0mvysjvmtykzm2u4a-png.webp"
cardSpan: "full"
originalId: "medium:791bd7d9e097"
locale: "ja"
placeholder: false
---

ADAMANT InfoServiceは、MOEX、Currency-Api、Coinmarketcap、CryptoCompare、Coingeckoから通貨および暗号資産のレートを集約し、それらをAPIを通じて下流のアプリケーションに提供するサービスです。

v3.3.5リリースでは、通貨レートの追加ソースとしてCurrency-Apiを導入しています。さらに重要な点として、InfoServiceは複数のプロバイダーから受信したレートを比較し、逸脱が検出された場合に誤ったまたは異常なデータをフラグとして検出するようになりました。このクロスソースによる検証により、単一の不正なソースが消費者に誤ったレートを広める可能性が低くなり、サービスの信頼性が向上しました。

このリリースには、内部のリファクタリング、バグ修正、リンターの統合、依存関係の更新も含まれています。

APIのドキュメントは[ADAMANT InfoService wiki](https://github.com/Adamant-im/adamant-currencyinfo-services/wiki/InfoServices-API-documentation)で確認できます。完全なリリースノートは[v3.3.5リリースページ](https://github.com/Adamant-im/adamant-currencyinfo-services/releases/tag/v3.3.5)にあります。

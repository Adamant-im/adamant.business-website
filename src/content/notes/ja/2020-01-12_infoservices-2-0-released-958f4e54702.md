---
title: "InfoServices 2.0がリリースされました"
slug: "infoservices-2-0-released-958f4e54702"
description: "ADAMANT InfoServicesはバージョン2.0にアップデートされ、新機能や安定性の向上が実現しました。サービスはCryptoCompareやCoingeckoからレートを収集します。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/infoservices-2-0-released-958f4e54702"
publishedAt: "2020-01-12T12:25:26.832Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/958f4e54702/001-0-zxv8izxs4xnlu4e.webp"
cardSpan: "full"
originalId: "medium:958f4e54702"
locale: "ja"
placeholder: false
---

ADAMANT InfoServicesはバージョン2.0にアップデートされ、いくつかの新機能と安定性の向上を実現しました。このサービスは現在、暗号資産ティッカーのレートをCryptoCompareおよびCoingeckoから収集し、使用量の最適化のためCoinmarketcap APIの呼び出しを最小限に抑えます。エラー通知がADAMANTおよびSlackを通じて送信されるようになり、信頼性がさらに高まりました。また、一般的な操作ログの記録も可能になっています。新しい設定ファイルリーダーにより、構成ファイル内のより細かい設定が可能になりました。このアップデートには、15個の変更ファイル、462の挿入、75の削除が含まれます。

無料でオープンソースの暗号資産および法定通貨レート提供サービスであるADAMANT InfoServicesは、MOEX、Coinmarketcap、CryptoCompare、Coingeckoのデータを収集・集計します。クロスレートの計算を行い、APIを通じて情報を提供します。暗号資産開発者にとって、このサービスをセルフホスティングすることで、サードパーティのエンドポイントに依存するよりも、より信頼性の高いレート取得ソリューションを実現できます。

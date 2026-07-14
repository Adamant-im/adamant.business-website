---
title: "ADAMANT Market-making Software Updated to v6.1.0"
slug: "open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
description: "ADAMANTのオープンソースマーケットメイキングアプリは、暗号資産プロジェクトや取引所向けのセルフホスティングツールで、取引高の創出、スプレッドと流動性の維持を目的としています。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
publishedAt: "2024-08-17T10:04:57.129Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8b8ed9a261c8/001-0-3n-a6wrdfj1fhgin.webp"
cardSpan: "full"
originalId: "medium:8b8ed9a261c8"
locale: "ja"
placeholder: false
---

ADAMANTのオープンソースマーケットメイキングアプリは、暗号資産プロジェクトや取引所向けに開発されたセルフホスティングツールであり、取引高の創出、スプレッドと流動性の維持、動的なオーダーブックの構築を目的としています。基本バージョンは無料で利用でき、高度な機能は有料モジュールとして提供されています。このプロジェクトは最近バージョン6.1.0をリリースし、いくつかの機能改善と安定性の向上が図られました。

![Open-source Market-making software for cryptocurrency projects updated to v6.1.0](/images/engineering-notes/medium/8b8ed9a261c8/002-0-1vbp44c85yvdelg.webp)

今回のリリースにおける主な更新点の1つは、Price Watcherモジュールの強化です。このモジュールには、トークン価格が最新であるかどうかを検証する仕組みが追加され、古くなったデータに基づいたマーケットメイキングの判断を防ぐことができます。また、プロジェクトのスケールに伴っても安定性、パフォーマンス、保守性が向上するよう、コードベースの大幅なリファクタリングも行われました。

新しい`dev`および`clear_db`設定が導入されました。`dev`設定はテストおよび開発のプロセスを簡素化し、`clear_db`はデータベースをすばやくクリアする手段を提供し、環境のリセットに役立ちます。依存関係も更新され、最新のライブラリとの互換性が確保されることで、セキュリティとパフォーマンスが向上しています。

その他の改善点には、軽微なバグ修正、デプロイ前のインストール検証に使用される手動テストの統合、および更新されたインストール手順と利用ガイドを含むREADMEの全面改訂が含まれます。リリース情報および変更履歴はADAMANTのGitHubリポジトリで確認できます。

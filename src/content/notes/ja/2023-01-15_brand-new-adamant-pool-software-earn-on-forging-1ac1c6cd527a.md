---
title: "ADAMANT Pool v3.0.0 — Forging Pool ソフトウェアの更新"
slug: "brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
description: "ADAMANTのForging Poolは、ユーザーが投票力を結合してブロックを生成し、ADM報酬を自動で分配する仕組みです。v3.0.0ではコードベースが全面的に刷新されました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
publishedAt: "2023-01-15T15:59:48.033Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/1ac1c6cd527a/001-0-rvpkdxtavqcrrn3p.webp"
cardSpan: "full"
originalId: "medium:1ac1c6cd527a"
locale: "ja"
placeholder: false
---

Forging Poolを使用すると、ユーザーは投票力を結合してADAMANTブロックチェーン上でブロックを生成し、自動的にADM報酬を共有できます。このプールプログラムは、手動での介入なく報酬の計算と分配を処理します。

ADAMANT Forging Poolのバージョン3.0.0が、[オープンソース](https://github.com/Adamant-im/pool)として利用可能になりました。コードベースは新しいリポジトリで完全に見直され、旧リポジトリは非推奨とされています。この書き直しにより、ライブラリの依存関係が更新され、パフォーマンスが向上し、リソース使用量が削減されました。設定ファイルのフォーマットは変更されておらず、v2からアップグレードする運用者向けに移行スクリプトが提供されています。

投票者にとって最も目立つ変更点は、`svelte`フレームワークで構築された新しいWeb UIの導入です。これにより、デスクトップおよびモバイルデバイスの両方でレスポンシブな体験が可能になります。

![ADAMANT Pool Web UI](/images/engineering-notes/medium/1ac1c6cd527a/002-0-eus0ye-v8djitrru.webp)

![ADAMANT Pool Web UI mobile](/images/engineering-notes/medium/1ac1c6cd527a/003-0-cdfhik804ra3jq2w.webp)

v3.0.0のリリースでは、すべての依存関係が更新され、ダッシュボードが`svelte`で書き直され、コードベース全体が再設計および最適化され、既知のバグも修正されています。

注意すべき2つの破壊的変更があります。第一に、Node.js 18.12.1以降（現在のLTS）が必須となり、それ以前のバージョンはサポートされなくなりました。第二に、プールがデータベースとして`lowdb`を使用するようになりました。v2からアップグレードする運用者は、READMEファイルの移行セクションを確認してください。

プールへの投票はADAMANTの分散型ネットワークを支援すると同時に、フォージング報酬として受動的収入を得る手段でもあります。アクティブなADAMANTプールの一覧は、[ADAMANTドキュメント](https://medium.com/adamant-im/hodl-list-of-adamant-pools-join-in-and-get-rewards-491a98610f4b)で確認できます。

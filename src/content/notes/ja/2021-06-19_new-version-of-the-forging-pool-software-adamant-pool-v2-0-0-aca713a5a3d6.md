---
title: "ADAMANT Pool v2.0.0 リリース"
slug: "new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
description: "ADAMANT Pool v2.0.0は信頼性とパフォーマンス向上のため完全にコードが再構築されました。投票者への報酬配布が正確かつ timely に。リソース要件も大幅に削減。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
publishedAt: "2021-06-19T14:05:48.039Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/aca713a5a3d6/001-0-nfjyvf39o49caqs7.webp"
cardSpan: "full"
originalId: "medium:aca713a5a3d6"
locale: "ja"
placeholder: false
---

ADAMANT Pool v2.0.0は、信頼性とパフォーマンスに重点を置いた完全なコードの書き直しを導入します。プールは現在、ADAMANT JS API v1.0.0を使用しており、投票者が正しくかつ timely に報酬を受け取れることを保証します。リソース要件は大幅に削減され、現在は1 vCPUと512 MB RAMの仮想マシン上でプールを実行できます。この効率性は、不要な依存関係の削除、残りの依存関係の更新、および`request`ライブラリを`axios`に置き換えることで達成されました。

いくつかの設定変更が行われました。デフォルトポートは、36668ではなく36667に変更されました。設定ファイルには、ADAMANT財団と報酬の一部を共有するための`donatewallet`パラメータに加え、新しい`log_level`オプションが含まれるようになりました。`payoutperiod`には、曜日指定による報酬配布スケジュールが可能になりました。さらに、投票トランザクション手数料は現在、投票者が支払うようになっており、報酬ごとに0.5 ADM少なくなります。オペレーターは、手数料に対して支払いが妥当なまま維持されるよう、`minpayout`パラメータを調整する必要があります。委任者の生産性は、報酬配布時にカウントされるようになりました。

その他の更新には、コードのリファクタリング、読み取り専用モードの削除、notificator向けのMarkdown関数の追加が含まれます。プールの情報パネルダッシュボードのデザインも更新されました。

![Forgingプールソフトウェアの新バージョン ADAMANT Pool v2.0.0](/images/engineering-notes/medium/aca713a5a3d6/002-0-vrmyfc6ou3ue0xnb.webp)

既存のプールを更新する際は、古いインストールを削除して新規インストールを行うことを推奨します。ただし、トランザクション履歴を含む`/db/transactions`ファイルは保存してください。

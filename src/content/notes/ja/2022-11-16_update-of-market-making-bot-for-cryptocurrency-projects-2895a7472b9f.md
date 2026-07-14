---
title: "ADAMANT Trade & Market-making Bot v5.1.0 リリース"
slug: "update-of-market-making-bot-for-cryptocurrency-projects-2895a7472b9f"
description: "ADAMANT Trade & Market-making botは、暗号資産取引所で取引を実行するための無料オープンソースソフトウェアです。取引高の生成、スプレッド・流動性の維持などをサポート"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/update-of-market-making-bot-for-cryptocurrency-projects-2895a7472b9f"
publishedAt: "2022-11-16T04:09:02.513Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2895a7472b9f/001-1-3lizhhkkfifjduf5z4zxtq-png.webp"
cardSpan: "full"
originalId: "medium:2895a7472b9f"
locale: "ja"
placeholder: false
---

![暗号資産プロジェクト向けマーケットメイキングbotのアップデート](/images/engineering-notes/medium/2895a7472b9f/002-1-ji7ldfgywe0whe5fgx-qag-gif.webp)

ADAMANT Trade & Market-making botは、暗号資産取引所で取引を実行するための無料オープンソースソフトウェアです。取引高の生成、スプレッドおよび流動性の維持、価格レンジの設定、リアルタイムに近いダイナミックオーダーブックの構築をサポートしています。バージョン5.1.0は、[ADAMANT GitHubリポジトリ](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.1.0)で利用可能になりました。

このボットはユーザー自身のサーバーまたはVPSにインストールでき、初期段階でオーダーブックを埋め、その後取引の進行に応じて動的に構築していきます。買い・売りのリミット注文または成行注文を出し、スプレッドベース、オーダーブックベース、最適（オプティマル）の3種類のマーケットメイキングポリシーを提供します。スプレッドと流動性は継続的に維持され、設定可能な価格範囲内で取引が制限されます。また、他の取引ペアや取引所間でのトークン価格の裁定取引（アービトラージ）もサポートしています。すべての管理は、ADAMANT Messengerを通じて送信されるコマンドで行われます。

要望に応じて有償サービスとして追加機能も提供しています。これには、Telegramを使った管理、追加の取引所サポート、および完全なセットアップ・設定・継続的なサポートが含まれます。高度なオーダーブック機能には、強力なアービトラージ防止システム、価格操作注文を排除するアンチチート機構、ギャップのないオーダーブック、高頻度更新、スプレッド内取引を行わないオーダーブック内マーケットメイキングなどが含まれます。また、価格チャートのスムージングや、設定された価格範囲内でリアルタイムに近いチャートを自動生成する機能も提供しています。

さらに有償オプションとして、2つのアカウントまたはキーでの取引、アカウント間でのコインのバランス調整、特定のコイン準備金の補充が可能です。価格が急騰（ポンプ）または急落（ダンプ）している期間に取引活動を強化するよう取引高を設定することもできます。パフォーマンスの改善策として、取引所API制限を節約するためのオーダーブックおよび残高のキャッシュ、ソケット接続を採用しています。通知はメール、Telegram、その他のメッセージアプリで受信できます。その他の機能には、出金機能、アカウント情報の表示、カスタムコマンドおよび統計、すべてのボットに対してリモートで一括コマンド実行可能なクロスボット通信、トークンからUSDTへの売却、オーダーブック内の大きな注文に関するアラート、価格サポートの維持、実際に売買を行わないマーケットメイキング、特定の時刻に価格を誘導するターゲット機能があります。管理用インターフェースまたはアプリも要望に応じて構築可能です。

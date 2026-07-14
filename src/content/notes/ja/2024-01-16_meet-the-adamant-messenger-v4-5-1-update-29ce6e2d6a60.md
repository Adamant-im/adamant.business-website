---
title: "ADAMANT Messenger v4.5.1 Update Notes"
slug: "meet-the-adamant-messenger-v4-5-1-update-29ce6e2d6a60"
description: "ADAMANT Messenger v4.5.1では下書きメッセージの保存、簡体字中国語対応、STORJトークンの対応、依存関係の更新およびバグ修正を導入"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/meet-the-adamant-messenger-v4-5-1-update-29ce6e2d6a60"
publishedAt: "2024-01-16T13:33:32.098Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/29ce6e2d6a60/001-0-44tyv1eodqdzthw.webp"
cardSpan: "full"
originalId: "medium:29ce6e2d6a60"
locale: "ja"
placeholder: false
---

ADAMANT Messenger v4.5.1では、下書きメッセージの永続化、簡体字中国語のローカライズ、チャットおよびウォレットにおけるSTORJトークンのサポート、およびいくつかの依存関係の更新とバグ修正が導入されました。

### 下書きメッセージ

ユーザーはメッセージを作成して後で送信するために下書きとして保存できるようになりました。これにより、1回のセッションでメッセージの作成が完了できない場合でも、途中までのテキストを失うことがなくなり、断続的な使用におけるメッセージングのワークフローが改善されます。

![Meet the ADAMANT Messenger v4.5.1 update](/images/engineering-notes/medium/29ce6e2d6a60/003-0-k0dduujxur7pnr9.webp)

### 簡体字中国語の言語サポート

アプリケーションは現在、簡体字中国語をサポートしており、中国語話者のユーザー向けのローカライズ対応範囲が拡大しました。このアップデートには、取引関連の文字列におけるロシア語ロケールの複数形エラーの修正も含まれます。

![Meet the ADAMANT Messenger v4.5.1 update](/images/engineering-notes/medium/29ce6e2d6a60/002-0-l2314o6c9trohor6.webp)

### STORJトークンの統合

STORJがサポートされるウォレット資産として追加され、ユーザーは以前からサポートされている暗号資産に加えて、チャット内で直接STORJを送受信できるようになりました。

![Meet the ADAMANT Messenger v4.5.1 update](/images/engineering-notes/medium/29ce6e2d6a60/004-0-n9t5myjiuilzj6-d.webp)

### バグ修正および技術的更新

ウォレットの左チートナビゲーションの問題が解決されました。Vue、Vuetify、Electronを含む基盤ライブラリが更新され、READMEおよび国際化設定も更新されました。

このリリースはGitHubで利用可能であり、ソースコードからアプリケーションをビルドできます。ADAMANT Messengerは、Web、Tor、Android、Windows、Linux、macOSを対象とするプログレッシブWebアプリケーションです。

---
title: "ADAMANT Messenger v4.12.0：プライベートな会話のためのより安全なPWA"
slug: "adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
description: "ADAMANT Messenger v4.12.0は、分散型メッセンジャー、ウォレット、およびPWAエクスペリエンスのための包括的なセキュリティアップデートです。ブラウザ、モバイル、Tor、デスクトップの全ユーザーは直ちにアップデートしてください。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
publishedAt: "2026-08-11T00:19:47.725Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:3afcd8416678"
coverImage: "/images/engineering-notes/medium/3afcd8416678/001-e1683c8738.webp"
locale: "ja"
placeholder: false
---

ADAMANT Messenger v4.12.0は、分散型メッセンジャー、ウォレット、およびPWAエクスペリエンスのための包括的なセキュリティアップデートです。ブラウザ、モバイル、Tor、デスクトップの全ユーザーは、機密データに対する保護強化の恩恵を受けるため、直ちにアップデートを行ってください。

刷新されたPWAは、匿名アカウント作成、チャット管理、マルチアセットウォレット制御のための馴染み深いインターフェースを維持しています。これまでと同様、電話番号やメールアドレス、中央管理者は一切不要です。ユーザーのパスフレーズが、匿名アドレスおよび自己管理型ウォレットにアクセスするための唯一の鍵となります。

インターフェースの背後では、v4.12.0において確認されていた保存型XSSパスが修正され、レガシーなv-htmlレンダリングが削除されました。また、SafeHtmlによるMarkdownの強化も行われています。さらに、分散型アプリがパブリックインフラストラクチャと対話する際の重要な境界線として、ノードが提供する公開鍵が、それが主張するアドレスと一致しているかの検証を行うようになりました。ローカルのシークレットストレージおよびパスワードの鍵導出フローは、バージョン管理されたscryptでアップグレードされ、暗号化ヘルパーは最新の@nobleおよび@scureエコシステムへ移行しました。厳格なコンテンツセキュリティポリシー（CSP）の適用範囲は、PWA、Tor、テストネット、Android、およびElectronビルド全体に拡大されています。

本リリースでは、システムの信頼性も向上しています。遅延しているコインインデクサーは正常なノードとして扱われなくなり、ノードのバージョンチェックにはセマンティックバージョニングが採用されました。さらに、AIP-6シグナルメッセージはチャット履歴に表示されないようになっています。Androidユーザー向けには、バックアップおよびデータ抽出の境界線が強化され、隠れた前提条件が削減されたことで、サインインからメッセージ配信までの経路がより安全になりました。

![ADAMANT Messenger v4.12.0：プライベートな会話のためのより安全なPWA](/images/engineering-notes/medium/3afcd8416678/002-419a41b893.webp)

![ADAMANT Messenger v4.12.0：プライベートな会話のためのより安全なPWA](/images/engineering-notes/medium/3afcd8416678/003-dc272cf2f1.webp)

![ADAMANT Messenger v4.12.0：プライベートな会話のためのより安全なPWA](/images/engineering-notes/medium/3afcd8416678/004-c1c599fad0.webp)

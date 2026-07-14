---
title: "ADAMANT Messenger 2.11.0の新セキュリティ機能"
slug: "new-security-features-in-adamant-messenger-88c8daec0b75"
description: "ADAMANT Messengerのバージョン2.11.0では、暗号資産の取引検証、不審なウォレットアドレスの警告、オンデマンドでの取引ステータス更新が導入されました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-security-features-in-adamant-messenger-88c8daec0b75"
publishedAt: "2021-05-02T08:46:58.373Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/88c8daec0b75/001-0-0hsc7oe7vtwfo3p0.webp"
cardSpan: "full"
originalId: "medium:88c8daec0b75"
locale: "ja"
placeholder: false
---

ADAMANT Messengerのバージョン2.11.0では、暗号資産の取引検証、不審なウォレットアドレスに対する警告、オンデマンドでの取引ステータス更新が導入されています。

### KVS内の不審なウォレット

ADAMANTは、ブロックチェーンのキーバリューストア（KVS）にウォレットアドレスを保存しており、これによりチャット内での暗号資産送金が可能になっています。アドレスの保存にはアカウントのパスフレーズが必要であるため、第三者がユーザーに代わって誤ったアドレスを挿入することはできません。しかし、パスフレーズが漏洩した場合、攻撃者はそのアカウントの暗号資産アドレスを自身のものに置き換えて、被害者宛の送金を横取りする可能性があります。

これに対応するため、Messengerはログイン時にウォレットアドレスの整合性をチェックし、不一致が検出された場合はユーザーに通知するようになりました。また、パートナーに暗号資産を送信する際には、相手の保存されたアドレスも検証します。

### チャット内での暗号資産送金

チャット内での送金は、まずADAMANTブロックチェーン上に特別なメッセージを送信し、その後に実際の暗号資産取引を行う仕組みです。この特別なメッセージとオンチェーン取引の間に不整合が生じる可能性があります。たとえば、送金額、受取人、送信者、または送金時刻が一致しない場合です。Messengerはこうした不整合を検出し、ユーザーに警告を表示するようになりました。

![ADAMANT Messengerの新セキュリティ機能](/images/engineering-notes/medium/88c8daec0b75/002-0-bjwjfxdbbty8fily.webp)

チャット内でのすべての暗号資産送金は、Wallet → Coin → Balance のウォレット取引履歴にも表示されるべきです。取引ステータスは、チャット画面および取引詳細画面から手動で再確認できるようになりました。

### その他の更新

本リリースでは、複数のコインにわたる取引更新タイミングの最適化、DogeのUTXO処理の修正、ノード一覧画面でのNode.jsバージョン表示の追加、取引履歴が空に表示されるバグの修正が行われました。変更点の詳細は、[v2.11.0リリースノート](https://github.com/Adamant-im/adamant-im/releases/tag/v2.11.0)でご確認いただけます。

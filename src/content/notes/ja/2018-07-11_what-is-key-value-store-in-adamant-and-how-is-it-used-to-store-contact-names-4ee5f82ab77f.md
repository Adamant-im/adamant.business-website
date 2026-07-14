---
title: "ADAMANTのキーバリューストア：ブロックチェーン上での連絡先名の保存"
slug: "what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
description: "ADAMANTはブロックチェーン上に連絡先データを保存するキーバリューストア（KVS）を導入しました。ADAMANT Blockchainバージョン0.2.0で実装され、公開および非公開データの両方をサポートしています。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
publishedAt: "2018-07-11T07:10:16.055Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ee5f82ab77f/001-0-tvpp-oomdjax-ek8.webp"
cardSpan: "full"
originalId: "medium:4ee5f82ab77f"
locale: "ja"
placeholder: false
---

ADAMANTは、ブロックチェーン上に連絡先データを保存するためのキーバリューストア（KVS）メカニズムを導入しました。これはADAMANT Blockchainバージョン0.2.0で実装されており、公開データと非公開データの両方の保存をサポートしています。公開データの例としてはEthereumアドレスが挙げられ、非公開データの例としてはアドレス帳があります。

非公開のKVSトランザクションは他のトランザクションタイプと同様にチェーン上に保存されますが、所有者のみがアクセス可能です。トランザクションの内容は、所有者の秘密鍵のハッシュにソルトを追加して暗号化されています。詳細な技術仕様は[AIP-3](https://aips.adamant.im/AIPS/aip-3)で定義されています。

ADAMANTはインクリメンタルなデータ保存を採用しており、クライアントアプリケーションはアドレス帳全体ではなく、変更点のみを送信します。これはオンチェーンのデータサイズを最小限に抑える必要があるブロックチェーンベースのストレージにおいて重要な考慮事項です。各キーは特定の値に対応しており、たとえば連絡先のADAMANTアドレス（`U324242353425354`など）が表示名（「John」など）に対応付けられます。

ADAMANT MessengerのWebアプリケーションはこの機能をサポートするよう更新されています。ユーザーはチャット内のヘッダーにあるADAMANTアドレスをクリックすることで、連絡先の名前を変更できます。

![Key-Value Store in ADAMANT](/images/engineering-notes/medium/4ee5f82ab77f/002-0-xzokd2tzoxh9eqk2.webp)

アドレス帳のサポートは今後のリリースでiOSおよびAndroidアプリケーションにも実装予定です。

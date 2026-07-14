---
title: "ADAMANT API JS Client v2.0.0"
slug: "release-adamant-api-jsclient-v2-0-0-127766556"
description: "ADAMANT API JS ClientはTypeScriptで完全に書き直され、ネイティブな型定義が提供されます。このリリースにはgetBlockやpostなどの新しいAPIメソッドが含まれます。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v2.0.0"
publishedAt: "2023-11-02T21:58:09Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-api-jsclient"
tag: "v2.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:127766556"
locale: "ja"
placeholder: false
---

ADAMANT API JS Clientは、ネイティブな型定義を提供するために完全にTypeScriptで書き直されました。このリリースでは、`getBlock`や`post`といった追加のAPIメソッドに加えて、署名済みトランザクションを受け取りそのIDを文字列として返す新しい`getTransactionId`メソッドが導入されています。

@@CODEBLOCK1@@
@@CODEBLOCK2@@
@@CODEBLOCK3@@
複数のインスタンス作成ができない問題や、モジュールを複数回インポートした際に依存関係として使用すると競合が発生するバグなど、いくつかのバグが修正されました。

### 重大な変更

APIの初期化では、`AdamantApi`のインスタンスを作成するために`new`キーワードが必要になりました。

@@CODEBLOCK4@@
ソケットの初期化が更新され、`api.socket.initSocket()`の代わりに`api.initSocket()`を使用するようになり、コールバックを`initSocket`に渡すのではなく、`api.socket.on()`を使うようになりました。

@@CODEBLOCK5@@
あるいは、APIの初期化時に`socket`オプションを指定することもできます。

@@CODEBLOCK6@@
@@CODEBLOCK7@@
`createTransaction()`メソッドは削除されました。開発者は代わりに`createSendTransaction`、`createStateTransaction`、`createChatTransaction`、`createDelegateTransaction`、または`createVoteTransaction`を使用する必要があります。

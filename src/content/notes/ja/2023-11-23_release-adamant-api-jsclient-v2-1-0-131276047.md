---
title: "ADAMANT API JS Client v2.1.0"
slug: "release-adamant-api-jsclient-v2-1-0-131276047"
description: "api.initSocket() メソッドが WebSocketClient インスタンスを受け入れるようになり、api.socket プロパティへの代入ではなく直接ソケットを初期化できるようになりました。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v2.1.0"
publishedAt: "2023-11-23T18:06:17Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-api-jsclient"
tag: "v2.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:131276047"
locale: "ja"
placeholder: false
---

`api.initSocket()` メソッドは引数として `WebSocketClient` のインスタンスを受け取るようになりました。これにより、`api.socket` プロパティに代入するのではなく、ソケットを直接初期化できるようになります。

```js
const socket = new WebSocketClient({ /* ... */ })

api.initSocket(socket)
// instead of
api.socket = socket
```

`encodeMessage()` および `decodeMessage()` 関数は、公開鍵として Uint8Array または Buffer を受け入れるように改善され、公開鍵を文字列に変換する必要がなくなりました。

```js
import {encodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const {publicKey} = createKeypairFromPassphrase('...')
const message = encodeMessage(,, publicKey) // No need to convert public key to string
```

さらに、`decodeMessage()` はパスフレーズの代わりにキーペアを渡せるようになり、この関数がパスフレーズから繰り返しキーペアを生成するのを防ぎます。

```js
import {decodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const keyPair = createKeypairFromPassphrase('...')
const message = decodeMessage(,, keyPair,) // <- It won't create a key pair from passphrase again
```

TypeScript ユーザー向けに、`SingleTransactionHandler`、`AnyTransactionHandler`、`TransactionHandler<T extends AnyTransaction>` などのトランザクションハンドラユーティリティがライブラリからエクスポートされるようになりました。

また、いくつかの TypeScript の問題も修正されました。`AdamantApiOptions` の型定義において、`logLevel` プロパティの可能な値として `LogLevelName` が追加され、`LogLevel.Log` の代わりに `'log'` のような文字列リテラルが使用可能になりました。

```ts
const api = new AdamantApi({ /* ... */ logLevel: 'log' })
```

npm 向けに不足していた宣言モジュールが追加され、`coininfo` モジュールの宣言ファイルが見つからないエラーが解消されました。

```
Could not find a declaration file for module 'coininfo'.
/// <reference path="../../types/coininfo.d.ts" />
```

最後に、`createChatTransaction()` で使用される `ChatTransactionData` の `amount` プロパティは、真に省略可能になりました。

```diff
-  amount: number | undefined;
+  amount?: number;
```

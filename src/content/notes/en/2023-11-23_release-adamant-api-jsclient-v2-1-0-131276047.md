---
title: "ADAMANT API JS Client v2.1.0"
slug: "release-adamant-api-jsclient-v2-1-0-131276047"
description: "The api.initSocket() method now accepts an instance of WebSocketClient as an argument, allowing you to initialize the socket directly instead of assigning it to the api.socket p…"
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
locale: "en"
placeholder: false
---

The `api.initSocket()` method now accepts an instance of `WebSocketClient` as an argument, allowing you to initialize the socket directly instead of assigning it to the `api.socket` property.

```js
const socket = new WebSocketClient({ /* ... */ })

api.initSocket(socket)
// instead of
api.socket = socket
```

The `encodeMessage()` and `decodeMessage()` functions have been improved to accept public keys as Uint8Array or Buffer, eliminating the need to convert public keys to strings.

```js
import {encodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const {publicKey} = createKeypairFromPassphrase('...')
const message = encodeMessage(,, publicKey) // No need to convert public key to string
```

Additionally, `decodeMessage()` allows passing a key pair instead of a passphrase, which prevents the function from repeatedly creating a key pair from the passphrase.

```js
import {decodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const keyPair = createKeypairFromPassphrase('...')
const message = decodeMessage(,, keyPair,) // <- It won't create a key pair from passphrase again
```

For TypeScript users, the library now exports transaction handler utilities including `SingleTransactionHandler`, `AnyTransactionHandler`, and `TransactionHandler<T extends AnyTransaction>`.

Several TypeScript issues have also been resolved. The typing for `AdamantApiOptions` has been fixed by adding `LogLevelName` as a possible value for the `logLevel` property, enabling the use of string literals like `'log'` instead of `LogLevel.Log`.

```ts
const api = new AdamantApi({ /* ... */ logLevel: 'log' })
```

Missing declaration modules for npm have been added, resolving an error related to finding a declaration file for the `coininfo` module.

```
Could not find a declaration file for module 'coininfo'.
/// <reference path="../../types/coininfo.d.ts" />
```

Finally, the `amount` property in `ChatTransactionData` used by `createChatTransaction()` is now truly optional.

```diff
-  amount: number | undefined;
+  amount?: number;
```

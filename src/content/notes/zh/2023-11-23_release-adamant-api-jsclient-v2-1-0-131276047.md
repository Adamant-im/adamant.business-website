---
title: "ADAMANT API JS Client v2.1.0"
slug: "release-adamant-api-jsclient-v2-1-0-131276047"
description: "api.initSocket() 现在接受 WebSocketClient 实例作为参数，可直接初始化 socket，而无需赋值给 api.socket 属性。"
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
locale: "zh"
placeholder: false
---

现在，`api.initSocket()` 方法可以接受 `WebSocketClient` 实例作为参数，允许你直接初始化 socket，而无需将其赋值给 `api.socket` 属性。

```js
const socket = new WebSocketClient({ /* ... */ })

api.initSocket(socket)
// instead of
api.socket = socket
```

`encodeMessage()` 和 `decodeMessage()` 函数已改进，支持将公钥作为 Uint8Array 或 Buffer 传入，无需再将公钥转换为字符串。

```js
import {encodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const {publicKey} = createKeypairFromPassphrase('...')
const message = encodeMessage(,, publicKey) // No need to convert public key to string
```

此外，`decodeMessage()` 支持传入密钥对而非密码短语，避免了函数反复从密码短语生成密钥对。

```js
import {decodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const keyPair = createKeypairFromPassphrase('...')
const message = decodeMessage(,, keyPair,) // <- It won't create a key pair from passphrase again
```

对于 TypeScript 用户，库现在导出了事务处理器工具，包括 `SingleTransactionHandler`、`AnyTransactionHandler` 和 `TransactionHandler<T extends AnyTransaction>`。

同时修复了多个 TypeScript 问题。已通过将 `LogLevelName` 添加为 `logLevel` 属性的可能值来修复 `AdamantApiOptions` 的类型定义，从而支持使用 `'log'` 这样的字符串字面量，而无需使用 `LogLevel.Log`。

```ts
const api = new AdamantApi({ /* ... */ logLevel: 'log' })
```

已添加 npm 所需的缺失声明模块，解决了无法找到 `coininfo` 模块声明文件的问题。

```
Could not find a declaration file for module 'coininfo'.
/// <reference path="../../types/coininfo.d.ts" />
```

最后，`createChatTransaction()` 使用的 `ChatTransactionData` 中的 `amount` 属性现在真正变为可选。

```diff
-  amount: number | undefined;
+  amount?: number;
```

---
title: "ADAMANT API JS Client v2.1.0"
slug: "release-adamant-api-jsclient-v2-1-0-131276047"
description: "Метод api.initSocket() теперь принимает экземпляр WebSocketClient, позволяя инициализировать сокет напрямую, а не назначать его свойству api.socket"
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
locale: "ru"
placeholder: false
---

Метод `api.initSocket()` теперь принимает экземпляр `WebSocketClient` в качестве аргумента, что позволяет напрямую инициализировать сокет, не назначая его свойству `api.socket`.

```js
const socket = new WebSocketClient({ /* ... */ })

api.initSocket(socket)
// instead of
api.socket = socket
```

Функции `encodeMessage()` и `decodeMessage()` улучшены, чтобы принимать публичные ключи в виде Uint8Array или Buffer, устраняя необходимость преобразования публичных ключей в строки.

```js
import {encodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const {publicKey} = createKeypairFromPassphrase('...')
const message = encodeMessage(,, publicKey) // No need to convert public key to string
```

Кроме того, `decodeMessage()` позволяет передавать пару ключей вместо пароля, что предотвращает многократное создание пары ключей из пароля.

```js
import {decodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const keyPair = createKeypairFromPassphrase('...')
const message = decodeMessage(,, keyPair,) // <- It won't create a key pair from passphrase again
```

Для пользователей TypeScript библиотека теперь экспортирует вспомогательные утилиты для обработки транзакций, включая `SingleTransactionHandler`, `AnyTransactionHandler` и `TransactionHandler<T extends AnyTransaction>`.

Также исправлены несколько проблем, связанных с TypeScript. Исправлена типизация `AdamantApiOptions` путём добавления `LogLevelName` в качестве допустимого значения для свойства `logLevel`, что позволяет использовать строковые литералы, такие как `'log'`, вместо `LogLevel.Log`.

```ts
const api = new AdamantApi({ /* ... */ logLevel: 'log' })
```

Добавлены недостающие объявления модулей для npm, устранена ошибка, связанная с отсутствием файла объявления для модуля `coininfo`.

```
Could not find a declaration file for module 'coininfo'.
/// <reference path="../../types/coininfo.d.ts" />
```

Наконец, свойство `amount` в `ChatTransactionData`, используемое `createChatTransaction()`, теперь действительно является необязательным.

```diff
-  amount: number | undefined;
+  amount?: number;
```

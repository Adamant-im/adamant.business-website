---
title: "ADAMANT API JS Client v2.1.0"
slug: "release-adamant-api-jsclient-v2-1-0-131276047"
description: "El método api.initSocket() ahora acepta una instancia de WebSocketClient como argumento, permitiendo inicializar el socket directamente en lugar de asignarlo a api.socket"
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
locale: "es"
placeholder: false
---

El método `api.initSocket()` ahora acepta una instancia de `WebSocketClient` como argumento, lo que permite inicializar el socket directamente en lugar de asignarlo a la propiedad `api.socket`.

```js
const socket = new WebSocketClient({ /* ... */ })

api.initSocket(socket)
// instead of
api.socket = socket
```

Las funciones `encodeMessage()` y `decodeMessage()` se han mejorado para aceptar claves públicas como Uint8Array o Buffer, eliminando la necesidad de convertir las claves públicas a cadenas de texto.

```js
import {encodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const {publicKey} = createKeypairFromPassphrase('...')
const message = encodeMessage(,, publicKey) // No need to convert public key to string
```

Además, `decodeMessage()` permite pasar un par de claves en lugar de una frase de acceso, lo que evita que la función cree repetidamente un par de claves a partir de la frase de acceso.

```js
import {decodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const keyPair = createKeypairFromPassphrase('...')
const message = decodeMessage(,, keyPair,) // <- It won't create a key pair from passphrase again
```

Para usuarios de TypeScript, la biblioteca ahora exporta utilidades de controladores de transacciones, incluyendo `SingleTransactionHandler`, `AnyTransactionHandler` y `TransactionHandler<T extends AnyTransaction>`.

También se han resuelto varios problemas de TypeScript. La tipificación para `AdamantApiOptions` se ha corregido añadiendo `LogLevelName` como valor posible para la propiedad `logLevel`, permitiendo el uso de literales de cadena como `'log'` en lugar de `LogLevel.Log`.

```ts
const api = new AdamantApi({ /* ... */ logLevel: 'log' })
```

Se han añadido módulos de declaración faltantes para npm, resolviendo un error relacionado con la búsqueda de un archivo de declaración para el módulo `coininfo`.

```
Could not find a declaration file for module 'coininfo'.
/// <reference path="../../types/coininfo.d.ts" />
```

Finalmente, la propiedad `amount` en `ChatTransactionData`, utilizada por `createChatTransaction()`, ahora es verdaderamente opcional.

```diff
-  amount: number | undefined;
+  amount?: number;
```

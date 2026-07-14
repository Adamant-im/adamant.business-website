---
title: "ADAMANT API JS Client v2.0.0"
slug: "release-adamant-api-jsclient-v2-0-0-127766556"
description: "El cliente JS de ADAMANT API ha sido reescrito completamente en TypeScript con tipado nativo. Esta versión incluye nuevos métodos como getBlock y post, además de correcciones clave."
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
locale: "es"
placeholder: false
---

El cliente JS de ADAMANT API ha sido reescrito completamente en TypeScript para proporcionar tipado nativo. Esta versión introduce métodos API adicionales como `getBlock` y `post`, junto con un nuevo método `getTransactionId` que acepta una transacción firmada y devuelve su ID como una cadena.

js
// antes
const block = await api.get('blocks/get', { id });

// después
const block = await api.getBlock(id);
``n
js
await api.post('transactions/process', { transaction });
``n
js
import {getTransactionId} from 'adamant-api'
const id = getTransactionId(signedTransaction)
``n
Se han corregido varios errores, incluido un problema que impedía la creación de múltiples instancias y un fallo en el que la importación del módulo varias veces generaba conflictos al usarse como dependencia.

### Cambios importantes

La inicialización de la API ahora requiere la palabra clave `new` para crear instancias de `AdamantApi`.

js
import { AdamantApi } from 'adamant-api';

const api = new AdamantApi({ nodes: [/* ... */] });
``n
La inicialización del socket ha sido actualizada, reemplazando `api.socket.initSocket()` por `api.initSocket()` y usando `api.socket.on()` en lugar de pasar callbacks a `initSocket`.

ts
// antes
api.socket.initSocket({
  admAddress: 'U1234..',
  onNewMessage(transaction) {
    // ...
  },
});

// después
api.initSocket({ admAddress: 'U1234..' });

api.socket.on((transaction: AnyTransaction) => {
  // ...
});
``n
Alternativamente, puedes especificar la opción `socket` al inicializar la API.

ts
// socket.ts
import { WebSocketClient, TransactionType } from 'adamant-api';

const socket = new WebSocketClient({ admAddress: 'U1234..' });

socket.on([TransactionType.CHAT_MESSAGE, TransactionType.SEND], (transaction) => {
  // manejar mensajes de chat y transacciones de transferencia de tokens
});

socket.on(TransactionType.VOTE, (transaction) => {
  // manejar transacción de voto por delegado
});

export { socket };
``n
ts
// api.ts
import { AdamantApi } from 'adamant-api';
import { socket } from './socket';

export const api = new AdamantApi({
  socket,
  nodes: [/* ... */],
});
``n
El método `createTransaction()` ha sido eliminado. Los desarrolladores deben usar `createSendTransaction`, `createStateTransaction`, `createChatTransaction`, `createDelegateTransaction` o `createVoteTransaction` en su lugar.

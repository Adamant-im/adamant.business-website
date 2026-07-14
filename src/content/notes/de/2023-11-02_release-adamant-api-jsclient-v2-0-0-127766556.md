---
title: "ADAMANT API JS Client v2.0.0"
slug: "release-adamant-api-jsclient-v2-0-0-127766556"
description: "Der ADAMANT API JS Client wurde vollständig in TypeScript umgeschrieben, um native Typisierung zu bieten. Diese Version bietet neue API-Methoden wie getBlock und post sowie eine neue Methode getTransactionId."
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
locale: "de"
placeholder: false
---

Der ADAMANT API JS Client wurde vollständig in TypeScript umgeschrieben, um native Typisierungen bereitzustellen. Diese Version führt zusätzliche API-Methoden wie `getBlock` und `post` ein, sowie eine neue Methode `getTransactionId`, die eine signierte Transaktion entgegennimmt und ihre ID als Zeichenkette zurückgibt.

js
// before
const block = await api.get('blocks/get', { id });

// after
const block = await api.getBlock(id);
@@CODEBLOCK1@@
js
await api.post('transactions/process', { transaction });
@@CODEBLOCK2@@
js
import {getTransactionId} from 'adamant-api'
const id = getTransactionId(signedTransaction)
@@CODEBLOCK3@@
Es wurden mehrere Fehler behoben, darunter ein Problem, das die Erstellung mehrerer Instanzen verhinderte, sowie ein Bug, bei dem das mehrfache Importieren des Moduls Konflikte verursachte, wenn es als Abhängigkeit verwendet wurde.

### Breaking changes

Die API-Initialisierung erfordert nun das Schlüsselwort `new`, um Instanzen von `AdamantApi` zu erstellen.

js
import { AdamantApi } from 'adamant-api';

const api = new AdamantApi({ nodes: [/* ... */] });
@@CODEBLOCK4@@
Die Socket-Initialisierung wurde aktualisiert: `api.socket.initSocket()` wurde durch `api.initSocket()` ersetzt, und nun wird `api.socket.on()` verwendet, anstatt Rückruffunktionen an `initSocket` zu übergeben.

ts
// before
api.socket.initSocket({
  admAddress: 'U1234..',
  onNewMessage(transaction) {
    // ...
  },
});

// after
api.initSocket({ admAddress: 'U1234..' });

api.socket.on((transaction: AnyTransaction) => {
  // ...
});
@@CODEBLOCK5@@
Alternativ kann die `socket`-Option bei der Initialisierung der API angegeben werden.

ts
// socket.ts
import { WebSocketClient, TransactionType } from 'adamant-api';

const socket = new WebSocketClient({ admAddress: 'U1234..' });

socket.on([TransactionType.CHAT_MESSAGE, TransactionType.SEND], (transaction) => {
  // handle chat messages and transfer tokens transactions
});

socket.on(TransactionType.VOTE, (transaction) => {
  // handle vote for delegate transaction
});

export { socket };
@@CODEBLOCK6@@
ts
// api.ts
import { AdamantApi } from 'adamant-api';
import { socket } from './socket';

export const api = new AdamantApi({
  socket,
  nodes: [/* ... */],
});
@@CODEBLOCK7@@
Die Methode `createTransaction()` wurde entfernt. Entwickler sollten stattdessen `createSendTransaction`, `createStateTransaction`, `createChatTransaction`, `createDelegateTransaction` oder `createVoteTransaction` verwenden.

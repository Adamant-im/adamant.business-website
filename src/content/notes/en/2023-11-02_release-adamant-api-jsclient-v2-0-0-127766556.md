---
title: "ADAMANT API JS Client v2.0.0"
slug: "release-adamant-api-jsclient-v2-0-0-127766556"
description: "The ADAMANT API JS Client has been fully rewritten in TypeScript to provide native typings. This release introduces additional API methods such as getBlock and post, along with…"
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
locale: "en"
placeholder: false
---

The ADAMANT API JS Client has been fully rewritten in TypeScript to provide native typings. This release introduces additional API methods such as `getBlock` and `post`, along with a new `getTransactionId` method that accepts a signed transaction and returns its ID as a string.

js
// before
const block = await api.get('blocks/get', { id });

// after
const block = await api.getBlock(id);
``n
js
await api.post('transactions/process', { transaction });
``n
js
import {getTransactionId} from 'adamant-api'
const id = getTransactionId(signedTransaction)
``n
Several bugs have been fixed, including an issue that prevented the creation of multiple instances and a bug where importing the module multiple times caused conflicts when used as a dependency.

### Breaking changes

The API initialization now requires the `new` keyword to create instances of `AdamantApi`.

js
import { AdamantApi } from 'adamant-api';

const api = new AdamantApi({ nodes: [/* ... */] });
``n
Socket initialization has been updated, replacing `api.socket.initSocket()` with `api.initSocket()` and using `api.socket.on()` instead of passing callbacks to `initSocket`.

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
``n
Alternatively, you can specify the `socket` option when initializing the API.

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
The `createTransaction()` method has been removed. Developers should use `createSendTransaction`, `createStateTransaction`, `createChatTransaction`, `createDelegateTransaction`, or `createVoteTransaction` instead.

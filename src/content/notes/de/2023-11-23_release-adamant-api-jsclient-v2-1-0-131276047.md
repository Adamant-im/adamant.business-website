---
title: "ADAMANT API JS Client v2.1.0"
slug: "release-adamant-api-jsclient-v2-1-0-131276047"
description: "Die Methode api.initSocket() akzeptiert jetzt eine Instanz von WebSocketClient als Argument, um den Socket direkt zu initialisieren, anstatt sie der api.socket-Eigenschaft zuzuweisen."
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
locale: "de"
placeholder: false
---

Die Methode `api.initSocket()` akzeptiert jetzt eine Instanz von `WebSocketClient` als Argument, wodurch Sie den Socket direkt initialisieren können, anstatt ihn der `api.socket`-Eigenschaft zuzuweisen.

```js
const socket = new WebSocketClient({ /* ... */ })

api.initSocket(socket)
// instead of
api.socket = socket
```

Die Funktionen `encodeMessage()` und `decodeMessage()` wurden verbessert, um öffentliche Schlüssel als Uint8Array oder Buffer zu akzeptieren. Dadurch entfällt die Notwendigkeit, öffentliche Schlüssel in Zeichenketten umzuwandeln.

```js
import {encodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const {publicKey} = createKeypairFromPassphrase('...')
const message = encodeMessage(,, publicKey) // No need to convert public key to string
```

Zusätzlich ermöglicht `decodeMessage()`, ein Schlüsselpaar anstelle einer Passphrase zu übergeben. Dadurch wird verhindert, dass die Funktion wiederholt ein Schlüsselpaar aus der Passphrase erzeugt.

```js
import {decodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const keyPair = createKeypairFromPassphrase('...')
const message = decodeMessage(,, keyPair,) // <- It won't create a key pair from passphrase again
```

Für TypeScript-Nutzer exportiert die Bibliothek nun Transaktions-Handler-Utils, einschließlich `SingleTransactionHandler`, `AnyTransactionHandler` und `TransactionHandler<T extends AnyTransaction>`.

Mehrere TypeScript-Probleme wurden ebenfalls behoben. Die Typisierung für `AdamantApiOptions` wurde korrigiert, indem `LogLevelName` als möglicher Wert für die Eigenschaft `logLevel` hinzugefügt wurde. Dadurch können String-Literale wie `'log'` statt `LogLevel.Log` verwendet werden.

```ts
const api = new AdamantApi({ /* ... */ logLevel: 'log' })
```

Fehlende Deklarationsmodule für npm wurden hinzugefügt, wodurch ein Fehler beim Auffinden einer Deklarationsdatei für das `coininfo`-Modul behoben wurde.

```
Could not find a declaration file for module 'coininfo'.
/// <reference path="../../types/coininfo.d.ts" />
```

Schließlich ist die Eigenschaft `amount` in `ChatTransactionData`, die von `createChatTransaction()` verwendet wird, nun tatsächlich optional.

```diff
-  amount: number | undefined;
+  amount?: number;
```

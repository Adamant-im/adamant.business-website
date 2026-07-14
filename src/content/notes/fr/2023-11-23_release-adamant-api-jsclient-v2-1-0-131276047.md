---
title: "ADAMANT API JS Client v2.1.0"
slug: "release-adamant-api-jsclient-v2-1-0-131276047"
description: "La méthode api.initSocket() accepte désormais une instance de WebSocketClient, permettant une initialisation directe du socket au lieu de l'assigner à api.socket."
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
locale: "fr"
placeholder: false
---

La méthode `api.initSocket()` accepte désormais une instance de `WebSocketClient` en tant qu'argument, ce qui permet d'initialiser directement le socket au lieu de l'assigner à la propriété `api.socket`.

```js
const socket = new WebSocketClient({ /* ... */ })

api.initSocket(socket)
// instead of
api.socket = socket
```

Les fonctions `encodeMessage()` et `decodeMessage()` ont été améliorées pour accepter les clés publiques sous forme de Uint8Array ou de Buffer, éliminant ainsi la nécessité de convertir les clés publiques en chaînes de caractères.

```js
import {encodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const {publicKey} = createKeypairFromPassphrase('...')
const message = encodeMessage(,, publicKey) // No need to convert public key to string
```

De plus, `decodeMessage()` permet désormais de passer une paire de clés au lieu d'une phrase secrète, évitant ainsi à la fonction de recréer plusieurs fois une paire de clés à partir de la phrase secrète.

```js
import {decodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const keyPair = createKeypairFromPassphrase('...')
const message = decodeMessage(,, keyPair,) // <- It won't create a key pair from passphrase again
```

Pour les utilisateurs de TypeScript, la bibliothèque exporte désormais des utilitaires de gestionnaire de transactions, notamment `SingleTransactionHandler`, `AnyTransactionHandler` et `TransactionHandler<T extends AnyTransaction>`.

Plusieurs problèmes liés à TypeScript ont également été résolus. La définition de type pour `AdamantApiOptions` a été corrigée en ajoutant `LogLevelName` comme valeur possible pour la propriété `logLevel`, permettant ainsi d'utiliser des littéraux de chaînes comme `'log'` au lieu de `LogLevel.Log`.

```ts
const api = new AdamantApi({ /* ... */ logLevel: 'log' })
```

Des modules de déclaration manquants pour npm ont été ajoutés, corrigeant une erreur liée à la recherche d'un fichier de déclaration pour le module `coininfo`.

```
Could not find a declaration file for module 'coininfo'.
/// <reference path="../../types/coininfo.d.ts" />
```

Enfin, la propriété `amount` dans `ChatTransactionData`, utilisée par `createChatTransaction()`, est désormais véritablement facultative.

```diff
-  amount: number | undefined;
+  amount?: number;
```

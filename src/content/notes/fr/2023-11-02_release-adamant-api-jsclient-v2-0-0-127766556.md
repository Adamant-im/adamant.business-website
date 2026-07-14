---
title: "ADAMANT API JS Client v2.0.0"
slug: "release-adamant-api-jsclient-v2-0-0-127766556"
description: "Le client JS API ADAMANT a été entièrement réécrit en TypeScript pour offrir des typages natifs. Cette version introduit de nouvelles méthodes comme getBlock et post, ainsi que getTransactionId."
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
locale: "fr"
placeholder: false
---

Le client JS API ADAMANT a été entièrement réécrit en TypeScript pour offrir des typages natifs. Cette version introduit de nouvelles méthodes API telles que `getBlock` et `post`, ainsi qu'une nouvelle méthode `getTransactionId` qui accepte une transaction signée et renvoie son ID sous forme de chaîne de caractères.

@@CODEBLOCK1@@
@@CODEBLOCK2@@
@@CODEBLOCK3@@
Plusieurs bogues ont été corrigés, notamment un problème empêchant la création de plusieurs instances et un bogue où l'importation du module plusieurs fois provoquait des conflits lorsqu'il était utilisé comme dépendance.

### Changements cassants

L'initialisation de l'API nécessite désormais le mot-clé `new` pour créer des instances de `AdamantApi`.

@@CODEBLOCK4@@
L'initialisation du socket a été mise à jour : `api.socket.initSocket()` est remplacé par `api.initSocket()` et on utilise désormais `api.socket.on()` au lieu de passer des rappels à `initSocket`.

@@CODEBLOCK5@@
Alternativement, vous pouvez spécifier l'option `socket` lors de l'initialisation de l'API.

@@CODEBLOCK6@@
@@CODEBLOCK7@@
La méthode `createTransaction()` a été supprimée. Les développeurs doivent utiliser à la place `createSendTransaction`, `createStateTransaction`, `createChatTransaction`, `createDelegateTransaction` ou `createVoteTransaction`.

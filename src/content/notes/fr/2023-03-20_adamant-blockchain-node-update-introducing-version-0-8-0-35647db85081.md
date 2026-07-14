---
title: "Mise à jour du nœud blockchain ADAMANT : version 0.8.0"
slug: "adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
description: "ADAMANT, la plateforme de messagerie décentralisée open source basée sur la technologie blockchain, a publié la version 0.8.0 du nœud. Cette mise à jour concerne les améliorations d'API et les optimisations."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
publishedAt: "2023-03-20T08:43:48.499Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:35647db85081"
locale: "fr"
placeholder: false
---

ADAMANT, la plateforme de messagerie décentralisée open source basée sur la technologie blockchain, a publié la version 0.8.0 du nœud. Cette mise à jour se concentre sur les améliorations et optimisations d'API plutôt que sur des changements de consensus, donc la mise à jour de votre nœud est facultative.

## Améliorations de l'API

Les points de terminaison `/api/transactions` et `/api/chats/get` acceptent désormais `inId` ou `isIn` comme paramètres de requête équivalents. Par exemple, `/api/chats/get?InId=U6386412615727665758` et `/api/chats/get?isIn=U6386412615727665758` produisent le même résultat. De plus, les identifiants d'utilisateur dans les points de terminaison `/api/chats/get` et `/api/chatrooms` sont désormais insensibles à la casse, ce qui signifie que `/api/chatrooms/U6386412615727665758` et `/api/chatrooms/u6386412615727665758` sont traités de manière identique.

Les transactions et `POST /api/accounts/delegates` acceptent désormais une transaction soit comme un objet simple, soit imbriquée dans une propriété `transaction`. Les deux formes ci-dessous sont valides :

```bash
curl -X POST https://endless.adamant.im/api/transactions/process -H 'Content-Type: application/json' -d '{"type": 0, "amount": 100000000, ...}'
# or {"transaction": { "type": 0, "amount": 100000000, ... }}
```

Le point de terminaison `/api/states/get` inclut désormais une propriété `confirmations`, et les performances de requête de `generatorPublicKey` ont été optimisées. Une option `cors` a également été ajoutée à `config.json` pour faciliter la configuration cross-origin.

## Corrections de bogues et changements incompatibles

La mise à jour corrige une erreur « permission denied for schema public » qui affectait certains déploiements. Toutefois, la version 0.8.0 introduit un changement incompatible : le point de terminaison `/api/blocks` ne renvoie plus une propriété `count`. Les applications qui dépendent de ce champ devront être mises à jour en conséquence.

Étant donné que cette version n'altère pas les règles de consensus, les nœuds existants peuvent continuer à fonctionner avec la version précédente sans problème de compatibilité.

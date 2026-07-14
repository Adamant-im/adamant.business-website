---
title: "Développer des applications et services sur la blockchain ADAMANT avec l'API JavaScript v1.0.0"
slug: "develop-apps-and-services-upon-messenger-s-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
description: "ADAMANT est une blockchain publique conçue pour le messagerie anonyme. Ce qui la rend unique, ce sont les services construits dessus. Tout développeur peut créer des programmes…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/develop-apps-and-services-upon-messengers-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
publishedAt: "2021-05-28T20:22:13.112Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f00922f5b00d/001-0-fghvl6xn-ahzkh9m.webp"
cardSpan: "full"
originalId: "medium:f00922f5b00d"
locale: "fr"
placeholder: false
---

ADAMANT est une blockchain publique conçue pour la messagerie anonyme. Ce qui la rend unique, ce n’est pas la blockchain elle-même, mais les services construits sur celle-ci. Tout développeur peut écrire des programmes qui exploitent ses fonctionnalités, notamment le transfert anonyme de messages et de signaux, le stockage chiffré permanent, l’accès aux données depuis plusieurs appareils, des comptes temporaires rapides et une haute fiabilité.

Plusieurs applications fonctionnent déjà sur la blockchain ADAMANT. On y trouve un messager et un portefeuille cryptographique, un bot d’échange de cryptomonnaies, un service d’authentification à deux facteurs basé sur la blockchain, ainsi qu’un bot de gestion de primes.

![Développer des applications et services sur la blockchain du messager — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/002-0-dtmatfmf-pnkc0hj.webp)

![Développer des applications et services sur la blockchain du messager — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/003-0-45fiuq9gnu-tgiot.webp)

![Développer des applications et services sur la blockchain du messager — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/004-0-oyzmxof2phgcsl2c.webp)

### ADAMANT JavaScript API v1.0.0

L’API JavaScript ADAMANT a été mise à jour vers la [v1.0.0](https://www.npmjs.com/package/adamant-api). Par rapport à la version précédente, la bibliothèque est plus fiable lors des requêtes sur la blockchain et plus facile à utiliser. Elle illustre la décentralisation en pratique : si un nœud du réseau ne peut pas répondre à une requête, la bibliothèque redirige automatiquement vers un autre nœud, en réessayant plusieurs fois jusqu’à l’obtention d’un résultat. Le développeur n’a pas besoin de gérer manuellement le basculement entre nœuds.

Un exemple basique de requête sur la blockchain :

```javascript
api.get('blocks').then(response => {
  console.log(response.data)
})
```

La bibliothèque a été entièrement retravaillée, avec des dépendances mises à jour et nettoyées, ainsi que des fonctions internes réécrites. La version 1.0.0 n’est pas compatible avec l’ancienne v0.5.3, mais la migration est simple. La documentation complète est disponible sur le [wiki adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient/wiki).

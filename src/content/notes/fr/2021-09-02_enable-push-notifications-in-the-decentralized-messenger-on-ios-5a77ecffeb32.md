---
title: "Activer les notifications push dans ADAMANT Messenger sur iOS"
slug: "enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
description: "ADAMANT Messenger pour iOS peut notifier les utilisateurs des nouveaux messages même quand l'application n'est pas en cours d'exécution, grâce au service ANS."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
publishedAt: "2021-09-02T20:37:14.112Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/5a77ecffeb32/001-0-gssgbcsz1xeu5gpg.webp"
cardSpan: "full"
originalId: "medium:5a77ecffeb32"
locale: "fr"
placeholder: false
---

ADAMANT Messenger pour iOS peut notifier les utilisateurs des nouveaux messages même lorsque l'application n'est pas en cours d'exécution, grâce au ADAMANT Notification Service (ANS). Le processus commence lorsqu'un utilisateur envoie un message signal chiffré contenant un jeton unique à un nœud blockchain ADAMANT, l'adresse ADAMANT du service ANS étant le destinataire. ANS interroge ensuite la blockchain pour déchiffrer le jeton de l'utilisateur et filtre les transactions où l'adresse ADM de l'utilisateur est le destinataire. Il demande alors à APNS de livrer ces transactions, qui contiennent des messages chiffrés, sur l'appareil de l'utilisateur identifié par le jeton unique. Enfin, APNS notifie l'appareil, et l'application Messenger utilise sa clé secrète (phrase secrète) pour déchiffrer les messages.

Cette architecture garantit que l'appareil de l'utilisateur n'entre jamais en communication directe avec ANS, ce qui signifie qu'ANS ne connaît jamais l'adresse IP ou toute autre identité de l'appareil. Leur communication s'effectue uniquement via les nœuds blockchain. Pour activer les notifications push dans l'application, les utilisateurs doivent activer l'option « Rester connecté » et sélectionner un type de notification push.

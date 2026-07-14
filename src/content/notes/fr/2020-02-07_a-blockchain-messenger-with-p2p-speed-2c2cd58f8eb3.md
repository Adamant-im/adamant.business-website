---
title: "Un messager blockchain avec la vitesse du P2P"
slug: "a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
description: "La version 2.4.0 de l'application ADAMANT PWA ajoute le support des WebSockets, augmentant considérablement la vitesse de messagerie pour concurrencer les messagers P2P classiques."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
publishedAt: "2020-02-07T03:03:50.348Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2c2cd58f8eb3/001-0-nhjz84euai2uyek8-png.webp"
cardSpan: "full"
originalId: "medium:2c2cd58f8eb3"
locale: "fr"
placeholder: false
---

La version 2.4.0 de l'application ADAMANT PWA introduit le support des WebSockets, augmentant considérablement la vitesse de messagerie pour concurrencer les messagers P2P classiques. Les WebSockets permettent un partage de données instantané entre un nœud et l'application de messagerie, en informant les utilisateurs des nouveaux événements et des transactions non confirmées immédiatement.

Lorsqu'un message est envoyé, il est d'abord reçu par un seul nœud et affiché avec le statut « Livré à un nœud » ✔ en une fraction de seconde, ce qui signifie que le destinataire l'a déjà reçu. Le message est ensuite vérifié par d'autres nœuds à travers le réseau décentralisé, garantissant ainsi les avantages de sécurité d'un messager blockchain. Une fois vérifié et inclus dans un nouveau bloc, le statut passe à « Enregistré sur la blockchain » ⚭. Ce processus de vérification prend quelques secondes.

Actuellement, les nœuds communiquent entre eux avec un léger délai. Si les deux utilisateurs sont connectés au même nœud, les messages sont transmis instantanément. S'ils sont connectés à des nœuds différents, la livraison peut prendre quelques secondes. Les utilisateurs peuvent tester cela en accédant à la liste des nœuds dans la section Paramètres et en désactivant tous les nœuds sauf un.

![Un messager blockchain avec la vitesse du P2P](/images/engineering-notes/medium/2c2cd58f8eb3/002-0-7eq9vdfgyflcuptg-png.webp)

Les mises à jour futures ajouteront des connexions prises en charge entre les sockets et les nœuds afin d'éliminer les retards, quel que soit le nœud auquel les utilisateurs sont connectés. En plus du support des WebSockets et des nouveaux indicateurs d'état blockchain, la version 2.4.0 inclut le support du jeton Resfinex (RES), une mise à jour du nom et du logo de Stably Dollar (USDS), ainsi que divers ajustements d'interface, comme une boîte de dialogue « Acheter et vendre des jetons » mise à jour et une hauteur ajustée du menu « Envoyer un jeton ». Cette version introduit également une validation des adresses BTC et corrige des problèmes liés au collage d'adresses depuis le presse-papiers et à l'envoi de montants négatifs.

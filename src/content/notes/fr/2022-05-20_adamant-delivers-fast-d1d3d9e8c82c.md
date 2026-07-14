---
title: "ADAMANT iOS ajoute les connexions socket pour des messages rapides"
slug: "adamant-delivers-fast-d1d3d9e8c82c"
description: "ADAMANT pour iOS prend désormais en charge les connexions socket, égalisant la vitesse de messagerie à celle des messagers classiques."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-delivers-fast-d1d3d9e8c82c"
publishedAt: "2022-05-20T12:48:31.779Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d1d3d9e8c82c/001-1-djgmlycgrt1rto-ajz7ifw-png.webp"
cardSpan: "full"
originalId: "medium:d1d3d9e8c82c"
locale: "fr"
placeholder: false
---

ADAMANT pour iOS prend désormais en charge les connexions socket, alignant la vitesse de livraison des messages sur celle des messagers classiques. Les applications de bureau avaient déjà implémenté les sockets, garantissant ainsi une communication rapide et cohérente entre plateformes, quel que soit le client utilisé par votre interlocuteur.

La confidentialité et la sécurité des échanges restent inchangées. Les messages sont toujours chiffrés et stockés sur la blockchain, préservant ainsi les garanties fondamentales d’ADAMANT.

Lorsqu’un message est envoyé, il apparaît d’abord avec le statut « Livré à un nœud » et est vérifié par un seul nœud. Une fois la transaction confirmée par l’ensemble du réseau blockchain, le statut passe à « Enregistré sur la blockchain » ⚭.

La version 2.4.0 inclut la prise en charge des sockets pour l’envoi et la réception instantanés, ainsi que la possibilité d’ouvrir directement un chat spécifique depuis une notification push.

Une courte démonstration du flux de livraison est disponible sur [YouTube](https://youtube.com/shorts/OSYL9ELVEjE).

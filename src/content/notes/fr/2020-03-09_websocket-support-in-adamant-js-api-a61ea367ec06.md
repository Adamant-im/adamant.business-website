---
title: "Prise en charge de WebSocket dans l'API JavaScript ADAMANT"
slug: "websocket-support-in-adamant-js-api-a61ea367ec06"
description: "L'API JavaScript ADAMANT passe à la version 0.5.0 avec la prise en charge de WebSocket pour des notifications en temps réel."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/websocket-support-in-adamant-js-api-a61ea367ec06"
publishedAt: "2020-03-09T11:13:06.699Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/a61ea367ec06/001-0-jbifihsmsrhhth2.webp"
cardSpan: "full"
originalId: "medium:a61ea367ec06"
locale: "fr"
placeholder: false
---

ADAMANT est un projet open source disposant d'une API blockchain publique, d'un outil en ligne de commande (Console) et d'un client API JavaScript. Le client API JavaScript a été mis à jour vers la version 0.5.0, la fonctionnalité la plus marquante étant l'ajout de la prise en charge de WebSocket.

Grâce aux connexions WebSocket, les applications reçoivent des notifications instantanées lors de l'arrivée de nouvelles transactions et de nouveaux messages. Cela réduit la latence par rapport à l'interrogation (polling) de l'API REST, permettant aux bots et services de répondre plus rapidement aux demandes des utilisateurs.

Cette version est disponible sur GitHub, et la documentation de l'API JavaScript est maintenue dans le wiki du projet.

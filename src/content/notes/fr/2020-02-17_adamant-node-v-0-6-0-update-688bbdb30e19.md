---
title: "ADAMANT Node v0.6.0 Update"
slug: "adamant-node-v-0-6-0-update-688bbdb30e19"
description: "Un messager décentralisé repose sur deux composants : le système blockchain et les applications clientes. La blockchain est maintenue par des nœuds réseau qui fournissent des données aux applications et traitent les requêtes entrantes."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v-0-6-0-update-688bbdb30e19"
publishedAt: "2020-02-17T09:23:50.372Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/688bbdb30e19/001-1-fmo2vlyn2yehfv84inqtmq-png.webp"
cardSpan: "full"
originalId: "medium:688bbdb30e19"
locale: "fr"
placeholder: false
---

Un messager décentralisé repose sur deux composants : le système blockchain et les applications clientes. La blockchain est maintenue par des nœuds réseau qui fournissent des données aux applications et traitent les requêtes entrantes. ADAMANT a publié la version 0.6.0 de son logiciel de nœud, disponible sur la page des publications GitHub du projet.

Cette version améliore les connexions socket et l'API des transactions. Les connexions socket renvoient désormais `recipientPublicKey`, et les points de terminaison de l'API des transactions — y compris KVS et Chats — incluent maintenant un champ `block_timestamp` dans leurs réponses. Le point de terminaison `/states/get/` a été étendu pour prendre en charge les paramètres `SenderIds` et `keyIds`, ainsi que les requêtes POST. Cette publication inclut également une correction pour les migrations et un ensemble de documentation mis à jour.

La mise à jour n'est pas obligatoire pour tous les opérateurs de nœuds. Toutefois, les nœuds qui doivent se connecter à des applications messageries doivent être mis à jour vers la dernière version.

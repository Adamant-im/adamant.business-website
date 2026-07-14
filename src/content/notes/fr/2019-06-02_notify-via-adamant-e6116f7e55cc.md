---
title: "Notifier via ADAMANT"
slug: "notify-via-adamant-e6116f7e55cc"
description: "ADAMANT offre plusieurs propriétés adaptées au transport de notifications : chaque message est validé sur la chaîne, les messages sont immuables, le stockage est quasi illimité."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/notify-via-adamant-e6116f7e55cc"
publishedAt: "2019-06-02T14:22:43.887Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e6116f7e55cc/001-1-8rvans74h-cl-ux-bpeiaw-png.webp"
cardSpan: "full"
originalId: "medium:e6116f7e55cc"
locale: "fr"
placeholder: false
---

ADAMANT offre plusieurs propriétés qui le rendent adapté comme transport de notification : chaque livraison de message est validée sur la chaîne, les messages et leur ordre sont immuables, la durée de stockage est effectivement illimitée, et l'accès n'est pas lié à un appareil spécifique. Le projet est open source. Un exemple concret est celui des opérateurs de pools de cryptomonnaies recevant des notifications sur le fonctionnement de leur pool via des messages ADAMANT.

Les développeurs peuvent intégrer les notifications ADAMANT via trois interfaces principales. La console ADAMANT propose une commande `send message` et constitue un outil en ligne de commande indépendant du langage. Pour les applications JavaScript, la fonction `send` est disponible dans la bibliothèque cliente JS de l'API ADAMANT. Enfin, le nœud natif ADAMANT expose sa propre API pour une intégration directe.

Le contenu des messages prend en charge le formatage Markdown et les Emoji, permettant ainsi des notifications structurées et lisibles.

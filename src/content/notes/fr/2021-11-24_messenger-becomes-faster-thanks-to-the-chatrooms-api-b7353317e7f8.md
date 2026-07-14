---
title: "Le messager devient plus rapide grâce à l'API Chatrooms"
slug: "messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
description: "L'API Chatrooms améliore la vitesse de chargement des messages jusqu'à dix fois, réduit la consommation mémoire et CPU dans ADAMANT Messenger."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
publishedAt: "2021-11-24T14:07:09.171Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b7353317e7f8/001-0-tot3wyqtwfswo3kx.webp"
cardSpan: "full"
originalId: "medium:b7353317e7f8"
locale: "fr"
placeholder: false
---

ADAMANT traite chaque message comme une transaction blockchain, ce qui renforce la confidentialité et la sécurité, mais pose des défis en termes de rapidité et de récupération des messages. Les API blockchain standard exigeaient de récupérer toutes les transactions pour afficher une conversation. La nouvelle API Chatrooms, conçue spécifiquement pour les messagers instantanés, rend le chargement des messages jusqu'à dix fois plus efficace tout en réduisant la consommation de mémoire et de CPU.

![Le messager devient plus rapide grâce à l'API Chatrooms](/images/engineering-notes/medium/b7353317e7f8/002-0-g1gbxwpdnkihcskz.webp)

En pratique, le chargement d'un compte avec la version précédente prenait 25 secondes et consommait 80 Mo de mémoire. Avec la nouvelle version, le chargement prend 3 secondes et utilise 28 Mo de mémoire, soit une augmentation de performance de huit fois. Le gain de performance augmente avec le nombre de messages stockés dans un compte.

Chatrooms propose deux points de terminaison : `/api/chatrooms/U000000000000` et `/api/chatrooms/U000000000000/U000000000001`. Le premier permet de récupérer la liste des discussions pour un compte spécifique, tandis que le second récupère les messages échangés entre deux comptes. La pagination est prise en charge afin de minimiser le transfert de données, comme détaillé dans l'AIP 14. Ces points de terminaison peuvent être utilisés par n'importe quelle application, y compris les messagers ou les bots.

Pour prendre en charge cette fonctionnalité, les nœuds ont été mis à jour afin de gérer les nouvelles requêtes applicatives. Contrairement à la version précédente, qui téléchargeait tous les messages en une fois pour une consultation hors ligne, l'API Chatrooms télécharge les messages à la demande et nécessite une connexion Internet.

La version v3.0.0 introduit l'API Chatrooms ainsi que plusieurs autres mises à jour. Elle remplace le nœud HTTP, supprime l'échange Resfinex et le jeton RES, et implémente une solution de contournement pour un bogue `includePending` de Lisk Service. D'autres correctifs corrigent la `background-color` du thème clair/sombre, résolvent une boucle de mise à jour infinie dans la liste des transactions ADM et mettent à jour les dépendances.

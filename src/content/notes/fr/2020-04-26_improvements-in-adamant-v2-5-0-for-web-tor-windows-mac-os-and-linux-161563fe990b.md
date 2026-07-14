---
title: "Améliorations dans ADAMANT v2.5.0 pour le Web, Tor, Windows, Mac OS et Linux"
slug: "improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-and-linux-161563fe990b"
description: "ADAMANT v2.5.0 apporte plusieurs améliorations et corrections de bogues sur ses applications Web, Tor et desktop, avec de nouveaux nœuds, corrections de connexion et mise à jour des échanges."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-linux-161563fe990b"
publishedAt: "2020-04-26T17:21:28.135Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/161563fe990b/001-0-rzxpq8psh7gjckqp.webp"
cardSpan: "full"
originalId: "medium:161563fe990b"
locale: "fr"
placeholder: false
---

ADAMANT v2.5.0 introduit plusieurs améliorations et corrections de bogues sur ses applications Web, Tor et desktop. En tant que messager basé sur la blockchain, ADAMANT bénéficie d'un nombre accru de nœuds réseau pour une meilleure décentralisation. L'application web inclut désormais neuf nœuds, composés de trois types HTTP et six types HTTPS. Lors de l'utilisation d'une connexion HTTPS, seuls les nœuds HTTPS sont disponibles, tandis que les applications desktop Windows, macOS et Linux peuvent accéder à l'ensemble des neuf nœuds.

La mise à jour affine également la liste des échanges pour acheter et vendre de l'ADM, en supprimant IDCM et en ajoutant CoinDeal, ainsi qu'en mettant à jour les liens pour Resfinex et Bit-Z. Le support Markdown d'ADAMANT a été amélioré pour afficher correctement les polices à chasse fixe dans les blocs `code`.

![Améliorations dans ADAMANT v2.5.0 pour le Web, Tor, Windows, Mac OS et Linux](/images/engineering-notes/medium/161563fe990b/002-0-sqpbhli5aps7yqjd.webp)

Dans la version Tor du messager, les connexions WebSocket ont été corrigées afin d'assurer une livraison plus rapide des messages.

![Améliorations dans ADAMANT v2.5.0 pour le Web, Tor, Windows, Mac OS et Linux](/images/engineering-notes/medium/161563fe990b/003-0-fblaod14ec32orwh.webp)

Les autres correctifs de maintenance de cette version incluent la mise à jour des dépendances, des vérifications du protocole des nœuds, ainsi que des corrections concernant les statuts des nœuds et les connexions socket sur les hôtes HTTP. La mise à jour corrige également les noms statiques des chats, la validation des adresses collées dans le flux « Démarrer un nouveau chat », et la génération de codes QR pour les adresses ADM sur Windows et d'autres applications. Des améliorations de localisation ont été apportées aux messages d'erreur « pas de clé publique » et « pas de hachage ».

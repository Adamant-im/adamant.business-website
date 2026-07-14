---
title: "Atteindre la vitesse des messageries instantanées dans ADAMANT"
slug: "speed-comparable-to-classic-instant-messengers-9fd54197b221"
description: "ADAMANT a réduit le temps de livraison des messages à 0-2 secondes grâce à des optimisations réseau et de propagation des transactions."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/speed-comparable-to-classic-instant-messengers-9fd54197b221"
publishedAt: "2021-07-15T11:15:24.341Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9fd54197b221/001-0-nrvhmelzkoggifv.webp"
cardSpan: "full"
originalId: "medium:9fd54197b221"
locale: "fr"
placeholder: false
---

Les messageries blockchain échangent naturellement la vitesse contre la sécurité et l'anonymat, car la livraison des messages est généralement limitée par la fréquence de génération des blocs. ADAMANT a résolu cette limitation, réduisant le temps de livraison des messages à entre 0 et 2 secondes.

Ce gain de performance a été obtenu grâce à deux optimisations principales. Dans un premier temps, ADAMANT a mis en œuvre des connexions socket client-nœud pour permettre des vitesses de communication pair-à-pair. Ensuite, les configurations des nœuds ont été mises à jour pour échanger les transactions plus rapidement, en se concentrant particulièrement sur la propagation des transactions non confirmées à travers le réseau. En conséquence, les utilisateurs connectés à différents nœuds du réseau reçoivent désormais les messages presque instantanément, rapprochant l'expérience de communication de celle des messageries instantanées centralisées classiques.

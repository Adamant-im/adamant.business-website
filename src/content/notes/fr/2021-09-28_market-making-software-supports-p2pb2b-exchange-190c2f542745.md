---
title: "ADAMANT Trading & Market making v4.3.4 ajoute le support de l'échange P2PB2B"
slug: "market-making-software-supports-p2pb2b-exchange-190c2f542745"
description: "ADAMANT Trading & Market making v4.3.4 prend désormais en charge l'échange P2PB2B, permettant la génération de volume, le remplissage du carnet d'ordres et le maintien du spread et de la liquidité sur cette plateforme."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/market-making-software-supports-p2pb2b-exchange-190c2f542745"
publishedAt: "2021-09-28T20:32:29.436Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/190c2f542745/001-1-kq44fxjolwz-4xefiypybg-png.webp"
cardSpan: "full"
originalId: "medium:190c2f542745"
locale: "fr"
placeholder: false
---

ADAMANT Trading & Market making v4.3.4 prend désormais en charge l'échange P2PB2B, permettant la génération de volume, le remplissage du carnet d'ordres et le maintien du spread et de la liquidité sur cette plateforme. L'échange Atomars a été retiré de cette version.

Le bot récupère désormais les décimales et les informations sur les paires de trading directement depuis les échanges lorsque cela est possible, réduisant ainsi la configuration manuelle. Les dépendances ont été mises à jour, et le projet utilise désormais l'API ADAMANT JS v1.1.0. Les améliorations internes incluent l'intégration d'eslint et un refactoring général du code.

La gestion des notifications a été étendue pour prendre en charge plusieurs adresses, et les soldes ainsi que les ordres sont désormais sauvegardés séparément pour chaque expéditeur. Les commandes ont également été mises à jour.

ADAMANT Trading & Market making est open source et gratuit. Le journal complet des modifications est disponible sur la [page de la version v4.3.4](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4).

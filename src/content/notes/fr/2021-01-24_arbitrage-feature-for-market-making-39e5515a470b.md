---
title: "Fonction d'arbitrage pour le market-making"
slug: "arbitrage-feature-for-market-making-39e5515a470b"
description: "Le bot de trading et de market-making ADAMANT prend désormais en charge une fonction d'arbitrage. Les détenteurs de jetons peuvent configurer la surveillance des prix sur d'autres exchanges et utiliser la commande /enable pw."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/arbitrage-feature-for-market-making-39e5515a470b"
publishedAt: "2021-01-24T16:41:51.417Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/39e5515a470b/001-0-vcyqehma-vfieqdv-png.webp"
cardSpan: "full"
originalId: "medium:39e5515a470b"
locale: "fr"
placeholder: false
---

Le bot de trading et de market-making ADAMANT prend désormais en charge une fonction d'arbitrage. Les détenteurs de jetons peuvent configurer la surveillance des prix sur d'autres exchanges et sur des paires de trading à l'aide de la commande `/enable pw`.

Lorsqu'un market maker trade un jeton sur plusieurs paires ou exchanges, il peut désigner une paire de référence dans une plage numérique et cibler les autres paires par rapport à celle-ci. Après réception d'une plage de prix provenant d'une autre paire de trading, le bot placera soit directement des ordres d'achat et de vente selon la politique *strict*, soit estimera les prix réels selon la politique *smart*. Par exemple, à partir d'un carnet d'ordres donné, la politique *strict* pourrait donner une plage de 0,0122–0,0128, tandis que la politique *smart* donnerait une plage plus large de 0,0114–0,0133.

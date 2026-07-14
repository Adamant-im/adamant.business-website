---
title: "Fabrication maison de liquidité avec ADAMANT TradeBot v6.0.0"
slug: "diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
description: "Le bot ADAMANT de trading et de création de liquidité est un outil open source pour émetteurs de jetons et exchanges de cryptomonnaies ayant besoin de liquidité autonome."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
publishedAt: "2024-03-20T08:47:50.471Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/428525859b30/001-0-nwojohhggiizs7us.webp"
cardSpan: "full"
originalId: "medium:428525859b30"
locale: "fr"
placeholder: false
---

Le bot ADAMANT de trading et de création de liquidité est un outil open source destiné aux émetteurs de jetons et aux plateformes de cryptomonnaies ayant besoin de création de liquidité autonome. Il passe et exécute des ordres afin de générer du volume d'échanges, maintenir l'écart et la liquidité, construire des carnets d'ordres dynamiques et surveiller les prix des jetons. La version 6.0.0 introduit plusieurs améliorations notables pour les utilisateurs qui exploitent ou personnalisent le bot.

### Changements dans la configuration et la base de code

La base de code a été restructurée pour faciliter la personnalisation par toute personne travaillant sur le projet open source. La configuration est désormais simplifiée grâce à un projet de configuration de trading unifié, valable pour tous les exchanges pris en charge. Les fonctions de prix telles que `getSmartPrice()` et `getCleanPrice()`, ainsi que les fonctions utilitaires, ont été mises à jour pour une meilleure précision. Le surveilleur de prix et le générateur de carnet d'ordres dynamique ont également été améliorés pour un suivi du marché plus fiable.

### Nouvelle action « prevent » du surveilleur de prix

Auparavant, l'unique action du surveilleur de prix était « fill » — placer activement des ordres d'achat ou de vente pour suivre un prix de référence provenant d'un autre exchange. Cette approche pouvait exposer le bot à des manipulations par des tiers. La nouvelle action « prevent » adopte une stratégie différente : au lieu de forcer un prix en passant des ordres, elle définit une fourchette de prix sûre que les autres modules du bot (comme la liquidité) doivent respecter, interdisant ainsi d'acheter cher ou de vendre bas en dehors de cette plage.

![Fabrication maison de liquidité pour votre jeton avec le ADAMANT TradeBot mis à jour v6.0.0](/images/engineering-notes/medium/428525859b30/002-0-p2uha5tzki-2klb.webp)

### Nouvelles commandes et commandes étendues

La commande `/deposit` affiche désormais les adresses de dépôt pour toutes les chaînes disponibles, facilitant ainsi les approvisionnements.

![Fabrication maison de liquidité pour votre jeton avec le ADAMANT TradeBot mis à jour v6.0.0](/images/engineering-notes/medium/428525859b30/003-0-tj9d8w7qcgqwofa4.webp)

Une nouvelle commande `/info` affiche toutes les informations disponibles pour un jeton spécifique, y compris les détails de la chaîne.

![Fabrication maison de liquidité pour votre jeton avec le ADAMANT TradeBot mis à jour v6.0.0](/images/engineering-notes/medium/428525859b30/004-0-raft4mu2likg0c8p.webp)

L'annulation d'ordres peut désormais être filtrée par type de module (manuel, générateur de carnet d'ordres, surveilleur de prix, liquidité, etc.), par côté achat ou vente, et par prix. Cela donne aux administrateurs un contrôle plus fin lors de la gestion des ordres actifs.

![Fabrication maison de liquidité pour votre jeton avec le ADAMANT TradeBot mis à jour v6.0.0](/images/engineering-notes/medium/428525859b30/005-0-3slqf62rcikx-msf.webp)

Lors de l'utilisation des commandes `/amount`, `/interval` ou `/stats`, le bot indique désormais le volume d'échanges estimé qu'il génère, aidant ainsi les opérateurs à évaluer l'activité attendue.

![Fabrication maison de liquidité pour votre jeton avec le ADAMANT TradeBot mis à jour v6.0.0](/images/engineering-notes/medium/428525859b30/006-0-9eqmd9xwf7q7i7f6.webp)

La nouvelle commande `/account` affiche les frais de trading et le volume mensuel d'échanges pour le compte du bot, lorsque l'exchange met à disposition ces données.

![Fabrication maison de liquidité pour votre jeton avec le ADAMANT TradeBot mis à jour v6.0.0](/images/engineering-notes/medium/428525859b30/007-0-llggirhb0bb42g5m.webp)

La commande `/stats` a été étendue pour inclure les prix des paires de trading, les plus hauts et plus bas, le volume d'échanges, le meilleur bid et l'ask le plus bas du carnet d'ordres avec l'écart, la liquidité du carnet d'ordres, le volume estimé de création de marché, ainsi que les statistiques d'ordres ventilées par type avec les totaux.

![Fabrication maison de liquidité pour votre jeton avec le ADAMANT TradeBot mis à jour v6.0.0](/images/engineering-notes/medium/428525859b30/008-0-hr1rvff4aeshjtpw.webp)

### Prise en charge des exchanges

Le bot prend désormais en charge XeggeX et a mis à jour ses connecteurs pour Azbit, Coinstore, FameEX, NonKYC, P2B et StakeCube. Divers correctifs de bogues et améliorations diverses complètent cette version.

La publication et le journal des modifications sont disponibles sur GitHub : [adamant-tradebot v6.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0).

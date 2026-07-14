---
title: "Bot de market-making v7.0.0 : mise en cache des requêtes, nouvelles commandes et configuration de la base de données"
slug: "new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
description: "Le bot de market-making ADAMANT est un outil gratuit, open source et auto-hébergé pour projets cryptos et exchanges. Il génère du volume, maintient le spread et la liquidité, définit une fourchette de prix et crée un order book dynamique réaliste."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
publishedAt: "2025-02-23T06:05:24.786Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/122fa85f6829/001-0-eevpacxefsrwodwf.webp"
cardSpan: "full"
originalId: "medium:122fa85f6829"
locale: "fr"
placeholder: false
---

Le bot de market-making ADAMANT est un outil gratuit, open source et auto-hébergé destiné aux projets de cryptomonnaies et aux exchanges. Il génère du volume commercial, maintient le spread et la liquidité, définit une fourchette de prix et construit un order book dynamique proche de la réalité. La version 7.0.0 introduit la mise en cache des requêtes, plusieurs nouvelles commandes, la configuration de la base de données, ainsi qu'une série de corrections de bogues et de refactoring.

![Nouvelle mise à jour v7.0.0 du bot de market-making pour projets cryptos](/images/engineering-notes/medium/122fa85f6829/002-0-vbzoksgzwcabzz-z.webp)

### Mise en cache des requêtes

Les API des exchanges limitent le taux de requêtes, et lors d’un market-making actif, le bot peut rencontrer des erreurs `429 Rate limit exceeded`. Cela interrompt le trading et, dans certains cas, peut conduire l’exchange à bloquer le compte.

![Nouvelle mise à jour v7.0.0 du bot de market-making pour projets cryptos](/images/engineering-notes/medium/122fa85f6829/003-0-sgbs6ithtx73pqm2.webp)

La nouvelle fonctionnalité de mise en cache résout ce problème en regroupant les résultats des requêtes sur les soldes, les order books et les ordres ouverts dans un court intervalle d’environ une à deux secondes. Précédemment un module payant, la mise en cache est désormais disponible pour tous les utilisateurs.

### Nouvelles commandes

La commande `/help` affiche désormais des informations de base sur le logiciel du bot et sa configuration. Plusieurs commandes supplémentaires ont été ajoutées pour inspecter l’état de l’exchange et gérer des ordres individuels :

`/orderbook [pair] [count]` renvoie les offres et demandes actuelles depuis l’order book.

![Nouvelle mise à jour v7.0.0 du bot de market-making pour projets cryptos](/images/engineering-notes/medium/122fa85f6829/005-0-cu4bhsoehypr6ini.webp)

`/trades [pair] [count]` renvoie les transactions les plus récentes.

![Nouvelle mise à jour v7.0.0 du bot de market-making pour projets cryptos](/images/engineering-notes/medium/122fa85f6829/006-0-syt1bu8k15rurvv0.webp)

`/ticker [pair]` fournit les données ticker au format JSON, similaire à `/rates`.

![Nouvelle mise à jour v7.0.0 du bot de market-making pour projets cryptos](/images/engineering-notes/medium/122fa85f6829/007-0-uvfrkvq-y40vijsu.webp)

`/order {orderId}` récupère les détails d’un ordre spécifique par son ID.

![Nouvelle mise à jour v7.0.0 du bot de market-making pour projets cryptos](/images/engineering-notes/medium/122fa85f6829/008-0-m50bnrxoc27z38oc.webp)

`/cancel {orderId}` annule un ordre spécifique par son ID et renvoie ses détails.

![Nouvelle mise à jour v7.0.0 du bot de market-making pour projets cryptos](/images/engineering-notes/medium/122fa85f6829/009-0-um38pjzfvcanrry7.webp)

### Configuration de la base de données

Vous pouvez désormais définir les paramètres de la base de données dans le fichier de configuration, y compris le nom de la base de données. Cela permet d’exécuter plusieurs instances du bot sur un même serveur. Le trading peut consommer beaucoup de CPU et de RAM, vérifiez donc la charge des ressources avant d’exécuter plusieurs instances simultanément.

Pour configurer la base de données, modifiez `config.jsonc` et ajustez les paramètres `db` :

![Nouvelle mise à jour v7.0.0 du bot de market-making pour projets cryptos](/images/engineering-notes/medium/122fa85f6829/010-0-yfdntcpmwdyzvj8c.webp)

Cette modification est rétrocompatible ; si la configuration n’est pas mise à jour, le bot utilise les paramètres par défaut de la base de données.

### Corrections des connecteurs et autres améliorations

Les connecteurs Azbit et P2B ont reçu des corrections pour `getOrderDetails()`, incluant des solutions de contournement pour des imperfections dans les API des deux exchanges. Les modules Command, Order book et Trader ont été refactorisés, et des types TypeScript ont été ajoutés dans le cadre du travail continu sur la qualité du code. Les dépendances ont été mises à jour, la journalisation améliorée, et plusieurs bogues mineurs corrigés.

![Nouvelle mise à jour v7.0.0 du bot de market-making pour projets cryptos](/images/engineering-notes/medium/122fa85f6829/011-0-la8ixtoq1x1d6nbm.webp)

Le bot continue de fournir des notifications informatives afin que les opérateurs puissent surveiller l’activité de trading.

![Nouvelle mise à jour v7.0.0 du bot de market-making pour projets cryptos](/images/engineering-notes/medium/122fa85f6829/012-0-bb8s0ouz9vefnxus.webp)

La publication et le journal complet des modifications sont disponibles sur GitHub : [v7.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0).

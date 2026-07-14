---
title: "Sortie améliorée de /balances dans le ADAMANT TradeBot"
slug: "improved-balances-output-in-the-mm-bot-e7de04a88f8a"
description: "Des outils de market making open source ne sont efficaces que s'ils sont utilisables. Une amélioration récente du ADAMANT TradeBot rend l'interface plus informative."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improved-balances-output-in-the-mm-bot-e7de04a88f8a"
publishedAt: "2026-01-27T20:06:24.444Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/e7de04a88f8a/001-1-dqzndrygjqx5bkqeefcika-png.webp"
cardSpan: "full"
originalId: "medium:e7de04a88f8a"
locale: "fr"
placeholder: false
---

Les outils open source de market making ne sont aussi puissants que leur niveau d'utilisabilité. Une amélioration récente apportée au ADAMANT TradeBot — un bot auto-hébergé de market making pour projets cryptos et exchanges — vise à rendre l'interface plus informative, notamment pour des commandes essentielles comme `/balances`.

La demande d'amélioration, initialement suivie sous le numéro #89 dans le dépôt GitHub d'ADAMANT, propose plusieurs ajustements. Elle vise à supprimer les notes confuses lorsque aucun jeton inconnu n'est présent, corriger des bogues visuels dans les commandes associées, et ajouter des indicateurs de force de prix dans les messages de transaction. Par exemple, le bot peut désormais indiquer si une vente a été effectuée à un bon ou mauvais prix par rapport au marché.

![Sortie améliorée de /balances dans le bot MM](/images/engineering-notes/medium/e7de04a88f8a/002-1-2xdmbg-cdiktreq64dog2w-png.webp)

Pour représenter les volumes de transaction, le bot utilise une série d'émojis de créatures marines, tels que 🦐, 🍤, 🐟, 🐬, 🦈, et 🐳. Ces correspondances volume-émoji sont définies dans le fichier de configuration du bot à l'aide de seuils en USD.

```json
  /** Volume thresholds in USD for different emoji levels */
  "volumes_thresholds_usd": {
    "🦐": 10,
    "🍤": 50,
    "🐟": 100,
    "🐬": 300,
    "🦈": 1000,
    "🐳": 5000,
    "🐳🐳": 10000,
    "🐳🐳🐳": 50000
  },
```

De plus, le bot utilise des cercles colorés et des flèches pour indiquer la force du prix par rapport au marché. Un cercle vert indique un bon prix, comme un achat bas ou une vente élevée, tandis qu'un cercle rouge signale un mauvais prix, tel qu'un achat élevé ou une vente basse. Les flèches apportent une précision supplémentaire, montrant si un actif a été vendu à un prix très élevé ou acheté à un prix très bas.

Des améliorations d'utilisabilité comme celles-ci réduisent la charge cognitive pour les opérateurs du bot et rendent l'outil plus accessible. Bien que ces modifications soient actuellement implémentées dans la version Premium du bot, elles seront bientôt disponibles également dans la version open source de base.

---
title: "ADAMANT Tradebot v4.3.4"
slug: "release-adamant-tradebot-v4-3-4-50424674"
description: "Cette version ajoute le support de l'échange P2PB2B et supprime l'échange Atomars. Le bot récupère désormais les décimales et les paires de trading directement depuis les exchanges quand possible…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v4.3.4"
publishedAt: "2021-09-28T20:06:30Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v4.3.4"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:50424674"
locale: "fr"
placeholder: false
---

Cette version ajoute le support de l'échange P2PB2B et supprime l'échange Atomars. Le bot récupère désormais les décimales et les informations sur les paires de trading directement depuis les exchanges quand cela est possible, améliorant ainsi la fiabilité de la création d'ordres et des calculs de solde.

Les dépendances ont été mises à jour, notamment avec l'adoption de l'API ADAMANT JS v1.1.0. Les commandes ont été actualisées et ESLint a été ajouté au projet, accompagné d'une refonte générale du code.

Les notifications peuvent désormais être envoyées à plusieurs adresses. Les soldes et les ordres sont sauvegardés séparément pour chaque expéditeur, garantissant une gestion d'état plus propre pour plusieurs utilisateurs.

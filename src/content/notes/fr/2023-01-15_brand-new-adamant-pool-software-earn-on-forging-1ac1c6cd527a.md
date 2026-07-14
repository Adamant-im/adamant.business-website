---
title: "ADAMANT Pool v3.0.0 — Mise à jour du logiciel de pool de forge"
slug: "brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
description: "Un pool de forge permet aux utilisateurs de combiner leur poids de vote pour forger des blocs sur la blockchain ADAMANT et partager automatiquement les récompenses en ADM."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
publishedAt: "2023-01-15T15:59:48.033Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/1ac1c6cd527a/001-0-rvpkdxtavqcrrn3p.webp"
cardSpan: "full"
originalId: "medium:1ac1c6cd527a"
locale: "fr"
placeholder: false
---

Un pool de forge permet aux utilisateurs de combiner leur poids de vote pour forger des blocs sur la blockchain ADAMANT et partager automatiquement les récompenses en ADM. Le programme du pool gère le calcul et la distribution des récompenses sans intervention manuelle.

La version 3.0.0 du pool de forge ADAMANT est désormais disponible en tant que [code source ouvert](https://github.com/Adamant-im/pool). La base de code a été entièrement révisée dans un nouveau dépôt, rendant l'ancien obsolète. Cette réécriture apporte des dépendances de bibliothèques mises à jour, des performances améliorées et une utilisation réduite des ressources. Le format de configuration reste inchangé, et un script de migration est fourni pour les opérateurs passant de la version v2.

Le changement le plus visible pour les votants est une nouvelle interface Web développée avec le framework `svelte`, offrant une expérience adaptative sur les appareils de bureau et mobiles.

![ADAMANT Pool Web UI](/images/engineering-notes/medium/1ac1c6cd527a/002-0-eus0ye-v8djitrru.webp)

![ADAMANT Pool Web UI mobile](/images/engineering-notes/medium/1ac1c6cd527a/003-0-cdfhik804ra3jq2w.webp)

La sortie de la version v3.0.0 met à jour toutes les dépendances, réécrit le tableau de bord en `svelte`, et redessine ainsi que optimise l'ensemble de la base de code, tout en corrigeant les bogues connus.

Deux changements incompatibles doivent être notés. Premièrement, Node.js 18.12.1 ou une version ultérieure (LTS actuelle) est désormais requise ; les anciennes versions ne sont plus prises en charge. Deuxièmement, le pool utilise désormais `lowdb` comme base de données. Les opérateurs passant de la version v2 doivent consulter la section de migration dans le fichier README.

Voter pour un pool soutient le réseau décentralisé ADAMANT et génère un revenu passif sous forme de récompenses de forge. Une liste des pools ADAMANT actifs est disponible dans la [documentation ADAMANT](https://medium.com/adamant-im/hodl-list-of-adamant-pools-join-in-and-get-rewards-491a98610f4b).

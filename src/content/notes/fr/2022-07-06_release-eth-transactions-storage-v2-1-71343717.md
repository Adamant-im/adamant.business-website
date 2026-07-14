---
title: "ADAMANT ETH Transactions Storage v2.1"
slug: "release-eth-transactions-storage-v2-1-71343717"
description: "Cette version corrective réduit les requêtes vers le nœud Ethereum et ajoute des journaux détaillés. Elle corrige les connexions IPC et base de données."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.1"
publishedAt: "2022-07-06T08:00:44Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "ETH-transactions-storage"
tag: "v2.1"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:71343717"
locale: "fr"
placeholder: false
---

Cette version corrective pour l'outil ETH-transactions-storage réduit le nombre de requêtes envoyées au nœud Ethereum et ajoute plus de journalisation dans l'ensemble de l'application. Elle corrige la connexion IPC au nœud Ethereum ainsi que la connexion à la base de données, améliorant ainsi la fiabilité globale.

Une nouvelle variable d'environnement `LOG_FILE` a été introduite, permettant aux opérateurs de configurer l'emplacement d'écriture des journaux. Deux scripts d'aide sont désormais inclus : `ethtest.py` pour tester la connexion au nœud Ethereum et `pgtest.py` pour tester la connexion à la base de données PostgreSQL. Ces scripts facilitent le diagnostic des problèmes de connectivité lors du déploiement.

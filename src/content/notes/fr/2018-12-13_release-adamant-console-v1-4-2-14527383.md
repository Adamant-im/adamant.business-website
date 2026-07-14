---
title: "ADAMANT Console v1.4.2"
slug: "release-adamant-console-v1-4-2-14527383"
description: "Cette version d'ADAMANT Console introduit une nouvelle commande get blocks et ajoute plusieurs méthodes JSON-RPC : getBlocks, getTransactionsInBlockByHeight et getTransactionsInBlockById."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.4.2"
publishedAt: "2018-12-13T22:26:43Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.4.2"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:14527383"
locale: "fr"
placeholder: false
---

Cette version d'ADAMANT Console introduit une nouvelle commande `get blocks` et ajoute plusieurs méthodes JSON-RPC : `getBlocks`, `getTransactionsInBlockByHeight` et `getTransactionsInBlockById`.

Plusieurs corrections sont incluses. La version corrige un problème d'extension incorrecte de `~` dans les variables d'environnement sur certaines versions d'Ubuntu. Elle résout un problème selon lequel les paramètres par défaut n'étaient pas remplacés dans les fichiers de configuration personnalisés. De plus, elle corrige un problème avec `getTransactionsReceivedByAddress` qui faisait sauter les transactions reçues avec des commentaires.

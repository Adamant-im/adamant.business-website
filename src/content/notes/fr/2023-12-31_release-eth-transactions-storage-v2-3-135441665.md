---
title: "Stockage des transactions ETH v2.3.0"
slug: "release-eth-transactions-storage-v2-3-135441665"
description: "Cette version met à jour les noms de fonctions dans le code du Stockage des transactions ETH pour assurer la compatibilité avec la dernière version du package web3.py."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.3"
publishedAt: "2023-12-31T17:06:00Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "ETH-transactions-storage"
tag: "v2.3"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:135441665"
locale: "fr"
placeholder: false
---

Cette version met à jour les noms de fonctions dans l'ensemble du codebase du Stockage des transactions ETH afin de s'aligner sur les modifications introduites dans la dernière version du package web3.py. La bibliothèque web3.py renomme périodiquement des fonctions et méthodes dans le cadre de son évolution, et cette mise à jour garantit la compatibilité avec l'interface API actuelle.

Aucune nouvelle fonctionnalité n'est introduite dans cette version. Les modifications se limitent à l'ajustement des noms de fonctions, permettant au projet de continuer à fonctionner correctement avec les installations récentes de web3.py.

### Changements cassants

Les noms de fonctions ont été mis à jour pour correspondre aux nouvelles conventions du package web3.py. Tout code qui appelle ou référence directement les anciens noms de fonctions devra être mis à jour en conséquence.

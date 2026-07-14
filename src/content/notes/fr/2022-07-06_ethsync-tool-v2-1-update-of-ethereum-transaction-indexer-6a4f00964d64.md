---
title: "Outil EthSync v2.1 : mise à jour de l'indexeur de transactions Ethereum"
slug: "ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
description: "L'outil EthSync indexe les transactions Ethereum et ERC20 par adresse, offrant un historique de portefeuille similaire à Etherscan. Il s'exécute en tant que service d'arrière-plan qui se connecte à un nœud Ethereum via HTTP, WebSocket ou IPC."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
publishedAt: "2022-07-06T15:40:23.802Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:6a4f00964d64"
locale: "fr"
placeholder: false
---

L'outil EthSync indexe les transactions Ethereum et ERC20 par adresse, fournissant un historique de portefeuille similaire aux explorateurs de blocs comme Etherscan. Il s'exécute en tant que service d'arrière-plan qui se connecte à un nœud Ethereum via les API HTTP, WebSocket ou IPC — compatible avec Geth, Nethermind et d'autres nœuds standards —, stocke toutes les transactions dans une base de données Postgres et expose les données de transaction via une API alimentée par postgrest.

La version 2.1 apporte plusieurs améliorations. Le script récupère désormais toutes les données de transaction via une seule requête au nœud Ethereum, effectuant une seule requête supplémentaire par transaction pour en obtenir le statut, ce qui réduit considérablement la charge sur le nœud. La journalisation a été étendue, et une nouvelle variable d’environnement `LOG_FILE` permet aux opérateurs de spécifier un chemin de fichier facultatif pour la sortie des journaux ; si elle n’est pas définie, l’outil revient à `StreamHandler`.

Cette version corrige également des problèmes liés aux connexions IPC et à la base de données présents dans les versions précédentes. Deux nouveaux scripts de test sont inclus : `ethtest.py` vérifie la connectivité au nœud Ethereum, et `pgtest.py` teste la connexion à la base de données Postgres, simplifiant ainsi le diagnostic lors du déploiement.

L'outil EthSync fait partie du projet open-source ADAMANT et est disponible gratuitement. La documentation complète, les instructions d'installation et des exemples d'utilisation sont disponibles dans le [Readme](https://github.com/Adamant-im/ETH-transactions-storage#indexer-for-ethereum-to-get-transaction-list-by-eth-address) du projet.

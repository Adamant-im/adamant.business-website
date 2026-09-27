---
title: "ADAMANT Exchange Bot v3.0.0"
slug: "release-adamant-exchangebot-v3-0-0-397317563"
description: "ADAMANT Exchange Bot v3.0.0 est une version majeure modernisant la pile d'exécution, renforçant la sécurité des fonds et améliorant l'expérience utilisateur."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0"
publishedAt: "2026-09-26T16:47:34Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
repo: "adamant-exchangebot"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-exchangebot:397317563"
locale: "fr"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0 est une version majeure marquant une étape importante, caractérisée par une modernisation approfondie de la pile d'exécution, des protections de sécurité des fonds de niveau consensus, une couverture de tests complète et des améliorations de l'ergonomie pour les opérateurs.

### Modernisation du runtime et de l'architecture

Les exigences du moteur ont été mises à jour pour prendre en charge la version LTS moderne Node.js 22.13 ou supérieure. Les anciennes dépendances `web3-eth` et `web3-utils` ont été remplacées par `ethers` v6 pour la gestion d'Ethereum et des jetons ERC-20. La construction des transactions Bitcoin, Dash et Dogecoin a été mise à niveau vers BitcoinJS-lib 7 en utilisant les transactions Bitcoin partiellement signées (PSBT). Les requêtes de base de données ont été modernisées avec le pilote MongoDB 7, adoptant l'API asynchrone native basée sur les promesses et éliminant les rappels (callbacks) hérités. La connectivité aux nœuds a été migrée vers `adamant-api` 3.x, utilisant `AdamantApi` et `WebSocketClient`. Les modules et options de configuration hérités de Lisk (LSK) ont été entièrement supprimés. Le projet a adopté la configuration plate d'ESLint 9, Prettier 3, Jest 30 et markdownlint pour une chaîne d'outils moderne.

### Concurrence, suivi des dépôts et sécurité des fonds

La surveillance des dépôts dans le mempool a été introduite avec une fenêtre de contestation de cinq minutes pour se protéger contre les conditions de concurrence et les exploits de double réclamation. Un verrouillage par UTXO a été implémenté pour éliminer les doubles dépenses sur les blockchains UTXO, notamment BTC, DASH et DOGE. Les demandes d'échange et d'annulation entrantes sont désormais sérialisées par expéditeur afin d'éviter les conditions de concurrence. La reconnaissance automatique et le traitement rapide des transactions Dash InstantSend ont été ajoutés. Une protection `unsupportedCoinGuard` a été introduite pour gérer les transferts de pièces non prises en charge et les échecs de transport réseau de manière élégante.

### Commandes de chat et expérience utilisateur

Une commande de chat `/cancel` (également reconnue sous le nom de `cancel`) a été ajoutée, permettant aux utilisateurs d'annuler les échanges en attente nécessitant une clarification sur la pièce cible et de recevoir des remboursements automatisés, moins les frais de réseau. Les dépôts précédents sont désormais automatiquement mis en file d'attente pour remboursement lorsqu'un utilisateur envoie un nouveau transfert alors qu'il est dans l'état `inUpdateState`. L'utilitaire `formatNumber` a été amélioré pour convertir les nombres exponentiels (`e+` et `e-`) en une représentation décimale complète lisible par l'humain. La prise en charge du jeton ERC-20 Onyxcoin (XCN) a été ajoutée aux configurations et au registre des pièces.

### Configuration et résilience des nœuds

Une validation de schéma pure a été implémentée dans `configSchema.js` avec des vérifications au démarrage pour détecter immédiatement les configurations invalides. Un `nodeClient.js` résilient a été conçu avec un équilibrage de charge circulaire (round-robin) et un basculement automatique sur plusieurs points de terminaison RPC et REST. Des remplacements granulaires par pièce ont été ajoutés pour les frais, les limites de confirmation, les limites quotidiennes en USD et les bornes de prix.

### Tests et documentation

Une suite de tests complète composée de 31 suites Jest couvrant 690 tests unitaires a été ajoutée, incluant les assistants, les adaptateurs crypto, la validation de schéma de configuration et les modules d'échange sans dépendances réseau ou base de données externes. La documentation opérationnelle a été étendue avec un manuel pour agents IA `AGENTS.md`, `CONTRIBUTING.md` et un `README.md` modernisé.

### Changements majeurs

La version minimale prise en charge de Node.js est désormais la 22.13, obligeant les opérateurs à mettre à niveau leur environnement d'exécution. Les anciennes bibliothèques `web3-eth` et `web3-utils` ont été remplacées par `ethers` v6, ce qui peut affecter les intégrations personnalisées reposant sur les anciennes API Ethereum. La construction des transactions Bitcoin, Dash et Dogecoin utilise désormais BitcoinJS-lib 7 avec PSBT, modifiant le flux interne de création des transactions. Le pilote MongoDB 7 remplace le précédent, supprimant les modèles de requêtes basés sur les rappels. Tous les modules et options de configuration Lisk (LSK) ont été supprimés ; les opérateurs ayant des configurations liées à LSK devront supprimer ces entrées. La validation stricte du schéma impose désormais un arrêt immédiat en cas d'erreur, ce qui signifie que les valeurs de configuration invalides précédemment tolérées empêcheront désormais le bot de démarrer.

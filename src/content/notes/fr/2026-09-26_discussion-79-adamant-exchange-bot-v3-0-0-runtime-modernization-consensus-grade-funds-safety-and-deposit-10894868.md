---
title: "ADAMANT Exchange Bot v3.0.0 : Modernisation de l'exécution et sécurité des fonds de niveau consensus"
slug: "discussion-79-adamant-exchange-bot-v3-0-0-runtime-modernization-consensus-grade-funds-safety-and-deposit-10894868"
description: "ADAMANT Exchange Bot est un logiciel auto-hébergé pour échanger des cryptomonnaies de façon anonyme et instantanée au sein des chats chiffrés d'ADAMANT Messenger."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/79"
publishedAt: "2026-09-26T17:12:03Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10894868"
locale: "fr"
placeholder: false
---

ADAMANT Exchange Bot est un logiciel auto-hébergé permettant d'effectuer des échanges de cryptomonnaies instantanés et anonymes au sein des chats chiffrés de bout en bout d'ADAMANT Messenger. Il exploite des hot wallets pour Bitcoin, Ethereum, Dash, Dogecoin et ADAMANT sans recourir à des dépositaires tiers ni exposer d'interfaces web. La version 3.0.0 modernise la pile d'exécution, migre la cryptographie et l'intégration blockchain vers des bibliothèques actuelles, impose des invariants de sécurité des fonds de niveau consensus via le verrouillage mutex des UTXO et des requêtes, et ajoute un observateur externe de réclamations de dépôt avec une fenêtre de litige de 5 minutes. L'audit de sécurité et la maintenance sont assurés par cryptofoundry en collaboration avec la communauté des développeurs ADAMANT.

## Modernisation de la pile et de l'architecture

La base de code cible désormais Node.js 22.13+ LTS, avec des moteurs mis à jour dans `package.json` et des contraintes `.nvmrc`. Les interactions avec Ethereum et ERC-20 remplacent intégralement les anciens `web3-eth` et `web3-utils` par `ethers` v6, offrant des appels de contrat déterministes, une estimation précise des frais de gaz et une gestion fiable des nonce. La construction des transactions Bitcoin, Dash et Dogecoin migre vers les Partially Signed Bitcoin Transactions (PSBT) via `bitcoinjs-lib` 7, supprimant le `TransactionBuilder` obsolète. Les requêtes MongoDB 7 sur les collections `payments`, `incomingtxs` et `systems` utilisent désormais des async/await natifs basés sur des promesses, éliminant les modèles de callback. L'intégration du client Node passe à `adamant-api` 3.x en utilisant `AdamantApi` et `WebSocketClient` avec des assistants modernes de dérivation de clés. Le support de l'ancien Lisk (LSK) est totalement supprimé, incluant les dépendances `@liskhq/*`, `lsk_utils.js`, `lskBaseCoin.js` et les options de configuration associées. Les outils de développement adoptent la configuration plate d'ESLint 9, Prettier 3 et Jest 30.

## Garanties de concurrence et invariants de sécurité des fonds

L'exploitation automatisée d'un échange exige une sécurité financière de niveau consensus : les taux, frais, décimales et soldes doivent être exacts, et les paiements ou remboursements doivent rester strictement idempotents.

Sur les chaînes basées sur les UTXO, les paiements ou remboursements simultanés risquaient auparavant des conditions de concurrence où plusieurs transactions tentaient de dépenser les mêmes sorties non dépensées. La v3.0.0 introduit un mutex mémoire asynchrone dans `helpers/mutex.js` et `btcBaseCoin.js` qui verrouille les UTXO sélectionnés lors de la création et de la signature PSBT. Les UTXO restent verrouillés jusqu'à ce que la confirmation de diffusion soit vérifiée sur le réseau. En cas d'échec de l'assemblage ou de la diffusion de la transaction, les UTXO verrouillés sont libérés en toute sécurité vers le pool disponible, évitant ainsi les soldes bloqués sans risque de double dépense.

Les commandes de chat entrantes, les nouveaux événements de transfert et les demandes d'annulation provenant du même utilisateur sont synchronisés via un verrou mutex par expéditeur dans `incomingTxsParser.js`, éliminant les conditions de concurrence lorsque les utilisateurs envoient des transferts simultanés ou déclenchent des remboursements lors des transitions d'état. Chaque enregistrement de paiement transite par des états déterministes (`inProcessing`, `needToSendBack`, `sent`, `refunded`) persistés dans MongoDB avant la transmission réseau. Si le bot redémarre ou perd la connectivité en cours de transfert, les paiements en attente sont réconciliés et repris sans double dépense.

## Observateur de dépôt et cycle de vie des réclamations

Les dépôts externes nécessitent de corréler les transactions on-chain avec les identités de chat ADAMANT. `modules/depositWatcher.js` surveille les transactions non confirmées et entrantes via l'implémentation `getPendingIncomingTransactions` de chaque adaptateur, sans webhooks centralisés. `modules/depositClaims.js` suit les réclamations de dépôt tout au long de leur cycle de vie pour éviter les réclamations en double d'une même empreinte de transaction on-chain. Une fenêtre de litige obligatoire de 5 minutes protège contre les réorganisations de blockchain, les attaques par concurrence et les exploits de double réclamation avant l'exécution du paiement. `modules/deepExchangeValidator.js` vérifie cryptographiquement les dépôts par rapport aux enregistrements d'adresses Key-Value Storage (KVS) ADAMANT de l'expéditeur, avec mise en cache et logique de nouvelle tentative automatique.

## Améliorations de l'UX d'échange et des commandes de chat

Les utilisateurs qui envoient un dépôt sans spécifier de paire d'échange peuvent envoyer `/cancel` (ou `cancel`) dans le chat pour annuler l'échange en attente et recevoir automatiquement le dépôt en retour, moins les frais de transaction réseau. Si un utilisateur ayant un dépôt dans l'état `inUpdateState` envoie un transfert ultérieur au lieu de clarifier la devise cible, le bot met désormais en file d'attente le dépôt précédent pour un remboursement automatique au lieu de l'abandonner. L'assistant `utils.formatNumber` a été refactorisé pour développer la notation scientifique (`e+` / `e-`) en chaînes décimales complètes lisibles par l'humain avant le regroupement des chiffres et la mise en gras, corrigeant les espaces mal formés ou les artefacts d'exposant sur les nombres de grande magnitude ou les jetons à haute précision décimale. Le support natif de configuration et de registre a été ajouté pour le jeton ERC-20 Onyxcoin (XCN).

## Schéma de configuration et basculement multi-nœuds

Les fichiers de configuration (`config.jsonc`, `config.default.jsonc`) sont strictement validés par rapport aux schémas déclaratifs dans `modules/configSchema.js` au démarrage. Les clés manquantes, les cryptomonnaies inconnues dans `accepted_crypto` ou les pièces configurées sans nœuds déclenchent des erreurs immédiates (fail-fast). Le client multi-nœuds résilient dans `helpers/cryptos/nodeClient.js` effectue automatiquement un round-robin et un basculement des appels HTTP et JSON-RPC sur les points de terminaison configurés, gérant les nœuds blockchain hors ligne ou désynchronisés. Les opérateurs peuvent spécifier des remplacements par ticker pour les frais réseau (`exchange_fee_<COIN>`), les confirmations requises (`min_confirmations_<COIN>`), les limites de volume quotidien en USD (`daily_limit_usd_<COIN>`) et les limites de prix (`fixed_buy_price_usd_<COIN>`, `min_sell_price_usd_<COIN>`).

## Tests et manuel d'utilisation IA

La suite de tests comprend 31 suites de tests Jest et 690 tests unitaires couvrant les modules d'échange principaux, les adaptateurs de cryptomonnaie, les schémas de configuration et les utilitaires sans nécessiter de nœuds en direct, de MongoDB ou de clés privées réelles. Les conventions de dépôt, l'architecture technique, les directives d'invariants et les règles de discipline de changement sont formalisées dans `AGENTS.md`.

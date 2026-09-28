---
title: "ADAMANT Exchange Bot v3.0.0 : un échangeur crypto anonyme auto-hébergé au sein d'ADAMANT Messenger"
slug: "we-just-released-a-new-anonymous-crypto-exchanger-inside-adamant-messenger-101f65fdb01f"
description: "ADAMANT Exchange Bot v3.0.0 transforme une discussion en échange crypto instantané auto-hébergé, avec une sécurité renforcée, un moteur modernisé et une meilleure expérience."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/we-just-released-a-new-anonymous-crypto-exchanger-inside-adamant-messenger-101f65fdb01f"
publishedAt: "2026-09-27T13:54:25.207Z"
author: "Alex Web3"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:101f65fdb01f"
coverImage: "/images/engineering-notes/medium/101f65fdb01f/001-91e1d37743.webp"
locale: "fr"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0 transforme une discussion en un échange crypto instantané auto-hébergé, doté de contrôles de sécurité des fonds renforcés, d'un environnement d'exécution modernisé et d'une expérience opérateur optimisée. Un échange de cryptomonnaies ne nécessite pas forcément de comptes, de tableaux de bord, de sessions de navigateur ou de confier la garde de ses fonds à un tiers. Avec ADAMANT Exchange Bot, le processus d'échange se déroule directement au sein d'ADAMANT Messenger : un utilisateur envoie un actif dans la discussion, précise l'actif souhaité en retour, et le bot génère un devis, vérifie la transaction et effectue le paiement.

Il s'agit d'une modernisation complète du moteur d'échange, axée sur la sécurité, la fiabilité et l'utilisabilité pour les opérateurs.

### Ce qui distingue cet échangeur

La plupart des plateformes d'échange reposent sur le Web : comptes, formulaires, sessions, empreintes numériques de navigateur et une surface d'attaque étendue. ADAMANT Exchange Bot fonctionne au contraire au sein des discussions de messagerie. Il n'y a pas d'interface web, pas d'inscription utilisateur et aucune procédure KYC intégrée au flux du produit. L'opérateur exécute le bot sur sa propre infrastructure et contrôle ses propres hot wallets.

Les demandes d'échange ont lieu directement dans la discussion, l'interface est simple et familière, les opérateurs conservent le contrôle de leur infrastructure et de leurs fonds, et la surface d'attaque est considérablement réduite par rapport à un échangeur web conventionnel. Pour les communautés qui privilégient la confidentialité, la simplicité et l'auto-hébergement, ce modèle est particulièrement pertinent.

### Nouveautés de la version v3.0.0

Côté utilisateur, le bot est désormais plus flexible et pratique au quotidien. Une commande `/cancel` permet aux utilisateurs d'annuler un échange en attente lorsque le bot attend encore des précisions, et de recevoir un remboursement automatique déduction faite des frais de réseau. La gestion des échanges abandonnés ou interrompus a également été améliorée, évitant ainsi que des dépôts en attente ne laissent les utilisateurs et les opérateurs dans l'incertitude.

Côté opérateur, la configuration est plus stricte, les vérifications au démarrage sont plus explicites et la résilience est accrue. Le bot valide sa configuration de manière plus rigoureuse et s'arrête immédiatement s'il détecte une configuration non sécurisée. Il gère également la connectivité aux nœuds de manière plus robuste grâce à un basculement automatique entre plusieurs points de terminaison RPC ou REST.

### Conçu pour des fonds réels, pas pour des démonstrations

Lorsque des logiciels manipulent des cryptomonnaies, un fonctionnement « approximatif » ne suffit pas. De légères conditions de concurrence ou des règles de propriété de transaction ambiguës peuvent entraîner des pertes réelles. Une part importante de la version v3.0.0 est consacrée à la sécurité des fonds.

Cette version introduit un modèle de suivi des dépôts et de réclamation plus défensif, incluant une surveillance du mempool et une gestion des litiges. Le verrouillage par UTXO pour les chaînes de type Bitcoin empêche les doubles dépenses, et la sérialisation des demandes par expéditeur élimine les conditions de concurrence au niveau de la discussion lors des demandes d'échange et d'annulation. Pour Dash, le bot prend désormais en charge InstantSend, permettant une reconnaissance plus rapide des transferts éligibles. Des garde-fous plus explicites en cas de scénarios impliquant des pièces non prises en charge ou des échecs de transport garantissent que le système échoue de manière contrôlée et vérifiable.

### Une base technique modernisée

La version v3.0.0 constitue une mise à jour technologique majeure. Le projet est passé à une base Node.js actuelle et a mis à jour les bibliothèques clés de blockchain et d'infrastructure : Node.js 22.13+, ethers v6 pour la gestion d'Ethereum et des jetons ERC-20, bitcoinjs-lib v7 avec PSBT pour la construction de transactions Bitcoin, Dash et Dogecoin, MongoDB Driver 7, et adamant-api 3.x. Les outils de linting, de formatage et de test ont également été modernisés. Les éléments obsolètes qui ne correspondaient plus à l'orientation du projet, notamment l'ancien support lié à Lisk, ont été supprimés.

Cela est crucial car une infrastructure crypto pérenne nécessite une base que les développeurs peuvent maintenir, auditer et étendre sans traîner des années de dette technique.

### Actifs pris en charge et flux d'échange

ADAMANT Exchange Bot prend en charge les échanges impliquant ADM, BTC, ETH, DASH, DOGE, USDT, USDC, DAI et les jetons ERC-20.

Le flux d'échange est volontairement simple : l'utilisateur interagit avec le bot dans ADAMANT Messenger, envoie l'actif source, spécifie l'actif cible, et le bot traite le reste — devis, validation, suivi de confirmation, paiement ou remboursement en cas d'impossibilité de finaliser l'opération en toute sécurité. Cette simplicité apparente repose sur un pipeline de traitement modulaire : analyse des messages, génération de devis, validation approfondie sur la blockchain, suivi des confirmations, gestion des paiements, gestion des remboursements et vérifications finales de règlement.

### Mieux testé, mieux documenté

La version v3.0.0 est livrée avec une suite de tests automatisés considérablement étendue, couvrant le pipeline d'échange, les adaptateurs crypto, la validation de configuration et la logique auxiliaire. Le projet compte désormais des centaines de tests unitaires répartis dans des dizaines de suites de tests, sans dépendance vis-à-vis de blockchains actives ou d'une base de données réelle lors de l'exécution des tests. La documentation et les guides pour les contributeurs ont également été actualisés afin que les opérateurs et les développeurs puissent appréhender le système plus rapidement et l'utiliser en toute sécurité.

Release : [https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0](https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0)
ADAMANT Messenger : [https://adamant.im](https://adamant.im)

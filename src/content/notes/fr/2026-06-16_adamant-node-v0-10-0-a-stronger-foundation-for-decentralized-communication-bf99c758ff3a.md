---
title: "ADAMANT Node v0.10.0 : des bases renforcées pour la communication décentralisée"
slug: "adamant-node-v0-10-0-a-stronger-foundation-for-decentralized-communication-bf99c758ff3a"
description: "Le réseau ADAMANT repose sur des nœuds gérés par la communauté — des serveurs indépendants qui relaient des messages chiffrés, exposent des API et garantissent l'intégrité de la blockchain."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v0-10-0-a-stronger-foundation-for-decentralized-communication-bf99c758ff3a"
publishedAt: "2026-06-16T11:50:08.717Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/bf99c758ff3a/001-1-a8dezfm7vyio0a-74gwt6q-png.webp"
cardSpan: "full"
originalId: "medium:bf99c758ff3a"
locale: "fr"
placeholder: false
---

Le réseau ADAMANT fonctionne grâce à des nœuds gérés par la communauté — des serveurs indépendants qui relaient des messages chiffrés, fournissent des API aux messageries et maintiennent l'intégrité de la blockchain. ADAMANT Node v0.10.0 est une mise à jour majeure qui rend cette infrastructure plus rapide à exploiter, plus facile à déboguer et mieux alignée sur le fonctionnement réel des clients ADAMANT modernes. ADAMANT ne cherche pas à accumuler des chiffres impressionnants de débit ; il construit une couche de confiance décentralisée pour la communication, sur laquelle messageries, portefeuilles et dérivés peuvent s'appuyer sans sacrifier la confidentialité à un opérateur centralisé.

### Des API améliorées pour de vraies messageries

Les clients ont besoin d’un ordre précis des transactions, d’horodatages en millisecondes et de la capacité d’afficher les messages non confirmés pendant qu’une conversation se propage encore sur le réseau. La version v0.10.0 introduit `timestampMs` pour un ordonnancement des transactions au sous-seconde, sans casser le champ existant `timestamp`. Les endpoints de listage acceptent désormais `?returnUnconfirmed=1` pour inclure les transactions du mempool là où cela est pertinent. Un nouveau paramètre `includeDirectTransfers` remplace l’ancien comportement `withoutDirectTransfers`, permettant un filtrage des discussions plus propre. Le champ `count` est désormais retourné comme un nombre plutôt qu’une chaîne, simplifiant l’analyse côté client sur tous les endpoints de listage.

### Un réseau plus rapide et plus résilient

Les nœuds peuvent désormais maintenir des connexions WebSocket entre pairs, et pas seulement HTTP. Cela réduit la latence de propagation des blocs et des transactions, et offre plus de flexibilité aux opérateurs sur la manière dont leurs nœuds participent au maillage. Associé à une logique de synchronisation améliorée et à un pool de transactions entièrement réécrit, le nœud gère les conditions de réseau chargé de manière plus prévisible.

### Des outils opérationnels respectueux de votre temps

Gérer un nœud ne devrait pas exiger une connaissance approfondie de JavaScript ancien. La version v0.10.0 inclut des scripts modernisés d’installation et de réparation pour Ubuntu/Debian et CentOS/RHEL, des utilitaires localnet pour les développeurs, des remplacements de configuration pour des déploiements progressifs, et une journalisation structurée avec rotation, permettant aux opérateurs de diagnostiquer efficacement les problèmes. Cette version documente également les bonnes pratiques d’arrêt ordonné — un `kill -9` forcé sur un nœud en activité peut corrompre les miroirs d’état en mémoire, aussi v0.10.0 rend-il explicite la procédure d’arrêt correcte dans la documentation opérateur.

### Une sécurité sans effets dramatiques

Cette version migre la cryptographie vers les liaisons `sodium-native` et renforce l’admission des transactions P2P. Les vérifications d’horodatage, qui protégeaient déjà l’API publique, s’appliquent désormais également lorsque les transactions arrivent par diffusion entre pairs ([#246](https://github.com/Adamant-im/adamant/pull/246)), éliminant ainsi un vecteur réel d’empoisonnement de pool, sans toucher aux chemins de replay du consensus. Des mises à jour de dépendances en plusieurs phases réduisent l’exposition aux problèmes connus dans l’écosystème Node.js.

### Les délégués et opérateurs de nœuds doivent-ils migrer ?

Recommandé, mais pas obligatoire. La version v0.10.0 n’introduit pas de bifurcation de consensus obligatoire pour les réseaux déjà synchronisés et fonctionnant normalement ; le comportement protocolaire conditionné par la hauteur reste piloté par la configuration. Toutefois, cryptofoundry encourage les délégués et les opérateurs indépendants à migrer dès que possible. Les nouvelles messageries et API s’attendent à des fonctionnalités v0.10.0 comme `timestampMs`, les requêtes non confirmées et le transport WebSocket. Les améliorations d’installation et de journalisation rendent l’exploitation quotidienne nettement plus simple, et le renforcement de la sécurité bénéficie à l’ensemble du maillage, même si les règles de consensus ne changent pas. Rester sur des versions très anciennes finit par signifier supporter seuls les clients, et manquer les travaux de fiabilité que la communauté intègre dans des versions comme celle-ci.

### Points techniques marquants

Le runtime nécessite désormais Node.js ≥ 22.13.0 ; le support de Node 18 est abandonné. Côté API, `timestampMs`, `returnUnconfirmed`, `includeDirectTransfers` et `count` en tant que nombre sont les principales nouveautés. La couche P2P gagne le transport WebSocket entre pairs et des vérifications d’horodatage sur le chemin de diffusion. L’exploitation bénéficie de scripts d’installation et de réparation modernisés, d’utilitaires localnet, de scénarios de test en direct et de remplacements de configuration. L’expérience développeur s’améliore avec un fichier AGENTS.md, des directives CONTRIBUTING élargies et une journalisation structurée. Les endpoints HTTP obsolètes ont été supprimés, et docs.adamant.im est désormais le point d’entrée de la documentation.

Les notes complètes structurées et la liste complète des PR sont disponibles sur la [publication GitHub v0.10.0](https://github.com/Adamant-im/adamant/releases/tag/v0.10.0). Les opérateurs existants doivent consulter les notes de mise à jour, mettre à jour Node.js, récupérer v0.10.0 et redémarrer correctement. Les nouveaux opérateurs doivent utiliser les scripts d’installation officiels du tag de publication. Les développeurs doivent consulter [CONTRIBUTING.md](https://github.com/Adamant-im/adamant/blob/master/.github/CONTRIBUTING.md) pour les tests en localnet et en scénario réel.

ADAMANT est une infrastructure appartenant à la communauté. Les questions, rapports de bogues et contributions sont les bienvenus sur [github.com/Adamant-im/adamant](https://github.com/Adamant-im/adamant).

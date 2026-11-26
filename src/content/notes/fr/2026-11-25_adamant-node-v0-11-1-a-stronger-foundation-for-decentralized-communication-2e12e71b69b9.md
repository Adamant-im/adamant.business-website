---
title: "Nœud ADAMANT v0.11.1 : Sécurité, résilience et API clarifiées"
slug: "adamant-node-v0-11-1-a-stronger-foundation-for-decentralized-communication-2e12e71b69b9"
description: "La communication décentralisée repose sur des nœuds indépendants. La version v0.11.1 du nœud ADAMANT renforce la sécurité et la fiabilité sans modifier les règles de consensus."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v0-11-1-a-stronger-foundation-for-decentralized-communication-2e12e71b69b9"
publishedAt: "2026-11-25T17:54:29.629Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:2e12e71b69b9"
coverImage: "/images/engineering-notes/medium/2e12e71b69b9/001-866983f729.webp"
locale: "fr"
placeholder: false
---

La communication décentralisée repose sur des nœuds gérés de manière indépendante qui valident, échangent et préservent les données. Le nœud ADAMANT v0.11.1 est une mise à jour axée sur la sécurité et la fiabilité, renforçant les opérations quotidiennes tout en préservant les règles de consensus existantes du protocole. Il s'agit de la première version officielle de la branche v0.11 ; le code v0.11.0 avait été fusionné mais jamais marqué, et la v0.11.1 inclut un correctif réseau supplémentaire pour les pairs, les opérateurs utilisant déjà ce code doivent donc effectuer la mise à jour.

### Réduction de la surface d'attaque

Cette version supprime les contrôles de forgeage HTTP hérités et les points de terminaison d'exécution DApp. Ces surfaces incluaient des chemins d'exécution et de signature côté serveur qui n'ont plus leur place dans un nœud moderne. Leur suppression répond à l'avis GHSA-vjhq-r5fg-85cx et rend le périmètre opérationnel du nœud plus facile à appréhender. Les délégués configurent désormais le forgeage via `forging.secret` et appliquent les changements par un redémarrage en douceur. Des commandes CLI locales optionnelles permettent de verrouiller et déverrouiller les phrases secrètes chiffrées. Les API DApp en lecture seule et la gestion du consensus pour les types de transactions DApp existants restent disponibles ; les clients doivent signer les transactions localement et les soumettre via les points de terminaison de transaction standard.

### Secrets de délégué chiffrés

Les opérateurs peuvent désormais chiffrer les phrases secrètes de forgeage avec un mot de passe opérateur utilisant AES-256-GCM et scrypt. La configuration en texte clair reste compatible avec les déploiements existants. Un nœud avec des secrets chiffrés peut toujours se synchroniser, maintenir ses pairs, servir des API et traiter son mempool pendant que le forgeage est verrouillé. Après chaque redémarrage, l'opérateur déverrouille le forgeage via une invite locale ou un socket de contrôle Unix réservé au propriétaire. La prise en charge de la surveillance permet aux opérateurs d'observer l'état de verrouillage sans exposer l'identité du délégué. Le chiffrement protège les phrases secrètes stockées mais ne décharge pas l'opérateur de sa responsabilité de sécuriser l'hôte, le mot de passe, les sauvegardes et les accès.

### Résilience du réseau

Les limites anti-abus pour HTTP et WebSocket en production sont activées par défaut, couvrant les API publiques, le trafic des pairs, les tentatives de connexion et les abonnements, avec une réponse HTTP 429 documentée pour les requêtes dépassant le taux autorisé. Il existe une mise en garde importante concernant les versions mixtes : les pairs hérités qui n'envoient pas l'en-tête de négociation de limite de taux contournent les limites HTTP internes du nœud pendant la transition. Les opérateurs doivent appliquer des limites externes sur `/peer/*` au niveau de leur proxy inverse ou pare-feu. Les configurations existantes contenant explicitement des paramètres `max: 0` hérités conservent ces limites désactivées jusqu'à leur mise à jour.

Cette version limite également les vérifications de santé des pairs, gère les pairs inaccessibles de manière plus délibérée et améliore la récupération de PostgreSQL après une perte de connexion. Les scripts d'installation et de réparation vérifient désormais les snapshots avant le remplacement par défaut de la base de données, utilisent une installation des dépendances basée sur des fichiers de verrouillage (lockfiles) et sont plus prudents lors du redémarrage d'un nœud en cours de synchronisation ou de reconstruction.

### Rétablissement des connexions aux pairs en temps réel

Le correctif final de la v0.11.1 restaure la sélection sortante des pairs WebSocket. Dans le code v0.11.0 non marqué, des valeurs par défaut manquantes sur les objets de pairs actifs empêchaient la requête de candidat de renvoyer des pairs. Les nœuds pouvaient toujours se synchroniser via HTTP et recevoir des connexions WebSocket entrantes, mais la transmission en temps réel des blocs et des transactions sortantes ne fonctionnait pas. Le correctif définit les valeurs par défaut sur l'instance de pair actif, et des tests de régression couvrent désormais ces valeurs par défaut et la requête de sélection.

### Exactitude de la relecture et API plus strictes

Le règlement des rounds respecte désormais la hauteur de bloc actuelle lors de la relecture, et l'indexation des récompenses de rollback aligne chaque délégué avec ses propres changements. Les notes de version font état de vérifications d'équivalence d'état bit à bit sur le mainnet et le testnet canoniques lors d'une reconstruction complète, d'un démarrage d'image et d'une récupération par point de contrôle. Un problème de rollback préexistant distinct reste suivi dans l'issue #300.

Pour les développeurs d'applications, la gestion des filtres sur les états, les chats et les salons de discussion est désormais plus stricte. Les filtres `and:` pris en charge sont appliqués de manière cohérente ; les filtres `or:` non pris en charge et les paramètres précédemment ignorés sont rejetés. Le paramètre de clé de lot passe de `keysIds` à `keyIds`. Il s'agit de changements intentionnels et cassants de l'API HTTP ; les intégrations doivent donc être vérifiées avant tout déploiement.

### Documentation unifiée

La documentation du nœud et la spécification OpenAPI 3.2 se trouvent désormais aux côtés du code dans le dépôt du nœud, permettant de mettre à jour le comportement, la documentation et le contrat d'API simultanément. Les opérateurs et les développeurs peuvent explorer la [documentation](https://docs.adamant.im/) unifiée et le [schéma d'API](https://docs.adamant.im/schema/), incluant de nouveaux conseils pour la mise à niveau, la sécurité, la surveillance et les tests.

### Notes de mise à jour

La mise à jour n'introduit aucun fork de consensus ni aucune nouvelle migration SQL. La sérialisation des blocs et des transactions, les signatures, l'ordonnancement des délégués, les récompenses, les frais, les hauteurs d'activation et le timing des slots restent inchangés par rapport à la version v0.10.2. Elle nécessite toutefois une attention particulière concernant la compatibilité opérationnelle et de l'API HTTP. Les opérateurs doivent lire le [guide de mise à niveau](https://docs.adamant.im/own-node/upgrading.html) et vérifier les intégrations pour détecter les routes supprimées et les filtres plus stricts. Une version de Node.js prise en charge est requise : `^22.22.2 || >=24.15.0`. Arrêtez le nœud en douceur et attendez le nettoyage, puis examinez les limites de taux, la confiance du proxy et la configuration du forgeage avant de redémarrer. Si les secrets de forgeage sont chiffrés, déverrouillez-les après chaque redémarrage et vérifiez l'état de verrouillage local. Après la mise à jour, vérifiez le statut du nœud, la connectivité des pairs et les paramètres anti-abus.

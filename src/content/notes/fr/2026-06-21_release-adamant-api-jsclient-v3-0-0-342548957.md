---
title: "ADAMANT API JS Client v3.0.0"
slug: "release-adamant-api-jsclient-v3-0-0-342548957"
description: "ADAMANT API JS Client v3.0.0 : mise à jour majeure du SDK synchronisée avec ADAMANT Node v0.10.0, améliorations de fiabilité, nouvelles fonctionnalités modulaires et documentation modernisée."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.0.0"
publishedAt: "2026-06-21T15:22:41Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:342548957"
locale: "fr"
placeholder: false
---

# ADAMANT API JS Client v3.0.0

Il s'agit d'une mise à jour majeure du SDK, coordonnée avec ADAMANT Node v0.10.0. Elle met à jour le client HTTP et WebSocket pour l'API actuelle du nœud, introduit des limites de packages modulaires stables, améliore le comportement de nouvelle tentative et de basculement, ajoute des métadonnées générées de façon déterministe, et remplace la documentation héritée basée sur Wiki par un site sous contrôle de code source utilisant VitePress et TypeDoc.

## Support d'ADAMANT Node v0.10.0

La version régénère les DTO d'API à partir d'une révision figée de `adamant-schema`, incluant les horodatages en millisecondes, les données de chargeur et d'état, les comptages numériques et les champs de transaction non confirmée pouvant être nuls. Elle ajoute des paramètres de requête actuels pour les transactions et les discussions, tels que `returnUnconfirmed`, `includeDirectTransfers`, la recherche de délégué par adresse, et les requêtes de transaction multi-types. Les filtres de requête de transaction sont désormais combinés par défaut avec un `and` logique, et les filtres de montant s'appliquent uniquement aux transactions de transfert. Le SDK ajoute la construction de transaction optionnelle avec `timestampMs` et la fonction `getEpochTimeMs` ; comme `timestampMs` ne fait pas partie des octets signés, les hachages, identifiants et signatures sont préservés. Les contrôles d'intégrité sont mis à jour pour la réponse consolidée d'état du nœud et prennent en charge le filtrage par version minimale du nœud (inclusif).

## Fiabilité et comportement WebSocket

Le client n'effectue désormais plus de nouvelles tentatives pour les réponses POST explicitement rejetées, renvoyant à la place des échecs HTTP structurés et non réessayables, au lieu de boucler. Les nouvelles tentatives et le basculement vers un nœud actif sont conservés pour les requêtes sûres et les pannes réseau n'ayant pas de réponse HTTP. Les abonnements WebSocket prennent désormais en charge plusieurs adresses, types de transaction et types d'actifs de discussion, avec des gestionnaires pratiques pour les transactions et messages, des rappels de connexion et de reconnexion, une connexion et déconnexion explicites, des erreurs de connexion typées, un nettoyage des écouteurs et une gestion limitée des reconnexions.

## SDK modulaire et package npm

La racine du package reste centrée sur ADM et empêche le chargement d'implémentations spécifiques à une monnaie. Des exports de sous-chemins sont ajoutés pour ADM, les DTO d'API, les transactions, les métadonnées, ainsi que pour les utilitaires BTC, ETH, DASH et DOGE, tout en conservant le support de CommonJS et d'ESM. Les métadonnées déterministes du portefeuille sont synchronisées à partir d'une révision figée de `adamant-wallets`. Le code et les dépendances Lisk et Klayr sont supprimés, et la dérivation externe de monnaies et la validation d'adresse supportées sont standardisées. Cette version nécessite Node.js 22 ou ultérieur, adopte les métadonnées de l'espace de travail pnpm, modernise TypeScript et les dépendances, et ajoute des tests au niveau consommateur sur l'archive tarball.

## Corrections d'API conservées depuis v2.4.0

Cette version corrige le comportement du vote de délégué et des contrôles d'intégrité. Elle autorise les charges utiles sous forme de chaîne pour les messages de signal et valide les montants uniquement pour les types de messages transportant des montants. Les identifiants de transaction sont représentés sous forme de chaînes, et les utilitaires de validation sont exportés.

## Documentation, automatisation et maintenance

La documentation est fournie via un site VitePress comprenant une référence d'API générée par TypeDoc et des guides. La version inclut un workflow GitHub Pages pour la documentation avec CNAME, des fichiers README et CONTRIBUTING actualisés, des vérifications de synchronisation déterministes des schémas et métadonnées, un exécuteur Jest personnalisé, des tests pour les consommateurs de package, une couverture élargie et des tests de limites de modules. La vérification syntaxique (linting) et la configuration TypeScript sont migrées vers la chaîne d'outils actuelle, et les fichiers obsolètes sont supprimés.

### Changements cassants

Les abonnements WebSocket utilisent désormais par défaut `allDirections`. Précédemment, le client ne transmettait que les transactions entrantes avec un filtre codé en dur `recipientId === admAddress` ; désormais, il émet par défaut à la fois les transactions entrantes et sortantes. Pour restaurer l'ancien comportement, passez `direction: 'incoming'` dans les options du client WebSocket. Node.js 22 ou ultérieur est requis. Les utilitaires de monnaie doivent être importés depuis des chemins explicites tels que `adamant-api/coins/btc` et ne sont plus exportés depuis la racine du package. Le support de Lisk et Klayr a été supprimé. Les filtres de requête de transaction utilisent désormais par défaut un `and` logique, et les filtres de montant s'appliquent uniquement aux transactions de transfert. Les consommateurs doivent examiner l'utilisation obsolète de `withoutDirectTransfers` et migrer vers `includeDirectTransfers`.

La disposition des octets de transaction, la signature, les identifiants et la sémantique des signatures restent inchangés. Les consommateurs CommonJS et ESM sont couverts par le test de l'archive tarball incluse.

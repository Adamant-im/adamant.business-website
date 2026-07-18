---
title: "Accès typé complet en lecture seule aux API du nœud ADAMANT"
slug: "discussion-67-complete-typed-read-only-access-to-adamant-node-apis-10446764"
description: "Le SDK adamant-api expose désormais une surface typée complète pour les API de lecture intensive du nœud ADAMANT utilisées par les explorateurs, services de surveillance, portefeuilles, bots et autres intégrations."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/67"
publishedAt: "2026-07-17T10:54:30Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10446764"
locale: "fr"
placeholder: false
---

Le SDK `adamant-api` expose désormais une surface typée complète pour les API de lecture intensive du nœud ADAMANT utilisées par les explorateurs, les services de surveillance, les portefeuilles, les bots et d'autres intégrations. Les consommateurs n'ont plus besoin d'appels génériques `api.get()` ni de conversions locales de réponses pour les principales requêtes sur les comptes, les blocs, les délégués, les pairs, le pool et l'état du réseau, introduites ou enrichies dans ADAMANT Node v0.10.2.

## Couverture

Le SDK expose `getTopAccounts()` avec une pagination typée et un filtrage par délégué. La réponse inclut l'ordre déterministe des soldes du nœud et les métadonnées de pagination ; les requêtes avec `limit: 0` ne retournent que les métadonnées de comptage sans renvoyer les lignes de comptes.

```ts
const topDelegates = await api.getTopAccounts({
  limit: 50,
  offset: 0,
  isDelegate: 1,
});

const countOnly = await api.getTopAccounts({limit: 0});
```

Les types d'options publiques couvrent désormais les listes et recherches de blocs, les listes de délégués avec recherche par délégué unique, la recherche par nom d'utilisateur, les statistiques de forgeage, les votants et les projections du prochain forgeur, les listes de pairs connectés et la recherche exacte de pair, les listes et recherches de transactions en pool, ainsi que les plages de temps de transaction inclusives. Cela rend le SDK utilisable comme une frontière typée pour les services en lecture seule, et non plus seulement comme un assistant de signature et de diffusion.

Les contrats générés exposent désormais `consensusCodeName`, le `consensusSchedule` effectif, le `milestoneSchedule` complet des récompenses de blocs, et les valeurs `forged` de la durée de vie des délégués sous forme de chaînes d'entiers en base 10. La propriété d'exécution `producedblocks` remplace l'ancienne faute de frappe `producedlocks` générée. Un service peut récupérer la projection publique de la chaîne sans redéfinir localement la réponse :

```ts
const [network, node] = await Promise.all([
  api.getStatus(),
  api.getNodeStatus(),
]);

console.log(network.consensusCodeName);
console.log(node.consensusSchedule, node.milestoneSchedule);
```

## Sémantique des requêtes consciente des points de terminaison

Le langage de requêtes de transactions du nœud ADAMANT est plat plutôt qu'un arbre d'expressions booléennes imbriquées. Il sérialise les conditions en une seule expression SQL dans l'ordre de la chaîne de requête, avec la précédence SQL normale et sans parenthèses ajoutées pour les objets `and: {}` ou `or: {}`. Le SDK combine donc les filtres ordinaires de premier niveau avec `and` par défaut, préserve l'ordre d'insertion des objets JavaScript lors de la sérialisation, et avertit lorsque des conditions mixtes `and` / `or` rendent l'ordre sur le fil sémantiquement significatif. Il restreint les contrôles tels que `includeDirectTransfers`, `returnAsset` et `userId` aux points de terminaison compatibles, supprime les contrôles non supportés connus avant d'envoyer la requête, et n'autorise les filtres par montant que sur `/api/transactions`, là où le nœud les applique réellement. C'est intentionnellement plus strict que de transmettre chaque option partagée à chaque point de terminaison — un appel typé doit représenter un comportement que la route du nœud sélectionnée implémente effectivement.

## Provenance du schéma et compatibilité

`src/api/generated.ts` est généré de manière reproductible à partir de `Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90`. Le dépôt vérifie le fichier généré avec `npm run api-types:check`, tandis que les tests des consommateurs du paquet compilent les déclarations exportées et exercent les points d'entrée ESM et CommonJS construits. La correction de `producedlocks` en `producedblocks` est un changement de compatibilité au moment de la compilation ; les consommateurs qui construisent manuellement des fixtures de délégués ou d'état peuvent avoir besoin d'ajouter les champs désormais requis. Le traitement des réponses à l'exécution reste en pass-through — les anciennes réponses du nœud ne sont ni transformées ni rejetées par le SDK.

## État en direct aux côtés des lectures instantanées

Le même alignement sur le nœud v0.10.2 ajoute des gestionnaires WebSocket opt-in pour les événements compacts `newBlock` et les événements `balances/change` confirmés ou non confirmés. Les abonnements sont restaurés après reconnexion, et les valeurs de solde sont des remplacements absolus plutôt que des deltas. Ces événements complètent les lectures REST typées mais ne les remplacent pas : il n'y a pas de relecture ni d'instantané initial de soldes, une charge utile de solde peut ne contenir que les champs modifiés, et les événements livrés pendant la déconnexion ne sont pas réinjectés. Les clients critiques doivent réconcilier les blocs et les soldes via REST après la reconnexion.

## Limites de compatibilité

Les nouvelles capacités de comptes principaux, d'état du réseau, de délégués, de blocs et d'événements de solde nécessitent ADAMANT Node v0.10.2. La construction de transactions existante, la disposition des octets, le hachage, les identifiants, les signatures, le chiffrement, les tentatives, le basculement et la sélection de nœuds actifs restent inchangés. La racine du paquet reste centrée sur ADM ; les assistants pour les monnaies externes continuent d'utiliser des exports de sous-chemins explicites. Le SDK nécessite Node.js 22.12.0 ou supérieur, tandis que les opérateurs d'ADAMANT Node v0.10.2 doivent suivre l'exigence du nœud de 22.13.0 ou supérieur.

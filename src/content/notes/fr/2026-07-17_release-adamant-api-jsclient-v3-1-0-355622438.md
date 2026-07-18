---
title: "ADAMANT API JS Client v3.1.0"
slug: "release-adamant-api-jsclient-v3-1-0-355622438"
description: "Mise à jour du SDK coordonnée avec ADAMANT Node v0.10.2. Elle complète la surface d'API Node typée en lecture seule, ajoute des abonnements en direct aux blocs et soldes, synchronise les DTOs délégués et d'état réseau, et modernise l'outillage."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.1.0"
publishedAt: "2026-07-17T10:54:11Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:355622438"
locale: "fr"
placeholder: false
---

Cette version est une mise à jour du SDK coordonnée avec ADAMANT Node v0.10.2. Elle complète la surface d'API Node typée en lecture seule, ajoute des abonnements en direct aux blocs et aux soldes sur base volontaire, synchronise les DTOs de délégués et d'état réseau avec le schéma de référence, et modernise l'outillage du package.

## Surface d'API Node typée en lecture seule complète

Cette version ajoute `getTopAccounts()` avec des options typées `limit`, `offset` et `isDelegate`, où `limit: 0` peut être utilisé pour des métadonnées de comptage uniquement. Elle complète les types d'options pour les blocs, les délégués, la recherche de délégués et les statistiques, les pairs, les transactions en pool et les plages temporelles de transactions. La version expose les noms de code de consensus et les calendriers d'activation typés, les paliers de récompense de blocs et les montants forgés à vie par les délégués. Elle étend également les vérifications du consommateur inclus dans le package afin que les nouvelles méthodes et les contrats de réponse soient vérifiés depuis l'artefact npm construit.

## Gestion des requêtes consciente des points de terminaison

Le SDK restreint désormais les paramètres de transfert direct et autres paramètres de contrôle aux points de terminaison qui les prennent en charge. Il supprime les contrôles non pris en charge connus avant qu'une requête ne soit envoyée, au lieu de les laisser devenir des filtres inefficaces ou invalides, tout en préservant l'ordre déterministe de la chaîne de requête. Le client avertit lorsque des conditions mixtes `and` / `or` reposent sur le modèle d'expression SQL plat et sensible à l'ordre du Node, et limite les filtres de montant à `/api/transactions`, là où le Node les applique réellement.

## Abonnements d'état WebSocket du client

Cette version ajoute des abonnements `onNewBlock()` sur base volontaire pour les en-têtes compacts des blocs nouvellement appliqués, ainsi que des abonnements `onBalanceChange()` pour le solde confirmé, le solde non confirmé ou les deux. Les charges utiles de solde sont traitées comme des valeurs absolues courantes plutôt que des deltas, et la livraison partielle de champs est documentée. Les abonnements aux blocs et aux soldes sont restaurés automatiquement après la reconnexion au même nœud ou à un autre nœud sain. Les échecs de gestionnaires sont acheminés via le chemin `.catch()` existant, et les gestionnaires peuvent être supprimés via `.off()`. Ces événements sont des notifications en direct au meilleur effort, pas des flux durables. Les applications doivent restaurer leur état via REST après les déconnexions lorsque l'exactitude dépend de l'historique complet.

## Synchronisation des DTOs de référence

Les types d'API sont régénérés depuis `Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90`. La version ajoute `consensusCodeName`, `consensusSchedule` et `milestoneSchedule` aux contrats d'état réseau, et ajoute la valeur `forged` à vie du délégué tout en conservant la forme distincte de réponse de recherche de délégués. Elle corrige la propriété générée de délégué `producedlocks` en la propriété d'exécution `producedblocks`, et documente la sémantique d'instantané et de filtrage pour le prochain forgeur, les délégués, les pairs et les transactions en pool.

## Maintenance du package et de l'outillage

La version du package est fixée à `3.1.0` et déclare Node.js `>=22.12.0`. pnpm est mis à jour vers 11.13.1 avec des dépendances d'exécution et de développement rafraîchies sans ajouter de dépendances directes. Le graphe de lockfile résolu est réduit de 886 à 876 entrées de packages. Le formatage est aligné sur Prettier 3.9, et les répertoires locaux d'agents IA et d'éditeurs sont exclus du dépôt. La publication est effectuée via npm Trusted Publishing avec provenance GitHub Actions.

## Notes de compatibilité

Les nouvelles capacités de top-accounts, d'état réseau, de délégués, de blocs et d'événements de solde nécessitent ADAMANT Node v0.10.2. La disposition en octets des transactions, les hachages, les identifiants, les signatures, le chiffrement, les exports racine, la sélection de nœuds, les tentatives et le comportement de basculement restent inchangés. Le diff comprend 17 fichiers modifiés avec 1 471 insertions et 513 suppressions, couvrant l'historique complet `v3.0.0..master` pour l'API typée, les DTOs générés, les abonnements WebSocket, les tests, la documentation, les métadonnées de version et le rafraîchissement des dépendances.

## Validation

Vérifié sur Node.js 22.23.1 et pnpm 11.13.1. Toutes les vérifications ont réussi : `npm run compile`, `npm run typecheck`, `npm test` (19 suites et 253 tests réussis), `npm run lint`, `npm run test:package` (ESM, CommonJS, consommateurs en direct, sous-chemins de package et déclarations TypeScript), `npm run api-types:check`, `npm run metadata:check`, `npm run docs:build` et `git diff --check`. Les types d'API générés correspondent à la révision épinglée d'`adamant-schema`, et les métadonnées du portefeuille correspondent à `Adamant-im/adamant-wallets@54a820b6dc5e0ec77c3a6fbac91d2f7809a2f5b7`.

### Changements incompatibles

Le plancher du moteur du package passe de Node.js `>=22` à `>=22.12.0`. Les déploiements qui exécutent également ADAMANT Node v0.10.2 doivent utiliser le Node.js `>=22.13.0` requis par le Node. Les consommateurs TypeScript utilisant la propriété mal orthographiée `DelegateDto.producedlocks` doivent migrer vers `producedblocks`. Les consommateurs qui construisent manuellement les DTOs générés de délégués ou d'état réseau peuvent devoir fournir les champs nouvellement requis. Les appelants TypeScript qui transmettaient des contrôles de requête incompatibles avec le point de terminaison doivent utiliser le type d'option du point de terminaison prévu.

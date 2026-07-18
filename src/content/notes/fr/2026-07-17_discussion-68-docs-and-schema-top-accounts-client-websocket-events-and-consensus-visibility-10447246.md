---
title: "Documentation et schéma ADAMANT : comptes principaux, événements WebSocket client et visibilité du consensus"
slug: "discussion-68-docs-and-schema-top-accounts-client-websocket-events-and-consensus-visibility-10447246"
description: "Les dépôts de documentation et de schéma ADAMANT sont alignés sur l'API actuelle du nœud. Tous les changements sont additifs et rétrocompatibles — pas de fork de consensus ni de rupture de format."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/68"
publishedAt: "2026-07-17T12:40:07Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10447246"
locale: "fr"
placeholder: false
---

Les dépôts de documentation et de schéma ADAMANT ont été alignés sur la surface d'API actuelle du nœud. Tous les changements sont additifs et rétrocompatibles — aucun fork de consensus ni aucune rupture du format de transmission. La documentation en ligne est disponible à l'adresse `https://docs.adamant.im`, avec le bundle OpenAPI à `https://schema.adamant.im`.

## API des comptes principaux

`GET /api/accounts/top` fait désormais partie du contrat public. L'ordre est déterministe : `balance DESC`, puis `address ASC`. Le point de terminaison prend en charge la pagination `limit` et `offset`, un filtre optionnel `isDelegate`, des métadonnées de réponse (`count`), et `limit=0` pour les requêtes de comptage uniquement. L'ancien paramètre de configuration `topAccounts` a été supprimé — le point de terminaison est enregistré sur chaque nœud.

## WebSocket client : `newBlock` et `balances/change`

L'interface Socket.IO client dispose désormais d'événements `newBlock` compacts en option et de payloads `balances/change` au niveau des champs, qui peuvent inclure `balance`, `unconfirmedBalance`, ou les deux. Les abonnements sont indexés par `address`, `types`, `assetChatTypes`, `balances` et `blocks`. La livraison reste au mieux et non durable : les consommateurs doivent se reconnecter, se réabonner et réconcilier l'état critique via REST. Le package OpenAPI documente cela sous `x-client-websocket` avec des schémas dédiés dans `specification/websocket/`.

## Planifications de statut et `forged` des délégués

Les API de statut publiques exposent désormais la planification effective d'activation du consensus et le calendrier complet des jalons de récompense de bloc, incluant `consensusCodeName`, `consensusSchedule.activationHeights` et `milestoneSchedule` (comprenant `offset`, `distance` et `milestones`). Les réponses de liste et de récupération des délégués incluent maintenant le `forged` à vie sous forme de chaîne entière en base 10 dans les unités de base. La projection du prochain forgeur utilise la hauteur du prochain bloc aux limites de tour. Le schéma corrige également `producedlocks` en `producedblocks` et complète la couverture des paramètres de requête pour les pairs, les transactions en attente et non confirmées, ainsi que la recherche de délégués et `orderBy`.

## Alignement de l'API des blocs

La sémantique des requêtes de `GET /api/blocks` est désormais alignée sur le comportement réel du nœud. `numberOfTransactions=0` fonctionne correctement, et `orderBy`, les filtres de montant, et le `offset` après tri sont documentés avec précision. Le schéma ajoute une couverture complète des paramètres et `generatorPublicKey` sur `BlockInfoDto`. Les exemples incorrects de `timestampMs` ont été retirés de la documentation.

## Récupération opérateur : points de contrôle en mémoire

Les points de contrôle rotatifs persistés `mem_*` sont documentés pour la récupération après plantage. La fonctionnalité est contrôlée par `loading.memCheckpoints.enabled` et est activée par défaut. La documentation couvre la vérification SHA-256, la restauration en mode fail-closed, le repli vers une reconstruction déterministe complète, l'impact sur le stockage et le comportement d'arrêt gracieux (`SIGINT`/`SIGTERM` → attente de `Cleaned up successfully`). Les points de contrôle servent de cache de récupération local ; les blocs canoniques restent la source de vérité.

## Contexte de version

Ces mises à jour ciblent le nœud ADAMANT `v0.10.2`. Les consommateurs en aval — notamment `adamant-api-jsclient` — doivent régénérer les types à partir du bundle OpenAPI mis à jour. Les pull requests pertinentes couvrent les dépôts [docs](https://github.com/Adamant-im/docs/pull/39), [schema](https://github.com/Adamant-im/adamant-schema/pull/53) et [node](https://github.com/Adamant-im/adamant).

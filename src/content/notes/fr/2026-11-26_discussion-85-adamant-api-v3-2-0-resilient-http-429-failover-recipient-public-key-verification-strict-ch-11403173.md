---
title: "adamant-api v3.2.0 : basculement HTTP 429, vérification de clé publique et filtres de requête stricts"
slug: "discussion-85-adamant-api-v3-2-0-resilient-http-429-failover-recipient-public-key-verification-strict-ch-11403173"
description: "ADAMANT Node v0.11.0 introduit des limites de débit, une validation stricte des requêtes et une consolidation des sources OpenAPI, renforçant la résilience de l'API."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/85"
publishedAt: "2026-11-26T06:52:55Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:11403173"
locale: "fr"
placeholder: false
---

Avec l'introduction par ADAMANT Node v0.11.0 de limites de débit anti-abus par défaut pour REST/WebSocket, d'une validation stricte des requêtes (uniquement AND) sur les endpoints de chat et KVS, ainsi que de sources OpenAPI consolidées sous `Adamant-im/adamant`, `adamant-api` a été mis à jour pour renforcer le basculement des nœuds, la disponibilité et la sérialisation des requêtes, aussi bien pour les nœuds v0.11.0+ que pour les versions antérieures.

## Basculement résilient HTTP 429 et périodes de refroidissement

ADAMANT Node v0.11.0 impose des budgets HTTP globaux (`all`) par adresse IP et par classe de route (`status`, `read`, `publish`), et répond avec les codes `429`, `Retry-After` / `RateLimit-Reset` et `RateLimit-Scope`.

Chaque requête capture `targetNode = this.node` avant l'envoi, garantissant que les erreurs concurrentes tardives ne réaffectent pas `this.node` vers un nœud ayant déjà fait l'objet d'un basculement. Les appels concurrents à `updateNodes()` partagent une unique promesse `updateNodesPromise` en cours, plutôt que de retourner prématurément. De plus, un basculement forcé rejoignant un balayage planifié est promu en rotation forcée avec `failedNode`.

Comme `/api/node/status` est comptabilisé dans le compartiment `status` à capacité plus élevée (12 000/min contre 3 000/min pour `read`), un nœud limité en débit continue de répondre aux vérifications de santé. `NodeManager` suit désormais les périodes de refroidissement 429 par nœud (`rateLimitedUntil`, plafonnées à 60s), permettant aux balayages forcés et planifiés de privilégier les nœuds synchronisés non limités au sein des pools de 2 nœuds ou plus.

Lorsqu'aucun nœud synchronisé alternatif n'est disponible, les lectures idempotentes respectent `Retry-After` / `RateLimit-Reset` avec une gigue (jitter) allant jusqu'à 10s ; si la fenêtre de réinitialisation du nœud dépasse ce plafond ou si les tentatives sont épuisées, le SDK retourne rapidement avec des métadonnées optionnelles sur `AdamantApiResult` :

```ts
const response = await api.getBlocks();

if (!response.success) {
  if (response.status === 429 && response.retryAfterMs !== undefined) {
    console.warn(`Rate-limited (${response.rateLimitScope}), retry in ${response.retryAfterMs}ms`);
  }
}
```

Les requêtes `POST` non idempotentes (soumissions de transactions) ne sont jamais rejouées sur les réponses HTTP, y compris pour le code `429`.

## Noms de filtres simples, types d'endpoints stricts et POST /api/states/get

Les endpoints `/api/states/get`, `/api/chats/get` et `/api/chatrooms/*` acceptent désormais des noms de filtres simples. Les enveloppes `and: { ... }` sont aplaties, tandis que les enveloppes `or` non supportées sont rejetées côté client avec `success: false`. Cela corrige le problème #97 sur les nœuds antérieurs à la v0.11.0 et s'aligne sur la validation stricte de la v0.11.0.

`ChatroomsOptions`, `ChatTransactionsOptions` et `KVSOptions` reflètent désormais exactement les champs acceptés par ADAMANT Node v0.11.0, incluant `toHeight` sur `/api/chats/get` et `/api/states/get`, tout en excluant les champs de hauteur/plage rejetés sur `/api/chatrooms/*`. L'attribut obsolète `userId` sur `/api/chatrooms/*` est supprimé à l'exécution avec un avertissement de dépréciation dédié.

Les recherches KVS volumineuses peuvent désormais utiliser `POST /api/states/get` :

```ts
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

`getKVS(..., {method: 'POST'})` utilise la politique de nouvelle tentative de lecture idempotente du SDK, préservant ainsi le basculement complet 429 et 5xx.

## Disponibilité des nœuds et filtrage de l'état du chargeur

`NodeManager` inspecte désormais les champs `loader.loaded` et `loader.syncing` de `/api/node/status`. Les nœuds en cours de chargement (`loaded: false`) ou de synchronisation (`syncing: true`) sont exclus de la sélection active de l'API et des listes de connexion WebSocket ; les nœuds sans objet `loader` restent éligibles. Avec `checkHealthAtStartup: true`, `onReady` attend qu'un nœud utilisable soit effectivement sélectionné au lieu de se déclencher après un balayage de santé initial infructueux.

## Vérification des clés publiques du destinataire local et du délégué

`encodeMessage()` et `decodeMessage()` rejettent désormais les clés Ed25519 non canoniques, hors courbe et de petit ordre (ordres 1, 2, 4 et 8) avec l'erreur `invalid key`. `getPublicKey()` valide les adresses ADM localement avant d'effectuer une requête réseau et vérifie que les clés retournées par le nœud dérivent localement l'adresse demandée avant de les mettre en cache ou de les retourner. `sendMessage()` revérifie localement les clés résolues avant le chiffrement et retourne `{success: false, errorMessage}` en cas de discordance ; `voteForDelegate()` impose la liaison d'adresse et utilise des caches de délégués par client.

## Consolidation des sources OpenAPI et renforcement de la chaîne d'approvisionnement

`scripts/sync-api-types.mjs` extrait désormais la spécification OpenAPI 3.2 directement depuis `Adamant-im/adamant` (`openapi/specification/openapi.yaml`), générant `RateLimitErrorResponseDto` et `GetKVSRequestBody`. Le fichier `pnpm-workspace.yaml` impose une quarantaine de 7 jours pour les nouvelles versions de dépendances (`minimumReleaseAge: 10080`) avec des `allowBuilds` explicites et aucune vulnérabilité d'audit en production.

## Références

- PR du SDK (alignement Node v0.11.0 & dépendances) : https://github.com/Adamant-im/adamant-api-jsclient/pull/105
- Vérification de clé publique du destinataire & délégué : https://github.com/Adamant-im/adamant-api-jsclient/pull/110
- Correction des filtres de chat & KVS simples : https://github.com/Adamant-im/adamant-api-jsclient/pull/101
- Correction `onReady` pour les nœuds utilisables : https://github.com/Adamant-im/adamant-api-jsclient/pull/102
- ADAMANT Node v0.11.0 : https://github.com/Adamant-im/adamant/pull/303
- Documentation du SDK : https://js.docs.adamant.im
- OpenAPI Swagger UI : https://docs.adamant.im/schema/

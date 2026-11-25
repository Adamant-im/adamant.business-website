---
title: "Client JS API ADAMANT v3.2.0"
slug: "release-adamant-api-jsclient-v3-2-0-458278457"
description: "Le client JS API ADAMANT v3.2.0 est une version axée sur la sécurité et la correction, coordonnée avec ADAMANT Node v0.11.0."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.2.0"
publishedAt: "2026-11-25T15:08:18Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:458278457"
locale: "fr"
placeholder: false
---

Le client JS API ADAMANT v3.2.0 est une version axée sur la sécurité et la correction, coordonnée avec ADAMANT Node v0.11.0. Tous les utilisateurs des versions v3.0.0 et v3.1.0 doivent effectuer la mise à jour vers la v3.2.0.

## Vérification des clés publiques des destinataires et des délégués

Le SDK impose désormais une validation canonique des clés Ed25519 sur la courbe de 32 octets. Il rejette les clés Curve25519 non canoniques, hors courbe ou de petit ordre (ordres 1, 2, 4 et 8), et effectue des vérifications locales de dérivation d'adresse ADM avant de mettre en cache ou de chiffrer les messages. La méthode `getPublicKey()` renvoie une chaîne vide sans effectuer de requête réseau pour les adresses ADM invalides, et renvoie une chaîne vide sans polluer le cache lorsqu'un nœud renvoie une clé malformée ou ne correspondant pas. `sendMessage()` revérifie localement les clés des destinataires résolues et rejette les clés invalides ou discordantes avec un résultat `{success: false, errorMessage}`, tandis que `voteForDelegate()` rejette les clés de délégués dont la liaison d'adresse échoue. Un `publicKeysCache` basé sur un `Map` est vérifié en écriture comme en lecture, et les caches de délégués dépendants du réseau (`byAddress`, `byUsername`) sont isolés par instance `AdamantApi`.

## Correction du KVS et du filtre de chat

Les méthodes `getKVS()`, `getChatTransactions()`, `getChats()` et `getChatMessages()` émettent désormais des noms de filtres simples, aplatissant les wrappers explicites `and: { ... }` pour correspondre au contrat de nœud documenté sur toutes les versions d'ADAMANT Node. Les wrappers `or` non pris en charge et les clés de filtre pré-préfixées `and:` ou `or:` sur les points de terminaison AND-only sont rejetés côté client avec `{success: false, errorMessage}` au lieu d'envoyer des préfixes ignorés par les anciens nœuds et rejetés par les nœuds v0.11.0+. Cela a été vérifié avec un test de fixture `/api/states/get` enregistré sur le réseau principal.

## Disponibilité des nœuds et filtrage du chargeur

Les nœuds signalant `loader.loaded: false` ou `loader.syncing: true` sont exclus de la sélection principale des nœuds actifs et des listes de connexion WebSocket, tandis que les anciens nœuds sans objet `loader` restent éligibles. Le rappel `onReady` (et `api.isReady`) est mis en attente jusqu'à ce qu'un nœud utilisable soit effectivement sélectionné, en réessayant les vérifications de démarrage avec un backoff plafonné à 5s, 10s, 30s et 60s, en continuant même si un balayage précédent échoue, au lieu d'attendre le balayage périodique de 5 minutes. Lorsqu'un nœud est déjà initialisé et que tous les nœuds prêts échouent ou tombent en dessous de `minVersion`, le SDK bascule avec un avertissement vers un nœud compatible `minVersion` chargé mais en cours de synchronisation, uniquement lorsqu'une référence de hauteur synchronisée récente est disponible dans les 10 minutes et que le candidat se trouve à moins de 25 blocs de cette hauteur. Le rappel `onReady` est empêché de se déclencher deux fois en cas d'erreur, et les réponses non-objet telles que les pages de maintenance HTML 200, null ou les charges utiles de statut `{success: true}` incomplètes sont ignorées en toute sécurité.

## Alignement de l'API ADAMANT Node v0.11.0, OpenAPI et POST KVS

La génération déterministe des DTO d'API (`scripts/sync-api-types.mjs`) a migré du dépôt archivé `Adamant-im/adamant-schema` vers `Adamant-im/adamant` (`openapi/specification/openapi.yaml` au commit master v0.11.0 `50568f37dc2b7da86f44991f96c40c8edde74d67`), lisant les versions exactes des outils installés via `createRequire`. Le fichier `src/api/generated.ts` a été régénéré avec `RateLimitErrorResponseDto`, `GetKVSRequestBody` et des liens mis à jour vers `https://docs.adamant.im/`. Les types d'options de point de terminaison (`ChatroomsOptions`, nouvelles `ChatTransactionsOptions` et `KVSOptions`) sont alignés sur la validation stricte des filtres d'ADAMANT Node v0.11.0, avec `toHeight` appliqué sur `/api/chats/get` et `/api/states/get`, et les filtres de hauteur/plage exclus de `/api/chatrooms/*`. `ChatroomsOptions.userId` est obsolète et supprimé à l'exécution sur `/api/chatrooms/*` avec un avertissement d'obsolescence unique afin que les appelants hérités ne provoquent pas d'échec de validation sur les nœuds v0.11.0+. La prise en charge de `POST /api/states/get` a été ajoutée via `api.getKVS(options, {method: 'POST'})` pour les requêtes volumineuses de `keyIds` ou `senderIds`, avec un basculement de lecture idempotent complet correspondant à `GET`.

## Résilience HTTP 429 et renforcement du basculement

Le SDK capture `targetNode` avant chaque requête afin que les échecs simultanés ne fassent jamais basculer `this.node` vers un nœud défaillant. Sur les réponses HTTP 429 multi-nœuds, il bascule immédiatement vers un autre nœud synchronisé et non limité en débit sans sondes `/api/node/status` supplémentaires, ignore les balayages de santé sur les réponses 429 à nœud unique et gère le 429 dans `checkNode()` distinctement des nœuds hors ligne. Les balayages `updateNodes()` simultanés sont dédoublonnés via une promesse en cours, et un balayage planifié est mis à niveau vers un basculement forcé lorsqu'une requête signale un nœud défaillant. Le SDK s'éloigne du `failedNode` à travers les ensembles synchronisés de 2 nœuds et de 3+ nœuds et suit les temps de refroidissement 429 par nœud (`rateLimitedUntil`, plafonné à 60s) afin que les balayages de santé évitent les nœuds limités en débit jusqu'à l'expiration du délai. Il analyse les en-têtes `Retry-After` (secondes ou date HTTP), `RateLimit-Reset` et `RateLimit-Scope`, bascule immédiatement pour les lectures idempotentes (`GET` et `POST /api/states/get`) lorsqu'un autre nœud synchronisé existe, ou respecte un backoff borné avec gigue jusqu'à 10s sur un seul nœud sans boucle serrée. Les métadonnées optionnelles `status`, `retryAfterMs` et `rateLimitScope` sont exposées sur les résultats d'échec HTTP 429 dans `AdamantApiResult`, tandis que les requêtes `POST` d'écriture restent strictement non rejouées.

## Actualisation de la sécurité des dépendances et quarantaine de 7 jours

La version impose `minimumReleaseAge: 10080` (7 jours) et des paramètres `allowBuilds` explicites (`'@parcel/watcher': false`, `esbuild: true`, `unrs-resolver: true`) dans `pnpm-workspace.yaml` sans exclusions d'âge de version. Les dépendances directes et transitives ont été actualisées au-delà de la limite de 7 jours, incluant axios, bitcoinjs-lib, tiny-secp256k1, pbkdf2, socket.io-client, bip39, ecpair, semver, @redocly/cli, eslint, jest, prettier et swagger-typescript-api, réduisant les résultats d'audit de production de 20 à 0. La publication est effectuée via GitHub Actions npm Trusted Publishing avec provenance de build.

## Validation

Vérifié sur Node.js v24.19.0 et pnpm 11.13.1. La suite de tests complète (`pnpm test`) couvre 20 suites et 333 tests avec une couverture de fonction de 100 %, et `gts lint` a réussi. Les vérifications de type API correspondent aux commits ADAMANT et adamant-wallets référencés. Les builds de documentation TypeDoc et VitePress ont réussi. Les tests de package pour ESM, CommonJS, les consommateurs en direct, les sous-chemins de package et les déclarations TypeScript ont réussi. L'audit de production rapporte 0 vulnérabilité et les 893 packages verrouillés ont des signatures vérifiées.

### Changements majeurs

Les fonctions `encodeMessage()` et `decodeMessage()` lèvent désormais une erreur `invalid key` pour les clés Ed25519 non canoniques, hors courbe et de petit ordre (1, 2, 4 et 8). Les clés légitimes du réseau principal ne sont pas affectées. La méthode `getPublicKey()` renvoie une chaîne vide sans requête réseau pour les adresses ADM invalides et renvoie également une chaîne vide lorsque la clé du nœud ne dérive pas l'adresse. La méthode `sendMessage()` rejette ces destinataires avec `{success: false, errorMessage}`, et `voteForDelegate()` rejette les clés de délégués dont la liaison d'adresse échoue.

Le rétrécissement des options de requête TypeScript modifie `ChatroomsOptions` et `KVSOptions` afin qu'ils n'héritent plus des champs `TransactionQueryParameters` non pris en charge qu'ADAMANT Node v0.11.0 rejette. La méthode `getChatTransactions()` utilise désormais `ChatTransactionsOptions`, un sur-ensemble de `ChatroomsOptions` conservant `fromHeight`, `toHeight`, `inId` et `isIn`. `TransactionQueryParameters` reste exporté sans changement.

L'appel direct de `transformTransactionQuery(query, 'states' | 'chats' | 'chatrooms')` avec un wrapper `or` ou des clés de filtre pré-préfixées `and:` ou `or:` lève désormais une `Error` avec le message `badParameter`, tandis que les méthodes client `AdamantApi` renvoient `{success: false, errorMessage}`.

Le filtre `toHeight` sur `getKVS()` et `getChatTransactions()` est appliqué uniquement par ADAMANT Node v0.11.0+. Les anciens nœuds ignorent silencieusement `toHeight` et renvoient des enregistrements plus récents avec `success: true`. Les appelants dépendant d'une borne de hauteur supérieure doivent donc définir `minVersion: '0.11.0'`.

Le champ `userId` sur `/api/chatrooms/*` est obsolète dans `ChatroomsOptions` et supprimé à l'exécution avec un avertissement dédié. Les appelants doivent passer l'adresse du compte uniquement comme argument de chemin URL de `getChats(address)` ou `getChatMessages(address1, address2)`.

Avec `checkHealthAtStartup: true`, `onReady` attend désormais et `api.isReady` reste `false` jusqu'à ce qu'un nœud utilisable, chargé et non en cours de synchronisation soit sélectionné, en réessayant les vérifications de démarrage avec un backoff de 5s, 10s, 30s et 60s.

Les champs optionnels `status`, `retryAfterMs` et `rateLimitScope` sont ajoutés à la variante `success: false` de `AdamantApiResult` lorsqu'une requête échoue avec une erreur HTTP 429.

La disposition des octets de transaction, les hachages, les identifiants, les signatures, le chiffrement, la dérivation de portefeuille et les exportations racine restent inchangés.

---
title: "adamant-api v3.2.0 : Conçu pour ADAMANT Node v0.11.0, basculement résilient et requêtes sécurisées"
slug: "adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
description: "cryptofoundry présente adamant-api v3.2.0, le SDK TypeScript et Node.js officiel pour la blockchain ADAMANT, coordonné avec ADAMANT Node v0.11.0."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
publishedAt: "2026-11-26T07:08:23.535Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:e657e4cd56ab"
locale: "fr"
placeholder: false
---

cryptofoundry présente un résumé d'adamant-api v3.2.0, le SDK TypeScript et Node.js officiel pour la blockchain ADAMANT, coordonné avec ADAMANT Node v0.11.0.

Développer des applications décentralisées, des bots de trading, des explorateurs ou des intégrations de paiement directement via des points de terminaison HTTP bruts de la blockchain implique de réinventer constamment les mêmes mécanismes de fiabilité et de cryptographie : sélectionner des nœuds synchronisés, réessayer après des pannes transitoires sans dupliquer les transactions, chiffrer les messages avec NaCl, signer des transactions déterministes et maintenir les DTO TypeScript alignés avec les mises à jour des nœuds. Le SDK gère cela nativement avec une résilience sans configuration supplémentaire (il suffit de transmettre une liste de nœuds HTTPS gérés indépendamment et le SDK surveille leur état, vérifie les hauteurs de synchronisation, ignore les nœuds obsolètes ou en cours de chargement et bascule automatiquement en cas de défaillance), des importations modulaires, une sécurité TypeScript de bout en bout avec des DTO générés à partir de la spécification OpenAPI 3.2 officielle d'ADAMANT Node, et des abonnements Socket.IO en direct avec récupération automatique après reconnexion.

### Vérification locale de la clé publique du destinataire et du délégué

Avant de chiffrer un message ou de voter pour un délégué, la version 3.2.0 vérifie localement que chaque clé publique Ed25519 renvoyée par un nœud est une clé canonique de 32 octets, située sur la courbe et sans petit ordre, puis dérive cryptographiquement l'adresse ADM demandée. Les clés mal formées, hors courbe, de petit ordre (ordres 1, 2, 4 et 8) ou discordantes sont rejetées proprement avant toute mise en cache ou chiffrement, et les caches des délégués sont isolés par instance `AdamantApi`.

### Correction critique de justesse et de sécurité pour les requêtes KVS et Chat

Dans les versions 3.0.0 et 3.1.0, `getKVS()`, `getChatTransactions()`, `getChats()` et `getChatMessages()` envoyaient des filtres préfixés par `and:`, que les nœuds antérieurs à la version 0.11.0 ignoraient silencieusement tout en renvoyant `success: true` avec des enregistrements non filtrés. Dans la version 3.2.0, ces méthodes envoient systématiquement des noms de filtres simples (en aplatissant les wrappers `and: { ... }` explicites) et rejettent côté client les wrappers `and:` non pris en charge ainsi que les clés préfixées. Toute application 3.x lisant des données KVS ou de chat doit passer à la version 3.2.0.

### Gestion résiliente des erreurs HTTP 429 pour Node v0.11.0

ADAMANT Node v0.11.0 active par défaut les limites anti-abus pour HTTP et WebSocket en production. Lorsqu'un nœud renvoie une erreur HTTP 429, les lectures idempotentes (GET et POST `/api/states/get`) basculent immédiatement vers un autre nœud synchronisé mis en cache, tandis que le nœud limité en débit entre dans une période de refroidissement limitée (jusqu'à 60 secondes) afin que les vérifications d'état ne redirigent pas immédiatement le trafic vers lui. Les requêtes parallèles atteignant un nœud limité partagent un balayage d'état dédupliqué unique au lieu de surcharger `/api/node/status` ou de basculer constamment le nœud actif. Sur les configurations à nœud unique ou lorsque la fenêtre de réinitialisation d'un nœud dépasse l'attente limitée de 10 secondes du SDK, `AdamantApiResult` expose désormais des champs optionnels `status`, `retryAfterMs` et `rateLimitScope` afin que les bots puissent planifier leurs tentatives de manière propre. Les appels POST de publication de transactions ne sont jamais rejoués automatiquement après la réception d'une réponse HTTP.

### Préparation au démarrage plus intelligente

Les services démarrant parallèlement à un nœud local voyaient souvent `onReady` se déclencher alors que le nœud chargeait encore ses tables en mémoire ou rattrapait la chaîne. Dans la version 3.2.0, les nœuds signalant `loader.loaded: false` ou `loader.syncing: true` sont exclus de la sélection principale de l'API et de WebSocket. `onReady` (et `api.isReady`) attend avec un délai de réessai exponentiel (5s, 10s, 30s, 60s) jusqu'à ce qu'un nœud utilisable soit réellement prêt à traiter les requêtes, et les clients initialisés disposent d'un mécanisme de repli basé sur la hauteur de synchronisation si tous les nœuds entièrement synchronisés sont hors ligne.

### POST /api/states/get et alignement strict des types v0.11.0

Pour interroger des dizaines ou des centaines de clés KVS ou d'adresses d'expéditeur sans atteindre les limites de longueur d'URL, passez `{method: 'POST'}` à `getKVS()` :

```js
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

Les interfaces TypeScript (`ChatroomsOptions`, `ChatTransactionsOptions` et `KVSOptions`) reflètent désormais la validation stricte des requêtes d'ADAMANT Node v0.11.0 afin que les champs non pris en charge soient détectés à la compilation, et le générateur OpenAPI se synchronise désormais directement depuis `Adamant-im/adamant`.

### Sécurité de la chaîne d'approvisionnement et quarantaine de 7 jours

Conformément à la politique de sécurité d'ADAMANT introduite dans Node v0.11.0, adamant-api impose désormais une quarantaine de 7 jours pour l'âge des versions (`minimumReleaseAge: 10080` dans `pnpm-workspace.yaml`), restreint les scripts de cycle de vie des dépendances via `allowBuilds`, est livré avec 0 vulnérabilité `pnpm audit` en production et publie sur npm avec la provenance Trusted Publishing de GitHub Actions.

```
npm install adamant-api@3.2.0
```

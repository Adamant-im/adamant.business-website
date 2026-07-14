---
title: "Découvrez adamant-api 3.0 — un SDK moderne pour le nœud ADAMANT moderne"
slug: "meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
description: "Le SDK JavaScript/TypeScript adamant-api publie la version 3.0.0, conçue pour fonctionner avec ADAMANT Node v0.10.0. Cette version introduit les timestamps en millisecondes, des requêtes enrichies, etc."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
publishedAt: "2026-06-21T15:54:25.436Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3d13a9eaca0e/001-0-hkmpiqt1p-ubpghb.webp"
cardSpan: "full"
originalId: "medium:3d13a9eaca0e"
locale: "fr"
placeholder: false
---

Le SDK JavaScript/TypeScript `adamant-api` a publié la version 3.0.0, conçue pour fonctionner parfaitement avec ADAMANT Node v0.10.0. Cette version introduit les timestamps en millisecondes, des paramètres de requête enrichis, des réponses consolidées pour l'état du nœud et un filtrage inclusif par version minimale. Le SDK fournit des vérifications automatiques de santé, des tentatives automatiques, un basculement en cas de panne, des réponses typées, le chiffrement des messages et des abonnements WebSocket en temps réel.

ADAMANT est un messager chiffré de bout en bout basé sur la blockchain, doté d'un portefeuille cryptographique intégré, ne nécessitant ni numéro de téléphone ni serveur central. Le SDK `adamant-api` abstrait le réseau en appels de fonctions clairs, permettant aux développeurs de créer des bots décentralisés, des tirelires ou des portefeuilles où les utilisateurs possèdent leur identité et leurs fonds.

### Quoi de neuf dans la version 3.0

Les objets de transfert de données (DTO) de l'API du SDK sont régénérés à partir d'une révision figée de `adamant-schema`, garantissant un typage correct pour les timestamps en millisecondes, les données de chargeur/état et les champs de transactions non confirmées pouvant être nuls. Les capacités de requête incluent désormais `returnUnconfirmed`, `includeDirectTransfers`, la recherche de délégués par adresse, et les requêtes de transactions multi-types. Les filtres de transaction sont combinés par défaut avec un `and` logique, et les filtres de montant s'appliquent uniquement aux transactions de transfert. La construction facultative de `timestampMs` et `getEpochTimeMs()` sont disponibles, bien que `timestampMs` ne fasse pas partie des octets signés, laissant inchangés les hachages, identifiants et signatures.

Les améliorations de fiabilité incluent l'arrêt des boucles de nouvelle tentative pour les requêtes POST explicitement rejetées, avec retour d'erreurs structurées non réessayables. Les tentatives automatiques et le basculement vers un nœud actif sont conservés pour les requêtes sûres et les pannes réseau. La sélection de nœud prenant en compte la hauteur et le filtrage inclusif par `minVersion` garantissent la communication avec des nœuds sains et à jour.

Un client WebSocket réel permet de s'abonner à plusieurs adresses, types de transactions et types d'actifs de chat via une seule connexion. Il inclut des erreurs de connexion typées, des rappels de reconnexion, `connect()`/`disconnect()` explicites, un nettoyage des écouteurs et une reconnexion limitée.

Le package est désormais modulaire par conception. Le package racine reste centré sur ADM, tandis que les exports par sous-chemin offrent un accès aux DTO d'API, aux transactions, aux métadonnées, et aux utilitaires pour BTC/ETH/DASH/DOGE, compatibles CommonJS et ESM. Les métadonnées des cryptomonnaies sont déterministes et figées à partir de `adamant-wallets`. La documentation a été déplacée vers un site VitePress + TypeDoc sous contrôle de version.

![Découvrez adamant-api 3.0 — un SDK moderne pour le nœud ADAMANT moderne](/images/engineering-notes/medium/3d13a9eaca0e/002-0-bato9yeonu3b9-oz.webp)

### Démarrage rapide

Installez le package et initialisez le client avec une liste de nœuds. Les vérifications de santé, les tentatives automatiques et le basculement sont gérés automatiquement.

```javascript
import {AdamantApi} from 'adamant-api';

const api = new AdamantApi({
  nodes: [
    'https://endless.adamant.im',
    'https://clown.adamant.im',
    'https://lake.adamant.im',
  ],
  checkHealthAtStartup: true,
  minVersion: '0.10.0', // inclusive — older nodes are excluded automatically
});

api.onReady(async () => {
  const response = await api.getBlocks();
  if (response.success) {
    console.log(response.blocks);
  } else {
    console.error(response.errorMessage);
  }
});
```

### Cas d'utilisation

Vous pouvez créer un bot de chat décentralisé qui surveille des comptes en temps réel et répond à des messages chiffrés. Le chiffrement de bout en bout est intégré : le bot déchiffre les messages avec sa propre phrase secrète, et le serveur ne stocke jamais le texte en clair.

```javascript
import {AdamantApi, WebSocketClient, decodeMessage} from 'adamant-api';
import {config} from './config.js';

const api = new AdamantApi({nodes: config.nodes});

const ws = new WebSocketClient({
  admAddress: config.address,
  direction: 'incoming', // only messages sent *to* the bot
});
api.initSocket(ws);

ws.onMessage(async (tx) => {
  const text = decodeMessage(
    tx.asset.chat.message,
    tx.senderPublicKey,
    config.passphrase,
    tx.asset.chat.own_message,
  );

  if (text.trim() === '/ping') {
    await api.sendMessage(config.passphrase, tx.senderId, 'pong 🏓');
  }
});
```

Pour une tirelire cryptographique ou un bot de paiement, vous pouvez réagir aux transferts entrants de jetons et renvoyer des jetons. Une seule connexion WebSocket peut également surveiller plusieurs adresses et filtrer par type, ce qui est utile pour l'ingestion d'échanges ou les tableaux de bord comptables.

Si vous avez besoin d'un portefeuille léger multi-crypto, vous pouvez dériver des adresses BTC, ETH, DASH ou DOGE à partir de la même phrase secrète ADAMANT sans intégrer plusieurs piles cryptographiques dans votre bot dédié à ADM. Importez uniquement ce dont vous avez besoin via les exports par sous-chemin pour garder les bundles serverless légers.

```javascript
import {eth} from 'adamant-api/coins/eth';
import {btc} from 'adamant-api/coins/btc';

const {address: ethAddress} = eth.keys(process.env.PASSPHRASE);
const {address: btcAddress} = btc.keys(process.env.PASSPHRASE);

console.log({ethAddress, btcAddress});
```

### Migration depuis la version 2.x

Pour migrer, passez à la version 22 ou supérieure de Node.js dans votre environnement d'exécution et votre CI. Vérifiez le sens du WebSocket et ajoutez `direction: 'incoming'` si votre application supposait uniquement des messages entrants. Mettez à jour les imports de cryptomonnaies vers `adamant-api/coins/*`, supprimez les chemins de code Lisk/Klayr, et revérifiez les filtres de requête pour le nouveau comportement par défaut en `and` logique, en remplaçant `withoutDirectTransfers` par `includeDirectTransfers`. Les signatures, identifiants de transaction et imports CommonJS/ESM restent inchangés.

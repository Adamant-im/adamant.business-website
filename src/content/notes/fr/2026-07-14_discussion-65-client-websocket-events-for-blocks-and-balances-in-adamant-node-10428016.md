---
title: "Événements WebSocket client pour les blocs et les soldes dans ADAMANT Node"
slug: "discussion-65-client-websocket-events-for-blocks-and-balances-in-adamant-node-10428016"
description: "ADAMANT Node prend désormais en charge deux capacités WebSocket client optionnelles : les événements newBlock pour les blocs appliqués et sauvegardés, et les événements balances/change pour les mises à jour confirmées."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/65"
publishedAt: "2026-07-14T16:18:33Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10428016"
locale: "fr"
placeholder: false
---

## Vue d'ensemble

ADAMANT Node prend désormais en charge deux capacités WebSocket client optionnelles : les événements `newBlock` pour les blocs appliqués et sauvegardés avec succès, et les événements `balances/change` pour les mises à jour confirmées de `balance` et `unconfirmedBalance`. L'implémentation utilise Socket.IO plutôt qu'une connexion WebSocket brute. Les abonnements sont limités à un seul socket et doivent être rétablis après une reconnexion.

L'implémentation répond aux [issues Node #256](https://github.com/Adamant-im/adamant/issues/256) et [Node #217](https://github.com/Adamant-im/adamant/issues/217), avec une documentation dans [Adamant-im/docs#35](https://github.com/Adamant-im/docs/pull/35) et un contrat compagnon OpenAPI dans [Adamant-im/adamant-schema#48](https://github.com/Adamant-im/adamant-schema/pull/48).

## Événements de nouveau bloc

Les clients activent explicitement les notifications de bloc en émettant `blocks: true`. La charge utile de `newBlock` contient un en-tête public compact : l'identifiant du bloc, la hauteur, l'horodatage, la clé publique du générateur, le nombre de transactions, le montant total, les frais totaux et la récompense. Elle omet volontairement la liste des transactions, les signatures et le hash de la charge utile ; les clients peuvent demander le bloc complet via REST en cas de besoin.

```js
connection.emit('blocks', true);

connection.on('newBlock', (block) => {
  console.log('Applied block:', block);
});
```

Le nœud n'émet cet événement qu'après la réussite complète du pipeline d'application du bloc et la sauvegarde de celui-ci. La relecture historique et les reconstructions de tables en mémoire ne produisent pas d'événements de bloc en temps réel.

## Événements de changement de solde

La livraison des soldes nécessite à la fois un abonnement à une adresse et un abonnement explicite à un champ. La charge utile inclut uniquement les champs abonnés qui ont changé, avec des valeurs sous forme de chaînes décimales en unités de 1/10^8 ADM.

```js
connection.emit('address', ['U1234567890123456']);
connection.emit('balances', ['balance', 'unconfirmedBalance']);

connection.on('balances/change', (account) => {
  console.log('Balance changed:', account);
});
```

`balance` représente l'état confirmé de la blockchain. `unconfirmedBalance` reflète également le pool non confirmé actuel du nœud et peut changer lorsque les transactions sont acceptées, confirmées, expirées, annulées ou revalidées.

## Conception de la livraison et des performances

L'objectif principal était d'ajouter des événements utiles sans transformer chaque mutation de compte en un balayage de chaque socket connecté ou en une lecture de base de données inutile. Des index dédiés pour les blocs et les soldes par adresse ne sélectionnent que les sockets intéressés, et le nœud ignore les lectures de compte lorsqu'aucun abonné n'a besoin de l'adresse et du champ modifiés. L'application et l'annulation de blocs regroupent les mutations internes de solde et effectuent une seule lecture finale de compte par adresse modifiée. La suppression imbriquée des lots est verrouillée jusqu'à la fermeture du lot externe, empêchant la publication partielle après un échec interne. L'échec d'application de bloc, l'échec d'annulation, la relecture, la reconstruction et la troncature de snapshot terminée suppriment tous les notifications de solde non durables. Les échecs de correspondance de socket, de recherche de compte et d'émission vers un socket individuel sont isolés du traitement des blocs, des tours et des comptes. Les changements de récompense de tour ne sont publiés qu'après une opération de tour durable terminée.

Ces modifications ne changent pas les règles de consensus, la sérialisation des blocs ou des transactions, les signatures, les identifiants, les schémas de base de données, les récompenses, les frais ni le comportement du protocole entre pairs.

## Sémantique des événements au mieux

Ces événements sont des notifications à faible latence, pas un journal d'événements durable. Les clients peuvent manquer des événements lors d'une déconnexion et doivent réconcilier les états importants via REST. Les abonnements aux soldes n'envoient pas de snapshot initial, et les lectures asynchrones de solde peuvent se terminer dans le désordre lors de mises à jour indépendantes rapides. Les identifiants de transaction et de bloc en double sont supprimés pendant au moins 60 secondes, avec un nettoyage périodique étendant la fenêtre effective à environ deux minutes. Si un bloc est annulé et que le même identifiant est réappliqué dans cette fenêtre, la deuxième notification peut être supprimée.

La représentation actuelle du solde sous forme de chaîne correspond intentionnellement au comportement REST ; les valeurs exactes au-delà de la plage des entiers sûrs de JavaScript nécessitent un changement coordonné à l'échelle de l'API plutôt qu'une divergence limitée au WebSocket. Aucun plafond d'abonnement silencieux et arbitraire par socket n'a été introduit. L'API actuelle n'a pas de mécanisme d'accusé de réception pour le rejet partiel, donc une limite de ressources devrait être un contrat configurable et documenté séparé avec un retour explicite au client.

## Validation

La validation a inclus 226 tests Node ciblés réussis couvrant les chemins WebSocket, compte, transaction, bloc et tour, ainsi que des tests de régression ciblés pour la suppression de snapshot et la suppression de lots imbriqués. La suite de tests unitaires rapides plus large a passé 940 tests. Des vérifications supplémentaires ont couvert ESLint, une build de documentation VitePress en production, le formatage OpenAPI et la validation de bundle, ainsi qu'une couverture d'intégration Socket.IO réelle pour la livraison des blocs et des soldes. Les suites de tests de longue durée non liées ont été intentionnellement ignorées car cette fonctionnalité ne modifie pas la validation de consensus, la sérialisation, le SQL, le transport entre pairs ni les points de terminaison REST.

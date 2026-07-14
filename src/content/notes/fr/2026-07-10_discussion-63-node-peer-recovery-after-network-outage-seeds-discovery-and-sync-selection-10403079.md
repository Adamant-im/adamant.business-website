---
title: "Récupération des pairs d'un nœud ADAMANT après une panne réseau : seeds, découverte et sélection de synchronisation"
slug: "discussion-63-node-peer-recovery-after-network-outage-seeds-discovery-and-sync-selection-10403079"
description: "Les nœuds ADAMANT maintiennent la connectivité par trois mécanismes distincts, souvent confondus dans les journaux après une panne réseau. Ce document explique leur interaction."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/63"
publishedAt: "2026-07-10T05:24:55Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10403079"
locale: "fr"
placeholder: false
---

Les nœuds ADAMANT maintiennent la connectivité entre pairs grâce à trois mécanismes distincts, faciles à confondre lors de la lecture des journaux de console après une panne réseau. Ce document explique comment ils interagissent, pourquoi la synchronisation peut s’interrompre même si les pairs initiaux (seeds) sont toujours contactés, et ce que les opérateurs doivent attendre pendant la récupération.

## Contexte

Un nœud conserve une table de pairs en mémoire, alimentée par trois sources : les pairs initiaux (seeds) listés dans la configuration `peers.list`, les pairs persistants chargés depuis la base de données au démarrage, et les pairs découverts renvoyés par d'autres nœuds via `GET /peer/list`. Les pairs initiaux sont figés — ils ne sont jamais supprimés de la table, même en cas d’échec de requête.

Chaque pair possède un état : `BANNED` (0, exclu de l’utilisation normale), `DISCONNECTED` (1, connu mais actuellement indisponible pour la synchronisation ou la diffusion), ou `CONNECTED` (2, a répondu avec succès récemment et est éligible pour la synchronisation). En cas d’échec de requête, le taux de succès du pair diminue. Lorsqu’un pair précédemment `CONNECTED` tombe en dessous de 80 % de succès, son état dégrade à `DISCONNECTED`. Les timeouts réseau (`ECONNABORTED`) n’éliminent pas le pair ; ils réduisent uniquement le taux de succès.

## Trois mécanismes parallèles

**Ping des seeds (silencieux).** Au démarrage et toutes les ~5 secondes, le nœud envoie un ping à chaque pair initial défini dans la configuration via `GET /peer/height`. Les échecs sont enregistrés au niveau *trace* et sont généralement invisibles dans la sortie console par défaut. Un ping réussi rétablit le pair à l’état `CONNECTED`.

**Découverte des pairs (bruyante).** Toutes les ~5 secondes, le nœud choisit aléatoirement un pair en mémoire (états `DISCONNECTED` ou `CONNECTED`) et demande `GET /peer/list` pour découvrir de nouvelles adresses. Si ce choix aléatoire unique échoue par timeout, la console affiche :

```text
Discovering new peers failed. ECONNABORTED Request failed GET http://<peer>/peer/list
```

Cette erreur mentionne uniquement le pair sélectionné aléatoirement, pas toute la table des pairs. Pendant la récupération, cela fait souvent apparaître des nœuds hébergés sur le cloud, peu connus, qui ont été découverts précédemment et sauvegardés dans la base de données. Cela ne signifie pas que le nœud ignore les pairs initiaux.

**Synchronisation de la blockchain (stricte).** Le processus de chargement (`loader`) utilise `peers.list()` avec le filtre par défaut : pairs `CONNECTED` uniquement. S’il n’y a aucun pair actuellement `CONNECTED` avec une hauteur utilisable, la synchronisation s’arrête avec :

```text
Failed to find enough good peers
```

Dans ce cas, le nœud n’est pas déconnecté du réseau au sens d’absence totale d’enregistrements de pairs. Il a simplement zéro pair actif adapté au téléchargement de blocs.

## Chronologie typique d’une panne

Lorsqu’une panne réseau survient, les requêtes HTTP vers tous les pairs commencent à échouer. Les pairs précédemment `CONNECTED` deviennent `DISCONNECTED`, et le chargeur ne peut plus sélectionner de bons pairs, donc la hauteur cesse d’avancer. Les erreurs de découverte persistent avec des entrées obsolètes choisies aléatoirement, tandis que les pings vers les seeds continuent silencieusement en arrière-plan. Dès qu’au moins un seed ou un autre pair connu répond à nouveau à un ping, il redevient `CONNECTED` et la synchronisation reprend.

L’intervalle entre « l’internet est revenu » et « le nœud resynchronise » peut durer plusieurs minutes — voire plus longtemps si les pairs distants restent injoignables — car la récupération dépend d’un aller-retour réussi vers un pair redevenu `CONNECTED`, et non pas uniquement de la connectivité locale.

## Attentes des opérateurs

Voir des erreurs de découverte provenant d’adresses inconnues après une panne est normal et n’indique pas en soi un mauvais paramétrage. Les pairs initiaux définis dans la configuration sont toujours contactés ; leurs échecs de ping ne sont simplement pas visibles dans les journaux par défaut. Le message `Failed to find enough good peers` signifie qu’aucun pair actif n’est disponible, et non que la table des pairs a été effacée. Redémarrer le nœud recharge les seeds et les pairs de la base de données, mais la récupération nécessite toujours qu’au moins un pair distant réponde.

## Améliorations possibles

Plusieurs modifications pourraient améliorer l’expérience des opérateurs : enregistrer les échecs de ping aux seeds au niveau `warn` lorsqu’aucun pair `CONNECTED` n’est disponible depuis plus d’un seuil défini, privilégier les seeds ou les pairs récemment fonctionnels dans `getFromRandomPeer` au lieu d’un tirage aléatoire uniforme, relancer tous les pings vers les seeds en parallèle lorsque la synchronisation affiche `Failed to find enough good peers`, et réduire les doublons de messages `warn` lorsque `async.retry` épuise toutes les tentatives de synchronisation.

---
title: "Points de contrôle persistants de la table mémoire pour la récupération après incident"
slug: "discussion-64-persisted-mem-table-checkpoints-for-crash-recovery-node-261-10411019"
description: "Le nœud ADAMANT prend désormais en charge des points de contrôle rotatifs persistants de l'état mémoire dérivé. Après une interruption forcée, le démarrage peut restaurer le dernier point de contrôle vérifié."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/64"
publishedAt: "2026-07-11T14:36:39Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10411019"
locale: "fr"
placeholder: false
---

Le nœud ADAMANT prend désormais en charge des points de contrôle rotatifs persistants de l'état dérivé `mem_*`. Après une interruption forcée laissant les miroirs mémoire dans un état incohérent, le démarrage peut restaurer le dernier point de contrôle vérifié et rejouer uniquement les blocs postérieurs à la hauteur du point de contrôle, au lieu de reconstruire toutes les tables mémoire depuis la hauteur 1. Cette implémentation suit la conception issue de l’issue #227, fusionnée dans la pull request #261. Les points de contrôle sont uniquement un cache local de récupération ; les blocs et le rejouage déterministe restent la source de vérité. Si la vérification ou le rejouage échoue, le nœud revient au chemin existant de reconstruction complète.

Des tables dérivées comme `mem_accounts`, `mem_round`, les tables de jonction des délégués et multisignatures, ainsi que leurs miroirs non confirmés, peuvent devenir incohérentes si le processus est interrompu pendant une écriture en cours. L’arrêt gracieux via `SIGTERM` reste la procédure opérationnelle requise, mais les points de contrôle réduisent le temps de récupération lorsque l’interruption forcée se produit malgré tout.

L’implémentation introduit une table de métadonnées (`mem_state_checkpoint_meta`) et trois ensembles rotatifs de tables à emplacements (`mem_ckpt_0..2_*`) pour l’état confirmé. Les tables de jonction non confirmées ne sont pas sauvegardées dans les points de contrôle ; elles sont reconstruites à partir de l’état confirmé lors de la restauration. La logique principale est répartie entre `logic/memCheckpoint.js` pour le hachage et la rotation des emplacements, `modules/memCheckpoints.js` comme wrapper de module, `sql/memCheckpoints.js` pour les utilitaires SQL, ainsi que des modifications apportées à `modules/loader.js` et `modules/blocks/chain.js` pour déclencher la récupération et la création de points de contrôle.

Les points de contrôle sont créés uniquement aux limites de tour complet, après que le pipeline `applyBlock` a entièrement persisté le bloc. À la pointe de la chaîne, cela se produit à chaque tour complet. Pendant la synchronisation de rattrapage, cela intervient tous les 100 tours afin de ne pas réduire le débit de synchronisation. La création d’un point de contrôle utilise une transaction PostgreSQL en mode `REPEATABLE READ` pour figer l’instantané MVCC. La section critique de traitement des blocs est libérée dès que la ligne de métadonnées est persistée, tandis que la copie des tables et le calcul du hachage se poursuivent en arrière-plan sur l’instantané figé. Cela évite de maintenir la section critique pendant toute la durée de l’opération de copie.

Avant qu’un point de contrôle ne soit accepté pour la récupération, plusieurs invariants sont vérifiés : le statut doit être complet, le schéma et le nethash doivent correspondre, le bloc référencé doit exister, et le hachage SHA-256 doit correspondre. La récupération essaie tous les emplacements complets du plus récent au plus ancien, de sorte qu’un emplacement récent corrompu n’entraîne pas une reconstruction complète si un emplacement antérieur valide existe. Au démarrage, si `checkMemTables()` détecte une incohérence, `memCheckpoints.tryRecover()` restaure l’emplacement, réinitialise l’état non confirmé, initialise le dernier bloc, puis rejoue les blocs depuis la hauteur du point de contrôle jusqu’à la pointe. Si le rejouage échoue, le nœud supprime l’état du point de contrôle et effectue une reconstruction complète depuis le bloc de genèse.

La fonctionnalité est activée par défaut dans `config.default.json` :

```json
"loading": {
  "memCheckpoints": {
    "enabled": true
  }
}
```

Les opérateurs doivent noter qu’aucune modification de protocole n’est introduite ; les points de contrôle ne sont jamais une entrée de consensus, et des données locales altérées ne peuvent pas contourner la validation des blocs. Sur des empreintes `mem_*` de taille mainnet, trois emplacements nécessitent environ 96 à 144 Mo plus les métadonnées, il est donc recommandé de prévoir une marge d’environ 1 Go. Les opérateurs doivent toujours privilégier les arrêts gracieux, car les points de contrôle raccourcissent la récupération mais ne remplacent pas les procédures d’arrêt correctes.

---
title: "ADAMANT Airdrop v2.1.1"
slug: "release-adamant-airdrop-v2-1-1-139149824"
description: "Cette version d'ADAMANT Airdrop fait des commandes npx le moyen principal d'utiliser l'outil. Plusieurs options de configuration ont été renommées pour plus de cohérence."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-airdrop/releases/tag/v2.1.1"
publishedAt: "2024-01-30T15:20:05Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-airdrop"
tag: "v2.1.1"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-airdrop:139149824"
locale: "fr"
placeholder: false
---

Cette version d'ADAMANT Airdrop fait des commandes `npx` le moyen principal d'utiliser l'outil. Plusieurs options de configuration ont été renommées pour plus de cohérence : `log_level` est désormais `logLevel`, `node_ADM` est désormais `nodes`, et `skipDublicates` est désormais `skipDuplicates`. Une nouvelle option `outputPath` a été ajoutée pour spécifier le chemin de la liste des adresses auxquelles le bot n'a pas pu envoyer d'ADM.

```diff
{
  // ...
-  "node_ADM": [
+  "nodes": [
      // ...
    ],

-  "log_level": "log",
+  "logLevel": "log",

-  "skipDublicates": true
+  "skipDuplicates": true
}
```

Les fichiers de sortie pour la validation des adresses ont été supprimés ; les journaux (logs) doivent être utilisés à la place. La liste des transactions est désormais stockée au format `.csv`. Le fichier `txt/airdrop/failedAddresses.txt` a été renommé en `failedTransactions.csv`, et `txt/airdrop/successfulAddresses.txt` a été renommé en `successfulTransactions.csv`.

```diff
.
├── logs
│   └── 2024-01-10.log
└── output
    └── 2024-01-10 01:16:43
+        ├── failedTransactions.csv
+        ├── successfulTransactions.csv
-        └── txt
-            ├── airdrop
-            │   ├── failedAddresses.txt
-            │   └── successfulAddresses.txt
-            └── validate
-                ├── invalidAddresses.txt
-                └── validAddresses.txt
```

### Changements cassants

Les noms des options de configuration ont changé, ce qui oblige les utilisateurs à mettre à jour leurs fichiers de configuration. L'option `node_ADM` est désormais `nodes`, `log_level` est désormais `logLevel`, et `skipDublicates` est désormais `skipDuplicates`. Les formats et emplacements des fichiers de sortie ont changé : les listes de transactions sont désormais stockées au format `.csv` au lieu de `.txt`, et les fichiers de sortie de validation d'adresses ont été entièrement supprimés au profit des journaux.

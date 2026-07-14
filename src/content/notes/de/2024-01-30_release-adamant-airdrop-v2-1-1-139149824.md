---
title: "ADAMANT Airdrop v2.1.1"
slug: "release-adamant-airdrop-v2-1-1-139149824"
description: "Diese Version von ADAMANT Airdrop verwendet npx-Befehle als primäre Nutzungsmethode. Mehrere Konfigurationsoptionen wurden zur Vereinheitlichung umbenannt."
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
locale: "de"
placeholder: false
---

Diese Version von ADAMANT Airdrop macht `npx`-Befehle zur primären Methode, um das Tool zu nutzen. Zur Vereinheitlichung wurden mehrere Konfigurationsoptionen umbenannt: `log_level` heißt nun `logLevel`, `node_ADM` heißt nun `nodes` und `skipDublicates` heißt nun `skipDuplicates`. Eine neue Option `outputPath` wurde hinzugefügt, um den Speicherpfad für die Liste der Adressen festzulegen, an die der Bot ADM nicht senden konnte.

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

Ausgabedateien zur Adressüberprüfung wurden entfernt; stattdessen sollten die Logs verwendet werden. Die Liste der Transaktionen wird nun im `.csv`-Format gespeichert. Die Datei `txt/airdrop/failedAddresses.txt` wurde in `failedTransactions.csv` umbenannt und `txt/airdrop/successfulAddresses.txt` in `successfulTransactions.csv`.

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

### Breaking changes

Die Namen von Konfigurationsoptionen haben sich geändert, weshalb Nutzer ihre Konfigurationsdateien aktualisieren müssen. Die Option `node_ADM` heißt nun `nodes`, `log_level` nun `logLevel` und `skipDublicates` nun `skipDuplicates`. Die Formate und Speicherorte der Ausgabedateien haben sich geändert: Transaktionslisten werden nun als `.csv`-Dateien statt als `.txt`-Dateien gespeichert, und Ausgabedateien zur Adressvalidierung wurden vollständig zugunsten der Logs entfernt.

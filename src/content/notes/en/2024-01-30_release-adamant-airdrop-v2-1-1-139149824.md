---
title: "ADAMANT Airdrop v2.1.1"
slug: "release-adamant-airdrop-v2-1-1-139149824"
description: "This release of ADAMANT Airdrop makes npx commands the primary way to use the tool. Several configuration options have been renamed for consistency: log level is now logLevel, n…"
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
locale: "en"
placeholder: false
---

This release of ADAMANT Airdrop makes `npx` commands the primary way to use the tool. Several configuration options have been renamed for consistency: `log_level` is now `logLevel`, `node_ADM` is now `nodes`, and `skipDublicates` is now `skipDuplicates`. A new `outputPath` option has been added to specify the path for the list of addresses that the bot could not send ADM to.

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

Output files for validating addresses have been removed; logs should be used instead. The list of transactions is now stored in `.csv` format. The file `txt/airdrop/failedAddresses.txt` has been renamed to `failedTransactions.csv`, and `txt/airdrop/successfulAddresses.txt` has been renamed to `successfulTransactions.csv`.

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

Configuration option names have changed, requiring users to update their config files. The `node_ADM` option is now `nodes`, `log_level` is now `logLevel`, and `skipDublicates` is now `skipDuplicates`. Output file formats and locations have changed: transaction lists are now stored as `.csv` files instead of `.txt` files, and address validation output files have been removed entirely in favor of logs.

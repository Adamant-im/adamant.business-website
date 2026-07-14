---
title: "ADAMANT Airdrop v2.1.1"
slug: "release-adamant-airdrop-v2-1-1-139149824"
description: "ADAMANT Airdrop v2.1.1では、npxコマンドが主要な使用方法となり、設定オプションの名称が一貫性を持つように変更されました。"
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
locale: "ja"
placeholder: false
---

このリリースでは、`npx`コマンドがツールを使用するための主要な方法となりました。一貫性のために、いくつかの設定オプションの名称が変更されています：`log_level`は`logLevel`に、`node_ADM`は`nodes`に、`skipDublicates`は`skipDuplicates`になりました。また、ボットがADMを送信できなかったアドレスのリストの保存先を指定するための新しい`outputPath`オプションが追加されました。

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

アドレス検証用の出力ファイルは削除され、代わりにログを使用するようになりました。トランザクションリストは現在、`.csv`形式で保存されます。ファイル`txt/airdrop/failedAddresses.txt`は`failedTransactions.csv`に、`txt/airdrop/successfulAddresses.txt`は`successfulTransactions.csv`に名称変更されました。

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

### 互換性のない変更点

設定オプションの名称が変更されたため、ユーザーは設定ファイルを更新する必要があります。`node_ADM`オプションは`nodes`に、`log_level`は`logLevel`に、`skipDublicates`は`skipDuplicates`になりました。出力ファイルの形式と保存場所も変更され、トランザクションリストは以前の`.txt`ファイルから`.csv`ファイルに変更され、アドレス検証の出力ファイルはログへの移行に伴い完全に削除されました。

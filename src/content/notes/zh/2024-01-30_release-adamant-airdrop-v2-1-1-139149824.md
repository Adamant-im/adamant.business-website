---
title: "ADAMANT Airdrop v2.1.1"
slug: "release-adamant-airdrop-v2-1-1-139149824"
description: "此版本将 npx 命令设为主要使用方式，统一重命名了多个配置项：log_level 改为 logLevel，node_ADM 改为 nodes，skipDublicates 改为 skipDuplicates，并新增 outputPath 选项。"
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
locale: "zh"
placeholder: false
---

此版本的 ADAMANT Airdrop 将 `npx` 命令作为使用该工具的主要方式。为保持一致性，多个配置选项已重命名：`log_level` 现在改为 `logLevel`，`node_ADM` 现在改为 `nodes`，`skipDublicates` 现在改为 `skipDuplicates`。新增了一个 `outputPath` 选项，用于指定机器人无法向其发送 ADM 的地址列表的存储路径。

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

用于验证地址的输出文件已被移除，应改用日志。交易列表现在以 `.csv` 格式存储。文件 `txt/airdrop/failedAddresses.txt` 已重命名为 `failedTransactions.csv`，`txt/airdrop/successfulAddresses.txt` 已重命名为 `successfulTransactions.csv`。

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

配置选项名称已更改，用户需更新其配置文件。`node_ADM` 选项现为 `nodes`，`log_level` 现为 `logLevel`，`skipDublicates` 现为 `skipDuplicates`。输出文件格式和位置也已更改：交易列表现在以 `.csv` 文件存储，不再使用 `.txt` 文件，且地址验证的输出文件已完全移除，改为通过日志输出。

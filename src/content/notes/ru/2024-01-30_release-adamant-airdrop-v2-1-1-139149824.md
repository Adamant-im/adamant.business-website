---
title: "ADAMANT Airdrop v2.1.1"
slug: "release-adamant-airdrop-v2-1-1-139149824"
description: "В этом выпуске ADAMANT Airdrop команды npx становятся основным способом использования инструмента. Некоторые параметры конфигурации переименованы для единообразия: уровень логирования теперь logLevel, node_ADM — nodes, а skipDublicates — skipDuplicates."
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
locale: "ru"
placeholder: false
---

Этот выпуск ADAMANT Airdrop делает команды `npx` основным способом использования инструмента. Некоторые параметры конфигурации были переименованы для единообразия: `log_level` теперь называется `logLevel`, `node_ADM` — `nodes`, а `skipDublicates` — `skipDuplicates`. Добавлена новая опция `outputPath` для указания пути к списку адресов, которым бот не смог отправить ADM.

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

Файлы вывода для проверки адресов удалены; вместо них следует использовать логи. Список транзакций теперь сохраняется в формате `.csv`. Файл `txt/airdrop/failedAddresses.txt` переименован в `failedTransactions.csv`, а `txt/airdrop/successfulAddresses.txt` — в `successfulTransactions.csv`.

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

### Критические изменения

Изменились названия параметров конфигурации, что требует от пользователей обновления их конфигурационных файлов. Опция `node_ADM` теперь называется `nodes`, `log_level` — `logLevel`, а `skipDublicates` — `skipDuplicates`. Изменились форматы и расположение выходных файлов: списки транзакций теперь хранятся в формате `.csv` вместо `.txt`, а выходные файлы проверки адресов полностью удалены в пользу логов.

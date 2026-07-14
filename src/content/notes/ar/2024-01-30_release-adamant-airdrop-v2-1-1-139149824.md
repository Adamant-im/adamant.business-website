---
title: "ADAMANT Airdrop v2.1.1"
slug: "release-adamant-airdrop-v2-1-1-139149824"
description: "يُعد هذا الإصدار من ADAMANT Airdrop أوامر npx الطريقة الأساسية لاستخدام الأداة. تم إعادة تسمية عدة خيارات إعدادًا للحفاظ على الاتساق: مستوى السجل أصبح logLevel، node_ADM أصبح nodes، وskipDublicates أصبح skipDuplicates."
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
locale: "ar"
placeholder: false
---

يُعد هذا الإصدار من ADAMANT Airdrop أوامر `npx` هي الطريقة الأساسية لاستخدام الأداة. تم إعادة تسمية عدة خيارات إعدادًا للحفاظ على الاتساق: `log_level` أصبح الآن `logLevel`، `node_ADM` أصبح الآن `nodes`، و`skipDublicates` أصبح الآن `skipDuplicates`. تم إضافة خيار جديد هو `outputPath` لتحديد المسار الخاص بقائمة العناوين التي لم يتمكن البوت من إرسال ADM إليها.

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

تمت إزالة ملفات الإخراج الخاصة بالتحقق من صحة العناوين؛ ويجب استخدام السجلات (logs) بدلًا منها. تُخزن قائمة المعاملات الآن بصيغة `.csv`. تم إعادة تسمية الملف `txt/airdrop/failedAddresses.txt` إلى `failedTransactions.csv`، وتم إعادة تسمية الملف `txt/airdrop/successfulAddresses.txt` إلى `successfulTransactions.csv`.

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

### التغييرات الأساسية

لقد تغيرت أسماء خيارات الإعداد، مما يتطلب من المستخدمين تحديث ملفات التهيئة الخاصة بهم. أصبح الخيار `node_ADM` الآن `nodes`، و`log_level` أصبح الآن `logLevel`، و`skipDublicates` أصبح الآن `skipDuplicates`. كما تغيرت صيغ مواقع ملفات الإخراج: تُخزن قوائم المعاملات الآن كملفات `.csv` بدلًا من ملفات `.txt`، وتم إزالة ملفات إخراج التحقق من العناوين بالكامل لصالح السجلات.

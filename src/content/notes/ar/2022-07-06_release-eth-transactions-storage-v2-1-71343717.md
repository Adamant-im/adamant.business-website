---
title: "ADAMANT ETH Transactions Storage v2.1"
slug: "release-eth-transactions-storage-v2-1-71343717"
description: "يقلل هذا الإصدار الصيانة من عدد الطلبات إلى عقدة الإيثيريوم ويضيف تسجيلات مفصلة ويعالج مشكلات الاتصال."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.1"
publishedAt: "2022-07-06T08:00:44Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "ETH-transactions-storage"
tag: "v2.1"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:71343717"
locale: "ar"
placeholder: false
---

يقلل هذا الإصدار الصيانة من عدد الطلبات المقدمة إلى عقدة الإيثيريوم ويضيف تسجيلات أكثر تفصيلًا في جميع أنحاء التطبيق. كما يعالج مشكلة الاتصال عبر IPC مع عقدة الإيثيريوم وكذلك مشكلة الاتصال بقاعدة البيانات، مما يحسن الموثوقية الشاملة.

تم إدخال متغير بيئة جديد باسم `LOG_FILE`، يتيح للمشغلين تهيئة الموقع الذي تُكتب فيه مخرجات السجلات. تم تضمين نصّين برمجيين مساعدين الآن: `ethtest.py` لاختبار اتصال عقدة الإيثيريوم و`pgtest.py` لاختبار اتصال قاعدة بيانات PostgreSQL. تُسهّل هذه النصوص التشخيصَ المبكر لمشاكل الاتصال أثناء النشر.

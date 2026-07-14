---
title: "ADAMANT Console v1.3.0"
slug: "release-adamant-console-v1-3-0-13940917"
description: "يُقدّم هذا الإصدار أمرَين جديدين: account new وget transactions، ويضيف دعم خيار passPhrase، مما يسمح للمستخدمين بتوفير العبارة السرية مباشرة عند التشغيل."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.3.0"
publishedAt: "2018-11-11T16:19:44Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.3.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:13940917"
locale: "ar"
placeholder: false
---

يُقدّم هذا الإصدار أمرَين جديدين: `account new` و`get transactions`. كما يضيف دعم الخيار `--passPhrase`، ما يسمح للمستخدمين بتوفير العبارة السرية مباشرة عند تشغيل أمر ما.

يشمل هذا الإصدار عدة إصلاحات. تم استبدال الاستدعاءات المُهملة لـ `new Buffer()`، وتم إصلاح عطل كان يتسبب في تحميل التهيئة بشكل غير صحيح. تم تطبيق تحديث مؤقت للارتباطات الرمزية في انتظار دمج dthree/vorpal#322.

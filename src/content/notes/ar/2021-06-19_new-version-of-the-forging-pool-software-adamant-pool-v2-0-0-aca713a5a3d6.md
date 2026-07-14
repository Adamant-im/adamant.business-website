---
title: "ADAMANT Pool v2.0.0 تم إصداره"
slug: "new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
description: "يقدم ADAMANT Pool v2.0.0 إعادة كتابة كاملة للشفرة تركز على الموثوقية والأداء. يستخدم الآن ADAMANT JS API v1.0.0، ويضمن للمصوتين استلام مكافآتهم بشكل صحيح وفي الوقت المحدد."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
publishedAt: "2021-06-19T14:05:48.039Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/aca713a5a3d6/001-0-nfjyvf39o49caqs7.webp"
cardSpan: "full"
originalId: "medium:aca713a5a3d6"
locale: "ar"
placeholder: false
---

ADAMANT Pool v2.0.0 يقدم إعادة كتابة كاملة للشفرة تركز على الموثوقية والأداء. أصبحت الآن المجموعة تستخدم ADAMANT JS API v1.0.0، مما يضمن للمصوتين استلام مكافآتهم بشكل صحيح وفي الوقت المحدد. تم تخفيض متطلبات الموارد بشكل كبير؛ يمكن الآن تشغيل المجموعة على جهاز افتراضي يحتوي على وحدة معالجة مركزية افتراضية واحدة (vCPU) وذاكرة وصول عشوائي بسعة 512 ميجابايت. تحققت هذه الكفاءة من خلال إزالة التبعيات غير الضرورية، وتحديث ما تبقى منها، واستبدال مكتبة `request` بمكتبة `axios`.

تم إجراء عدة تغييرات في التهيئة. أصبح المنفذ الافتراضي الآن 36667 بدلاً من 36668. يحتوي ملف التهيئة على خيار جديد هو `log_level` وبارامتر `donatewallet` لمشاركة نسبة من المكافآت مع ADAMANT Foundation. يمكن الآن جدولة فترات الدفع باستخدام خيار يوم من أيام الأسبوع في `payoutperiod`. بالإضافة إلى ذلك، أصبحت رسوم معاملة التصويت تُدفع الآن من قبل المصوتين، مما يؤدي إلى تقليل 0.5 ADM من كل مكافأة. يجب على المشغلين تعديل البارامتر `minpayout` لضمان بقاء المدفوعات معقولة بالنسبة للرسوم. أصبحت إنتاجية المندوب تُحسب الآن أثناء توزيع المكافآت.

تشمل التحديثات الأخرى إعادة هيكلة الشفرة، وإزالة وضع القراءة فقط، وإضافة وظائف Markdown للنوتيفاكاتور. كما تم تحديث تصميم لوحة معلومات لوحة معلومات المجموعة.

![New version of the forging pool software ADAMANT Pool v2.0.0](/images/engineering-notes/medium/aca713a5a3d6/002-0-vrmyfc6ou3ue0xnb.webp)

عند تحديث مجموعة موجودة، يُوصى بحذف التثبيت القديم وإجراء تثبيت جديد بالكامل. ومع ذلك، يجب الحفاظ على ملف `/db/transactions` الذي يحتوي على سجل المعاملات.

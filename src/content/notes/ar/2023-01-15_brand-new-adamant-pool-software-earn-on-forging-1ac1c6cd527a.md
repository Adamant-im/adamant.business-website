---
title: "ADAMANT Pool v3.0.0 — تحديث برنامج تجمع التكوين"
slug: "brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
description: "يتيح تجمع التكوين للمستخدمين دمج وزن تصويتهم لتكوين كتل على بلوكشين ADAMANT ومشاركة مكافآت ADM تلقائيًا. يعالج برنامج التجمع حساب وتوزيع المكافآت تلقائيًا."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
publishedAt: "2023-01-15T15:59:48.033Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/1ac1c6cd527a/001-0-rvpkdxtavqcrrn3p.webp"
cardSpan: "full"
originalId: "medium:1ac1c6cd527a"
locale: "ar"
placeholder: false
---

يتيح تجمع التكوين للمستخدمين دمج وزن تصويتهم لتكوين كتل على بلوكشين ADAMANT ومشاركة مكافآت ADM تلقائيًا. ويُعَالَج برنامج التجمع حساب وتوزيع المكافآت دون الحاجة إلى تدخل يدوي.

الإصدار v3.0.0 من تجمع تكوين ADAMANT متوفر الآن كـ[مصدر مفتوح](https://github.com/Adamant-im/pool). تم مراجعة قاعدة الكود بالكامل في مستودع جديد، مما أدى إلى إيقاف العمل بالمستودع القديم. يجلب هذا إعادة الكتابة تحديثات لمكتبات الاعتماد، وتحسين الأداء، وتقليل استخدام الموارد. يبقى تنسيق التهيئة دون تغيير، ويتم توفير نص برمجي للترحيل للمشغلين الذين يقومون بالترقية من الإصدار v2.

أبرز تغيير مرئي بالنسبة للمصوتين هو واجهة ويب جديدة تم بناؤها باستخدام إطار العمل `svelte`، وتتيح تجربة تفاعلية على الأجهزة المكتبية وأجهزة الهواتف المحمولة على حد سواء.

![ADAMANT Pool Web UI](/images/engineering-notes/medium/1ac1c6cd527a/002-0-eus0ye-v8djitrru.webp)

![ADAMANT Pool Web UI mobile](/images/engineering-notes/medium/1ac1c6cd527a/003-0-cdfhik804ra3jq2w.webp)

يُحدّث إصدار v3.0.0 جميع التبعيات، ويعيد كتابة لوحة التحكم باستخدام `svelte`، ويُعيد تصميم وتحسين قاعدة الكود بالكامل مع إصلاح الأخطاء المعروفة.

يجب الإشارة إلى تغييرين جوهريين. أولًا، أصبح من الضروري الآن استخدام Node.js 18.12.1 أو إصدار أحدث (الإصدار الحالي LTS)، حيث لم تعد الإصدارات الأقدم مدعومة. ثانيًا، يستخدم التجمع الآن `lowdb` كقاعدة بيانات. يجب على المشغلين الذين يُحدّثون من الإصدار v2 الرجوع إلى قسم الترحيل في ملف README.

يدعم التصويت للتجمع شبكة ADAMANT اللامركزية ويكسب دخلًا سلبيًا على شكل مكافآت تكوين. توجد قائمة بالتجمعات النشطة لـ ADAMANT في [توثيق ADAMANT](https://medium.com/adamant-im/hodl-list-of-adamant-pools-join-in-and-get-rewards-491a98610f4b).

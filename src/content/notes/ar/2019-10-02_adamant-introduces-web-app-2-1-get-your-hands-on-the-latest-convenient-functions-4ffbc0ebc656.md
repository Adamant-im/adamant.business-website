---
title: "ADAMANT Web App 2.1: مشاركة QR، وصول البوتات، وتحسينات تحويل الرموز"
slug: "adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
description: "يركز تحديث ADAMANT Web App 2.1 على كفاءة المراسلة وتسهيل عملية الإعداد. أصبح لدى الحسابات الجديدة الآن وصول فوري إلى بوتين دون أي إعداد إضافي."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
publishedAt: "2019-10-02T06:50:35.550Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ffbc0ebc656/001-1-l-nswrbv8xnsm1omxvshqg-png.webp"
cardSpan: "full"
originalId: "medium:4ffbc0ebc656"
locale: "ar"
placeholder: false
---

يركز تحديث ADAMANT Web App 2.1 على كفاءة المراسلة وتسهيل عملية الإعداد. أصبح لدى الحسابات الجديدة الآن وصول فوري إلى بوتين — بوت تبادل وبوت رهان — دون أي إعداد إضافي.

النقر على عنوان المحفظة يعرض ثلاث خيارات: نسخ العنوان إلى الحافظة، أو نسخ رابط مشاركة قابلاً للمشاركة، أو عرض رمز الاستجابة السريعة (QR). يتبع تنسيق رابط المشاركة النمط `https://msg.adamant.im/?address=U14236667426471084862`، مما يمكن المستلمين من بدء الدردشة فورًا. كما أصبحت أكواد QR تُعرض الآن في قسم "معلومات الشريك" عند النقر على أيقونة جهة اتصال.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/002-1-ca218mdchy7u6byjnmqxha-png.webp)

تُعد مشاركة الرمز الشريطي مفيدة لتبادل جهات الاتصال وجهًا لوجه لأنها لا تترك أي سجل قابل للتتبع. يمكن لتشفير رمز QR واحد أن يحتوي ليس فقط على عنوان، بل أيضًا تسمية جهة اتصال، ومبلغ رمز مميز، ورسالة ترحيب. يقوم التطبيق بتحليل الروابط في الحافظة تلقائيًا ويملأ الحقول ذات الصلة. على سبيل المثال، يفتح هذا الرابط دردشة مع جهة اتصال مُسَمّاة، ومبلغ رمز مسبق، ورسالة:

```
https://msg.adamant.im/?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
```

عند نقل الرموز، يدعم التطبيق إعدادات مسبقة سريعة للمبالغ، مما يسمح لك بإرسال جميع الأموال المتاحة أو جزء كسري مثل الثلث دون إدخال يدوي.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/004-1-dmv7hxalesdxspouol49ka-png.webp)

تم تطوير هذه الميزات من خلال مقترحات تحسين ADAMANT (AIPs)، وهي مجموعة مفتوحة من الاقتراحات لتحسينات التطبيق متوفرة في [مستودع AIPs على GitHub](https://github.com/Adamant-im/AIPs). إلى جانب تطبيق الويب، تم تحديث إصدارات Tor وWindows وLinux، وهي متاحة الآن في [الإصدار 2.1 على GitHub](https://github.com/Adamant-im/adamant-im/releases/tag/v2.1.0).

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/003-1-2hnq5ol3qs8fauymp6vxa-png.webp)

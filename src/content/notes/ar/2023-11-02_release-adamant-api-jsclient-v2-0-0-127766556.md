---
title: "ADAMANT API JS Client v2.0.0"
slug: "release-adamant-api-jsclient-v2-0-0-127766556"
description: "تم إعادة كتابة عميل ADAMANT API JS بلغة TypeScript لتوفير أنواع بيانات أصلية، مع إضافة طرق واجهة برمجة تطبيقات جديدة وإصلاحات للعُطل."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v2.0.0"
publishedAt: "2023-11-02T21:58:09Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-api-jsclient"
tag: "v2.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:127766556"
locale: "ar"
placeholder: false
---

تم إعادة كتابة عميل ADAMANT API JS بالكامل بلغة TypeScript لتوفير أنواع بيانات أصلية. يقدم هذا الإصدار طرق واجهة برمجة تطبيقات إضافية مثل `getBlock` و`post`، إلى جانب طريقة جديدة `getTransactionId` تستقبل معاملة موقعة وترجع معرفها كسلسلة نصية.

@@CODEBLOCK1@@
@@CODEBLOCK2@@
@@CODEBLOCK3@@
تم إصلاح العديد من الأخطاء، بما في ذلك مشكلة كانت تمنع إنشاء أكثر من مثيل واحد، وعُطل كان يحدث عند استيراد الوحدة النمطية عدة مرات وتؤدي إلى تعارضات عند استخدامها كاعتماد.

### التغيرات الرئيسية

أصبحت عملية تهيئة واجهة برمجة التطبيقات تتطلب الآن استخدام الكلمة المفتاحية `new` لإنشاء مثيلات من `AdamantApi`.

@@CODEBLOCK4@@
تم تحديث تهيئة المقبس (Socket)، واستُبدل `api.socket.initSocket()` بـ `api.initSocket()`، ويتم الآن استخدام `api.socket.on()` بدلاً من تمرير وظائف رد إلى `initSocket`.

@@CODEBLOCK5@@
بدلاً من ذلك، يمكن تحديد خيار `socket` عند تهيئة واجهة برمجة التطبيقات.

@@CODEBLOCK6@@
@@CODEBLOCK7@@
تمت إزالة طريقة `createTransaction()`. يجب على المطورين استخدام `createSendTransaction` أو `createStateTransaction` أو `createChatTransaction` أو `createDelegateTransaction` أو `createVoteTransaction` بدلاً من ذلك.

---
title: "مكتبة ADAMANT JS API v1.7.0 - تحديث"
slug: "adamant-js-api-library-v1-7-0-update-f362227cae9"
description: "مكتبة ADAMANT JavaScript API v1.7.0 تضيف دعمًا للدالة الاسترجاعية بعد التهيئة. تشمل التغييرات طريقة api.setStartupCallback() وبارامتر دالة اختياري في المُنشئ."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-js-api-library-v1-7-0-update-f362227cae9"
publishedAt: "2023-01-08T14:33:18.085Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f362227cae9/001-1-fyo9k3w-4-kerjuoncf9fw-png.webp"
cardSpan: "full"
originalId: "medium:f362227cae9"
locale: "ar"
placeholder: false
---

تُقدِّم مكتبة ADAMANT JavaScript API الإصدار 1.7.0 دعمًا للدالة الاسترجاعية (callback) للمنطق الذي يتم تنفيذه بعد التهيئة. يتضمن هذا الإصدار تغييرين: طريقة جديدة تُسمى `api.setStartupCallback()`، ودالة استرجاعية اختيارية تُقبل كمعلمة ثالثة في مُنشئ `api`. تتيح لك كلا الآليتين تشغيل كود مخصص بعد انتهاء المكتبة من التهيئة، وهو ما يُعدّ مفيدًا للمهام التحضيرية التي تعتمد على توفر مثيل API جاهز.

تتوفر الوثائق الكاملة للواجهة البرمجية في [ويكي عميل ADAMANT API](https://github.com/Adamant-im/adamant-api-jsclient/wiki/API-Specification). تفاصيل الإصدار متوفرة في [ملاحظات الإصدار v1.7.0](https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v1.7.0).

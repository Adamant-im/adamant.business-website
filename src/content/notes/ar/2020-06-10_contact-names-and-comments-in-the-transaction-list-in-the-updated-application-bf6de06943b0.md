---
title: "أسماء جهات الاتصال والتعليقات في قائمة المعاملات — في التطبيق المحدّث"
slug: "contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
description: "تحديث تطبيق ADAMANT الويب v2.6.0 يجعل قائمة المعاملات أكثر إفادة مع عرض التعليقات وأسماء جهات الاتصال مباشرة."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
publishedAt: "2020-06-10T06:44:48.139Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/bf6de06943b0/001-0-q5zuwj-pur7a9hdb.webp"
cardSpan: "full"
originalId: "medium:bf6de06943b0"
locale: "ar"
placeholder: false
---

يُحسّن تحديث تطبيق ADAMANT الويب v2.6.0 قائمة المعاملات لتصبح أكثر إفادة. أصبحت التعليقات المرتبطة بالتحويلات الآن مرئية مباشرة في القائمة، وتُعرض أسماء جهات الاتصال بجانب العناوين، كما يوفّر كل إدخال اختصارًا لفتح الدردشة المقابلة. وقد تم تحديث عروض تفاصيل المعاملات لتُظهر التعليقات وأسماء جهات الاتصال أيضًا، ويُسمّى عنوان المستخدم الخاص بـ "أنا" لتوضيح الهوية. بالنسبة للمعاملات التي تشمل عملات مشفرة أخرى، تُعرض عناوين ADM وأسماء جهات الاتصال في القائمة، مع توافر نفس اختصار الدردشة.

![أسماء جهات الاتصال والتعليقات في قائمة المعاملات — في التطبيق المحدّث](/images/engineering-notes/medium/bf6de06943b0/002-0-nu76kd5rli905hye.webp)

تم توضيح إعداد استمرارية تسجيل الدخول: تم استبدال السلوك السابق "تسجيل الخروج عند إغلاق التبويب" بخيار أوضح هو "البقاء مسجّل الدخول". أصبح الوضع الداكن الآن السمة الافتراضية. من ناحية الأمان، تُفتح الروابط الموجودة في الرسائل ورابط وثائق كلمة مرور المستخدم في نوافذ جديدة مع `noopener` لمنع هجوم tab-nabbing. كما تم أيضًا إصلاح إشعارات الدفع في هذا الإصدار.

تتوفر سجل التغييرات الكاملة على [صفحة إصدار ADAMANT في GitHub](https://github.com/Adamant-im/adamant-im/releases/tag/v2.6.0).

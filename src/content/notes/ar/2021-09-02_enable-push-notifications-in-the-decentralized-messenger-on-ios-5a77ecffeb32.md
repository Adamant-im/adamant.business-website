---
title: "تمكين إشعارات الدفع في ADAMANT Messenger على نظام iOS"
slug: "enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
description: "يمكن لتطبيق ADAMANT Messenger على iOS إرسال إشعارات بالرسائل الجديدة حتى عند إغلاق التطبيق، عبر خدمة الإشعارات ADAMANT (ANS)."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
publishedAt: "2021-09-02T20:37:14.112Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/5a77ecffeb32/001-0-gssgbcsz1xeu5gpg.webp"
cardSpan: "full"
originalId: "medium:5a77ecffeb32"
locale: "ar"
placeholder: false
---

يمكن لتطبيق ADAMANT Messenger المخصص لنظام iOS إعلام المستخدمين بالرسائل الجديدة حتى عندما لا يعمل التطبيق، وذلك بفضل خدمة إشعارات ADAMANT (ANS). تبدأ العملية عندما يرسل المستخدم رسالة إشارة مشفرة تحتوي على رمز مميز فريد إلى عقدة على شبكة ADAMANT blockchain، مع استخدام عنوان ADAMANT الخاص بخدمة ANS كمتلقي. تقوم ANS بالتحقق من سلسلة الكتل لفك تشفير الرمز المميز للمستخدم، وتصفية المعاملات التي يكون عنوان ADM الخاص بالمستخدم فيها هو المتلقي. بعد ذلك، تطلب ANS من خدمة إشعارات Apple (APNS) تسليم هذه المعاملات، التي تحتوي على رسائل مشفرة، إلى الجهاز الخاص بالمستخدم المحدد بالرمز المميز الفريد. وأخيرًا، تقوم APNS بإعلام الجهاز، ويستخدم تطبيق Messenger المفتاح السري (عبارة المرور) لفك تشفير الرسائل.

يضمن هذا الهيكل ألا يتواصل جهاز المستخدم مع خدمة ANS مباشرةً أبدًا، ما يعني أن ANS لا تعرف عنوان IP الخاص بالجهاز أو أي هوية أخرى. يتم التخاطب فقط من خلال عقد سلسلة الكتل. لتمكين إشعارات الدفع في التطبيق، يجب على المستخدمين تفعيل خيار "البقاء مسجلاً دخولك" واختيار نوع إشعار الدفع.

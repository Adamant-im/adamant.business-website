---
title: "متجر المفاتيح والقيم في ADAMANT: تخزين أسماء جهات الاتصال على البلوكشين"
slug: "what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
description: "أدخل ADAMANT آلية متجر المفاتيح والقيم (KVS) لتخزين بيانات جهات الاتصال على البلوكشين، مُنفَّذة في إصدار ADAMANT Blockchain 0.2.0. يدعم KVS التخزين العام والخاص."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
publishedAt: "2018-07-11T07:10:16.055Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ee5f82ab77f/001-0-tvpp-oomdjax-ek8.webp"
cardSpan: "full"
originalId: "medium:4ee5f82ab77f"
locale: "ar"
placeholder: false
---

أدخل ADAMANT آلية متجر المفاتيح والقيم (KVS) لتخزين بيانات جهات الاتصال على البلوكشين، مُنفَّذة في إصدار ADAMANT Blockchain 0.2.0. يدعم KVS كلًا من التخزين العام والخاص. ومن الأمثلة العامة عناوين Ethereum، بينما تشمل الأمثلة الخاصة دفاتر العناوين.

تُخزَّن معاملات KVS الخاصة على السلسلة (on-chain) إلى جانب أنواع المعاملات الأخرى، ولكن لا يمكن الوصول إليها إلا من قبل مالكيها. ويتم تشفير محتوى المعاملة باستخدام تجزئة (hash) للمفتاح الخاص للمالك مع إضافة ملح (salt) لأغراض أمان إضافية. ترد التفاصيل التقنية الكاملة في [AIP-3](https://aips.adamant.im/AIPS/aip-3).

يستخدم ADAMANT تخزين البيانات التراكمي، ما يعني أن تطبيق العميل يُرسِل فقط التغييرات على دفتر العناوين بدلًا من دفتر العناوين بالكامل. ويعتبر هذا جانبًا مهمًا في التخزين القائم على البلوكشين، حيث يُعد تقليل حجم البيانات على السلسلة أمرًا بالغ الأهمية. يُقرن كل مفتاح بقيمة محددة — على سبيل المثال، يُقرن عنوان جهة الاتصال في ADAMANT (مثل `U324242353425354`) باسم العرض (مثل "John").

تم تحديث تطبيق ADAMANT Messenger الويب لدعم هذه الوظيفة. يمكن للمستخدمين إعادة تسمية جهة اتصال بالنقر على العنوان الذي يحتوي على عنوان ADAMANT ضمن الدردشة.

![Key-Value Store in ADAMANT](/images/engineering-notes/medium/4ee5f82ab77f/002-0-xzokd2tzoxh9eqk2.webp)

من المخطط دعم دفتر العناوين في تطبيقات iOS وAndroid في الإصدارات المستقبلية.

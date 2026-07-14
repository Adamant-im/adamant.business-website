---
title: "استلام DASH فورًا في ADAMANT Messenger ومحفظة العملات المشفرة"
slug: "receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
description: "يقدم ADAMANT Messenger الإصدار 2.12.0 دعمًا لخاصية Dash InstantSend لاستلام تحويلات DASH فورًا دون انتظار تأكيدات الشبكة. عادةً ما تتطلب تحويلات العملات الرقمية انتظار تأكيدات الكتلة، لكن Dash InstantSend يستخدم العقد الرئيسية للتحقق من المعاملات وضمان تضمينها في الكتل التالية. إلى جانب ذلك، يحسّن التحديث سرعة تحديث حالة المعاملات للعملات المشفرة المدعومة الأخرى."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
publishedAt: "2021-08-04T13:23:12.613Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9cbe8401d6c0/001-0-omadd6rxri1q0dfd.webp"
cardSpan: "full"
originalId: "medium:9cbe8401d6c0"
locale: "ar"
placeholder: false
---

يقدم إصدار ADAMANT Messenger 2.12.0 دعمًا لخاصية Dash InstantSend، ما يسمح باستلام تحويلات DASH فورًا دون الحاجة إلى انتظار تأكيدات الشبكة. عادةً، تتطلب تحويلات العملات الرقمية انتظار تأكيدات الكتل، لكن Dash InstantSend يستخدم العقد الرئيسية (master nodes) للتحقق من المعاملات وضمان تضمينها في الكتل اللاحقة. إلى جانب ذلك، يحسّن التحديث سرعة تحديث حالة المعاملات للعملات الرقمية المدعومة الأخرى.

كما يدمج هذا الإصدار روبوت مكافآت ADM مباشرةً في المحادثات. يقوم هذا الروبوت بدفع المكافآت تلقائيًا وفورًا عند إكمال المهام، ويدعم حاليًا حملات تويتر. يمكن للمستخدمين إرسال الأمر `/help` إلى الروبوت لمعرفة قواعد الحملة.

![استلام DASH فورًا في ADAMANT Messenger ومحفظة العملات المشفرة](/images/engineering-notes/medium/9cbe8401d6c0/002-0-hofe2-yqoknm1e74.webp)

لضمان موثوقية وسلامة الكود، قام التحديث بترقية التبعيات إلى إصدارات لا تحتوي على ثغرات معروفة. تم تقليل حجم التطبيق من خلال إزالة قوائم كلمات bip39 غير المستخدمة بلغات غير الإنجليزية. علاوةً على ذلك، تم تحسين توليد المفاتيح التشفيرية للمحافظ المشفرة المدمجة، ما يجعل تسجيل الدخول إلى حساب جديد أسرع بنحو ست مرات بفضل تخزين الجذر (seed caching). تشمل الصيانة الإضافية ترقية مكتبات الإثيريوم، وإزالة رابط صرف Atomars المُلغى، وتطبيق العديد من إصلاحات الأخطاء.

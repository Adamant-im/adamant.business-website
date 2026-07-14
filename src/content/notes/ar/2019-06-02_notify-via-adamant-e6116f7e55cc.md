---
title: "الإشعارات عبر ADAMANT"
slug: "notify-via-adamant-e6116f7e55cc"
description: "تقدم ADAMANT خصائص تجعلها مناسبة كوسيلة نقل للإشعارات: تحقق من تسليم كل رسالة على السلسلة، ورسائل لا يمكن تغييرها، ووقت تخزين غير محدود، ولا تتطلب جهازًا معينًا."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/notify-via-adamant-e6116f7e55cc"
publishedAt: "2019-06-02T14:22:43.887Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e6116f7e55cc/001-1-8rvans74h-cl-ux-bpeiaw-png.webp"
cardSpan: "full"
originalId: "medium:e6116f7e55cc"
locale: "ar"
placeholder: false
---

تقدم ADAMANT عدة خصائص تجعلها مناسبة كوسيلة نقل للإشعارات: يتم التحقق من تسليم كل رسالة على السلسلة (on-chain)، والرسائل وترتيبها لا يمكن تغييرهما، ووقت التخزين فعليًا غير محدود، ولا يكون الوصول مرتبطًا بجهاز معين. المشروع مفتوح المصدر. ومن مثال عملي أن مشغلي تجمعات العملات المشفرة يتلقون إشعارات حول عمليات التجمع عبر رسائل ADAMANT.

يمكن للمطورين دمج إشعارات ADAMANT من خلال ثلاث واجهات رئيسية. توفر وحدة تحكم ADAMANT أمر `send message` وهي أداة سطر أوامر لا تعتمد على اللغة. بالنسبة لتطبيقات JavaScript، تكون دالة `send` متاحة في مكتبة عميل ADAMANT API JS. وأخيرًا، يعرض العقدة الأصلية لـ ADAMANT واجهة برمجة تطبيقات خاصة بها للتكامل المباشر.

يدعم محتوى الرسالة تنسيق Markdown والرموز التعبيرية (Emoji)، مما يسمح بإرسال إشعارات منظمة وسهلة القراءة.

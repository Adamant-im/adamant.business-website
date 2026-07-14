---
title: "ADAMANT Tradebot v2.10.6"
slug: "release-adamant-tradebot-v2-10-6-35700159"
description: "يركز هذا الإصدار على تحسينات الأداء والاستقرار لبرنامج ADAMANT Tradebot، مع تحسين استخدام وحدة المعالجة المركزية وحل مشكلات حدود الواجهة البرمجية."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v2.10.6"
publishedAt: "2020-12-24T13:13:19Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v2.10.6"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:35700159"
locale: "ar"
placeholder: false
---

يركز هذا الإصدار على تحسينات الأداء والاستقرار لبرنامج ADAMANT Tradebot. تم تحسين استخدام وحدة المعالجة المركزية، وتم حل العديد من المشكلات التي تؤثر على حدود الواجهة البرمجية (API) واستجابات الطلبات المتأخرة. كما تم إصلاح تجزئة الاستجابة من بورصة Bit-Z لضمان استرجاع البيانات بشكل موثوق من هذه البورصة.

من ناحية الميزات، توفر الآن أوامر `/balances` و`/orders` و`/rates` و`/stats` معلومات إضافية لمساعدة المشغلين على مراقبة نشاط البوت بشكل أكثر فعالية. تم إدخال وحدة جديدة تُسمى `orderUtils` كجزء من العمل المستمر لإعادة هيكلة الكود، وتم دعم نوع جديد من الطلبات يُسمى `man` للطلبات المُدخلة يدويًا. تم تقليل تكرار نظام الإشعارات لتقليل التنبيهات غير الضرورية. كما تم تحديث التبعيات إلى أحدث إصدارات متوافقة.

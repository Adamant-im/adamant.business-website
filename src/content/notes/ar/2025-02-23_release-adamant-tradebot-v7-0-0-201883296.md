---
title: "ADAMANT Tradebot v7.0.0"
slug: "release-adamant-tradebot-v7-0-0-201883296"
description: "يُقدّم هذا الإصدار ميزة تخزين الطلبات مؤقتًا وأوامر جديدة للتفاعل مع البورصات مثل /orderbook و/trades و/ticker و/order و/cancel."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0"
publishedAt: "2025-02-23T05:56:49Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v7.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:201883296"
locale: "ar"
placeholder: false
---

يُقدّم هذا الإصدار ميزة تخزين الطلبات مؤقتًا وأوامر جديدة للتفاعل مع البورصات، بما في ذلك `/orderbook` و`/trades` و`/ticker` و`/order` و`/cancel`. تم تحديث أمر `/help` ليشمل معلومات حول برنامج البوت وتكوينه.

تمت إعادة هيكلة وحدات الأوامر وكتاب الطلبات والتداول لتحسين الصيانة. تمت إضافة إعداد تهيئة جديد باسم `database` لدعم هذه التغييرات. تم إصلاح دالة `getOrderDetails()` في موصلات Azbit وP2B.

تم تحديث التبعيات، وتم تطبيق إصلاحات عامة للأخطاء وتحسينات في قاعدة الكود بأكملها. تم تحسين التسجيل (Logging)، وتمت إضافة أنواع TypeScript لتعزيز الأمان من حيث النوع وتجربة المطور.

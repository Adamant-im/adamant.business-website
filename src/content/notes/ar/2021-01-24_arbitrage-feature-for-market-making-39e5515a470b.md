---
title: "ميزة التحكيم للتداول الآلي"
slug: "arbitrage-feature-for-market-making-39e5515a470b"
description: "يمكن لمالكي الرموز الآن تفعيل ميزة التحكيم في بوت التداول والسيولة ADAMANT باستخدام أمر /enable pw."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/arbitrage-feature-for-market-making-39e5515a470b"
publishedAt: "2021-01-24T16:41:51.417Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/39e5515a470b/001-0-vcyqehma-vfieqdv-png.webp"
cardSpan: "full"
originalId: "medium:39e5515a470b"
locale: "ar"
placeholder: false
---

يدعم بوت التداول والسيولة في ADAMANT الآن ميزة التحكيم. يمكن لمالكي الرموز تفعيل مراقبة الأسعار على منصات تداول أخرى وأزواج تداول باستخدام الأمر `/enable pw`.

عندما يقوم صانع السوق بالتداول عبر أزواج أو منصات متعددة، يمكنه تحديد زوج تداول رئيسي ضمن نطاق عددي وهدف الأزواج الأخرى إليه. عند استقبال نطاق سعر من زوج تداول آخر، سيقوم البوت إما بوضع عروض وطلبات مباشرة ضمن السياسة *الصارمة* أو تقدير الأسعار الفعلية ضمن السياسة *الذكية*. على سبيل المثال، بناءً على سجل الطلبات المعطى، قد تُنتج السياسة *الصارمة* نطاق سعر 0.0122–0.0128، بينما تُنتج السياسة *الذكية* نطاقًا أوسع هو 0.0114–0.0133.

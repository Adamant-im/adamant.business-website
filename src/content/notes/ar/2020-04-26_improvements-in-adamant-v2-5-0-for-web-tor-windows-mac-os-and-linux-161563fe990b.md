---
title: "تحسينات في ADAMANT v2.5.0 للويب وTor وWindows وMac OS وLinux"
slug: "improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-and-linux-161563fe990b"
description: "يقدم ADAMANT v2.5.0 تحسينات وتصحيحات للويب وTor والتطبيقات المكتبية، مع دعم أفضل للروابط المشفرة وعرض الخطوط الرمزية وتصحيح اتصالات WebSocket."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-linux-161563fe990b"
publishedAt: "2020-04-26T17:21:28.135Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/161563fe990b/001-0-rzxpq8psh7gjckqp.webp"
cardSpan: "full"
originalId: "medium:161563fe990b"
locale: "ar"
placeholder: false
---

يُقدّم ADAMANT v2.5.0 عدة تحسينات وتصحيحات للأخطاء عبر تطبيقات الويب وTor والتطبيقات المكتبية. وباعتباره مراسلاً مبنيًا على البلوكشين، يستفيد ADAMANT من عدد أكبر من العقد الشبكية لتحقيق توزيع أفضل. أصبح تطبيق الويب الآن يحتوي على تسع عقد، تتضمن ثلاث عقد من النوع HTTP وست عقد من النوع HTTPS. عند استخدام اتصال HTTPS، تكون العقد المتاحة فقط هي من النوع HTTPS، في حين يمكن للتطبيقات المكتبية لنظامي Windows وmacOS وLinux الوصول إلى جميع العقد التسع.

كما يُحسّن التحديث قائمة البورصات لشراء وبيع ADM، بإزالة IDCM وإضافة CoinDeal، إلى جانب تحديث روابط Resfinex وBit-Z. تم تحسين دعم Markdown في ADAMANT لعرض الخطوط أحادية المسافة بشكل صحيح في كتل `code`.

![تحسينات في ADAMANT v2.5.0 للويب وTor وWindows وMac OS وLinux](/images/engineering-notes/medium/161563fe990b/002-0-sqpbhli5aps7yqjd.webp)

في إصدار Tor من المرسل، تم إصلاح اتصالات WebSocket لضمان تسليم أسرع للرسائل.

![تحسينات في ADAMANT v2.5.0 للويب وTor وWindows وMac OS وLinux](/images/engineering-notes/medium/161563fe990b/003-0-fblaod14ec32orwh.webp)

تشمل الصيانة الإضافية في هذا الإصدار تحديث التبعيات، وفحص بروتوكول العقد، وتصحيحات لstatuses العقد واتصالات المقبس على مضيفي HTTP. كما يعالج التحديث أسماء الدردشات الثابتة، والتحقق من صحة العناوين المُلصَقة في تدفق "بدء دردشة جديدة"، وتوليد رموز QR للعناوين ADM على Windows والتطبيقات الأخرى. كما تم تحسين الترجمة المحلية لرسائل الخطأ "لا يوجد مفتاح عام" و"لا يوجد تجزئة".

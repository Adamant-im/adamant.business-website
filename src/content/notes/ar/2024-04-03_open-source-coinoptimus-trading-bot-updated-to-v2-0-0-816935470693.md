---
title: "تحديث روبوت التداول CoinOptimus إلى الإصدار 2.0.0"
slug: "open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
description: "تم تحديث ADAMANT CoinOptimus، روبوت تداول العملات المشفرة المستضاف ذاتيًا والمصمم للمتداولين غير المحترفين، إلى الإصدار 2.0.0، ويتضمن إصلاحات وتحسينات وخمسة أوامر جديدة."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
publishedAt: "2024-04-03T11:29:39.685Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/816935470693/001-1-yi0sr85whds3uma4ith6na-png.webp"
cardSpan: "full"
originalId: "medium:816935470693"
locale: "ar"
placeholder: false
---

تم تحديث ADAMANT CoinOptimus، وهو روبوت تداول للعملات المشفرة مستضاف ذاتيًا ومصمم للمتداولين غير المحترفين، إلى الإصدار 2.0.0. يتضمن هذا الإصدار إعادة هيكلة، إصلاحات للأخطاء، وخمسة أوامر جديدة: `/fill`، `/stats`، `/deposit`، `/account`، و`/info`.

### أوامر جديدة

يقوم الأمر `/fill` بملء دفتر الطلبات بسلسلة من الأوامر في خطوة واحدة.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/002-0-p-pmlz9g0oqkhlzh.webp)

يعرض الأمر `/stats` إحصائيات زوج التداول بما في ذلك الأسعار، المستويات الدنيا والعليا، حجم التداول، أعلى سعر شراء في دفتر الطلبات، أدنى سعر بيع، الفرق بين السعرين (spread)، وسيولة دفتر الطلبات.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/003-1-ghu8f-ht7mxhagdmaqo1ag-png.webp)

يعيد الأمر `/deposit` عنوانًا لإعادة شحن حساب في البورصة عبر سلاسل مختلفة.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/004-0-j-uwsyddj1i6k3d7.webp)

يعرض الأمر `/account` رسوم التداول والحجم الشهري للتداول لحساب الروبوت، عند توفرها.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/005-0-vfvn8x-wf1ohwg8a.webp)

يعرض الأمر `/info` جميع المعلومات المتاحة لعملة وسلسلة محددة.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/006-0-n5uqmmhtmdcwjbe3.webp)

### كيف يعمل CoinOptimus

يُعد CoinOptimus تطبيقًا مبنيًا على Node.js يعمل باستمرار على خادم أو خادم افتراضي خاص (VPS). تقوم بتكوينه باستخدام بورصة، وزوج تداول، ومفاتيح API من حسابك في البورصة. يدير الروبوت استراتيجيات التداول ويُصدر أوامر بناءً على الأوامر التي ترسلها عبر ADAMANT Messenger، مع الاستجابة بشكل مناسب.

يعتمد الروبوت بشكل أساسي على استراتيجية التداول المثلى باستخدام الشبكة/السلم (Optimal Ladder/Grid Trade Strategy)، حيث يضع عدة أوامر شراء وبيع بأسعار تبدأ من الفرق بين السعرين (spread). عندما يتم تنفيذ الطلب الأقرب إلى الفرق، يضيف الروبوت طلبًا مشابهًا على الجانب المقابل، وفقًا لمبدأ الشراء بأقل من سعر البيع والبيع بأعلى من سعر الشراء. تُعد هذه الاستراتيجية فعالة بشكل خاص في الأسواق المتقلبة.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/007-0-twtuzn4rmej2q4s8.webp)

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/008-0-ruyx47yeeapvvo4r.webp)

تتوفر تعليمات الإعداد في [ملف README في المستودع](https://github.com/Adamant-im/adamant-coinoptimus#usage-and-installation). لا يُعد CoinOptimus آلة مضمونة للربح؛ يُستخدم على مسؤوليتك الخاصة.

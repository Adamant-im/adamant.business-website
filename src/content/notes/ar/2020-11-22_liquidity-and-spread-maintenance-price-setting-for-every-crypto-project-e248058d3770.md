---
title: "السيولة والحفاظ على الفروق السعرية باستخدام روبوت ADAMANT للتداول الآلي v2.7.0"
slug: "liquidity-and-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
description: "يُعدّ تقييم السيولة والفروق السعرية من العوامل الأساسية عند تقييم المشاريع المشفرة. يُمكن الآن الحفاظ على سيولة حية وفروق سعرية تنافسية باستخدام روبوت ADAMANT."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/liquidity-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
publishedAt: "2020-11-22T19:34:30.866Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e248058d3770/001-1-3lizhhkkfifjduf5z4zxtq-png.webp"
cardSpan: "full"
originalId: "medium:e248058d3770"
locale: "ar"
placeholder: false
---

عندما يقوم المستثمرون بتقييم مشروع عملة رقمية، فإنهم ينظرون إلى السيولة والفروق السعرية في البورصات. تشير السيولة إلى كمية الرموز التي يمكن للمستخدمين شراؤها أو بيعها، بينما تعكس الفروق السعرية الفرق بين أسعار الشراء والبيع. يمكن الآن للمشاريع الصغيرة أيضًا الحفاظ على سيولة حية وفروق سعرية تنافسية باستخدام روبوت **cryptofoundry** للتداول الآلي.

يُقدّم الإصدار 2.7.0 ميزة الحفاظ على السيولة والفروق السعرية كمزايا أساسية. يمكن للمستخدمين تهيئة هذه المعايير من خلال الأمر `/enable liq`، والذي يُعدّد أهداف السيولة والفروق السعرية التي يجب أن يحافظ عليها الروبوت في البورصات المدعومة.

كما يضيف هذا الإصدار وظيفة مراقبة الأسعار. تسمح الأوامر `/make price` و`/enable pw` للمشغلين بتعيين ورصد الأسعار المستهدفة، مما يمنح المشاريع تحكمًا أكبر في تقييم الرمز في السوق.

وتكتمل التحديثات بعدة تحسينات تشغيلية. أصبح الأمر `/balances` الآن يقدّم معلومات أكثر تفصيلًا، وتم تحديث تسجيل السجلات (logging) لتحسين إمكانية المراقبة. كما أصبح الروبوت يتعامل مع مهلات الطلب (timeouts) بشكل أكثر سلاسة، وتَمَّت إضافة تحليل الاتجاهات (trend analysis) للتداول الآلي لمساعدة الروبوت على اتخاذ قرارات تداول أكثر دقة.

يُعدّ مشروع **adamant-tradebot** مفتوح المصدر. تتوفر ملاحظات الإصدار والتنزيلات على [GitHub](https://github.com/adamant-tradebot).

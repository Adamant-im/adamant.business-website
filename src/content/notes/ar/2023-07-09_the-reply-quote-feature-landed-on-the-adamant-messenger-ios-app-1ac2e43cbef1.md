---
title: "ميزة الرد/الاقتباس تصل إلى تطبيق ADAMANT Messenger لنظام iOS"
slug: "the-reply-quote-feature-landed-on-the-adamant-messenger-ios-app-1ac2e43cbef1"
description: "أضاف تطبيق ADAMANT Messenger للدردشة المستندة إلى البلوكشين ميزة الرد/الاقتباس في تحديثه الأخير لنظام iOS. تعرّف على التفاصيل الفنية والتحسينات."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/the-reply-quote-feature-landed-on-the-adamant-messenger-ios-app-1ac2e43cbef1"
publishedAt: "2023-07-09T13:23:47.869Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/1ac2e43cbef1/001-0-f-bl9cbsppi6phqr.webp"
cardSpan: "full"
originalId: "medium:1ac2e43cbef1"
locale: "ar"
placeholder: false
---

ADAMANT Messenger، منصة تواصل قائمة على البلوكشين حيث يُعد كل رسالة معاملة، قد أطلقت ميزة الرد/الاقتباس في آخر تحديث لها للتطبيق على نظام iOS. وبما أن ADAMANT يعمل على بنية لا مركزية، فإن تنفيذ ميزات الرسائل القياسية مثل الاقتباس يتطلب نُهجًا تقنية فريدة مقارنةً بتطبيقات المراسلة المركزية التقليدية.

يمكن تفعيل ميزة الرد/الاقتباس بالتمرير لليسار أو الضغط المطول على الرسالة. إلى جانب ذلك، يقدم التحديث قسم المساهمة، الذي يمكن المستخدمين من دعم تطوير المنصة مباشرةً. كما تمت إضافة تحليلات اختيارية لحالات تعطل التطبيق؛ وهي معطلة افتراضيًا، ويمكن للمستخدمين تفعيل Crashlytics من قسم المساهمة لمساعدة المطورين على جمع البيانات وتحسين استقرار التطبيق.

![The Reply/Quote feature landed on the ADAMANT Messenger iOS app](/images/engineering-notes/medium/1ac2e43cbef1/002-0-pdyl0ofrnylbkm4e.webp)

تم حل عدد من مشكلات المحفظة والمعاملات في هذا الإصدار. أصبحت عناوين BC1 (SegWit) تعمل الآن بشكل صحيح لمعاملات محفظة BTC. كما تم إصلاح مشكلات حد الغاز لمعاملات ETH وERC20، وتمت إضافة خيار لزيادة الغاس لمعاملات ETH وERC20 وBTC. وتم تحسين التحقق من صحة العناوين للعملات، بما في ذلك دعم معلمة "amount" في رموز QR.

تشمل التحسينات الإضافية إصلاح خطأ في تمرير الرسائل، والسماح للمستخدمين ببدء محادثة جديدة مباشرةً من حقل البحث، وحل أخطاء التصميم لأنظمة macOS وiPad وiPhone. كما تم إضافة عُقد جديدة لتحسين الاستقرار والأداء؛ ويمكن للمستخدمين الوصول إلى قائمة جديدة من العُقد بالضغط على زر 'إعادة تعيين' في شاشة العُقد.

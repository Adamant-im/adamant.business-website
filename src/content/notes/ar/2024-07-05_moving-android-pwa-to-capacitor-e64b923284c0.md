---
title: "الانتقال من تطبيق Android PWA إلى Capacitor"
slug: "moving-android-pwa-to-capacitor-e64b923284c0"
description: "تم الانتقال من PWABuilder إلى Capacitor.js للحصول على تحكم كامل في الكود الأصلي، وإمكانية تشغيل الميزات الأصلية، وتحسين الكود، والإضافات المخصصة، وأتمتة CI/CD."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/moving-android-pwa-to-capacitor-e64b923284c0"
publishedAt: "2024-07-05T08:19:06.778Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/e64b923284c0/001-1-n3f-qwiedtkwhrlo6feg7a-png.webp"
cardSpan: "full"
originalId: "medium:e64b923284c0"
locale: "ar"
placeholder: false
---

في السابق، كان يتم بناء تطبيق ADAMANT للأندرويد باستخدام PWABuilder، الذي فرض عدة قيود: عدم التحكم في مستوى واجهة برمجة التطبيقات (API) المستهدفة، وعدم الوصول إلى الكود الأصلي، وعدم دعم الأتمتة. مع تحديث PWA v4.7، انتقل التطبيق إلى Capacitor.js للحصول على تحكم كامل في الكود الأصلي، والقدرة على تشغيل وظائف أصلية مثل الإشعارات الفورية والكاميرا عبر واجهة برمجة تطبيقات Cordova، وتحسين الكود، والإضافات المخصصة، وأتمتة CI/CD.

![Moving Android PWA to Capacitor](/images/engineering-notes/medium/e64b923284c0/002-0-l2l0siac7nx7sixj.webp)

### لماذا Capacitor.js؟

ADAMANT Messenger هو منصة مراسلة لا مركزية تُعطي الأولوية للأداء، والأمان، وسهولة الصيانة. تم اختيار Capacitor.js لأنه يتكامل بسلاسة مع أطر العمل الحديثة مثل Vue.js، ويدعم قاعدة كود واحدة عبر iOS وAndroid والويب، ويوفر إمكانية الوصول إلى واجهات برمجة التطبيقات الأصلية دون التضحية بتجربة الويب، ويستفيد من تطوير نشط وتوثيق قوي.

![Moving Android PWA to Capacitor](/images/engineering-notes/medium/e64b923284c0/003-0-2oz1atirxy-1lvqb.webp)

### المقارنة: Android الأصلي، PWABuilder، وCapacitor.js

يتيح تطوير Android الأصلي وصولاً كاملاً إلى جميع ميزات وواجهات برمجة التطبيقات الخاصة بـ Android، وأداءً عاليًا، وتحكمًا دقيقًا في واجهة المستخدم والوظائف، لكنه يتطلب خبرة في Java أو Kotlin، وقاعدة كود منفصلة لكل منصة، وتكاليف ووقت تطوير أعلى.

يُسهل PWABuilder تحويل تطبيق PWA إلى تطبيق أصلي بحد أدنى من الإعداد والنشر السريع، مما يجعله مناسبًا للتطبيقات البسيطة ذات الوظائف الأصلية المحدودة. ومع ذلك، فإنه يوفر وصولاً محدودًا إلى ميزات الجهاز الأصلية، وأداءً قد لا يُطابق التطبيقات الأصلية بالكامل، ويعتمد على خدمة تحويل تابعة لطرف ثالث.

يوفر Capacitor.js قاعدة كود واحدة متعددة المنصات مع إمكانية الوصول إلى واجهات برمجة التطبيقات والإضافات الأصلية، ويدعم أدوات وتقنيات تطوير الويب الحديثة، ويتمتع بمجتمع نشط وتحديثات مستمرة. أما التنازلات فهي تتمثل في منحنى تعلم طفيف للمستخدمين غير الملمين بجسور الويب-الأصلي، وقد تتطلب بعض الوظائف الأصلية لا يزال إضافات مخصصة.

### التنفيذ التقني

يتم بناء تطبيق Android أصليًا باستخدام Capacitor.js وGitHub Actions. تضمن التنفيذ إضافة سير عمل في GitHub Actions، وتكوين Capacitor، وملفات بيان Android، وصور الشاشة الترحيبية وأيقونات التطبيق، ونص بناء. يمكن الاطلاع على جميع التغييرات الكاملة في [طلب السحب على GitHub](https://github.com/Adamant-im/adamant-im/pull/515).

![Moving Android PWA to Capacitor](/images/engineering-notes/medium/e64b923284c0/004-0-jzpjysc-tuu83qyr.webp)

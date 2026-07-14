---
title: "ADAMANT Console v3.1.0: ملاحظات المطورين لدعم Node v0.10.0"
slug: "discussion-57-adamant-console-v3-1-0-developer-notes-for-node-v0-10-0-support-10337345"
description: "ADAMANT Console v3.1.0 يدعم ADAMANT Node v0.10.0 ويعمل على تحسين واجهة المطورين لأدوات CLI وJSON-RPC والتكاملات المحلية بـ JavaScript."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/57"
publishedAt: "2026-06-29T08:48:18Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10337345"
locale: "ar"
placeholder: false
---

يُقدِّم ADAMANT Console v3.1.0 دعمًا لـ ADAMANT Node v0.10.0 ويُحدِّث واجهة المطورين الخاصة بالـ CLI وJSON-RPC والتكاملات المحلية بـ JavaScript. يستهدف هذا الإصدار بشكل أساسي المطورين والمشغلين الذين يستخدمون Console كأداة توقيع محلية، أو واجهة سطر أوامر للبرمجة النصية، أو جسر خفيف الوزن من نوع JSON-RPC إلى عُقد ADAMANT.

يستخدم Console الآن `adamant-api` v3 ويتماشى مع سلوك الاستجابة والاستعلام في ADAMANT Node v0.10.0. الإصدار المدعوم من بيئة التشغيل هو Node.js 22.13.0 أو أحدث. تم توحيد طرق الواجهة للـ CLI وJSON-RPC وواجهات JavaScript المغلفة حول نفس سلوك Console. تم إضافة أمر `node status` جديد وواجهة مغلفة لدعم استعلام حالة العقدة، بينما تم توسيع أدوات الدردشة لتشمل غرف الدردشة ورسائل الدردشة ومعاملات الدردشة القديمة. أصبحت استعلامات المعاملات الآن تدعم خيارات الاستعلام الخاصة بـ v0.10 مثل `returnUnconfirmed`، واستعلامات المفوّضين تقبل اسم مستخدم أو مفتاحًا عامًا أو عنوان ADAMANT. بالنسبة لمرشحات الدردشة الخاصة بالتحويلات المباشرة، تفضّل الواجهة البرمجية الآن استخدام `includeDirectTransfers`، مع بقاء المدخل القديم `withoutDirectTransfers` مُعالَجًا للتوافق العكسي. تتضمن الواجهات المغلفة العامة الآن تعليقات JSDoc وصفحات مرجعية مُولَّدة تلقائيًا، ويتم نشر حزمة npm مع بيانات مصدر موثوقة عبر GitHub Actions OIDC ونظام npm Trusted Publishing.

للتثبيت أو التحديث بشكل عام، استخدم npm:

```sh
npm install -g adamant-console
```

تُعرِّف الحزمة السطر الأوامر `adm` لإجراء العمليات الشائعة:

```sh
adm client version
adm node status
adm get transaction 123456789 returnUnconfirmed=1
adm get chats U123456789 includeDirectTransfers=1
```

عند الترقية، ينبغي على الخدمات التي تستخدم Console عبر JSON-RPC مراجعة مجموعة الطرق الموسَّعة وآلية التعامل مع الاستجابات. يجب اختبار الشيفرة التي تستهلك استجابات المعاملات أو الدردشة ضد الحقول التي تعتمد عليها في v0.10.0، خاصة بيانات المعاملات غير المؤكدة، وتضمين تحويلات الدردشة المباشرة، وحقل `timestampMs`. بالنسبة للخدمات الجديدة المبنية بـ JavaScript، يُفضَّل استخدام `adamant-api` مباشرة لتحقيق تغطية كاملة للبروتوكول، مع الاحتفاظ بالواجهات المغلفة من `adamant-console` فقط عند الحاجة إلى سلوك متوافق مع Console عبر CLI/RPC أو لكتابة نصوص تشغيل محلية.

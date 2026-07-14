---
title: "تطوير التطبيقات والخدمات على بلوكشين ADAMANT باستخدام واجهة برمجة تطبيقات JavaScript v1.0.0"
slug: "develop-apps-and-services-upon-messenger-s-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
description: "ADAMANT هي بلوكشين عامة مصممة للرسائل المجهولة. ما يميزها ليس البلوكشين نفسه، بل الخدمات المبنية فوقها. يمكن لأي مطور كتابة برامج تستفيد من ميزاتها."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/develop-apps-and-services-upon-messengers-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
publishedAt: "2021-05-28T20:22:13.112Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f00922f5b00d/001-0-fghvl6xn-ahzkh9m.webp"
cardSpan: "full"
originalId: "medium:f00922f5b00d"
locale: "ar"
placeholder: false
---

ADAMANT هي بلوكشين عامة مصممة للرسائل المجهولة. ما يميزها ليس البلوكشين نفسه، بل الخدمات المبنية فوقها. يمكن لأي مطور كتابة برامج تستفيد من إمكانياتها، بما في ذلك نقل الرسائل والإشارات المجهولة، والتخزين المشفر الدائم، والوصول إلى البيانات عبر الأجهزة، والحسابات المؤقتة السريعة، ودرجة عالية من الموثوقية.

تعمل بالفعل عدة تطبيقات على بلوكشين ADAMANT. وتشمل هذه تطبيق مراسلة ومحفظة تشفير، وروبوت لتبادل العملات المشفرة، وخدمة مصادقة ثنائية تعتمد على البلوكشين، وروبوت المكافآت.

![تطوير التطبيقات والخدمات على بلوكشين المراسلة — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/002-0-dtmatfmf-pnkc0hj.webp)

![تطوير التطبيقات والخدمات على بلوكشين المراسلة — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/003-0-45fiuq9gnu-tgiot.webp)

![تطوير التطبيقات والخدمات على بلوكشين المراسلة — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/004-0-oyzmxof2phgcsl2c.webp)

### ADAMANT JavaScript API v1.0.0

تم تحديث واجهة برمجة تطبيقات ADAMANT JavaScript إلى [v1.0.0](https://www.npmjs.com/package/adamant-api). مقارنة بالإصدار السابق، أصبحت المكتبة أكثر موثوقية في إجراء طلبات البلوكشين، وأسهل في الاستخدام. وتجسد اللامركزية في الممارسة: إذا تعذر على عقدة شبكة واحدة تنفيذ الطلب، تقوم المكتبة تلقائيًا بإعادة التوجيه إلى عقدة أخرى، مع إعادة المحاولة عدة مرات حتى يتم إرجاع النتيجة. ولا يحتاج المطور إلى التعامل يدويًا مع فشل العقد.

مثال بسيط لاستعلام البلوكشين:

```javascript
api.get('blocks').then(response => {
  console.log(response.data)
})
```

تمت إعادة هيكلة المكتبة بالكامل مع تحديث وحذف التبعيات، وإعادة كتابة الدوال الداخلية. لا يتوافق الإصدار 1.0.0 مع الإصدار السابق v0.5.3، لكن عملية الترحيل بسيطة. تتوفر الوثائق الكاملة في [ويكي adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient/wiki).

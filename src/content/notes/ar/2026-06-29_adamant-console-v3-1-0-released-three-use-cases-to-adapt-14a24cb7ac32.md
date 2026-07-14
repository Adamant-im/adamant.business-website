---
title: "ADAMANT Console v3.1.0: حالات استخدام CLI و JSON-RPC"
slug: "adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
description: "يتوفر ADAMANT Console v3.1.0 الآن على GitHub وnpm، مع دعم محسن لواجهة JSON-RPC وتحسينات في تجربة المطورين."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
publishedAt: "2026-06-29T08:58:40.394Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/14a24cb7ac32/001-0-1kktbaowg0a7u8mr.webp"
cardSpan: "full"
originalId: "medium:14a24cb7ac32"
locale: "ar"
placeholder: false
---

يتوفر الآن ADAMANT Console v3.1.0 على GitHub وnpm. يُنسق هذا الإصدار بين Console وADAMANT Node v0.10.0، ويعيد تجديد تجربة المطورين المتعلقة باستخدام واجهة سطر الأوامر (CLI)، والدمج مع JSON-RPC، والملفات المغلقة (wrappers) المحلية بـ JavaScript. يستهدف هذا الإصدار جميع من يستخدمون ADAMANT في النصوص البرمجية، أو الروبوتات، أو بنية تبادل العملات، أو الأدوات الداخلية، أو لوحات المراقبة، أو أتمتة المدفوعات.

### ما هو ADAMANT Console؟

ADAMANT Console هو أداة لواجهة سطر الأوامر (CLI) وJSON-RPC تُستخدم للتفاعل مع سلسلة كتلة ADAMANT. يمكنه فحص الحسابات، والكتل، والمعاملات، والدردشات، والمفوضين، وحالة العقدة؛ وإرسال تحويلات ADM والرسائل المشفرة؛ والعمل كجسر JSON-RPC محلي للخدمات المكتوبة بأي لغة؛ وتوقيع المعاملات محليًا بحيث لا تُرسل عبارات المرور أبدًا إلى عقد ADAMANT. هذه النقطة مهمة: تم تصميم Console حول التوقيع المحلي. التطبيق الخاص بك يُعد الإجراء محليًا، ثم يوقع عليه Console محليًا، ويُرسل فقط المعاملة الموقعة إلى الشبكة.

### ما الجديد في v3.1.0

الهدف الرئيسي من هذا الإصدار هو التوافق مع ADAMANT Node v0.10.0. وتشمل التغييرات البارزة دعم سلوك الاستجابة والاستعلام المُحدّث للعقدة، وترقية إلى `adamant-api` v3، ودعم جديد لـ `node status`، وتوسيع أدوات الدردشة والمعاملات، ودعم `returnUnconfirmed` في بحوث المعاملات، والبحث عن المفوضين باستخدام اسم المستخدم أو المفتاح العام أو عنوان ADAMANT، ومرشحات التحويل المباشر المُحدّثة مع `includeDirectTransfers`، وأمثلة مساعدة CLI المحسّنة، وتوسيع تغطية طرق JSON-RPC، ومرجع واجهة برمجة تطبيقات تم إنشاؤه تلقائيًا مع موقع وثائق Console الجديد، وحزمة npm منشورة مع مصدرية موثوقة عبر Trusted Publishing. أصبح الإصدار المدعوم من بيئة التشغيل الآن هو Node.js 22.13.0 أو أحدث.

تثبيت أو تحديث:

```bash
npm install -g adamant-console
```

ثم تحقق من إعدادك المحلي:

```bash
adm client version
adm node status
```

### حالة استخدام: روبوت عمليات العملات المشفرة لسير عمل الفرق

يمكن للفريق الذي يدير خدمات تعتمد على مدفوعات ADM أو توفر العقدة استخدام ADAMANT Console كجسر صغير محلي خلف روبوت. يمكن لروبوت Telegram أو Discord أو Slack استدعاء أوامر Console أو طرق JSON-RPC للإجابة عن أسئلة تتعلق بصحة العقدة، وحالة المعاملة، وأرصدة المحفظة، والدفع الوارد غير المؤكد.

أمثلة على فحوصات CLI:

```bash
adm node status
adm get address U123456789
adm get transaction 123456789 returnUnconfirmed=1
adm get transactions recipientId=U123456789,limit=10
```

هذا مفيد لأقسام الدعم، وقنوات المراقبة، وعمليات الخزينة، والاستجابة الداخلية للحوادث. لا يحتاج الروبوت إلى معرفة بروتوكول ADAMANT بالتفصيل؛ بل يستدعي Console، ويحلل JSON، ويعرض رسائل حالة واضحة للبشر.

### حالة استخدام: ترخيص التطبيقات أو التحكم في الوصول باستخدام ADM

حالة استخدام عملية أخرى هي الترخيص الخفيف. يمكن لتطبيق مستضاف ذاتيًا، أو أداة تداول، أو لوحة تحليلات، أو خدمة أتمتة أن تُفعّل الوصول المميز عندما يرسل المستخدم ADM إلى عنوان دفع. يقوم الخادم الخلفي بتعيين عنوان إيداع للمستخدم، ويراقب المعاملات الواردة، ويؤكد مبلغ الدفع وحالة المعاملة، ويُفعّل الوصول تلقائيًا، ويُرسل اختياريًا رسالة ADAMANT مشفرة كإيصال.

يمكن للخدمة استعلام المعاملات بهذا الشكل:

```bash
adm get transactions recipientId=U123456789,limit=20,returnUnconfirmed=1
```

أو إرسال رسالة تأكيد:

```bash
adm send message U123456789 "Your subscription is active"
```

بالنسبة للتطبيقات الأكبر، يمكن تشغيل نفس التدفق عبر JSON-RPC، بحيث يمكن كتابة الخادم الخلفي الرئيسي بلغات مثل PHP أو Python أو Go أو Ruby أو Java أو أي لغة أخرى قادرة على إرسال طلبات HTTP. يصبح Console الجسر المحلي لـ ADAMANT.

### حالة استخدام: إيداع وسحب سريع لـ ADM عبر JSON-RPC للتبادلات

غالبًا ما تحتاج التبادلات والخدمات المُدارة إلى واجهة بسيطة وقابلة للتنبؤ بالإيداعات والسحوبات. يمكن لـ ADAMANT Console أن يعمل كخادم JSON-RPC محلي:

```bash
adm rpc server
```

بشكل افتراضي، يستمع على منفذ RPC المُكوّن، وغالبًا ما يكون `5080`. يجب تشغيل خادم JSON-RPC فقط على بنية تحتية موثوقة، وراء جدار ناري أو شبكة خاصة. إذا كان الخادم لديه وصول إلى عبارات المرور، فاعتبره بنية توقيع.

تحقق من حالة العقدة:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"nodeStatus","params":[],"id":1}'
```

أنشئ حساب إيداع:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"accountNew","params":[],"id":2}'
```

احفظ بيانات الاعتماد المُنشأة بشكل آمن. لا تسجل عبارات المرور أو المفاتيح الخاصة.

راقب الإيداعات:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactionsReceivedByAddress","params":["U123456789"],"id":3}'
```

لمسح المعاملات بشكل أكثر مرونة:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactions","params":["recipientId=U123456789","limit=20","returnUnconfirmed=1"],"id":4}'
```

يمكن لخلفية التبادل أن تُوازن الإيداعات حسب العنوان، ورقم المعاملة، والمبلغ، والطابع الزمني، وسياسة التأكيد.

عالج السحوبات:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"sendTokens","params":{"address":"U987654321","amount":"10ADM","passphrase":"your local passphrase"},"id":5}'
```

بالنسبة للأنظمة الإنتاجية، يجب أن تأتي عبارات المرور من تخزين سري محلي آمن، وليس من السجلات، أو لقطات الشاشة، أو مخرجات CI، أو سجل shell المشترك.

### لماذا يُعد هذا الإصدار مهمًا

تم تصميم ADAMANT Console ليكون خفيف الوزن بشكل متعمد. ولا يحاول استبدال حزمة تطوير كاملة (SDK) أو خلفية مخصصة. بل يمنح المطورين والمشغلين أداة عملية للنصوص البرمجية السريعة، والتوقيع المحلي، ودمج الروبوتات، وأتمتة التبادل، وفحص المدفوعات، والمراقبة التشغيلية، والوصول إلى JSON-RPC من مكدسات غير JavaScript. مع v3.1.0، أصبحت هذه الأداة الآن متوافقة مع ADAMANT Node v0.10.0 وحزمة واجهة برمجة تطبيقات JavaScript الحالية لـ ADAMANT.

---
title: "ADAMANT Tradebot 8.0: أساس أقوى للتداول الآلي المستضاف ذاتيًا"
slug: "adamant-market-making-software-8-0-a-stronger-foundation-for-your-token-s-market-presence-c8032a1a7d38"
description: "الإصدار 8.0 هو الأكبر في تاريخ ADAMANT Tradebot مفتوح المصدر منذ سنوات. بالنسبة لمصدري الرموز، الفجوة بين الإدراج والسوق الحقيقية حقيقية."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-software-8-0-a-stronger-foundation-for-your-tokens-market-presence-c8032a1a7d38"
publishedAt: "2026-06-26T15:58:19.696Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/c8032a1a7d38/001-0-qywflgfw1krzccj5-png.webp"
cardSpan: "full"
originalId: "medium:c8032a1a7d38"
locale: "ar"
placeholder: false
---

الإصدار 8.0 هو التحديث الأكبر لبرنامج ADAMANT Tradebot مفتوح المصدر منذ سنوات. بالنسبة لمصدري الرموز، الفجوة بين وجود إدراج وبين امتلاك سوق حقيقية أمر حقيقي: فالكتاب الطلبي الضيق يرعب المتداولين، والفارق الواسع يجعل كل مقايضة مكلفة، والفجوات في الكتاب تبدو كإهمال. ويُغلق البوت هذه الفجوة من خلال الحفاظ على سياسات الفارق والسيولة والحجم في البورصات التي يتم فيها إدراج رمزك فعليًا.

الاقتراح الأساسي لم يتغير. أنت تستضيف البوت على خادم VPS الخاص بك، وتربطه بصرافك عبر مفاتيح API التي لا تغادر بنيتك التحتية أبدًا، وتتحكم في من يمكنه إرسال الأوامر. الإصدار 8.0 يجعل البوت أكثر موثوقية، وأكثر أمانًا، وأسهل في التشغيل على المدى الطويل — ليتحول من شيء يعمل فقط إذا كنت تراقبه باستمرار إلى بنية تحتية مصممة للعمل دون تدخل.

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/002-1-swca0-a2gacbe1zvi17jjq-png.webp)

### الأمان التشغيلي

يُجدد الإصدار 8.0 التبعيات مع مراجعة نظيفة من حيث الثغرات الحرجة/العالية، ويُحكم أنماط الوصول للواجهات الإدارية الاختيارية، ويوائم قاعدة الكود مع نفس المعيار الهندسي المستخدم في خط المنتجات التجارية — دون استيراد ميزات حصرية مدفوعة. مفاتيح API الخاصة بصرافك لا تذهب أبدًا إلى ADAMANT أو أي لوحة تحكم SaaS.

### واجهات الإدارة

يمكن التحكم في البوت عبر ADAMANT Messenger (القناة المشفرة اللامركزية الأصلية)، أو تيليجرام (متوفرة في البوت المميز)، أو واجهة ويب حاليًا قيد التطوير. داخليًا، يضيف الإصدار 8.0 واجهة ويب خاصة حديثة مبنية على Fastify مع مصادقة JWT، ومخططات طلب مُحققة، وتحديثات فورية عبر WebSocket. بالنسبة لمعظم المشغلين، يبقى هذا المكوّن غير مرئي — فقط تحصل على تجربة إدارة أسرع وأكثر موثوقية عند تفعيل واجهة الويب.

يوميًا، ما زلت تقوم بما اعتدت فعله: التحقق من الأرصدة، ضبط الفارق، تفعيل سياسات الحجم، تحديد نطاقات الأسعار، وإيقاف الوحدات المؤقت عند تقلب السوق. الفرق هو أن البوت الآن يعالج هذه الأوامر بشكل أكثر انتظامًا وقابلية للتنبؤ.

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/003-1-6ltktmqgyhhs6pniej4dcq-png.webp)

### دعم البورصات

يدعم البوت مفتوح المصدر مجموعة مركزة من البورصات المركزية: Azbit، P2PB2B، StakeCube، Coinstore، FameEX (عبر FameEXnet — موصل محدّث في v8.0)، و NonKYC. يجب على مستخدمي FameEX ملاحظة أن البوت الآن يتواصل مع FameEXnet، لذا فإن التحديث يتطلب تبديل موصل مخطط له بدلًا من أمر `git pull` بسيط. يبقى البوت المجاني مركّزًا عمدًا على أسواق السبوت بنهج يعتمد أولًا على REST، دون تعقيدات العقود الآجلة. أما التغطية الأوسع للبورصات ووحدات الاستراتيجيات المتقدمة فهي جزء من خط منتجات Premium.

### داخليًا

تم تقسيم معالج الأوامر القديم الأحادي إلى وحدات متخصصة. أُعيد بناء استقبال المعاملات في ADAMANT على `adamant-api` 3.x. الآن عند التشغيل، ينتظر البوت قاعدة البيانات، ويُشغل عمليات الهجرة التلقائية لضمان ترقية بيانات الطلبات القديمة بأمان، ويحمّل بيانات الصراف، ثم يبدأ حلقات التداول فقط بعد ذلك.

يستهدف بيئة التشغيل Node.js 22.2+ مع MongoDB driver 7.x وطبقة HTTP محدثة. تستخدم الطبقة الخاصة بواجهة الويب الخاصة JWT، والتحقق من المخططات، وقوائم السماح بالعناوين IP، وافتراضات تفضّل localhost أولًا، بحيث لا تصبح راحة الإدارة سطح هجوم. تغطي مجموعات الاختبار الآلية الجديدة واجهة برمجة تطبيقات واجهة الويب والمساعدات الأساسية، ما يجعل عمليات الترقية أقل اعتمادًا على القفزات العمياء للفِرق التقنية.

### الترقية

يمكن للمشاريع الجديدة البدء باستخدام:

```bash
git clone https://github.com/Adamant-im/adamant-tradebot
cd adamant-tradebot
npm i
cp config.default.jsonc config.jsonc
# edit config.jsonc - pair, API keys, spread/volume settings
npm start
```

يجب على التثبيتات الحالية من v7.x إيقاف البوت، واسترجاع التحديثات، وإعادة التثبيت، ودمج أي حقول جديدة من `config.default.jsonc` إلى `config.jsonc`، ثم إعادة التشغيل:

```bash
pm2 stop tradebot
git pull
npm i
# merge new config.default.jsonc fields into your config.jsonc
pm2 restart tradebot
```

يتم تتبع الإصدار في [GitHub PR #110](https://github.com/Adamant-im/adamant-tradebot/pull/110) ويُغلق المشكلة الشاملة [#109](https://github.com/Adamant-im/adamant-tradebot/issues/109). تتوفر مراجع التثبيت والأوامر الكاملة على [marketmaking.app](https://marketmaking.app/cex-mm/installation/).

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/004-0-fcjgeqhiqq-h0grv-png.webp)

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/005-0-8ihrvb-is-qsshbb-png.webp)

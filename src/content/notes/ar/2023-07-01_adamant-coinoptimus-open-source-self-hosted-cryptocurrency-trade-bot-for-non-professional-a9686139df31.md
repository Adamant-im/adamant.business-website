---
title: "ADAMANT CoinOptimus: بوت تداول العملات المشفرة مفتوح المصدر وقابل للإضافة الذاتية"
slug: "adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-a9686139df31"
description: "ADAMANT CoinOptimus هو بوت تداول للعملات المشفرة قابل للإضافة الذاتية مخصص للمتداولين غير المحترفين الذين يرغبون في الأتمتة دون التفريط في السيطرة على مفاتيحهم"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-traders-a9686139df31"
publishedAt: "2023-07-01T12:39:55.877Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/a9686139df31/001-0-ygfhry-dhfu9rszm.webp"
cardSpan: "full"
originalId: "medium:a9686139df31"
locale: "ar"
placeholder: false
---

ADAMANT CoinOptimus هو بوت تداول للعملات المشفرة قابل للإضافة الذاتية يستهدف المتداولين غير المحترفين الذين يرغبون في التشغيل الآلي دون التفريط في سيطرتهم على مفاتيحهم لصالح خدمات الطرف الثالث. وبما أنه يعمل على خادمك الخاص، فإن المستخدمين المهتمين بالخصوصية يحتفظون بالسيطرة الكاملة على بيانات اعتماد واجهة برمجة تطبيقات البورصة. كما يناسب البوت عشاق العملات الرقمية بشكل غير احترافي، وبفضل إستراتيجيته المتدرجة/الشبكية، يناسب كذلك مالكي المشاريع أو صانعي السوق الذين يسعون إلى ملء كتب الطلبات وتحسين السيولة.

يُبنى البوت على Node.js ويعمل باستمرار على خادم افتراضي خاص (VPS). يمكنك تهيئة بورصة الوجهة وزوج التداول في ملف `config.jsonc`، وتوفير مفاتيح واجهة برمجة تطبيقات البورصة (يفضل أن تكون لمجرد التداول فقط، دون صلاحيات السحب)، وإدارة البوت بإرسال أوامر تبدأ بشرطة مائلة عبر ADAMANT Messenger. ويمكن تسليم إشعارات التداول الفورية إلى ADAMANT Messenger وSlack وDiscord. منذ إصداره الأول، يدعم CoinOptimus منصات Binance وBitfinex وP2PB2B وAzbit وStakeCube.

### إستراتيجية السلم/الشبكة

يعتمد CoinOptimus بشكل أساسي على إستراتيجية السلم/الشبكة المثالية. يقوم البوت بوضع أوامر شراء وبيع متعددة تبدأ من الفارق السعري. وعند تنفيذ الطلب الأقرب، يضع البوت أمرًا مطابقًا على الجانب المقابل، وفقًا لمبدأ الشراء بسعر أقل مما يبيع به، والبيع بسعر أعلى مما يشتري به. تحقق هذه الطريقة أفضل أداء في الأسواق المتقلبة.

![ADAMANT CoinOptimus: بوت تداول العملات المشفرة مفتوح المصدر وقابل للإضافة الذاتية للمتداولين غير المحترفين](/images/engineering-notes/medium/a9686139df31/002-0-tfo-ftrmwbt1zl7r.webp)

![ADAMANT CoinOptimus: بوت تداول العملات المشفرة مفتوح المصدر وقابل للإضافة الذاتية للمتداولين غير المحترفين](/images/engineering-notes/medium/a9686139df31/003-0-2twg79hid4ph-cia.webp)

### التثبيت والتهيئة

يستهدف CoinOptimus أنظمة Ubuntu 18–22 وCentOS 8، مع اعتماده على Node.js v16+ وMongoDB v6+. يتضمن التثبيت استنساخ [مستودع GitHub](https://github.com/Adamant-im/adamant-coinoptimus) وتشغيل `npm install`. ويتم التهيئة عبر ملف `config.jsonc`، حيث تحدد العبارة السرية لـ ADAMANT الخاصة بالبوت، وعنوان الحساب الإداري المسموح له بإصدار الأوامر، وتفاصيل البورصة، ومفاتيح واجهة برمجة التطبيقات. عند تحديث المصدر عبر git، راجع التغييرات في ملف التهيئة الافتراضي وطبّقها على ملف `config.jsonc` الخاص بك، ثم أعد تشغيل البوت.

### الاستخدام عبر ADAMANT Messenger

يستخدم البوت حسابات ADAMANT على البلوكشين التي تُعرف من خلال العناوين العامة وتحميها عبارات سرية مكوّنة من 12 كلمة. بعد التثبيت، ترسل الأوامر عبر ADAMANT Messenger. على سبيل المثال، `/buy ADM/USDT amount=200 price=0.005` يضع طلب شراء بقيمة 200 ADM بسعر 0.005 USDT. ولبدء إستراتيجية السلم مع 6 أوامر، وخطوة سعرية بنسبة 3%، وحوالي 100 USDT لكل طلب، استخدم `/start ld 100 USDT 6 3%`. يتوفر مرجع الأوامر الكامل في [مستندات CoinOptimus على ويكي](https://github.com/Adamant-im/adamant-coinoptimus/wiki).

![ADAMANT CoinOptimus: بوت تداول العملات المشفرة مفتوح المصدر وقابل للإضافة الذاتية للمتداولين غير المحترفين](/images/engineering-notes/medium/a9686139df31/004-0-jinplg771dicgjt7.webp)

### إخلاء المسؤولية

ليست أداة CoinOptimus ضمانًا للربح. يُستخدم على مسؤوليتك الخاصة.

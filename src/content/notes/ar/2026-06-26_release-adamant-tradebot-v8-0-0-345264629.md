---
title: "ADAMANT Tradebot v8.0.0"
slug: "release-adamant-tradebot-v8-0-0-345264629"
description: "ADAMANT Tradebot v8.0.0 هو إصدار رئيسي للبوت مفتوح المصدر للتداول الآلي، مع تحديثات في تدفق التشغيل، واجهة ويب اختيارية، ومتطلبات تشغيل محدثة."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v8.0.0"
publishedAt: "2026-06-26T10:47:34Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v8.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:345264629"
locale: "ar"
placeholder: false
---

ADAMANT Tradebot v8.0.0 هو إصدار رئيسي للبوت مفتوح المصدر للتداول الآلي، مع تحديث رقم إصدار الحزمة من 7.0.1 إلى 8.0.0.

تم إعادة هيكلة تدفق التشغيل الأولي (bootstrap) ليشمل عمليات ترحيل قاعدة البيانات والتحضير عند التشغيل. أصبحت معالجات أوامر ADM الآن وحدات منظمة ضمن `modules/commands/`، كما تم تقديم خط جديد لاستقبال معاملات ADM باستخدام المكونات `adamantApi` و`admTxChecker` و`admTxParser`.

تمت إضافة واجهة ويب اختيارية (WebUI API) مبنية على خادم Fastify HTTP مع مصادقة JWT، تحقق صحة باستخدام Zod، ونقل عبر Socket.IO. وتُعرض من خلالها مسارات للوصول إلى الحساب، حالة البوت، الأوامر، بيانات السوق، الرسائل، ومتغيرات التداول.

تم تحديث وصلات البورصات: تم إزالة XeggeX، وتم نقل FameEX إلى FameEXnet، كما تم تحديث Azbit وP2PB2B وNonKYC وCoinstore وStakeCube.

يتطلب بيئة التشغيل الآن Node.js v22.2+، مع الحزمة `adamant-api` 3.x و`mongodb` 7.x. تم ترقية أدوات التطوير إلى ESLint 10، وتوسيع اختبارات Jest، وتحسين تغطية JSDoc ضمن المجلد `types/`. كما تمت إضافة وثائق جديدة مثل `CONTRIBUTING.md`، مع تحديثات على `README.md` و`config.default.jsonc`.

لترقية البوت، قم بسحب أحدث الكود، وتثبيت التبعيات، واستعراض ملف `config.jsonc` الخاص بك ودمجه مع `config.default.jsonc`، ثم ابدأ تشغيل البوت.

```bash
git pull
npm i
# Review and merge config.jsonc with config.default.jsonc
npm start
```

### التغيرات المكسّرة

أصبح من الضروري الآن استخدام Node.js v22.2+، بدلاً من الإصدار v18+ السابق. تتضمن عملية ترحيل قاعدة البيانات إعادة تسمية الحقل `type` في الطلبات إلى `side`. تتطلب التغيرات في هيكلة الملف `config` استعراض `config.default.jsonc` ودمج التحديثات في الملفات الحالية. تم إزالة XeggeX، ويجب على مستخدمي FameEX التحول إلى وصلة FameEXnet. كما تم تغيير بيانات الرخصة إلى `UNLICENSED` مع تعيين `private: true`.

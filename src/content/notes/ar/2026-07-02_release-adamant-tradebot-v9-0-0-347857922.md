---
title: "ADAMANT Tradebot v9.0.0"
slug: "release-adamant-tradebot-v9-0-0-347857922"
description: "ADAMANT Tradebot v9.0.0 الإصدار الأول القابل للتوزيع من بوت صناعة السوق مفتوح المصدر. ارتفاع إصدار الحزمة من 8.0.0 إلى 9.0.0. أبرز ميزات التثبيت"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0"
publishedAt: "2026-07-02T06:12:07Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v9.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:347857922"
locale: "ar"
placeholder: false
---

# ADAMANT Tradebot v9.0.0

هذا هو الإصدار الأول القابل للتوزيع من بوت صناعة السوق مفتوح المصدر. ارتفع إصدار الحزمة من 8.0.0 إلى 9.0.0.

## التثبيت

```bash
npm install -g adamant-tradebot
mm init
```

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

## أبرز الميزات

### التوزيع

يُوزَّع البوت الآن كحزمة npm باسم `adamant-tradebot`، مع واجهة سطر أوامر (CLI) تُعرِض أوامر مثل `mm init` و`mm on` و`mm off` و`mm doctor` وغيرها. تتوفر صورة Docker على GHCR في المسار `ghcr.io/adamant-im/adamant-tradebot`، إلى جانب مجموعة `docker-compose` الخاصة بـ MongoDB والتشغيل المحلي. وتتولى سير عمل GitHub Actions النشر على كل من npm وGHCR.

### البنية (من إصدار 8 فما فوق)

يضم قاعدة الكود الآن معالجات أوامر ADM وحداتية ضمن المسار `modules/commands/`. وقد تم وضع أساس لواجهة ويب API باستخدام Fastify وJWT وZod وSocket.IO. كما تم إعادة هيكلة وحدات صناعة السوق (MM) — وهي التاجر (trader) وبناء سجل الأوامر (order book builder) ومزود السيولة (liquidity provider) وراصد الأسعار (price watcher). وتم توسيع أنواع JSDoc ضمن المجلد `types/`، إلى جانب إضافة اختبارات باستخدام Jest وتكوين مسطح لـ ESLint.

### وصلات البورصات

تشمل البورصات المدعومة الآن Azbit وCoinstore وFameEXnet وNonKYC وP2PB2B وStakeCube. وقد تم إزالة وصلات البورصات القديمة الخاصة بـ Bit-Z وCoinDeal وIDCM.

### التوثيق

تمت إعادة هيكلة ملف README لتلبية احتياجات إصداري الرموز والمستخدمين الذين يقومون بتشغيل صناعة السوق بأنفسهم. تمت إضافة ملف `CONTRIBUTING.md` وتعليمات خاصة بعامل الذكاء الاصطناعي.

### التغييرات الرئيسية

يستخدم التهيئة الآن ملف `config.default.jsonc` بالاقتران مع الأمر `mm init`، بدلًا من ملف `config.json` مُرَكَّز. يتطلب التشغيل Node.js إصدار v22.2 أو أحدث. تم إزالة وصلات البورصات القديمة، لذا يجب على المستخدمين التحول إلى البورصات المدعومة. أصبحت دورة حياة التثبيت عبر npm أو محليًا تعتمد على واجهة سطر الأوامر (CLI) من خلال الأوامر `mm on` و`mm off`.

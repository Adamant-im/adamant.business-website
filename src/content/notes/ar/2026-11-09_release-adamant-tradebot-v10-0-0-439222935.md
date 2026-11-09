---
title: "ADAMANT Tradebot v10.0.0"
slug: "release-adamant-tradebot-v10-0-0-439222935"
description: "يعد إصدار ADAMANT Tradebot v10.0.0 علامة فارقة تتضمن إعادة هيكلة معمارية، وتأمين التكرار، وإدارة سجلات المؤسسات، وواجهة برمجة تطبيقات WebUI قائمة على الأدوار."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v10.0.0"
publishedAt: "2026-11-09T14:19:19Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-tradebot"
tag: "v10.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:439222935"
locale: "ar"
placeholder: false
---

يعد إصدار ADAMANT Market-Making Software v10.0.0 علامة فارقة تتضمن إعادة هيكلة معمارية، وتأمينًا حصريًا للتكرار، وإدارة سجلات على مستوى المؤسسات، وواجهة برمجة تطبيقات WebUI قائمة على الأدوار، وإعادة كتابة لموصل Azbit، ونشرًا موثوقًا عبر npm باستخدام OIDC، وتوثيقًا مشفرًا لمصدر بناء حاويات Docker.

## التثبيت

```bash
# عبر npm
npm install -g adamant-tradebot
mm init
mm doctor
mm on

# عبر Docker / GHCR
docker pull ghcr.io/adamant-im/adamant-tradebot:10.0.0
docker run -d --name adamant-tradebot ghcr.io/adamant-im/adamant-tradebot:10.0.0
```

## أمن سلسلة التوريد والنشر الموثوق

تمت هجرة سير عمل النشر في npm إلى النشر الموثوق عبر OIDC دون الحاجة إلى أسرار مستودع دائمة (`NPM_TOKEN`)، مع تفعيل التحقق من المصدر عبر `publishConfig.provenance: true`، مما يغلق الإصدار رقم #119. تم دمج توثيق مصدر بناء GHCR باستخدام `actions/attest-build-provenance@v2` مع توقيع Sigstore لبناء حاويات قابلة للتحقق على GitHub Packages. كما تمت إضافة مشغلات تحقق يدوية لسير عمل النشر في CI/CD عبر `workflow_dispatch`.

## الهندسة المعمارية وموثوقية وقت التشغيل

أعيد تنظيم هيكل الوحدات البرمجية لضمان فصل واضح: `trade/features/` لوحدات صناعة السوق، و`trade/trader/` لموصلات المنصات، و`trade/settings/` لملفات المعلمات الديناميكية. تم تقديم قفل التكرار الحصري من خلال `helpers/moduleIteration.js` (`runExclusiveIteration`) لمنع التكرارات المتداخلة وضمان إعادة الجدولة الموثوقة من كتل `finally`.

أعيدت كتابة نظام تدوير السجلات للمؤسسات وقارئ السجلات السريع بالكامل في `helpers/logRotation.js` و`helpers/logReader.js`، مما يدعم دورات حياة النشاط والأرشفة، والقراءة العكسية المهيكلة، واسترجاع السجلات المصفحة. تمت إضافة تقييم صحة وقت التشغيل عبر `helpers/mmHealthEval.js` و`helpers/mmHealthState.js` و`helpers/mmRuntimeHealth.js` لمراقبة حالة صناعة السوق في الوقت الفعلي. يتم الآن توفير تتبع بادئ الأوامر عبر `helpers/commandInitiator.js`، مما يتيح تتبعًا سياقيًا متسقًا عبر Messenger وWebUI API وCLI.

## موصلات المنصات

خضع موصل Azbit لإعادة كتابة كاملة لملفي `trade/trader/trader_azbit.js` و`trade/api/azbit_api.js`، مع دعم REST API v1 وv2، ودقة صارمة للأوامر، وتحديد معدل الطلبات، و137 اختبار وحدة مع محاكاة شاملة لواجهة برمجة التطبيقات. تم توحيد دقة الموصلات ومعايير الأمان عبر Coinstore وFameEXnet وNonKYC وP2PB2B وStakeCube، بما في ذلك معالجة الأخطاء الموحدة، واقتطاع الدقة، والتحقق المسبق من الرصيد.

## واجهة برمجة تطبيقات WebUI REST وWebSocket

تم تقديم التحكم في الوصول القائم على الأدوار مع دعم أدوار `admin` و`manager` و`viewer` (للقراءة فقط)، مع ميزات التحقق الصارم من JWT، وفرض وقت انتهاء الصلاحية (TTL)، وتصفية الوصول عبر IP. تمت إضافة نقاط نهاية كاملة لإدارة البوت لضبط المعلمات الديناميكية (`PUT /api/v1/params`, `PUT /api/v1/params/strategy`)، ودورة حياة البوت، والأوامر، واستعلامات السجلات. يتيح بث WebSocket الاشتراك في الأحداث في الوقت الفعلي لحالة البوت، وسجلات التداول، وتحديثات مؤشرات السوق.

## ضمان الجودة وأدوات المطورين

تغطي الاختبارات الآن 576 اختبارًا آليًا عبر 33 مجموعة اختبار تشمل الوحدات العامة، وAPI WebUI، والميزات، والموصلات، والمساعدات، ووحدات صناعة السوق. تمت إضافة إرشادات وكلاء الذكاء الاصطناعي في `AGENTS.md` للتطوير بمساعدة الذكاء الاصطناعي مع الالتزام بثوابت الأمان، وتخطيط الدليل، وبروتوكولات الاختبار. تم تحسين سلامة الأنواع باستخدام تعريفات JSDoc `@typedef` والتحقق من TypeScript عبر `npm run typecheck:webui-api`.

### تغييرات جذرية

يتطلب هذا الإصدار Node.js إصدار 22.12.0 أو أحدث. تغير تخطيط الدليل الداخلي، حيث تم نقل وحدات الميزات والموصلات إلى `trade/features/` و`trade/trader/`؛ يجب على الامتدادات المخصصة التي تستورد مسارات داخلية التحديث وفقًا لذلك. تفرض واجهة برمجة تطبيقات WebUI الآن انتهاء صلاحية JWT الصارم وتفويض الأدوار عبر جميع نقاط النهاية الخاصة.

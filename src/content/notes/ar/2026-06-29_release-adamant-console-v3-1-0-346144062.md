---
title: "ADAMANT Console v3.1.0"
slug: "release-adamant-console-v3-1-0-346144062"
description: "تحديثات ADAMANT Console v3.1.0 تشمل دعم ADAMANT Node v0.10.0 وتحسينات في CLI، JSON-RPC، الوثائق، وأدوات التحقق"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v3.1.0"
publishedAt: "2026-06-29T08:31:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:346144062"
locale: "ar"
placeholder: false
---

يُحدّث ADAMANT Console v3.1.0 واجهة السطر الأوامر لـ ADAMANT Node v0.10.0، ويُحدّث أيضًا واجهة سطر الأوامر (CLI)، وواجهة JSON-RPC، والغلاف JavaScript، والوثائق، وسلسلة أدوات التحقق. يضيف هذا الإصدار دعم الاستجابات والاستعلامات الخاصة بـ ADAMANT Node v0.10.0 من خلال `adamant-api` v3. كما يُقدّم تحديثات في معالجة حالة العقدة، وغرف الدردشة/الرسائل، ورسائل الدردشة، والاستعلامات الخاصة بالتحويلات المباشرة، وخاصية `returnUnconfirmed` في المعاملات، وبحث المندوبين. تم تحديث بيانات الحزمة والاعتماديات، إلى جانب إطلاق موقع وثائق جديد باستخدام VitePress، ومرجع واجهة برمجة التطبيقات (API) المُولَّد باستخدام TypeDoc، ونشر على GitHub Pages عند كل إصدار. تشمل التحسينات الإضافية أمثلة مساعدة في واجهة سطر الأوامر، وتوسيع تغطية JSON-RPC، وتوثيق واجهة API العامة باستخدام JSDoc، وتمييز الصيغة للإخراج JSON عند عرضه بشكل منسق، وزيادة تغطية الاختبارات للغلاف API، وسلوك المساعدة في CLI، وبيانات التكوين/العميل، وسجل الأوامر السابقة، والتسجيل (logging).

يمكن إجراء التحقق باستخدام الأوامر التالية:
@@CODEBLOCK1@@
### التغييرات غير المتوافقة
يُطلب الآن استخدام Node.js 22.13.0 أو أحدث لتشغيل ADAMANT Console.

---
title: "تحديث بنية شبكة الاختبار لـ ADAMANT"
slug: "discussion-34-updating-the-testnet-infrastructure-for-adamant-9063403"
description: "تحديث بنية شبكة الاختبار لـ ADAMANT لتحسين الاستقرار والتطوير الموثوق"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/34"
publishedAt: "2025-10-23T15:40:31Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9063403"
locale: "ar"
placeholder: false
---

حدد مشروع ADAMANT مهمة لتحسين البنية التحتية (المسألة #148) لتحديث وتثبيت بيئة شبكة الاختبار الخاصة به. تعد شبكة اختبار سليمة أمرًا ضروريًا للتطوير الموثوق للبلوك تشين، حيث تتيح إجراء اختبارات واقعية وتسهيل انضمام المساهمين.

## ما هو متوفر

تتوفر الآن **لقطة اقلاع (bootstrap snapshot)** لقاعدة بيانات شبكة الاختبار للتنزيل من `https://testnet.adamant.im/db_test_backup.sql.gz`. ويتيح ذلك للمطورين تشغيل عقدة اختبار بسرعة دون الحاجة إلى المزامنة من الصفر.

يمكن طلب عملات ADM الخاصة بشبكة الاختبار (3500 ADM) عبر الصنبور نفسه المستخدم للشبكة الرئيسية من `https://adamant.im/free-adm-tokens/`. ويمكن الوصول إلى تطبيق مراسلة شبكة الاختبار الذي يعمل بالفرع التنموي (dev branch) عبر الرابط `https://dev-adamant-testnet.surge.sh/`، كما يتوفر مستعرض كتل شبكة الاختبار على `https://testnet.adamant.im/`.

يتم الحفاظ على قائمة بالعقد العامة لشبكة الاختبار في ملف التكوين الافتراضي على GitHub: `https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json`.

للاطلاع على التفاصيل الكاملة للتنفيذ، راجع المقالة الأصلية على `https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56`.

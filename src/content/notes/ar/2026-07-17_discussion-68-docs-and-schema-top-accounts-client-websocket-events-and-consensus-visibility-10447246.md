---
title: "وثائق ADAMANT والمخطط: أفضل الحسابات وأحداث WebSocket للعميل ورؤية الإجماع"
slug: "discussion-68-docs-and-schema-top-accounts-client-websocket-events-and-consensus-visibility-10447246"
description: "تمت مواءمة مستودعات وثائق ADAMANT والمخطط مع واجهة API الحالية للعقدة. جميع التغييرات إضافية ومتوافقة مع الإصدارات السابقة — لا يوجد تفرع إجماع أو كسر لتنسيق الاتصال."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/68"
publishedAt: "2026-07-17T12:40:07Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10447246"
locale: "ar"
placeholder: false
---

تمت مواءمة مستودعات وثائق ADAMANT والمخطط مع واجهة API الحالية للعقدة. جميع التغييرات إضافية ومتوافقة مع الإصدارات السابقة — لا يوجد تفرع إجماع أو كسر لتنسيق الاتصال. الوثائق المباشرة متاحة على `https://docs.adamant.im`، مع حزمة OpenAPI على `https://schema.adamant.im`.

## واجهة أفضل الحسابات

`GET /api/accounts/top` أصبح الآن جزءًا من العقد العام. الترتيب حتمي: `balance DESC` ثم `address ASC`. تدعم نقطة النهاية ترقيم الصفحات عبر `limit` و`offset`، ومرشح `isDelegate` اختياري، وبيانات وصفية للاستجابة (`count`)، و`limit=0` لطلبات العد فقط. تمت إزالة مفتاح التكوين القديم `topAccounts` — نقطة النهاية مسجلة على كل عقدة.

## WebSocket للعميل: `newBlock` و`balances/change`

حصلت واجهة Socket.IO للعميل على أحداث `newBlock` مدمجة اختيارية وحمولات `balances/change` على مستوى الحقل، والتي يمكن أن تتضمن `balance` أو `unconfirmedBalance` أو كليهما. يتم فهرسة الاشتراكات بواسطة `address` و`types` و`assetChatTypes` و`balances` و`blocks`. يظل التسليم بأفضل جهد وبدون متانة: يجب على المستهلكين إعادة الاتصال وإعادة الاشتراك ومواءمة الحالة الحرجة عبر REST. توثق حزمة OpenAPI هذا تحت `x-client-websocket` مع مخططات مخصصة في `specification/websocket/`.

## جداول الحالة و`forged` للمندوبين

تعرض واجهات API العامة الآن جدول تفعيل الإجماع الفعلي وجدول مراحل مكافأة الكتل الكامل، بما في ذلك `consensusCodeName` و`consensusSchedule.activationHeights` و`milestoneSchedule` (الذي يتكون من `offset` و`distance` و`milestones`). تستجيب قوائم المندوبين والاستعلام الآن بـ`forged` مدى الحياة كسلسلة أعداد صحيحة بالنظام العشري بالوحدات الأساسية. يستخدم إسقاط المزور التالي ارتفاع الكتلة التالي عند حدود الجولات. صحح المخطط أيضًا `producedlocks` إلى `producedblocks` وأكمل تغطية معاملات الاستعلام للأقران والمعاملات المدرجة في قائمة الانتظار وغير المؤكدة وبحث المندوبين و`orderBy`.

## مواءمة واجهة الكتل

تمت مواءمة دلالات الاستعلام في `GET /api/blocks` مع سلوك العقدة الفعلي. يعمل `numberOfTransactions=0` بشكل صحيح، وتمت توثيق `orderBy` ومرشحات الكمية و`offset` بعد الترتيب بدقة. يضيف المخطط تغطية كاملة للمعاملات و`generatorPublicKey` على `BlockInfoDto`. تمت إزالة أمثلة `timestampMs` غير الصحيحة من الوثائق.

## استرداد المشغل: نقاط تفتيش جدول الذاكرة

تمت توثيق نقاط التفتيش الدوارة `mem_*` المحفوظة لاسترداد الأعطال. يتم التحكم في الميزة بواسطة `loading.memCheckpoints.enabled` وهي مفعلة افتراضيًا. تغطي الوثائق التحقق عبر SHA-256، والاسترداد الآمن عند الفشل، والرجوع إلى إعادة البناء الحتمي الكامل، وتأثير التخزين، وسلوك الإغلاق السلس (`SIGINT`/`SIGTERM` → انتظار `Cleaned up successfully`). تعمل نقاط التفتيش كذاكرة تخزين مؤقت محلية للاسترداد؛ تظل الكتل القانونية هي مصدر الحقيقة.

## سياق الإصدار

تستهدف هذه التحديثات عقدة ADAMANT `v0.10.2`. يجب على المستهلكين اللاحقين — خاصة `adamant-api-jsclient` — إعادة توليد الأنواع من حزمة OpenAPI المحدثة. تشمل طلبات السحب ذات الصلة مستودعات [docs](https://github.com/Adamant-im/docs/pull/39) و[schema](https://github.com/Adamant-im/adamant-schema/pull/53) و[node](https://github.com/Adamant-im/adamant).

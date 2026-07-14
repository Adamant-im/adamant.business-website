---
title: "قوالب موحدة للمنظمة للقضايا وطلبات السحب في ADAMANT"
slug: "discussion-4-let-s-add-organization-wide-issue-and-pr-templates-for-adamant-8890522"
description: "لتحسين الاتساق عبر مستودعات ADAMANT، يمكن استخدام ميزة القوالب الموحدة عبر المنظمة في GitHub."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/4"
publishedAt: "2025-09-13T14:38:21Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Proposals & Ideas"
cardSpan: "half"
originalId: "github-discussion:8890522"
locale: "ar"
placeholder: false
---

لتحسين الاتساق عبر جميع مستودعات ADAMANT، يمكننا الاستفادة من ميزة القوالب الموحدة في GitHub. من خلال إنشاء مستودع خاص `.github` في الجذر الخاص بالمنظمة، يمكننا توفير قوالب افتراضية تتلقاها المستودعات التي لا تمتلك قوالب مخصصة تلقائيًا.

سيحتوي هذا المستودع على عدة ملفات قوالب. بالنسبة لتقارير الأخطاء، سيُستخدم ملف `bug_report.yml` لتنظيم عملية الإبلاغ. أما طلبات الميزات، فسيُوجَّه المساهمون عبر ملف `feature_request.yml`. ويمكن لملف `config.yml` التحكم في ظهور القوالب وإضافة روابط الاتصال، في حين سيوحّد ملف `PULL_REQUEST_TEMPLATE.md` أوصاف طلبات السحب.

يوفّر تنفيذ هذه القوالب هيكلًا واضحًا للمساهمين، ويضمن ألا تُفوت تفاصيل حيوية مثل خطوات إعادة الإنتاج، والدوافع، والبدائل. وهذا يوفّر الوقت على المديرين من خلال تقليل القضايا الناقصة، ويحسّن تجربة المطور بشكل عام عبر جميع مشاريع ADAMANT.

الخطوة التالية هي تحديد الصياغة النهائية والحقول الخاصة بهذه القوالب. وبعد التوافق عليها، يمكننا إعداد طلب سحب يحتوي الملفات الجاهزة للاستخدام.

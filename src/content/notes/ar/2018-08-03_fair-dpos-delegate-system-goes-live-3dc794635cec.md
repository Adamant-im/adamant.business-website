---
title: "نظام المندوب العادل لـ dPoS دخل حيز التنفيذ"
slug: "fair-dpos-delegate-system-goes-live-3dc794635cec"
description: "دخل نظام المندوب العادل لـ dPoS حيز التنفيذ على شبكة ADAMANT، وأُعيد ترتيب قائمة المندوبين وفقًا لذلك. يعتمد النظام الجديد على عاملين: إنتاجية العقدة وعدد الأصوات."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/fair-dpos-delegate-system-goes-live-join-channel-for-delegates-to-discuss-adamant-plans-3dc794635cec"
publishedAt: "2018-08-03T14:49:40.529Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3dc794635cec/001-0-lzmtq2zdlgz-z1tc.webp"
cardSpan: "full"
originalId: "medium:3dc794635cec"
locale: "ar"
placeholder: false
---

دخل نظام المندوب العادل لـ dPoS حيز التنفيذ على شبكة ADAMANT، وأُعيد ترتيب قائمة المندوبين وفقًا لذلك.

يأخذ النظام الجديد في الاعتبار عاملين: **إنتاجية العقدة** و**عدد أصوات المستخدمين**. والصيغة النهائية لوزن الصوت هي:

> **وزن الصوت = ADM / الأصوات × الإنتاجية**

هذا يعني أن الوزن الفعّال للصوت الممنوح للمندوب يُحسب من خلال كمية ADM التي يمتلكها الداعمون مقسومة على عدد الأصوات المستلمة، مضروبة في إنتاجية العقدة. وتُكافئ هذه الصيغة المندوبين الذين يحافظون على عقد موثوقة، وتعاقب تركيز الأصوات من خلال تقليل وزن المندوبين الذين يتلقون عددًا كبيرًا من الأصوات ذات الحصة الصغيرة.

**مهم:** تم رفض جميع العقد التي تعمل بإصدار أقدم من 0.4.0 من قِبل الشبكة. ويجب على مشغلي العقد التحديث إلى الإصدار الحالي لمواصلة المشاركة في الإجماع.

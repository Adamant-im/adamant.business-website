---
title: "التحقق من الحالة: مؤشر التحديث العام"
slug: "discussion-20-health-check-general-updating-spinner-8923249"
description: "غياب مؤشر التحميل في رأس ADAMANT يضمن أن المستخدم يرى أحدث قائمة من الدردشات والرسائل."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/20"
publishedAt: "2025-09-20T16:33:48Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923249"
locale: "ar"
placeholder: false
---

![لقطة شاشة المناقشة 1](/images/engineering-notes/github/discussions/8923249/001-fda0855b.webp)

غياب مؤشر التحميل في رأس ADAMANT يضمن أن المستخدم يرى أحدث قائمة من الدردشات والرسائل. يجب عرض المؤشر إذا لم تكن هناك اتصال بالإنترنت، أو لم تكن هناك عقد ADM نشطة، أو لم تكن هناك عقد ADM ممكّنة.

عند توفر اتصال ووجود عقد نشطة، يقوم النظام بالتحقق بشكل إضافي. عند استلام رسائل جديدة—بمعنى أنه لا توجد رسائل أحدث—يتم حفظ الطابع الزمني `chatActualUntil` في المخزن.

```javascript
const chatsActualUntil = adamant.toTimestamp(nodeTimestamp) + INTERVAL + CHAT_ACTUALITY_BUFFER_MS
```

تمثل `INTERVAL` فترة الاستطلاع للدردشات الجديدة عبر REST، وتختلف حسب توفر اتصال السوكيت.

```javascript
INTERVAL: (state, getters, rootState) => {
  return rootState.options.useSocketConnection ? SOCKET_ENABLED_TIMEOUT : SOCKET_DISABLED_TIMEOUT
},
```

تقوم شاشات الدردشة وقائمة الدردشات بمراقبة `chatActualUntil` والاشتراك في الـ hook التالي: `chatActual = chatActualUntil > currentTime`. يتم تشغيل هذا الـ hook كل 500 مللي ثانية لتفعيل عرض مؤشر التحميل حتى لو لم يتغير `chatActualUntil` بسبب عدم وجود رسائل جديدة. في النهاية، يتم عرض المؤشر إذا لم يكن هناك اتصال بالإنترنت، أو لم تكن هناك عقد متصلة، أو إذا كانت قيمة `!chatActual` تساوي true.

عند استعادة التطبيق من الخلفية، لا توجد حاجة لأي تعديلات لأنه ما زال يعتمد على `chatActualUntil`. إذا تجاوز وقت الجهاز الطابع الزمني لصلاحية الدردشة، فسوف يرى المستخدم مؤشر التحميل. في أسوأ الأحوال، إذا انقطع الاتصال، قد لا يرى المستخدم المؤشر وقد يظن خطأً أن كل شيء محدّث لمدة تصل إلى `INTERVAL + CHAT_ACTUALITY_BUFFER_MS` ثانية.

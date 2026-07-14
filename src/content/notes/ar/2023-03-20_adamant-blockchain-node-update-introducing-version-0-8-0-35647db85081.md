---
title: "تحديث عقدة ADAMANT Blockchain: الإصدار 0.8.0"
slug: "adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
description: "أصدرت ADAMANT، المنصة المفتوحة المصدر للمراسلة اللامركزية المبنية على تقنية البلوكشين، عقدة الإصدار 0.8.0. يركز هذا التحديث على تحسينات وتحسينات واجهة برمجة التطبيقات."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
publishedAt: "2023-03-20T08:43:48.499Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:35647db85081"
locale: "ar"
placeholder: false
---

أصدرت ADAMANT، المنصة المفتوحة المصدر للمراسلة اللامركزية المبنية على تقنية البلوكشين، عقدة الإصدار 0.8.0. يركز هذا التحديث على تحسينات وتحسينات واجهة برمجة التطبيقات (API) بدلاً من تغييرات الإجماع، وبالتالي فإن تحديث العقدة أمر اختياري.

## تحسينات واجهة برمجة التطبيقات (API)

أصبح بإمكان طرفي `/api/transactions` و`/api/chats/get` الآن قبول `inId` أو `isIn` كمعلمات استعلام مكافئة. على سبيل المثال، فإن `/api/chats/get?InId=U6386412615727665758` و`/api/chats/get?isIn=U6386412615727665758` يُنتجان نفس النتيجة. بالإضافة إلى ذلك، أصبحت معرفات المستخدمين في طرفي `/api/chats/get` و`/api/chatrooms` غير حساسة لحالة الأحرف، ما يعني أن `/api/chatrooms/U6386412615727665758` و`/api/chatrooms/u6386412615727665758` تُعامل بالطريقة نفسها.

كما أصبح بإمكان المعاملات و`POST /api/accounts/delegates` الآن قبول المعاملة إما ككائن عادي أو مضمّنة داخل خاصية `transaction`. وكلا الشكلين أدناه صالحين:

```bash
curl -X POST https://endless.adamant.im/api/transactions/process -H 'Content-Type: application/json' -d '{"type": 0, "amount": 100000000, ...}'
# or {"transaction": { "type": 0, "amount": 100000000, ... }}
```

كما يحتوي الطرف `/api/states/get` الآن على خاصية `confirmations`، وتم تحسين أداء استعلام `generatorPublicKey`. كما تمت إضافة خيار `cors` إلى `config.json` لتسهيل تهيئة التبادل بين المصادر (cross-origin).

## إصلاحات الأخطاء والتغييرات المُدخلة

يُصلح التحديث خطأ "تم رفض الإذن للنطاق العام (permission denied for schema public)" الذي أثر على بعض عمليات النشر. ومع ذلك، فإن الإصدار 0.8.0 يُدخل تغييرًا مُدخلًا: لم يعد الطرف `/api/blocks` يُرجع خاصية `count`. وستحتاج التطبيقات التي تعتمد على هذا الحقل إلى التحديث وفقًا لذلك.

وبما أن هذا الإصدار لا يُجري أي تغييرات على قواعد الإجماع، يمكن للعقد الحالية مواصلة العمل بالإصدار السابق دون مشكلات توافق.

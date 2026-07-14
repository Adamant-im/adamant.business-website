---
title: "تحديث بنية الشبكة التجريبية لـ ADAMANT"
slug: "updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
description: "لماذا تُعد الشبكة التجريبية مهمة؟ تم تحديد ضرورة تحديث واستقرار البنية التحتية للشبكة التجريبية لدعم التطوير والاختبار والمساهمات المجتمعية."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
publishedAt: "2025-10-23T15:31:46.542Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/aac36fea2a56/001-1-gpu744hucponr8ep2jojwa-png.webp"
cardSpan: "full"
originalId: "medium:aac36fea2a56"
locale: "ar"
placeholder: false
---

### لماذا تُعد الشبكة التجريبية مهمة

تم الإشارة إلى أن البنية التحتية للشبكة التجريبية لـ ADAMANT بحاجة إلى تحديثات واستقرار في [القضية رقم 148](https://github.com/Adamant-im/adamant/issues/148) لدعم التطوير والاختبار والمساهمات المجتمعية بشكل أفضل. نشأ هدفان رئيسيان من المناقشة: إمكانية الوصول، بحيث يستطيع المساهمون الجدد تشغيل عقدة دون إعداد معقد، والاستقرار، بحيث تعكس العقد التجريبية ظروف الإنتاج بشكل موثوق.

### صورة جاهزة للشبكة التجريبية لـ ADM

تتوفر نسخة محفوظة من قاعدة بيانات الشبكة التجريبية للتنزيل، مما يسمح لك بتشغيل عقدة جديدة ومزامنتها مع حالة الشبكة التجريبية الحالية، ويقلل بشكل كبير من وقت الإعداد.

بعد تثبيت عقدة الشبكة التجريبية، قم بتنزيل النسخة المحفوظة:

```bash
wget https://testnet.adamant.im/db_test_backup.sql.gz
```

فك الضغط عنها:

```bash
gunzip db_test_backup.sql.gz
```

حمّل الصورة إلى قاعدة بيانات عقدة الشبكة التجريبية:

```bash
psql adamant_test < db_test_backup.sql
```

### العقد العامة للشبكة التجريبية

توفر شبكة ADAMANT التجريبية قائمة محددة مسبقًا من العقد العامة لاكتشاف الأقران ومزامنة الشبكة والوصول إلى واجهة برمجة التطبيقات (API). المصدر المعتمد هو [ملف التهيئة الرسمي](https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json) في المستودع. عند كتابة هذه السطور، تحتوي القائمة على ثلاث عقد، جميعها على المنفذ 36667:

```json
"list": [
  {
    "ip": "162.55.32.80",
    "port": 36667
  },
  {
    "ip": "81.0.247.181",
    "port": 36667
  },
  {
    "ip": "95.217.19.144",
    "port": 36667
  }
]
```

العقدة الأولى (`testnode1.adamant.im`) تستضيف أيضًا مستعرض الشبكة التجريبية. العقدة الثانية ليس لديها نطاق وتم تعطيل واجهة برمجة التطبيقات العامة (API) فيها. العقدة الثالثة (`testnode3.adm.im`) تُظهر واجهة برمجة تطبيقات عامة؛ على سبيل المثال، الرابط `https://testnode3.adm.im/api/node/status` يُعيد حالة العقدة.

### تشغيل الاختبارات

يجب على المساهمين والمحققين تشغيل اختبارات الوحدة والاختبارات الخاصة بواجهة برمجة التطبيقات (API) على عقدتهم وفقًا لإرشادات المساهمة في المشروع: [contribution guidelines](https://github.com/Adamant-im/adamant/blob/dev/.github/CONTRIBUTING.md).

### طلب رموز ADM تجريبية والوصول إلى التطبيقات

يمكنك طلب 3500 رمز ADM تجريبي من خلال نفس الصنبور المستخدم في الشبكة الرئيسية: [https://adamant.im/free-adm-tokens](https://adamant.im/free-adm-tokens/). تطبيق المراسلة التجريبي متاح على الرابط [https://dev-adamant-testnet.surge.sh](https://dev-adamant-testnet.surge.sh)، وهو مُنشأ تلقائيًا من الفرع dev. ويمكن الوصول إلى مستعرض الشبكة التجريبية على الرابط [https://testnet.adamant.im](https://testnet.adamant.im/).

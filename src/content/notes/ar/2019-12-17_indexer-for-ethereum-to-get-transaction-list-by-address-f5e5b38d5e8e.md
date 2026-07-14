---
title: "فهرس لاستعلامات قائمة المعاملات على إيثيريوم حسب العنوان"
slug: "indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
description: "لا تدعم عقد إيثيريوم بشكل أصلي جلب قائمة معاملات عنوان معين. قام فريق ADAMANT ببناء فهرس مفتوح المصدر لحل هذه المشكلة."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
publishedAt: "2019-12-17T09:47:40.803Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f5e5b38d5e8e/001-1-joo929ftoejwheza0gd8ka-png.webp"
cardSpan: "full"
originalId: "medium:f5e5b38d5e8e"
locale: "ar"
placeholder: false
---

لا تدعم عقد إيثيريوم بشكل أصلي جلب قائمة المعاملات لعنوان معين. طُلب منذ فترة طويلة دعم الطريقة `eth_listTransactions`، لكنها غير مدرجة في خارطة طريق إيثيريوم، مما يجبر مطوري التطبيقات — مثل تطبيقات المراسلة ومستكشفات الكتل والمحافظ — على بناء طبقة فهرسة خاصة بهم.

قام فريق ADAMANT ببناء [فهرس معاملات إيثيريوم](https://github.com/Adamant-im/ETH-transactions-storage) مفتوح المصدر ومجاني لسد هذه الفجوة. مكتوب بلغة بايثون، ويعمل كخدمة في الخلفية تتصل بعقدة إيثيريوم (تم اختباره مع geth وparity)، وتجلب المعاملات عبر JSON RPC، وتخزنها — بما في ذلك معاملات العقود الذكية — في قاعدة بيانات Postgres. ثم يتم توفير طبقة واجهة برمجة تطبيقات RESTful من خلال Postgrest، مما يسمح باستعلامات حسب العنوان تشبه ما تقدمه Etherscan.

### كيف يعمل

يبدأ الفهرس بتخزين المعاملات من رقم كتلة تحدده، ثم يقوم باستطلاع الكتل الجديدة كل 20 ثانية افتراضيًا (ويمكن تهيئة هذا الفاصل الزمني). بمجرد ملء الفهرس، يمكنك استعلام المعاملات حسب العنوان من خلال Postgrest. على سبيل المثال، الطلب التالي يُرجع أحدث 25 معاملة تضم العنوان `0x6b924750e56a674a2ad01fbf09c7c9012f16f094`، مرتبة حسب الطابع الزمني:

```
curl -k -X GET "http://localhost:3000/?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25"
```

للاطلاع على مرجع واجهة برمجة التطبيقات بالكامل، راجع [وثائق Postgrest](https://postgrest.org/en/v5.2/api.html).

### الإعداد

يعمل الفهرس على نظام لينكس (تم اختباره على Ubuntu 16 و18). ستحتاج إلى عقدة geth أو parity متزامنة، بالإضافة إلى Python وPostgresql وPostgrest وnginx. يمكنك تشغيل الفهرس مباشرة أو كخدمة خلفية:

```
python3.6 you/path/to/script/ethsync.py <yourDB>
```

يستغرق الفهرسة وقتًا. للتحقق من التقدم، استعلم عن آخر كتلة مفهرسة وقارنها بأفضل كتلة في عقدتك:

```
psql -d index -c 'SELECT MAX(block) FROM ethtxs;'
```

توجد تعليمات مفصلة للتثبيت والتهيئة في [المستودع](https://github.com/Adamant-im/ETH-transactions-storage).

### واجهة برمجة التطبيقات العامة

يُصدر Postgrest واجهة برمجة التطبيقات على منفذ محلي. لجعلها متاحة للعموم، قم بتهيئة nginx لتحويل الطلبات إلى Postgrest:

```
location /ethtxs {
    proxy_pass http://127.0.0.1:3000;
}

location /aval {
    proxy_pass http://127.0.0.1:3000;
}
```

ويوفر هذا نقطتي نهاية: `/ethtxs` لجلب معاملات إيثيريوم حسب العنوان، و`/aval` لحالة الخدمة.

### مثال حي

تتوفر نسخة قيد التشغيل على عقدة ADAMANT. فتح الرابط التالي في المتصفح يُرجع أحدث المعاملات للعنوان النموذجي:

```
https://ethnode1.adamant.im/ethtxs?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25
```

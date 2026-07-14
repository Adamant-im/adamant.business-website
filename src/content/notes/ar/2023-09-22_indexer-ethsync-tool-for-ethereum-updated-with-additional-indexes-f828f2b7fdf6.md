---
title: "أداة الفهرسة (EthSync) لإثيريوم تم تحديثها بإضافة فهارس إضافية"
slug: "indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
description: "توفر عقد إثيريوم واجهات برمجة تطبيقات RPC لكنها تفتقر إلى طريقة سهلة لاسترجاع قائمة المعاملات حسب العنوان، وهي ميزة متوقعة من مستكشفات الكتل."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
publishedAt: "2023-09-22T14:36:48.398Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/f828f2b7fdf6/001-0-2atpoq1jvo6rdiry.webp"
cardSpan: "full"
originalId: "medium:f828f2b7fdf6"
locale: "ar"
placeholder: false
---

توفر عقد إثيريوم واجهات برمجة تطبيقات RPC للعديد من العمليات، لكنها تفتقر إلى طريقة أصلية لاسترجاع قائمة المعاملات بسهولة حسب العنوان، وهي ميزة يُتوقع توفرها عادةً في مستكشفات الكتل مثل Etherscan. ولحل هذه المشكلة، يُحافظ مشروع ADAMANT على أداة فهرسة متخصصة مبنية بلغة Python تُعرف باسم أداة EthSync، والتي تتيح الاستعلام بكفاءة عن معاملات ETH وERC20 حسب العنوان.

تعمل أداة الفهرسة كخدمة في الخلفية تتصل بعقد إثيريوم عبر واجهات برمجة التطبيقات HTTP أو WS أو IPC، وهي متوافقة مع عملاء شائعين مثل Geth وNethermind. ويتم تخزين بيانات المعاملات التي يتم جمعها في قاعدة بيانات Postgres لضمان المتانة والوصول السريع، كما يتم عرض هذه البيانات أمام تطبيقات العميل من خلال واجهة برمجة تطبيقات PostgREST.

![أداة الفهرسة (EthSync) لإثيريوم تم تحديثها بإضافة فهارس إضافية](/images/engineering-notes/medium/f828f2b7fdf6/002-0-9zuzrclpitfvpafs.webp)

يتمثل التحديث الكبير في هذا الإصدار في إدخال فهارس إضافية في قاعدة البيانات. تؤدي هذه الفهارس إلى تحسين كبير في أداء الاستعلامات المعقدة، مثل تصفية المعاملات الخاصة بإثيريوم فقط أو برموز محددة مرتبطة بعنوان معين. على سبيل المثال، يمكن استرجاع آخر 25 معاملة بعملة USDT لعنوان محدد باستخدام طلب واجهة برمجة التطبيقات التالي:

```bash
curl -k -X GET “http://localhost:3000/ethtxs?and=(txto.eq.0xdac17f958d2ee523a2206206994597c13d831ec7,or(txfrom.eq.0xabfDF505fFd5587D9E7707dFB47F45AF1f03E275,contract_to.eq.000000000000000000000000abfDF505fFd5587D9E7707dFB47F45AF1f03E275))&order=time.desc&limit=25"
```

في الاختبارات، تنفذ معظم الاستعلامات التي تستخدم هذه الفهارس الجديدة في أقل من 100 مللي ثانية، وهو تحسن كبير مقارنة بالعشرات من الثواني المطلوبة في حال عدم استخدامها.

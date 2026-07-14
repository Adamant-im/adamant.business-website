---
title: "أداة EthSync v2.1: تحديث فهرس معاملات إيثيريوم"
slug: "ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
description: "توفر أداة EthSync سجل معاملات محفظة مشابهًا لماسحات الكتل مثل Etherscan عبر فهرسة معاملات إيثيريوم وERC20 حسب العنوان."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
publishedAt: "2022-07-06T15:40:23.802Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:6a4f00964d64"
locale: "ar"
placeholder: false
---

تقوم أداة EthSync بفهرسة معاملات إيثيريوم وERC20 حسب العنوان، وتوفر سجل معاملات المحفظة بشكل يشبه ماسحات الكتل مثل Etherscan. وتُشغَل كخدمة في الخلفية تتصل بعقدة إيثيريوم عبر واجهات برمجة التطبيقات HTTP أو WebSocket أو IPC — وتعمل مع Geth وNethermind وجميع العقد القياسية الأخرى — وتخزن جميع المعاملات في قاعدة بيانات Postgres، وتوفر بيانات المعاملات من خلال واجهة برمجة تطبيقات تعتمد على postgrest.

يجلب الإصدار 2.1 عدة تحسينات. أصبح النص البرمجي الآن يسترِد جميع بيانات المعاملات في طلب واحد إلى عقدة إيثيريوم، مع إجراء طلب إضافي واحد فقط لكل معاملة لجلب حالتها، مما يقلل بشكل كبير من العبء على العقدة. كما تم توسيع نظام التسجيل (Logging)، وتُضاف متغير بيئة جديد باسم `LOG_FILE` يسمح للمشغلين بتحديد مسار اختياري لملف السجلات؛ وإذا لم يُعدَّ هذا المتغير، فإن الأداة تعود تلقائيًا إلى استخدام `StreamHandler`.

ويتضمن هذا الإصدار أيضًا إصلاحات لمشكلات الاتصال عبر IPC وقاعدة البيانات التي كانت تؤثر على الإصدارات السابقة. كما تمت إضافة نصين برمجيين جديدين للاختبار: `ethtest.py` الذي يتحقق من الاتصال بالعقدة إيثيريوم، و`pgtest.py` الذي يختبر اتصال قاعدة بيانات Postgres، ما يجعل استكشاف الأخطاء أثناء النشر وإصلاحها أكثر سهولة.

تُعد أداة EthSync جزءًا من مشروع ADAMANT مفتوح المصدر، وهي متاحة مجانًا. يمكن الاطلاع على الوثائق الكاملة، وتعليمات التثبيت، وأمثلة الاستخدام في ملف [Readme](https://github.com/Adamant-im/ETH-transactions-storage#indexer-for-ethereum-to-get-transaction-list-by-eth-address) الخاص بالمشروع.

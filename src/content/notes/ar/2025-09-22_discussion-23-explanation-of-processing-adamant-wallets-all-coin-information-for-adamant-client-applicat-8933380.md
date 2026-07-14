---
title: "معالجة adamant-wallets: معلومات العملة والرمز لتطبيقات ADAMANT"
slug: "discussion-23-explanation-of-processing-adamant-wallets-all-coin-information-for-adamant-client-applicat-8933380"
description: "يجمع مستودع adamant-wallets جميع معلومات العملات والرموز لتطبيقات ADAMANT، ويجب على التطبيق معالجتها بشكل صحيح وتقديم بنية موحدة للمطورين."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/23"
publishedAt: "2025-09-22T12:54:29Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8933380"
locale: "ar"
placeholder: false
---

يجمع مستودع `adamant-wallets` جميع معلومات العملات والرموز لتطبيقات ADAMANT العميلة. ويتحمل التطبيق العميل مسؤولية معالجة هذه البيانات بشكل صحيح وتوفير بنية موحدة وسهلة الاستخدام للمطورين. البنية المقترحة ليست مثالية — حيث يتم دمج معلومات الرموز من مجلدات مختلفة — لكن البدائل تحمل مقايضات خاصة بها، وبالتالي لا تُقترح أي تغييرات هيكلية هنا.

## المصطلحات

يُعد مصطلح **كريبتو** مصطلحًا عامًا يشمل كلًا من العملات والرموز. لكل كريبتو اسم (مثل بيتكوين) ورمز أو اختصار (مثل BTC). تُعد **العملة** كريبتو موجودًا على سلسلة كتلة خاصة به، مثل `ADM` أو `BTC` أو `DOGE` أو `DASH` أو `KLY`. أما **الرمز** فهو كريبتو موجود فوق سلسلة كتلة ما — مثل `STORJ` أو `USDT` على إثيريوم أو سلسلة بينانس الذكية.

لكل سلسلة كتلة **عملة رئيسية** واحدة، تشارك خصائص مشتركة مع جميع الرموز على تلك السلسلة وتُستخدم لدفع رسوم التحويل. على سبيل المثال، يتطلب تحويل USDT على إثيريوم دفع رسوم بالعملة `ETH`. كما تُعرّف كل سلسلة كتلة **نوع رمز** — فمثلاً تستخدم إثيريوم `ERC20`، وتستخدم سلسلة بينانس الذكية `BEP20`. قد يوجد الرمز على سلاسل كتلة متعددة (يُعرف بـ **الرمز متعدد السلاسل**)؛ فمثلاً، يوجد USDT كـ `ERC20` على إثيريوم وكـ `BEP20` على سلسلة بينانس الذكية. إنها نفس العملة بذات القيمة والمعلومات العامة، لكنها مخزنة ومحوّلة على سلاسل مختلفة.

## البنية الأساسية

توجد كل كريبتو في المجلد `/general`. وتحتاج الرموز إضافةً إلى ذلك إلى وجودها في المجلد `/blockchains`. على سبيل المثال، يحتوي `/general/USDT/info.json` على المعلومات العامة حول USDT، في حين يحتوي `/blockchains/ethereum/USDT/info.json` على معلومات خاصة بـ USDT على إثيريوم. ويحتوي الملف `/blockchains/{chain}/info.json` على معلومات مشتركة خاصة بالسلسلة لجميع الرموز على تلك السلسلة، ويُعرّف أيضًا رابط العملة الرئيسية مع خصائصها الأساسية.

### مصادر الخصائص للرمز

أي رمز على أي سلسلة كتلة له أربع مصادر للخصائص، يتم دمجها بحسب أولوية من الأعلى إلى الأدنى:

1. `/blockchains/ethereum/USDT/info.json` — الرمز المحدد على سلسلة كتلة محددة
2. `/blockchains/ethereum/info.json` — معلومات الرموز المشتركة لهذه السلسلة
3. `/general/ethereum/info.json` — المعلومات من العملة الرئيسية للسلسلة
4. `/general/USDT/info.json` — المعلومات العامة للرمز

على سبيل المثال، يتم دمج USDT على إثيريوم من جميع المصادر الأربعة، حيث يُلغِي المصدر (1) تأثير المصدر (2)، وهكذا دواليك.

## إنشاء العملات والرموز في التطبيقات

لإنشاء العملات، يقوم التطبيق بتمرير جميع الكريبتوات في `/general` وقراءة كل ملف `/general/{crypto}/info.json`. ويتجاهل الإدخالات التي يكون فيها `status` غير نشط أو يكون `type` غير `coin`. وإذا كان `createCoin = true`، فإنه ينشئ كائن عملة يُعرض كإدخال سلسلة كتلة دون نوع رمز — ومن الأمثلة على ذلك `ADM` و`BTC`.

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8933380/001-fafd0ecc.webp)

![Discussion screenshot 2](/images/engineering-notes/github/discussions/8933380/002-cebba626.webp)

لإنشاء الرموز، يقوم التطبيق بتمرير جميع السلاسل في `/blockchains` (مثل `ethereum` أو `binanceSmartChain`) وقراءة ملف `info.json` على مستوى السلسلة. ويتجاهل سلسلة الكتلة إذا لم تكن `status` نشطة، ويُسجّل `mainCoin`. ثم يقرأ `/general/{mainCoin}/info.json` للحصول على المعلومات العامة للعملة الرئيسية. ثم لكل رمز في مجلد تلك السلسلة، يقرأ `/general/{token}/info.json` — ويتخطى الرمز إذا كان الملف مفقودًا أو إذا لم يكن `type` هو `token` — ثم يقرأ `/blockchains/{blockchain}/{token}/info.json`، ويتخطى الرمز إذا لم تكن `status` نشطة. وأخيرًا، يُدمج جميع المصادر الأربعة وفق الأولوية، وينشئ كائن رمز يُعرض مع نوع الرمز الخاص به (مثل `ERC20` أو `BEP20`). ومن الأمثلة على ذلك `USDT` و`USDC` و`DAI`.

![Discussion screenshot 3](/images/engineering-notes/github/discussions/8933380/003-f4329279.webp)

![Discussion screenshot 4](/images/engineering-notes/github/discussions/8933380/004-a0d74d6b.webp)

## كائن البيانات للعملة أو الرمز

بعد تحليل `adamant-wallets`، يحتفظ التطبيق بكائن بيانات يحتوي معلومات جميع العملات والرموز عبر السلاسل. وبما أن الخصائص تكون قد دُمجت مسبقًا، فإن استرجاع البيانات يكون مباشرًا:

```js
// Inside token-related methods
let property = coinInfo.property

// Outside, referencing by token and chain
let property = coinInfo["USDT"]["ethereum"].property
```

وهذا يضمن قدرة تطبيقات ADAMANT على التعامل مع سلاسل كتلة متعددة ورموزها بشكل متسق.

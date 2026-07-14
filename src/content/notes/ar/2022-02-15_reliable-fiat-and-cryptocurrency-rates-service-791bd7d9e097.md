---
title: "ADAMANT InfoService v3.3.5 يضيف التحقق من الأسعار عبر المصادر"
slug: "reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
description: "يُعد ADAMANT InfoService خدمة تجمع أسعار العملات والعملات الرقمية من MOEX وCurrency Api وCoinmarketcap وCryptoCompare وCoingecko، وتصدرها عبر واجهة برمجة تطبيقات…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
publishedAt: "2022-02-15T10:59:58.332Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/791bd7d9e097/001-1-olubh0mvysjvmtykzm2u4a-png.webp"
cardSpan: "full"
originalId: "medium:791bd7d9e097"
locale: "ar"
placeholder: false
---

يُعد ADAMANT InfoService خدمة تجمع أسعار العملات والعملات الرقمية من MOEX وCurrency-Api وCoinmarketcap وCryptoCompare وCoingecko، وتصدرها عبر واجهة برمجة تطبيقات (API) للتطبيقات التابعة.

يُضيف الإصدار v3.3.5 خدمة Currency-Api كمصدر إضافي للأسعار الورقية. والأهم من ذلك، أن InfoService يقارن الآن بين الأسعار المستلمة من مزودي الخدمة المختلفين ويشير إلى البيانات غير الصحيحة أو الشاذة عند اكتشاف تباينات. يجعل هذا التحقق عبر المصادر الخدمة أكثر موثوقية، حيث يقل احتمال انتقال أسعار خاطئة إلى المستهلكين من مصدر واحد معطوب.

ويتضمن هذا الإصدار أيضًا إعادة هيكلة داخلية، وإصلاحات للأخطاء، ودمج أداة التحليل (linter)، وتحديثات للdependencies.

تتوفر وثائق واجهة برمجة التطبيقات (API) على [Wiki خدمة ADAMANT InfoService](https://github.com/Adamant-im/adamant-currencyinfo-services/wiki/InfoServices-API-documentation). ملاحظات الإصدار الكاملة متوفرة على [صفحة الإصدار v3.3.5](https://github.com/Adamant-im/adamant-currencyinfo-services/releases/tag/v3.3.5).

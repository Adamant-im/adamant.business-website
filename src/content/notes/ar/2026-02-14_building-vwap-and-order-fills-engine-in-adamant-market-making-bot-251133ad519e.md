---
title: "بناء محرك VWAP ومحو الأمور المعبأة في بوت ADAMANT للصناعة السوقية"
slug: "building-vwap-and-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
description: "يُقدّم بوت ADAMANT للصناعة السوقية محركًا مخصصًا لتحليلات التنفيذ الدقيقة، بما في ذلك VWAP ومحو الأمور المعبأة."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/building-vwap-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
publishedAt: "2026-02-14T13:30:19.720Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/251133ad519e/001-1-stivdc2giqxmbc5miuwkxa-png.webp"
cardSpan: "full"
originalId: "medium:251133ad519e"
locale: "ar"
placeholder: false
---

في بوت ADAMANT للصناعة السوقية، يتم بالفعل دعم إدارة ديناميكية لكتاب الأوامر، والتحكم في السبريد، وتوفير السيولة، واستراتيجيات الحجم. ومع ذلك، بدون تحليلات دقيقة للإكمال، لا يكون المشهد سوى نصفه فقط. [المسألة رقم #87](https://github.com/Adamant-im/adamant-tradebot/issues/87) تُقدّم ترقية معمارية كبيرة: محرك VWAP مخصص ومحرك ملء الأوامر (الوحدة المميزة) الذي يوفّر تحليلات تنفيذية بمستوى احترافي.

### لماذا يهم VWAP

توفر معظم واجهات برمجة تطبيقات البورصات معلومات مجزأة. قد تُملأ الأوامر جزئيًا، وقد تتأخر تحديثات الحالة، وتعيد بعض البورصات بيانات تنفيذ غير كاملة، وقد تؤدي إعادة التشغيل إلى فقدان السياق الداخلي للتنفيذ. إذا لم يُخزّن البوت ويحقّق من بيانات الإكمال بشكل صحيح، تصبح الأرباح والخسائر (PnL) غير دقيقة، ويصبح تتبع المراكز غير موثوق به، وينهار منطق إدارة المخاطر، وتستند تعديلات السبريد والسيولة إلى افتراضات وليس إلى الواقع.

للعمل على مستوى مؤسسي، يستخدم المحرك تتبعًا دائمًا للتنفيذ، وإعادة تسوية موثّقة للإكمالات، وحسابًا دقيقًا لـ VWAP، وتحليلات تأخذ بعين الاعتبار المخزون.

### الحل: محرك VWAP ومليء الأوامر المخصص

تُقدّم المسألة #87 نظامًا فرعيًا مخصصًا يتكون من ثلاثة مكونات رئيسية.

**تخزين أحداث الإكمال الأولية (للإلحاق فقط).** يقوم `fillsDb` المخصص بتخزين أحداث التنفيذ الأولية في وضع الإلحاق فقط، مع الاستمرار عبر عمليات إعادة التشغيل دون تجميع فوري. وهذا يضمن عدم فقدان أي بيانات تنفيذ أو الكتابة فوقها.

**طبقة التحقق من البورصة.** يجب التحقق من كل حدث إكمال مقابل واجهة برمجة تطبيقات البورصة، والتأكيد على تنفيذه بالكامل أو جزئيًا، ووضع علامة عليه كمُعالَج فقط بعد التأكيد. وهذا يمنع حدوث إكمالات إيجابية كاذبة عندما يفتقر البوت إلى الاتصال، أو تكون عقد البورصة غير متاحة، أو تكون استجابات واجهة برمجة التطبيقات غير كاملة. يحدث التحقق من التنفيذ فقط عندما يكون الاتصال الشبكي موجودًا وتكون نقاط نهاية البورصة قابلة للوصول؛ وإلا فقد تُصنّف الصفقات الصالحة خطأً على أنها فاشلة.

تنفذ دالة التحقق الأساسية سياسة "تحقق دائمًا إن أمكن":

```javascript
/**
 * Verifies a fill order using exchange API.
 *
 * Policy "always verify if possible":
 *  - If api.getOrderDetails() is missing -> cannot disprove -> treat as confirmed
 *  - If status missing or exception -> return undefined (try again later)
 *  - If API says 'filled' -> confirmed
 *  - If API says explicitly not filled ('new'|'part_filled'|'cancelled') -> rejected
 *  - If API says 'unknown' -> keep (cannot disprove) but warn
 *
 * @param {FillOrder|Object} order Fill order record or Order object
 * @param {any} api API instance (spot first/second account, or other compatible trader api)
 * @param {string} callerName Log context id (usually module and method which calls) to quickly find related logs
 * @returns {Promise<VerifyFillResult | undefined>
 */
async function verifyOrderFilled(order, api, callerName)
```

**الإحصائيات المجمعة للتنفيذ.** متجر ثانٍ دائم، `filledStatsDb`، يتراكم إجمالي الأصل الأساسي المشترى والمباع، وإجمالي الأصل المرجعي المنفق والمُستلم، وعدّادات الإكمالات الكاملة، الجزئية، المرفوضة، والناقصة. ومن هذا، تُحسب المقاييس الأساسية.

### المقاييس الأساسية

هيكل كائن الإحصائيات الأساسية:

```javascript
/**
 * Creates a base FillsEngineStatsResult object with zeroed / default values.
 *
 * @param {string} statsId Format: `${exchange}:${pair}:${purpose}:${startTs}`
 * @param {string} pair Trading pair, e.g., `BTC/USDT`
 * @param {FilledStatsRecord | undefined | null} stats Epoch stats (optional)
 * @returns {FillsEngineStatsResult}
 */
function createBaseEpochStats(statsId, pair, stats) {
  return {
    statsId,
    pair,
    updatedAt: stats?.updatedAt || 0,

    buy: stats?.buy ? { ...stats.buy } : emptySide(),
    sell: stats?.sell ? { ...stats.sell } : emptySide(),

    // Calculated later
    boughtVwap: 0,
    soldVwap: 0,

    hasBothSides: false,
    vwapSpread: 0,
    vwapSpreadPercent: 0,

    pnlQuoteCashflow: 0,
    inventoryBase: 0,
    markPrice: undefined,
    pnlQuoteMtm: undefined,
  };
}
```

**VWAP (السعر المرجح بالحجم)** يُحسب لكل جانب كمتوسط سعر الشراء المرجح بالحجم (Buy VWAP) ومتوسط سعر البيع المرجح بالحجم (Sell VWAP) باستخدام الصيغة `VWAP = إجمالي حجم الأصل المرجعي / إجمالي حجم الأصل الأساسي`. وهذا يعكس جودة التنفيذ الفعلية، وليس فقط سعر وضع الطلب.

**سبريد VWAP** هو الفرق بين Buy VWAP وSell VWAP، ويُظهر السبريد الحقيقي المُحقَق بدلًا من السبريد النظري.

**دلتا المخزون** هي الفرق بين إجمالي الأصل الأساسي المشترى وإجمالي الأصل الأساسي المباع، وتُستخدم لإدارة المخاطر، وتتبع التعرض للمراكز، ومنطق إعادة التوازن.

**الربح والخسارة المُحقَق** هو الناتج القائم على التدفق النقدي من الصفقات المنفذة، مع إمكانية حساب الربح والخسارة حسب القيمة السوقية الحالية (mark-to-market PnL) باستخدام سعر السوق الحالي.

### التأثير المعماري

المحرك الجديد هو مكوّن وحدوي بالكامل يتكامل بسلاسة في البنية الحالية دون تعطيل منطق وضع الأوامر الحالي. يعمل جنبًا إلى جنب مع الأنظمة الحالية بدلًا من استبدالها، ويحافظ على الاستقرار مع إضافة طبقة تحليلية أعمق.

```
          Exchange API
                │
                ▼
       Order Placement Engine
                │
                ▼
         Fills Collector
                │
                ▼
       Verification Engine
                │
                ▼
         Aggregation Engine
                │
                ▼
      VWAP / Inventory / PnL
                │
                ▼
    Risk & Strategy Modules
```

هذه البنية تضع الأساس للتوسع المستقبلي، وتحول البوت من أداة لوضع الأوامر إلى نظام تحليل تنفيذ حقيقي. تعتمد الاستراتيجيات المتقدمة مثل إدارة دلاء السيولة والحفاظ الديناميكي على السبريد بشكل كبير على بيانات تنفيذ دقيقة للعمل بشكل صحيح. بالنسبة للوحدات المتقدمة في التداول، تُعد تحليلات التنفيذ شرطًا أساسيًا للتشغيل بمستوى احترافي.

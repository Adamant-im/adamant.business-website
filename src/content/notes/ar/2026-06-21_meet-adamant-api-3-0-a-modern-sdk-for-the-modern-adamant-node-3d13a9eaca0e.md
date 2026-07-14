---
title: "تعرف على adamant-api 3.0 — SDK حديث للعقدة الحديثة ADAMANT"
slug: "meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
description: "أُصدرت نسخة 3.0.0 من مكتبة adamant api JavaScript/TypeScript SDK، مصممة للعمل بسلاسة مع ADAMANT Node v0.10.0. تشمل التحديثات الطوابع الزمنية بالميلي ثانية، ومعايير استعلام أشمل، واستجابات موحدة لحالة العقدة، وتصنيفًا شاملاً بالإصدار الأدنى."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
publishedAt: "2026-06-21T15:54:25.436Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3d13a9eaca0e/001-0-hkmpiqt1p-ubpghb.webp"
cardSpan: "full"
originalId: "medium:3d13a9eaca0e"
locale: "ar"
placeholder: false
---

يُعلن عن إصدار `adamant-api` JavaScript/TypeScript SDK نسخة 3.0.0، المصممة للعمل بسلاسة مع ADAMANT Node v0.10.0. يقدم هذا الإصدار دعماً للطوابع الزمنية بالميلي ثانية، ومعايير استعلام أكثر ثراءً، واستجابات موحدة لحالة العقدة، وتصنيفاً شاملاً بالإصدار الأدنى. توفر المكتبة تلقائياً فحوصات الصحة، وإعادة المحاولة، والتبديل التلقائي عند الفشل (failover)، واستجابات مُصنَّفة، والمراسلة المشفرة، والاشتراكات الفورية عبر WebSocket.

ADAMANT هو تطبيق مراسلة مشفر من طرف إلى طرف يعتمد على تقنية البلوكشين، ويحتوي على محفظة رقمية مدمجة ولا يتطلب رقم هاتف أو خادماً مركزياً. تقوم مكتبة `adamant-api` SDK بتجريد الشبكة إلى استدعاءات دوال نظيفة، مما يمكّن المطورين من بناء بوتات لامركزية، وبراميل تبرعات رقمية (tip jars)، ومحافظ حيث يمتلك المستخدمون هويتهم وأموالهم.

### ما الجديد في الإصدار 3.0

تم إعادة توليد كائنات نقل البيانات (DTOs) الخاصة بواجهة برمجة التطبيقات (API) من مرجع مثبت لـ `adamant-schema`، مما يضمن كتابة صحيحة للطوابع الزمنية بالميلي ثانية، وبيانات المحمل/الحالة، وحقول المعاملات غير المؤكدة التي يمكن أن تكون فارغة. أصبحت إمكانيات الاستعلام الآن تشمل `returnUnconfirmed` و`includeDirectTransfers`، والبحث عن المفوضين (delegates) حسب العنوان، واستعلامات المعاملات متعددة الأنواع. تُدمج عوامل التصفية للطلبات بشكل افتراضي باستخدام `and` المنطقية، وتنطبق عوامل تصفية المبلغ فقط على معاملات التحويل. تتوفر إمكانية اختيارية لبناء `timestampMs` ووظيفة `getEpochTimeMs()`، رغم أن `timestampMs` ليست جزءاً من البايتات الموقعة، وبالتالي تبقى الهاشات والمعرفات والتوقيعات دون تغيير.

تشمل تحسينات الموثوقية إيقاف حلقات إعادة المحاولة عند رفض طلبات POST بشكل صريح، مع إرجاع أخطاء منظمة لا يمكن إعادة محاولة تنفيذها. تُحفظ إعادة المحاولة والتبديل التلقائي للعقد النشطة بالنسبة للطلبات الآمنة وأخطاء الشبكة. يضمن اختيار العقدة المعتمد على الارتفاع (Height-aware) والتصنيف الشامل باستخدام `minVersion` التواصل مع عقد سليمة ومحدثة.

يتيح عميل WebSocket حقيقي الاشتراك بعدة عناوين، وأنواع معاملات، وأنواع أصول الدردشة عبر اتصال واحد. ويتضمن العميل أخطاء اتصال مُصنَّفة، ووظائف استدعاء لإعادة الاتصال، ووظائف `connect()`/`disconnect()` الصريحة، وتنظيف المستمعين، وتحديد حدود لإعادة الاتصال.

أصبحت الحزمة الآن وحداتية التصميم بشكل جوهري. تبقى الحزمة الجذرية مركزَة على ADM، بينما توفر التصديقات الفرعية (subpath exports) وصولاً إلى كائنات DTO الخاصة بالواجهة، والمعاملات، والبيانات الوصفية، ومساعدات BTC/ETH/DASH/DOGE لكل من CommonJS وESM. تكون البيانات الوصفية للعملات حتمية (deterministic) ومثبتة من `adamant-wallets`. انتقلت الوثائق الآن إلى موقع يعتمد على VitePress + TypeDoc يتم التحكم به من خلال نظام التحكم بالمصدر.

![تعرف على adamant-api 3.0 — SDK حديث للعقدة الحديثة ADAMANT](/images/engineering-notes/medium/3d13a9eaca0e/002-0-bato9yeonu3b9-oz.webp)

### البدء السريع

قم بتثبيت الحزمة وتهيئة العميل مع قائمة من العقد. يتم التعامل تلقائياً مع فحوصات الصحة، وإعادة المحاولة، والتبديل التلقائي عند الفشل.

```javascript
import {AdamantApi} from 'adamant-api';

const api = new AdamantApi({
  nodes: [
    'https://endless.adamant.im',
    'https://clown.adamant.im',
    'https://lake.adamant.im',
  ],
  checkHealthAtStartup: true,
  minVersion: '0.10.0', // inclusive — older nodes are excluded automatically
});

api.onReady(async () => {
  const response = await api.getBlocks();
  if (response.success) {
    console.log(response.blocks);
  } else {
    console.error(response.errorMessage);
  }
});
```

### حالات الاستخدام

يمكنك بناء بوت مراسلة لامركزي يراقب الحسابات في الوقت الفعلي ويستجيب للرسائل المشفرة. التشفير من طرف إلى طرف مدمج مسبقاً؛ حيث يقوم البوت بفك تشفير الرسائل باستخدام العبارة السرية الخاصة به، ولا يقوم الخادم بتخزين النص الصريح أبداً.

```javascript
import {AdamantApi, WebSocketClient, decodeMessage} from 'adamant-api';
import {config} from './config.js';

const api = new AdamantApi({nodes: config.nodes});

const ws = new WebSocketClient({
  admAddress: config.address,
  direction: 'incoming', // only messages sent *to* the bot
});
api.initSocket(ws);

ws.onMessage(async (tx) => {
  const text = decodeMessage(
    tx.asset.chat.message,
    tx.senderPublicKey,
    config.passphrase,
    tx.asset.chat.own_message,
  );

  if (text.trim() === '/ping') {
    await api.sendMessage(config.passphrase, tx.senderId, 'pong 🏓');
  }
});
```

بالنسبة لبرميل تبرعات رقمي أو بوت دفع، يمكنك الاستجابة للتحويلات الواردة للرموز الرقمية وإرسال رموز معاوِضة. يمكن لاتصال WebSocket واحد أيضاً مراقبة العديد من العناوين وتصفية حسب النوع، وهي ميزة مفيدة لاستيراد البورصات أو لوحات المحاسبة.

إذا كنت بحاجة إلى محفظة خفيفة متعددة العملات، يمكنك اشتقاق عناوين BTC أو ETH أو DASH أو DOGE من نفس العبارة السرية لـ ADAMANT دون الحاجة إلى تضمين مكدسات تشفير متعددة في بوتك المخصص لـ ADM فقط. قم باستيراد ما تحتاجه بالضبط عبر التصديقات الفرعية (subpath exports) للحفاظ على صغر حجم الحزم في البيئات الخالية من الخوادم (serverless).

```javascript
import {eth} from 'adamant-api/coins/eth';
import {btc} from 'adamant-api/coins/btc';

const {address: ethAddress} = eth.keys(process.env.PASSPHRASE);
const {address: btcAddress} = btc.keys(process.env.PASSPHRASE);

console.log({ethAddress, btcAddress});
```

### الترقية من الإصدار 2.x

للترقية، قم برفع إصدار Node إلى 22 أو أعلى في بيئة التشغيل الخاصة بك ونظام CI. قم بمراجعة اتجاه WebSocket، وأضف `direction: 'incoming'` إذا كان تطبيقك يفترض استقبال الرسائل فقط. حدّث استيرادات العملات إلى `adamant-api/coins/*`، وأزل مسارات الكود الخاصة بـ Lisk/Klayr، وأعد التحقق من عوامل تصفية الاستعلام لاعتماد `and` المنطقية كقيمة افتراضية، واستبدل `withoutDirectTransfers` بـ `includeDirectTransfers`. تبقى التوقيعات، ومعرفات المعاملات، واستيراد CommonJS/ESM دون تغيير.

---
title: "إصدار adamant-api v3.2.0: تجاوز فشل HTTP 429، التحقق من المفتاح العام، وفلاتر الاستعلام الصارمة"
slug: "discussion-85-adamant-api-v3-2-0-resilient-http-429-failover-recipient-public-key-verification-strict-ch-11403173"
description: "يتضمن ADAMANT Node v0.11.0 حدود معدل افتراضية، والتحقق الصارم من استعلامات AND، وتوحيد مصادر OpenAPI، مما يعزز مرونة SDK في التعامل مع العقد وتجاوز الفشل."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/85"
publishedAt: "2026-11-26T06:52:55Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:11403173"
locale: "ar"
placeholder: false
---

مع طرح ADAMANT Node v0.11.0 الذي يقدم حدوداً افتراضية لمعدل الاستخدام (Rate Limits) لمنع إساءة الاستخدام عبر REST/WebSocket، والتحقق الصارم من استعلامات AND فقط في نقاط نهاية الدردشة وKVS، وتوحيد مصادر OpenAPI تحت `Adamant-im/adamant`؛ تم تحديث `adamant-api` لتعزيز مرونة تجاوز فشل العقد، وجاهزية النظام، وتسلسل الاستعلامات عبر كل من الإصدار v0.11.0 وما قبله.

## تجاوز فشل HTTP 429 المرن وفترات التهدئة

يفرض ADAMANT Node v0.11.0 ميزانيات HTTP لكل عنوان IP مجمع (`all`) ولكل فئة مسار (`status` و`read` و`publish`)، ويستجيب برموز `429` مع ترويسات `Retry-After` / `RateLimit-Reset` و`RateLimit-Scope`.

يلتقط كل طلب `targetNode = this.node` قبل الإرسال لضمان عدم إعادة توجيه `this.node` إلى عقدة فشل منها طلب آخر بالفعل. تشترك استدعاءات `updateNodes()` المتزامنة في `updateNodesPromise` واحد قيد التنفيذ بدلاً من الإرجاع المبكر، ويؤدي تجاوز الفشل القسري عند الانضمام إلى مسح مخطط إلى ترقيته إلى تدوير قسري مع `failedNode`.

نظراً لأن `/api/node/status` يُحسب ضمن فئة `status` ذات السعة الأعلى (12,000/دقيقة مقابل 3,000/دقيقة لـ `read`)، فإن العقدة المحدودة المعدل لا تزال تجيب على فحوصات السلامة. يتتبع `NodeManager` الآن فترات التهدئة لرمز 429 لكل عقدة (`rateLimitedUntil` بحد أقصى 60 ثانية) بحيث تفضل عمليات المسح القسرية والمخططة العقد المتزامنة غير المحدودة في مجموعات العقد المكونة من عقدتين أو أكثر.

عند عدم توفر عقدة متزامنة بديلة، تلتزم عمليات القراءة المتماثلة (idempotent) بـ `Retry-After` / `RateLimit-Reset` مع إضافة تذبذب (jitter) يصل إلى 10 ثوانٍ؛ وإذا تجاوزت نافذة إعادة التعيين الخاصة بالعقدة ذلك الحد أو استنفدت المحاولات، يعود SDK فوراً مع بيانات وصفية اختيارية في `AdamantApiResult`:

```ts
const response = await api.getBlocks();

if (!response.success) {
  if (response.status === 429 && response.retryAfterMs !== undefined) {
    console.warn(`Rate-limited (${response.rateLimitScope}), retry in ${response.retryAfterMs}ms`);
  }
}
```

طلبات `POST` غير المتماثلة (إرسال المعاملات) لا يتم إعادة إرسالها أبداً عند استلام استجابات HTTP، بما في ذلك `429`.

## أسماء فلاتر بسيطة، أنواع نقاط نهاية صارمة، و POST /api/states/get

تستقبل نقاط النهاية `/api/states/get` و`/api/chats/get` و`/api/chatrooms/*` الآن أسماء فلاتر بسيطة. يتم تسطيح أغلفة `and: { ... }`، بينما يتم رفض أغلفة `or` غير المدعومة من جانب العميل مع `success: false`. هذا يحل المشكلة #97 في العقد التي تسبق v0.11.0 ويتوافق مع التحقق الصارم في v0.11.0.

تعكس الآن `ChatroomsOptions` و`ChatTransactionsOptions` و`KVSOptions` الحقول الدقيقة التي يقبلها ADAMANT Node v0.11.0، بما في ذلك `toHeight` في `/api/chats/get` و`/api/states/get`، مع استبعاد حقول الارتفاع/النطاق المرفوضة في `/api/chatrooms/*`. يتم حذف `userId` المهمل في `/api/chatrooms/*` عند التشغيل مع تحذير إهمال مخصص.

يمكن لعمليات بحث KVS الكبيرة الآن استخدام `POST /api/states/get`:

```ts
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

يستخدم `getKVS(..., {method: 'POST'})` سياسة إعادة محاولة القراءة المتماثلة الخاصة بـ SDK، مما يحافظ على تجاوز فشل كامل لرموز 429 و5xx.

## جاهزية العقدة القابلة للاستخدام وتصفية حالة المحمل

يفحص `NodeManager` الآن حقول `loader.loaded` و`loader.syncing` في `/api/node/status`. يتم استبعاد العقد التي لا تزال قيد التحميل (`loaded: false`) أو المزامنة (`syncing: true`) من اختيار API النشط وقوائم اتصال WebSocket؛ بينما تظل العقد التي لا تحتوي على كائن `loader` مؤهلة. مع `checkHealthAtStartup: true`، ينتظر `onReady` حتى يتم اختيار عقدة قابلة للاستخدام فعلياً بدلاً من العمل بعد فشل مسح السلامة الأولي.

## التحقق من المفتاح العام للمستلم والمفوض المحلي

ترفض الآن `encodeMessage()` و`decodeMessage()` مفاتيح Ed25519 غير القانونية، أو الخارجة عن المنحنى، أو ذات الرتب الصغيرة (رتب 1، 2، 4، و8) مع `invalid key`. تتحقق `getPublicKey()` من عناوين ADM محلياً قبل إجراء طلب شبكة، وتتحقق من أن المفاتيح التي تعيدها العقدة تشتق العنوان المطلوب محلياً قبل تخزينها مؤقتاً أو إرجاعها. تعيد `sendMessage()` التحقق محلياً من المفاتيح التي تم حلها قبل التشفير وتعيد `{success: false, errorMessage}` عند عدم التطابق؛ وتفرض `voteForDelegate()` ربط العنوان وتستخدم ذاكرة تخزين مؤقت للمفوض لكل عميل.

## توحيد مصادر OpenAPI وتأمين سلسلة التوريد

يسحب `scripts/sync-api-types.mjs` الآن مواصفات OpenAPI 3.2 مباشرة من `Adamant-im/adamant` (`openapi/specification/openapi.yaml`)، مما يولد `RateLimitErrorResponseDto` و`GetKVSRequestBody`. يفرض `pnpm-workspace.yaml` فترة حجر صحي لعمر إصدار التبعيات لمدة 7 أيام (`minimumReleaseAge: 10080`) مع `allowBuilds` صريح و0 ثغرات أمنية في تدقيق الإنتاج.

## المراجع

- SDK PR (التوافق مع Node v0.11.0 والتبعيات): https://github.com/Adamant-im/adamant-api-jsclient/pull/105
- التحقق من المفتاح العام للمستلم والمفوض: https://github.com/Adamant-im/adamant-api-jsclient/pull/110
- إصلاح فلاتر الدردشة وKVS البسيطة: https://github.com/Adamant-im/adamant-api-jsclient/pull/101
- إصلاح `onReady` للعقدة القابلة للاستخدام: https://github.com/Adamant-im/adamant-api-jsclient/pull/102
- ADAMANT Node v0.11.0: https://github.com/Adamant-im/adamant/pull/303
- وثائق SDK: https://js.docs.adamant.im
- OpenAPI Swagger UI: https://docs.adamant.im/schema/

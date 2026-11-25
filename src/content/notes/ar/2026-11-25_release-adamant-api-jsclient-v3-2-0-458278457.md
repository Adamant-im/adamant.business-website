---
title: "ADAMANT API JS Client v3.2.0"
slug: "release-adamant-api-jsclient-v3-2-0-458278457"
description: "إصدار ADAMANT API JS Client v3.2.0 هو تحديث أمني وتصحيحي يتوافق مع ADAMANT Node v0.11.0. يجب على جميع مستخدمي الإصدارات v3.0.0 و v3.1.0 الترقية إلى v3.2.0."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.2.0"
publishedAt: "2026-11-25T15:08:18Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:458278457"
locale: "ar"
placeholder: false
---

يعد إصدار ADAMANT API JS Client v3.2.0 تحديثاً أمنياً وتصحيحياً تم تنسيقه ليتوافق مع ADAMANT Node v0.11.0. يجب على جميع مستخدمي الإصدارات v3.0.0 و v3.1.0 الترقية إلى v3.2.0.

## التحقق من المفاتيح العامة للمستلم والمندوب

تفرض حزمة SDK الآن التحقق من مفاتيح Ed25519 القياسية بطول 32 بايت، مع رفض مفاتيح Curve25519 غير القياسية، أو تلك التي تقع خارج المنحنى، أو ذات الرتب الصغيرة (1، 2، 4، 8). كما تقوم بإجراء فحوصات محلية لاشتقاق عنوان ADM قبل تخزين الرسائل مؤقتاً أو تشفيرها. تُرجع الدالة `getPublicKey()` سلسلة نصية فارغة دون إرسال طلب شبكة في حال كانت عناوين ADM غير صالحة، وتُرجع سلسلة فارغة دون إفساد ذاكرة التخزين المؤقت إذا أرجع العقدة مفتاحاً غير متطابق أو مشوهاً. تقوم `sendMessage()` بإعادة التحقق محلياً من مفاتيح المستلم التي تم حلها وترفض المفاتيح غير الصالحة أو غير المتطابقة بنتيجة `{success: false, errorMessage}`، بينما ترفض `voteForDelegate()` مفاتيح المندوب التي تفشل في ربط العنوان. يتم التحقق من `publicKeysCache` المدعومة بـ `Map` عند الكتابة والقراءة، وتكون ذاكرات التخزين المؤقت للمندوبين المعتمدة على الشبكة (`byAddress` و `byUsername`) معزولة لكل مثيل من `AdamantApi`.

## إصلاح KVS وفلتر الدردشة

أصبحت الدوال `getKVS()` و `getChatTransactions()` و `getChats()` و `getChatMessages()` تُصدر الآن أسماء فلاتر بسيطة، مما يؤدي إلى تسطيح أغلفة `and: { ... }` الصريحة، لتتوافق مع عقد ADAMANT Node بجميع إصداراتها. يتم رفض أغلفة `or` غير المدعومة ومفاتيح الفلتر المسبوقة بـ `and:` أو `or:` على نقاط النهاية التي تدعم `AND` فقط من جانب العميل بنتيجة `{success: false, errorMessage}` بدلاً من إرسال بادئات تتجاهلها العقد القديمة وترفضها عقد v0.11.0 وما بعدها. تم التحقق من ذلك باستخدام اختبار مسجل لنقطة النهاية `/api/states/get` على الشبكة الرئيسية.

## جاهزية العقد القابلة للاستخدام وفلترة المحمل (Loader)

يتم استبعاد العقد التي تبلغ عن `loader.loaded: false` أو `loader.syncing: true` من اختيار العقدة النشطة الأساسية وقوائم اتصال WebSocket، بينما تظل العقد القديمة التي لا تحتوي على كائن `loader` مؤهلة. يتم تعليق رد الاتصال `onReady` (و `api.isReady`) حتى يتم اختيار عقدة قابلة للاستخدام فعلياً، مع إعادة محاولة فحوصات بدء التشغيل بتأخير متزايد قدره 5 ثوانٍ، 10 ثوانٍ، 30 ثانية، و60 ثانية، والاستمرار في ذلك حتى في حال فشل عملية مسح سابقة، بدلاً من انتظار المسح الدوري الذي يستغرق 5 دقائق. عند التهيئة بالفعل وفشل جميع العقد الجاهزة أو انخفاضها عن `minVersion`، تعود حزمة SDK مع تحذير إلى عقدة متوافقة مع `minVersion` ومحملة ولكنها في حالة مزامنة، فقط عند توفر مرجع ارتفاع مزامن حديث خلال 10 دقائق وأن يكون المرشح ضمن 25 كتلة من ذلك الارتفاع. يتم منع رد الاتصال `onReady` من العمل مرتين في حال حدوث خطأ، ويتم تخطي الاستجابات غير الكائنية مثل صفحات صيانة HTML 200، أو `null`، أو حمولات الحالة غير المكتملة `{success: true}` بأمان.

## مواءمة ADAMANT Node v0.11.0 API و OpenAPI و KVS POST

تم نقل توليد DTO الخاص بـ API الحتمي (`scripts/sync-api-types.mjs`) من مستودع `Adamant-im/adamant-schema` المؤرشف إلى `Adamant-im/adamant` (ملف `openapi/specification/openapi.yaml` في إصدار v0.11.0 الرئيسي عند الالتزام `50568f37dc2b7da86f44991f96c40c8edde74d67`)، مع قراءة إصدارات الأدوات المثبتة بدقة عبر `createRequire`. تمت إعادة توليد `src/api/generated.ts` مع `RateLimitErrorResponseDto` و `GetKVSRequestBody` وروابط محدثة لـ `https://docs.adamant.im/`. تم مواءمة أنواع خيارات نقاط النهاية (`ChatroomsOptions` و `ChatTransactionsOptions` الجديدة و `KVSOptions`) مع التحقق الصارم من الفلاتر في ADAMANT Node v0.11.0، مع فرض `toHeight` على `/api/chats/get` و `/api/states/get` واستبعاد فلاتر الارتفاع/النطاق من `/api/chatrooms/*`. تم إهمال `ChatroomsOptions.userId` وإزالته في وقت التشغيل على `/api/chatrooms/*` مع تحذير إهمال مخصص لمرة واحدة حتى لا تفشل طلبات الاستدعاء القديمة في التحقق على عقد v0.11.0+. تمت إضافة دعم لـ `POST /api/states/get` عبر `api.getKVS(options, {method: 'POST'})` لاستعلامات `keyIds` أو `senderIds` الكبيرة، مع تجاوز فشل قراءة كامل متطابق مع `GET`.

## مرونة HTTP 429 وتعزيز تجاوز الفشل

تلتقط حزمة SDK الـ `targetNode` قبل كل طلب بحيث لا تؤدي الإخفاقات المتزامنة أبداً إلى إعادة `this.node` إلى عقدة فاشلة. عند استجابات HTTP 429 متعددة العقد، تتحول الحزمة فوراً إلى عقدة أخرى مخزنة مؤقتاً ومزامنة وغير محدودة المعدل دون تحقيقات إضافية لـ `/api/node/status`، وتتخطى عمليات مسح الصحة عند استجابات 429 لعقدة واحدة، وتعالج 429 في `checkNode()` بشكل متميز عن العقد غير المتصلة. يتم إلغاء تكرار عمليات مسح `updateNodes()` المتزامنة عبر وعد قيد التنفيذ، ويتم ترقية مسح مخطط قيد التنفيذ إلى تجاوز فشل قسري عندما يبلغ طلب عن عقدة فاشلة. تقوم حزمة SDK بالتدوير بعيداً عن `failedNode` عبر مجموعات العقد المزامنة المكونة من عقدتين أو أكثر، وتتتبع فترات التهدئة لـ 429 لكل عقدة (`rateLimitedUntil` بحد أقصى 60 ثانية) بحيث تتجنب عمليات مسح الصحة القسرية والمخطط لها العقد محدودة المعدل حتى انتهاء فترة التهدئة. تقوم الحزمة بتحليل ترويسات `Retry-After` (بالثواني أو بتنسيق تاريخ HTTP)، و `RateLimit-Reset`، و `RateLimit-Scope`، وتتجاوز الفشل فوراً للقراءات المتطابقة (`GET` و `POST /api/states/get`) عند وجود عقدة مزامنة أخرى، أو تلتزم بتأخير متزايد محدود مع تذبذب يصل إلى 10 ثوانٍ على عقدة واحدة دون الدخول في حلقة مفرغة. يتم عرض بيانات وصفية اختيارية لـ `status` و `retryAfterMs` و `rateLimitScope` في نتائج فشل HTTP 429 في `AdamantApiResult`، بينما تظل طلبات الكتابة `POST` غير مكررة بشكل صارم.

## تحديث أمان التبعيات وفترة حجر الإصدار لمدة 7 أيام

يفرض الإصدار `minimumReleaseAge: 10080` (7 أيام) وإعدادات `allowBuilds` صريحة (`'@parcel/watcher': false`, `esbuild: true`, `unrs-resolver: true`) في `pnpm-workspace.yaml` مع عدم وجود استثناءات لعمر الإصدار. تم تحديث التبعيات المباشرة وغير المباشرة لتتجاوز فترة الـ 7 أيام، بما في ذلك axios و bitcoinjs-lib و tiny-secp256k1 و pbkdf2 و socket.io-client و bip39 و ecpair و semver و @redocly/cli و eslint و jest و prettier و swagger-typescript-api، مما قلل نتائج تدقيق الإنتاج من 20 إلى 0. يتم النشر عبر GitHub Actions npm Trusted Publishing مع إثبات بناء.

## التحقق

تم التحقق من الإصدار على Node.js v24.19.0 و pnpm 11.13.1. تغطي مجموعة الاختبارات الكاملة (`pnpm test`) 20 مجموعة و 333 اختباراً مع تغطية وظيفية بنسبة 100%، وتم اجتياز `gts lint`. تتطابق فحوصات نوع API مع التزامات ADAMANT و adamant-wallets المشار إليها. تم اجتياز اختبارات توثيق TypeDoc و VitePress. تم اجتياز اختبارات الحزمة لـ ESM و CommonJS والمستهلكين المباشرين والمسارات الفرعية للحزمة وإعلانات TypeScript. يبلغ تقرير تدقيق الإنتاج عن 0 ثغرات أمنية، وتم التحقق من توقيعات جميع الحزم المقفلة البالغ عددها 893 حزمة.

### تغييرات جذرية

تقوم دالتا `encodeMessage()` و `decodeMessage()` الآن بطرح خطأ `invalid key` للمفاتيح غير القياسية، أو التي تقع خارج المنحنى، أو ذات الرتب الصغيرة (1، 2، 4، 8) من نوع Ed25519. مفاتيح الشبكة الرئيسية الشرعية غير متأثرة. تُرجع الدالة `getPublicKey()` سلسلة نصية فارغة دون طلب شبكة لعناوين ADM غير الصالحة، وتُرجع أيضاً سلسلة فارغة عندما لا يشتق مفتاح العقدة العنوان. ترفض الدالة `sendMessage()` هؤلاء المستلمين بنتيجة `{success: false, errorMessage}`، وترفض `voteForDelegate()` مفاتيح المندوب التي تفشل في ربط العنوان.

تؤدي تغييرات تضييق خيارات استعلام TypeScript إلى `ChatroomsOptions` و `KVSOptions` بحيث لم تعد ترث حقول `TransactionQueryParameters` غير المدعومة التي ترفضها ADAMANT Node v0.11.0. تستخدم الدالة `getChatTransactions()` الآن `ChatTransactionsOptions`، وهي مجموعة شاملة من `ChatroomsOptions` تحتفظ بـ `fromHeight` و `toHeight` و `inId` و `isIn`. تظل `TransactionQueryParameters` مُصدرة دون تغيير.

استدعاء `transformTransactionQuery(query, 'states' | 'chats' | 'chatrooms')` مباشرة مع غلاف `or` أو مفاتيح فلتر مسبوقة بـ `and:` أو `or:` يؤدي الآن إلى طرح `Error` مع رسالة `badParameter`، بينما تُرجع طرق عميل `AdamantApi` النتيجة `{success: false, errorMessage}`.

يتم فرض فلتر `toHeight` على `getKVS()` و `getChatTransactions()` فقط بواسطة ADAMANT Node v0.11.0+. تتجاهل العقد القديمة `toHeight` بصمت وتُرجع سجلات أحدث مع `success: true`، لذا يجب على المستدعين الذين يعتمدون على حد ارتفاع علوي تعيين `minVersion: '0.11.0'`.

تم إهمال حقل `userId` في `/api/chatrooms/*` ضمن `ChatroomsOptions` وإزالته في وقت التشغيل مع تحذير مخصص. يجب على المستدعين تمرير عنوان الحساب فقط كمعامل مسار URL لـ `getChats(address)` أو `getChatMessages(address1, address2)`.

مع `checkHealthAtStartup: true`، ينتظر `onReady` الآن ويبقى `api.isReady` في حالة `false` حتى يتم اختيار عقدة قابلة للاستخدام ومحملة وغير متزامنة، مع إعادة محاولة فحوصات بدء التشغيل بتأخير 5 ثوانٍ، 10 ثوانٍ، 30 ثانية، و60 ثانية.

تمت إضافة حقول اختيارية `status` و `retryAfterMs` و `rateLimitScope` إلى متغير `success: false` في `AdamantApiResult` عندما يفشل طلب بسبب HTTP 429.

تخطيط بايت المعاملات، والتجزئات، والمعرفات، والتوقيعات، والتشفير، واشتقاق المحفظة، والصادرات الجذرية لم تتغير.

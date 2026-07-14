---
title: "ADAMANT API JS Client v2.1.0"
slug: "release-adamant-api-jsclient-v2-1-0-131276047"
description: "الدالة api.initSocket() تقبل الآن مثيل WebSocketClient كوسيطة، مما يسمح بتهيئة المقبس مباشرة بدلاً من تعيينه إلى الخاصية api.socket."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v2.1.0"
publishedAt: "2023-11-23T18:06:17Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-api-jsclient"
tag: "v2.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:131276047"
locale: "ar"
placeholder: false
---

الآن تقبل الدالة `api.initSocket()` مثيلاً من `WebSocketClient` كوسيطة، مما يسمح لك بتهيئة المقبس مباشرة بدلاً من تعيينه إلى الخاصية `api.socket`.

```js
const socket = new WebSocketClient({ /* ... */ })

api.initSocket(socket)
// instead of
api.socket = socket
```

تم تحسين الدالتين `encodeMessage()` و`decodeMessage()` لقبول المفاتيح العامة كـ `Uint8Array` أو `Buffer`، مما يلغي الحاجة إلى تحويل المفاتيح العامة إلى سلاسل نصية.

```js
import {encodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const {publicKey} = createKeypairFromPassphrase('...')
const message = encodeMessage(,, publicKey) // No need to convert public key to string
```

بالإضافة إلى ذلك، تسمح `decodeMessage()` بتمرير زوج مفاتيح بدلاً من جملة المرور، مما يمنع الدالة من إنشاء زوج مفاتيح من جملة المرور بشكل متكرر.

```js
import {decodeMessage, createKeypairFromPassphrase} from 'adamant-api'

const keyPair = createKeypairFromPassphrase('...')
const message = decodeMessage(,, keyPair,) // <- It won't create a key pair from passphrase again
```

للمستخدمين من نوع TypeScript، أصبحت المكتبة الآن تُصدّر أدوات معالجة المعاملات مثل `SingleTransactionHandler` و`AnyTransactionHandler` و`TransactionHandler<T extends AnyTransaction>`.

كما تم حل العديد من المشكلات المتعلقة بـ TypeScript. تم إصلاح التصنيف الخاص بـ `AdamantApiOptions` بإضافة `LogLevelName` كقيمة ممكنة للخاصية `logLevel`، مما يمكّن من استخدام حروف سلسلية مثل `'log'` بدلاً من `LogLevel.Log`.

```ts
const api = new AdamantApi({ /* ... */ logLevel: 'log' })
```

تمت إضافة وحدات الإعلان المفقودة الخاصة بـ npm، مما يحل خطأ متعلقًا بعدم العثور على ملف إعلان لوحدة `coininfo`.

```
Could not find a declaration file for module 'coininfo'.
/// <reference path="../../types/coininfo.d.ts" />
```

وأخيرًا، أصبحت الخاصية `amount` في `ChatTransactionData` التي تستخدمها الدالة `createChatTransaction()` اختيارية بالفعل.

```diff
-  amount: number | undefined;
+  amount?: number;
```

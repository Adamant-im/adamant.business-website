---
title: "ADAMANT API JS Client v2.2.0"
slug: "release-adamant-api-jsclient-v2-2-0-134231741"
description: "يُقدِّم هذا الإصدار من عميل ADAMANT API JS مجموعة من وظائف التحقق التي يمكن تصديرها الآن من الحزمة."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v2.2.0"
publishedAt: "2023-12-17T19:51:54Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-api-jsclient"
tag: "v2.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:134231741"
locale: "ar"
placeholder: false
---

يُقدِّم هذا الإصدار من عميل ADAMANT API JS مجموعة من وظائف الأدوات المساعدة للتحقق يُمكن تصديرها الآن من الحزمة. تتيح هذه الأدوات للمطورين التحقق من عبارات المرور، وعناوين ADAMANT، والمفاتيح العامة، وأهداف التصويت، وأسماء المندوبين، ورسائل الدردشة برمجيًا، مما يمكّن من إجراء فحوصات أكثر أمانًا في وقت التشغيل داخل مشاريع TypeScript.

تشمل الوظائف المصدرة أدوات تأكيد النوع الخاصة بعبارات المرور، والعناوين، والمفاتيح العامة، وأسماء المندوبين، بالإضافة إلى وظائف مساعدة لتحويل كميات ADM إلى satoshis والتحقق من حُمولات الرسائل. وتعيد كل وظيفة من وظائف التحقق نتيجة ضيقة النوع عند الاقتضاء.

```ts
function isPassphrase(passphrase: unknown): passphrase is string;
function isAdmAddress(address: unknown): address is AdamantAddress;
function isAdmPublicKey(publicKey: unknown): publicKey is string;
function isAdmVoteForPublicKey(publicKey: unknown): publicKey is string;
function isAdmVoteForAddress(address: unknown): boolean;
function isAdmVoteForDelegateName(delegateName: unknown): delegateName is string;
function validateMessage(
  message: string,
  messageType: MessageType = MessageType.Chat
): { success: false, error: string } | { success: true };
function isDelegateName(name: unknown): name is string;
function admToSats(amount: number): number;
```

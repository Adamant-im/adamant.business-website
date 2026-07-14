---
title: "AIP-17: تفاعلات الرسائل على البلوكشين باستخدام ADAMANT Messenger"
slug: "unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
description: "مقترح تحسين ADAMANT 17 (AIP-17) يُقدّم تفاعلات بالرموز التعبيرية للرسائل في ADAMANT Messenger — ميزة لم تكن متوفرة سابقًا في أي تطبيق بلوكشين للمراسلة."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
publishedAt: "2023-09-15T10:09:07.924Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/857b07759524/001-0-tn1uulgukvtmgwym.webp"
cardSpan: "full"
originalId: "medium:857b07759524"
locale: "ar"
placeholder: false
---

مقترح تحسين ADAMANT 17 (AIP-17) يُقدّم تفاعلات بالرموز التعبيرية للرسائل في ADAMANT Messenger — ميزة لم تكن متوفرة سابقًا في أي تطبيق بلوكشين للمراسلة. يعرّف المقترح هيكلًا قياسيًا للتفاعلات يتماشى مع البنية التحتية الحالية للرسائل.

## كيف تعمل

تُرسل التفاعلات كرسائل غنية بـ ADM، وفقًا للاتفاقيات المُعتمدة في AIP-5 (رسائل المحتوى الغني). يُعرّف حقل إلزامي جديد، `reactto_id`، معرّف المعاملة الخاص بالرسالة التي يتم التفاعل معها. ويحمل الحقل الثاني، `react_message`، الرمز التعبيري الذي يختاره المستخدم. يمكن تعديل التفاعلات أو إزالتها بعد إنشائها.

تبدو حمولة التفاعل كما يلي:

```json
{
  "reactto_id": "Transaction_ID",
  "react_message": "👍"
}
```

وبما أن كل تفاعل هو في حد ذاته معاملة على البلوكشين تشير إلى معاملة أخرى عبر المعرّف، فإن هذا الأسلوب يحافظ على نموذج التدقيق واللامركزية القائم في ADAMANT، مع إضافة طبقة تعبيرية خفيفة فوق رسائل الدردشة القياسية.

من المتوقع أن يتم تطبيق هذه الميزة في تطبيقات ADAMANT عبر جميع المنصات. تتوفر مناقشة تقنية والمقترح الكامل على [صفحة مقترح AIP-17](https://github.com/Adamant-im/AIPs/issues/52).

![AIP-17: تفاعلات الرسائل على البلوكشين باستخدام ADAMANT Messenger](/images/engineering-notes/medium/857b07759524/002-1-zslip-kei08fk54o3-u34q-png.webp)

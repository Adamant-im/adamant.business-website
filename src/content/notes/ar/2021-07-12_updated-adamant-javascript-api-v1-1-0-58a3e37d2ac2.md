---
title: "واجهة برمجة تطبيقات ADAMANT لجافا سكريبت v1.1.0: توليد مفتاح Dash"
slug: "updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
description: "يمكن لواجهة برمجة تطبيقات ADAMANT لجافا سكريبت v1.1.0 توليد أزواج المفاتيح العامة والخاصة لـ Dash مباشرة من عبارة المرور الخاصة بحساب ADAMANT."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
publishedAt: "2021-07-12T13:40:09.723Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/58a3e37d2ac2/001-1-8sz81txq44zqzikay5wamw-png.webp"
cardSpan: "full"
originalId: "medium:58a3e37d2ac2"
locale: "ar"
placeholder: false
---

يمكن لواجهة برمجة تطبيقات ADAMANT لجافا سكريبت v1.1.0 توليد أزواج المفاتيح العامة والخاصة لـ Dash مباشرة من عبارة المرور الخاصة بحساب ADAMANT. ويُبسّط هذا الإجراء العمليات بين السلاسل من خلال استخلاص مفاتيح Dash من نفس الجملة التذكارية المستخدمة في حساب ADAMANT.

```js
const dashKeys = api.dash.keys(config.passPhrase);
```

معامل `passPhrase` هو عبارة المرور التذكارية المرتبطة بحساب ADAMANT. ويكون زوج المفتاح المسترجع جاهزًا للاستخدام مع واجهة برمجة تطبيقات Dash.

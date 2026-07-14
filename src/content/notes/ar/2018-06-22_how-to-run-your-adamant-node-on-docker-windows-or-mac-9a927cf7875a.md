---
title: "كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)"
slug: "how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
description: "ملاحظة: قد تكون صورة Docker قديمة؛ يُوصى بدلًا من ذلك بتشغيل عقدة ADAMANT على خادم Ubuntu. تستخدم ADAMANT إثبات الحصة المفوضة (dPoS) للتوافق في سلسلة الكتل..."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
publishedAt: "2018-06-22T15:46:46.729Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9a927cf7875a/001-0-fg4w7kswcdb2l5b0.webp"
cardSpan: "full"
originalId: "medium:9a927cf7875a"
locale: "ar"
placeholder: false
---

ملاحظة: قد تكون صورة Docker قديمة؛ يُوصى بدلًا من ذلك بتشغيل عقدة ADAMANT على خادم Ubuntu. تستخدم ADAMANT إثبات الحصة المفوضة (dPoS) للتوافق في سلسلة الكتل، ويساهم تشغيل عقدتك الخاصة في تعزيز اللامركزية الشبكية.

يشرح هذا الدليل كيفية تثبيت وتشغيل وتحديث عقدة ADAMANT على ويندوز أو macOS أو لينكس باستخدام Docker. المثال يستخدم ويندوز 10، والذي يتطلب إصدار 64 بت من ويندوز 10 برو أو إنتربرايز أو إديوكايشن (بناء 14393 أو أحدث). يجب أن تحتوي الجهاز المضيف على ما لا يقل عن 4 جيجابايت من الذاكرة العشوائية و50 جيجابايت من المساحة الحرة على القرص، حسب ارتفاع الكتلة الحالي.

لتثبيت Docker، قم بتنزيل إصدار Docker Community Edition المجاني وتشغيل المثبت. اتبع المعالج لقبول الترخيص والموافقة على المثبت باستخدام كلمة مرور نظامك، وهي مطلوبة لمكونات الشبكة وأجهزة Hyper-V الافتراضية. بعد التثبيت، ابدأ تشغيل Docker من قائمة البدء. بمجرد أن يصبح رمز الحوت في شريط الحالة ثابتًا، يكون Docker قيد التشغيل. يجب عليك أيضًا مشاركة محرك الأقراص المحلي مع Docker بالنقر بزر الماوس الأيمن على أيقونة شريط الحالة، واختيار الإعدادات، وتحديد مربع محرك الأقراص المشترك، ثم تطبيق التغييرات.

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/002-0-lyckrpled-5lr7hl.webp)

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/003-0-6akvfvvlkcfe7829.webp)

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/004-0-a86t6y8gjz9oxrpc.webp)

لتثبيت عقدة ADAMANT، قم أولاً بتثبيت عميل Git باستخدام الخيارات الافتراضية. افتح Microsoft PowerShell وقم بنسخ المستودع:

```bash
git clone https://github.com/Adamant-im/adamant-docker
cd adamant-docker
```

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/005-0-fgfme0jdbid9yncf.webp)

لتشغيل العقدة، قم بسحب صور Docker الضرورية:

```bash
docker-compose pull
```

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/006-0-aivqroqzrjyhguqd.webp)

ابدأ خدمة قاعدة البيانات وتحقق من أنها انطلقت بنجاح:

```bash
docker-compose up -d db
docker-compose logs
```

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/007-0-papyajoh0cxgai9i.webp)

بعد ذلك، ابدأ خدمة adamant-node وتحقق من السجلات لتأكيد الانطلاق الناجح:

```bash
docker-compose up -d adamant-node
```

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/008-0-5juodmupmzrre2n1.webp)

يمكنك إيقاف جميع الخدمات العاملة باستخدام `docker-compose stop` وإعادة تشغيلها لاحقًا باستخدام `docker-compose start`.

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/009-0-hrzlp4aniigch2fc.webp)

تحقق من التثبيت من خلال التحقق من سجل تطبيق العقدة:

```bash
docker-compose logs --tail=10 adamant-node
```

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/010-0-v8ofli8bjy-hqo2b.webp)

الوسيط `--tail=10` يحد من الناتج إلى آخر 10 أسطر من السجل. للتحقق من أن العقدة متصلة بشبكة ADAMANT، قم بزيارة أداة مراقبة شبكة ADAMANT وابحث عن عقدتك باستخدام عنوان IP الخاص بها. قد يستغرق ظهور العقدة بضع دقائق. ستُظهر العقدة المثبتة حديثًا ارتفاع كتلة قدره 1 أثناء التزامن، وهي عملية قد تستغرق حتى يوم كامل حسب اتصالك ووحدة المعالجة المركزية.

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/011-0-74skpvuswckotzf6.webp)

للتحقق من الارتفاع مباشرة، احصل على معرف الحاوية باستخدام `docker ps`، ثم قم باستعلام واجهة برمجة تطبيقات العقدة:

```bash
docker ps
docker exec <container_id> curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/012-0-osgtdu-u6daibuqi.webp)

عند اكتمال المزامنة، سيتطابق الارتفاع مع العقد الأخرى على الشبكة. لتحديث عقدة ADAMANT، افتح PowerShell وقم بتشغيل الأوامر التالية:

```bash
cd adamant-docker
docker-compose stop
docker-compose pull
docker-compose down
docker-compose up -d db
docker-compose up -d adamant-node
```

![كيفية تشغيل عقدة ADAMANT الخاصة بك على Docker (ويندوز أو ماك)](/images/engineering-notes/medium/9a927cf7875a/013-0-l5hbgju9qlgr65sw.webp)

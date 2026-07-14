---
title: "كيف تصبح وكيلًا في ADAMANT"
slug: "how-to-become-an-adamant-delegate-745f01d032f"
description: "تستخدم ADAMANT خوارزمية Delegated Proof of Stake (dPoS) مطورة تُعرف باسم Fair dPoS. لتصبح وكيلًا وتحفظ الكتل، يجب تشغيل عقدة ودفع رسوم تسجيل قدرها 3000 ADM وجمع أصوات كافية."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-become-an-adamant-delegate-745f01d032f"
publishedAt: "2018-06-30T10:11:25.366Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/745f01d032f/001-1-rprsczpnpydvk1y6ko-hzg-png.webp"
cardSpan: "full"
originalId: "medium:745f01d032f"
locale: "ar"
placeholder: false
---

تُحقق ADAMANT توافق الكتلة باستخدام خوارزمية مطورة لإثبات الحصة المُفوَّضة (Delegated Proof of Stake - dPoS) تُعرف باسم Fair dPoS. لتصبح وكيلًا وتحفظ الكتل، يجب تشغيل عقدة، ودفع رسوم تسجيل قدرها 3,000 ADM، وجمع أصوات كافية للوصول إلى قائمة أفضل 101 وكيل.

ابدأ بتثبيت وتشغيل عقدة ADAMANT. بمجرد أن تصبح العقدة نشطة، انتقل إلى مستخدم النظام `adamant` وثبّت أداة `adamant-console` من مستودعات npm.

```bash
su - adamant
npm i -g adamant-console
```

![كيف تصبح وكيلًا في ADAMANT](/images/engineering-notes/medium/745f01d032f/002-0-55iagwoakrbgkahj.webp)

بعد ذلك، أنشئ دليل التهيئة وانسخ ملف التهيئة الافتراضي إليه.

```bash
mkdir ~/.adm && cp /home/adamant/.nvm/versions/node/$(node -v)/lib/node_modules/adamant-console/config.default.json ~/.adm/config.json
```

![كيف تصبح وكيلًا في ADAMANT](/images/engineering-notes/medium/745f01d032f/003-1-5n-ejpboh-pf5plf-85-ug-png.webp)

عدّل ملف `~/.adm/config.json` الذي قمت بنسخه باستخدام محرر نصوص. غيّر معلمة `network` من `testnet` إلى `mainnet`، ثم أضف العبارة السرية (passphrase) الخاصة بالوكيل. احتفظ بالعبارة السرية سرًا، وتأكد من أن خادمك آمن. بديلًا، يمكنك حذف العبارة السرية من ملف التهيئة وتمريرها عبر علامة في سطر الأوامر أثناء التسجيل.

![كيف تصبح وكيلًا في ADAMANT](/images/engineering-notes/medium/745f01d032f/004-1-zwh5ys2uf2nnz04woxe3zw-png.webp)

افتح واجهة الأوامر عن طريق تشغيل `adm`. سجّل وكيلك بتنفيذ الأمر التالي، واستبدل `<new delegate name>` باسمك المفضل. يجب أن تحتوي المحفظة المرتبطة بعبارتك السرية على ما لا يقل عن 3,000 ADM لتغطية رسوم التسجيل، والتي تُوزع على الوكلاء الآخرين الذين يحفظون الكتل.

```bash
delegate new <new delegate name>
```

![كيف تصبح وكيلًا في ADAMANT](/images/engineering-notes/medium/745f01d032f/005-0-khyxu9qp9tk9nbzg.webp)

إذا لم تُحدد العبارة السرية في ملف التهيئة، أدرجها مباشرة في الأمر:

```bash
delegate new <new delegate name> --passPhrase "passphrase here"
```

![كيف تصبح وكيلًا في ADAMANT](/images/engineering-notes/medium/745f01d032f/006-0-fojjd-jrkr-jmvje.webp)

بعد التسجيل الناجح، اخرج من واجهة الأوامر بالضغط على `Ctrl+C` مرتين. لبدء الحفظ، عدّل ملف تهيئة العقدة الموجود في `~/adamant/config.json`. عيّن معلمة `forging/secret` لتكون عبارتك السرية المكونة من اثني عشر كلمة، محاطة بعلامات اقتباس، ثم أعد تشغيل العقدة.

```bash
nano ~/adamant/config.json
pm2 restart adamant
```

![كيف تصبح وكيلًا في ADAMANT](/images/engineering-notes/medium/745f01d032f/007-1-53boguojm1wx6sexqoa6yq-png.webp)

يمكنك التحقق من حالة وكيلك عن طريق زيارة ADAMANT Delegate Monitor والبحث عن اسم وكيلك. سيُحولك ذلك إلى صفحة تفاصيل تؤكد تسجيلك.

![كيف تصبح وكيلًا في ADAMANT](/images/engineering-notes/medium/745f01d032f/008-1-sq6rao5bjro6dpbpbiwqlq-png.webp)

![كيف تصبح وكيلًا في ADAMANT](/images/engineering-notes/medium/745f01d032f/009-1-xutdvsnjzh06yedz6uq1jg-png.webp)

لا يعني التسجيل وحده أن الحفظ قد بدأ؛ يجب أن تتلقى أصواتًا من مستخدمي ADAMANT عبر تطبيقات Messenger. بمجرد أن يجمع وكيلك أصواتًا كافية للدخول ضمن أفضل 101 وكيل، راقب أداؤه في ADAMANT Delegate Monitor. الدائرة الخضراء تشير إلى حفظ الكتل بنجاح، بينما الدوائر الرمادية أو الصفراء أو الحمراء تشير إلى مشكلات في التهيئة — غالبًا ما تكون العبارة السرية غير صحيحة في ملف تهيئة العقدة — أو توقف العقدة. حافظ على نشاط عقدتك، وتابع ترتيب وكيلك، وطبّق التحديثات الرئيسية عند الحاجة.

![كيف تصبح وكيلًا في ADAMANT](/images/engineering-notes/medium/745f01d032f/010-1-imaqsih3o-uz-q2rggmia-png.webp)

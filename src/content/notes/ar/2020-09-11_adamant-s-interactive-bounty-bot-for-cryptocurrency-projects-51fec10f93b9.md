---
title: "ADAMANT Bounty Bot: حملات تفاعلية مع مدفوعات عملات رقمية تلقائية"
slug: "adamant-s-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
description: "أداة مفتوحة المصدر تُمكّن مشاريع العملات الرقمية من إدارة حملات المكافآت وتوزيع الرموز عبر الدردشة في ADAMANT Messenger تلقائيًا."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamants-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
publishedAt: "2020-09-11T08:11:44.041Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/51fec10f93b9/001-1-gjb4fgnplpza3buymtpy6w-png.webp"
cardSpan: "full"
originalId: "medium:51fec10f93b9"
locale: "ar"
placeholder: false
---

يُعد ADAMANT Bounty Bot أداة مفتوحة المصدر مصممة لمشاريع العملات الرقمية لتشغيل حملات المكافآت وتوزيع الرموز (Airdrops) بشكل تفاعلي من خلال الدردشة في ADAMANT Messenger. ويقوم هذا البوت بأتمتة التحقق من المهام والمدفوعات، مما يلغي الحاجة إلى مدير مخصص لحملات المكافآت ويقلل من التأخير في صرف المكافآت للمشاركين.

### لماذا بوت مكافآت مخصص

تعتمد حملات المكافآت التقليدية على مديرين يقومون بنشر الشروط على منتديات مثل Bitcointalk ويتحققون يدويًا من التزام المشاركين في نهاية الحملة. هذه الطريقة غير مريحة للمستخدمين وتكلف مالك المشروع الكثير. يُحسّن ADAMANT Bounty Bot هذه العملية: حيث يتفاعل المشاركون مباشرة مع البوت عبر الدردشة، ويتحقق البوت تلقائيًا من إنجاز المهام، ثم تُدفع المكافآت فورًا بعملات ADM أو ETH أو رموز ERC-20.

حاليًا، يدعم البوت حملات تويتر (مثل متابعة حسابات، وإعادة التغريد مع تعليق، وذكر أصدقاء، واستخدام وسوم) وكذلك حملات الإحالة في ADAMANT حيث يقوم المستخدمون بدعوة آخرين للانضمام. يمكن المساهمون بإضافة دعم لشبكات اجتماعية إضافية نظرًا لأن البوت مفتوح المصدر.

### كيف يعمل

يعمل البوت باستمرار على خادم. بعد التثبيت، تقوم بتكوين إعدادات الحملة مثل الحسابات على تويتر التي يجب على المشاركين متابعتها، والتغريدة التي يجب إعادة تغريدها، والمحتوى المطلوب في التعليق. يتتبع البوت رسائل المستخدمين، ويتحقق من إكمال المهام، ويدفع المكافآت، ويجمع الإحصائيات. كما يكتشف الحسابات المكررة على وسائل التواصل الاجتماعي لمنع مستخدم واحد من المطالبة بالمكافأة أكثر من مرة.

### المتطلبات

يتطلب تشغيل البوت مهارات أساسية في نظام لينكس وبيئة Node.js. المتطلبات من الخادم بسيطة جدًا — أي خادم افتراضي (VPS) بنظام Ubuntu كافٍ (مثل Digital Ocean، Ramnode، Scaleway، Hetzner). تثبيت عقدة ADAMANT كاملة أمر اختياري لكنه موصى به على الأجهزة التي تمتلك أكثر من 40 جيجابايت من المساحة و1 جيجابايت من الذاكرة العشوائية لدعم اللامركزية. ستحتاج أيضًا إلى محفظة ADAMANT للبوت، ومحافظ عملات رقمية مموَّلة لصرف المكافآت (لاحظ أن رسوم تحويل الرموز ERC-20 تُدفع بعملة ETH، لذا يجب شحن محفظة ETH الخاصة بالبوت أيضًا)، ومفاتيح واجهة برمجة تطبيقات تويتر (Twitter API keys) إذا كنت تُشغّل حملات على تويتر، بالإضافة إلى تثبيت MongoDB على الخادم.

### الأوامر

يستجيب البوت لعدة أوامر من المستخدمين والإداريين. يمكن للمستخدمين إرسال `/help` للحصول على معلومات عن الحملة، و`/rates` للحصول على أسعار العملات في السوق، و`/calc` لتحويل القيم بين العملات الرقمية. يمكن للإداريين استخدام `/balances` للتحقق من أرصدة محافظ البوت، و`/test` لتشغيل التشخيص مثل `/test twitterapi`.

### التثبيت

يجب تثبيت البوت ضمن مستخدم `adamant`. إذا كنت قد قمت سابقًا بتثبيت عقدة ADAMANT، فهذا المستخدم موجود بالفعل. قم بنسخ المستودع وتثبيت التبعيات:

```bash
su - adamant
git clone https://github.com/Adamant-im/adamant-bountybot.git
cd ./adamant-bountybot
npm i
```

### التهيئة

افتح ملف `config.json` باستخدام محرر نصوص. تُسرد أدناه أهم المعايير التي يجب تعيينها.

**`passPhrase`** — العبارة السرية (Seed Phrase) لحساب البوت في شبكة ADM. يجب دائمًا إنشاء حساب جديد للبوت بدلًا من إعادة استخدام حساب موجود.

```json
"passPhrase": "scatter tomato doctor also stay tell success pause gift clip hungry october",
```

**`twitter_follow`** — الحسابات على تويتر التي يجب على المشاركين متابعتها لكسب المكافآت. اتركه كمصفوفة فارغة لإيقاف هذه الميزة.

```json
"twitter_follow": [
  "@adamant_im",
  "@BitZ_Group"
],
```

**`twitter_retweet_w_comment`** — يحدد التغريدة التي يجب إعادة تغريدها مع تعليق. يُحدد `min_mentions` عدد الأصدقاء الذين يجب ذكرهم، ويُحدد `hashtags` الوسوم المطلوبة. اتركه كمصفوفة فارغة لإيقاف هذه الميزة.

```json
"twitter_retweet_w_comment": [
  {
    "tweet": "https://twitter.com/adamant_im/status/1272945640574722048",
    "min_mentions": 3,
    "hashtags": [
      "#privacy",
      "#decentralization"
    ]
  }
],
```

**`adamant_campaign`** — يحدد عدد المستخدمين الجدد الذين يجب على المشارك دعوتهم إلى ADAMANT (`min_contacts`). يُحتسب المستخدم المُحال إذا كانت رسالته الأولى لا تزيد عمرها عن ثلاثة أيام، وتم إرسالها إلى مشارك في الحملة. عيّن القيمة `0` لإيقاف هذه الحملة.

```json
"adamant_campaign": {
  "min_contacts": 3
},
```

**`rewards`** — يحدد كميات المكافآت والعملات لكل مستخدم يُكمل جميع المهام.

```json
"rewards": [
  {
    "currency": "ADM",
    "amount": 100
  },
  {
    "currency": "ETH",
    "amount": 0.01
  }
],
```

**`twitter_api`** — بيانات اعتماد واجهة برمجة تطبيقات تويتر (Twitter API) من بوابة مطوري تويتر. اتركه فارغًا إذا لم تكن تُشغّل حملة على تويتر.

```json
"twitter_api": {
  "consumer_key": "jsoQSRzVYWTUE88t",
  "consumer_secret": "6l7w0vqHCEIkmjbdR8ubTxzhJZRk1JUlSUonu5",
  "access_token_key": "86823450088-il17SnfGmxQCYW9bAGAnFB2aW4",
  "access_token_secret": "W0k1armrFUL8ATzJwAJ2x9yuxojKIEtRaphT"
},
```

**`admin_accounts`** — عنوانك الشخصي بعملة ADM كي يقبل البوت الأوامر الإدارية منك. يجب أن يختلف هذا عن عنوان البوت نفسه.

```json
"admin_accounts": [
  "U14818108337685946763"
],
```

**`welcome_string`** و **`help_message`** — نص الترحيب والمساعدة الذي يُعرض للمستخدمين. كلا الحقلين يدعمان تنسيق Markdown ويمكنهما الإشارة إلى متغيرات التهيئة (مثل `${config.rewards_list}`، `${config.twitter_follow_list}`).

**`adamant_notify`** و **`slack`** — قنوات إشعارات اختيارية لكن يُوصى باستخدامها. إذا كنت تستخدم إشعارات ADAMANT، فحدد عنوانًا مختلفًا عن `admin_accounts`.

```json
"adamant_notify": "U48110833768594688888",
"slack": "https://hooks.slack.com/services/T7YUJW/LKHHD/rDKFJZ94FOhbkn49eOfq",
```

### تشغيل البوت

استخدم مدير العمليات pm2 لتشغيل البوت. إذا كنت قد قمت بتثبيت عقدة ADAMANT من قبل، فإن pm2 مثبت بالفعل؛ وإلا قم بتثبيته باستخدام الأمر `sudo npm install -g pm2`.

```bash
pm2 start --name bountybot app.js
```

تحقق من السجلات إذا لم يستجب البوت للرسائل:

```bash
pm2 logs bountybot
```

لضمان إعادة تشغيل البوت بعد إعادة تشغيل الجهاز، أضف إدخالًا في cron:

```bash
crontab -e
```

أضف السطر التالي ثم احفظ:

```
@reboot cd /home/adamant/adamant-bountybot && pm2 start --name bountybot app.js
```

![ADAMANT's interactive Bounty bot for cryptocurrency projects](/images/engineering-notes/medium/51fec10f93b9/002-0-turkg-jxhihlqu39.webp)

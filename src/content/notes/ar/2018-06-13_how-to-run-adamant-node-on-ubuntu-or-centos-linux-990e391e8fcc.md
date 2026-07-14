---
title: "تشغيل عقدة ADAMANT على Ubuntu أو CentOS Linux"
slug: "how-to-run-adamant-node-on-ubuntu-or-centos-linux-990e391e8fcc"
description: "دليل لتثبيت عقدة ADAMANT على أنظمة Linux مثل Ubuntu وCentOS، مع تعليمات للتثبيت السريع واليدوي والتحقق من التشغيل."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-your-adamant-node-on-ubuntu-990e391e8fcc"
publishedAt: "2018-06-13T08:17:00.719Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/990e391e8fcc/001-1-ere-rzan0-vcmaaj97qubg-jpeg.webp"
cardSpan: "full"
originalId: "medium:990e391e8fcc"
locale: "ar"
placeholder: false
---

## نظرة عامة

تستخدم ADAMANT تقنية Fair dPoS (إثبات الحصة المفوضة العادل) للتوافق على سلسلة الكتل. يُعزز تشغيل عقدتك الخاصة من اللامركزية الشبكية وتمكّنك من التعدين كمفوّض. يغطي هذا الدليل التثبيت على Ubuntu 20–24 (المفضّل) أو CentOS 8، مع إمكانية العمل على أنظمة Linux أخرى.

تتطلب العملية خادمًا أو خادمًا افتراضيًا (VPS) بذاكرة وصول عشوائي لا تقل عن 2 جيجابايت ومساحة قرص 70 جيجابايت (اعتبارًا من أكتوبر 2025 للشبكة الرئيسية).

## التثبيت السريع

لإعداد أول مرة، قم بتشغيل نص التثبيت بصلاحيات sudo. يقوم هذا النص بتحديث حزم النظام، وإنشاء مستخدم نظام `adamant`، وتثبيت PostgreSQL وNode.js واعتمادات أخرى، وإعداد عقدة ADAMANT، وتحميل صورة سلسلة الكتل اختياريًا. وسيتم مطالبتك بتعيين كلمات مرور لكل من قاعدة البيانات ومستخدمي النظام.

**أوبونتو:**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)"
```

**سنتوس:**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh)
```

![كيفية تشغيل عقدة ADAMANT على Ubuntu أو CentOS Linux](/images/engineering-notes/medium/990e391e8fcc/002-1-xzbcago0snmqw09cignfyq-png.webp)

استخدم أداة `screen` لضمان اكتمال التثبيت حتى في حال انقطاع اتصال SSH. تستغرق العملية عادةً من 10 إلى 20 دقيقة.

للشبكة التجريبية، أضف الأعلام المناسبة:

**أوبونتو:**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)" -O -b dev -n testnet -j jod
```

**سنتوس:**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh) -b dev -n testnet -j jod
```

## التثبيت اليدوي (Ubuntu)

تُنفّذ هذه الخطوات على Ubuntu. أما على CentOS، فاستخدم الأوامر المكافئة أو النص السريع أعلاه.

### إعداد النظام

حدّث النظام وثبّت أدوات البناء وgit وRedis:

```
sudo apt update && sudo apt upgrade -y
sudo apt-get install -y build-essential curl automake autoconf libtool rpl mc git redis-server
```

### إعداد PostgreSQL

أضف مستودع PostgreSQL وثبّته:

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt update && sudo apt install -y postgresql postgresql-contrib libpq-dev
```

أنشئ مستخدم قاعدة البيانات وقاعدة البيانات. استخدم كلمة مرور قوية بدلًا من المثال أدناه:

```
su postgres -c psql
CREATE ROLE adamant LOGIN PASSWORD 'HardPass111';
CREATE DATABASE adamant_main;
ALTER DATABASE adamant_main OWNER TO adamant;
\q
```

### إنشاء مستخدم النظام

```
adduser adamant
sudo usermod -aG sudo adamant
su - adamant
```

### تثبيت Node.js وPM2

ثبّت nvm، ثم Node.js LTS (Hydrogen/v18)، ثم PM2 كمدير عمليات:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

سجّل الخروج ثم الدخول مجددًا لتفعيل nvm، ثم:

```
nvm i --lts=hydrogen
npm install -g pm2
```

### استنساخ وتخصيص ADAMANT

```
git clone https://github.com/Adamant-im/adamant
cd adamant
npm i
cp default.config.json config.json
nano config.json
```

في ملف `config.json`، عيّن كلمة مرور قاعدة البيانات لتتطابق مع ما أنشأته مسبقًا. عيّن `api/access/public` إلى `true` إذا أردت تمكين الوصول الخارجي للواجهة البرمجية (API) (مما يفعّل خادم ويب لاستدعاءات API). عيّن `consoleLogLevel` إلى `error` للحصول على سجلات أنظف.

### اختياري: صورة سلسلة الكتل

تحميل صورة مبنية مسبقًا لسلسلة الكتل يوفر وقت المزامنة، لكنه يتطلب الثقة في المصدر. تجنبها يعني التحقق الكامل من كل معاملة، وهي عملية تستغرق عدة أيام لكنها تثبت اتساق السلسلة.

```
pm2 stop adamant
wget https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql adamant_main < db_backup.sql
```

إذا سبق لك تسجيل عقدة باستخدام هذه قاعدة البيانات، فاحذفها وأعد إنشاءها أولًا باستخدام `dropdb` و`createdb`.

## التشغيل والتحقق

ابدأ العقدة باستخدام PM2، الذي يُنشئ عملية فرعية في الخلفية ويعيد التشغيل تلقائيًا عند حدوث فشل:

```
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

تحقق من الحالة باستخدام `pm2 show adamant` — يجب أن تكون الحالة `online`. اسأل عن ارتفاع سلسلة الكتل:

```
curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

عند البدء، يكون الارتفاع `1` ويزداد تدريجيًا أثناء مزامنة العقدة. عند اكتمال المزامنة، يتطابق الارتفاع مع العقد الأخرى في الشبكة. تحقق من السجلات باستخدام `pm2 logs adamant` في حال حدوث مشكلات. يمكنك أيضًا التحقق من ظهور عقدتك في مراقب شبكة ADAMANT بالبحث عن عنوان IP الخاص بك.

## تمكين الواجهة البرمجية العامة (Public API)

تتيح الواجهة البرمجية العامة لتطبيقات ADAMANT Messenger الاتصال بعقدتك. تكون الواجهة البرمجية الداخلية (localhost) مفعلة افتراضيًا. لتمكين الوصول الخارجي، عيّن `api/access/public` إلى `true` في ملف `config.json`، ثم أعد التشغيل:

```
pm2 restart adamant
```

تحقق من ذلك عن طريق فتح الرابط `http://<IP>:36666/api/blocks/getHeight` في متصفحك.

## الإيقاف والتحديث

أوقف العقدة باستخدام `pm2 stop adamant`. لتحديث العقدة:

```
su - adamant
cd adamant
pm2 stop adamant
git pull
npm update
pm2 restart adamant
```

## التشغيل التلقائي عند إعادة التشغيل

أضف إدخالًا في crontab كمستخدم `adamant` لكي تعيد العقدة التشغيل بعد إعادة تشغيل الخادم الافتراضي:

```
crontab -e
```

```
@reboot cd /home/adamant/adamant && pm2 start --name adamant app.js
```

بديلًا، توفر أوامر `pm2 save` و`pm2 startup` آلية تشغيل تلقائي أكثر موثوقية.

## الاسترداد

إذا فقدت العقدة مزامنتها وأعادت التشغيل من الارتفاع 0 — وعادةً بسبب أخطاء في العتاد أو نقص مساحة القرص — استخدم نص الاسترداد لاستعادة الصورة من صورة سلسلة الكتل. يكون هذا مفيدًا بوجه خاص للمفوّضين الذين يقومون بالتعدين ويرغبون في العودة للعمل بسرعة:

```
sudo bash -c "$(wget -O - https://adamant.im/fix_node.sh)" -O -n mainnet
```

بديلًا، اتبع خطوات الاسترداد اليدوية الموضحة أعلاه لتحميل صورة سلسلة الكتل.

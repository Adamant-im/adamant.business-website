---
title: "كيفية تثبيت عقدة ADAMANT على نظام macOS"
slug: "how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
description: "يغطي هذا الدليل تثبيت وتشغيل عقدة بلوكشين ADAMANT Messenger من الصفر على نظام macOS، بما في ذلك أدوات التطوير وPostgreSQL وNode.js."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
publishedAt: "2025-06-08T16:04:37.394Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/cfdcb9434b9a/001-1-v00ichfaftdwhvumrvfkxq-png.webp"
cardSpan: "full"
originalId: "medium:cfdcb9434b9a"
locale: "ar"
placeholder: false
---

يغطي هذا الدليل تثبيت وتشغيل **عقدة بلوكشين ADAMANT Messenger** من الصفر على نظام **macOS**، بما في ذلك أدوات التطوير، وPostgreSQL، وNode.js، وتكوين التشغيل التلقائي بعد إعادة التشغيل.

تم الاختبار على نظام macOS 13 Ventura والإصدارات الأحدث. نوع العقدة: `mainnet` أو `testnet`. الوقت المطلوب: ~15–30 دقيقة.

تشغيل عقدة ADAMANT يدعم بلوكشين لا مركزي بالكامل ويركّز على الخصوصية، ويعمل على تقوية الشبكة، ويوفّر وصولاً مباشراً إلى بيانات البلوكشين، ويتيح مكافآت dPoS إذا أصبحت مُصدِّقًا/مفوَّضًا.

### المتطلبات المسبقة

أنت بحاجة إلى جهاز Mac بنظام macOS 13 (Ventura) أو أحدث، وحساب مستخدم مسؤول، واتصال إنترنت مستقر، وحوالي 50 غيغابايت من المساحة الحرة على القرص، وخبرة أساسية في استخدام Terminal. افتح Terminal بالضغط على `Cmd + Space`، واكتب `Terminal`، ثم اضغط Enter.

### تثبيت أدوات سطر أوامر Apple

تُعد أدوات المطور من Apple ضرورية لترجمة الأكواد واستخدام Git:

```bash
xcode-select --install
```

ستظهر لك نافذة منبثقة تطلب تأكيد التثبيت. وافق وانتظر حتى الانتهاء.

### تثبيت Homebrew

يُعد Homebrew مدير حزم لأنظمة macOS ويُستخدم لتثبيت PostgreSQL وغيرها من التبعيات:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

![كيفية تثبيت عقدة ADAMANT على نظام macOS](/images/engineering-notes/medium/cfdcb9434b9a/002-1-vp1mtcppml-dgtygq6vb9q-png.webp)

أكّد بالضغط على مفتاح *Enter*. بعد التثبيت، اتبع التعليمات المطبوعة في قسم "Next steps" (عادةً إضافة Homebrew إلى ملف تهيئة shell مثل `~/.zprofile` أو `~/.bash_profile`). أعد تحميل shell:

```bash
source ~/.zprofile  # or ~/.bash_profile depending on your shell
```

### تثبيت الحزم المطلوبة

قم بتثبيت PostgreSQL وRedis وGit والأدوات الضرورية الأخرى:

```bash
brew install postgresql redis git make automake autoconf libtool jq htop
```

ابدأ وفعّل PostgreSQL وRedis:

```bash
brew services start postgresql
brew services start redis
```

### إعداد قاعدة بيانات PostgreSQL

أنشئ مستخدمًا وقاعدة بيانات في PostgreSQL لـ ADAMANT:

```bash
# Customize these as needed
DB_USER=adamant
DB_NAME=adamant_main
DB_PASSWORD=securepassword

psql postgres -c "CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASSWORD';"
psql postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
```

### تثبيت NVM وNode.js

قم بتثبيت Node Version Manager (NVM) وNode.js 22 LTS (اسم الرمز Jod):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
```

ثبّت *pm2* (مدير عمليات Node.js):

```bash
npm install -g pm2
```

قم بتهيئة *pm2* لتدوير السجلات (اختياري لكنه موصى به):

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 500M
pm2 set pm2-logrotate:retain 5
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:rotateInterval '0 0 0 1 *'
```

### استنساخ وإعداد عقدة ADAMANT

لتنظيم الإعداد، استخدم دليل `~/Applications` (مجلد شخصي في دليل المنزل الخاص بك، وليس `/Applications` النظامي):

```bash
mkdir -p ~/Applications
cd ~/Applications
```

استنسخ مستودع ADAMANT من GitHub:

```bash
# Customize these as needed
NETWORK=mainnet   # or testnet
BRANCH=master     # or desired Git branch

git clone https://github.com/Adamant-im/adamant --branch $BRANCH
cd adamant
npm install
```

![كيفية تثبيت عقدة ADAMANT على نظام macOS](/images/engineering-notes/medium/cfdcb9434b9a/003-1-rtjskr-1lfxqntzxxg2h-q-png.webp)

عيّن ملف تهيئة عقدة ADM:

```bash
cp config.default.json config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" config.json
```

هذا ينسخ التهيئة الافتراضية إلى ملفك الخاص ويُدخل كلمة المرور الخاصة بقاعدة البيانات التي حددتها سابقًا. يمكنك أيضًا تعديل التهيئة يدويًا باستخدام `nano config.json`.

لعقدة **testnet**، استخدم هذه الأوامر بدلًا من ذلك:

```bash
cp test/config.default.json test/config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" test/config.json
```

### تنزيل لقطة البلوكشين (اختياري، للـ mainnet فقط)

إذا كنت ترغب في دعم اللامركزية الكاملة، تخطّ هذه الخطوة. خلاف ذلك، فإن تنزيل لقطة يسرّع عملية مزامنة البلوكشين بشكل كبير:

```bash
curl -O https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql $DB_NAME < db_backup.sql
rm db_backup.sql
```

قد تستغرق هذه العملية ما يصل إلى 20 دقيقة، لكنها توفر حوالي أسبوع من وقت المزامنة.

### تشغيل عقدة ADM

أوّلًا، شغّل العقدة مؤقتًا في Terminal للتحقق من أن كل شيء يعمل:

```bash
node app.js
```

إذا نجح الأمر، ستظهر لك مخرجات البدء ومزامنة البلوكشين مع ازدياد ارتفاع العقدة:

![كيفية تثبيت عقدة ADAMANT على نظام macOS](/images/engineering-notes/medium/cfdcb9434b9a/004-1-fclr7waeepraklxpmforsg-png.webp)

![كيفية تثبيت عقدة ADAMANT على نظام macOS](/images/engineering-notes/medium/cfdcb9434b9a/005-1-cewqr7pjxjoxwgic-kw4cg-png.webp)

أوقف العقدة باستخدام `Ctrl + C`، ثم ابدأها باستخدام *pm2* لكي تستمر بعد إغلاق Terminal:

```shell
# Mainnet
pm2 start --name adamant app.js

# Or, for testnet
# pm2 start --name adamanttest app.js -- --config test/config.json --genesis test/genesisBlock.json
```

![كيفية تثبيت عقدة ADAMANT على نظام macOS](/images/engineering-notes/medium/cfdcb9434b9a/006-1-yamwpxe0isnydfrzhcujg-png.webp)

احفظ قائمة عمليات *pm2*:

```bash
pm2 save
```

تحقق من أنها تعمل:

```bash
pm2 logs adamant
```

![كيفية تثبيت عقدة ADAMANT على نظام macOS](/images/engineering-notes/medium/cfdcb9434b9a/007-1-d8em6reqerk-q53fjdwb-q-png.webp)

### إعادة تشغيل العقدة بعد إعادة تشغيل macOS

لإعادة تشغيل عقدة ADAMANT تلقائيًا بعد إعادة تشغيل جهاز Mac، لديك خياران.

**الخيار 1: التشغيل اليدوي بعد إعادة التشغيل.** في كل مرة يُعاد تشغيل جهاز Mac، قم بتشغيل:

```bash
source ~/.nvm/nvm.sh
pm2 resurrect
```

يمكنك أتمتة هذا عن طريق إضافة الأسطر إلى ملف تهيئة shell (مثل `~/.zprofile`):

```bash
echo 'source ~/.nvm/nvm.sh && pm2 resurrect' >> ~/.zprofile
```

**الخيار 2: التشغيل التلقائي باستخدام `pm2 startup`.** قد لا يعمل أمر *pm2 startup* بسلاسة مع حماية سلامة النظام في macOS (SIP). بدلًا من ذلك، أنشئ خدمة `launchd`:

```bash
pm2 startup launchd
```

يُنتج هذا أمرًا مثل `sudo env PATH=$PATH:/Users/youruser/.nvm/versions/node/vXX.X.X/bin pm2 startup launchd -u youruser — hp /Users/youruser`. قم بتشغيله في Terminal، ثم احفظ قائمة عمليات pm2:

```bash
pm2 save
```

ستعيد *pm2* الآن تشغيل عقدة ADAMANT تلقائيًا عند التشغيل. لإلغاء هذا لاحقًا، قم بتشغيل `pm2 unstartup launchd`.

### التحقق من التثبيت

تحقق من حالة العملية:

```bash
pm2 show adamant
```

تحقق من ارتفاع كتلة العقدة:

```bash
curl http://localhost:36666/api/blocks/getHeight
```

احصل على حالة العقدة:

```bash
curl http://localhost:36666/api/node/status
```

الاستجابة التي تحتوي على `"syncing":true` تعني أن العقدة لم تُزامَن بعد بالكامل. انتظر حتى تكتمل مزامنة البلوكشين بالكامل. استخدام لقطة بلوكشين يجعل هذه العملية أسرع بكثير.

للمزيد من المعلومات، راجع [وثائق عقدة ADAMANT](https://docs.adamant.im/).

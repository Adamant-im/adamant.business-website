---
title: "ADAMANT Console v2.2.0"
slug: "release-adamant-console-v2-2-0-142293299"
description: "تم تحديث الويكي ليعكس أحدث التغييرات. تم تحديث التبعيات إلى إصداراتها الحالية. أُعيد كتابة قاعدة الكود لاستخدام وحدات ES (.mjs) لدعم المكتبات الحديثة."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.2.0"
publishedAt: "2024-02-16T09:24:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v2.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:142293299"
locale: "ar"
placeholder: false
---

تم تحديث الويكي ليعكس أحدث التغييرات. تم تحديث التبعيات إلى إصداراتها الحالية. أُعيد كتابة قاعدة الكود لاستخدام وحدات ES (.mjs) لدعم المكتبات الحديثة. تم إضافة Prettier لتنسيق الكود.

### التغييرات المُدخلة

لقد تغير تنسيق ملف التكوين. تم إعادة تسمية المفتاح `passPhrase` في ملف التكوين إلى `passphrase`. تم إعادة تسمية ملفات التكوين `config.json` و`config.default.json` إلى `config.jsonc` و`config.default.jsonc` على التوالي. يستخدم استجابة الأمر `account new` الآن `passphrase` بدلاً من `passPhrase`. تم إعادة تسمية علامة سطر الأوامر `--passPhrase` إلى `--passphrase`، لذا يجب الآن استخدام `adm --passphrase=""` بدلاً من `adm --passPhrase=""`.

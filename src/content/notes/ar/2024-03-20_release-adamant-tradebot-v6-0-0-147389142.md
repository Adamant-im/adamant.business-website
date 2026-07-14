---
title: "ADAMANT Tradebot v6.0.0"
slug: "release-adamant-tradebot-v6-0-0-147389142"
description: "يُقدّم هذا الإصدار إعادة هيكلة كبيرة لـ ADAMANT Tradebot، وتجميع تهيئة البورصات في ملف واحد، مع تحسينات على وحدة مراقبة السعر ووظائف الإحصاءات."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0"
publishedAt: "2024-03-20T08:46:40Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:147389142"
locale: "ar"
placeholder: false
---

يُقدّم هذا الإصدار إعادة هيكلة كبيرة عبر ADAMANT Tradebot، حيث تم تجميع تهيئة البورصات في ملف واحد هو `tradeParams_Default.js` المستخدم لجميع البورصات. تم تحديث وظائف `getSmartPrice()` و `getCleanPrice()`، إلى جانب وظيفة `isOrderOutOfPriceWatcherRange()`. كما تمت إضافة وظائف مساعدة إضافية لدعم هذه التغييرات.

تم تحسين وحدة مراقبة السعر، وهي الآن تدعم إجراء `prevent`. ويتم عرض تقدير الحجم الآن عند تحديث الكمية أو الفاصل الزمني. يُوفّر الأمر `/stats` معلومات موسّعة، ويمكن للأمر `/info` استرجاع معلومات سحب العملة والشبكات. كما تم توسيع معلومات الأرصدة.

يُوفّر الأمر `/account` الآن معلومات حول رسوم التداول والحجم. يقوم البوت بجمع معلومات ملء الطلبات لجميع الطلبات، وتم تحسين وحدة بناء سجل الطلبات الديناميكي. بعد وضع طلب صناعة السوق، يتحقق البوت مما إذا تم ملء الطلب. كما تم تحسين وظيفة `getMinOrderAmount()`.

تمت إضافة دعم لتبادل XeggeX. تم تحديث وصلات التكامل مع البورصات Azbit و Coinstore و FameEX و NonKYC و P2B و StakeCube. يتضمّن الإصدار أيضًا تحسينات متنوعة، وإصلاحات للأخطاء، وتحديثات للحزم التابعة (dependencies).

---
title: "برنامج ADAMANT للتداول الآلي v9.0.0 متاح الآن"
slug: "discussion-59-adamant-market-making-software-v9-0-0-is-live-10356902"
description: "الإصدار الأول من برنامج التداول الآلي مفتوح المصدر من ADAMANT متاح الآن. يتم تشغيله ذاتيًا باستخدام حسابك الخاص على البورصة ومفاتيحك الخاصة."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/59"
publishedAt: "2026-07-02T06:58:44Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10356902"
locale: "ar"
placeholder: false
---

# برنامج ADAMANT للتداول الآلي v9.0.0 متاح الآن

الإصدار الأول من توزيع برنامج التداول الآلي مفتوح المصدر من ADAMANT متاح الآن. يتم تشغيله ذاتيًا: يمكنك تشغيله على حسابك الخاص في البورصة باستخدام مفاتيحك الخاصة، دون الحاجة إلى أي طرف ثالث للإيداع.

## التثبيت

يتم توزيع البوت إما كحزمة npm أو كصورة Docker.

**npm (CLI `mm`):**

```bash
npm install -g adamant-tradebot
mm init
mm on
```

**Docker (GHCR):**

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

توجد أيضًا واجهة صدفية (shell wrapper) حول `docker-compose`؛ راجع ملف [README](https://github.com/Adamant-im/adamant-tradebot#readme) للتفاصيل.

## ما الجديد في الإصدار v9.0.0

يُقدِّم هذا الإصدار واجهة سطر الأوامر `mm` مع أوامر مثل `init` و`on` و`off` و`doctor` و`status` و`logs`، إلى جانب صورة Docker عامة مستضافة على GHCR. تم إعادة هيكلة محرك التداول الآلي إلى مكونات نمطية تشمل التاجر (trader)، وبناء سجل الطلبات (order book builder)، ومزود السيولة (liquidity provider)، وراصد الأسعار (price watcher). تتضمن الحزمة موصلات للبورصات التالية: Azbit، Coinstore، FameEXnet، NonKYC، P2PB2B، وStakeCube. كما يُعد هذا الإصدار الأساس لواجهة ويب API، ويتضمن اختبارات وتوثيقًا موسعًا.

ملاحظات الإصدار والكود المصدري متوفران على [GitHub](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0). ويمكن الحصول على حزمة npm من [npmjs.com](https://www.npmjs.com/package/adamant-tradebot).

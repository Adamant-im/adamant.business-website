---
title: "تحديث ADAMANT Node v0.6.0"
slug: "adamant-node-v-0-6-0-update-688bbdb30e19"
description: "يعتمد تطبيق المراسلة اللامركزي على مكونين: نظام البلوكشين وتطبيقات العميل. تُدار سلسلة الكتل من خلال عقد الشبكة التي تقدم البيانات للتطبيقات وتُعالج الطلبات الواردة."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v-0-6-0-update-688bbdb30e19"
publishedAt: "2020-02-17T09:23:50.372Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/688bbdb30e19/001-1-fmo2vlyn2yehfv84inqtmq-png.webp"
cardSpan: "full"
originalId: "medium:688bbdb30e19"
locale: "ar"
placeholder: false
---

يعتمد تطبيق المراسلة اللامركزي على مكونين: نظام البلوكشين وتطبيقات العميل. تُدار سلسلة الكتل من خلال عقد الشبكة التي تقدم البيانات للتطبيقات وتُعالج الطلبات الواردة. أطلقت ADAMANT إصدار 0.6.0 من برنامج العقدة، والمتاح على صفحة الإصدارات في GitHub الخاص بالمشروع.

يحسّن هذا الإصدار اتصالات المقبس (socket) وواجهة برمجة التطبيقات الخاصة بالمعاملات. أصبحت اتصالات المقبس الآن تُرجع `recipientPublicKey`، كما تشمل نقاط النهاية في واجهة برمجة التطبيقات الخاصة بالمعاملات—including KVS وChats—حقل `block_timestamp` في استجاباتها. تم توسيع نقطة النهاية `/states/get/` لدعم معلّمات `SenderIds` و`keyIds` وكذلك طلبات POST. يتضمّن الإصدار أيضًا إصلاحات للترحيلات (migrations) مجموعة محدثة من الوثائق.

هذا التحديث ليس إلزاميًا لجميع مشغلي العقد. ومع ذلك، يجب ترقية العقد التي تحتاج إلى الاتصال بتطبيقات المراسلة إلى أحدث إصدار.

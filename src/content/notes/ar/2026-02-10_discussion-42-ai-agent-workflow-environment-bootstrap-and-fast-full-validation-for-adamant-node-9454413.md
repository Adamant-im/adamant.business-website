---
title: "سير عمل وكيل الذكاء الاصطناعي: إعداد البيئة والتحقق السريع/الكامل لـ ADAMANT Node"
slug: "discussion-42-ai-agent-workflow-environment-bootstrap-and-fast-full-validation-for-adamant-node-9454413"
description: "تم تحديث وثائق وكيل الذكاء الاصطناعي لـ ADAMANT Node بناءً على التحقق العملي. يشمل ذلك سياسة تحقق على مستويين وقائمة إعداد صريحة للبيئة."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/42"
publishedAt: "2026-02-10T12:58:10Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9454413"
locale: "ar"
placeholder: false
---

تم تحديث وثائق وكيل الذكاء الاصطناعي الخاصة بـ ADAMANT Node بناءً على التحقق العملي في بيئة تطوير محلية (انظر PR #165). يُدخل هذا التحديث سياسة تحقق على مستويين للمشاركين من الذكاء الاصطناعي: التحقق السريع افتراضيًا، والتحقق الكامل للتغييرات الحرجة. كما يوفر قائمة متابعة صريحة لإعداد البيئة الخاصة بـ PostgreSQL وRedis وبدء التشغيل على شبكة الاختبار (testnet)، إلى جانب اختبارات صحة محددة مثل `pg_isready` و`redis-cli ping` قبل تشغيل الاختبارات.

وبما أن هذا كود قديم، تتضمن الوثائق إرشادات عملية للحلول البديلة المتعلقة بانحرافات ESLint والأدوات الحالية، مع التوضيح أن المستودع لا يستخدم حاليًا سير عمل Prettier ويعتمد على ESLint. تُحسّن هذه التحسينات من قابلية تكرار العمل بمساعدة الذكاء الاصطناعي، وتقلل من الأخطاء السلبية الناتجة عن الخدمات المحلية المفقودة، وتحافظ على الموثوقية وسلامة الإجماع كبوابة جودة أساسية.

تم اختبار السير الكامل محليًا، حيث تم التأكد من بدء تشغيل شبكة الاختبار مع ظهور الرسائل `ADAMANT started` و`Blockchain ready`، تلاها تنفيذ ناجح لمجموعة الاختبارات الوحدوية السريعة عبر الأمر `npm run test:unit:fast`. يُقترح هذا النهج كأساس لسير عمل الذكاء الاصطناعي في مستودع العقدة. ويتم تتبع المناقشة المتعلقة بذلك في المشكلة #166.

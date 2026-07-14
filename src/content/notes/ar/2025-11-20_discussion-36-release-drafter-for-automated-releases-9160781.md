---
title: "مسّاح الإصدار لإصدارات تلقائية"
slug: "discussion-36-release-drafter-for-automated-releases-9160781"
description: "أدخلت ADAMANT أداة Release Drafter لأتمتة إنشاء ملاحظات الإصدار عبر مستودعاتها، حيث تجمع طلبات السحب المدمجة وتُنتج ملاحظات إصدار بصيغة Markdown"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/36"
publishedAt: "2025-11-20T13:00:25Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:9160781"
locale: "ar"
placeholder: false
---

أدخلت ADAMANT **Release Drafter** تلقائية لإنشاء ملاحظات الإصدار عبر مستودعاتها. تجمع الأداة طلبات السحب المدمجة — بما في ذلك العناوين والوسوم والمؤلفون — وتُولّد إصدارًا مسودةً يصنّف التغييرات حسب الفئة مثل الميزات والتصليحات والمهام. ويؤدي ذلك إلى إنتاج ملاحظات إصدار واضحة وموحّدة بصيغة Markdown دون الحاجة إلى تحرير يدوي.

يعمل التصنيف من خلال آلتين متكاملتين. الأولى تعتمد على الوسوم، وتستخدم وسومًا مثل `feature` و`fix` و`chore` و`breaking`. والثانية تستخدم بادئات في عنوان طلب السحب أو المهمة مثل `[Bug]` و`[Feat]` و`[Chore]`. ويمكن استخدام كلا النهجين معًا.

## الملفات المضمنة

يتكون النظام من ملفين. يقع ملف سير العمل في `.github/workflows/custom-release-draft.yml`، ويقع نصّ توليد ملاحظات الإصدار في `.github/scripts/release-notes.js`. ويتم إدارة كلا الملفين في مستودع `Adamant-im/.github`.

## تفعيله في مستودعك

لتفعيل Release Drafter، انسخ ملف سير العمل إلى مستودعك. يقوم سير العمل هذا بسحب المستودع المستهدف، وإعداد بيئة Node.js، وتثبيت تبعيات Octokit المطلوبة، ثم تنزيل نصّ `release-notes.js` من مستودع `.github` المشترك، وتشغيله باستخدام `GITHUB_TOKEN` الخاص بالمستودع.

```yaml
name: Custom Release Draft

on:
  workflow_call:
    inputs:
      target_branch:
        required: false
        type: string
        default: master
  push:
    branches:
      - master
      - feat/release-drafter
  workflow_dispatch:

jobs:
  release-draft:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout target repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install @octokit/rest @octokit/graphql

      - name: Download release-notes.js
        run: |
          set -e
          mkdir -p .github/scripts
          echo "Trying to download release-notes.js from feat/release-drafter..."
          if ! curl -fsSL "https://raw.githubusercontent.com/Adamant-im/.github/feat/release-drafter/.github/scripts/release-notes.js" -o .github/scripts/release-notes.js; then
            echo "feat/release-drafter not found, downloading from master..."
            curl -fsSL "https://raw.githubusercontent.com/Adamant-im/.github/master/.github/scripts/release-notes.js" -o .github/scripts/release-notes.js
          fi

      - name: Run release notes script
        run: node .github/scripts/release-notes.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_REPOSITORY: ${{ github.repository }}
```

بعد وضع سير العمل، قم بوضع وسوم أو بادئات على طلبات السحب الخاصة بك وفقًا الاتفاقيات الموصى بها. وبعد كل طلب سحب يتم دمجه، سيتم تحديث مسودة الإصدار تلقائيًا في علامة تبويب الإصدارات (Releases) الخاصة بالمستودع.

## مثال للإخراج

![Discussion screenshot 1](/images/engineering-notes/github/discussions/9160781/001-d84686ea.webp)

![Discussion screenshot 2](/images/engineering-notes/github/discussions/9160781/002-fc021fdd.webp)

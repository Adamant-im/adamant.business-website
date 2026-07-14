---
title: "Рекомендуемые префиксы для заголовков Issues"
slug: "discussion-5-recommended-prefixes-for-issue-titles-8890823"
description: "Для единообразия в организации ADAMANT используйте короткие префиксы в заголовках Issues, чтобы быстро определить тип задачи."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/5"
publishedAt: "2025-09-13T15:55:14Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8890823"
locale: "ru"
placeholder: false
---

Чтобы сохранить ясность и единообразие Issues во всей организации ADAMANT, при создании нового Issue используйте короткие префиксы в заголовке. Это помогает всем мгновенно понять тип задачи.

## Общие префиксы

Используйте **[Bug]** для ошибок, сбоев или неожиданного поведения. Используйте **[Feat]** для новой функциональности и **[Enhancement]** для улучшений существующих функций. Используйте **[Refactor]** для рефакторинга кода без изменения функциональности. Используйте **[Docs]** для документации, руководств или обновлений README. Используйте **[Test]** для добавления или улучшения тестов. Используйте **[Chore]** для рутинных задач, таких как обновление зависимостей или настройка CI/CD.

## Префиксы, специфичные для проекта

Используйте **[Task]** для общей задачи, которая может быть не связана напрямую с кодированием. Используйте **[Composite]** для задачи, включающей несколько подзадач. Используйте **[UX/UI]** для изменений пользовательского интерфейса или пользовательского опыта.

## Идеи и предложения

Используйте **[Proposal]** для формальных предложений, **[Idea]** — для идей, требующих обсуждения, и **[Discussion]** — для тем, которым может понадобиться широкое обсуждение. Однако лучшее место для этих трёх — [ADAMANT форум](https://github.com/orgs/Adamant-im/discussions), а не Issues.

## Примеры

```
[Bug] Crash when syncing wallet on iOS
[Feature] Add support for biometric auth
[Docs] Update installation guide for Ubuntu 24
[Refactor] Split TradeBot config module
[Composite] Add decentralized file transfer across ADM messenger apps
[UI/UX] Improve Home screen design
[Task] Release iOS app v3.10.1 to the App Store
```

Используйте максимум один или два префикса, чтобы не перегружать заголовок.

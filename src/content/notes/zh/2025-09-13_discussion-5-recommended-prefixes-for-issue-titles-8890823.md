---
title: "建议的议题标题前缀"
slug: "discussion-5-recommended-prefixes-for-issue-titles-8890823"
description: "为了保持ADAMANT组织内议题的清晰和一致，创建新议题时请在标题中使用简短前缀，以便快速识别任务类型。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/5"
publishedAt: "2025-09-13T15:55:14Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8890823"
locale: "zh"
placeholder: false
---

为了在 ADAMANT 组织范围内保持议题（Issue）的清晰和一致性，在创建新议题时，请在标题中使用简短的前缀。这有助于所有人快速了解任务类型。

## 常见前缀

使用 **[Bug]** 表示漏洞、崩溃或意外行为。使用 **[Feat]** 表示新增功能，使用 **[Enhancement]** 表示对现有功能的改进。使用 **[Refactor]** 表示不改变功能的代码重构。使用 **[Docs]** 表示文档、指南或 README 更新。使用 **[Test]** 表示添加或改进测试。使用 **[Chore]** 表示例行任务，例如依赖项更新或 CI/CD 调整。

## 项目专用前缀

使用 **[Task]** 表示可能与编码无直接关联的一般性任务。使用 **[Composite]** 表示包含多个子任务的综合性任务。使用 **[UX/UI]** 表示用户界面或用户体验的更改。

## 想法与提案

使用 **[Proposal]** 表示正式提案，使用 **[Idea]** 表示有待考虑或进一步讨论的想法，使用 **[Discussion]** 表示可能需要广泛参与讨论的主题。不过，这三类内容更适合发布在 [ADAMANT 论坛](https://github.com/orgs/Adamant-im/discussions)，而非作为议题。

## 示例

```
[Bug] Crash when syncing wallet on iOS
[Feature] Add support for biometric auth
[Docs] Update installation guide for Ubuntu 24
[Refactor] Split TradeBot config module
[Composite] Add decentralized file transfer across ADM messenger apps
[UI/UX] Improve Home screen design
[Task] Release iOS app v3.10.1 to the App Store
```

最多使用一到两个前缀，避免标题信息过载。

---
title: "Issueタイトルに推奨される接頭辞"
slug: "discussion-5-recommended-prefixes-for-issue-titles-8890823"
description: "ADAMANT組織全体でIssueを明確かつ一貫性のあるものにするため、新しいIssueを作成する際に短い接頭辞を使用してください。これにより、タスクの種類を一目で把握できます。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/5"
publishedAt: "2025-09-13T15:55:14Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8890823"
locale: "ja"
placeholder: false
---

ADAMANT組織全体でIssueを明確かつ一貫性のあるものにするため、新しいIssueを作成する際にタイトルに短い接頭辞を使用してください。これにより、誰もがすぐにタスクの種類を一目で理解できるようになります。

## 一般的な接頭辞

バグ、クラッシュ、予期しない動作には **[Bug]** を使用してください。新機能には **[Feat]** を、既存機能の改善には **[Enhancement]** を使用します。機能に変更を加えないコードのリファクタリングには **[Refactor]** を使用します。ドキュメント、ガイド、READMEの更新には **[Docs]** を使用します。テストの追加や改善には **[Test]** を使用します。依存関係の更新やCI/CDの調整などのルーチンタスクには **[Chore]** を使用します。

## プロジェクト固有の接頭辞

直接コーディングに関連しない一般的なタスクには **[Task]** を使用します。複数のサブタスクを含むタスクには **[Composite]** を使用します。ユーザーインターフェースやユーザーエクスペリエンスの変更には **[UX/UI]** を使用します。

## アイデアと提案

正式な提案には **[Proposal]** を、検討またはさらに議論すべきアイデアには **[Idea]** を、広い範囲での意見を必要とするトピックには **[Discussion]** を使用します。ただし、これら3つについては、Issueよりも[ADAMANT forum](https://github.com/orgs/Adamant-im/discussions)に投稿することを推奨します。

## 例

```
[Bug] Crash when syncing wallet on iOS
[Feature] Add support for biometric auth
[Docs] Update installation guide for Ubuntu 24
[Refactor] Split TradeBot config module
[Composite] Add decentralized file transfer across ADM messenger apps
[UI/UX] Improve Home screen design
[Task] Release iOS app v3.10.1 to the App Store
```

タイトルが煩雑にならないよう、最大でも1つか2つの接頭辞に抑えてください。

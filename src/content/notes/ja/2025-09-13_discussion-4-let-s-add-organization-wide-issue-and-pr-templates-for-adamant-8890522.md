---
title: "ADAMANT 全体のイシューおよびプルリクエストテンプレート"
slug: "discussion-4-let-s-add-organization-wide-issue-and-pr-templates-for-adamant-8890522"
description: "ADAMANTリポジトリ間の一貫性を高めるため、GitHubの組織全体テンプレート機能を活用します。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/4"
publishedAt: "2025-09-13T14:38:21Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Proposals & Ideas"
cardSpan: "half"
originalId: "github-discussion:8890522"
locale: "ja"
placeholder: false
---

すべてのADAMANTリポジトリにおける一貫性を向上させるために、GitHubの組織全体テンプレート機能を利用できます。組織のルートに特別な`.github`リポジトリを作成することで、カスタムテンプレートを持たないリポジトリが自動的に継承するデフォルトテンプレートを提供できます。

このリポジトリには、いくつかのテンプレートファイルが含まれます。バグ報告用には`bug_report.yml`ファイルを用意し、報告プロセスを構造化します。機能要望には`feature_request.yml`ファイルで貢献者を誘導します。`config.yml`ファイルではテンプレートの表示設定を制御したり、連絡先リンクを追加したりできます。また、`PULL_REQUEST_TEMPLATE.md`ファイルにより、プルリクエストの説明を標準化します。

これらのテンプレートを導入することで、再現手順や目的、代替案といった重要な情報を漏れなく収集できる明確な構造が貢献者に提供されます。これにより、不完全なイシューが減り、メンテナーの負担が軽減され、すべてのADAMANTプロジェクトにおける開発者体験が向上します。

次に進むべきステップは、これらのテンプレートにおける最終的な文言や項目の決定です。合意が得られ次第、すぐに使用可能なファイルを含むプルリクエストを作成できます。

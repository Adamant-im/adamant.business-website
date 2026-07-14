---
title: "AIエージェントのワークフロー：ADAMANT Nodeにおける環境ブートストラップと高速／完全検証"
slug: "discussion-42-ai-agent-workflow-environment-bootstrap-and-fast-full-validation-for-adamant-node-9454413"
description: "ADAMANT NodeのAIエージェントドキュメントがローカル開発環境での実証に基づき更新されました（PR #165参照）。この更新では、AI貢献者向けに高速検証と完全検証の二段階ポリシーを導入しています。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/42"
publishedAt: "2026-02-10T12:58:10Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9454413"
locale: "ja"
placeholder: false
---

ADAMANT NodeのAIエージェントドキュメントは、ローカル開発環境での実践的検証に基づいて更新されました（PR #165を参照）。

この更新では、AI貢献者向けに二段階の検証ポリシーを導入しています：デフォルトでは高速検証、重要な変更に対しては完全検証を適用します。また、PostgreSQL、Redis、テストネットの起動に向けた明確な環境ブートストラップチェックリストを提供し、テスト実行前に`pg_isready`や`redis-cli ping`といった具体的なヘルスチェックを実施するよう定めています。

このリポジトリはレガシーなコードベースであるため、ドキュメントには現在のESLintおよびツールの差異に対する実用的なフォールバックガイドラインが含まれており、現状ではPrettierのワークフローは存在せず、ESLintに依存していることが明記されています。これらの改善により、AI支援による作業の再現性が向上し、ローカルサービスの欠如による誤検出が減少するとともに、信頼性とコンセンサスの安全性が主要な品質ゲートとして維持されます。

このワークフローはローカルでエンドツーエンドでテストされ、`ADAMANT started`および`Blockchain ready`メッセージによるテストネットの起動確認の後、`npm run test:unit:fast`による高速ユニットテストスイートの正常な実行が確認されています。このアプローチは、ノードリポジトリにおけるベースラインのAIワークフローとして提案されています。関連する議論はissue #166で追跡されています。

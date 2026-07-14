---
title: "AI agent 工作流：ADAMANT 节点的环境引导与快速/完整验证"
slug: "discussion-42-ai-agent-workflow-environment-bootstrap-and-fast-full-validation-for-adamant-node-9454413"
description: "基于本地开发环境的实际验证，更新了 ADAMANT 节点的 AI agent 文档，引入两级验证策略和明确的环境引导清单。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/42"
publishedAt: "2026-02-10T12:58:10Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9454413"
locale: "zh"
placeholder: false
---

基于在本地开发环境中的实际验证，ADAMANT 节点的 AI-agent 文档已更新（参见 PR #165）。此次更新为 AI 贡献者引入了两级验证策略：默认进行快速验证，对关键更改执行完整验证。同时提供了明确的环境引导清单，涵盖 PostgreSQL、Redis 和测试网的启动，并在运行测试前加入具体的健康检查，例如 `pg_isready` 和 `redis-cli ping`。

由于这是一个遗留代码库，文档中还包含了针对当前 ESLint 和工具链偏移的实际回退指导，明确指出仓库目前没有 Prettier 工作流，而是依赖 ESLint。这些改进增强了 AI 辅助工作的可重复性，减少了因本地服务缺失导致的误报，并将可靠性和共识安全作为主要的质量关卡。

该工作流已在本地进行了端到端测试，确认测试网成功启动并显示 `ADAMANT started` 和 `Blockchain ready` 消息，随后通过 `npm run test:unit:fast` 成功执行了快速单元测试套件。此方法被提议作为节点仓库的基础 AI 工作流。相关讨论记录在 issue #166 中。

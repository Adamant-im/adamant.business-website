---
title: "AI agent workflow: environment bootstrap and fast/full validation for ADAMANT Node"
slug: "discussion-42-ai-agent-workflow-environment-bootstrap-and-fast-full-validation-for-adamant-node-9454413"
description: "The AI agent documentation for the ADAMANT Node has been updated based on practical verification in a local development environment (see PR 165). This update introduces a two le…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/42"
publishedAt: "2026-02-10T12:58:10Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9454413"
locale: "en"
placeholder: false
---

The AI-agent documentation for the ADAMANT Node has been updated based on practical verification in a local development environment (see PR #165). This update introduces a two-level validation policy for AI contributors: fast validation by default, and full validation for critical changes. It also provides an explicit environment bootstrap checklist for PostgreSQL, Redis, and testnet startup, along with concrete health checks like `pg_isready` and `redis-cli ping` before running tests.

Because this is a legacy codebase, the documentation includes practical fallback guidance for current ESLint and tooling drift, clarifying that the repository currently has no Prettier workflow and relies on ESLint. These improvements enhance the repeatability of AI-assisted work, reduce false negatives caused by missing local services, and maintain reliability and consensus safety as the primary quality gate.

The workflow was tested end-to-end locally, confirming testnet startup with `ADAMANT started` and `Blockchain ready` messages, followed by a successful execution of the fast unit suite via `npm run test:unit:fast`. This approach is proposed as the baseline AI workflow for the node repository. Related discussion is tracked in issue #166.

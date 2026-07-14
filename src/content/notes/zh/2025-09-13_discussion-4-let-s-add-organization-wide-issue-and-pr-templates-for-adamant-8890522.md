---
title: "ADAMANT 组织范围内的问题与拉取请求模板"
slug: "discussion-4-let-s-add-organization-wide-issue-and-pr-templates-for-adamant-8890522"
description: "通过 GitHub 组织级模板功能提升所有 ADAMANT 仓库的一致性，规范问题报告和拉取请求流程。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/4"
publishedAt: "2025-09-13T14:38:21Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Proposals & Ideas"
cardSpan: "half"
originalId: "github-discussion:8890522"
locale: "zh"
placeholder: false
---

为了提升所有 ADAMANT 仓库的一致性，我们可以利用 GitHub 的组织级模板功能。通过在组织根目录创建一个特殊的 `.github` 仓库，我们可以提供默认模板，所有未自定义模板的仓库将自动继承这些模板。

该仓库将包含多个模板文件。对于缺陷报告，`bug_report.yml` 文件将规范报告流程；对于功能请求，`feature_request.yml` 将引导贡献者提交内容。`config.yml` 文件可用于控制模板可见性并添加联系链接，而 `PULL_REQUEST_TEMPLATE.md` 文件将统一拉取请求的描述格式。

实施这些模板将为贡献者提供清晰的结构，确保诸如复现步骤、动机和替代方案等关键信息不会遗漏。这能帮助维护者减少处理不完整问题的时间，同时提升所有 ADAMANT 项目的开发者体验。

下一步是确定这些模板的最终措辞和字段内容。达成共识后，我们将准备一个包含即用型文件的拉取请求。

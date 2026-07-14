---
title: "Organization-Wide Issue & PR Templates for ADAMANT"
slug: "discussion-4-let-s-add-organization-wide-issue-and-pr-templates-for-adamant-8890522"
description: "To improve consistency across all ADAMANT repositories, we can leverage GitHub's organization wide templates feature. By creating a special .github repository at the root of the…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/4"
publishedAt: "2025-09-13T14:38:21Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Proposals & Ideas"
cardSpan: "half"
originalId: "github-discussion:8890522"
locale: "en"
placeholder: false
---

To improve consistency across all ADAMANT repositories, we can leverage GitHub's organization-wide templates feature. By creating a special `.github` repository at the root of the organization, we can provide default templates that repositories without their own custom templates will automatically inherit.

This repository would contain several template files. For bug reports, a `bug_report.yml` file would structure the reporting process. For feature requests, `feature_request.yml` would guide contributors. A `config.yml` file can control template visibility and add contact links, while a `PULL_REQUEST_TEMPLATE.md` file would standardize pull request descriptions.

Implementing these templates provides a clear structure for contributors, ensuring critical details like steps to reproduce, motivation, and alternatives are not missed. This saves maintainers time by reducing incomplete issues and improves the overall developer experience across all ADAMANT projects.

The next step is to decide on the final wording and fields for these templates. Once agreed upon, we can prepare a pull request with the ready-to-use files.

---
title: "Release Drafter for Automated Releases"
slug: "discussion-36-release-drafter-for-automated-releases-9160781"
description: "ADAMANT has introduced Release Drafter to automate release notes generation across its repositories. The tool collects merged pull requests—including titles, labels, and authors…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/36"
publishedAt: "2025-11-20T13:00:25Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:9160781"
locale: "en"
placeholder: false
---

ADAMANT has introduced **Release Drafter** to automate release notes generation across its repositories. The tool collects merged pull requests—including titles, labels, and authors—and generates a draft release that groups changes by category such as Features, Fixes, and Tasks. This produces clean, standardized Markdown release notes without manual editing.

Categorization works through two complementary mechanisms. The first is label-based, using labels like `feature`, `fix`, `chore`, and `breaking`. The second uses PR and issue title prefixes such as `[Bug]`, `[Feat]`, and `[Chore]`. Both approaches can be used together.

## Files Included

The system consists of two files. The workflow file lives at `.github/workflows/custom-release-draft.yml`, and the release notes generator script lives at `.github/scripts/release-notes.js`. Both are maintained in the `Adamant-im/.github` repository.

## Enabling It in Your Repository

To enable Release Drafter, copy the workflow file into your repository. The workflow checks out the target repository, sets up Node.js, installs the required Octokit dependencies, downloads the `release-notes.js` script from the shared `.github` repository, and runs it using the repository's `GITHUB_TOKEN`.

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

Once the workflow is in place, label or prefix your PRs according to the recommended conventions. After every merged PR, the draft release on the repository's Releases tab will be automatically updated.

## Example Output

![Discussion screenshot 1](/images/engineering-notes/github/discussions/9160781/001-d84686ea.webp)

![Discussion screenshot 2](/images/engineering-notes/github/discussions/9160781/002-fc021fdd.webp)

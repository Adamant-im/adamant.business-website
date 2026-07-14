---
title: "リリースノート自動生成のための Release Drafter"
slug: "discussion-36-release-drafter-for-automated-releases-9160781"
description: "ADAMANTはリリースノートの自動生成にRelease Drafterを導入。マージ済みPRからFeatures、Fixes、Tasks別に草案を作成します。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/36"
publishedAt: "2025-11-20T13:00:25Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:9160781"
locale: "ja"
placeholder: false
---

ADAMANTは、リポジトリ全体のリリースノート生成を自動化するために**Release Drafter**を導入しました。このツールは、タイトル、ラベル、作成者を含むマージ済みのプルリクエストを収集し、「機能追加」「修正」「タスク」などのカテゴリ別に変更点をグループ化したドラフトリリースを生成します。これにより、手動での編集なしで、明確で標準化されたMarkdown形式のリリースノートが作成されます。

カテゴリ分けは2つの補完的な仕組みで動作します。1つ目は`feature`、`fix`、`chore`、`breaking`といったラベルを使用するラベルベースの方法です。2つ目は`[Bug]`、`[Feat]`、`[Chore]`などのPRおよびイシューのタイトル接頭辞を使用する方法です。両方のアプローチを併用できます。

## 含まれるファイル

このシステムは2つのファイルで構成されています。ワークフローファイルは`.github/workflows/custom-release-draft.yml`にあり、リリースノート生成スクリプトは`.github/scripts/release-notes.js`にあります。これらはどちらも`Adamant-im/.github`リポジトリで管理されています。

## リポジトリでの有効化

Release Drafterを有効にするには、ワークフローファイルを自分のリポジトリにコピーします。このワークフローは対象リポジトリをチェックアウトし、Node.jsをセットアップして必要なOctokit依存関係をインストールし、共有された`.github`リポジトリから`release-notes.js`スクリプトをダウンロードして、リポジトリの`GITHUB_TOKEN`を使って実行します。

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

ワークフローの設定後は、推奨される規約に従ってPRにラベルを付けるか、タイトルに接頭辞を付けてください。各PRのマージごとに、リポジトリのリリースタブにあるドラフトリリースが自動的に更新されます。

## 出力例

![Discussion screenshot 1](/images/engineering-notes/github/discussions/9160781/001-d84686ea.webp)

![Discussion screenshot 2](/images/engineering-notes/github/discussions/9160781/002-fc021fdd.webp)

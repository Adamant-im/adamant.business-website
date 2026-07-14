---
title: "Release Drafter für automatisierte Releases"
slug: "discussion-36-release-drafter-for-automated-releases-9160781"
description: "ADAMANT führt Release Drafter ein, um die Erstellung von Release Notes in seinen Repositories zu automatisieren. Das Tool sammelt gemergte Pull Requests – inklusive Titel, Labels und Autoren…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/36"
publishedAt: "2025-11-20T13:00:25Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:9160781"
locale: "de"
placeholder: false
---

ADAMANT hat **Release Drafter** eingeführt, um die Generierung von Release Notes in seinen Repositories zu automatisieren. Das Tool sammelt gemergte Pull Requests – inklusive Titel, Labels und Autoren – und generiert einen Entwurf für einen Release, der Änderungen nach Kategorien wie Features, Fixes und Tasks gruppiert. So entstehen saubere, standardisierte Markdown-Release Notes ohne manuelle Bearbeitung.

Die Kategorisierung erfolgt über zwei ergänzende Mechanismen. Das erste ist labelbasiert und nutzt Labels wie `feature`, `fix`, `chore` und `breaking`. Das zweite verwendet Präfixe in PR- und Issue-Titeln wie `[Bug]`, `[Feat]` und `[Chore]`. Beide Ansätze können gemeinsam verwendet werden.

## Enthaltene Dateien

Das System besteht aus zwei Dateien. Die Workflow-Datei befindet sich unter `.github/workflows/custom-release-draft.yml`, und das Skript zur Generierung der Release Notes liegt unter `.github/scripts/release-notes.js`. Beide werden im Repository `Adamant-im/.github` gepflegt.

## Aktivierung in Ihrem Repository

Um Release Drafter zu aktivieren, kopieren Sie die Workflow-Datei in Ihr Repository. Der Workflow checked das Ziel-Repository aus, richtet Node.js ein, installiert die erforderlichen Octokit-Abhängigkeiten, lädt das `release-notes.js`-Skript aus dem gemeinsamen `.github`-Repository herunter und führt es mit dem `GITHUB_TOKEN` des Repositorys aus.

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

Sobald der Workflow eingerichtet ist, kennzeichnen oder präfixen Sie Ihre PRs gemäß den empfohlenen Konventionen. Nach jedem gemergten PR wird der Release-Entwurf auf der Registerkarte „Releases“ des Repositories automatisch aktualisiert.

## Beispiel-Ausgabe

![Diskussions-Screenshot 1](/images/engineering-notes/github/discussions/9160781/001-d84686ea.webp)

![Diskussions-Screenshot 2](/images/engineering-notes/github/discussions/9160781/002-fc021fdd.webp)

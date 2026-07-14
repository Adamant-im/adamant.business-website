---
title: "Release Drafter для автоматизированных релизов"
slug: "discussion-36-release-drafter-for-automated-releases-9160781"
description: "ADAMANT внедрил Release Drafter для автоматической генерации заметок о релизах во всех репозиториях. Инструмент собирает данные из объединённых pull request…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/36"
publishedAt: "2025-11-20T13:00:25Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:9160781"
locale: "ru"
placeholder: false
---

ADAMANT внедрил **Release Drafter** для автоматизации создания заметок о релизах во всех своих репозиториях. Инструмент собирает данные из объединённых pull request — включая заголовки, метки и авторов — и формирует черновик релиза, группируя изменения по категориям, таким как Features, Fixes и Tasks. Это позволяет получать чистые, стандартизированные заметки о релизах в формате Markdown без необходимости ручного редактирования.

Категоризация работает с помощью двух взаимодополняющих механизмов. Первый — на основе меток, использующихся такие как `feature`, `fix`, `chore` и `breaking`. Второй — с использованием префиксов в заголовках PR и задач, например `[Bug]`, `[Feat]` и `[Chore]`. Оба подхода можно использовать одновременно.

## Файлы, включённые в систему

Система состоит из двух файлов. Файл workflow размещается по пути `.github/workflows/custom-release-draft.yml`, а скрипт для генерации заметок о релизах — по пути `.github/scripts/release-notes.js`. Оба файла поддерживаются в репозитории `Adamant-im/.github`.

## Включение в вашем репозитории

Чтобы включить Release Drafter, скопируйте файл workflow в свой репозиторий. Workflow выполняет checkout целевого репозитория, настраивает Node.js, устанавливает необходимые зависимости Octokit, загружает скрипт `release-notes.js` из общего репозитория `.github` и запускает его с использованием `GITHUB_TOKEN` репозитория.

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

После настройки workflow помечайте свои PR или добавляйте префиксы к заголовкам в соответствии с рекомендованными соглашениями. После каждого объединённого PR черновик релиза на вкладке Releases репозитория будет автоматически обновляться.

## Пример вывода

![Discussion screenshot 1](/images/engineering-notes/github/discussions/9160781/001-d84686ea.webp)

![Discussion screenshot 2](/images/engineering-notes/github/discussions/9160781/002-fc021fdd.webp)

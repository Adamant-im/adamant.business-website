---
title: "Release Drafter pour les publications automatisées"
slug: "discussion-36-release-drafter-for-automated-releases-9160781"
description: "ADAMANT a introduit Release Drafter pour automatiser la génération des notes de version dans ses dépôts. L'outil regroupe les demandes de fusion selon leur catégorie…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/36"
publishedAt: "2025-11-20T13:00:25Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:9160781"
locale: "fr"
placeholder: false
---

ADAMANT a introduit **Release Drafter** pour automatiser la génération des notes de version dans ses dépôts. L'outil collecte les demandes de fusion (pull requests) intégrées — y compris les titres, les labels et les auteurs — et génère une publication brouillon qui regroupe les modifications par catégorie, comme Fonctionnalités, Corrections et Tâches. Cela produit des notes de version claires et normalisées en Markdown, sans besoin d'édition manuelle.

La catégorisation fonctionne grâce à deux mécanismes complémentaires. Le premier est basé sur les labels, en utilisant des étiquettes telles que `feature`, `fix`, `chore` et `breaking`. Le second utilise des préfixes dans les titres des PR et des tickets, comme `[Bug]`, `[Feat]` et `[Chore]`. Les deux approches peuvent être utilisées conjointement.

## Fichiers inclus

Le système se compose de deux fichiers. Le fichier de workflow se trouve à l'emplacement `.github/workflows/custom-release-draft.yml`, et le script générateur de notes de version est situé dans `.github/scripts/release-notes.js`. Les deux sont maintenus dans le dépôt `Adamant-im/.github`.

## Activation dans votre dépôt

Pour activer Release Drafter, copiez le fichier de workflow dans votre dépôt. Le workflow extrait le dépôt cible, configure Node.js, installe les dépendances Octokit requises, télécharge le script `release-notes.js` depuis le dépôt partagé `.github`, puis l'exécute à l'aide du `GITHUB_TOKEN` du dépôt.

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

Une fois le workflow en place, étiquetez ou préfixez vos PR conformément aux conventions recommandées. Après chaque fusion de PR, la publication brouillon dans l'onglet Releases du dépôt sera automatiquement mise à jour.

## Exemple de sortie

![Capture d'écran de la discussion 1](/images/engineering-notes/github/discussions/9160781/001-d84686ea.webp)

![Capture d'écran de la discussion 2](/images/engineering-notes/github/discussions/9160781/002-fc021fdd.webp)

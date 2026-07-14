---
title: "Release Drafter para lanzamientos automatizados"
slug: "discussion-36-release-drafter-for-automated-releases-9160781"
description: "ADAMANT ha introducido Release Drafter para automatizar la generación de notas de lanzamiento en sus repositorios. La herramienta recopila solicitudes de incorporación fusionadas..."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/36"
publishedAt: "2025-11-20T13:00:25Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:9160781"
locale: "es"
placeholder: false
---

ADAMANT ha introducido **Release Drafter** para automatizar la generación de notas de lanzamiento en sus repositorios. La herramienta recopila solicitudes de incorporación fusionadas —incluyendo títulos, etiquetas y autores— y genera un borrador de lanzamiento que agrupa los cambios por categorías como Funcionalidades, Correcciones y Tareas. Esto produce notas de lanzamiento en Markdown limpias y estandarizadas sin necesidad de edición manual.

La categorización funciona mediante dos mecanismos complementarios. El primero se basa en etiquetas, utilizando etiquetas como `feature`, `fix`, `chore` y `breaking`. El segundo utiliza prefijos en los títulos de las solicitudes de incorporación (PR) y de los problemas (issues), como `[Bug]`, `[Feat]` y `[Chore]`. Ambos enfoques pueden usarse juntos.

## Archivos incluidos

El sistema consta de dos archivos. El archivo de flujo de trabajo se encuentra en `.github/workflows/custom-release-draft.yml`, y el script generador de notas de lanzamiento se encuentra en `.github/scripts/release-notes.js`. Ambos se mantienen en el repositorio `Adamant-im/.github`.

## Activación en tu repositorio

Para activar Release Drafter, copia el archivo de flujo de trabajo en tu repositorio. El flujo de trabajo realiza un checkout del repositorio destino, configura Node.js, instala las dependencias Octokit necesarias, descarga el script `release-notes.js` desde el repositorio compartido `.github` y lo ejecuta utilizando el `GITHUB_TOKEN` del repositorio.

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

Una vez que el flujo de trabajo esté configurado, etiqueta o agrega prefijos a tus solicitudes de incorporación según las convenciones recomendadas. Tras cada solicitud fusionada, el borrador de lanzamiento en la pestaña de Lanzamientos del repositorio se actualizará automáticamente.

## Ejemplo de salida

![Captura de pantalla de la discusión 1](/images/engineering-notes/github/discussions/9160781/001-d84686ea.webp)

![Captura de pantalla de la discusión 2](/images/engineering-notes/github/discussions/9160781/002-fc021fdd.webp)

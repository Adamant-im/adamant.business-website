---
title: "ADAMANT Market-Making Software v9.0.0 está disponible"
slug: "discussion-59-adamant-market-making-software-v9-0-0-is-live-10356902"
description: "La versión 9.0.0 del software de market making de ADAMANT ya está disponible. Esta distribución pública del bot de código abierto se puede autohospedar con tus propias claves."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/59"
publishedAt: "2026-07-02T06:58:44Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10356902"
locale: "es"
placeholder: false
---

# ADAMANT Market-Making Software v9.0.0 está disponible

La primera distribución pública del bot de market making de código abierto ADAMANT ya está disponible. Es autohospedado: lo ejecutas contra tu propia cuenta de exchange con tus propias claves, sin intervención de custodia de terceros.

## Instalación

El bot se distribuye tanto como paquete npm como imagen de Docker.

**npm (CLI `mm`):**

```bash
npm install -g adamant-tradebot
mm init
mm on
```

**Docker (GHCR):**

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

También está disponible un contenedor de shell alrededor de `docker-compose`; consulta el [README](https://github.com/Adamant-im/adamant-tradebot#readme) para más detalles.

## Novedades de la v9.0.0

Este lanzamiento introduce la CLI `mm` con comandos como `init`, `on`, `off`, `doctor`, `status` y `logs`, junto con una imagen pública de Docker alojada en GHCR. El motor de market making ha sido reestructurado en componentes modulares que incluyen el trader, el generador de libro de órdenes, el proveedor de liquidez y el vigilante de precios. Los conectores de exchange incluyen Azbit, Coinstore, FameEXnet, NonKYC, P2PB2B y StakeCube. Este lanzamiento también sentó las bases para una API de interfaz web (WebUI) y se distribuye con pruebas y documentación ampliada.

Las notas del lanzamiento y el código fuente están disponibles en [GitHub](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0). El paquete npm se publica en [npmjs.com](https://www.npmjs.com/package/adamant-tradebot).

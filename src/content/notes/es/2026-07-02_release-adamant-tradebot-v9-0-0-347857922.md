---
title: "ADAMANT Tradebot v9.0.0"
slug: "release-adamant-tradebot-v9-0-0-347857922"
description: "ADAMANT Tradebot v9.0.0: Primera versión distribuible del bot de market making de código abierto. Nueva arquitectura, CLI, contenedores Docker y más."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v9.0.0"
publishedAt: "2026-07-02T06:12:07Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v9.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:347857922"
locale: "es"
placeholder: false
---

# ADAMANT Tradebot v9.0.0

Esta es la primera versión distribuible del bot de market making de código abierto. La versión del paquete pasa de 8.0.0 a 9.0.0.

## Instalación

```bash
npm install -g adamant-tradebot
mm init
```

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

## Novedades

### Distribución

El bot ahora se distribuye como un paquete npm, `adamant-tradebot`, con una CLI `mm` que expone comandos como `mm init`, `mm on`, `mm off`, `mm doctor`, y más. Una imagen Docker está disponible en GHCR en `ghcr.io/adamant-im/adamant-tradebot`, junto con un stack `docker-compose` para MongoDB y ejecuciones locales. Las acciones de GitHub gestionan publicaciones automáticas a npm y GHCR.

### Arquitectura (desde la versión base v8)

La base de código ahora incluye manejadores de comandos ADM modulares bajo `modules/commands/`. Se ha establecido una base para una API WebUI utilizando Fastify, JWT, Zod y Socket.IO. Los módulos de MM—trader, generador de libro de órdenes, proveedor de liquidez y monitor de precios—han sido refactorizados. Los tipos JSDoc bajo `types/` se han ampliado, junto con pruebas Jest y una configuración plana de ESLint.

### Conectores de exchanges

Los exchanges soportados ahora incluyen Azbit, Coinstore, FameEXnet, NonKYC, P2PB2B y StakeCube. Los conectores heredados para Bit-Z, CoinDeal e IDCM han sido eliminados.

### Documentación

El README ha sido completamente revisado para emisores de tokens y market making autohospedado. Se ha añadido un archivo `CONTRIBUTING.md` y instrucciones para agentes de IA.

### Cambios importantes

La configuración ahora usa `config.default.jsonc` combinado con `mm init`, en lugar de un archivo `config.json` fijado. Se requiere Node.js v22.2 o posterior. Los conectores heredados de exchanges han sido eliminados, por lo que los usuarios deben migrar a exchanges soportados. El ciclo de vida para instalaciones npm y locales ahora se gestiona mediante CLI con `mm on` y `mm off`.

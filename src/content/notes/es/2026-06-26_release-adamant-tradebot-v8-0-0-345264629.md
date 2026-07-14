---
title: "ADAMANT Tradebot v8.0.0"
slug: "release-adamant-tradebot-v8-0-0-345264629"
description: "ADAMANT Tradebot v8.0.0 es una versión importante del bot de market making de código abierto, que actualiza la versión del paquete de 7.0.1 a 8.0.0. El flujo de arranque se ha reorganizado para incluir..."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v8.0.0"
publishedAt: "2026-06-26T10:47:34Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v8.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:345264629"
locale: "es"
placeholder: false
---

ADAMANT Tradebot v8.0.0 es una versión importante del bot de market making de código abierto, que actualiza la versión del paquete de 7.0.1 a 8.0.0.

El flujo de arranque se ha reorganizado para incluir migraciones de base de datos y preparación inicial. Los manejadores de comandos ADM ahora son modulares bajo `modules/commands/`, y se ha introducido una nueva canalización de recepción de transacciones ADM con los componentes `adamantApi`, `admTxChecker` y `admTxParser`.

Se ha añadido una API WebUI opcional, construida sobre Fastify HTTP con autenticación JWT, validación Zod y transporte Socket.IO. Expone rutas para cuenta, estado del bot, comandos, datos de mercado, mensajes y parámetros de trading.

Los conectores de exchanges han sido actualizados: XeggeX ha sido eliminado, FameEX ha sido migrado a FameEXnet, y Azbit, P2PB2B, NonKYC, Coinstore y StakeCube han sido actualizados.

El entorno de ejecución ahora requiere Node.js v22.2+, junto con `adamant-api` 3.x y `mongodb` 7.x. Las herramientas han sido actualizadas a ESLint 10, las suites de pruebas de Jest se han ampliado y la cobertura de JSDoc bajo `types/` ha mejorado. Las adiciones a la documentación incluyen `CONTRIBUTING.md`, con actualizaciones a `README.md` y `config.default.jsonc`.

Para actualizar, descargue el último código, instale las dependencias, revise y fusione su `config.jsonc` con `config.default.jsonc`, y arranque el bot.

```bash
git pull
npm i
# Review and merge config.jsonc with config.default.jsonc
npm start
```

### Cambios importantes

Ahora se requiere Node.js v22.2+, en lugar del requisito anterior v18+. Una migración de base de datos renombra el campo `type` en las órdenes a `side`. Los cambios en el esquema de configuración requieren revisar `config.default.jsonc` y fusionar las actualizaciones en las configuraciones existentes. XeggeX ha sido eliminado, y los usuarios de FameEX deben cambiar al conector FameEXnet. Los metadatos de licencia han cambiado a `UNLICENSED` con `private: true`.

---
title: "Lanzamiento: adamant-tradebot v8.0.0 — visión técnica y notas de actualización"
slug: "discussion-54-release-adamant-tradebot-v8-0-0-technical-overview-and-upgrade-notes-10325709"
description: "Resumen ADAMANT tradebot v8.0.0 ya está disponible en la rama dev y etiquetado como v8.0.0. Esta actualización mayor alinea la base de código OSS con la línea técnica actual de Premium."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/54"
publishedAt: "2026-06-26T16:06:12Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10325709"
locale: "es"
placeholder: false
---

## Resumen

ADAMANT tradebot v8.0.0 ya está disponible en la rama `dev` y etiquetado como v8.0.0. Esta actualización importante del bot de market making de código abierto (Básico) alinea la base de código OSS con la línea técnica actual de Premium, manteniendo intacto el alcance OSS: orientado a REST, centrado en spot y sin reintroducir módulos exclusivos de Premium. Si opera el bot para un token listado, el resultado práctico es un entorno de ejecución más confiable con un inicio más limpio, actualizaciones más seguras en bases de datos existentes, conectores de exchange actualizados y una API WebUI privada opcional para clientes externos.

## Arquitectura

La secuencia de arranque en `app.js` es ahora explícita y ordenada. Espera la conexión a MongoDB y `db.ready`, ejecuta migraciones de base de datos registradas, inicializa servicios como el socket/polling de ADM y la API WebUI opcional, prepara los metadatos de los conectores y finalmente inicia los módulos de trading activos `mm_*`. Esto reduce las condiciones de carrera en arranques fríos y hace que las actualizaciones sean más seguras.

El monolítico `modules/commandTxs.js` fue dividido en manejadores especializados bajo `modules/commands/` (cuenta, órdenes, trading, información, funciones), junto con componentes compartidos. Los comandos siguen llegando a través de ADAMANT Messenger y Telegram cuando está configurado, pero la ruta de código es más fácil de mantener. Los módulos antiguos de recepción ADM fueron reemplazados por `adamantApi.js`, `admTxChecker.js` y `admTxParser.js`, alineando la recepción de comandos con `adamant-api` 3.x y los patrones actuales de socket/polling.

Las migraciones de base de datos se ejecutan una vez al inicio a través de `modules/dbMigrations.js`. La primera migración incluida renombra de forma segura el campo heredado de órdenes `type` a `side`. Las implementaciones existentes deben hacer una copia de seguridad de MongoDB antes del primer inicio de la v8, y luego verificar las órdenes abiertas y estadísticas tras la migración.

## API WebUI opcional (API del bot v1)

La v8.0 incluye una API HTTP privada ubicada en el directorio `api/`. Usa un servidor HTTP Fastify con autenticación JWT, validación de solicitudes con Zod y Socket.IO para hooks de transporte. Las rutas principales bajo `/api/v1` incluyen capacidades de arranque, mercado, cuenta, parámetros, comandos y mensajes. La API es opcional y está desactivada por defecto, diseñada para clientes gráficos autoalojados, mientras que el bot sigue siendo el único componente que se comunica con los exchanges. Actívela mediante la configuración `private_webui` en el archivo de configuración. Establezca una clave fuerte en `private_webui_secret_key`, limite las `private_webui_allowed_ips` y mantenga la API fuera de internet público a menos que sepa lo que está haciendo.

## Conectores de exchange

Los conectores compatibles en la edición Básica incluyen Azbit, P2PB2B, StakeCube, Coinstore, FameEX (a través del nuevo conector FameEXnet) y NonKYC. Los operadores deben tener en cuenta los cambios importantes: la interfaz de API de FameEX requiere cambiar la configuración a FameEXnet, y XeggeX ha sido eliminado del código abierto.

## Dependencias y guía de actualización

Las actualizaciones notables del entorno de ejecución incluyen `adamant-api` 3.x, `mongodb` 7, y la adición de `zod`, `fast-jwt` y `json-parse-bigint`. Express fue eliminado de la ruta WebUI. Para actualizar desde la v7.x, detenga el bot, descargue el código más reciente e instale las dependencias:

```bash
pm2 stop tradebot
cd adamant-tradebot
git pull
npm i
```

Asegúrese de tener instalado Node.js 22.2 o superior. Combine los nuevos campos de `config.default.jsonc` en su `config.jsonc`, confirme la configuración del conector FameEXnet y haga una copia de seguridad de su base de datos MongoDB para permitir que las migraciones se ejecuten en el primer inicio. Si la API WebUI está habilitada, revise sus configuraciones de seguridad. Finalmente, reinicie el bot usando su gestor de procesos. Las configuraciones con nombre siguen funcionando como se espera.

## Límite del alcance OSS

La v8.0 trae la calidad de ingeniería de la línea Premium al árbol OSS sin reintroducir supuestos exclusivos de Premium. Se mantiene la base actual en spot y orientada a REST, sin conectores de exchange WebSocket obligatorios, sin pila de perpétuos/futuros ni ampliación del catálogo de exchanges.

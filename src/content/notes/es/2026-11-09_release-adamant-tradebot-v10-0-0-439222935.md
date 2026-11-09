---
title: "ADAMANT Tradebot v10.0.0"
slug: "release-adamant-tradebot-v10-0-0-439222935"
description: "ADAMANT Tradebot v10.0.0 es un lanzamiento importante que incluye reorganización arquitectónica, seguridad de iteración, gestión de logs empresarial y APIs de WebUI."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v10.0.0"
publishedAt: "2026-11-09T14:19:19Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-tradebot"
tag: "v10.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:439222935"
locale: "es"
placeholder: false
---

ADAMANT Tradebot v10.0.0 es un lanzamiento de gran importancia que introduce una reorganización arquitectónica, seguridad de iteración exclusiva, gestión de logs de nivel empresarial, APIs de gestión de WebUI basadas en roles, un conector de Azbit reescrito, publicación confiable (Trusted Publishing) en npm mediante OIDC y procedencia de compilación criptográfica para contenedores Docker.

## Instalación

```bash
# Vía npm
npm install -g adamant-tradebot
mm init
mm doctor
mm on

# Vía Docker / GHCR
docker pull ghcr.io/adamant-im/adamant-tradebot:10.0.0
docker run -d --name adamant-tradebot ghcr.io/adamant-im/adamant-tradebot:10.0.0
```

## Seguridad de la cadena de suministro y publicación confiable

El flujo de trabajo de publicación en npm migró a OIDC Trusted Publishing sin secretos de repositorio persistentes (`NPM_TOKEN`), con procedencia verificada habilitada mediante `publishConfig.provenance: true`, lo que resuelve el issue #119. Se integró la certificación de procedencia de compilación de GHCR utilizando `actions/attest-build-provenance@v2` con firma Sigstore para compilaciones de contenedores verificables en GitHub Packages. Se añadieron disparadores de verificación manual a los flujos de trabajo de publicación de CI/CD mediante `workflow_dispatch`.

## Arquitectura y fiabilidad en tiempo de ejecución

La estructura de módulos se reorganizó para lograr una separación clara: `trade/features/` para módulos de creación de mercado, `trade/trader/` para conectores de exchange y `trade/settings/` para archivos de parámetros dinámicos. Se introdujo el bloqueo de iteración exclusiva mediante `helpers/moduleIteration.js` (`runExclusiveIteration`) para evitar iteraciones superpuestas simultáneas y garantizar una reprogramación fiable desde los bloques `finally`.

La rotación de logs empresarial y un lector de logs rápido fueron completamente reescritos en `helpers/logRotation.js` y `helpers/logReader.js`, soportando ciclos de vida activos y de archivo, lectura inversa estructurada y recuperación de logs paginados. Se añadió la evaluación de salud en tiempo de ejecución mediante `helpers/mmHealthEval.js`, `helpers/mmHealthState.js` y `helpers/mmRuntimeHealth.js` para el monitoreo del estado de creación de mercado en tiempo real. El seguimiento del iniciador de comandos ahora es proporcionado por `helpers/commandInitiator.js`, lo que permite un seguimiento contextual consistente a través de Messenger, la API de WebUI e invocaciones de CLI.

## Conectores de Exchange

El conector de Azbit fue objeto de una reescritura completa de `trade/trader/trader_azbit.js` y `trade/api/azbit_api.js`, soportando las APIs REST v1 y v2, precisión estricta de órdenes, limitación de tasa (rate limiting) y 137 pruebas unitarias con mocks de API exhaustivos. La precisión y seguridad del conector se estandarizaron en Coinstore, FameEX, NonKYC, P2PB2B y StakeCube, incluyendo manejo unificado de errores, truncamiento de precisión y pre-validación de saldos.

## API REST y WebSocket de WebUI

Se introdujo el control de acceso basado en roles con soporte para los roles `admin`, `manager` y `viewer` (solo lectura), con validación estricta de JWT, cumplimiento de TTL y filtrado de acceso por IP. Se añadieron endpoints completos de gestión de bots para el ajuste de parámetros dinámicos (`PUT /api/v1/params`, `PUT /api/v1/params/strategy`), ciclo de vida del bot, órdenes y consultas de logs. El streaming mediante WebSocket permite la suscripción a eventos en tiempo real para el estado del bot, logs de trading y actualizaciones del ticker del mercado.

## Garantía de calidad y herramientas para desarrolladores

La cobertura de pruebas abarca ahora 576 pruebas automatizadas en 33 suites que cubren módulos generales, API WebUI, características, trader, helpers y creación de mercado. Se añadieron directrices para agentes de IA en `AGENTS.md` para el desarrollo asistido por IA, cumpliendo con invariantes de seguridad, diseño de directorios y protocolos de prueba. Se mejoró la seguridad de tipos con definiciones `@typedef` de JSDoc y verificación de TypeScript mediante `npm run typecheck:webui-api`.

### Cambios importantes (Breaking changes)

Este lanzamiento requiere Node.js versión 22.12.0 o superior. El diseño interno de directorios cambió, moviendo los módulos de características y conectores a `trade/features/` y `trade/trader/`; las extensiones personalizadas que importen rutas internas deben actualizarse en consecuencia. La API de WebUI ahora aplica una expiración estricta de JWT y autorización de roles en todos los endpoints privados.

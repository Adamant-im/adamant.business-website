---
title: "Documentación y Esquema de ADAMANT: Cuentas Principales, Eventos WebSocket del Cliente y Visibilidad del Consenso"
slug: "discussion-68-docs-and-schema-top-accounts-client-websocket-events-and-consensus-visibility-10447246"
description: "Los repositorios de documentación y esquema de ADAMANT se han alineado con la superficie actual de la API del nodo. Todos los cambios son aditivos y retrocompatibles — sin bifurcación de consenso ni ruptura de formato de red."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/68"
publishedAt: "2026-07-17T12:40:07Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10447246"
locale: "es"
placeholder: false
---

Los repositorios de documentación y esquema de ADAMANT se han alineado con la superficie actual de la API del nodo. Todos los cambios son aditivos y retrocompatibles — sin bifurcación de consenso ni ruptura de formato de red. La documentación en vivo está disponible en `https://docs.adamant.im`, con el paquete OpenAPI en `https://schema.adamant.im`.

## API de Cuentas Principales

`GET /api/accounts/top` ahora forma parte del contrato público. El ordenamiento es determinista: `balance DESC`, luego `address ASC`. El endpoint admite paginación con `limit` y `offset`, un filtro opcional `isDelegate`, metadatos de respuesta (`count`) y `limit=0` para solicitudes de solo conteo. El interruptor de configuración heredado `topAccounts` ha sido eliminado — el endpoint está registrado en cada nodo.

## WebSocket del Cliente: `newBlock` y `balances/change`

La interfaz Socket.IO del cliente incorporó eventos compactos optativos `newBlock` y payloads `balances/change` a nivel de campo, que pueden incluir `balance`, `unconfirmedBalance` o ambos. Las suscripciones se indexan por `address`, `types`, `assetChatTypes`, `balances` y `blocks`. La entrega sigue siendo de mejor esfuerzo y no duradera: los consumidores deben reconectarse, resuscribirse y conciliar el estado crítico vía REST. El paquete OpenAPI documenta esto bajo `x-client-websocket` con esquemas dedicados en `specification/websocket/`.

## Programaciones de Estado y `forged` de Delegados

Las APIs públicas de estado ahora exponen la programación efectiva de activación del consenso y la programación completa de hitos de recompensa por bloque, incluyendo `consensusCodeName`, `consensusSchedule.activationHeights` y `milestoneSchedule` (compuesto por `offset`, `distance` y `milestones`). Las respuestas de lista y obtención de delegados ahora incluyen `forged` de por vida como cadena de enteros en base 10 en unidades base. La proyección del próximo forjador utiliza la altura del siguiente bloque en los límites de ronda. El esquema también corrigió `producedlocks` a `producedblocks` y completó la cobertura de parámetros de consulta para pares, transacciones en cola y no confirmadas, y búsqueda de delegados y `orderBy`.

## Alineación de la API de Bloques

La semántica de consulta de `GET /api/blocks` ahora está alineada con el comportamiento real del nodo. `numberOfTransactions=0` funciona correctamente, y `orderBy`, los filtros de monto y `offset` después del ordenamiento están documentados con precisión. El esquema añade cobertura completa de parámetros y `generatorPublicKey` en `BlockInfoDto`. Se eliminaron de la documentación los ejemplos incorrectos de `timestampMs`.

## Recuperación del Operador: Checkpoints de Mem-Table

Los checkpoints rotativos persistidos `mem_*` están documentados para recuperación ante caídas. La funcionalidad se controla mediante `loading.memCheckpoints.enabled` y está activada por defecto. La documentación cubre la verificación SHA-256, restauración con fallo cerrado, respaldo a reconstrucción determinista completa, impacto de almacenamiento y comportamiento de apagado controlado (`SIGINT`/`SIGTERM` → esperar a `Cleaned up successfully`). Los checkpoints sirven como caché de recuperación local; los bloques canónicos siguen siendo la fuente de verdad.

## Contexto de la Versión

Estas actualizaciones están dirigidas al nodo ADAMANT `v0.10.2`. Los consumidores downstream — especialmente `adamant-api-jsclient` — deben regenerar los tipos a partir del paquete OpenAPI actualizado. Los pull requests relevantes abarcan los repositorios de [docs](https://github.com/Adamant-im/docs/pull/39), [schema](https://github.com/Adamant-im/adamant-schema/pull/53) y [node](https://github.com/Adamant-im/adamant).

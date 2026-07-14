---
title: "Documentación y esquema actualizados para ADAMANT Node v0.10.0"
slug: "discussion-53-docs-and-schema-updated-for-adamant-node-v0-10-0-10292291"
description: "Junto con ADAMANT Node v0.10.0, la pila para desarrolladores se ha actualizado para mantenerse sincronizada: especificación API, documentación, red local y testnet reiniciada."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/53"
publishedAt: "2026-06-20T18:25:34Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10292291"
locale: "es"
placeholder: false
---

Junto con **ADAMANT Node v0.10.0**, la pila para desarrolladores se ha actualizado para mantenerse perfectamente sincronizada con el nodo: la especificación de la API (`adamant-schema`) y la documentación (`adamant-docs`) han sido ambas actualizadas, además de una red local y una testnet recién reiniciada. A continuación, un breve resumen para quienes desarrollan sobre ADAMANT.

## adamant-schema (especificación de API)

La especificación ha sido actualizada de **OpenAPI 3.0.3 → 3.2.0**, con su versión alineada a `0.10.0` y auditada frente al nodo en producción. Las transacciones ahora admiten **`timestampMs`**, proporcionando marcas de tiempo con precisión en milisegundos junto con el `timestamp` existente a nivel de segundo. Las respuestas de estado del nodo son más completas, añadiendo **`nodeTimestampMs`**, **`unixTimestampMs`** y un objeto **`loader`** que expone `syncing`, `consensus`, `blocks` y `blocksCount`.

Un nuevo punto de conexión **`GET /peers/get`** permite buscar un nodo (peer) por IP y puerto. Nuevos parámetros de consulta **`returnUnconfirmed`** e **`includeDirectTransfers`** reemplazan al obsoleto `withoutDirectTransfers`. Los nodos de testnet han sido añadidos a la lista de servidores.

La interfaz interactiva Swagger UI en [schema.adamant.im](https://schema.adamant.im) ahora ofrece búsqueda en tiempo real de operaciones, comprobaciones de estado por nodo con etiquetas de versión de API y selección automática de un nodo principal saludable. Las herramientas se han actualizado a Node.js 22, TypeScript y Express 5, con un cliente tipado regenerado para consumidores.

## adamant-docs (documentación)

La referencia de la API se ha actualizado a **v0.10.0** y etiquetada por versión en la barra lateral, para que la documentación y la red nunca estén desincronizadas. Nuevas páginas cubren **consenso y validación de transacciones**, **sincronización** y el punto de conexión **loader / estado del nodo**. La semántica de **`timestampMs`** está documentada de extremo a extremo, y la documentación de la API de **peers** ha sido actualizada.

Las guías **run-your-own-node** se han ampliado para cubrir instalación (incluyendo macOS), configuración, inicio automático, arranque (bootstrap) y recuperación del nodo. Ahora existen páginas dedicadas para ejecutar una **localnet** y unirse a la **testnet**.

## Localnet y testnet

Una **localnet** permite desplegar una red ADAMANT completa localmente para desarrollar y probar sin afectar la infraestructura pública. La **testnet** ha sido reiniciada y alineada con v0.10.0, permitiendo validar integraciones en condiciones reales de red antes del despliegue en mainnet. Juntos, estos entornos hacen que el flujo **local → testnet → mainnet** sea fluido y completamente documentado.

## Recursos relacionados

- Referencia de API: https://schema.adamant.im
- Documentación: https://docs.adamant.im
- Código fuente del nodo: https://github.com/Adamant-im/adamant
- Repositorio de la especificación API: https://github.com/Adamant-im/adamant-schema
- Repositorio de documentación: https://github.com/Adamant-im/docs
- Cliente JS: https://github.com/Adamant-im/adamant-api-jsclient

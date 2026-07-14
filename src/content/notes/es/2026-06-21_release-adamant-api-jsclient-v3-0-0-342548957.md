---
title: "ADAMANT API JS Client v3.0.0"
slug: "release-adamant-api-jsclient-v3-0-0-342548957"
description: "Lanzamiento importante del SDK coordinado con ADAMANT Node v0.10.0. Actualiza clientes HTTP y WebSocket, introduce paquetes modulares, mejora reintentos y documentación."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.0.0"
publishedAt: "2026-06-21T15:22:41Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:342548957"
locale: "es"
placeholder: false
---

# ADAMANT API JS Client v3.0.0

Este es un lanzamiento importante del SDK coordinado con ADAMANT Node v0.10.0. Actualiza los clientes HTTP y WebSocket para la API actual del nodo, introduce límites estables de paquetes modulares, mejora el comportamiento de reintento y conmutación por error, añade metadatos generados de forma determinista y reemplaza la documentación heredada basada en Wiki con un sitio controlado por código fuente usando VitePress y TypeDoc.

## Soporte para ADAMANT Node v0.10.0

El lanzamiento regenera los DTO de la API a partir de una revisión fija de `adamant-schema`, incluyendo marcas de tiempo en milisegundos, datos del cargador y estado, conteos numéricos y campos de transacciones no confirmadas anulables. Añade parámetros actuales de consulta de transacciones y chats como `returnUnconfirmed`, `includeDirectTransfers`, búsqueda de delegados por dirección y consultas de transacciones de múltiples tipos. Los filtros de consulta de transacciones ahora se combinan con lógica `and` por defecto, y los filtros de monto se limitan a transacciones de transferencia. El SDK añade construcción opcional de transacciones con `timestampMs` y `getEpochTimeMs`; dado que `timestampMs` no forma parte de los bytes firmados, los hashes, IDs y firmas se preservan. Las verificaciones de estado se actualizan para la respuesta consolidada del estado del nodo y soportan filtrado inclusivo por versión mínima del nodo.

## Confiabilidad y comportamiento de WebSocket

El cliente ya no reintenta respuestas POST explícitamente rechazadas, devolviendo en su lugar errores HTTP estructurados y no reintentables en lugar de bucles. Se mantiene el reintento y la conmutación por error en nodos activos para solicitudes seguras y fallos de red que carecen de respuesta HTTP. Las suscripciones WebSocket ahora soportan múltiples direcciones, tipos de transacciones y tipos de activos de chat, con manejadores de conveniencia para transacciones y mensajes, callbacks de conexión y reconexión, conexión y desconexión explícitas, errores de conexión tipados, limpieza de oyentes y manejo acotado de reconexión.

## SDK modular y paquete npm

La raíz del paquete sigue enfocada en ADM y evita la carga de implementaciones específicas de monedas. Se añaden exportaciones de subrutas para ADM, DTO de API, transacciones, metadatos y ayudantes para BTC, ETH, DASH y DOGE, manteniendo el soporte tanto para CommonJS como para ESM. Los metadatos deterministas de la billetera se sincronizan desde una revisión fija de `adamant-wallets`. Se eliminan el código y dependencias de Lisk y Klayr, y se estandariza la derivación de monedas externas soportadas y la validación de direcciones. El lanzamiento requiere Node.js 22 o posterior, adopta metadatos de espacio de trabajo pnpm, moderniza TypeScript y dependencias, y añade pruebas de nivel de consumidor en tarball.

## Correcciones de API retenidas desde v2.4.0

Este lanzamiento corrige el comportamiento de votación de delegados y de las verificaciones de estado. Permite cargas útiles en cadena para mensajes de señal y valida montos solo para tipos de mensaje que incluyen montos. Los IDs de transacción se representan como cadenas, y las utilidades de validación se exportan.

## Documentación, automatización y mantenimiento

La documentación se proporciona mediante un sitio VitePress con una referencia de API generada por TypeDoc y guías. El lanzamiento incluye un flujo de trabajo de documentación en GitHub Pages con CNAME, archivos README y CONTRIBUTING actualizados, verificaciones de sincronización determinista de esquema y metadatos, un ejecutor personalizado de Jest, pruebas para consumidores del paquete, cobertura ampliada y pruebas de límites de módulos. La configuración de linting y TypeScript se migra a la cadena de herramientas actual, y se eliminan archivos obsoletos.

### Cambios importantes

Las suscripciones WebSocket ahora por defecto usan `allDirections`. Anteriormente, el cliente entregaba solo transacciones entrantes con un filtro codificado de forma rígida `recipientId === admAddress`; ahora emite transacciones entrantes y salientes por defecto. Para restaurar el comportamiento anterior, pase `direction: 'incoming'` en las opciones del cliente WebSocket. Se requiere Node.js 22 o posterior. Los ayudantes de monedas deben importarse desde rutas explícitas como `adamant-api/coins/btc` y ya no se exportan desde la raíz del paquete. Se eliminó el soporte para Lisk y Klayr. Los filtros de consulta de transacciones ahora usan lógica `and` por defecto, y los filtros de monto aplican solo a transacciones de transferencia. Los consumidores deben revisar el uso obsoleto de `withoutDirectTransfers` y migrar a `includeDirectTransfers`.

El diseño de bytes de transacciones, firma, IDs y semántica de firmas no cambia. Tanto los consumidores CommonJS como ESM están cubiertos por la prueba de tarball empaquetado.

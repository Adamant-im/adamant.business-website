---
title: "Actualización del nodo de ADAMANT Blockchain: Versión 0.8.0"
slug: "adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
description: "ADAMANT, la plataforma de mensajería descentralizada de código abierto basada en tecnología blockchain, ha lanzado la versión 0.8.0 del nodo. Esta actualización se centra en mejoras y optimizaciones de la API."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
publishedAt: "2023-03-20T08:43:48.499Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:35647db85081"
locale: "es"
placeholder: false
---

ADAMANT, la plataforma de mensajería descentralizada de código abierto basada en tecnología blockchain, ha lanzado la versión 0.8.0 del nodo. Esta actualización se centra en mejoras y optimizaciones de la API en lugar de cambios de consenso, por lo que actualizar su nodo es opcional.

## Mejoras en la API

Los endpoints `/api/transactions` y `/api/chats/get` ahora aceptan `inId` o `isIn` como parámetros de consulta equivalentes. Por ejemplo, `/api/chats/get?InId=U6386412615727665758` y `/api/chats/get?isIn=U6386412615727665758` producen el mismo resultado. Además, los ID de usuario en los endpoints `/api/chats/get` y `/api/chatrooms` ahora son insensibles a mayúsculas y minúsculas, lo que significa que `/api/chatrooms/U6386412615727665758` y `/api/chatrooms/u6386412615727665758` se tratan de forma idéntica.

Las transacciones y `POST /api/accounts/delegates` ahora aceptan una transacción como un objeto simple o anidada dentro de una propiedad `transaction`. Ambas formas a continuación son válidas:

```bash
curl -X POST https://endless.adamant.im/api/transactions/process -H 'Content-Type: application/json' -d '{"type": 0, "amount": 100000000, ...}'
# or {"transaction": { "type": 0, "amount": 100000000, ... }}
```

El endpoint `/api/states/get` ahora incluye una propiedad `confirmations`, y se ha optimizado el rendimiento de consulta de `generatorPublicKey`. También se ha añadido una opción `cors` en `config.json` para facilitar la configuración de orígenes cruzados.

## Correcciones de errores y cambios importantes

La actualización resuelve un error de "permiso denegado para el esquema público" que afectó a algunos despliegues. Sin embargo, la versión 0.8.0 introduce un cambio importante: el endpoint `/api/blocks` ya no devuelve una propiedad `count`. Las aplicaciones que dependan de este campo deberán actualizarse en consecuencia.

Dado que esta versión no modifica las reglas de consenso, los nodos existentes pueden seguir funcionando con la versión anterior sin problemas de compatibilidad.

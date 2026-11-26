---
title: "adamant-api v3.2.0: Failover HTTP 429, verificación de clave pública y filtros de consulta estrictos"
slug: "discussion-85-adamant-api-v3-2-0-resilient-http-429-failover-recipient-public-key-verification-strict-ch-11403173"
description: "ADAMANT Node v0.11.0 introduce límites de tasa, validación estricta de consultas y fuentes OpenAPI consolidadas; adamant-api se actualiza para mejorar la resiliencia."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/85"
publishedAt: "2026-11-26T06:52:55Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:11403173"
locale: "es"
placeholder: false
---

Con la introducción en ADAMANT Node v0.11.0 de límites de tasa anti-abuso para REST/WebSocket, validación estricta de consultas solo con AND en los endpoints de chat y KVS, y la consolidación de las fuentes OpenAPI bajo `Adamant-im/adamant`, `adamant-api` se ha actualizado para reforzar la conmutación por error (failover) de nodos, la preparación y la serialización de consultas tanto en nodos v0.11.0+ como en versiones anteriores.

## Conmutación por error (failover) y tiempos de enfriamiento HTTP 429 resilientes

ADAMANT Node v0.11.0 aplica presupuestos HTTP por IP agregados (`all`) y por clase de ruta (`status`, `read`, `publish`), respondiendo con `429`, `Retry-After` / `RateLimit-Reset` y `RateLimit-Scope`.

Cada solicitud captura `targetNode = this.node` antes del envío, de modo que los errores concurrentes tardíos nunca devuelvan `this.node` a un nodo del cual otra solicitud ya haya realizado una conmutación por error. Las llamadas concurrentes a `updateNodes()` comparten una única `updateNodesPromise` en curso en lugar de retornar prematuramente, y una conmutación por error forzada que se une a un barrido planificado se escala a rotación forzada con `failedNode`.

Dado que `/api/node/status` se factura al bucket de mayor capacidad `status` (12,000/min frente a 3,000/min para `read`), un nodo con límite de tasa aún responde a las comprobaciones de estado. `NodeManager` ahora rastrea los tiempos de enfriamiento por 429 para cada nodo (`rateLimitedUntil`, limitado a 60s), por lo que tanto los barridos forzados como los planificados prefieren nodos sincronizados sin límite de tasa en pools de 2 y 3+ nodos.

Cuando no hay un nodo sincronizado alternativo disponible, las lecturas idempotentes respetan `Retry-After` / `RateLimit-Reset` con un jitter de hasta 10s; si la ventana de reinicio del nodo excede ese límite o los reintentos se agotan, el SDK retorna rápidamente con metadatos opcionales en `AdamantApiResult`:

```ts
const response = await api.getBlocks();

if (!response.success) {
  if (response.status === 429 && response.retryAfterMs !== undefined) {
    console.warn(`Rate-limited (${response.rateLimitScope}), retry in ${response.retryAfterMs}ms`);
  }
}
```

Las solicitudes `POST` no idempotentes (envío de transacciones) nunca se reintentan ante respuestas HTTP, incluyendo `429`.

## Nombres de filtros simples, tipos de endpoint estrictos y POST /api/states/get

Los endpoints `/api/states/get`, `/api/chats/get` y `/api/chatrooms/*` ahora reciben nombres de filtros simples. Los contenedores `and: { ... }` se aplanan, mientras que los contenedores `or` no admitidos se rechazan en el lado del cliente con `success: false`. Esto soluciona el problema #97 en nodos anteriores a la v0.11.0 y coincide con la validación estricta de la v0.11.0.

`ChatroomsOptions`, `ChatTransactionsOptions` y `KVSOptions` ahora reflejan exactamente los campos aceptados por ADAMANT Node v0.11.0, incluyendo `toHeight` en `/api/chats/get` y `/api/states/get`, mientras excluyen los campos de altura/rango rechazados en `/api/chatrooms/*`. El `userId` obsoleto en `/api/chatrooms/*` se elimina en tiempo de ejecución con una advertencia de obsolescencia dedicada.

Las búsquedas grandes de KVS ahora pueden usar `POST /api/states/get`:

```ts
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

`getKVS(..., {method: 'POST'})` utiliza la política de reintento de lectura idempotente del SDK, preservando la conmutación por error completa para 429 y 5xx.

## Preparación de nodos utilizables y filtrado de estado del cargador

`NodeManager` ahora inspecciona los campos `loader.loaded` y `loader.syncing` de `/api/node/status`. Los nodos que aún están cargando (`loaded: false`) o sincronizando (`syncing: true`) se excluyen de la selección activa de API y de las listas de conexión WebSocket; los nodos sin un objeto `loader` permanecen elegibles. Con `checkHealthAtStartup: true`, `onReady` espera hasta que se seleccione realmente un nodo utilizable en lugar de activarse después de un barrido de salud inicial fallido.

## Verificación de clave pública de destinatario local y delegado

`encodeMessage()` y `decodeMessage()` ahora rechazan claves Ed25519 no canónicas, fuera de curva y de orden pequeño (órdenes 1, 2, 4 y 8) con `invalid key`. `getPublicKey()` valida las direcciones ADM localmente antes de realizar una solicitud de red y verifica que las claves devueltas por el nodo deriven localmente la dirección solicitada antes de almacenarlas en caché o devolverlas. `sendMessage()` vuelve a verificar localmente las claves resueltas antes de cifrar y devuelve `{success: false, errorMessage}` en caso de discrepancia; `voteForDelegate()` aplica el enlace de dirección y utiliza cachés de delegados por cliente.

## Consolidación de fuentes OpenAPI y endurecimiento de la cadena de suministro

`scripts/sync-api-types.mjs` ahora extrae la especificación OpenAPI 3.2 directamente de `Adamant-im/adamant` (`openapi/specification/openapi.yaml`), generando `RateLimitErrorResponseDto` y `GetKVSRequestBody`. El archivo `pnpm-workspace.yaml` impone una cuarentena de 7 días para el lanzamiento de dependencias (`minimumReleaseAge: 10080`) con `allowBuilds` explícito y 0 vulnerabilidades de auditoría en producción.

## Referencias

- SDK PR (Alineación con Node v0.11.0 y dependencias): https://github.com/Adamant-im/adamant-api-jsclient/pull/105
- Verificación de clave pública de destinatario y delegado: https://github.com/Adamant-im/adamant-api-jsclient/pull/110
- Corrección de filtros simples de chat y KVS: https://github.com/Adamant-im/adamant-api-jsclient/pull/101
- Corrección de `onReady` para nodos utilizables: https://github.com/Adamant-im/adamant-api-jsclient/pull/102
- ADAMANT Node v0.11.0: https://github.com/Adamant-im/adamant/pull/303
- Documentación del SDK: https://js.docs.adamant.im
- OpenAPI Swagger UI: https://docs.adamant.im/schema/

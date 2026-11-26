---
title: "adamant-api v3.2.0: Diseñado para ADAMANT Node v0.11.0, con conmutación por error resiliente y consultas más seguras"
slug: "adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
description: "cryptofoundry presenta adamant-api v3.2.0, el SDK oficial de TypeScript y Node.js para la blockchain ADAMANT, coordinado con ADAMANT Node v0.11.0."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
publishedAt: "2026-11-26T07:08:23.535Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:e657e4cd56ab"
locale: "es"
placeholder: false
---

cryptofoundry presenta un resumen de adamant-api v3.2.0, el SDK oficial de TypeScript y Node.js para la blockchain ADAMANT, coordinado con ADAMANT Node v0.11.0.

Desarrollar aplicaciones descentralizadas, bots de trading, exploradores o integraciones de pago directamente contra endpoints HTTP de blockchain implica reinventar constantemente la misma infraestructura de fiabilidad y criptografía: seleccionar nodos sincronizados, reintentar fallos transitorios sin duplicar transacciones, cifrar mensajes con NaCl, firmar transacciones deterministas y mantener los DTO de TypeScript alineados con las actualizaciones de los nodos. El SDK gestiona esto de forma nativa con una resiliencia sin código repetitivo (basta con pasar una lista de nodos HTTPS operados de forma independiente y el SDK supervisa su estado, verifica las alturas de sincronización, omite nodos obsoletos o en carga y realiza la conmutación por error automáticamente), importaciones modulares de subrutas, seguridad integral de TypeScript con DTO generados a partir de la especificación oficial OpenAPI 3.2 de ADAMANT Node y suscripciones en vivo mediante Socket.IO con recuperación automática tras reconexiones.

### Verificación de clave pública del destinatario local y del delegado

Antes de cifrar un mensaje o votar por un delegado, la versión v3.2.0 verifica localmente que cada clave pública Ed25519 devuelta por un nodo sea una clave canónica de 32 bytes, que esté en la curva y que no sea de orden pequeño, derivando criptográficamente la dirección ADM solicitada. Las claves mal formadas, fuera de la curva, de orden pequeño (órdenes 1, 2, 4 y 8) o que no coincidan se rechazan limpiamente antes del almacenamiento en caché o el cifrado, y las cachés de delegados se aíslan por cada instancia de `AdamantApi`.

### Corrección crítica de seguridad y precisión para consultas KVS y de chat

En las versiones v3.0.0 y v3.1.0, los métodos `getKVS()`, `getChatTransactions()`, `getChats()` y `getChatMessages()` enviaban filtros con el prefijo `and:`, los cuales los nodos anteriores a la v0.11.0 ignoraban silenciosamente, devolviendo `success: true` con registros sin filtrar. En la v3.2.0, estos métodos envían siempre nombres de filtro simples (aplanando los contenedores explícitos `and: { ... }`) y rechazan en el lado del cliente los contenedores `and:` no admitidos y las claves con prefijos antiguos. Toda aplicación 3.x que lea datos de KVS o chat debe actualizarse a la v3.2.0.

### Manejo resiliente de HTTP 429 para Node v0.11.0

ADAMANT Node v0.11.0 habilita por defecto límites contra abusos para HTTP y WebSocket en producción. Cuando un nodo devuelve un error HTTP 429, las lecturas idempotentes (GET y POST `/api/states/get`) rotan inmediatamente a otro nodo sincronizado en caché, mientras que el nodo con limitación de tasa entra en un periodo de enfriamiento acotado (hasta 60 segundos) para evitar que las comprobaciones de estado redirijan el tráfico de vuelta a él. Las solicitudes paralelas que impactan en un nodo limitado comparten un único barrido de estado deduplicado en lugar de saturar `/api/node/status` o alternar constantemente el nodo activo. En configuraciones de un solo nodo o cuando la ventana de restablecimiento supera la espera acotada de 10 segundos del SDK, `AdamantApiResult` expone ahora campos opcionales `status`, `retryAfterMs` y `rateLimitScope` para que los bots puedan programar reintentos de forma limpia. Las llamadas POST de publicación de transacciones nunca se retransmiten automáticamente tras recibir una respuesta HTTP.

### Preparación de inicio más inteligente

Los servicios que se inician junto con un nodo local a menudo experimentaban la activación de `onReady` mientras el nodo aún cargaba tablas de memoria o se ponía al día con la cadena. En la v3.2.0, los nodos que informan `loader.loaded: false` o `loader.syncing: true` se excluyen de la selección principal de API y WebSocket. `onReady` (y `api.isReady`) espera con un retroceso de reintento de inicio limitado (5s, 10s, 30s, 60s) hasta que un nodo utilizable esté realmente listo para atender consultas, y los clientes inicializados cuentan con una alternativa de sincronización limitada por altura si todos los nodos completamente sincronizados fallan.

### POST /api/states/get y alineación estricta de tipos en v0.11.0

Para consultar decenas o cientos de claves KVS o direcciones de remitente sin alcanzar los límites de longitud de URL, pase `{method: 'POST'}` a `getKVS()`:

```js
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

Las interfaces de TypeScript (`ChatroomsOptions`, `ChatTransactionsOptions` y `KVSOptions`) reflejan ahora la estricta validación de consultas de ADAMANT Node v0.11.0, de modo que los campos no admitidos se detectan en tiempo de compilación, y el generador de OpenAPI se sincroniza directamente desde `Adamant-im/adamant`.

### Seguridad de la cadena de suministro y cuarentena de 7 días

Siguiendo la política de seguridad de ADAMANT introducida en Node v0.11.0, adamant-api aplica ahora una cuarentena de 7 días de antigüedad de lanzamiento (`minimumReleaseAge: 10080` en `pnpm-workspace.yaml`), restringe los scripts de ciclo de vida de dependencias mediante `allowBuilds`, se distribuye con 0 vulnerabilidades de producción según `pnpm audit` y se publica en npm con la procedencia de Trusted Publishing de GitHub Actions.

```
npm install adamant-api@3.2.0
```

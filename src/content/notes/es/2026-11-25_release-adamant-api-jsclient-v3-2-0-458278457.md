---
title: "ADAMANT API JS Client v3.2.0"
slug: "release-adamant-api-jsclient-v3-2-0-458278457"
description: "ADAMANT API JS Client v3.2.0 es una versión de seguridad y corrección coordinada con ADAMANT Node v0.11.0. Se recomienda actualizar a todos los usuarios de v3.0.0 y v3.1.0."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.2.0"
publishedAt: "2026-11-25T15:08:18Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:458278457"
locale: "es"
placeholder: false
---

ADAMANT API JS Client v3.2.0 es una versión de seguridad y corrección coordinada con ADAMANT Node v0.11.0. Se recomienda a todos los usuarios de v3.0.0 y v3.1.0 actualizar a la versión v3.2.0.

## Verificación de claves públicas de destinatarios y delegados

El SDK ahora aplica la validación canónica de 32 bytes en la curva Ed25519, rechazando claves Curve25519 no canónicas, fuera de curva y de orden pequeño (órdenes 1, 2, 4 y 8), y realiza comprobaciones locales de derivación de direcciones ADM antes de almacenar en caché o cifrar mensajes. El método `getPublicKey()` devuelve una cadena vacía sin realizar una solicitud de red para direcciones ADM no válidas, y devuelve una cadena vacía sin contaminar la caché cuando un nodo devuelve una clave malformada o que no coincide. `sendMessage()` vuelve a verificar localmente las claves de destinatario resueltas y rechaza las claves no válidas o que no coinciden con un resultado `{success: false, errorMessage}`, mientras que `voteForDelegate()` rechaza las claves de delegado que no superan la vinculación de dirección. `publicKeysCache`, respaldada por un `Map`, se verifica tanto en escritura como en lectura, y las cachés de delegados dependientes de la red (`byAddress`, `byUsername`) están aisladas por cada instancia de `AdamantApi`.

## Corrección de KVS y filtro de chat

Los métodos `getKVS()`, `getChatTransactions()`, `getChats()` y `getChatMessages()` ahora emiten nombres de filtro simples, eliminando los contenedores explícitos `and: { ... }` para ajustarse al contrato de nodo documentado en todas las versiones de ADAMANT Node. Los contenedores `or` no admitidos y las claves de filtro con prefijos `and:` o `or:` en endpoints que solo aceptan AND se rechazan en el lado del cliente con `{success: false, errorMessage}` en lugar de enviar prefijos que los nodos antiguos ignoran y los nodos v0.11.0+ rechazan. Esto se verificó con una prueba de fixture registrada de `/api/states/get` en la red principal.

## Disponibilidad de nodos y filtrado del cargador

Los nodos que informan `loader.loaded: false` o `loader.syncing: true` se excluyen de la selección de nodos activos principales y de las listas de conexión WebSocket, mientras que los nodos heredados sin un objeto `loader` siguen siendo elegibles. La devolución de llamada `onReady` (y `api.isReady`) se mantiene hasta que se selecciona un nodo utilizable, reintentando las comprobaciones de inicio con un retroceso limitado de 5s, 10s, 30s y 60s, continuando incluso si un barrido anterior falla, en lugar de esperar al barrido periódico de 5 minutos. Cuando ya se ha inicializado y todos los nodos listos fallan o están por debajo de `minVersion`, el SDK recurre con una advertencia a un nodo cargado pero sincronizándose que sea compatible con `minVersion`, solo cuando hay una referencia de altura sincronizada reciente disponible dentro de los últimos 10 minutos y el candidato está dentro de 25 bloques de esa altura. Se evita que la devolución de llamada `onReady` se dispare dos veces si falla, y las respuestas que no son objetos, como las páginas de mantenimiento HTML 200, valores nulos o cargas útiles de estado `{success: true}` incompletas, se omiten de forma segura.

## Alineación de API, OpenAPI y POST de KVS con ADAMANT Node v0.11.0

La generación determinista de DTO de API (`scripts/sync-api-types.mjs`) ha migrado del repositorio archivado `Adamant-im/adamant-schema` a `Adamant-im/adamant` (`openapi/specification/openapi.yaml` en el commit maestro de la versión v0.11.0 `50568f37dc2b7da86f44991f96c40c8edde74d67`), leyendo las versiones exactas de las herramientas instaladas mediante `createRequire`. El archivo generado `src/api/generated.ts` se ha regenerado con `RateLimitErrorResponseDto`, `GetKVSRequestBody` y enlaces actualizados a `https://docs.adamant.im/`. Los tipos de opciones de endpoint (`ChatroomsOptions`, los nuevos `ChatTransactionsOptions` y `KVSOptions`) están alineados con la validación estricta de filtros de ADAMANT Node v0.11.0, con `toHeight` aplicado en `/api/chats/get` y `/api/states/get`, y filtros de altura/rango excluidos de `/api/chatrooms/*`. `ChatroomsOptions.userId` está obsoleto y se elimina en tiempo de ejecución en `/api/chatrooms/*` con una advertencia de obsolescencia única, para que las llamadas heredadas no fallen en la validación en nodos v0.11.0+. Se ha añadido soporte para `POST /api/states/get` a través de `api.getKVS(options, {method: 'POST'})` para consultas grandes de `keyIds` o `senderIds`, con conmutación por error de lectura idempotente completa que coincide con `GET`.

## Resiliencia ante HTTP 429 y fortalecimiento de la conmutación por error

El SDK captura `targetNode` antes de cada solicitud para que los fallos concurrentes nunca devuelvan `this.node` a un nodo fallido. Ante respuestas HTTP 429 de múltiples nodos, cambia inmediatamente a otro nodo sincronizado y sin límite de tasa almacenado en caché sin sondas adicionales de `/api/node/status`, omite los barridos de salud en respuestas 429 de un solo nodo y maneja el 429 en `checkNode()` de forma distinta a los nodos fuera de línea. Los barridos concurrentes de `updateNodes()` se desduplican mediante una promesa en vuelo, y un barrido planificado en vuelo se actualiza a conmutación por error forzada cuando una solicitud informa de un nodo fallido. El SDK rota fuera del `failedNode` tanto en conjuntos sincronizados de 2 nodos como de 3+ nodos y realiza un seguimiento de los enfriamientos por 429 de cada nodo (`rateLimitedUntil`, limitado a 60s) para que los barridos de salud forzados y planificados eviten los nodos con límite de tasa hasta que expire el enfriamiento. Analiza los encabezados `Retry-After` (segundos o fecha HTTP), `RateLimit-Reset` y `RateLimit-Scope`, conmuta por error inmediatamente para lecturas idempotentes (`GET` y `POST /api/states/get`) cuando existe otro nodo sincronizado, o respeta el retroceso limitado con fluctuación de hasta 10s en un solo nodo sin entrar en bucles cerrados. Los metadatos opcionales `status`, `retryAfterMs` y `rateLimitScope` se exponen en los resultados de fallo HTTP 429 en `AdamantApiResult`, mientras que las solicitudes de escritura `POST` permanecen estrictamente sin reintento.

## Actualización de seguridad de dependencias y cuarentena de 7 días

La versión aplica `minimumReleaseAge: 10080` (7 días) y configuraciones explícitas de `allowBuilds` (`'@parcel/watcher': false`, `esbuild: true`, `unrs-resolver: true`) en `pnpm-workspace.yaml` sin exclusiones por antigüedad. Las dependencias directas y transitivas se han actualizado más allá del corte de 7 días, incluyendo axios, bitcoinjs-lib, tiny-secp256k1, pbkdf2, socket.io-client, bip39, ecpair, semver, @redocly/cli, eslint, jest, prettier y swagger-typescript-api, reduciendo los hallazgos de auditoría de producción de 20 a 0. La publicación se realiza mediante GitHub Actions npm Trusted Publishing con procedencia de compilación.

## Validación

Verificado en Node.js v24.19.0 y pnpm 11.13.1. El conjunto completo de pruebas (`pnpm test`) cubre 20 suites y 333 pruebas con un 100% de cobertura de funciones, y `gts lint` fue aprobado. Las comprobaciones de tipo de API coinciden con los commits referenciados de ADAMANT y adamant-wallets. Las compilaciones de documentación de TypeDoc y VitePress fueron aprobadas. Las pruebas de paquete para ESM, CommonJS, consumidores en vivo, subrutas de paquetes y declaraciones de TypeScript fueron aprobadas. La auditoría de producción informa 0 vulnerabilidades y los 893 paquetes bloqueados tienen firmas verificadas.

### Cambios importantes

Las funciones `encodeMessage()` y `decodeMessage()` ahora lanzan `invalid key` para claves Ed25519 no canónicas, fuera de curva y de orden pequeño (órdenes 1, 2, 4 y 8). Las claves legítimas de la red principal no se ven afectadas. El método `getPublicKey()` devuelve una cadena vacía sin una solicitud de red para direcciones ADM no válidas y también devuelve una cadena vacía cuando la clave del nodo no deriva la dirección. El método `sendMessage()` rechaza a dichos destinatarios con `{success: false, errorMessage}`, y `voteForDelegate()` rechaza las claves de delegado que no superan la vinculación de dirección.

Los cambios de restricción de opciones de consulta de TypeScript afectan a `ChatroomsOptions` y `KVSOptions`, por lo que ya no heredan campos de `TransactionQueryParameters` no admitidos que ADAMANT Node v0.11.0 rechaza. El método `getChatTransactions()` ahora utiliza `ChatTransactionsOptions`, un superconjunto de `ChatroomsOptions` que conserva `fromHeight`, `toHeight`, `inId` e `isIn`. `TransactionQueryParameters` permanece exportado sin cambios.

Llamar a `transformTransactionQuery(query, 'states' | 'chats' | 'chatrooms')` directamente con un contenedor `or` o claves de filtro con prefijos `and:` o `or:` ahora lanza un `Error` con el mensaje `badParameter`, mientras que los métodos de cliente `AdamantApi` devuelven `{success: false, errorMessage}`.

El filtro `toHeight` en `getKVS()` y `getChatTransactions()` es aplicado solo por ADAMANT Node v0.11.0+. Los nodos antiguos ignoran silenciosamente `toHeight` y devuelven registros más recientes con `success: true`, por lo que los llamadores que dependen de un límite de altura superior deben establecer `minVersion: '0.11.0'`.

El campo `userId` en `/api/chatrooms/*` está obsoleto en `ChatroomsOptions` y se elimina en tiempo de ejecución con una advertencia dedicada. Los llamadores deben pasar la dirección de la cuenta solo como argumento de ruta URL de `getChats(address)` o `getChatMessages(address1, address2)`.

Con `checkHealthAtStartup: true`, `onReady` ahora espera y `api.isReady` permanece `false` hasta que se selecciona un nodo utilizable, cargado y no sincronizándose, reintentando las comprobaciones de inicio con retroceso de 5s, 10s, 30s y 60s.

Se añaden los campos opcionales `status`, `retryAfterMs` y `rateLimitScope` a la variante `success: false` de `AdamantApiResult` cuando una solicitud falla con HTTP 429.

El diseño de bytes de transacción, hashes, IDs, firmas, cifrado, derivación de billetera y exportaciones raíz permanecen sin cambios.

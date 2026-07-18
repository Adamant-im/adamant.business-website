---
title: "Acceso completo tipado de solo lectura a las API de ADAMANT Node"
slug: "discussion-67-complete-typed-read-only-access-to-adamant-node-apis-10446764"
description: "El SDK adamant api ahora expone una superficie tipada completa para las API de ADAMANT Node, de lectura intensiva, utilizadas por exploradores, servicios de monitoreo, billeteras, bots y otras integraciones."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/67"
publishedAt: "2026-07-17T10:54:30Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10446764"
locale: "es"
placeholder: false
---

El SDK `adamant-api` ahora expone una superficie tipada completa para las API de ADAMANT Node de lectura intensiva utilizadas por exploradores, servicios de monitoreo, billeteras, bots y otras integraciones. Los consumidores ya no necesitan llamadas genéricas `api.get()` ni conversiones locales de respuestas para las consultas principales de cuentas, bloques, delegados, pares, pool y estado de la red introducidas o ampliadas en ADAMANT Node v0.10.2.

## Cobertura

El SDK expone `getTopAccounts()` con paginación tipada y filtrado por delegados. La respuesta incluye el orden determinista de saldos del Node y los metadatos de paginación; las solicitudes con `limit: 0` devuelven únicamente metadatos de conteo sin retornar filas de cuentas.

```ts
const topDelegates = await api.getTopAccounts({
  limit: 50,
  offset: 0,
  isDelegate: 1,
});

const countOnly = await api.getTopAccounts({limit: 0});
```

Los tipos de opciones públicas ahora cubren listas y búsquedas de bloques, listas de delegados con búsqueda de delegado individual, búsqueda por nombre de usuario, estadísticas de forjado, votantes y proyecciones del próximo forjador, listas de pares conectados y búsqueda exacta de pares, listas y búsquedas de transacciones en pool, y rangos inclusivos de tiempo de transacciones. Esto hace que el SDK sea utilizable como un límite tipado para servicios de solo lectura, en lugar de ser únicamente un asistente de firma y difusión.

Los contratos generados ahora exponen `consensusCodeName`, el `consensusSchedule` efectivo, el `milestoneSchedule` completo de recompensas por bloque, y los valores `forged` de por vida de los delegados como cadenas de enteros en base 10. La propiedad en tiempo de ejecución `producedblocks` reemplaza el error tipográfico `producedlocks` generado anteriormente. Un servicio puede recuperar la proyección pública de la cadena sin redefinir localmente la respuesta:

```ts
const [network, node] = await Promise.all([
  api.getStatus(),
  api.getNodeStatus(),
]);

console.log(network.consensusCodeName);
console.log(node.consensusSchedule, node.milestoneSchedule);
```

## Semántica de consultas consciente del endpoint

El lenguaje de consultas de transacciones de ADAMANT Node es plano en lugar de un árbol anidado de expresiones booleanas. Serializa las condiciones en una única expresión SQL en el orden de la cadena de consulta, con precedencia SQL normal y sin paréntesis añadidos para objetos `and: {}` u `or: {}`. Por lo tanto, el SDK combina filtros ordinarios de nivel superior con `and` por defecto, preserva el orden de inserción de objetos de JavaScript durante la serialización, y advierte cuando las condiciones mixtas `and` / `or` hacen que el orden en la red sea semánticamente significativo. Restringe controles como `includeDirectTransfers`, `returnAsset` y `userId` a endpoints compatibles, elimina los controles no soportados conocidos antes de enviar la solicitud, y permite filtros de monto únicamente en `/api/transactions`, donde el Node realmente los aplica. Esto es intencionalmente más estricto que reenviar cada opción compartida a cada endpoint — una llamada tipada debe representar un comportamiento que la ruta del Node seleccionada realmente implementa.

## Procedencia del esquema y compatibilidad

`src/api/generated.ts` se genera de forma reproducible a partir de `Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90`. El repositorio verifica el archivo generado con `npm run api-types:check`, mientras que las pruebas del consumidor del paquete compilan las declaraciones exportadas y ejercitan los puntos de entrada ESM y CommonJS construidos. La corrección de `producedlocks` a `producedblocks` es un cambio de compatibilidad en tiempo de compilación; los consumidores que construyan fixtures de delegados o de estado manualmente pueden necesitar añadir los campos recién requeridos. El manejo de respuestas en tiempo de ejecución sigue siendo transparente — las respuestas de Nodes anteriores no son transformadas ni rechazadas por el SDK.

## Estado en vivo junto con lecturas de instantánea

La misma alineación con Node v0.10.2 añade manejadores optativos de WebSocket para eventos compactos `newBlock` y eventos de `balances/change` confirmados o no confirmados. Las suscripciones se restauran tras la reconexión, y los valores de saldo son reemplazos absolutos en lugar de deltas. Estos eventos complementan las lecturas REST tipadas pero no las reemplazan: no hay repetición ni instantánea inicial de saldos, una carga útil de saldo puede contener únicamente los campos que cambiaron, y los eventos entregados durante la desconexión no se rellenan retroactivamente. Los clientes críticos deben reconciliar bloques y saldos a través de REST tras la reconexión.

## Límites de compatibilidad

Las nuevas capacidades de cuentas principales, estado de red, delegados, bloques y eventos de saldo requieren ADAMANT Node v0.10.2. La construcción de transacciones existente, el diseño de bytes, el hashing, los IDs, las firmas, el cifrado, los reintentos, la conmutación por error y la selección de nodo activo permanecen sin cambios. La raíz del paquete sigue centrada en ADM; los auxiliares de monedas externas continúan usando exportaciones explícitas de subrutas. El SDK requiere Node.js 22.12.0 o superior, mientras que los operadores de ADAMANT Node v0.10.2 deben seguir el requisito de 22.13.0 o superior del Node.

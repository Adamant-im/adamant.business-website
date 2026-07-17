---
title: "ADAMANT Node v0.10.2: Recuperación más segura, APIs más ricas y consultas más rápidas"
slug: "discussion-66-adamant-node-v0-10-2-safer-recovery-richer-apis-and-faster-queries-10442742"
description: "ADAMANT Node v0.10.2 mejora la disponibilidad del nodo, la recuperación rápida, el manejo seguro de fallos de base de datos, APIs de observación más ricas y suscripciones de cliente más eficientes."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/66"
publishedAt: "2026-07-16T18:19:41Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10442742"
locale: "es"
placeholder: false
---

ADAMANT Node v0.10.2 se centra en la disponibilidad del nodo, una recuperación más rápida, un manejo más seguro de fallos de base de datos, APIs de observación más ricas y suscripciones de cliente más eficientes. Se recomienda la actualización, pero no es obligatoria para la compatibilidad de red: esta versión no contiene ningún fork de consenso y no modifica la serialización de bloques o transacciones, firmas, ordenamiento de delegados, recompensas, comisiones, alturas de activación, temporización de slots ni la reproducción determinista.

## Recuperación de sincronización

Anteriormente, un fallo en un callback o en la base de datos dentro del pipeline de sincronización podía dejar a un nodo reportando permanentemente que estaba sincronizando sin avanzar. En ese estado, rechazaba bloques en vivo, nunca iniciaba otra sincronización y requería un reinicio manual. La v0.10.2 introduce un watchdog basado en progreso que detecta una ejecución de sincronización que no ha aplicado ningún bloque nuevo durante cinco minutos. La ejecución estancada se aborta mediante una señal de detención con alcance de ejecución; ninguna nueva mutación de estado puede comenzar después de la señal de aborto, y el trabajo de bloques/cuentas en curso se drena antes de que el cargador libere su estado de sincronización. Las consultas rechazadas de PostgreSQL ahora se propagan a través de la verificación de bloques, la carga de bloques y las actualizaciones de tablas de memoria al inicio, en lugar de estacionar silenciosamente las cadenas de callbacks. Estos son cambios exclusivos de disponibilidad y propagación de errores; no alteran qué bloques son válidos.

## Checkpoints persistentes

ADAMANT mantiene el estado derivado del consenso en las tablas `mem_*`. Si un proceso se interrumpe mientras se actualizan esos espejos, el nodo debe reconstruirlos a partir de los bloques canónicos. La v0.10.2 añade tres slots rotativos de checkpoint para el estado de memoria derivado. Cada checkpoint registra la altura/ID del bloque, ronda, nethash, versión del esquema, estado y digest SHA-256 canónico. El inicio solo acepta checkpoints cuyos metadatos, digest, referencia de cadena, red e invariantes de estado pasen la validación. Se restaura un checkpoint válido y solo se reproducen los bloques posteriores; cualquier fallo de validación o reproducción parcial recurre a la reconstrucción determinista completa existente. Las tablas de unión no confirmadas no se almacenan en checkpoint y se reconstruyen desde el estado confirmado. Los bloques canónicos y la reproducción determinista siguen siendo la fuente de verdad: un checkpoint es solo una caché local de recuperación y no puede redefinir el estado de la cadena.

## Mejoras en la API REST

`GET /api/accounts/top` ahora está disponible de forma consistente en cada nodo, proporcionando un ordenamiento determinista `balance DESC, address ASC`, paginación, un filtro `isDelegate`, metadatos de conteo y solicitudes de solo conteo con `limit=0`.

Se corrigen varios errores en la API de delegados. `GET /api/delegates/get` vuelve a reportar el rango/tasa real del delegado y la productividad correcta de externos. `GET /api/delegates/voters` ya no puede perder su filtro de dirección y devolver todas las cuentas. `GET /api/delegates/getNextForgers` utiliza la altura del siguiente bloque en los límites de ronda y reporta un error de carga estable antes de que exista una punta de cadena.

Las APIs de estado y delegados ahora exponen el `consensusCodeName` activo, el calendario efectivo de activación de consenso tras los valores predeterminados y las anulaciones en tiempo de ejecución, el calendario completo de hitos de recompensa por bloque, y la cantidad `forged` de por vida de cada delegado como una cadena de enteros en base 10. Esto reduce la dependencia de calendarios codificados duplicados y expone la configuración efectiva del nodo sin cambiar el comportamiento de consenso.

`GET /api/blocks` ahora respeta `numberOfTransactions=0`. Un nuevo índice B-tree compuesto en `(text_generatorPublicKey, height DESC)` evita la costosa ruta de filtrado de tabla completa para un generador desconocido combinado con el ordenamiento predeterminado. El contrato de respuesta no cambia. En una base de datos grande, los operadores deben permitir tiempo y espacio en disco para la migración del índice durante el primer inicio.

## Eventos de bloque y balance de Socket.IO

Los servicios ahora pueden suscribirse a eventos compactos `newBlock` y eventos `balances/change` para `balance`, `unconfirmedBalance` o ambos. El nodo mantiene índices de suscripción dedicados para que no se escaneen sockets no relacionados. Las lecturas de balance se agrupan alrededor de la aplicación/reversión de bloques, y los fallos de publicación de eventos se aíslan de la mutación de estado. Estos eventos son de mejor esfuerzo y no duraderos; los clientes deben restaurar sus suscripciones tras reconectarse y usar la reconciliación REST para el estado crítico.

## Mantenimiento de dependencias y auditoría

Las dependencias de ejecución y desarrollo se actualizaron dentro de sus versiones mayores actuales. Se eliminó la dependencia directa de `npm` en tiempo de ejecución no utilizada y su subárbol empaquetado, y se añadió una anulación compatible y estrecha de Grunt/js-yaml. La línea base de auditoría verificada pasó de 4 hallazgos moderados y 1 alto a cero hallazgos moderados, altos o críticos. No cambió ningún comportamiento de protocolo criptográfico, firma, mnemónica, handshake entre pares o validación de transacciones.

## Notas para operadores

Continúe usando Node.js 22.13.0 o superior. Realice una copia de seguridad de la base de datos con el procedimiento habitual, detenga el nodo de forma controlada y espere a `Cleaned up successfully`. Permita que el primer inicio de la v0.10.2 complete las migraciones y la creación de checkpoints e índices. Planifique espacio adicional en disco para los tres slots rotativos de checkpoint de estado derivado. Tras el inicio, verifique `/api/node/status`, el progreso de sincronización, el procesamiento de bloques en vivo y las capacidades REST/Socket.IO que utilizan sus servicios.

## Referencias

- [GitHub Release v0.10.2](https://github.com/Adamant-im/adamant/releases/tag/v0.10.2)
- [Documentación de ADAMANT Node](https://docs.adamant.im)
- [Esquema de la API de ADAMANT](https://schema.adamant.im)

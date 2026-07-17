---
title: "ADAMANT Node v0.10.2: Recuperación de sincronización, puntos de control verificados y mejoras en la API"
slug: "a-stronger-foundation-for-decentralized-communication-769bb1723e89"
description: "ADAMANT Node v0.10.2 mejora la recuperación de sincronización, introduce puntos de control verificados para el estado derivado, amplía las capacidades de REST y Socket.IO, corrige casos límite de la API, optimiza consultas y actualiza dependencias."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-stronger-foundation-for-decentralized-communication-769bb1723e89"
publishedAt: "2026-07-16T18:30:13.394Z"
author: "Alex Web3"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:769bb1723e89"
coverImage: "/images/engineering-notes/medium/769bb1723e89/001-23318e9ae1.webp"
locale: "es"
placeholder: false
---

## Resumen

ADAMANT Node v0.10.2 mejora la recuperación de sincronización, introduce puntos de control verificados para el estado derivado, amplía las capacidades de REST y Socket.IO, corrige varios casos límite de la API, optimiza las consultas a la base de datos y actualiza las dependencias. Esta versión preserva el comportamiento existente del protocolo y no introduce una bifurcación de consenso.

El registro de cambios completo está disponible en [GitHub](https://github.com/Adamant-im/adamant/releases/tag/v0.10.2).

## Recuperación de sincronización

Una red descentralizada depende de operadores independientes que ejecutan nodos bajo condiciones variables. Si el software del nodo requiere intervención constante o recuperación a nivel experto, la participación se vuelve más difícil y la red se vuelve menos descentralizada en la práctica.

Anteriormente, una callback interrumpida o un error de base de datos en la canalización de sincronización podía dejar a un nodo creyendo que seguía sincronizándose aunque la altura de sus bloques hubiera dejado de avanzar. El nodo permanecía atascado hasta que un operador lo notaba y lo reiniciaba.

La versión v0.10.2 añade un watchdog de sincronización basado en progreso que distingue entre un nodo lento que aún está aplicando bloques y una ejecución de sincronización genuinamente detenida. Si no se registra progreso en la altura de bloque durante la ventana configurada, el nodo aborta de forma segura esa ejecución, drena cualquier mutación de estado en curso y permite que la sincronización comience de nuevo. Esta versión también corrige las rutas de rechazo de la base de datos que podían dejar silenciosamente las callbacks de procesamiento de bloques sin finalizar.

Este no es un cambio de consenso. No decide qué bloques son válidos; ayuda a un nodo a volver a la operación normal cuando la canalización de ejecución circundante se detiene.

## Puntos de control verificados para el estado derivado

Los nodos de ADAMANT mantienen tablas derivadas `mem_*` para saldos, delegados, rondas y estado relacionado. La blockchain sigue siendo canónica, pero reconstruir todo el estado derivado después de un apagado interrumpido puede llevar mucho tiempo en una cadena madura.

La versión v0.10.2 introduce puntos de control rotativos y persistentes para ese estado derivado. Cada punto de control está vinculado a un bloque y una red conocidos, porta un resumen canónico y se valida antes de su uso. Cuando un nodo arranca con espejos de memoria inconsistentes, puede restaurar el último punto de control verificado y reproducir solo los bloques posteriores a él.

El modelo de seguridad es conservador. Un punto de control solo se acepta después de verificar sus metadatos, resumen, referencia de cadena, red e invariantes de estado. El estado no confirmado se reconstruye en lugar de confiarse desde un punto de control. Si algún paso de validación o reproducción parcial falla, el nodo recurre a la reconstrucción determinista completa existente. Los bloques canónicos y la reproducción determinista siguen siendo la fuente de verdad, por lo que el punto de control es una ruta de recuperación más rápida en lugar de estado del protocolo.

## Mejoras en la API REST

ADAMANT es una capa de confianza descentralizada para productos de comunicación, no solo una base de datos blockchain. La versión v0.10.2 añade un endpoint consistente de cuentas principales con ordenamiento determinista, paginación, filtrado por delegados y solicitudes de solo conteo, eliminando soluciones alternativas específicas del nodo para exploradores y herramientas de análisis.

La versión también expone el nombre en clave de consenso activo del nodo, el programa de activación efectivo, el programa completo de hitos de recompensas y la cantidad forjada de por vida de cada delegado. Los sistemas de monitoreo y los exploradores ahora pueden leer los programas efectivos directamente desde un nodo en lugar de duplicar la configuración en cada cliente.

Varias APIs de delegados existentes son más precisas. Las respuestas de delegado único vuelven a informar el rango real y el contexto de productividad. Las consultas de votantes de delegados ya no corren el riesgo de devolver cuentas no relacionadas cuando se usa un filtro de lista de direcciones. Las proyecciones del próximo forjador ahora usan la altura correcta del próximo bloque en los límites de ronda.

La API de bloques recibió una corrección tanto de corrección como de rendimiento: ahora maneja correctamente `numberOfTransactions=0`, y un nuevo índice compuesto de base de datos previene un escaneo costoso al consultar un generador desconocido con el ordenamiento de altura predeterminado.

## Eventos en vivo con Socket.IO

Las aplicaciones que necesitan actualizaciones oportunas ahora pueden suscribirse a dos nuevas familias de eventos Socket.IO del cliente: notificaciones compactas de `newBlock` y notificaciones de `balances/change` para saldo confirmado, saldo no confirmado o ambos.

El nodo mantiene índices de suscripción dedicados y agrupa las lecturas de cuentas afectadas alrededor de la aplicación y reversión de bloques, de modo que no escanea cada cliente conectado ni realiza consultas innecesarias de cuentas cuando nadie está suscrito a los datos modificados.

Estos eventos son de mejor esfuerzo y no duraderos. Las aplicaciones deben restaurar las suscripciones después de reconectarse y seguir conciliando el estado crítico a través de REST. Los eventos en vivo reducen el sondeo pero no reemplazan la verificación.

## Línea base de dependencias

La versión actualiza las dependencias dentro de sus versiones mayores existentes, elimina una dependencia directa de npm en tiempo de ejecución no utilizada y su gran subárbol incluido, y aplica una anulación de compatibilidad estrecha para una dependencia transitiva de la cadena de herramientas. La línea base verificada de auditoría de npm pasó de cuatro hallazgos moderados y uno alto a cero hallazgos moderados, altos o críticos.

No se cambió ningún comportamiento de protocolo criptográfico, firma, mnemónico, handshake entre pares o validación de transacciones como parte de este mantenimiento.

## Notas de actualización

Actualizar a la versión v0.10.2 **no es obligatorio** para la compatibilidad con la red. La versión no cambia la serialización de bloques o transacciones, firmas, ordenamiento de delegados, recompensas, comisiones, alturas de activación, temporización de slots ni la reproducción determinista. Los nodos compatibles existentes pueden continuar participando. cryptofoundry recomienda la actualización para operadores que deseen una mejor recuperación de sincronización, restauración más rápida después de apagados interrumpidos, mantenimiento de seguridad, mejor rendimiento de consultas y las nuevas capacidades de la API.

ADAMANT Node sigue requiriendo Node.js 22.13.0 o superior. El primer arranque después de actualizar aplica nuevas migraciones de base de datos. Los operadores deben seguir su procedimiento normal de respaldo, detener el nodo de forma controlada, esperar a `Cleaned up successfully`, y permitir tiempo y espacio en disco suficientes para que se creen las tablas de puntos de control y los nuevos índices. Después del arranque, verificar el estado del nodo, el progreso de sincronización, el procesamiento en vivo de bloques y cualquier capacidad de REST o Socket.IO utilizada por los servicios conectados.

Hay más recursos disponibles en la [documentación de ADAMANT Node](https://docs.adamant.im), el [esquema de la API de ADAMANT](https://schema.adamant.im) y la [discusión técnica de la versión](https://github.com/orgs/Adamant-im/discussions/66).

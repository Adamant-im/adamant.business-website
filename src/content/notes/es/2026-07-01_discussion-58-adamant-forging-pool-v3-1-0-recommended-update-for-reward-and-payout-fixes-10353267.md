---
title: "ADAMANT Forging Pool v3.1.0: Correcciones de Recompensas y Pagos"
slug: "discussion-58-adamant-forging-pool-v3-1-0-recommended-update-for-reward-and-payout-fixes-10353267"
description: "ADAMANT Forging Pool v3.1.0 es una actualización recomendada para operadores de pools. Corrige cálculos de recompensas y pagos programados, e incluye mejoras estructurales clave."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/58"
publishedAt: "2026-07-01T14:33:27Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10353267"
locale: "es"
placeholder: false
---

ADAMANT Forging Pool v3.1.0 es una actualización recomendada para operadores de pools. Esta versión corrige y refuerza los cálculos de recompensas y el manejo de pagos programados, e introduce varios cambios estructurales que vale la pena revisar antes de actualizar los pools en producción.

## Por qué actualizar

Los cambios más importantes se enfocan en la seguridad de los pagos, la seguridad del operador y la mantenibilidad a largo plazo. Las recompensas pendientes ahora se normalizan antes del cálculo de pagos, y el progreso de recompensas por votante se almacena para bloques forjados. Las rutas de reintento y fallos son más seguras frente a actualizaciones duplicadas de recompensas. Las rutas de pago, análisis de bloques y almacenamiento ahora tienen pruebas más específicas, y los registros y notificaciones son más claros ante fallos operativos.

## Almacenamiento y Migración

El almacenamiento del pool ahora utiliza MongoDB. La versión incluye herramientas de migración para datos de pools anteriores basados en LowDB, ubicadas en `scripts/migrate-lowdb-mongodb/`, junto con pruebas de migración, configuración de índices de MongoDB, una referencia de configuración actualizada y guía en el README. Los operadores deben respaldar los datos existentes del pool, probar la migración en una copia y verificar los totales de recompensas pendientes y recibidas antes de cambiar los pagos en producción al pool actualizado.

## Seguridad del Operador

v3.1.0 añade soporte opcional para frases de acceso cifradas. Las configuraciones con frases de acceso en texto plano siguen siendo compatibles, pero ahora los operadores pueden cifrar la frase de acceso del delegado y desbloquear el pool en ejecución solo cuando se deban habilitar los pagos:

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```

La interfaz de control utiliza un socket Unix local accesible solo por el propietario. Con una frase de acceso cifrada, el pool puede iniciarse bloqueado: la sincronización de bloques, el panel de control y la API pública permanecen disponibles, mientras que los pagos y notificaciones ADM se mantienen en pausa hasta el desbloqueo.

## Monitoreo y Panel de Control

La versión añade un punto final `/api/health` para monitoreo externo sin necesidad de secretos, junto con el estado de pago bloqueado en el panel. Ahora se admite el filtrado de votantes y transacciones por dirección o nombre, y los nombres del delegado y votante se muestran bajo las direcciones cuando están disponibles. Las correcciones de orden numérico, enlaces mejorados al explorador y mejoras en el diseño del panel completan los cambios.

## Notas sobre Tiempo de Ejecución y Actualización

El entorno de ejecución ahora requiere Node.js 22.13.0+ y npm 10+. Se ha actualizado el README, CONTRIBUTING y la documentación del repositorio para cubrir configuración, migración, seguridad de secretos y flujo de contribución.

Antes de actualizar, respalde la configuración y el historial de recompensas, revise la configuración de MongoDB en `config.default.jsonc` y pruebe la migración de LowDB a MongoDB en una copia de los datos. Tras la migración, verifique los totales de recompensas pendientes y recibidas, revise la configuración de las billeteras de pago y mantenimiento, compile y pruebe el panel, y compruebe `/api/health`. Habilite los pagos solo tras verificar los registros de inicio y el estado del pool.

Lanzamiento y repositorio: [github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)

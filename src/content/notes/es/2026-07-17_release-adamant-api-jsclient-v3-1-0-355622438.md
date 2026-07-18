---
title: "ADAMANT API JS Client v3.1.0"
slug: "release-adamant-api-jsclient-v3-1-0-355622438"
description: "Esta versión es una actualización del SDK coordinada con ADAMANT Node v0.10.2. Completa la superficie de la API de Node de solo lectura con tipos, añade suscripciones en vivo opcionales de bloques y saldos, sincroniza los DTO de delegados y estado de red con el esquema autoritativo y actualiza las herramientas del paquete."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.1.0"
publishedAt: "2026-07-17T10:54:11Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:355622438"
locale: "es"
placeholder: false
---

Esta versión es una actualización del SDK coordinada con ADAMANT Node v0.10.2. Completa la superficie de la API de Node de solo lectura con tipos, añade suscripciones en vivo opcionales de bloques y saldos, sincroniza los DTO de delegados y estado de red con el esquema autoritativo y actualiza las herramientas del paquete.

## API de Node de solo lectura completamente tipada

Esta versión añade `getTopAccounts()` con las opciones tipadas `limit`, `offset` e `isDelegate`, donde `limit: 0` puede usarse para obtener solo metadatos de conteo. Completa los tipos de opciones para bloques, delegados, búsqueda de delegados y estadísticas, pares, transacciones en pool y rangos de tiempo de transacciones. La versión expone el codename de consenso y los calendarios de activación tipados, los hitos de recompensa por bloque y los montos forjados de por vida de los delegados. También amplía las verificaciones empaquetadas del consumidor para que los nuevos métodos y contratos de respuesta se verifiquen desde el artefacto npm compilado.

## Manejo de consultas consciente de endpoints

El SDK ahora restringe los parámetros de transferencia directa y otros parámetros de control a los endpoints que los soportan. Elimina los controles no soportados conocidos antes de enviar una solicitud en lugar de permitir que se vuelvan filtros ineficaces o inválidos, preservando el orden determinista de la cadena de consulta. El cliente advierte cuando las condiciones mixtas `and` / `or` dependen del modelo de expresión SQL plano y sensible al orden del Node, y mantiene los filtros de monto limitados a `/api/transactions`, donde el Node realmente los aplica.

## Suscripciones de estado WebSocket del cliente

Esta versión añade suscripciones opcionales `onNewBlock()` para encabezados compactos de bloques recién aplicados, así como suscripciones `onBalanceChange()` para saldo confirmado, saldo no confirmado o ambos. Los payloads de saldo se tratan como valores absolutos actuales en lugar de deltas, y se documenta la entrega de campos parciales. Las suscripciones de bloques y saldos se restauran automáticamente al reconectarse al mismo u otro nodo saludable. Los fallos de los manejadores se enrutan a través de la ruta existente `.catch()`, y los manejadores pueden eliminarse mediante `.off()`. Estos eventos son notificaciones en vivo de mejor esfuerzo, no flujos duraderos. Las aplicaciones deben restaurar el estado a través de REST después de desconexiones cuando la corrección dependa del historial completo.

## Sincronización autoritativa de DTO

Los tipos de API se regeneran desde `Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90`. La versión añade `consensusCodeName`, `consensusSchedule` y `milestoneSchedule` a los contratos de estado de red, y añade el valor `forged` de por vida del delegado mientras conserva la forma distinta de respuesta de búsqueda de delegados. Corrige la propiedad generada del delegado `producedlocks` a la propiedad en tiempo de ejecución `producedblocks`, y documenta la semántica de instantánea y filtrado de próximo forjador, delegado, par y transacciones en pool.

## Mantenimiento del paquete y herramientas

La versión del paquete se establece en `3.1.0` y declara Node.js `>=22.12.0`. pnpm se actualiza a 11.13.1 con dependencias de ejecución y desarrollo actualizadas sin añadir dependencias directas. El grafo del lockfile resuelto se reduce de 886 a 876 entradas de paquetes. El formato se alinea con Prettier 3.9, y los directorios locales de agentes de IA y editores se mantienen fuera del repositorio. La publicación se realiza mediante npm Trusted Publishing con proveniencia de GitHub Actions.

## Notas de compatibilidad

Las nuevas capacidades de cuentas principales, estado de red, delegados, bloques y eventos de saldo requieren ADAMANT Node v0.10.2. El diseño de bytes de transacciones, hashes, IDs, firmas, cifrado, exportaciones raíz, selección de nodos, reintentos y comportamiento de conmutación por error permanecen sin cambios. El diff incluye 17 archivos modificados con 1.471 inserciones y 513 eliminaciones, cubriendo el historial completo de `v3.0.0..master` para la API tipada, DTO generados, suscripciones WebSocket, pruebas, documentación, metadatos de versión y actualización de dependencias.

## Validación

Verificado en Node.js 22.23.1 y pnpm 11.13.1. Todas las verificaciones pasaron: `npm run compile`, `npm run typecheck`, `npm test` (19 suites y 253 pruebas pasaron), `npm run lint`, `npm run test:package` (ESM, CommonJS, consumidores en vivo, subrutas del paquete y declaraciones de TypeScript), `npm run api-types:check`, `npm run metadata:check`, `npm run docs:build` y `git diff --check`. Los tipos de API generados coinciden con la revisión fijada de `adamant-schema`, y los metadatos de la billetera coinciden con `Adamant-im/adamant-wallets@54a820b6dc5e0ec77c3a6fbac91d2f7809a2f5b7`.

### Cambios incompatibles

El piso del motor del paquete cambia de Node.js `>=22` a `>=22.12.0`. Los despliegues que también ejecuten ADAMANT Node v0.10.2 deben usar el Node.js `>=22.13.0` requerido por el Node. Los consumidores de TypeScript que usen la propiedad con error tipográfico `DelegateDto.producedlocks` deben migrar a `producedblocks`. Los consumidores que construyan manualmente DTO generados de delegados o estado de red pueden necesitar proporcionar los campos ahora requeridos. Los invocadores de TypeScript que pasaron controles de consulta incompatibles con el endpoint deben usar el tipo de opción para el endpoint previsto.

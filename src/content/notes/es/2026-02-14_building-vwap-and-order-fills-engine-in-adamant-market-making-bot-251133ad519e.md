---
title: "Construyendo el motor VWAP y de ejecución de órdenes en el bot de market making de ADAMANT"
slug: "building-vwap-and-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
description: "El bot de market making de ADAMANT ahora incluye un motor VWAP y de ejecución de órdenes para análisis profesional de ejecuciones."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/building-vwap-order-fills-engine-in-adamant-market-making-bot-251133ad519e"
publishedAt: "2026-02-14T13:30:19.720Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/251133ad519e/001-1-stivdc2giqxmbc5miuwkxa-png.webp"
cardSpan: "full"
originalId: "medium:251133ad519e"
locale: "es"
placeholder: false
---

En el bot de market making de ADAMANT, ya se admiten la gestión dinámica del libro de órdenes, el control de spreads, la provisión de liquidez y estrategias de volumen. Sin embargo, sin un análisis preciso de ejecuciones, solo se ve la mitad del panorama. [Issue #87](https://github.com/Adamant-im/adamant-tradebot/issues/87) introduce una mejora arquitectónica importante: un motor dedicado VWAP y un motor de ejecución de órdenes (módulo Premium) que proporciona análisis de ejecución de nivel profesional.

### Por qué es importante el VWAP

La mayoría de las APIs de exchanges ofrecen información fragmentada. Las órdenes pueden ejecutarse parcialmente, las actualizaciones de estado pueden tener retraso, algunos exchanges devuelven datos de ejecución incompletos, y los reinicios pueden provocar la pérdida del contexto interno de ejecución. Si un bot no almacena y verifica correctamente los datos de ejecución, el PnL se vuelve inexacto, el seguimiento de posiciones pierde confiabilidad, la lógica de gestión de riesgos falla, y los ajustes de spread y liquidez se basan en suposiciones en lugar de en la realidad.

Para operar a nivel institucional, el motor utiliza un seguimiento persistente de ejecuciones, reconciliación verificada de ejecuciones, cálculo adecuado de VWAP y análisis con conocimiento del inventario.

### La solución: motor dedicado de VWAP y ejecuciones

La incidencia #87 introduce un subsistema dedicado con tres componentes principales.

**Almacenamiento de eventos de ejecución en bruto (solo anexado).** Una `fillsDb` dedicada almacena eventos de ejecución en bruto en modo de solo anexado, conservándose tras los reinicios sin agregación inmediata. Esto garantiza que no se pierda ni sobrescriba ningún dato de ejecución.

**Capa de verificación de exchange.** Cada evento de ejecución debe verificarse frente a la API del exchange, confirmarse como ejecutado totalmente o parcialmente, y marcarse como procesado solo tras la confirmación. Esto evita ejecuciones falsas positivas cuando el bot carece de conectividad, los nodos del exchange no están disponibles o las respuestas de la API son incompletas. La verificación de ejecución solo ocurre cuando existe conectividad de red y los puntos finales del exchange son accesibles; de lo contrario, operaciones válidas podrían marcarse incorrectamente como fallidas.

La función principal de verificación implementa una política de "verificar siempre que sea posible":

```javascript
/**
 * Verifies a fill order using exchange API.
 *
 * Policy "always verify if possible":
 *  - If api.getOrderDetails() is missing -> cannot disprove -> treat as confirmed
 *  - If status missing or exception -> return undefined (try again later)
 *  - If API says 'filled' -> confirmed
 *  - If API says explicitly not filled ('new'|'part_filled'|'cancelled') -> rejected
 *  - If API says 'unknown' -> keep (cannot disprove) but warn
 *
 * @param {FillOrder|Object} order Fill order record or Order object
 * @param {any} api API instance (spot first/second account, or other compatible trader api)
 * @param {string} callerName Log context id (usually module and method which calls) to quickly find related logs
 * @returns {Promise<VerifyFillResult | undefined>
 */
async function verifyOrderFilled(order, api, callerName)
```

**Estadísticas agregadas de ejecución.** Un segundo almacén persistente, `filledStatsDb`, acumula el volumen total de activo base comprado y vendido, el volumen total de activo cotizado gastado y recibido, y contadores de ejecuciones completas, parciales, rechazadas y faltantes. A partir de esto, se calculan métricas clave.

### Métricas clave

La estructura del objeto de estadísticas base:

```javascript
/**
 * Creates a base FillsEngineStatsResult object with zeroed / default values.
 *
 * @param {string} statsId Format: `${exchange}:${pair}:${purpose}:${startTs}`
 * @param {string} pair Trading pair, e.g., `BTC/USDT`
 * @param {FilledStatsRecord | undefined | null} stats Epoch stats (optional)
 * @returns {FillsEngineStatsResult}
 */
function createBaseEpochStats(statsId, pair, stats) {
  return {
    statsId,
    pair,
    updatedAt: stats?.updatedAt || 0,

    buy: stats?.buy ? { ...stats.buy } : emptySide(),
    sell: stats?.sell ? { ...stats.sell } : emptySide(),

    // Calculated later
    boughtVwap: 0,
    soldVwap: 0,

    hasBothSides: false,
    vwapSpread: 0,
    vwapSpreadPercent: 0,

    pnlQuoteCashflow: 0,
    inventoryBase: 0,
    markPrice: undefined,
    pnlQuoteMtm: undefined,
  };
}
```

**VWAP (Precio promedio ponderado por volumen)** se calcula por lado como Buy VWAP y Sell VWAP usando la fórmula `VWAP = Volumen total de cotización / Volumen total de base`. Esto refleja la calidad real de ejecución, no solo el precio de colocación de la orden.

**Spread VWAP** es la diferencia entre Buy VWAP y Sell VWAP, mostrando el spread real obtenido en lugar del spread teórico.

**Delta de inventario** es la diferencia entre el volumen total de base comprado y el volumen total de base vendido, utilizado para la gestión de riesgos, seguimiento de exposición de posición y lógica de reequilibrio.

**PnL realizado** es el resultado basado en flujos de efectivo de operaciones ejecutadas, con PnL opcional de marca-a-mercado usando el precio de mercado actual.

### Impacto arquitectónico

El nuevo motor es un componente completamente modular que se integra limpiamente en la arquitectura existente sin interrumpir la lógica actual de colocación de órdenes. Opera junto a los sistemas existentes en lugar de reemplazarlos, preservando la estabilidad mientras añade una capa analítica más profunda.

```
          Exchange API
                │
                ▼
       Order Placement Engine
                │
                ▼
         Fills Collector
                │
                ▼
       Verification Engine
                │
                ▼
         Aggregation Engine
                │
                ▼
      VWAP / Inventory / PnL
                │
                ▼
    Risk & Strategy Modules
```

Esta arquitectura senta las bases para futuras ampliaciones, transformando el bot de una herramienta de colocación de órdenes en un verdadero sistema de análisis de ejecución. Estrategias avanzadas como la gestión de grupos de liquidez y el mantenimiento dinámico de spreads dependen fuertemente de datos de ejecución precisos para funcionar correctamente. Para módulos premium de trading, el análisis de ejecución es un requisito fundamental para operaciones de nivel profesional.

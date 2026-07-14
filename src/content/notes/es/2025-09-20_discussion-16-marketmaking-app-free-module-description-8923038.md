---
title: "MarketMaking.App: Descripción del Módulo Gratuito"
slug: "discussion-16-marketmaking-app-free-module-description-8923038"
description: "MarketMaking.App: Descripción del Módulo Gratuito La edición gratuita y de código abierto del bot de market making de ADAMANT es adecuada para pequeños proyectos cripto con baja liquidez, negociados en exchanges centralizados de la lista soportada."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/16"
publishedAt: "2025-09-20T14:33:55Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:8923038"
locale: "es"
placeholder: false
---

# MarketMaking.App: Descripción del Módulo Gratuito

La edición gratuita y de código abierto del bot de market making de ADAMANT es adecuada para pequeños proyectos cripto con baja liquidez, negociados en exchanges centralizados de la lista soportada. El código fuente está disponible en [GitHub](https://github.com/Adamant-im/adamant-tradebot).

## Módulo de Ejecución Manual de Órdenes

Este módulo permite al operador colocar órdenes específicas de compra y venta. Una sola orden de mercado o limitada puede colocarse con los comandos `/buy` o `/sell`, mientras que múltiples órdenes limitadas pueden colocarse a la vez con `/fill`. El comando `/fill` también puede llenar instantáneamente todo el libro de órdenes con ofertas y demandas escalonadas para cumplir con los requisitos de listado del exchange. Funciona con cualquier par de trading en el exchange y es útil para convertir fondos, comprar o vender activos, o realizar el llenado inicial del libro de órdenes antes de comenzar el market making automatizado.

## Módulo Creador de Volumen de Trading

Este módulo simula actividad y volumen en un par de mercado mediante trading interno. Soporta tres políticas: basada en spread, donde las operaciones ocurren dentro de un spread definido de oferta/demanda; basada en el libro de órdenes, que imita la actividad según la forma del libro de órdenes existente; y óptima, que elige dinámicamente puntos de precio para operaciones que parezcan realistas. Esto es útil para arrancar nuevos mercados, mejorar la apariencia del listado y cumplir con los requisitos de volumen del exchange.

## Constructor Dinámico de Libro de Órdenes en Tiempo Real

Este módulo construye un libro de órdenes realista y similar al comportamiento humano para simular actividad de mercado orgánica. Maneja la colocación y eliminación dinámica de órdenes en niveles de precio visibles, con tamaños de orden, intervalos y pasos de precio aleatorizados para evitar detección. El reordenamiento periódico refleja un comportamiento realista de los traders, creando un entorno de mercado que se siente vivo y más atractivo para traders externos.

## Mantenedor de Spread y Liquidez

Este módulo mantiene un spread de trading saludable y niveles mínimos de liquidez para asegurar mercados ajustados y una salud estable del par. Monitorea constantemente los mejores niveles de oferta y demanda, colocando automáticamente liquidez dentro de un umbral configurable de porcentaje de spread hasta montos máximos definidos. Asegura liquidez mínima en ambos lados del libro y se actualiza automáticamente cuando se ejecutan órdenes o el mercado se mueve.

## Monitor de Mercado y Seguimiento de Rango

Este módulo monitorea métricas clave de precio y referencias externas para guiar el comportamiento del bot o activar comandos. El Monitor de Rango de Precio obliga a operar solo dentro de un rango de precio mínimo y máximo definido estáticamente. El Monitor Cruzado de Exchange sincroniza precios o reacciona a movimientos en otro exchange soportado. Estas funciones ayudan a los operadores a evitar zonas de precio volátiles, reaccionar a cambios externos del mercado o alinear el movimiento de precios con otro exchange.

## Inspector de Par de Trading y Estado del Bot

Este módulo proporciona información en tiempo real sobre el estado actual del bot y la información relevante del par de trading. Los operadores pueden ver los saldos disponibles para los activos base y cotización con `/balances`, listar las órdenes limitadas activas actuales con `/orders`, y mostrar la actividad de market making, el volumen generado y el ancho del spread con `/stats`. Los metadatos del par y moneda, como tamaño mínimo de operación, tamaño de tick y tarifas, pueden recuperarse con `/info` o `/pair`, y las direcciones de depósito para activos pueden obtenerse con `/deposit`. Esto ayuda a los operadores a monitorear la salud del bot y las condiciones del mercado en tiempo real, validar la configuración y rastrear el rendimiento o estado de fondos.

Algunas funciones tienen opciones limitadas en la versión básica del bot. Configuraciones más avanzadas están disponibles en la versión premium.

---
title: "Presentamos Balance Watcher: Vigilancia inteligente en tiempo real de saldos en el bot de market making"
slug: "introducing-balance-watcher-smart-real-time-balance-surveillance-in-the-market-making-bot-0cbdfcee131e"
description: "Balance Watcher es un módulo de monitoreo en tiempo real que protege fondos y mejora la confiabilidad del bot en condiciones de mercado volátiles."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-balance-watcher-smart-real-time-balance-surveillance-in-the-market-making-bot-0cbdfcee131e"
publishedAt: "2026-01-22T15:54:47.278Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/0cbdfcee131e/001-1-ugrxafukeqdczx8w8f4dxw-png.webp"
cardSpan: "full"
originalId: "medium:0cbdfcee131e"
locale: "es"
placeholder: false
---

En el market making algorítmico, el rendimiento del bot y la conciencia del riesgo son fundamentales. Balance Watcher es un módulo de monitoreo de saldos en tiempo real diseñado para proteger fondos y mejorar la confiabilidad del bot en condiciones de mercado volátiles. Asegura que un bot de market making no opere a ciegas cuando eventos inesperados afecten los saldos.

Los market makers operan en entornos donde los rápidos movimientos de precios, estrategias agresivas de bots, errores de API o interrupciones en el exchange pueden afectar drásticamente los saldos de la cuenta. Los sistemas tradicionales a menudo reanudan el trading sin evaluar si las condiciones son seguras, exponiendo así los fondos. Balance Watcher supervisa continuamente los saldos de la cuenta y compara los datos en vivo con puntos de referencia históricos definidos. Si algo falla, interviene con alertas y acciones preventivas en lugar de permitir que el bot siga operando sin control.

El sistema rastrea los saldos más recientes de los activos junto con los movimientos de precios, comparando estos datos con una instantánea de referencia almacenada para detectar comportamientos anómalos. Detecta caídas inesperadas que no se justifican por los movimientos del mercado, incluyendo situaciones como brechas repentinas de liquidez o actividad hostil de otros bots. Cuando se detecta una anomalía, Balance Watcher envía alertas detalladas con contexto, ayudando a los operadores a tomar decisiones informadas rápidamente. Dependiendo de la configuración, puede pausar toda la actividad del bot o entrar en un modo seguro con exposición al riesgo limitada.

![Presentamos Balance Watcher — Vigilancia inteligente en tiempo real de saldos en el bot de market making](/images/engineering-notes/medium/0cbdfcee131e/002-0-z8beu6lxof-2s1qa.webp)

Balance Watcher combina dos técnicas clave de monitoreo. La primera es el seguimiento absoluto de la moneda base, que evalúa disminuciones directas en tu moneda de liquidación (como USDT o BTC), lo que a menudo indica uso no planificado de activos o pérdidas. La segunda es el seguimiento normalizado del saldo combinado. Al convertir los saldos de tokens en una referencia común, el sistema estima dónde debería estar tu valor total dados los precios actuales. Si tu saldo real cae por debajo de este valor esperado en umbrales definidos, se activa una alerta.

![Presentamos Balance Watcher — Vigilancia inteligente en tiempo real de saldos en el bot de market making](/images/engineering-notes/medium/0cbdfcee131e/003-0-e5ykx8yvvnxmgrxl.webp)

Este enfoque dual detecta anomalías de saldo tanto obvias como sutiles, con resistencia incluso durante la volatilidad normal del mercado. Para obtener más detalles técnicos y configuraciones, consulta la [descripción de la función en GitHub](https://github.com/Adamant-im/adamant-tradebot/issues/85) para el ADAMANT tradebot.

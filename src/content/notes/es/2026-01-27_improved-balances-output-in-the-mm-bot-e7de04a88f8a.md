---
title: "Salida mejorada de /balances en el ADAMANT TradeBot"
slug: "improved-balances-output-in-the-mm-bot-e7de04a88f8a"
description: "Herramientas de market making de código abierto son tan poderosas como fáciles de usar. Una mejora reciente en el ADAMANT TradeBot hace que la interfaz sea más informativa."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improved-balances-output-in-the-mm-bot-e7de04a88f8a"
publishedAt: "2026-01-27T20:06:24.444Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/e7de04a88f8a/001-1-dqzndrygjqx5bkqeefcika-png.webp"
cardSpan: "full"
originalId: "medium:e7de04a88f8a"
locale: "es"
placeholder: false
---

Las herramientas de market making de código abierto son tan poderosas como fáciles de usar. Una mejora reciente en el ADAMANT TradeBot, un bot de market making autohospedado para proyectos cripto y exchanges, se enfoca en hacer la interfaz más informativa, especialmente para comandos esenciales como `/balances`.

La solicitud de mejora, originalmente registrada como el problema #89 en el repositorio de ADAMANT en GitHub, propone varios refinamientos. Busca eliminar notas confusas cuando no hay tokens desconocidos presentes, corregir errores visuales en comandos relacionados y añadir indicadores de fortaleza de precio en los mensajes de operaciones. Por ejemplo, el bot ahora puede mostrar si una venta se ejecutó a un buen o mal precio en relación con el mercado.

![Salida mejorada de /balances en el bot MM](/images/engineering-notes/medium/e7de04a88f8a/002-1-2xdmbg-cdiktreq64dog2w-png.webp)

Para representar volúmenes de operaciones, el bot utiliza una serie de emojis de criaturas marinas, como 🦐, 🍤, 🐟, 🐬, 🦈, y 🐳. Estas asignaciones de volumen a emoji están definidas en el archivo de configuración del bot usando umbrales en USD.

```json
  /** Volume thresholds in USD for different emoji levels */
  "volumes_thresholds_usd": {
    "🦐": 10,
    "🍤": 50,
    "🐟": 100,
    "🐬": 300,
    "🦈": 1000,
    "🐳": 5000,
    "🐳🐳": 10000,
    "🐳🐳🐳": 50000
  },
```

Además, el bot utiliza círculos de colores y flechas para indicar la fortaleza del precio en comparación con el mercado. Un círculo verde denota un buen precio, como una compra baja o una venta alta, mientras que un círculo rojo indica un mal precio, como una compra alta o una venta baja. Las flechas proporcionan mayor precisión, mostrando si un activo se vendió a un precio muy alto o se compró a un precio muy bajo.

Mejoras de usabilidad como estas reducen la carga cognitiva para los operadores del bot y hacen que la herramienta sea más accesible. Aunque estos cambios están actualmente implementados en la versión Premium del bot, pronto estarán disponibles también en la versión básica de código abierto.

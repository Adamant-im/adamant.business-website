---
title: "Creación de mercado DIY con ADAMANT TradeBot v6.0.0"
slug: "diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
description: "El bot de trading y creación de mercado de ADAMANT es una herramienta de código abierto para emisores de tokens y exchanges que necesitan creación de mercado autónoma."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/diy-market-making-of-your-token-with-the-updated-v6-0-0-adamant-tradebot-428525859b30"
publishedAt: "2024-03-20T08:47:50.471Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/428525859b30/001-0-nwojohhggiizs7us.webp"
cardSpan: "full"
originalId: "medium:428525859b30"
locale: "es"
placeholder: false
---

El ADAMANT Trading & Market Making Bot es una herramienta de código abierto para emisores de tokens y exchanges de criptomonedas que necesitan creación de mercado autónoma. Coloca y ejecuta órdenes para generar volumen de trading, mantener el diferencial y la liquidez, construir libros de órdenes dinámicos y monitorear los precios de los tokens. La versión 6.0.0 introduce una serie de mejoras que vale la pena destacar si usted opera o personaliza el bot.

### Cambios en la configuración y en la base de código

La base de código ha sido refactorizada para facilitar la personalización a cualquier persona que trabaje con el proyecto de código abierto. La configuración ahora es más sencilla gracias a un borrador unificado de configuración de trading que se aplica en todas las exchanges compatibles. Las funciones de precio como `getSmartPrice()` y `getCleanPrice()`, junto con funciones de utilidad, han sido actualizadas para ofrecer mayor precisión. El observador de precios (Price watcher) y el constructor de libro de órdenes dinámico también han sido mejorados para un monitoreo de mercado más confiable.

### Acción "prevenir" en el observador de precios

Anteriormente, la única acción del observador de precios era "fill" (llenar), que consistía en colocar órdenes de compra o venta activamente para seguir un precio de referencia de otra exchange. Ese enfoque podía exponer al bot a manipulaciones por parte de terceros. La nueva acción "prevent" (prevenir) adopta un enfoque diferente: en lugar de forzar un precio colocando órdenes, define un rango de precios seguro que otros módulos del bot (como el de liquidez) deben respetar, prohibiendo comprar alto y vender bajo fuera de ese rango.

![Creación de mercado DIY de tu token con el ADAMANT TradeBot actualizado v6.0.0](/images/engineering-notes/medium/428525859b30/002-0-p2uha5tzki-2klb.webp)

### Nuevos comandos y comandos ampliados

El comando `/deposit` ahora muestra las direcciones de depósito para todas las cadenas disponibles, facilitando las recargas.

![Creación de mercado DIY de tu token con el ADAMANT TradeBot actualizado v6.0.0](/images/engineering-notes/medium/428525859b30/003-0-tj9d8w7qcgqwofa4.webp)

Un nuevo comando `/info` muestra toda la información disponible para una moneda específica, incluyendo detalles de la cadena.

![Creación de mercado DIY de tu token con el ADAMANT TradeBot actualizado v6.0.0](/images/engineering-notes/medium/428525859b30/004-0-raft4mu2likg0c8p.webp)

La cancelación de órdenes ahora puede filtrarse por tipo de módulo (manual, constructor de libro de órdenes, observador de precios, liquidez, etc.), lado de compra o venta, y precio. Esto otorga a los administradores un control más fino al gestionar órdenes activas.

![Creación de mercado DIY de tu token con el ADAMANT TradeBot actualizado v6.0.0](/images/engineering-notes/medium/428525859b30/005-0-3slqf62rcikx-msf.webp)

Al usar `/amount`, `/interval` o `/stats`, el bot ahora informa el volumen de trading estimado que genera, ayudando a los operadores a evaluar la actividad esperada.

![Creación de mercado DIY de tu token con el ADAMANT TradeBot actualizado v6.0.0](/images/engineering-notes/medium/428525859b30/006-0-9eqmd9xwf7q7i7f6.webp)

El nuevo comando `/account` muestra las comisiones de trading y el volumen mensual de trading para la cuenta del bot, cuando la exchange expone esos datos.

![Creación de mercado DIY de tu token con el ADAMANT TradeBot actualizado v6.0.0](/images/engineering-notes/medium/428525859b30/007-0-llggirhb0bb42g5m.webp)

El comando `/stats` ha sido ampliado para incluir precios del par de trading, mínimos y máximos, volumen de trading, mejor postura y mejor oferta del libro de órdenes con el diferencial, liquidez del libro de órdenes, volumen estimado de creación de mercado y estadísticas de órdenes desglosadas por tipo con totales.

![Creación de mercado DIY de tu token con el ADAMANT TradeBot actualizado v6.0.0](/images/engineering-notes/medium/428525859b30/008-0-hr1rvff4aeshjtpw.webp)

### Soporte de exchanges

El bot ahora soporta XeggeX y ha actualizado los conectores de exchange para Azbit, Coinstore, FameEX, NonKYC, P2B y StakeCube. Diversas correcciones de errores y mejoras menores completan esta versión.

La versión y el registro de cambios están disponibles en GitHub: [adamant-tradebot v6.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0).

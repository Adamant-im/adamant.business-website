---
title: "CoinOptimus Trading Bot actualizado a la v2.0.0"
slug: "open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
description: "ADAMANT CoinOptimus, un bot de trading de criptomonedas autohospedado diseñado para traders no profesionales, se ha actualizado a la versión 2.0.0. La versión incluye refactorización, correcciones de errores y cinco nuevos comandos."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
publishedAt: "2024-04-03T11:29:39.685Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/816935470693/001-1-yi0sr85whds3uma4ith6na-png.webp"
cardSpan: "full"
originalId: "medium:816935470693"
locale: "es"
placeholder: false
---

ADAMANT CoinOptimus, un bot de trading de criptomonedas autohospedado diseñado para traders no profesionales, se ha actualizado a la versión 2.0.0. La versión incluye refactorización, correcciones de errores y cinco nuevos comandos: `/fill`, `/stats`, `/deposit`, `/account` y `/info`.

### Nuevos Comandos

El comando `/fill` rellena un libro de órdenes con una serie de órdenes en un solo paso.

![Open-source CoinOptimus trading bot actualizado a la v2.0.0](/images/engineering-notes/medium/816935470693/002-0-p-pmlz9g0oqkhlzh.webp)

El comando `/stats` muestra estadísticas del par de trading, incluyendo precios, mínimos, máximos, volumen de negociación, la oferta más alta del libro de órdenes, la demanda más baja, el spread y la liquidez del libro de órdenes.

![Open-source CoinOptimus trading bot actualizado a la v2.0.0](/images/engineering-notes/medium/816935470693/003-1-ghu8f-ht7mxhagdmaqo1ag-png.webp)

El comando `/deposit` devuelve una dirección para recargar una cuenta de intercambio a través de diferentes cadenas.

![Open-source CoinOptimus trading bot actualizado a la v2.0.0](/images/engineering-notes/medium/816935470693/004-0-j-uwsyddj1i6k3d7.webp)

El comando `/account` muestra las comisiones de trading y el volumen mensual de negociación para la cuenta del bot, cuando está disponible.

![Open-source CoinOptimus trading bot actualizado a la v2.0.0](/images/engineering-notes/medium/816935470693/005-0-vfvn8x-wf1ohwg8a.webp)

El comando `/info` muestra toda la información disponible para una moneda y cadena específicas.

![Open-source CoinOptimus trading bot actualizado a la v2.0.0](/images/engineering-notes/medium/816935470693/006-0-n5uqmmhtmdcwjbe3.webp)

### Cómo funciona CoinOptimus

CoinOptimus es una aplicación Node.js que se ejecuta continuamente en un servidor o VPS. Se configura con un exchange, un par de trading y claves API de tu cuenta de intercambio. El bot gestiona estrategias de trading y coloca órdenes según los comandos que envíes a través de ADAMANT Messenger, respondiendo en consecuencia.

El bot utiliza principalmente la Estrategia de Trading Optimal Ladder/Grid, colocando múltiples órdenes de compra y venta con precios que comienzan desde el spread. Cuando se ejecuta la orden más cercana al spread, el bot añade una orden similar en el lado opuesto, siguiendo el principio de comprar más barato de lo que vende y vender más caro de lo que compra. Este enfoque es especialmente efectivo en mercados volátiles.

![Open-source CoinOptimus trading bot actualizado a la v2.0.0](/images/engineering-notes/medium/816935470693/007-0-twtuzn4rmej2q4s8.webp)

![Open-source CoinOptimus trading bot actualizado a la v2.0.0](/images/engineering-notes/medium/816935470693/008-0-ruyx47yeeapvvo4r.webp)

Las instrucciones de configuración están disponibles en el [README del repositorio](https://github.com/Adamant-im/adamant-coinoptimus#usage-and-installation). CoinOptimus no es una máquina de ganancias garantizadas; úsalo bajo tu propio riesgo.

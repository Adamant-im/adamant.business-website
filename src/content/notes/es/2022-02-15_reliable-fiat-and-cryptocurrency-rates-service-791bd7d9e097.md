---
title: "ADAMANT InfoService v3.3.5 añade validación cruzada de tasas"
slug: "reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
description: "ADAMANT InfoService agrega tasas de monedas y criptomonedas de MOEX, Currency Api, Coinmarketcap, CryptoCompare y Coingecko, exponiéndolas a través de una API."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/reliable-fiat-and-cryptocurrency-rates-service-791bd7d9e097"
publishedAt: "2022-02-15T10:59:58.332Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/791bd7d9e097/001-1-olubh0mvysjvmtykzm2u4a-png.webp"
cardSpan: "full"
originalId: "medium:791bd7d9e097"
locale: "es"
placeholder: false
---

ADAMANT InfoService es un servicio que agrega tasas de monedas y criptomonedas de MOEX, Currency-Api, Coinmarketcap, CryptoCompare y Coingecko, exponiéndolas a través de una API para aplicaciones downstream.

La versión v3.3.5 introduce Currency-Api como fuente adicional para tasas fiduciarias. Más importante aún, InfoService ahora compara las tasas recibidas de diferentes proveedores y marca los datos incorrectos o anómalos cuando detecta desviaciones. Esta validación cruzada hace que el servicio sea más confiable, ya que es menos probable que una sola fuente con mal funcionamiento propague tasas incorrectas a los consumidores.

El lanzamiento también incluye refactorización interna, correcciones de errores, integración de linter y actualizaciones de dependencias.

La documentación de la API está disponible en la [wiki de ADAMANT InfoService](https://github.com/Adamant-im/adamant-currencyinfo-services/wiki/InfoServices-API-documentation). Las notas completas del lanzamiento están en la [página de la versión v3.3.5](https://github.com/Adamant-im/adamant-currencyinfo-services/releases/tag/v3.3.5).

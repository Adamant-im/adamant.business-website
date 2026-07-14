---
title: "Función de arbitraje para la creación de mercado"
slug: "arbitrage-feature-for-market-making-39e5515a470b"
description: "El bot de trading y creación de mercado ADAMANT ahora admite una función de arbitraje. Los propietarios de tokens pueden configurar el seguimiento de precios en otras exchanges con /enable pw..."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/arbitrage-feature-for-market-making-39e5515a470b"
publishedAt: "2021-01-24T16:41:51.417Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/39e5515a470b/001-0-vcyqehma-vfieqdv-png.webp"
cardSpan: "full"
originalId: "medium:39e5515a470b"
locale: "es"
placeholder: false
---

El bot de trading y creación de mercado ADAMANT ahora admite una función de arbitraje. Los propietarios de tokens pueden configurar el seguimiento de precios en otras exchanges y pares comerciales utilizando el comando `/enable pw`.

Cuando un creador de mercado negocia un token en múltiples pares o exchanges, pueden designar un par comercial principal dentro de un rango numérico y alinear los pares restantes a este. Al recibir un rango de precios de otro par comercial, el bot colocará ofertas y demandas directas bajo la política *strict* o estimará precios reales bajo la política *smart*. Por ejemplo, basado en un libro de órdenes dado, la política *strict* podría generar un rango de 0.0122–0.0128, mientras que la política *smart* generaría un rango más amplio de 0.0114–0.0133.

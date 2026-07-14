---
title: "ADAMANT JavaScript API v1.1.0: Generación de claves Dash"
slug: "updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
description: "La API de JavaScript ADAMANT v1.1.0 puede generar pares de claves pública y privada de Dash directamente desde la frase de acceso de una cuenta ADAMANT. Esto simplifica las operaciones entre cadenas."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
publishedAt: "2021-07-12T13:40:09.723Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/58a3e37d2ac2/001-1-8sz81txq44zqzikay5wamw-png.webp"
cardSpan: "full"
originalId: "medium:58a3e37d2ac2"
locale: "es"
placeholder: false
---

La API de JavaScript ADAMANT v1.1.0 puede generar pares de claves pública y privada de Dash directamente desde la frase de acceso de una cuenta ADAMANT. Esto simplifica las operaciones entre cadenas al derivar las claves de Dash a partir de la misma frase mnemotécnica utilizada para la cuenta ADAMANT.

```js
const dashKeys = api.dash.keys(config.passPhrase);
```

El parámetro `passPhrase` es la frase de acceso asociada con una cuenta ADAMANT. El par de claves devuelto está listo para usarse con la API de Dash.

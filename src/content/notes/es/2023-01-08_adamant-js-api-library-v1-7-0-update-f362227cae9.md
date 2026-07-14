---
title: "ADAMANT JS API Library v1.7.0 Update"
slug: "adamant-js-api-library-v1-7-0-update-f362227cae9"
description: "La biblioteca ADAMANT JavaScript API v1.7.0 introduce soporte para callbacks en la lógica posterior a la inicialización."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-js-api-library-v1-7-0-update-f362227cae9"
publishedAt: "2023-01-08T14:33:18.085Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f362227cae9/001-1-fyo9k3w-4-kerjuoncf9fw-png.webp"
cardSpan: "full"
originalId: "medium:f362227cae9"
locale: "es"
placeholder: false
---

La biblioteca ADAMANT JavaScript API v1.7.0 introduce soporte para callbacks en la lógica posterior a la inicialización. Esta versión incluye dos cambios: un nuevo método `api.setStartupCallback()` y un callback opcional aceptado como tercer parámetro en el constructor de `api`. Ambos mecanismos permiten ejecutar código personalizado después de que la biblioteca finalice la inicialización, lo cual es útil para tareas de configuración que dependen de una instancia de API lista para usarse.

La documentación completa de la API está disponible en el [ADAMANT API client wiki](https://github.com/Adamant-im/adamant-api-jsclient/wiki/API-Specification). Los detalles de la versión se encuentran en las [notas de la versión v1.7.0](https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v1.7.0).

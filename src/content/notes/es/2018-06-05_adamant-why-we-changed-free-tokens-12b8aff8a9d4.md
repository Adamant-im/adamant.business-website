---
title: "ADAMANT: Por qué cambiamos los tokens gratuitos"
slug: "adamant-why-we-changed-free-tokens-12b8aff8a9d4"
description: "Todas las cuentas de la blockchain ADAMANT requieren un pequeño saldo de tokens para enviar mensajes, con una tarifa mínima de 0.001 ADM por mensaje. Esta tarifa respalda la infraestructura de la red y permite a los nuevos usuarios probar ADAMANT Messenger."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-why-we-changed-free-tokens-12b8aff8a9d4"
publishedAt: "2018-06-05T07:18:13.023Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/12b8aff8a9d4/001-0-it4qol6uievlykgo.webp"
cardSpan: "full"
originalId: "medium:12b8aff8a9d4"
locale: "es"
placeholder: false
---

Todas las cuentas de la blockchain ADAMANT requieren un pequeño saldo de tokens para enviar mensajes, con una tarifa mínima de 0.001 ADM por mensaje. Esta tarifa respalda la infraestructura de la red y permite a los nuevos usuarios probar ADAMANT Messenger. Anteriormente, un mecanismo automático regalaba 0.49 ADM a cada nueva billetera con este fin.

El equipo de desarrollo de ADAMANT redujo la cantidad inicial de tokens para combatir las botnets que producían masivamente billeteras para recolectar tokens gratuitos. Dado que implementar un captcha dentro del mensajero comprometería el anonimato del usuario, el equipo implementó en su lugar un procesador de emisión de tokens en el sitio web en [adamant.im/free-adm-tokens](https://adamant.im/free-adm-tokens/). Ahora solo los usuarios reales reciben tokens ADM.

La cantidad de tokens gratuitos se redujo de 0.49 ADM a 0.09 ADM, lo que permite a los usuarios enviar 90 mensajes para probar el mensajero. Este cambio también ayuda a garantizar que los tokens se conserven para programas de recompensas, maximizando así el valor de cada token gastado.

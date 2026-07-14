---
title: "Messenger se vuelve más rápido gracias a la API de Chatrooms"
slug: "messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
description: "ADAMANT trata cada mensaje como una transacción blockchain, lo que mejora la privacidad pero plantea retos de velocidad. La nueva API Chatrooms optimiza la carga hasta 10 veces."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
publishedAt: "2021-11-24T14:07:09.171Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b7353317e7f8/001-0-tot3wyqtwfswo3kx.webp"
cardSpan: "full"
originalId: "medium:b7353317e7f8"
locale: "es"
placeholder: false
---

ADAMANT trata cada mensaje como una transacción blockchain, lo que mejora la privacidad y la seguridad, pero introduce desafíos en velocidad y recuperación de mensajes. Las API blockchain estándar requerían obtener todas las transacciones para mostrar la correspondencia. La nueva API Chatrooms, diseñada específicamente para mensajería instantánea, hace que la carga de mensajes sea hasta diez veces más eficiente, reduciendo el consumo de memoria y CPU.

![Messenger se vuelve más rápido gracias a la API de Chatrooms](/images/engineering-notes/medium/b7353317e7f8/002-0-g1gbxwpdnkihcskz.webp)

En la práctica, cargar una cuenta con la versión anterior tomaba 25 segundos y consumía 80 MB de memoria. Con la nueva versión, la carga toma 3 segundos y utiliza 28 MB de memoria, un aumento de velocidad de ocho veces. La mejora de rendimiento escala con la cantidad de mensajes que posee una cuenta.

Chatrooms proporciona dos endpoints: `/api/chatrooms/U000000000000` y `/api/chatrooms/U000000000000/U000000000001`. El primero recupera una lista de chats para una cuenta específica, mientras que el segundo obtiene los mensajes entre dos cuentas. Se admite paginación para minimizar la transferencia de datos, como se detalla en AIP 14. Estos endpoints pueden ser utilizados por cualquier aplicación, incluyendo mensajeros o bots.

Para soportar esto, los nodos han sido actualizados para manejar las nuevas solicitudes de aplicación. A diferencia de la versión anterior, que descargaba todos los mensajes de una vez para visualización sin conexión, la API Chatrooms descarga los mensajes bajo demanda y requiere una conexión a internet.

El lanzamiento de la v3.0.0 introduce la API Chatrooms junto con varias actualizaciones adicionales. Reemplaza el nodo HTTP, elimina el intercambio Resfinex y el token RES, e implementa una solución temporal para un error `includePending` de Lisk Service. Otras correcciones solucionan el `background-color` del tema claro/oscuro, resuelven un bucle infinito de actualización en la lista de transacciones ADM y actualizan dependencias.

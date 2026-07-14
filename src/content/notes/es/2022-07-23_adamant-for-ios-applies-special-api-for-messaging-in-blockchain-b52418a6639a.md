---
title: "ADAMANT para iOS adopta la API de Chatrooms para mensajería blockchain más rápida"
slug: "adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
description: "ADAMANT para iOS ahora admite la API de Chatrooms, acelerando la carga de mensajes hasta 50 veces. La mejora es inmediatamente perceptible al iniciar sesión en una cuenta ADM."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
publishedAt: "2022-07-23T13:24:47.800Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:b52418a6639a"
locale: "es"
placeholder: false
---

ADAMANT para iOS ahora admite la API de Chatrooms para mensajería blockchain, acelerando la carga de mensajes hasta 50 veces. Esta mejora es inmediatamente perceptible al iniciar sesión en una cuenta ADM. Las aplicaciones de escritorio ya implementaron previamente esta misma API.

La API de Chatrooms proporciona dos puntos finales principales. El primero, `/api/chatrooms/U000000000000`, recupera la lista de chats para una cuenta específica. El segundo, `/api/chatrooms/U000000000000/U000000000001`, obtiene el historial de mensajes entre dos cuentas específicas. Para optimizar la transferencia de datos, la API incluye paginación. Más detalles técnicos están disponibles en AIP 14.

La versión 2.5.0 de la aplicación para iOS incluye esta integración de la API de Chatrooms junto con una obtención más rápida de tasas cripto, mejoras generales de rendimiento, optimizaciones para MacBook M1 y varias correcciones de errores.

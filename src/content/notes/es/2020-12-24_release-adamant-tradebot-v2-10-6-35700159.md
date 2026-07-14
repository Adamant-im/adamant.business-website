---
title: "ADAMANT Tradebot v2.10.6"
slug: "release-adamant-tradebot-v2-10-6-35700159"
description: "Esta versión se centra en mejoras de rendimiento y estabilidad para ADAMANT Tradebot. Se optimizó el uso de CPU y se resolvieron problemas con límites de API y respuestas de solicitudes retrasadas."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v2.10.6"
publishedAt: "2020-12-24T13:13:19Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v2.10.6"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:35700159"
locale: "es"
placeholder: false
---

Esta versión se centra en mejoras de rendimiento y estabilidad para ADAMANT Tradebot. El uso de CPU ha sido optimizado, y se han resuelto varios problemas que afectaban los límites de la API y las respuestas retrasadas de las solicitudes. También se corrigió la paginación de las respuestas de Bit-Z para garantizar una recuperación de datos confiable desde ese intercambio.

En cuanto a funciones, los comandos `/balances`, `/orders`, `/rates` y `/stats` ahora proporcionan información adicional para ayudar a los operadores a monitorear la actividad del bot de manera más efectiva. Se ha introducido un nuevo módulo `orderUtils` como parte del trabajo continuo de refactorización, y ahora se admite un nuevo tipo de orden `man` para órdenes colocadas manualmente. La frecuencia del notificador se ha reducido para disminuir alertas innecesarias. Las dependencias se han actualizado a sus últimas versiones compatibles.

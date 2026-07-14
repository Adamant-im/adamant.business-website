---
title: "ADAMANT Tradebot v7.0.0"
slug: "release-adamant-tradebot-v7-0-0-201883296"
description: "Esta versión introduce una función de caché de solicitudes y nuevos comandos como /orderbook, /trades, /ticker, /order y /cancel. Se actualizó /help."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0"
publishedAt: "2025-02-23T05:56:49Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "adamant-tradebot"
tag: "v7.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:201883296"
locale: "es"
placeholder: false
---

Esta versión introduce una función de caché de solicitudes y varios comandos nuevos para interactuar con exchanges, incluyendo `/orderbook`, `/trades`, `/ticker`, `/order` y `/cancel`. El comando `/help` se ha actualizado para incluir información sobre el software del bot y su configuración.

Los módulos Command, Order book y Trader se han refactorizado para mejorar su mantenibilidad. Se ha añadido una nueva configuración `database` para soportar estos cambios. Se ha corregido la función `getOrderDetails()` en los conectores de Azbit y P2B.

Las dependencias se han actualizado y se han aplicado correcciones generales de errores y mejoras en toda la base de código. Los registros (logging) se han mejorado y se han añadido tipos de TypeScript para aumentar la seguridad de tipos y mejorar la experiencia del desarrollador.

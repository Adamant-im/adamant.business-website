---
title: "ADAMANT Tradebot v6.0.0"
slug: "release-adamant-tradebot-v6-0-0-147389142"
description: "Esta versión incluye una refactorización importante del ADAMANT Tradebot, consolidando la configuración de exchanges en un solo archivo."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.0.0"
publishedAt: "2024-03-20T08:46:40Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:147389142"
locale: "es"
placeholder: false
---

Esta versión introduce una refactorización importante en todo el ADAMANT Tradebot, consolidando la configuración de los exchanges en un único archivo `tradeParams_Default.js` utilizado para todos los exchanges. Se han actualizado las funciones `getSmartPrice()` y `getCleanPrice()`, junto con la función `isOrderOutOfPriceWatcherRange()`. Además, se han añadido funciones de utilidad adicionales para respaldar estos cambios.

El vigilante de precios ha sido mejorado y ahora soporta una acción `prevent`. La estimación de volumen ahora se muestra al actualizar el monto o el intervalo. El comando `/stats` proporciona información ampliada, y el comando `/info` puede recuperar información sobre retiros de monedas y redes. La información de saldos también ha sido ampliada.

El comando `/account` ahora proporciona información sobre las comisiones de trading y el volumen. El bot recopila información sobre las ejecuciones de órdenes para todas las órdenes, y el generador dinámico del libro de órdenes ha sido mejorado. Tras colocar una orden de market making, el bot verifica si la orden fue ejecutada. La función `getMinOrderAmount()` también ha sido mejorada.

Se ha añadido soporte para el exchange XeggeX. Los conectores de exchange para Azbit, Coinstore, FameEX, NonKYC, P2B y StakeCube han sido actualizados. Esta versión también incluye mejoras menores, correcciones de errores y dependencias actualizadas.

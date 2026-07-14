---
title: "Intercambiar Tether, USD Coin, DAI y XCN en chats de ADAMANT"
slug: "exchange-tether-usd-coin-dai-and-xcn-in-adamant-chats-b89877c364bf"
description: "El bot Exchanger de ADAMANT ahora admite tokens ERC20 junto con sus opciones existentes de criptomonedas. Además de ADM, BTC, DASH, DOGE, ETH y LSK, los usuarios pueden intercambiar Tether (USDT), USD Coin (USDC), DAI y Onyxcoin (XCN) directamente en chats de ADAMANT."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/exchange-tether-usd-coin-dai-and-xcn-in-adamant-chats-b89877c364bf"
publishedAt: "2023-09-12T11:44:07.868Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b89877c364bf/001-1-vosdpbswphxo57go9nrwxa-png.webp"
cardSpan: "full"
originalId: "medium:b89877c364bf"
locale: "es"
placeholder: false
---

El bot Exchanger de ADAMANT ahora admite tokens ERC20 junto con sus opciones de criptomonedas existentes. Además de ADM, BTC, DASH, DOGE, ETH y LSK, los usuarios pueden intercambiar Tether (USDT), USD Coin (USDC), DAI y Onyxcoin (XCN) directamente dentro de los chats de ADAMANT.

![Intercambiar Tether, USD Coin, DAI y XCN en chats de ADAMANT](/images/engineering-notes/medium/b89877c364bf/002-0-ewiwfv0ogqnfwi-m.webp)

El Exchanger es de código abierto, por lo que cualquiera puede ejecutar su propia instancia del bot de intercambio. La función de transferencia criptográfica en el chat integrada en las aplicaciones ADAMANT maneja la integración, permitiendo a los usuarios intercambiar criptomonedas compatibles sin salir de la interfaz de chat.

Para usar el Exchanger, abre una conversación con el bot en el ID `U5149447931090026688`, que ya está en tu lista de chats. Envía `/help` para recibir detalles sobre los procedimientos y tarifas de transacción. Para previsualizar un intercambio sin comprometer fondos, envía un comando como `/test 0.1 ETH to XCN`. Una vez satisfecho con las condiciones, procede con el intercambio directamente en el chat.

Todas las transacciones y comunicaciones permanecen confidenciales dentro del modelo de privacidad de ADAMANT. La adición de nuevos tokens no altera este compromiso.

La versión v2.6.0 del bot de intercambio añade soporte para USDT, USDC, DAI y XCN, junto con correcciones de errores y actualizaciones de dependencias. El código fuente está disponible en [GitHub](https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v2.6.0).

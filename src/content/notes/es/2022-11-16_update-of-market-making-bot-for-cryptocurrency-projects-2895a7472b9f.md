---
title: "ADAMANT Trade & Market-making Bot v5.1.0 lanzado"
slug: "update-of-market-making-bot-for-cryptocurrency-projects-2895a7472b9f"
description: "El bot de comercio y creación de mercado ADAMANT es software gratuito y de código abierto para operar en exchanges de criptomonedas. Soporta volumen, spread, liquidez..."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/update-of-market-making-bot-for-cryptocurrency-projects-2895a7472b9f"
publishedAt: "2022-11-16T04:09:02.513Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2895a7472b9f/001-1-3lizhhkkfifjduf5z4zxtq-png.webp"
cardSpan: "full"
originalId: "medium:2895a7472b9f"
locale: "es"
placeholder: false
---

![Actualización del bot de creación de mercado para proyectos de criptomonedas](/images/engineering-notes/medium/2895a7472b9f/002-1-ji7ldfgywe0whe5fgx-qag-gif.webp)

ADAMANT Trade & Market-making bot es software gratuito y de código abierto para operar en exchanges de criptomonedas. Soporta la generación de volumen comercial, el mantenimiento de spread y liquidez, el establecimiento de un rango de precios y la construcción de un libro de órdenes dinámico similar al real. La versión 5.1.0 ya está disponible en el [repositorio de ADAMANT en GitHub](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.1.0).

El bot se instala en tu propio servidor o VPS y puede llenar inicialmente los libros de órdenes, para luego construirlos dinámicamente conforme avanza el comercio. Realiza órdenes limitadas o de mercado de compra y venta, y ofrece tres políticas de creación de mercado: basada en spread, basada en libro de órdenes y óptima. El spread y la liquidez se mantienen continuamente, y un rango de precios configurable mantiene el comercio dentro de límites establecidos. El bot también soporta arbitraje de precios de tokens entre otros pares comerciales o exchanges. Toda la gestión se realiza mediante comandos enviados a través de ADAMANT Messenger.

Una variedad de funciones adicionales está disponible bajo solicitud como servicios de pago. Estos incluyen gestión mediante Telegram, soporte para exchanges adicionales y configuración completa, puesta en marcha y soporte continuo. Las capacidades avanzadas del libro de órdenes incluyen un fuerte sistema antiarbitraje, mecanismos antifraude que eliminan órdenes manipuladoras de precios, libros de órdenes sin interrupciones, actualizaciones de alta frecuencia y creación de mercado dentro del libro sin operaciones dentro del spread. También se ofrecen suavizado de gráficos de precios y construcción automática de gráficos similares al real dentro de un rango de precios configurado.

Opciones de pago adicionales incluyen operar con dos cuentas o claves, equilibrar monedas entre cuentas y reabastecer reservas específicas de monedas. El volumen comercial puede configurarse con mayor actividad durante subidas y bajadas bruscas. Las mejoras de rendimiento incluyen caché del libro de órdenes y saldos para conservar los límites de la API del exchange, junto con conexiones mediante socket. Las notificaciones pueden enviarse por correo electrónico, Telegram u otros mensajeros. Otras capacidades incluyen función de retiro, visualización de información de la cuenta, comandos y estadísticas personalizadas, comunicación entre bots para ejecutar comandos remotamente en todos los bots simultáneamente, venta de tokens a USDT, alertas sobre órdenes grandes en el libro, mantenimiento de soporte de precios, creación de mercado sin compras ni ventas reales y apuntar a precios específicos según el horario. Una interfaz de gestión o aplicación también puede desarrollarse bajo solicitud.

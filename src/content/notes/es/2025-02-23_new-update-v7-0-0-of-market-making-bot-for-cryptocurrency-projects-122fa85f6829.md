---
title: "Bot de market making v7.0.0: caché de solicitudes, nuevos comandos y configuración de base de datos"
slug: "new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
description: "El bot de market making de ADAMANT es una herramienta gratuita, de código abierto y autohospedada para proyectos cripto y exchanges. Genera volumen, mantiene liquidez y más."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
publishedAt: "2025-02-23T06:05:24.786Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/122fa85f6829/001-0-eevpacxefsrwodwf.webp"
cardSpan: "full"
originalId: "medium:122fa85f6829"
locale: "es"
placeholder: false
---

El bot de market making de ADAMANT es una herramienta gratuita, de código abierto y autohospedada para proyectos cripto y exchanges. Genera volumen comercial, mantiene el spread y la liquidez, establece un rango de precios y construye un libro de órdenes dinámico similar al real. La versión 7.0.0 introduce caché de solicitudes, varios comandos nuevos, configuración de base de datos y varias correcciones de errores y refactorizaciones.

![Nueva actualización v7.0.0 del bot de market making para proyectos cripto](/images/engineering-notes/medium/122fa85f6829/002-0-vbzoksgzwcabzz-z.webp)

### Caché de solicitudes

Las APIs de exchanges restringen las tasas de solicitudes, y durante operaciones activas de market making el bot puede alcanzar errores `429 Rate limit exceeded`. Esto interrumpe el trading y, en algunos casos, puede llevar al exchange a bloquear la cuenta.

![Nueva actualización v7.0.0 del bot de market making para proyectos cripto](/images/engineering-notes/medium/122fa85f6829/003-0-sgbs6ithtx73pqm2.webp)

La nueva función de caché soluciona esto combinando los resultados de consultas sobre saldos, libros de órdenes y órdenes abiertas dentro de un intervalo corto de aproximadamente uno a dos segundos. Anteriormente un módulo de pago, el caché ahora está disponible para todos los usuarios.

### Nuevos comandos

El comando `/help` ahora muestra información básica sobre el software del bot y su configuración. Se han añadido varios comandos adicionales para inspeccionar el estado del exchange y gestionar órdenes individuales:

`/orderbook [pair] [count]` devuelve las órdenes de compra y venta actuales del libro de órdenes.

![Nueva actualización v7.0.0 del bot de market making para proyectos cripto](/images/engineering-notes/medium/122fa85f6829/005-0-cu4bhsoehypr6ini.webp)

`/trades [pair] [count]` devuelve las operaciones más recientes.

![Nueva actualización v7.0.0 del bot de market making para proyectos cripto](/images/engineering-notes/medium/122fa85f6829/006-0-syt1bu8k15rurvv0.webp)

`/ticker [pair]` proporciona datos del ticker en formato JSON, similar a `/rates`.

![Nueva actualización v7.0.0 del bot de market making para proyectos cripto](/images/engineering-notes/medium/122fa85f6829/007-0-uvfrkvq-y40vijsu.webp)

`/order {orderId}` recupera los detalles de una orden específica por su ID.

![Nueva actualización v7.0.0 del bot de market making para proyectos cripto](/images/engineering-notes/medium/122fa85f6829/008-0-m50bnrxoc27z38oc.webp)

`/cancel {orderId}` cancela una orden específica por su ID y devuelve sus detalles.

![Nueva actualización v7.0.0 del bot de market making para proyectos cripto](/images/engineering-notes/medium/122fa85f6829/009-0-um38pjzfvcanrry7.webp)

### Configuración de base de datos

Ahora puedes establecer parámetros de la base de datos en el archivo de configuración, incluyendo el nombre de la base de datos. Esto permite ejecutar múltiples instancias del bot en un único servidor. El trading puede consumir una cantidad significativa de CPU y RAM, así que verifica la carga de recursos antes de ejecutar varias instancias simultáneamente.

Para configurar la base de datos, edita `config.jsonc` y ajusta los parámetros `db`:

![Nueva actualización v7.0.0 del bot de market making para proyectos cripto](/images/engineering-notes/medium/122fa85f6829/010-0-yfdntcpmwdyzvj8c.webp)

Este cambio es compatible con versiones anteriores; si la configuración no se actualiza, el bot utiliza los parámetros predeterminados de la base de datos.

### Correcciones de conectores y otras mejoras

Los conectores de Azbit y P2B recibieron correcciones para `getOrderDetails()`, incluyendo soluciones a imperfecciones en las APIs de ambos exchanges. Los módulos de Comando, Libro de órdenes y Trader fueron refactorizados, y se añadieron tipos de TypeScript como parte del trabajo continuo de mejora de calidad del código. Se actualizaron dependencias, se mejoró el registro de eventos (logging) y se corrigieron varios errores menores.

![Nueva actualización v7.0.0 del bot de market making para proyectos cripto](/images/engineering-notes/medium/122fa85f6829/011-0-la8ixtoq1x1d6nbm.webp)

El bot continúa proporcionando notificaciones informativas para que los operadores puedan supervisar la actividad de trading.

![Nueva actualización v7.0.0 del bot de market making para proyectos cripto](/images/engineering-notes/medium/122fa85f6829/012-0-bb8s0ouz9vefnxus.webp)

La versión y el registro completo de cambios están disponibles en GitHub: [v7.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0).

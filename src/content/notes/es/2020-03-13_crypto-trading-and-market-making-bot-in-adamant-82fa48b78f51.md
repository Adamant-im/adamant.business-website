---
title: "Bot de trading criptográfico y creación de mercado en ADAMANT"
slug: "crypto-trading-and-market-making-bot-in-adamant-82fa48b78f51"
description: "El bot de trading ADAMANT es compatible con varias exchanges de criptomonedas. Se puede usar para trading manual o automático, con énfasis actual en llenar libros de órdenes y generar volumen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/crypto-trading-market-making-bot-in-adamant-82fa48b78f51"
publishedAt: "2020-03-13T11:21:13.547Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/82fa48b78f51/001-0-o1ekf2vkjogaqiht.webp"
cardSpan: "full"
originalId: "medium:82fa48b78f51"
locale: "es"
placeholder: false
---

El bot de trading ADAMANT es compatible con una variedad de exchanges de criptomonedas. Puede utilizarse para trading manual o automático, con un énfasis actual en llenar libros de órdenes y generar volumen de operaciones en lugar de obtener beneficios especulativos.

### Expectativas realistas sobre los bots de trading

Los bots de trading no garantizan ganancias. La probabilidad de éxito es aproximadamente del 50 %, y cualquier persona que afirme que un bot generará beneficios de forma segura no está siendo honesta. Las empresas venden bots de trading en lugar de usarlos ellos mismos porque el trading de criptomonedas conlleva un riesgo significativo, independientemente de que se utilice un bot o métodos manuales. Las funciones de trading orientadas a beneficios del bot ADAMANT son actualmente limitadas; el caso de uso principal es la creación de mercado.

### Por qué es importante la creación de mercado

Una gran parte del volumen de operaciones en exchanges de criptomonedas es artificial. Los pequeños proyectos de tokens listados en exchanges pequeñas enfrentan volumen cero porque incluso las monedas principales tienen dificultades para atraer volumen. Sin volumen visible, los usuarios dudan en comprar y otras exchanges se niegan a listarlos. Por lo tanto, los operadores de proyectos deben crear volumen de trading y llenar libros de órdenes por sí mismos, pagando comisiones de la exchange en el proceso.

### Cómo funciona el bot

El bot de trading es un programa persistente que se ejecuta en un servidor. Después de la instalación, configuras la exchange objetivo y el par de trading. El bot monitorea comandos entrantes, ejecuta operaciones según tu estrategia configurada y envía notificaciones para todas las operaciones. Los comandos se emiten a través de ADAMANT Messenger, lo que significa que necesitas dos cuentas ADM: una para ti como administrador y otra para el bot.

### Requisitos para comenzar

Necesitas conocimientos básicos de Linux y Node.js, junto con un servidor virtual mínimo de cualquier proveedor de alojamiento en la nube. No es necesario ejecutar un nodo completo de ADAMANT. Debes crear dos cuentas de ADAMANT: tu cuenta personal, cuya dirección va en el campo de configuración `admin_accounts`, y la cuenta del bot, cuyo `passPhrase` se establece en el archivo de configuración. Cada mensaje enviado al bot cuesta 0.001 ADM, y hay tokens ADM gratuitos disponibles a través del programa de recompensas de ADAMANT en cantidades suficientes para años de uso.

En el lado de la exchange, necesitas claves API de tu cuenta, que se crean en la configuración de API de la exchange. Deposita fondos en los saldos del par de trading en la exchange y asegúrate de que el libro de órdenes para tu par elegido tenga al menos una oferta de compra y una de venta antes de lanzar el bot. Finalmente, instala el bot, ajusta el archivo de configuración y ejecútalo.

### Comandos

El bot acepta comandos a través de ADAMANT Messenger. Usa `/help` para ver los comandos disponibles, y consulta la referencia completa de comandos para más detalles.

![Bot de trading criptográfico y creación de mercado en ADAMANT](/images/engineering-notes/medium/82fa48b78f51/002-0-mvxlgzjz2pq3e6dl.webp)

### Configuración y código fuente

El bot es de código abierto y las instrucciones de instalación están disponibles en GitHub. En el sitio web del proyecto se ofrece una guía detallada de configuración para usuarios menos experimentados.

El trading de criptomonedas conlleva un riesgo considerable. Tú eres el único responsable de tus decisiones de trading. ADAMANT también ofrece otros bots para diferentes casos de uso.

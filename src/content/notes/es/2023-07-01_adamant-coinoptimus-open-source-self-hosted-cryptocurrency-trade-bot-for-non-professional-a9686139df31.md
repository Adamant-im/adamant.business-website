---
title: "ADAMANT CoinOptimus: Bot de trading de criptomonedas de código abierto y autohospedado"
slug: "adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-a9686139df31"
description: "ADAMANT CoinOptimus es un bot de trading autohospedado para traders no profesionales que desean automatización sin entregar el control de sus claves a servicios externos."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-traders-a9686139df31"
publishedAt: "2023-07-01T12:39:55.877Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/a9686139df31/001-0-ygfhry-dhfu9rszm.webp"
cardSpan: "full"
originalId: "medium:a9686139df31"
locale: "es"
placeholder: false
---

ADAMANT CoinOptimus es un bot de trading de criptomonedas autohospedado dirigido a traders no profesionales que desean automatización sin entregar el control de sus claves a servicios de terceros. Al ejecutarse en su propio servidor, los usuarios conscientes de la privacidad mantienen el control total sobre las credenciales de API de sus exchanges. El bot también es adecuado para entusiastas casuales de criptomonedas y, gracias a su estrategia de escalera/rejilla, para propietarios de proyectos o creadores de mercado que buscan completar libros de órdenes y mejorar la liquidez.

El bot está construido sobre Node.js y se ejecuta continuamente en un VPS. Usted configura el exchange objetivo y el par de trading en un archivo `config.jsonc`, proporciona claves API del exchange (idealmente solo para trading, sin derechos de retiro) y gestiona el bot enviando comandos con barra diagonal a través de ADAMANT Messenger. Las notificaciones de operaciones en tiempo real pueden enviarse a ADAMANT Messenger, Slack y Discord. Desde su primer lanzamiento, CoinOptimus soporta Binance, Bitfinex, P2PB2B, Azbit y StakeCube.

### Estrategia de Escalera/Rejilla

CoinOptimus utiliza principalmente una estrategia de Escalera/Rejilla Óptima. El bot coloca múltiples órdenes de compra y venta a partir del spread. Cuando se ejecuta la orden más cercana, coloca una orden coincidente en el lado opuesto, siguiendo el principio de comprar más barato de lo que vende y vender más caro de lo que compra. Este enfoque funciona mejor en mercados volátiles.

![ADAMANT CoinOptimus: Bot de trading de criptomonedas de código abierto y autohospedado para traders no profesionales](/images/engineering-notes/medium/a9686139df31/002-0-tfo-ftrmwbt1zl7r.webp)

![ADAMANT CoinOptimus: Bot de trading de criptomonedas de código abierto y autohospedado para traders no profesionales](/images/engineering-notes/medium/a9686139df31/003-0-2twg79hid4ph-cia.webp)

### Instalación y Configuración

CoinOptimus está diseñado para Ubuntu 18–22 y CentOS 8, con dependencias en Node.js v16+ y MongoDB v6+. La instalación implica clonar el [repositorio de GitHub](https://github.com/Adamant-im/adamant-coinoptimus) y ejecutar `npm install`. La configuración se realiza mediante `config.jsonc`, donde se especifica la frase de acceso ADAMANT del bot, la dirección de la cuenta de administrador autorizada para emitir comandos, los detalles del exchange y las claves API. Al actualizar el código fuente mediante git, revise los cambios en la configuración predeterminada y aplíquelos a su `config.jsonc`, luego reinicie el bot.

### Uso a través de ADAMANT Messenger

El bot utiliza cuentas de blockchain ADAMANT identificadas por direcciones públicas y protegidas con frases de acceso de 12 palabras. Tras la instalación, puede enviar comandos a través de ADAMANT Messenger. Por ejemplo, `/buy ADM/USDT amount=200 price=0.005` coloca una orden de compra de 200 ADM a 0.005 USDT. Para iniciar la estrategia de Escalera con 6 órdenes, un paso de precio del 3% y aproximadamente 100 USDT por orden, use `/start ld 100 USDT 6 3%`. La referencia completa de comandos está disponible en el [Wiki de CoinOptimus](https://github.com/Adamant-im/adamant-coinoptimus/wiki).

![ADAMANT CoinOptimus: Bot de trading de criptomonedas de código abierto y autohospedado para traders no profesionales](/images/engineering-notes/medium/a9686139df31/004-0-jinplg771dicgjt7.webp)

### Descargo de responsabilidad

CoinOptimus no es una máquina de ganancias garantizadas. Úselo bajo su propio riesgo.

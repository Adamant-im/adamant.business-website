---
title: "ADAMANT Tradebot 8.0: Una base más sólida para la creación de mercados autohospedada"
slug: "adamant-market-making-software-8-0-a-stronger-foundation-for-your-token-s-market-presence-c8032a1a7d38"
description: "La versión 8.0 es la actualización más importante del ADAMANT Tradebot de código abierto en años. Para emisores de tokens, la brecha entre tener una cotización y tener un mercado es real."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-software-8-0-a-stronger-foundation-for-your-tokens-market-presence-c8032a1a7d38"
publishedAt: "2026-06-26T15:58:19.696Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/c8032a1a7d38/001-0-qywflgfw1krzccj5-png.webp"
cardSpan: "full"
originalId: "medium:c8032a1a7d38"
locale: "es"
placeholder: false
---

La versión 8.0 es la actualización más importante del ADAMANT Tradebot de código abierto en años. Para emisores de tokens, la brecha entre tener una cotización y tener un mercado es real: un libro de órdenes delgado asusta a los comerciantes, un spread amplio encarece cada intercambio y los huecos en el libro parecen descuido. El bot cierra esa brecha al mantener políticas de spread, liquidez y volumen en las exchanges donde realmente cotiza su token.

La propuesta central sigue siendo la misma. Usted aloja el bot en su propio VPS, lo conecta a su exchange mediante claves API que nunca abandonan su infraestructura y controla quién puede enviar comandos. La versión 8.0 hace que el bot sea más confiable, más seguro y más fácil de operar a largo plazo, pasando de algo que funciona si lo supervisa constantemente a una infraestructura diseñada para funcionar sin intervención.

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/002-1-swca0-a2gacbe1zvi17jjq-png.webp)

### Seguridad operativa

La versión 8.0 actualiza las dependencias con un historial limpio de auditorías de alta/crítica, refuerza los patrones de acceso para las APIs de gestión opcionales y alinea la base de código con la misma línea base de ingeniería utilizada en la línea de productos comerciales, sin incluir funciones exclusivas de pago. Sus claves API de exchange nunca van a ADAMANT ni a ningún panel SaaS.

### Interfaces de gestión

El bot se puede controlar a través de ADAMANT Messenger (el canal de comandos original cifrado y descentralizado), Telegram (disponible en el bot Premium) y una interfaz web (Web UI) actualmente en desarrollo. En el interior, la versión 8.0 añade una API privada moderna para la Web UI basada en Fastify con autenticación JWT, esquemas de solicitud validados y actualizaciones en tiempo real mediante WebSocket. Para la mayoría de los operadores esto permanece invisible: simplemente obtienen una experiencia de gestión más ágil y confiable cuando la Web UI está habilitada.

En la operación diaria, sigue haciendo lo mismo de siempre: verificar saldos, ajustar el spread, activar políticas de volumen, establecer rangos de precios y pausar módulos cuando el mercado se comporta de forma extraña. La diferencia es que ahora el bot subyacente maneja esos comandos de manera más predecible.

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/003-1-6ltktmqgyhhs6pniej4dcq-png.webp)

### Soporte de exchanges

El bot de código abierto soporta un conjunto enfocado de exchanges centralizadas: Azbit, P2PB2B, StakeCube, Coinstore, FameEX (a través de FameEXnet—conector actualizado en v8.0) y NonKYC. Los usuarios de FameEX deben tener en cuenta que ahora el bot se comunica con FameEXnet, por lo que la actualización requiere un cambio planeado del conector en lugar de un simple `git pull`. El bot gratuito se mantiene deliberadamente enfocado en mercados al contado con un enfoque prioritario en REST y sin la complejidad de futuros. Una cobertura más amplia de CEX y módulos avanzados de estrategia forman parte de la línea de productos Premium.

### En el interior

El antiguo manejador de comandos monolítico se ha dividido en módulos especializados. La recepción de transacciones ADAMANT se reconstruyó sobre `adamant-api` 3.x. El inicio ahora espera a la base de datos, ejecuta migraciones automáticas para que los datos antiguos de órdenes se actualicen de forma segura, carga los metadatos de las exchanges y solo entonces inicia los bucles de negociación.

El entorno de ejecución apunta a Node.js 22.2+ con el controlador MongoDB 7.x y una pila HTTP actualizada. La capa privada de WebUI utiliza JWT, validación de esquemas, listas blancas de IP y valores predeterminados orientados a localhost, para que la comodidad de gestión no se convierta en una superficie de ataque. Nuevos conjuntos de pruebas automatizadas cubren la API de WebUI y los ayudantes principales, haciendo que las actualizaciones sean menos arriesgadas para los equipos técnicos.

### Actualización

Los nuevos proyectos pueden comenzar con:

```bash
git clone https://github.com/Adamant-im/adamant-tradebot
cd adamant-tradebot
npm i
cp config.default.jsonc config.jsonc
# edit config.jsonc - pair, API keys, spread/volume settings
npm start
```

Las instalaciones existentes de v7.x deben detener el bot, hacer pull, reinstalar, fusionar cualquier campo nuevo de `config.default.jsonc` en `config.jsonc` y luego reiniciar:

```bash
pm2 stop tradebot
git pull
npm i
# merge new config.default.jsonc fields into your config.jsonc
pm2 restart tradebot
```

Esta versión se rastrea en [GitHub PR #110](https://github.com/Adamant-im/adamant-tradebot/pull/110) y cierra el problema general [#109](https://github.com/Adamant-im/adamant-tradebot/issues/109). Las referencias completas de instalación y comandos están disponibles en [marketmaking.app](https://marketmaking.app/cex-mm/installation/).

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/004-0-fcjgeqhiqq-h0grv-png.webp)

![ADAMANT Market-making Software 8.0: A Stronger Foundation for Your Token’s Market Presence](/images/engineering-notes/medium/c8032a1a7d38/005-0-8ihrvb-is-qsshbb-png.webp)

---
title: "La primera autenticación de dos factores basada en blockchain en producción: ADAMANT en Resfinex"
slug: "world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
description: "La autenticación de dos factores es esencial para proteger fondos, pero no todos los métodos son igualmente seguros. La autenticación basada en SMS es vulnerable a ataques de intercambio de SIM, que han provocado pérdidas significativas de criptomonedas."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
publishedAt: "2020-03-01T07:19:10.858Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/7adf5554728d/001-0-hktm6vjfrwccv7kd.webp"
cardSpan: "full"
originalId: "medium:7adf5554728d"
locale: "es"
placeholder: false
---

La autenticación de dos factores es esencial para proteger fondos, pero no todos los métodos de autenticación de dos factores son igualmente seguros. La autenticación basada en SMS es particularmente vulnerable a ataques de intercambio de SIM, que han causado pérdidas significativas de criptomonedas. La autenticación de dos factores basada en blockchain ofrece una alternativa más confiable al entregar códigos de autenticación a través de un mensajero en cadena, eliminando por completo la superficie de ataque de las telecomunicaciones.

### ADAMANT 2FA en el intercambio Resfinex

El intercambio de criptomonedas Resfinex es la primera implementación en producción de la autenticación de dos factores basada en blockchain, utilizando ADAMANT Messenger para entregar los códigos de autenticación. El flujo de configuración es sencillo: el usuario accede a la configuración de seguridad, selecciona el método de autenticación de dos factores mediante ADAMANT Messenger e introduce su dirección de ADAMANT donde recibirá los códigos. Los nuevos usuarios de ADAMANT necesitan una pequeña cantidad de ADM para inicializar su cuenta. Tras introducir el código de verificación y la contraseña del intercambio, la autenticación de dos factores queda activada.

![Primera autenticación de dos factores del mundo en una blockchain en la vida real](/images/engineering-notes/medium/7adf5554728d/002-0-xvtbn00u-d5nvyzb.webp)

![Primera autenticación de dos factores del mundo en una blockchain en la vida real](/images/engineering-notes/medium/7adf5554728d/003-0-necwvzuliwggpf2c.webp)

![Primera autenticación de dos factores del mundo en una blockchain en la vida real](/images/engineering-notes/medium/7adf5554728d/004-0-to4kuxsaixckgh5j.webp)

![Primera autenticación de dos factores del mundo en una blockchain en la vida real](/images/engineering-notes/medium/7adf5554728d/005-0-kexa5qysqrmab0vf.webp)

![Primera autenticación de dos factores del mundo en una blockchain en la vida real](/images/engineering-notes/medium/7adf5554728d/006-0-f1qr6w3udghq575k.webp)

![Primera autenticación de dos factores del mundo en una blockchain en la vida real](/images/engineering-notes/medium/7adf5554728d/007-0-a-sfwulbvejil2rl.webp)

Una vez activada, se requieren códigos de autenticación de dos factores para los inicios de sesión, confirmaciones de retiro, cambios de contraseña, creación de claves de API y modificaciones en la configuración de seguridad u otras configuraciones sensibles de la cuenta.

### Implementación de la autenticación de dos factores basada en blockchain en su servicio

Cualquier proveedor de servicios, incluidos intercambios e instituciones financieras, puede integrar ADAMANT 2FA. ADAMANT es un proyecto completamente de código abierto con documentación y guías de implementación disponibles. El código fuente de la aplicación de demostración de ADAMANT 2FA está disponible en [GitHub](https://github.com/Adamant-im/adamant-2fa), y existe una [guía de conexión](https://medium.com/adamant-im/go-to-secure-2fa-on-a-blockchain-344500a5f010#db04) disponible para desarrolladores.

![Primera autenticación de dos factores del mundo en una blockchain en la vida real](/images/engineering-notes/medium/7adf5554728d/008-0-1zqjg9sgj2eli5h5.webp)

![Primera autenticación de dos factores del mundo en una blockchain en la vida real](/images/engineering-notes/medium/7adf5554728d/009-0-wdowhqndtnflq0oy.webp)

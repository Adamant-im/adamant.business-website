---
title: "ADAMANT Web App 2.1: Compartir con QR, Acceso a Bots y Mejoras en la Transferencia de Tokens"
slug: "adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
description: "La actualización ADAMANT Web App 2.1 mejora la eficiencia del mensajero y facilita la incorporación. Las nuevas cuentas tienen acceso inmediato a dos bots: uno de intercambio y otro de apuestas."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
publishedAt: "2019-10-02T06:50:35.550Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ffbc0ebc656/001-1-l-nswrbv8xnsm1omxvshqg-png.webp"
cardSpan: "full"
originalId: "medium:4ffbc0ebc656"
locale: "es"
placeholder: false
---

La actualización ADAMANT Web App 2.1 se centra en la eficiencia del mensajero y una incorporación más sencilla. Las nuevas cuentas ahora tienen acceso inmediato a dos bots —un bot de intercambio y un bot de apuestas— sin necesidad de configuración adicional.

Al hacer clic en una dirección de billetera se revelan tres opciones: copiar la dirección al portapapeles, copiar un enlace de chat compartible o mostrar un código QR. El formato del enlace compartido sigue el patrón `https://msg.adamant.im/?address=U14236667426471084862`, lo que permite a los destinatarios comenzar a chatear inmediatamente. Los códigos QR también se muestran ahora en la sección "Información del contacto" cuando haces clic en el icono de un contacto.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/002-1-ca218mdchy7u6byjnmqxha-png.webp)

Compartir mediante QR es útil para intercambiar contactos en persona porque no deja ningún registro rastreable. Un solo código QR puede codificar no solo una dirección, sino también una etiqueta de contacto, una cantidad de tokens y un mensaje de saludo. La aplicación analiza automáticamente los enlaces en el portapapeles y rellena los campos correspondientes. Por ejemplo, este enlace abre un chat con un contacto etiquetado, una cantidad de tokens predefinida y un mensaje:

```
https://msg.adamant.im/?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
```

Al transferir tokens, la aplicación admite ajustes rápidos de cantidades, lo que permite enviar todos los fondos disponibles o una fracción como un tercio sin necesidad de ingreso manual.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/004-1-dmv7hxalesdxspouol49ka-png.webp)

Estas funciones están impulsadas por las ADAMANT Improvement Proposals (AIPs), una colección abierta de sugerencias para mejorar la aplicación alojada en el [repositorio AIPs en GitHub](https://github.com/Adamant-im/AIPs). Junto con la aplicación web, las versiones para Tor, Windows y Linux fueron actualizadas y están disponibles en la [versión 2.1 en GitHub](https://github.com/Adamant-im/adamant-im/releases/tag/v2.1.0).

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/003-1-2hnq5ol3qs8fauymp6vxa-png.webp)

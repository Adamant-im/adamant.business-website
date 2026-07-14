---
title: "ADAMANT Messenger: Transferencias Seguras de ETH"
slug: "adamant-messenger-secure-eth-transfers-b27984a3ce05"
description: "ADAMANT ha añadido soporte integrado para billeteras y transferencias de Ethereum (ETH) dentro de su plataforma de mensajería privada. La función permite transferencias completamente sin confianza..."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-secure-eth-transfers-b27984a3ce05"
publishedAt: "2018-06-07T07:30:57.792Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b27984a3ce05/001-0-0qs-wuvvdq6a0uk2.webp"
cardSpan: "full"
originalId: "medium:b27984a3ce05"
locale: "es"
placeholder: false
---

ADAMANT ha añadido soporte integrado para billeteras y transferencias de Ethereum (ETH) dentro de su plataforma de mensajería privada. La función permite transferencias completamente sin confianza de criptomonedas dentro del sistema de chat, sin terceros ni intermediarios. Esto funciona de forma similar a la aplicación cliente de código abierto MyEtherWallet: los usuarios conservan sus propias claves privadas, y cada transacción se firma localmente antes de enviarse cifrada a un nodo de Ethereum.

Cuando un usuario envía ETH a través de la red ADAMANT, una clave privada se deriva de la misma frase de acceso de la billetera ADAMANT utilizada para acceder al Messenger. Esto significa que la frase de acceso de ADAMANT se convierte en la única clave para todas las billeteras de criptomonedas vinculadas, haciendo que el almacenamiento seguro de la frase sea crítico. ADAMANT no puede recuperar fondos ni congelar cuentas si se pierde la frase de acceso o si esta se ve comprometida por phishing.

![ADAMANT Messenger: Transferencias Seguras de ETH](/images/engineering-notes/medium/b27984a3ce05/002-0-zzoel-pond1fmpkh.webp)

Actualmente se encuentran en desarrollo nodos de Ethereum independientes con índices de base de datos especializados para recuperar el historial de transacciones. Los usuarios que prefieran no confiar en la infraestructura de ADAMANT pueden ejecutar su propio nodo de Ethereum con dichos índices y seleccionarlo en la aplicación. Todo el código fuente de ADAMANT está disponible públicamente en GitHub.

Cuando un usuario crea una cuenta en ADAMANT, se genera una dirección de Ethereum y la cadena de bloques registra una entrada pública en KVS para probar la propiedad. La cuenta debe poseer más de 0.001 ADM para registrar esta transacción. Una vez registrada, cualquier persona en un chat puede buscar la dirección ETH desde la cadena de bloques para enviar un pago, eliminando la necesidad de solicitar la dirección por separado.

Una consideración importante sobre la privacidad: la dirección ETH es públicamente visible en la cadena de bloques, y cualquiera puede ver que una dirección ADAMANT dada está vinculada a una dirección ETH específica. Aunque esto no se puede vincular a una identidad del mundo real, los usuarios preocupados por el anonimato deberían evitar compartir su dirección ADAMANT públicamente. Los usuarios mantienen el control total sobre su billetera ETH y pueden transferir fondos a cualquier otra billetera de Ethereum, aplicándose las comisiones estándar de gas de Ethereum.

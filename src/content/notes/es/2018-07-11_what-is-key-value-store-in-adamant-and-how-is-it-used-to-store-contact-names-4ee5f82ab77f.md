---
title: "Almacenamiento clave-valor en ADAMANT: Guardar nombres de contactos en la blockchain"
slug: "what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
description: "ADAMANT introdujo un mecanismo de almacenamiento clave-valor (KVS) para guardar datos de contacto en la blockchain, implementado en la versión 0.2.0 del ADAMANT Blockchain. KVS soporta datos públicos y privados."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
publishedAt: "2018-07-11T07:10:16.055Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ee5f82ab77f/001-0-tvpp-oomdjax-ek8.webp"
cardSpan: "full"
originalId: "medium:4ee5f82ab77f"
locale: "es"
placeholder: false
---

ADAMANT introdujo un mecanismo de almacenamiento clave-valor (KVS) para guardar datos de contacto en la blockchain, implementado en la versión 0.2.0 del ADAMANT Blockchain. KVS soporta tanto almacenamiento público como privado. Ejemplos públicos incluyen direcciones Ethereum, mientras que ejemplos privados incluyen libretas de direcciones.

Las transacciones privadas de KVS se almacenan en la cadena junto con otros tipos de transacciones, pero solo son accesibles para sus propietarios. El contenido de la transacción se cifra utilizando un hash de la clave privada del propietario con sal añadida para mayor seguridad. Los detalles técnicos completos se especifican en [AIP-3](https://aips.adamant.im/AIPS/aip-3).

ADAMANT utiliza almacenamiento de datos incremental, lo que significa que la aplicación cliente transmite solo los cambios en la libreta de direcciones en lugar de toda la libreta. Este es un aspecto importante a considerar en el almacenamiento basado en blockchain, donde minimizar el tamaño de los datos en la cadena es crucial. Cada clave se asocia a un valor específico; por ejemplo, la dirección ADAMANT de un contacto (como `U324242353425354`) se asocia a un nombre para mostrar (como "John").

La aplicación web de ADAMANT Messenger se ha actualizado para soportar esta funcionalidad. Los usuarios pueden renombrar un contacto haciendo clic en el encabezado que contiene la dirección ADAMANT dentro de un chat.

![Almacenamiento clave-valor en ADAMANT](/images/engineering-notes/medium/4ee5f82ab77f/002-0-xzokd2tzoxh9eqk2.webp)

Se planea incluir soporte para libreta de direcciones en las aplicaciones de iOS y Android en futuras versiones.

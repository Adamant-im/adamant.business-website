---
title: "Notificar mediante ADAMANT"
slug: "notify-via-adamant-e6116f7e55cc"
description: "ADAMANT posee propiedades que la hacen adecuada para transporte de notificaciones: entrega validada en cadena, inmutabilidad, almacenamiento ilimitado y acceso multi-dispositivo."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/notify-via-adamant-e6116f7e55cc"
publishedAt: "2019-06-02T14:22:43.887Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e6116f7e55cc/001-1-8rvans74h-cl-ux-bpeiaw-png.webp"
cardSpan: "full"
originalId: "medium:e6116f7e55cc"
locale: "es"
placeholder: false
---

ADAMANT ofrece varias propiedades que la hacen adecuada como transporte de notificaciones: cada entrega de mensaje se valida en la cadena, los mensajes y su orden son inmutables, el tiempo de almacenamiento es efectivamente ilimitado y el acceso no está vinculado a un dispositivo específico. El proyecto es de código abierto. Un ejemplo práctico es el de operadores de pools de criptomonedas que reciben notificaciones sobre el funcionamiento del pool a través de mensajes ADAMANT.

Los desarrolladores pueden integrar notificaciones ADAMANT mediante tres interfaces principales. La Consola ADAMANT proporciona un comando `send message` y es una herramienta de línea de comandos independiente del lenguaje. Para aplicaciones JavaScript, la función `send` está disponible en la biblioteca cliente JS de la API ADAMANT. Por último, el nodo nativo ADAMANT expone su propia API para integración directa.

El contenido del mensaje admite formato Markdown y Emoji, lo que permite notificaciones estructuradas y fáciles de leer.

---
title: "Un messenger de blockchain con velocidad P2P"
slug: "a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
description: "La versión 2.4.0 de ADAMANT PWA introduce soporte para WebSockets, aumentando significativamente la velocidad de mensajería para competir con los mensajeros P2P clásicos."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
publishedAt: "2020-02-07T03:03:50.348Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2c2cd58f8eb3/001-0-nhjz84euai2uyek8-png.webp"
cardSpan: "full"
originalId: "medium:2c2cd58f8eb3"
locale: "es"
placeholder: false
---

La versión 2.4.0 de ADAMANT PWA introduce soporte para WebSockets, aumentando significativamente la velocidad de mensajería para competir con los mensajeros P2P clásicos. Los WebSockets permiten el intercambio instantáneo de datos entre un nodo y la aplicación de mensajería, notificando a los usuarios sobre nuevos eventos y transacciones no confirmadas de inmediato.

Cuando se envía un mensaje, inicialmente es recibido por un solo nodo y se muestra con el estado ✔ «Entregado a un nodo» en una fracción de segundo, lo que significa que el destinatario ya lo ha recibido. Luego, el mensaje es verificado por otros nodos en la red descentralizada, lo que garantiza las ventajas de seguridad de un messenger basado en blockchain. Una vez verificado e incluido en un nuevo bloque, el estado cambia a ⚭ «Guardado en la blockchain». Este proceso de verificación tarda unos segundos.

Actualmente, los nodos se comunican entre sí con un ligero retraso. Si ambos usuarios están conectados al mismo nodo, los mensajes se entregan instantáneamente. Si están conectados a nodos diferentes, la entrega puede tardar unos segundos. Los usuarios pueden probar esto navegando a la lista de Nodos en la sección de Configuración y desactivando todos los nodos excepto uno.

![Un messenger de blockchain con velocidad P2P](/images/engineering-notes/medium/2c2cd58f8eb3/002-0-7eq9vdfgyflcuptg-png.webp)

Futuras actualizaciones añadirán conexiones compatibles entre sockets y nodos para eliminar los retrasos independientemente de los nodos a los que estén conectados los usuarios. Además del soporte para WebSockets y los nuevos indicadores de estado de blockchain, la versión 2.4.0 incluye soporte para el token Resfinex (RES), un nombre y logotipo actualizados para Stably Dollar (USDS), y varios ajustes de interfaz, como un diálogo actualizado para Comprar y Vender tokens y una altura ajustada del menú Enviar Token. El lanzamiento también introduce validación para direcciones BTC y corrige problemas relacionados con el pegado de direcciones desde el portapapeles y el envío de cantidades negativas.

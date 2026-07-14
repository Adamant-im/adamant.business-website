---
title: "Habilitar notificaciones push en ADAMANT Messenger para iOS"
slug: "enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
description: "ADAMANT Messenger para iOS puede notificar mensajes nuevos incluso cuando la aplicación no está en ejecución, mediante el Servicio de Notificaciones ADAMANT (ANS)."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
publishedAt: "2021-09-02T20:37:14.112Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/5a77ecffeb32/001-0-gssgbcsz1xeu5gpg.webp"
cardSpan: "full"
originalId: "medium:5a77ecffeb32"
locale: "es"
placeholder: false
---

ADAMANT Messenger para iOS puede notificar a los usuarios sobre nuevos mensajes incluso cuando la aplicación no está en ejecución, facilitado por el Servicio de Notificaciones ADAMANT (ANS). El flujo de trabajo comienza cuando un usuario envía un mensaje cifrado de señal que contiene un token único a un nodo de la blockchain ADAMANT, con la dirección ADAMANT del ANS como destinatario. ANS consulta la blockchain para descifrar el token del usuario y filtra las transacciones en las que la dirección ADM del usuario es el destinatario. Luego, solicita a APNS entregar estas transacciones, que contienen mensajes cifrados, al dispositivo del usuario especificado por el token único. Finalmente, APNS notifica al dispositivo, y la aplicación Messenger utiliza su clave secreta (frase de acceso) para descifrar los mensajes.

Esta arquitectura garantiza que el dispositivo del usuario nunca se comunique directamente con ANS, lo que significa que ANS nunca conoce la IP del dispositivo ni otras identidades. Se comunican únicamente a través de nodos blockchain. Para habilitar las notificaciones push en la aplicación, los usuarios deben activar la opción "Permanecer conectado" y seleccionar un tipo de notificación push.

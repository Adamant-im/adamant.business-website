---
title: "Renovación del servicio de notificaciones de ADAMANT: misma privacidad, cimientos más sólidos"
slug: "adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
description: "El servicio de notificaciones de ADAMANT (ANS) ha lanzado su mayor actualización desde 2019, manteniendo su modelo de notificaciones push de conocimiento cero para iOS."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
publishedAt: "2026-08-07T14:48:47.463Z"
author: "Sab Kabadas"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:fee1b3ab39fb"
coverImage: "/images/engineering-notes/medium/fee1b3ab39fb/001-50da4f2353.webp"
locale: "es"
placeholder: false
---

El servicio de notificaciones de ADAMANT (ANS) ha lanzado su actualización más importante desde 2019, manteniendo su modelo de notificaciones push de conocimiento cero para usuarios de iOS mientras reconstruye su infraestructura subyacente. Para los usuarios de iPhone de ADAMANT Messenger, ANS opera discretamente en segundo plano, alertando a los dispositivos sobre nuevos mensajes sin comprometer la privacidad.

La mayoría de las aplicaciones de mensajería enfrentan un dilema en el que las notificaciones push requieren que algún componente del sistema conozca los detalles del mensaje. ANS evita esto consultando la blockchain pública de ADAMANT para detectar transacciones dirigidas a un dispositivo registrado. Cuando detecta una, solicita a Apple que notifique al dispositivo utilizando únicamente un ID de transacción. ANS no puede leer el contenido de las transacciones ni incluir contenido descifrado en la carga útil de la notificación, ya que el descifrado requiere una clave secreta que solo posee el dispositivo del usuario. Ni ANS ni Apple pueden reconstruir la conversación.

Aunque este modelo de privacidad permanece intacto, el tiempo de ejecución subyacente y los mecanismos de fiabilidad se han reforzado significativamente. ANS ahora se ejecuta sobre .NET 8, reemplazando una versión de tiempo de ejecución que ya había llegado al final de su vida útil. Esto permite que el servicio se ejecute de forma nativa en los sistemas operativos de servidor actuales sin depender de capas de compatibilidad obsoletas.

Además, se ha corregido una fuga de conexiones de red que se acumulaba con el tiempo y requería reinicios periódicos del servicio, permitiendo ahora que las conexiones se reutilicen correctamente. El servicio también implementa una conmutación por error (failover) real para la comunicación con los nodos de la blockchain. Anteriormente, un solo nodo inaccesible podía interrumpir toda la canalización de notificaciones. Ahora, ANS reintenta automáticamente la conexión con otro nodo, aprovechando la resiliencia descentralizada de la red ADAMANT.

Esta versión de mantenimiento fue auditada de forma independiente por cryptofoundry. Al modernizar el tiempo de ejecución y solucionar problemas críticos de infraestructura, ADAMANT garantiza que ANS pueda seguir enviando notificaciones de conocimiento cero de manera fiable durante muchos años.

---
title: "La función de respuesta/cita llegó a la aplicación iOS de ADAMANT Messenger"
slug: "the-reply-quote-feature-landed-on-the-adamant-messenger-ios-app-1ac2e43cbef1"
description: "ADAMANT Messenger ha lanzado la función de respuesta/cita en su última actualización para iOS. Al ser una plataforma descentralizada, su implementación requiere enfoques técnicos únicos."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/the-reply-quote-feature-landed-on-the-adamant-messenger-ios-app-1ac2e43cbef1"
publishedAt: "2023-07-09T13:23:47.869Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/1ac2e43cbef1/001-0-f-bl9cbsppi6phqr.webp"
cardSpan: "full"
originalId: "medium:1ac2e43cbef1"
locale: "es"
placeholder: false
---

ADAMANT Messenger, una plataforma de comunicación basada en blockchain donde cada mensaje es una transacción, ha introducido una función de respuesta/cita en su última actualización de la aplicación para iOS. Debido a que ADAMANT opera sobre una arquitectura descentralizada, la implementación de funciones estándar de mensajería como la cita requiere enfoques técnicos únicos en comparación con mensajeros centralizados convencionales.

La función de respuesta/cita se puede activar deslizando hacia la izquierda o manteniendo pulsado un mensaje. Junto con esta mejora, la actualización introduce una sección de Contribución, que permite a los usuarios apoyar directamente el desarrollo de la plataforma. También se han añadido análisis opcionales de fallos; desactivados por defecto, los usuarios pueden habilitar Crashlytics desde la sección de Contribución para ayudar a los desarrolladores a obtener información y mejorar la estabilidad de la aplicación.

![La función de respuesta/cita llegó a la aplicación iOS de ADAMANT Messenger](/images/engineering-notes/medium/1ac2e43cbef1/002-0-pdyl0ofrnylbkm4e.webp)

Varios problemas relacionados con la billetera y transacciones se han resuelto en esta versión. Las direcciones BC1 (SegWit) ahora funcionan correctamente para transacciones de la billetera BTC. Se han corregido problemas con el límite de gas para transacciones ETH y ERC20, y se ha añadido una opción para aumentar el gas en transacciones ETH, ERC20 y BTC. La validación de direcciones para criptomonedas ha mejorado, incluyendo soporte para el parámetro "amount" en códigos QR.

Mejoras adicionales incluyen la corrección de un error de desplazamiento en los mensajes, la posibilidad de iniciar un nuevo chat directamente desde el campo de búsqueda y la resolución de errores de diseño para macOS, iPad y iPhone. Se han añadido nuevos nodos para mejorar la estabilidad y el rendimiento; los usuarios pueden acceder a una lista actualizada de nodos pulsando 'Restablecer' en la pantalla de Nodos.

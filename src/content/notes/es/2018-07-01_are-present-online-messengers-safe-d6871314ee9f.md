---
title: "¿Son seguros los mensajeros en línea actuales?"
slug: "are-present-online-messengers-safe-d6871314ee9f"
description: "El mensajero en línea es una forma común de comunicación, pero pocos usuarios evalúan cómo se almacenan, transmiten y acceden sus datos personales. Este análisis examina métodos de cifrado y sistemas de entrega de mensajes."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/are-present-messengers-safe-d6871314ee9f"
publishedAt: "2018-07-01T10:52:29.801Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d6871314ee9f/001-0-4pq2ekt1kq-x6n.webp"
cardSpan: "full"
originalId: "medium:d6871314ee9f"
locale: "es"
placeholder: false
---

El mensajero de texto en línea es una forma ubicua de comunicación, sin embargo pocos usuarios evalúan críticamente cómo se almacenan, transmiten y acceden sus datos personales. Este análisis examina los métodos de cifrado y los sistemas de entrega de mensajes de varios servicios de mensajería populares, centrándose en hechos verificables en lugar de narrativas mediáticas.

WhatsApp, con más de 1.500 millones de usuarios activos mensuales, introdujo el cifrado de "extremo a extremo" en 2016. Sin embargo, la configuración crítica de seguridad estaba enterrada profundamente en la interfaz, y los investigadores identificaron una puerta trasera que permitía la manipulación de datos mediante claves de cifrado modificadas y duplicación en la nube. El código cerrado de WhatsApp hace imposible la verificación independiente de sus afirmaciones de seguridad.

Facebook Messenger, que atiende a 1.300 millones de usuarios, ofrece chats de "extremo a extremo" solo cuando se configuran especialmente. Su código cerrado y el historial de Facebook en privacidad de datos de usuarios generan serias preocupaciones de confianza.

WeChat, usado por más de mil millones de personas en China, afirma que la privacidad del usuario es una prioridad máxima. Sin embargo, sus declaraciones de privacidad describen métodos de cifrado complejos sin mencionar el cifrado de extremo a extremo, y el código fuente sigue siendo cerrado. El servicio opera bajo los estrictos requisitos chinos de retención de datos y vigilancia. QQ Mobile, otro servicio importante en China con casi 800 millones de usuarios, carece completamente de cifrado de extremo a extremo y también mantiene su código fuente privado.

Otros servicios conocidos—incluyendo Viber, Skype, Snapchat y Line—comparten el mismo defecto fundamental: código cerrado que impide auditorías de seguridad independientes, a pesar de afirmaciones agresivas en marketing sobre privacidad.

Telegram, popular para comunicaciones privadas en Medio Oriente, no abre completamente su código fuente. Aunque la API y las aplicaciones cliente son de código abierto, el código del lado del servidor no ha sido publicado, a pesar de una declaración prometiendo que "todo el código será liberado eventualmente". Sin transparencia del lado del servidor, no existe evidencia verificable sobre cómo se gestionan y almacenan los mensajes de los usuarios.

Las aplicaciones que buscan confidencialidad consistentemente quedan cortas debido a limitaciones arquitectónicas inherentes. Estas incluyen autorización obligatoria por número de teléfono, revelación de direcciones IP, almacenamiento de registros en el dispositivo, capacidades arbitrarias de bloqueo de usuarios y almacenamiento centralizado de datos.

Estas deficiencias sistémicas motivaron la creación del mensajero ADAMANT, que adopta un enfoque fundamentalmente diferente al construir su arquitectura sobre tecnología blockchain. La base de código completamente de código abierto de ADAMANT permite la verificación independiente de sus propiedades de seguridad.

![¿Son seguros los mensajeros en línea actuales?](/images/engineering-notes/medium/d6871314ee9f/002-0-qsxqt626jqio99tb.webp)

Mediante el uso de blockchain, ADAMANT elimina la dependencia de servidores centrales, desarrolladores y sistemas internos de identificación. El soporte de la red es proporcionado por usuarios que ganan moneda interna por mantener la infraestructura. El proyecto está en desarrollo activo, con la reciente implementación del soporte para ETH.

![¿Son seguros los mensajeros en línea actuales?](/images/engineering-notes/medium/d6871314ee9f/003-0-cgrras4imu0tlqjn.webp)

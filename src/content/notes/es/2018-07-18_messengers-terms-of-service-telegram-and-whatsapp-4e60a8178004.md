---
title: "Términos de servicio de mensajería: Telegram y WhatsApp"
slug: "messengers-terms-of-service-telegram-and-whatsapp-4e60a8178004"
description: "Este artículo analiza las políticas oficiales de privacidad de Telegram y WhatsApp, dos de los servicios de mensajería más utilizados. A pesar de su tamaño y trayectoria, ninguna plataforma..."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/messengers-terms-of-service-telegram-and-whatsapp-4e60a8178004"
publishedAt: "2018-07-18T13:49:15.655Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4e60a8178004/001-0-w-bbrzmuju79thvm.webp"
cardSpan: "full"
originalId: "medium:4e60a8178004"
locale: "es"
placeholder: false
---

Este artículo analiza las políticas oficiales de privacidad de Telegram y WhatsApp, dos de los servicios de mensajería más utilizados. A pesar de su tamaño y trayectoria, ninguna plataforma ha publicado su código fuente del lado del servidor completo, lo que hace imposible la verificación independiente de sus afirmaciones de seguridad.

## Telegram

Telegram se describe a sí mismo como un proyecto de código abierto, invitando a los usuarios a estudiar su API, protocolo y código fuente. En la práctica, sin embargo, Telegram nunca ha abierto completamente su infraestructura de servidores, capa de almacenamiento de datos ni código interno de procesamiento de mensajes. Esta brecha plantea preguntas sobre la diferencia entre los chats en la nube estándar y los chats "encriptados" opcionales, así como sobre el alcance del cifrado de extremo a extremo en la plataforma.

Telegram almacena mensajes, fotos, videos y documentos de los chats en la nube en sus servidores. Utiliza números de teléfono como identificadores únicos y solicita permiso antes de sincronizar contactos. La política indica que Telegram "solo almacena los datos necesarios para funcionar correctamente", pero no especifica qué datos incluye esto.

Una actualización de 2018 añadió que Telegram procesa datos personales sobre la base de sus propios "intereses legítimos". Los nombres de pantalla, fotos de perfil y nombres de usuario son siempre públicos. Cabe destacar que este diseño ha demostrado permitir la extracción del número de móvil de un usuario a través de la aplicación oficial, como se documentó en investigaciones previas de ADAMANT.

Las disposiciones más significativas se refieren al acceso a los mensajes. La política de Telegram establece explícitamente que los moderadores pueden revisar mensajes reportados por los destinatarios, y que algoritmos automatizados pueden analizar mensajes en chats en la nube para combatir el spam y el phishing. El servicio también recopila metadatos, incluyendo direcciones IP, información del dispositivo, versiones de la aplicación Telegram utilizadas e historial de cambios de nombre de usuario, y puede almacenar metadatos agregados para soportar funciones multi-dispositivo. En resumen, Telegram conserva acceso al contenido de los chats en la nube y se reserva el derecho de inspeccionarlo tanto manual como automáticamente.

Respecto a las fuerzas del orden, Telegram afirma que si recibe una orden judicial que confirme que un usuario es sospechoso de terrorismo, puede revelar la dirección IP y el número de teléfono de ese usuario a las autoridades pertinentes. Una vez revelado el número de teléfono, los organismos estatales pueden solicitar datos del suscriptor al operador de la SIM, ampliando así el alcance del acceso.

## WhatsApp

WhatsApp fue adquirido por Facebook (ahora Meta) en 2014, y su política de privacidad refleja esa relación corporativa. La política comienza indicando que WhatsApp debe recopilar información para "operar, proporcionar, mejorar, comprender, personalizar, soportar y comercializar nuestros Servicios" — un mandato amplio sin justificación específica para cada categoría de recopilación de datos.

Los usuarios deben proporcionar un número de teléfono móvil y un nombre de perfil. WhatsApp también recopila números de teléfono de la libreta de direcciones del usuario de forma regular, incluyendo contactos que no utilizan el servicio. Si un mensaje no puede entregarse inmediatamente, WhatsApp puede retenerlo en sus servidores hasta 30 días, y puede conservar el contenido por más tiempo en ciertas circunstancias.

La información del dispositivo y la conexión recopilada incluye modelo de hardware, sistema operativo, nivel de batería, intensidad de señal, versión de la aplicación, información del navegador, red móvil, ISP, idioma, zona horaria, dirección IP y varios identificadores del dispositivo. La información de ubicación también se recopila mediante IP, GPS, señales Bluetooth, puntos de acceso Wi-Fi cercanos, balizas y torres de telefonía móvil.

WhatsApp recibe información sobre los usuarios de otras personas y empresas. Cuando un usuario se comunica con una cuenta empresarial, esa empresa puede utilizar una empresa externa para almacenar, leer y responder a los mensajes en su nombre. WhatsApp también trabaja con proveedores de servicios externos y otras empresas de Facebook, compartiendo datos dentro de ese ecosistema corporativo.

La política se reserva el derecho de recopilar, usar, conservar y compartir información del usuario siempre que WhatsApp tenga una "creencia de buena fe" de que hacerlo es "razonablemente necesario" — un estándar que deja una amplia discreción a la plataforma.

## Conclusiones clave

Tanto Telegram como WhatsApp recopilan metadatos significativos y conservan distintos grados de acceso a las comunicaciones de los usuarios. Los chats en la nube de Telegram no están cifrados de extremo a extremo por defecto y están sujetos a revisiones tanto automatizadas como manuales. WhatsApp, integrado en el ecosistema corporativo de Meta, recopila datos extensos sobre dispositivos, ubicación y contactos. Ninguna plataforma ha publicado el código fuente completo del lado del servidor necesario para verificar independientemente sus afirmaciones de seguridad y privacidad. Los usuarios preocupados por la soberanía de sus datos deben revisar las fuentes originales — [la política de privacidad de Telegram](https://telegram.org/privacy) y [la política de privacidad de WhatsApp](https://www.whatsapp.com/legal/?lang=en#privacy-policy) — y considerar alternativas de código abierto con arquitecturas verificables.

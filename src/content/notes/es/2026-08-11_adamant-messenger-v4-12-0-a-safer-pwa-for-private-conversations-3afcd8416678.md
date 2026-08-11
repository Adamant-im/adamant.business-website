---
title: "ADAMANT Messenger v4.12.0: una PWA más segura para conversaciones privadas"
slug: "adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
description: "ADAMANT Messenger v4.12.0 es una actualización de seguridad coordinada para el mensajero descentralizado, la billetera y la experiencia PWA. Actualice de inmediato."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
publishedAt: "2026-08-11T00:19:47.725Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:3afcd8416678"
coverImage: "/images/engineering-notes/medium/3afcd8416678/001-e1683c8738.webp"
locale: "es"
placeholder: false
---

ADAMANT Messenger v4.12.0 es una actualización de seguridad coordinada para el mensajero descentralizado, la billetera y la experiencia PWA. Los usuarios en navegadores, dispositivos móviles, Tor o escritorio deben actualizar de inmediato para beneficiarse de las protecciones reforzadas en torno a los datos confidenciales.

La PWA renovada mantiene la interfaz familiar para la creación de cuentas anónimas, la gestión de chats y los controles de billetera multiactivos. Como siempre, no se requiere número de teléfono, dirección de correo electrónico ni operador central. La frase de contraseña del usuario sigue siendo la única clave para acceder a una dirección anónima y a una billetera de autocustodia.

Detrás de la interfaz, la versión v4.12.0 cierra rutas de XSS almacenado confirmadas, elimina la renderización heredada v-html y refuerza Markdown con SafeHtml. También verifica las claves públicas proporcionadas por el nodo frente a las direcciones que dicen representar, un límite importante cuando una aplicación descentralizada interactúa con la infraestructura pública. El almacenamiento local de secretos y el flujo de derivación de claves de contraseña se han actualizado con scrypt versionado, mientras que los asistentes criptográficos se trasladan al ecosistema moderno @noble y @scure. La cobertura estricta de la Política de Seguridad de Contenido (CSP) ahora abarca las versiones PWA, Tor, testnet, Android y Electron.

La versión también mejora la fiabilidad del sistema. Los indexadores de monedas con retraso ya no se consideran nodos saludables y las comprobaciones de versión de nodo ahora utilizan un control de versiones semántico real. Además, los mensajes de señal AIP-6 se mantienen fuera del historial de chat visible. Para los usuarios de Android, se han reforzado los límites de copia de seguridad y extracción de datos, lo que resulta en menos suposiciones ocultas y una ruta más segura desde el inicio de sesión hasta la entrega de mensajes.

![ADAMANT Messenger v4.12.0: una PWA más segura para conversaciones privadas](/images/engineering-notes/medium/3afcd8416678/002-419a41b893.webp)

![ADAMANT Messenger v4.12.0: una PWA más segura para conversaciones privadas](/images/engineering-notes/medium/3afcd8416678/003-dc272cf2f1.webp)

![ADAMANT Messenger v4.12.0: una PWA más segura para conversaciones privadas](/images/engineering-notes/medium/3afcd8416678/004-c1c599fad0.webp)

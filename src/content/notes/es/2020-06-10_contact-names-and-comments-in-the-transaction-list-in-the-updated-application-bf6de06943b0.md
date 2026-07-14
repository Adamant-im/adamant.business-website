---
title: "Nombres de contactos y comentarios en la lista de transacciones: en la aplicación actualizada"
slug: "contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
description: "La actualización v2.6.0 del messenger web de ADAMANT mejora la lista de transacciones con comentarios visibles, nombres de contactos y acceso rápido a chats."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
publishedAt: "2020-06-10T06:44:48.139Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/bf6de06943b0/001-0-q5zuwj-pur7a9hdb.webp"
cardSpan: "full"
originalId: "medium:bf6de06943b0"
locale: "es"
placeholder: false
---

La actualización v2.6.0 del messenger web de ADAMANT hace que la lista de transacciones sea más informativa. Los comentarios de las transferencias ahora son visibles directamente en la lista, los nombres de los contactos se muestran junto a las direcciones, y cada entrada incluye un acceso directo para abrir el chat correspondiente. Las vistas detalladas de transacciones también se han actualizado para mostrar comentarios y nombres de contactos, y la dirección del propio usuario se etiqueta como "Yo" para mayor claridad. En transacciones que involucran otras criptomonedas, las direcciones ADM y los nombres de contactos aparecen en la lista, con el mismo acceso rápido al chat disponible.

![Nombres de contactos y comentarios en la lista de transacciones — En la aplicación actualizada](/images/engineering-notes/medium/bf6de06943b0/002-0-nu76kd5rli905hye.webp)

La configuración de persistencia de inicio de sesión se ha aclarado: el comportamiento anterior de "cerrar sesión al cerrar la pestaña" se reemplaza por una opción más clara: "Permanecer conectado". El modo oscuro es ahora el tema predeterminado. En cuanto a seguridad, los enlaces en los mensajes y el enlace a la documentación de contraseñas de usuario se abren en ventanas nuevas con `noopener` para prevenir el secuestro de pestañas. Las notificaciones push también se han corregido en esta versión.

El registro de cambios completo está disponible en la [página de lanzamientos de ADAMANT en GitHub](https://github.com/Adamant-im/adamant-im/releases/tag/v2.6.0).

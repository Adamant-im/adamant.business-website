---
title: "El agujero de anonimato de Telegram: Cómo obtener el número de teléfono de cualquier usuario"
slug: "telegram-s-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
description: "Telegram requiere un número de teléfono para chatear, lo que expone la identidad del usuario y crea riesgos graves de privacidad. Un fallo permite revelar números fácilmente."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/telegrams-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
publishedAt: "2019-09-02T08:18:08.034Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/88062b4fb94b/001-0-mhckpcqqduw4kpcb.webp"
cardSpan: "full"
originalId: "medium:88062b4fb94b"
locale: "es"
placeholder: false
---

Telegram requiere un número de teléfono para comenzar a enviar mensajes, vinculando todos los mensajes a la identidad del usuario. Este mecanismo no solo es obsoleto, sino que también introduce riesgos significativos para la privacidad. Una de estas vulnerabilidades permite a cualquiera obtener el número de teléfono de un usuario en un grupo de Telegram aprovechando la función de sincronización de contactos de la aplicación.

Para demostrarlo, consideremos un chat grupal abierto donde un usuario objetivo, "Sergey Lebedev", es visible.

![El agujero de anonimía de Telegram: Cómo obtener el número de teléfono de cualquier usuario](/images/engineering-notes/medium/88062b4fb94b/002-0-fcieyaa3mo5op3nv.webp)

Al salir de la aplicación y agregar un nuevo contacto a la libreta de contactos nativa del dispositivo con un número de teléfono supuesto, podemos probar si ese número pertenece a un usuario de Telegram.

![El agujero de anonimía de Telegram: Cómo obtener el número de teléfono de cualquier usuario](/images/engineering-notes/medium/88062b4fb94b/003-0-usc809xtvbg9yqgn.webp)

A continuación, asegúrese de que la sincronización de contactos esté habilitada en los ajustes de privacidad de Telegram (Ajustes — Privacidad y Seguridad). Esta función agrega automáticamente los contactos del dispositivo a la aplicación si están registrados en Telegram.

![El agujero de anonimía de Telegram: Cómo obtener el número de teléfono de cualquier usuario](/images/engineering-notes/medium/88062b4fb94b/004-0-bpxhl6k-bs5uhotz.webp)

Si el número de teléfono supuesto está registrado en Telegram, la aplicación agregará al usuario a su lista de contactos. En este ejemplo, el número supuesto era correcto.

![El agujero de anonimía de Telegram: Cómo obtener el número de teléfono de cualquier usuario](/images/engineering-notes/medium/88062b4fb94b/005-0-ajrqdbdxby-cjw0f.webp)

Telegram luego sobrescribirá el nombre mostrado del usuario con el nombre asignado en la libreta de contactos del dispositivo. Al regresar al chat grupal original, "Sergey Lebedev" ahora se muestra como "Testing Phone ID", confirmando que el número de teléfono supuesto le pertenece.

![El agujero de anonimía de Telegram: Cómo obtener el número de teléfono de cualquier usuario](/images/engineering-notes/medium/88062b4fb94b/006-0-qbjxtb52xz7x-fzs.webp)

Aunque adivinar un número de teléfono entre millones parece poco práctico, los atacantes pueden reducir significativamente el rango utilizando ingeniería social para determinar el país y operador del objetivo. Además, una aplicación móvil sencilla podría automatizar la adición de grandes rangos de números de teléfono a la agenda del dispositivo, haciendo factible el descubrimiento por fuerza bruta. Esta vulnerabilidad representa una amenaza grave para la privacidad del usuario, especialmente para figuras públicas, inversores y activistas. Las aplicaciones que exigen el registro con número de teléfono a menudo conllevan compromisos ocultos de privacidad.

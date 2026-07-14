---
title: "Posición de desplazamiento en el chat y separador de mensajes nuevos"
slug: "discussion-24-in-chat-scroll-position-and-new-messages-separator-8935997"
description: "Este documento describe cómo debe comportarse la posición de desplazamiento en los chats de ADAMANT al entrar o interactuar con un chat."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/24"
publishedAt: "2025-09-23T07:35:30Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8935997"
locale: "es"
placeholder: false
---

Este documento describe cómo debe comportarse la posición de desplazamiento en los chats de ADAMANT cuando un usuario entra o interactúa con un chat.

## Dos estados de desplazamiento

La posición de desplazamiento se almacena por separado para cada chat. Un chat se encuentra o bien en un estado en el que no se ha guardado ninguna posición, o bien en un estado en el que se ha guardado una posición porque el usuario se desplazó manualmente y guardó la posición de desplazamiento.

## Mostrar el botón Desplazar al final

El botón **Desplazar al final** debe aparecer cuando el último mensaje de una sola línea esté oculto aproximadamente en tres cuartas partes de la pantalla.

![Captura de pantalla de la discusión 1](/images/engineering-notes/github/discussions/8935997/001-d6f70e7f.webp)

Cuando el usuario pulsa el botón, la acción depende de si existen mensajes nuevos. Si hay mensajes nuevos —indicados por un contador mostrado cerca del botón—, la vista se desplaza hasta el separador **Mensajes nuevos**. Si no hay mensajes nuevos, o el usuario ya está en o por debajo del separador, la vista se desplaza hasta el fondo.

Al desplazarse al separador de Mensajes nuevos, el separador debe posicionarse con aproximadamente tres líneas de mensajes por encima. En este caso, no se deben activar sonido, vibración ni resaltado de mensajes.

El separador nunca debe aparecer antes del primer mensaje en un chat. Por ejemplo, si un usuario recibe diez mensajes de un contacto nuevo, el chat se desplaza hasta el primer mensaje, pero no se muestra ningún separador.

## Guardar la posición de desplazamiento

La posición de desplazamiento solo debe guardarse cuando el usuario no esté en la parte inferior del chat. Una posición dentro de unos pocos píxeles del fondo se considera "en la parte inferior" y no debe guardarse. Como regla general, si el botón **Desplazar al final** es visible, la posición debe guardarse.

![Captura de pantalla de la discusión 2](/images/engineering-notes/github/discussions/8935997/002-60f2788b.webp)

![Captura de pantalla de la discusión 3](/images/engineering-notes/github/discussions/8935997/003-4e8be668.webp)

![Captura de pantalla de la discusión 4](/images/engineering-notes/github/discussions/8935997/004-70d36182.webp)

Si la longitud del chat es inferior a la altura de la pantalla —por ejemplo, unos pocos mensajes cortos—, siempre se considera que está en la parte inferior: el botón se oculta y la posición de desplazamiento no se guarda.

## Restaurar la posición de desplazamiento

Hay tres eventos que gestionar. Primero, el usuario está dentro de un chat cuando llega un mensaje nuevo. Segundo, el usuario abre un chat que tiene mensajes nuevos desde la lista de chats o desde otra pantalla, como **Ir al chat** desde **Lista de transacciones → Detalles de la transacción**. Tercero, el usuario abre un chat desde una notificación de mensaje nuevo, ya sea dentro de la aplicación o mediante notificación push.

Cuando el usuario está dentro de un chat y llega un mensaje nuevo, el comportamiento depende de si se ha guardado una posición de desplazamiento. Si no se ha almacenado ninguna posición, el chat siempre se desplaza hasta el fondo con cada mensaje entrante o saliente nuevo, y no se muestra ningún separador. Si se ha guardado una posición, un mensaje entrante no desencadena el desplazamiento; en su lugar, se actualiza el contador del botón y se muestra el separador, que el usuario puede revelar pulsando el botón o desplazándose manualmente. Un mensaje saliente, sin embargo, siempre se desplaza hasta el fondo, independientemente de la posición guardada.

Cuando un usuario entra en un chat que tiene mensajes nuevos desde la lista de chats o desde otra pantalla, y no se ha guardado ninguna posición, el chat va al separador de **Mensajes nuevos**. Si se ha guardado una posición, el chat no se desplaza; se actualiza el contador del botón y se muestra el separador, que el usuario verá al pulsar el botón **Desplazar al final** o al desplazarse manualmente.

Cuando un usuario entra en un chat desde una notificación de mensaje nuevo, el chat va al separador de **Mensajes nuevos** independientemente de si se ha guardado una posición. Incluso si se recibieron varios mensajes, la vista no debe saltar al más reciente.

Estas reglas garantizan un comportamiento coherente y predecible para el desplazamiento, los separadores y la restauración de la posición en todos los puntos de entrada del chat en ADAMANT.

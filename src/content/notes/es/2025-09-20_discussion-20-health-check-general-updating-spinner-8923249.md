---
title: "Control de salud: Indicador de actualización general"
slug: "discussion-20-health-check-general-updating-spinner-8923249"
description: "La ausencia de un indicador de carga en el encabezado de ADAMANT garantiza que el usuario vea la lista más reciente de chats y mensajes. El indicador debe mostrarse si no hay conexión a internet, nodos ADM activos o nodos habilitados."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/20"
publishedAt: "2025-09-20T16:33:48Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923249"
locale: "es"
placeholder: false
---

![Captura de pantalla de la discusión 1](/images/engineering-notes/github/discussions/8923249/001-fda0855b.webp)

La ausencia de un indicador de carga en el encabezado de ADAMANT garantiza que el usuario esté viendo la lista más reciente de chats y mensajes. El indicador debe mostrarse si no hay conexión a internet, no hay nodos ADM activos o no hay nodos ADM habilitados.

Cuando existe una conexión y hay nodos activos, el sistema realiza comprobaciones adicionales. Al recibir mensajes nuevos —es decir, cuando no existen otros más recientes—, se guarda una marca de tiempo `chatActualUntil` en el almacenamiento.

```javascript
const chatsActualUntil = adamant.toTimestamp(nodeTimestamp) + INTERVAL + CHAT_ACTUALITY_BUFFER_MS
```

El valor de `INTERVAL` representa el intervalo de sondeo para chats nuevos mediante REST, que varía según si hay disponible una conexión por socket.

```javascript
INTERVAL: (state, getters, rootState) => {
  return rootState.options.useSocketConnection ? SOCKET_ENABLED_TIMEOUT : SOCKET_DISABLED_TIMEOUT
},
```

Las pantallas de Chat y Lista de Chats observan el valor de `chatActualUntil` y se suscriben al *hook* `chatActual = chatActualUntil > currentTime`. Este *hook* se ejecuta cada 500 milisegundos para activar el indicador de carga, incluso si `chatActualUntil` no ha cambiado por falta de mensajes nuevos. En definitiva, el indicador se muestra si no hay conexión a internet, no hay nodos en línea o si `!chatActual` se evalúa como verdadero.

Cuando la aplicación se restaura desde segundo plano, no se requieren ajustes adicionales porque sigue dependiendo de `chatActualUntil`. Si la hora del dispositivo supera la marca de tiempo de validez del chat, el usuario verá el indicador. En el peor de los casos, si se pierde la conexión, el usuario podría no ver el indicador y creer erróneamente que todo está actualizado durante un máximo de `INTERVAL + CHAT_ACTUALITY_BUFFER_MS` segundos.

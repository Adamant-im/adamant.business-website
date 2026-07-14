---
title: "Recuperación de pares de nodo ADAMANT tras una interrupción de red: semillas, descubrimiento y selección de sincronización"
slug: "discussion-63-node-peer-recovery-after-network-outage-seeds-discovery-and-sync-selection-10403079"
description: "Los nodos ADAMANT mantienen conectividad mediante tres mecanismos que pueden confundirse tras una caída de red. Esta nota explica su interacción y recuperación."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/63"
publishedAt: "2026-07-10T05:24:55Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10403079"
locale: "es"
placeholder: false
---

Los nodos ADAMANT mantienen la conectividad entre pares mediante tres mecanismos separados que pueden confundirse fácilmente al leer los registros de consola tras una interrupción de red. Esta nota explica cómo interactúan, por qué la sincronización puede detenerse incluso cuando aún se contacta con pares semilla, y qué deben esperar los operadores durante la recuperación.

## Antecedentes

Un nodo mantiene una tabla de pares en memoria, poblada desde tres fuentes: pares semilla listados en la configuración `peers.list`, pares persistentes cargados desde la base de datos al iniciar, y pares descubiertos devueltos por otros nodos mediante `GET /peer/list`. Los pares semilla están congelados: nunca se eliminan de la tabla, incluso cuando las solicitudes fallan.

Cada par tiene un estado: `BANNED` (0, excluido del uso normal), `DISCONNECTED` (1, conocido pero actualmente no utilizable para sincronización o difusión), o `CONNECTED` (2, respondió recientemente con éxito y es elegible para sincronización). Cuando fallan solicitudes, la tasa de éxito de un par disminuye. Cuando un par previamente `CONNECTED` cae por debajo del 80% de éxito, su estado decae a `DISCONNECTED`. Los tiempos de espera de red (`ECONNABORTED`) no eliminan el par; solo reducen su tasa de éxito.

## Tres mecanismos paralelos

**Ping de semilla (silencioso).** Al iniciar y cada ~5 segundos, el nodo hace ping a cada par semilla de la configuración mediante `GET /peer/height`. Los fallos se registran a nivel *trace* y generalmente no son visibles en la salida predeterminada de la consola. Un ping exitoso promueve al par nuevamente a `CONNECTED`.

**Descubrimiento de pares (ruidoso).** Cada ~5 segundos, el nodo elige aleatoriamente un par de la memoria (estados `DISCONNECTED` o `CONNECTED`) y solicita `GET /peer/list` para conocer nuevas direcciones. Si esta selección aleatoria única falla por tiempo de espera, la consola muestra:

```text
Discovering new peers failed. ECONNABORTED Request failed GET http://<peer>/peer/list
```

Este error menciona solo al par seleccionado aleatoriamente, no a toda la tabla de pares. Durante la recuperación, a menudo aparecen nodos alojados en la nube poco conocidos que fueron descubiertos anteriormente y guardados en la base de datos. Eso no significa que el nodo ignore los pares semilla.

**Sincronización de blockchain (estricta).** La ruta de carga de sincronización utiliza `peers.list()` con el filtro predeterminado: solo pares `CONNECTED`. Si ningún par está actualmente `CONNECTED` con una altura utilizable, la sincronización finaliza con:

```text
Failed to find enough good peers
```

En esa situación, el nodo no está desconectado de la red en el sentido de no tener registros de pares. Simplemente tiene cero pares activos adecuados para descargar bloques.

## Cronología típica de una interrupción

Cuando ocurre una pérdida de red, las solicitudes HTTP a todos los pares comienzan a fallar. Los pares previamente `CONNECTED` pasan a `DISCONNECTED`, y el cargador no puede seleccionar pares buenos, por lo que la altura deja de avanzar. Los errores de descubrimiento continúan contra entradas obsoletas aleatorias mientras los pings de semilla se ejecutan silenciosamente en segundo plano. Una vez que al menos un par semilla u otro par conocido responde nuevamente a un ping, vuelve a `CONNECTED` y la sincronización se reanuda.

El intervalo entre "la conexión a internet se restablece" y "el nodo vuelve a sincronizar" puede ser de varios minutos —o más si los pares remotos aún no son alcanzables— porque la recuperación depende de una comunicación bidireccional exitosa con un par que pase a `CONNECTED`, no simplemente de la conectividad local.

## Expectativas del operador

Ver errores de descubrimiento contra direcciones desconocidas tras una interrupción es normal y no indica por sí solo una mala configuración. Los pares semilla de la configuración siguen siendo contactados; simplemente sus fallos de ping no son prominentes en los registros predeterminados. El mensaje `Failed to find enough good peers` significa que no hay pares activos actualmente, no que la tabla de pares haya sido borrada. Reiniciar el nodo recarga los pares semilla y los de la base de datos, pero la recuperación aún requiere que al menos un par remoto responda.

## Mejoras posibles

Varios cambios podrían mejorar la experiencia del operador: registrar fallos de ping de semilla como `warn` cuando no queden pares `CONNECTED` durante más de un período umbral, priorizar pares semilla o pares que hayan funcionado recientemente en `getFromRandomPeer` en lugar de una selección aleatoria uniforme, reintentar todos los pares semilla en paralelo cuando la sincronización informe `Failed to find enough good peers`, y reducir líneas de advertencia duplicadas cuando `async.retry` agote todos los intentos de sincronización.

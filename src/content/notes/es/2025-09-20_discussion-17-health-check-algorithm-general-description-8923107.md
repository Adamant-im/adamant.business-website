---
title: "Algoritmo de verificación de estado para nodos y servicios de ADAMANT"
slug: "discussion-17-health-check-algorithm-general-description-8923107"
description: "El algoritmo de verificación busca hacer de ADAMANT la billetera cripto más confiable. Se aplica a todos los nodos, incluyendo ADM y nodos de monedas, así como servicios como el servicio de información e IPFS."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/17"
publishedAt: "2025-09-20T15:11:05Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923107"
locale: "es"
placeholder: false
---

El algoritmo de verificación de estado busca hacer de ADAMANT la billetera cripto más confiable. Se aplica a todos los nodos, incluyendo nodos ADM y de monedas, así como servicios como `info-service` e IPFS. El algoritmo evalúa la altura del nodo, la versión mínima soportada y utiliza el punto final más informativo disponible, como `/api/node/status` para ADM. Omite los nodos desactivados por el usuario y almacena la lista de nodos localmente, independientemente de la configuración "Permanecer conectado".

Los estados de los nodos incluyen Desactivado por el usuario, No soportado (por versión o nodo HTTP a través de PWA-HTTPS) e Indisponible. Si un nodo está indisponible, el algoritmo verifica primero el dominio y luego un `alt_ip` si el dominio falla. Una vez que el dominio está disponible, el `alt_ip` nunca se vuelve a verificar para evitar solicitudes adicionales. Si ambos están indisponibles, el algoritmo reintenta en la siguiente solicitud.

La detección de nodos disponibles y sincronizados depende de umbrales de altura de nodo (`HEIGHT_EPSILON`). El único nodo que responde se marca como Disponible. Un grupo de nodos dentro del umbral se considera Activo, mientras que los nodos fuera del umbral están Sincronizados (o "tramposos"). Los umbrales varían según la moneda: ADM es 10, BTC es 2, ETH es 5, DOGE es 3, DASH es 3 y LSK es 5. Por ejemplo, los nodos BTC en 815.000 y 815.001 están ambos activos, pero un nodo en 815.010 estaría sincronizado.

Durante la verificación inicial o después de una desconexión, la primera respuesta de un nodo podría marcarse como Activo en lugar de Sincronizado. Esperar una verificación completa de 10 segundos congelaría la aplicación. Para resolver esto, los estados se actualizan a Activo o Sincronizado solo después de que el 30% de los nodos respondan; de lo contrario, se mantienen los estados anteriores. Esto se marca como una verificación inicial. En verificaciones posteriores, los estados se actualizan solo después de que el 100% de los nodos respondan, para evitar que nodos pendientes con datos antiguos se marquen erróneamente como Sincronizados.

Para evitar confundir a los usuarios, se muestra un estado visual "Actualizando..." durante una verificación inicial en curso para nodos con estado Indefinido o Indisponible. Aparece como un punto gris con texto atenuado.

![Captura de pantalla de la discusión 1](/images/engineering-notes/github/discussions/8923107/001-bfb8d9fa.webp)

Cada solicitud de verificación de estado mide el Ping, y el nodo con el menor ping es el más rápido. La configuración "Preferir nodo más rápido" por defecto es No para ADM y Sí para nodos de monedas, operando por separado para nodos de monedas e indexadores.

Las verificaciones de estado se ejecutan independientemente del estado de conexión a internet, ya que el estado de "Sin conexión a internet" reportado por el sistema operativo no es confiable. Si no hay conexión, el resultado simplemente será que no hay nodos disponibles. Los estados `hasEnabledNodes` y `hasAvailableNodes` se actualizan cuando al menos tres nodos responden o cuando una verificación finaliza, mejorando la experiencia de inicio al evitar congelamientos de 10 segundos. Se evitan verificaciones superpuestas; un error previo que usaba `setInterval()` en lugar de `setTimeout()` causaba una avalancha de solicitudes al restaurar la aplicación desde segundo plano.

Las verificaciones de estado se activan al iniciar la aplicación, al restablecer la conexión, al abrir la pantalla de nodos o al actualizar las listas de nodos. Los intervalos regulares (`normalUpdateInterval`) varían según el tipo de nodo, desde 3 hasta 8 minutos. Si todos los nodos activos fallan, se realiza una verificación adicional.

Al enviar solicitudes HTTP, el algoritmo ignora el estado "Sin conexión a internet" y no espera una verificación completa. Elige el nodo más rápido o uno activo al azar. Si una solicitud falla por tiempo de espera, intenta con el siguiente nodo y marca el fallido como Indisponible. Errores HTTP como 404 no se consideran fallos. Las solicitudes pendientes siempre se completan tras restablecer la conexión, asegurando que operaciones como guardar una lista de contactos no se interrumpan.

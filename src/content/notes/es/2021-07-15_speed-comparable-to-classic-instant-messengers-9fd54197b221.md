---
title: "Alcanzando velocidades de mensajería instantánea en ADAMANT"
slug: "speed-comparable-to-classic-instant-messengers-9fd54197b221"
description: "ADAMANT mejora la velocidad de mensajes mediante conexiones socket y propagación rápida de transacciones no confirmadas, logrando tiempos de 0 a 2 segundos."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/speed-comparable-to-classic-instant-messengers-9fd54197b221"
publishedAt: "2021-07-15T11:15:24.341Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9fd54197b221/001-0-nrvhmelzkoggifv.webp"
cardSpan: "full"
originalId: "medium:9fd54197b221"
locale: "es"
placeholder: false
---

Los mensajeros basados en blockchain intercambian inherentemente velocidad por seguridad y anonimato, ya que la entrega de mensajes suele estar limitada por la frecuencia de generación de bloques. ADAMANT ha abordado esta limitación, reduciendo los tiempos de entrega de mensajes entre 0 y 2 segundos.

Esta mejora de rendimiento se logró mediante dos optimizaciones principales. En primer lugar, ADAMANT implementó conexiones socket entre cliente y nodo para facilitar velocidades de comunicación punto a punto. Posteriormente, las configuraciones de los nodos se actualizaron para intercambiar transacciones más rápidamente, con un enfoque específico en la propagación de transacciones no confirmadas a través de la red. Como resultado, los usuarios conectados a diferentes nodos de la red ahora reciben mensajes casi instantáneamente, acercando la experiencia de comunicación a la de mensajeros instantáneos centralizados clásicos.

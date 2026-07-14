---
title: "Actualización de ADAMANT Node v0.6.0"
slug: "adamant-node-v-0-6-0-update-688bbdb30e19"
description: "Un mensajero descentralizado depende del sistema blockchain y las aplicaciones cliente. Los nodos de la red mantienen la blockchain y sirven datos a las aplicaciones."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v-0-6-0-update-688bbdb30e19"
publishedAt: "2020-02-17T09:23:50.372Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/688bbdb30e19/001-1-fmo2vlyn2yehfv84inqtmq-png.webp"
cardSpan: "full"
originalId: "medium:688bbdb30e19"
locale: "es"
placeholder: false
---

Un mensajero descentralizado depende de dos componentes: el sistema blockchain y las aplicaciones cliente. La blockchain es mantenida por nodos de red que proveen datos a las aplicaciones y procesan solicitudes entrantes. ADAMANT ha lanzado la versión 0.6.0 del software del nodo, disponible en la página de lanzamientos del proyecto en GitHub.

Esta versión mejora las conexiones de socket y la API de transacciones. Las conexiones de socket ahora devuelven `recipientPublicKey`, y los puntos finales de la API de transacciones —incluyendo KVS y Chats— ahora incluyen un campo `block_timestamp` en sus respuestas. El punto final `/states/get/` ha sido ampliado para soportar los parámetros `SenderIds` y `keyIds`, así como solicitudes POST. La versión también incluye una corrección para las migraciones y un conjunto actualizado de documentación.

La actualización no es obligatoria para todos los operadores de nodos. Sin embargo, los nodos que necesiten conectarse con aplicaciones de mensajería deben actualizarse a la última versión.

---
title: "AIP-17: Reacciones a Mensajes en la Blockchain con ADAMANT Messenger"
slug: "unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
description: "La Propuesta de Mejora ADAMANT 17 (AIP 17) introduce reacciones con emoji en ADAMANT Messenger, una función inédita en aplicaciones de mensajería blockchain."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
publishedAt: "2023-09-15T10:09:07.924Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/857b07759524/001-0-tn1uulgukvtmgwym.webp"
cardSpan: "full"
originalId: "medium:857b07759524"
locale: "es"
placeholder: false
---

La Propuesta de Mejora ADAMANT 17 (AIP-17) introduce reacciones basadas en emoji a los mensajes en ADAMANT Messenger, una función que no estaba disponible previamente en ninguna aplicación de mensajería blockchain. La propuesta define una estructura estandarizada para las reacciones que se integra con la infraestructura de mensajes existente.

## Cómo Funciona

Las reacciones se transmiten como mensajes ricos ADM, siguiendo las convenciones establecidas en la AIP-5 (Mensajes de Contenido Enriquecido). Un nuevo campo obligatorio, `reactto_id`, identifica el ID de transacción del mensaje al que se responde. Un segundo campo, `react_message`, contiene el emoji elegido por el usuario. Las reacciones pueden editarse o eliminarse después de su creación.

Una carga útil de reacción tiene este aspecto:

```json
{
  "reactto_id": "Transaction_ID",
  "react_message": "👍"
}
```

Dado que cada reacción es en sí misma una transacción en la cadena que hace referencia a otra transacción por su ID, este enfoque preserva el modelo existente de auditabilidad y descentralización de ADAMANT, añadiendo al mismo tiempo una capa expresiva ligera sobre los mensajes de chat estándar.

Se espera que la implementación llegue a las aplicaciones ADAMANT en todas las plataformas. La discusión técnica y la propuesta completa están disponibles en la [página de la propuesta AIP-17](https://github.com/Adamant-im/AIPs/issues/52).

![AIP-17: Reacciones a Mensajes en la Blockchain con ADAMANT Messenger](/images/engineering-notes/medium/857b07759524/002-1-zslip-kei08fk54o3-u34q-png.webp)

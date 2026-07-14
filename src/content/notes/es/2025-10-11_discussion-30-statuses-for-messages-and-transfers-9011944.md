---
title: "Estados para mensajes y transferencias en ADAMANT"
slug: "discussion-30-statuses-for-messages-and-transfers-9011944"
description: "ADAMANT distingue entre estados de entrega de mensajes y estados de transferencia de criptomonedas. Los mensajes se rastrean en la blockchain de ADAMANT, mientras que las transferencias se verifican en la blockchain nativa de cada token."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/30"
publishedAt: "2025-10-11T18:08:05Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9011944"
locale: "es"
placeholder: false
---

ADAMANT distingue entre estados de entrega de mensajes y estados de transferencia de criptomonedas. Los mensajes se rastrean dentro de la blockchain de ADAMANT, mientras que las transferencias se verifican contra la blockchain nativa de cada token. Un principio fundamental de privacidad: ADAMANT nunca implementará un estado de "leído" para los mensajes, ya que eso revelaría la actividad del destinatario.

## Estados de mensajes

Los mensajes entrantes siempre se consideran entregados porque se leen directamente desde la blockchain, por lo que no se muestra ningún estado para ellos. Los mensajes salientes avanzan a través de tres etapas: **Enviando** (pendiente), **Entregado al nodo** (el nodo aceptó la transacción) y **En la blockchain** (una confirmación adicional una vez conocido el bloque). La transición de Enviando a Entregado debe ocurrir rápidamente para una experiencia de interfaz fluida. Los estados se actualizan tanto en la lista de chats como dentro de los chats individuales.

Cuando los sockets están habilitados, devuelven transacciones no confirmadas tan pronto como llegan al nodo. En ese momento, campos como `block_timestamp`, `height`, `blockId` y `confirmations` son `null`. Los sockets duplican las respuestas de la API REST: los mensajes llegan instantáneamente vía socket, mientras que REST proporciona actualizaciones cada ~10 segundos (`SOCKET_ENABLED_TIMEOUT`) como respaldo de fiabilidad. ADAMANT deliberadamente no utiliza un estado "Entregado al destinatario" porque contradice la filosofía de privacidad y es técnicamente poco fiable cuando el destinatario está desconectado.

Si falla la entrega al nodo o la blockchain rechaza la transacción, el mensaje se marca como **No enviado**.

## Estados de transferencia de criptomonedas

Para todas las transferencias de criptomonedas, ADAMANT muestra el estado de la transacción en la blockchain propia del token. Esto aplica tanto a transferencias entrantes como salientes. El flujo de trabajo es: `Pendiente → Registrado → Éxito / Fallido / Inconsistente`.

Una transferencia comienza como **Pendiente** (enviando o verificando). Una vez que un nodo confirma que la transacción existe, pasa a **Registrado**. ADAMANT continúa entonces verificando hasta alcanzar un estado final: **Éxito** (confirmado en la red), **Fallido** (rechazado por la red) o **Inconsistente** (detectado un desajuste). Las reglas de verificación de transacciones por moneda se definen en el repositorio [`adamant-wallets`](https://github.com/Adamant-im/adamant-wallets/#info-for-updating-in-chat-coin-transfer-tx-statuses) bajo `txFetchInfo`. La especificación está documentada en [AIP-12](https://aips.adamant.im/AIPS/aip-12).

Para transferencias de ADM específicamente, el estado viene directamente con la transacción: si `confirmations > 0`, la transferencia se marca como Éxito; si `confirmations = 0`, permanece Pendiente o Registrado.

### Mecanismo de verificación de estado en segundo plano

Para blockchains no ADM, las verificaciones de estado requieren solicitudes adicionales a nodos o APIs. ADAMANT utiliza un mecanismo en segundo plano que solo verifica transacciones visibles para el usuario y se detiene una vez recibido un estado final. La frecuencia de verificación depende de la antigüedad de la transacción (Nueva vs. Antigua), y el sistema limita los intentos para transacciones Pendientes mientras permite intentos ilimitados para las Registradas. Las verificaciones solo se ejecutan cuando hay conexión de red y están disponibles los nodos de la moneda relevante, evitando intentos inútiles sin conexión.

Una transacción se clasifica como **Nueva** si acaba de ser difundida desde la aplicación, o si su marca de tiempo está dentro de un umbral de *X* minutos respecto al momento actual. De lo contrario, es **Antigua**. El umbral puede ser una constante estática o calculada por moneda:

```js
const isNew = (admTransferTimestamp) =>
  Date.now() - admTransferTimestamp < newPendingTxFetchAttempts * newPendingTxFetchInterval;
```

Esta distinción asegura que las transacciones más recientes se verifiquen con mayor frecuencia, mientras que las más antiguas se verifican con menor intensidad.

### Ejemplo: Transferencia de Bitcoin

Constantes de `adamant-wallets`:

```jsonc
"txFetchInfo": {
    "newPendingInterval": 10000,
    "oldPendingInterval": 3000,
    "registeredInterval": 40000,
    "newPendingAttempts": 20,
    "oldPendingAttempts": 3
}
```

Para una transacción **Pendiente Nueva**, la aplicación verifica cada 10 segundos (`newPendingInterval`) hasta un máximo de 20 intentos (`newPendingAttempts`), dando una ventana total de ~200 segundos. Si el nodo detecta la transacción (incluso con 0 confirmaciones), pasa a **Registrado**. Si sigue sin detectarse tras todos los intentos, se marca como **Fallido**.

Para transacciones **Registradas**, la aplicación verifica cada 40 segundos (`registeredInterval`) con intentos ilimitados hasta que la transacción esté confirmada (≥1 confirmación) o el nodo devuelva un error.

Los usuarios pueden volver a verificar manualmente una transacción tocando su ícono de estado en el chat, lo que la restablece a Pendiente y activa un nuevo ciclo de verificación. Los estados de transacción no se almacenan localmente; al iniciar sesión con contraseña, PIN o huella digital, se vuelven a verificar desde cero.

## Detección de inconsistencias

Una transferencia se marca como **Inconsistente** cuando los datos registrados en el mensaje de ADAMANT no coinciden con los datos recuperados de la blockchain del token. Se marca una discrepancia si se cumple alguna de las siguientes condiciones: el monto difiere en más de ~0,1–0,5 %, la dirección del remitente difiere, la dirección del destinatario difiere, o la marca de tiempo del mensaje y la de la transacción en la blockchain difieren en más de 3 horas.

Existen dos casos especiales adicionales. Si la moneda no es compatible (por ejemplo, `xrp_transaction`), la aplicación no puede verificar la transferencia y muestra un mensaje indicando que la criptomoneda no es compatible. Si se detecta un hash de transacción duplicado —es decir, el mismo hash de TX ya apareció en una transacción cargada—, la transferencia se marca como Inconsistente para evitar que una única transacción en cadena se cuente múltiples veces en el chat.

Las razones de inconsistencia se priorizan de la siguiente manera: hash de transacción incorrecto, transacción duplicada, discrepancia en dirección del remitente, discrepancia en dirección del destinatario, monto incorrecto, imposibilidad de recuperar dirección del remitente, imposibilidad de recuperar dirección del destinatario, diferencia significativa en marca de tiempo y fallo general de verificación. Cada razón incluye una advertencia de fraude cuando corresponde.

## Demostración de interfaz de usuario

Las capturas de pantalla a continuación ilustran la progresión de estados de transferencia en el cliente ADAMANT PWA y iOS.

**DASH En el chat PWA-dev v4.9.0 — 2025-03-04**

| Tras confirmar la transferencia (~10 seg) | Tx mostrada en el chat como Pendiente | Detalles de Tx — Pendiente (~2 min) |
|---|---|---|
| ![Captura de discusión 1](/images/engineering-notes/github/discussions/9011944/001-61b4f6c1.webp) | ![Captura de discusión 2](/images/engineering-notes/github/discussions/9011944/002-711b6dcc.webp) | ![Captura de discusión 3](/images/engineering-notes/github/discussions/9011944/003-6eb732d9.webp) |

| Confirmado sin detalles (~5 seg) | Confirmado con detalles — Final | |
|---|---|---|
| ![Captura de discusión 4](/images/engineering-notes/github/discussions/9011944/004-fcf2d419.webp) | ![Captura de discusión 5](/images/engineering-notes/github/discussions/9011944/005-4e0f54a4.webp) | |

**DASH En el chat iOS v3.11.0 — 2025-03-04**

| Tras confirmar (~3 seg) | Tx mostrada en el chat como Pendiente | Detalles de Tx — Pendiente (~2 min) |
|---|---|---|
| ![Captura de discusión 6](/images/engineering-notes/github/discussions/9011944/006-ac6db431.webp) | ![Captura de discusión 7](/images/engineering-notes/github/discussions/9011944/007-a6e778a1.webp) | ![Captura de discusión 8](/images/engineering-notes/github/discussions/9011944/008-f5034347.webp) |

| Confirmado con detalles — Final | | |
|---|---|---|
| ![Captura de discusión 9](/images/engineering-notes/github/discussions/9011944/009-b08299f4.webp) | | |

---
title: "Notificaciones push sin un canal cliente-servidor: diseño, compromisos y una condición de carrera conocida en el registro"
slug: "discussion-72-push-notifications-without-a-client-to-server-channel-design-trade-offs-and-a-known-deregi-10570025"
description: "Las notificaciones push son el punto donde un mensajero privado es más vulnerable. Alguien debe ser notificado de la llegada de un mensaje, y en iOS ese alguien es Apple."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/72"
publishedAt: "2026-08-07T13:36:18Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10570025"
locale: "es"
placeholder: false
---

Las notificaciones push son el punto donde un mensajero privado es más vulnerable. Alguien debe ser notificado de la llegada de un mensaje, y en iOS ese alguien es Apple. Esta nota describe cómo ADAMANT implementa esto para que el servicio de notificaciones aprenda lo mínimo posible, los costes de este diseño y un modo de fallo conocido que el proyecto ha decidido tolerar en lugar de ocultar.

## La estructura del sistema

Intervienen cuatro partes: el dispositivo del usuario, un nodo de ADAMANT, el servicio Apple Push Notification (APNs) y el ADAMANT Notification Service (ANS), operado por cryptofoundry.

El registro se realiza a través de la blockchain, no mediante una API. Primero, el dispositivo solicita un token push a APNs. Luego, la aplicación cifra `{token, provider, action}` con la clave pública de ANS y lo envía como un **mensaje de señal** (tipo de chat 3, [AIP-6](https://aips.adamant.im/AIPS/aip-6)) a la dirección ADM de la cuenta de ANS, a través del nodo que el usuario haya elegido. ANS consulta a los nodos por transacciones dirigidas a sí mismo, las descifra y almacena el par `dirección ADM → token push`.

La entrega es el proceso inverso. ANS consulta las transacciones de transferencia (tipo 0) y de chat (tipo 8), verifica al destinatario en su registro y solicita a APNs la entrega de una notificación push.

## Lo que aprende cada parte

El payload de la notificación no contiene el contenido del mensaje:

```json
{
  "aps": {
    "alert": { "loc-key": "NotificationsService.NewMessage.BodySingle" },
    "badge": 1,
    "mutable-content": 1,
    "sound": "notification.mp3"
  },
  "push-recipient": "U1234567890123456",
  "txn-id": "7175005690801347553"
}
```

El cuerpo es una clave de localización, no un mensaje. La extensión del servicio de notificaciones de la aplicación toma el `txn-id`, obtiene la transacción de un nodo y la descifra localmente con la clave privada del usuario antes de mostrar la notificación. Apple ve un token de dispositivo, una dirección ADM, un ID de transacción y el momento del envío, pero nunca el contenido. Es una revelación importante: si envías notificaciones a Apple, Apple sabe que esa dirección recibió algo y cuándo.

La propiedad más interesante reside en el lado del servidor. La aplicación nunca abre una conexión con ANS. El servicio de tokens del cliente iOS realiza exactamente dos tipos de llamadas de red, ambas a nodos ADM, y no aparece ningún nombre de host de servicio push en la aplicación. Por lo tanto, ANS solo ve lo que ya es público en la cadena y, fundamentalmente, nunca ve la dirección IP del dispositivo. Un usuario que se conecta a través de su propio nodo o mediante Tor no toca en absoluto la infraestructura de cryptofoundry.

Esa propiedad es el objetivo principal y es frágil. La función de conveniencia obvia —un pequeño endpoint HTTPS en ANS para que un cliente pueda preguntar "¿todavía tienes mi token?"— la destruiría silenciosamente. Entregaría a ANS la IP del dispositivo, convertiría cada inicio de la aplicación en una señal de actividad por dispositivo, anularía la elección de nodo del usuario y crearía un nombre de host bloqueable allí donde hoy existe una lista de nodos conectables. Ese endpoint no se añadirá.

## El ciclo de vida del registro y dónde surgen los problemas

Dado que el canal es la blockchain, `add` (añadir) y `remove` (eliminar) son transacciones. Cada mensaje de señal cuesta una tarifa de chat estándar: `constants.fees.chat_message = 100000` con `fixedPoint = 1e8`, es decir, **0.001 ADM**. Esto es más importante de lo que parece: un usuario con saldo cero no puede enviar ninguno, lo que descarta la "re-registro periódico" como estrategia de robustez.

El cliente mantiene una copia local del token que cree registrado y solo se vuelve a registrar cuando iOS le entrega un token *diferente*. Nunca pregunta al servidor si el registro sigue existiendo, porque no puede hacerlo sin renunciar a la privacidad.

Esto genera un modo de fallo conocido y reproducible que no requiere pérdida de datos en el servidor. El usuario cierra sesión mientras está desconectado o conectado a un nodo inestable; el cliente borra su token en caché y envía `remove(T)`, pero el envío falla, por lo que la transacción se guarda y se reintenta en cada inicio posterior de la aplicación. El usuario vuelve a iniciar sesión en el mismo dispositivo. iOS suministra el **mismo** token `T`. La caché local está vacía, por lo que el cliente envía `add(T)` y tiene éxito; el estado del servidor es ahora correcto. Pero el `remove(T)` en cola finalmente tiene éxito, llegando a la cadena *después* del `add`, por lo que ANS elimina el registro que acaba de crear. La caché del cliente dice `T`, iOS sigue suministrando `T`, por lo que la comprobación "¿cambió el token?" nunca se activa. El dispositivo está dado de baja y no tiene forma de notarlo.

Las notificaciones se detienen silenciosamente. La única recuperación es un interruptor manual **Notificaciones → Off → Push** en la aplicación, que borra la caché local y fuerza un nuevo registro.

## Por qué no se está apresurando esta solución

Es un error real, pero limitado: requiere un desregistro fallido seguido de un registro del mismo token. Los dos atajos que lo enmascararían son peores que el error. Una comprobación HTTP cambia un fallo silencioso poco frecuente por una fuga de metadatos universal y permanente. El re-registro periódico gasta los fondos del usuario de forma programada y simplemente no funciona para quienes tienen cero ADM.

La solución correcta es el ordenamiento en el lado del cliente, y se mantiene dentro del diseño mediado por la blockchain: hacer que la cola de reintentos sea consciente del token para que un `remove(T)` pendiente se descarte una vez que un `add(T)` posterior tenga éxito, dejar de tratar "caché vacía" como el estado de registro y persistir el `add` con el mismo cuidado que ya recibe el `remove`. Ese trabajo corresponde a los clientes.

Una consecuencia relacionada de la misma asimetría: un `unregister` solo puede enviarse para un token que la aplicación aún recuerda, por lo que una reinstalación deja huérfano el registro anterior permanentemente. El registro contiene actualmente unas 2.600 filas en aproximadamente 1.700 direcciones distintas, con una dirección que acumula 251 de ellas. Las filas se eliminan cuando APNs informa que un token ha caducado, por lo que el registro se limpia solo para quienes siguen recibiendo notificaciones, pero una dirección a la que nadie escribe nunca se ejercita y nunca se limpia.

## Construyendo sobre esto

Dos conclusiones para cualquiera que integre las notificaciones de ADAMANT o desarrolle un cliente. Primero, no añada una devolución de llamada (callback) del dispositivo al servicio de notificaciones; es el diseño natural, pero es lo único que rompe la garantía. Segundo, trate el registro y el desregistro como un par ordenado. Son asíncronos, reintentables, están en la cadena y pueden llegar en desorden. Secuéncielos explícitamente en lugar de inferir el estado desde una caché local.

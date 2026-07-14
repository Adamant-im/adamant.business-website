---
title: "Control de salud: Estados de conexión"
slug: "discussion-18-health-check-connection-statuses-8923149"
description: "Ver también: Control de salud: Algoritmo, Descripción general. Tres estados de conexión relacionados con el envío y recepción de mensajes."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/18"
publishedAt: "2025-09-20T15:41:29Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923149"
locale: "es"
placeholder: false
---

Ver también: [Control de salud: Algoritmo, Descripción general](https://github.com/orgs/Adamant-im/discussions/17)

# Estados de conexión

Existen tres estados de conexión relacionados con la recepción y el envío de mensajes.

**Sin conexión a internet** es reportado por el sistema operativo (sin red, Wi-Fi, etc.). En el Control de salud, `No active nodes` puede significar en realidad que no hay conexión a internet.

**Sin nodos ADM activos/disponibles** se aplica cuando al menos un nodo ADM está habilitado pero ningún nodo se encuentra en estado **Activo**. La misma lógica se aplica a monedas y servicios (por ejemplo, `No active BTC services`). Los nodos no compatibles no se cuentan.

**Sin nodos ADM habilitados** ocurre cuando el usuario ha desactivado todos los nodos. Tampoco se cuentan los nodos no compatibles; puede haber nodos en estado `Unsupported`, pero el estado seguirá siendo `No enabled nodes`.

# Prioridad de las verificaciones

Las verificaciones se evalúan en orden: primero `No internet connection`, luego `No active/available ADM nodes`, y finalmente `No enabled ADM nodes`.

# Casos específicos

## Snackbar general

El snackbar general aparece únicamente para `No internet connection`. Es persistente (se muestra hasta que el usuario lo cierra o se restablece la conexión) y activa una vibración de atención.

![Captura de pantalla de la discusión 1](/images/engineering-notes/github/discussions/8923149/001-7a3f923d.webp)

## Ventana emergente de advertencia en el chat

La ventana emergente de advertencia en el chat aparece para `No enabled ADM nodes` cuando la conexión está activa, no hay nodos ADM disponibles y el usuario tiene al menos un nodo deshabilitado manualmente. Es persistente y activa una vibración de atención.

![Captura de pantalla de la discusión 2](/images/engineering-notes/github/discussions/8923149/002-7fee21d6.webp)

## Indicador giratorio de actualización general

El indicador giratorio de actualización general (mostrado en el área del encabezado, indicando que los datos/mensajes no están actualizados) aparece para todos los estados de conexión. Esto incluye la pantalla Delegates, la pantalla Wallets y cualquier pantalla de nodos. Es persistente y no activa vibración.

![Captura de pantalla de la discusión 3](/images/engineering-notes/github/discussions/8923149/003-00df57f0.webp)

Ver también: [Control de salud: Indicador giratorio de actualización general](https://github.com/orgs/Adamant-im/discussions/20)

## Indicador giratorio de carga de datos

El indicador giratorio de carga de datos cubre el indicador de la lista de chats, el indicador de chat específico y el indicador de la lista de transacciones ADM. Aparece para todos los estados de conexión y se muestra a petición del usuario; por ejemplo, cuando el usuario entra en la pantalla de la lista de transacciones ADM, desplaza la lista de chats para cargar nuevos chats, entra en un chat específico que la aplicación aún no tiene, se desplaza dentro de un chat específico o entra en la pantalla de votación para delegados. El indicador se muestra hasta que los datos se actualizan. Es persistente y no activa vibración.

## Envío de un nuevo mensaje o archivo

Este comportamiento es común a todos los estados de conexión. Si no hay conexión, el mensaje aparece en el chat con un estado de transacción `Pending`. El estado `Pending` cambia a `Failed` según los tiempos de espera definidos en [Message sending timeouts](https://github.com/Adamant-im/adamant-wallets/pull/95). Se implementan dos tiempos de espera: uno para el envío de un mensaje normal y otro para el envío de un mensaje con archivos adjuntos. El tiempo de espera para archivos adjuntos se refiere al envío de un mensaje ADM con archivos ya subidos, no a la carga del archivo en sí.

## Envío de ADM en el chat u otra criptomoneda

Esto también se aplica al envío directo de monedas ADM. Para todos los estados de conexión, el envío está prohibido y se muestra un snackbar temporal con una vibración de advertencia. Para el envío directo de monedas que no son ADM (Account → Coin → Send), no se verifica la disponibilidad de nodos ADM para las transferencias de monedas.

![Captura de pantalla de la discusión 4](/images/engineering-notes/github/discussions/8923149/004-e59de24d.webp)

## Iniciar un nuevo chat

Este comportamiento es común a todos los estados de conexión. La aplicación verifica localmente que la dirección ADM probablemente sea correcta, abre un nuevo chat inmediatamente sin realizar solicitudes y muestra un mensaje especial de bienvenida en el chat. Si la clave pública está disponible localmente, no se muestran mensajes adicionales. Si la clave pública debe solicitarse desde un nodo, se muestra un mensaje adicional en el chat con un indicador giratorio.

![Captura de pantalla de la discusión 5](/images/engineering-notes/github/discussions/8923149/005-ea0f770b.webp)

Para `No enabled ADM nodes`, también se muestra la ventana emergente adicional de advertencia en el chat.

## Al restablecer la conexión

Cuando se restablece la conexión, se completan las solicitudes pendientes; por ejemplo, los mensajes pendientes se envían y los indicadores giratorios se actualizan.

## Inicio de sesión con frase de recuperación

Para `No internet connection` y `No active/available ADM nodes`, el usuario permanece en la pantalla de inicio de sesión con un snackbar o ventana emergente mostrados. Para `No enabled ADM nodes`, el usuario es redirigido a la pantalla de nodos ADM con un snackbar o ventana emergente. El snackbar es temporal y activa una vibración de advertencia.

![Captura de pantalla de la discusión 6](/images/engineering-notes/github/discussions/8923149/006-b36dd2ac.webp)

## Inicio de sesión por contraseña/biométrico

Este comportamiento es común a todos los estados de conexión. El usuario inicia sesión normalmente sin demoras ni solicitudes, y se abre la pestaña Chats. Se muestran los mensajes y chats almacenados localmente. El indicador giratorio de actualización general indica que los datos no están actualizados, y se muestra un snackbar de "Sin conexión".

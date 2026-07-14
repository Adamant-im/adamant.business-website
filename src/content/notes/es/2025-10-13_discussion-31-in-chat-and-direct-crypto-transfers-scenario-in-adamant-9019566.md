---
title: "Transferencias de criptomonedas en el chat y directas en ADAMANT"
slug: "discussion-31-in-chat-and-direct-crypto-transfers-scenario-in-adamant-9019566"
description: "ADAMANT Messenger permite transferencias de criptomonedas directamente en chats y desde la pantalla de Cartera, con todas las operaciones registradas en el historial de transacciones."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/31"
publishedAt: "2025-10-13T05:01:20Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9019566"
locale: "es"
placeholder: false
---

ADAMANT Messenger permite transferencias de criptomonedas sin interrupciones tanto dentro de los chats como directamente desde la pantalla de Cartera, con todas las operaciones registradas en el Historial de Transacciones.

### Transferencias de Criptomonedas en el Chat

Antes de enviar, la aplicación valida el saldo ADM del usuario, la conexión a internet, la disponibilidad del nodo ADM y la disponibilidad del nodo de criptomonedas mediante comprobaciones de estado. Si alguna verificación falla, la aplicación muestra un error y permite reintentar.

El flujo de transacción comienza generando localmente tanto la transacción de criptomoneda como la transacción ADM. Para cadenas con números únicos (nonces) como ETH, la aplicación verifica el almacenamiento local para asegurarse de que no se haya completado ya una transacción con el mismo número único. Para cadenas sin números únicos como BTC, DOGE o DASH, comprueba el almacenamiento local y consulta la blockchain en busca de transacciones pendientes. Si se encuentra un duplicado pendiente o exitoso, el proceso se detiene.

A continuación, la transacción ADM se envía al nodo ADM. Si es aceptada, se agrega al chat y la aplicación permanece en la pantalla de Envío. La transacción de criptomoneda se almacena entonces en la base de datos local y se muestra en el historial de transacciones con estado "Pendiente". La aplicación utiliza una marca de tiempo almacenada localmente para ordenar las transacciones hasta que esté disponible la marca de tiempo real de la blockchain. Esta visualización inmediata es crucial para transferencias de monedas que no son ADM, ya que el nodo de la moneda aún no ha devuelto datos, pero el usuario necesita retroalimentación instantánea.

Luego, la transacción de criptomoneda se envía al nodo de la moneda. Cualquier respuesta positiva marca la transacción como Pendiente, y el usuario es redirigido a la pantalla del Chat o de detalles de la transacción. Si el envío falla, se muestra un mensaje de error emergente (snackbar), y el usuario puede reintentar, lo que genera una transacción completamente nueva. Si el usuario vuelve al Chat sin reintentar, la transacción fallida sigue apareciendo en el chat y en el historial porque el mensaje ADM ya se había enviado. Las actualizaciones de la transacción continúan en segundo plano.

Generar la transacción ADM antes de enviar la transacción de criptomoneda asegura que la transferencia de criptomonedas nunca se realice sin estar registrada en el chat, evitando que los usuarios gasten criptomonedas sin darse cuenta y las envíen por error nuevamente.

### Transferencias Directas de Criptomonedas (Pantalla de Cartera)

El escenario de transferencia directa desde la pantalla de Cartera es idéntico a las transferencias dentro del chat, con algunas excepciones. Omite la verificación del saldo ADM, la comprobación del nodo ADM y la creación de la transacción ADM. Al completarse, el usuario es redirigido al historial de transacciones en lugar del chat.

### Historial de Transacciones

El historial de transacciones combina transacciones almacenadas localmente con datos sincronizados desde la API del nodo de la blockchain. Las transacciones almacenadas localmente se conservan incluso después de reiniciar la aplicación, pero deben eliminarse al cerrar sesión o al iniciar sesión nuevamente para evitar mostrar el historial de otra cuenta. Esta combinación proporciona una visión precisa y actualizada de las transferencias del usuario. Siempre que sea posible, la aplicación utiliza cálculos y verificaciones locales para la generación de transacciones, saldos, números únicos, duplicados y marcas de tiempo, para garantizar una experiencia de usuario receptiva sin tener que esperar respuestas de red.

![Captura de pantalla de la discusión 1](/images/engineering-notes/github/discussions/9019566/001-90a49183.webp)

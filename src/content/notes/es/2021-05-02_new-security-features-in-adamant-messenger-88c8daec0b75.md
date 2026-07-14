---
title: "Nuevas funciones de seguridad en ADAMANT Messenger 2.11.0"
slug: "new-security-features-in-adamant-messenger-88c8daec0b75"
description: "La versión 2.11.0 de ADAMANT Messenger introduce verificación de transacciones cripto, advertencias para direcciones sospechosas y actualización bajo demanda del estado de transacciones."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-security-features-in-adamant-messenger-88c8daec0b75"
publishedAt: "2021-05-02T08:46:58.373Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/88c8daec0b75/001-0-0hsc7oe7vtwfo3p0.webp"
cardSpan: "full"
originalId: "medium:88c8daec0b75"
locale: "es"
placeholder: false
---

La versión 2.11.0 de ADAMANT Messenger introduce la verificación de transacciones de criptomonedas, advertencias para direcciones de billetera sospechosas y actualizaciones bajo demanda del estado de las transacciones.

### Billeteras sospechosas en KVS

ADAMANT almacena direcciones de billetera en el Almacén Clave-Valor (KVS) de la blockchain, lo que permite transferencias cripto dentro del chat. Guardar una dirección requiere la frase de contraseña de la cuenta, por lo que terceros no pueden inyectar direcciones incorrectas en nombre del usuario. Sin embargo, si la frase de contraseña se ve comprometida, un atacante podría reemplazar las direcciones de criptomonedas de la cuenta por las suyas propias e interceptar cualquier fondo enviado a la víctima.

Ahora el Messenger verifica la consistencia de la dirección de la billetera al iniciar sesión y notifica al usuario de cualquier discrepancia. Al enviar criptomonedas a un contacto, la aplicación también valida la dirección almacenada del contacto.

### Transferencias de criptomonedas en chats

Las transferencias dentro del chat funcionan enviando primero un mensaje especial en la blockchain de ADAMANT, seguido de la transacción de criptomonedas en sí. Pueden surgir inconsistencias entre el mensaje especial y la transacción en cadena, por ejemplo, montos, destinatarios, remitentes u horarios de transferencia no coincidentes. Ahora el Messenger detecta estas inconsistencias y alerta al usuario.

![Nuevas funciones de seguridad en ADAMANT Messenger](/images/engineering-notes/medium/88c8daec0b75/002-0-bjwjfxdbbty8fily.webp)

Cualquier transferencia de criptomonedas dentro del chat también debería aparecer en el historial de transacciones de la billetera bajo Billetera → Moneda → Saldo. El estado de la transacción ahora puede volver a verificarse manualmente desde la pantalla de chat y desde la pantalla de detalles de la transacción.

### Otras actualizaciones

Esta versión optimiza los tiempos de actualización de transacciones para distintas monedas, corrige el manejo de UTXO para Doge, añade la visualización de la versión del nodo en la vista de Nodos y resuelve un error por el cual la lista de transacciones aparecía vacía. El registro completo de cambios está disponible en las [notas de la versión v2.11.0](https://github.com/Adamant-im/adamant-im/releases/tag/v2.11.0).

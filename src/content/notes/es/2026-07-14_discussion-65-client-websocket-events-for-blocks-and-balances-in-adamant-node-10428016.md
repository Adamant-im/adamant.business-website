---
title: "Eventos WebSocket del cliente para bloques y saldos en ADAMANT Node"
slug: "discussion-65-client-websocket-events-for-blocks-and-balances-in-adamant-node-10428016"
description: "Resumen: ADAMANT Node ahora soporta dos capacidades WebSocket opcionales: eventos newBlock para bloques aplicados y guardados, y eventos balances/change para actualizaciones confirmadas."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/65"
publishedAt: "2026-07-14T16:18:33Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10428016"
locale: "es"
placeholder: false
---

## Resumen

ADAMANT Node ahora soporta dos capacidades WebSocket opcionales para el cliente: eventos `newBlock` para bloques aplicados y guardados correctamente, y eventos `balances/change` para actualizaciones confirmadas de `balance` y `unconfirmedBalance`. La implementación utiliza Socket.IO en lugar de una conexión WebSocket pura. Las suscripciones están limitadas a un único socket y deben restablecerse tras reconectar.

La implementación aborda [Node issue #256](https://github.com/Adamant-im/adamant/issues/256) y [Node issue #217](https://github.com/Adamant-im/adamant/issues/217), con documentación en [Adamant-im/docs#35](https://github.com/Adamant-im/docs/pull/35) y un contrato complementario OpenAPI en [Adamant-im/adamant-schema#48](https://github.com/Adamant-im/adamant-schema/pull/48).

## Eventos de nuevo bloque

Los clientes habilitan explícitamente las notificaciones de bloques emitiendo `blocks: true`. La carga útil de `newBlock` contiene una cabecera pública compacta: ID del bloque, altura, marca de tiempo, clave pública del generador, número de transacciones, monto total, comisión total y recompensa. Omite intencionalmente la lista de transacciones, las firmas y el hash de la carga útil; los clientes pueden solicitar el bloque completo a través de REST cuando lo necesiten.

```js
connection.emit('blocks', true);

connection.on('newBlock', (block) => {
  console.log('Applied block:', block);
});
```

El nodo emite este evento solo después de que el pipeline completo de aplicación del bloque finaliza correctamente y el bloque se guarda. La repetición histórica y las reconstrucciones de tablas en memoria no producen eventos de bloque en vivo.

## Eventos de cambio de saldo

La entrega de saldos requiere tanto una suscripción por dirección como una suscripción explícita por campo. La carga útil incluye únicamente los campos suscritos que cambiaron, con valores como cadenas decimales en unidades de 1/10^8 ADM.

```js
connection.emit('address', ['U1234567890123456']);
connection.emit('balances', ['balance', 'unconfirmedBalance']);

connection.on('balances/change', (account) => {
  console.log('Balance changed:', account);
});
```

`balance` representa el estado confirmado de la cadena de bloques. `unconfirmedBalance` también refleja el pool no confirmado actual del nodo y puede cambiar cuando las transacciones son aceptadas, confirmadas, expiran, se revierten o se revalidan.

## Diseño de entrega y rendimiento

El objetivo principal fue agregar eventos útiles sin convertir cada mutación de cuenta en un escaneo de cada socket conectado o en una lectura innecesaria de la base de datos. Índices dedicados de bloques y saldos por dirección seleccionan únicamente los sockets interesados, y el nodo omite las lecturas de cuenta cuando ningún suscriptor necesita la dirección y el campo modificados. La aplicación y reversión de bloques agrupan las mutaciones internas de saldo y realizan una única lectura final de cuenta por dirección modificada. La supresión de lotes anidados se mantiene activa hasta que se cierra el lote externo, evitando la publicación parcial tras un fallo interno. La aplicación fallida de bloques, la reversión fallida, la repetición, la reconstrucción y la truncación completada de snapshots suprimen todas las notificaciones de saldo no duraderas. Los fallos de coincidencia de sockets, búsqueda de cuentas y emisión individual a sockets están aislados del procesamiento de bloques, rondas y cuentas. Los cambios de recompensa de ronda se publican solo después de una operación de ronda duradera completada.

Estos cambios no modifican las reglas de consenso, la serialización de bloques o transacciones, las firmas, los IDs, los esquemas de base de datos, las recompensas, las comisiones ni el comportamiento del protocolo entre pares.

## Semántica de eventos de mejor esfuerzo

Estos eventos son notificaciones de baja latencia, no un registro de eventos duradero. Los clientes pueden perder eventos durante una desconexión y deben reconciliar el estado importante a través de REST. Las suscripciones de saldo no envían una instantánea inicial, y las lecturas asíncronas de saldo pueden completarse fuera de orden durante actualizaciones independientes rápidas. Los IDs duplicados de transacciones y bloques se suprimen durante al menos 60 segundos, con una limpieza periódica que extiende la ventana efectiva a aproximadamente dos minutos. Si un bloque se revierte y el mismo ID se reaplica dentro de esa ventana, la segunda notificación puede ser suprimida.

La representación actual de saldo en cadena coincide intencionalmente con el comportamiento de REST; los valores exactos más allá del rango de enteros seguros de JavaScript requieren un cambio coordinado en toda la API en lugar de una divergencia exclusiva de WebSocket. No se introdujo un límite arbitrario y silencioso de suscripciones por socket. La API actual no tiene un mecanismo de confirmación para el rechazo parcial, por lo que un límite de recursos debería ser un contrato configurable y documentado por separado con retroalimentación explícita al cliente.

## Validación

La validación incluyó 226 pruebas de Node dirigidas a funcionalidades que cubren las rutas de WebSocket, cuentas, transacciones, bloques y rondas, además de pruebas de regresión específicas para la supresión de snapshots y el descarte de lotes anidados. La suite amplia de pruebas unitarias rápidas aprobó 940 pruebas. Las verificaciones adicionales cubrieron ESLint, una compilación de documentación VitePress para producción, formato OpenAPI y validación de paquetes, y cobertura de integración real de Socket.IO para la entrega de bloques y saldos. Las suites de pruebas de larga duración no relacionadas se omitieron intencionalmente porque esta funcionalidad no cambia la validación de consenso, la serialización, SQL, el transporte entre pares ni los endpoints REST.

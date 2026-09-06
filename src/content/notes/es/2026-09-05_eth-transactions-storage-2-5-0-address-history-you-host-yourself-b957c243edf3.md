---
title: "ETH Transactions Storage 2.5.0: Historial de direcciones que usted mismo aloja"
slug: "eth-transactions-storage-2-5-0-address-history-you-host-yourself-b957c243edf3"
description: "Los clientes de ejecución de Ethereum pueden indicar el estado de la red, pero no el historial de transacciones de una dirección. ETH Transactions Storage 2.5.0 soluciona esto."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/eth-transactions-storage-2-5-0-address-history-you-host-yourself-b957c243edf3"
publishedAt: "2026-09-05T14:44:58.348Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:b957c243edf3"
coverImage: "/images/engineering-notes/medium/b957c243edf3/001-a6ae0683b6.webp"
locale: "es"
placeholder: false
---

Los clientes de ejecución de Ethereum pueden indicar el estado de la red, un bloque, un recibo o un registro, pero no pueden responder a la pregunta que toda pantalla de billetera plantea al abrirse: ¿qué transacciones involucran a esta dirección, de la más reciente a la más antigua? Los indexadores públicos responden a esto, pero también ven cada dirección que sus usuarios consultan, limitan su tasa de tráfico cuando este crece y pueden cambiar sus precios o desaparecer. Si el historial de transacciones es parte de su producto, esa dependencia se sitúa en el camino crítico.

ETH Transactions Storage es un indexador autohospedado que lee bloques de su nodo de Ethereum, escribe transferencias nativas de ETH y llamadas de transferencia ERC-20 en su base de datos PostgreSQL, y sirve el historial de direcciones a través de una API REST de solo lectura. No hay telemetría, ni cuentas de terceros, y solo hay dos conexiones salientes: el nodo y la base de datos que usted configura. La arquitectura es sencilla: nodo de Ethereum → ethsync.py → PostgreSQL → PostgREST → su aplicación. Funciona con Geth, Nethermind, Besu y Erigon a través de HTTP, WebSocket o IPC, y con redes compatibles con EVM que exponen la misma interfaz JSON-RPC.

La versión 2.5.0 convierte esta idea en algo que puede distribuir, operar y documentar. El contrato de la API utilizado en producción sigue siendo el mismo, pero el software que lo rodea es nuevo. Esta versión introduce una sincronización confiable, un conjunto de índices recomendado más pequeño, filtrado de direcciones opcional, un modelo de seguridad documentado, un contenedor publicado y un sitio de documentación.

### Sincronización confiable y filtrado de direcciones

Cada bloque se escribe junto con su punto de control en una única transacción de base de datos. Los reinicios se reanudan exactamente donde se detuvieron. Al iniciarse, el indexador elimina el bloque más alto y retrocede un paso, asegurando que un bloque parcialmente escrito no pueda sobrevivir a un bloqueo. Los bloques vacíos y los bloques filtrados ya no engañan al cursor; una fila dedicada `sync_state` registra la última altura procesada incluso cuando esa altura no almacenó filas. Los errores de base de datos revierten y reintentan la operación en lugar de dejar el punto de control por delante de los datos.

El historial de toda la cadena es el valor predeterminado correcto para una API de billetera pública, pero no para un monitor de tesorería o una herramienta de soporte donde el conjunto de direcciones se conoce de antemano. La versión 2.5.0 añade un filtro de direcciones opcional. Cuando se carga, el indexador almacena una transferencia solo si el remitente, el destinatario nativo o el destinatario del token coinciden. La lista se recarga mientras el proceso se ejecuta. La validación es estricta y se cierra en caso de error: si la lista no se puede leer, la indexación no continúa con un filtro vacío. Tenga en cuenta que activar el filtro o añadir una dirección no rellena bloques anteriores, así que planifique el historial que necesita antes de empezar.

### Indexación optimizada y seguridad

El conjunto de bases de datos recomendado ahora consta de cinco índices B-tree, derivados del tráfico de consultas de producción real en lugar de indexar cada columna potencialmente útil. En un conjunto de datos de aproximadamente 490 millones de filas, este conjunto más pequeño ahorra entre 90 y 110 GB. El uso de `citext` en los campos de dirección mantiene la coincidencia sin distinguir entre mayúsculas y minúsculas sin necesidad de envolver cada consulta en `LOWER()`.

El usuario del indexador escribe, pero la API pública no debe hacerlo. Esta versión documenta y distribuye un rol `web_anon` con permisos solo de SELECT en `ethtxs`, `aval` y `max_block`. PostgREST está limitado a 10,000 filas por respuesta. La guía de seguridad cubre las reglas de proxy inverso para implementaciones públicas, incluyendo listas de permitidos de métodos, filtros de direcciones obligatorios en `/ethtxs` y protecciones contra agregados de conteo costosos y desplazamientos ilimitados. Las credenciales se cargan desde `.env`, se admiten URIs de conexión de PostgreSQL y los diagnósticos ocultan las contraseñas.

### Contenedor y contrato de API

La imagen publicada es `ghcr.io/adamant-im/eth-transactions-storage:2.5.0`, compilada para linux/amd64 y linux/arm64. Las etiquetas de versión son inmutables; fije la versión 2.5.0 en producción. Docker Compose ejecuta esta imagen de forma predeterminada junto con PostgreSQL, PostgREST, un Geth local opcional y el indexador. El sitio de documentación en eth-indexer.docs.adamant.im proporciona arquitectura, inicios rápidos, configuración y detalles de seguridad.

Un lanzamiento tan grande solo es útil si los clientes existentes siguen funcionando. Y lo hacen. Los puntos finales `/ethtxs`, `/max_block` y `/aval` permanecen sin cambios.

Transferencias nativas de ETH, una solicitud:

```http
GET /ethtxs?and=(contract_to.eq.,or(txfrom.eq.{address},txto.eq.{address}))&order=time.desc&limit=25
```

Transferencias ERC-20 para un contrato de token:

```http
GET /ethtxs?and=(txto.eq.{contract_address},or(txfrom.eq.{address},contract_to.eq.000000000000000000000000{address_without_0x}))&order=time.desc&limit=25
```

Salud:

```http
GET /max_block
GET /aval
```

Los nombres de las columnas, las codificaciones y las direcciones que no distinguen entre mayúsculas y minúsculas se mantienen como estaban. Los 24 ceros iniciales en `contract_to` son relleno de ABI, no una peculiaridad que deba corregirse más adelante.

### Alcance y limitaciones

El indexador almacena transferencias nativas de ETH con un valor distinto de cero y transferencias ERC-20 enviadas como una llamada directa de nivel superior `transfer(address,uint256)`. No almacena transferencias internas de ETH, `transferFrom`, flujos de multisig o enrutadores, otros estándares de tokens ni registros de eventos. El indexador no repara automáticamente una reorganización profunda de la cadena después del hecho; `CONFIRMATIONS_BLOCK` lo mantiene detrás de la cabeza, lo que significa que una reorganización profunda requiere una reindexación planificada del rango afectado. Si su aplicación debe reflejar cada posible movimiento de tokens, necesita un indexador basado en registros. Si necesita transferencias iniciadas por el usuario —el historial que una billetera realmente muestra—, este está diseñado para esa tarea y sigue siendo económico de ejecutar.

Los operadores existentes deben leer la guía de actualización antes de implementar. Aplique primero el esquema aditivo, mantenga los valores de su entorno de producción y no trate un cambio de etiqueta de imagen de Compose como una actualización de PostgreSQL. ETH Transactions Storage es una infraestructura de código abierto mantenida por la comunidad de desarrolladores de ADAMANT y cryptofoundry.

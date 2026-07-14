---
title: "ADAMANT Console v3.1.0: casos de uso de CLI y JSON-RPC"
slug: "adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
description: "ADAMANT Console v3.1.0 ya está disponible en GitHub y npm. Esta versión alinea el Console con ADAMANT Node v0.10.0 y mejora la experiencia para desarrolladores en CLI, JSON-RPC y envoltorios JavaScript locales."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
publishedAt: "2026-06-29T08:58:40.394Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/14a24cb7ac32/001-0-1kktbaowg0a7u8mr.webp"
cardSpan: "full"
originalId: "medium:14a24cb7ac32"
locale: "es"
placeholder: false
---

ADAMANT Console v3.1.0 ya está disponible en GitHub y npm. Esta versión alinea el Console con ADAMANT Node v0.10.0 y mejora la experiencia para desarrolladores en el uso de CLI, integraciones JSON-RPC y envoltorios JavaScript locales. Está dirigida a cualquier persona que use ADAMANT en scripts, bots, infraestructura de exchanges, herramientas internas, paneles de monitoreo o automatización de pagos.

### ¿Qué es ADAMANT Console?

ADAMANT Console es una herramienta de línea de comandos y JSON-RPC para interactuar con la blockchain ADAMANT. Puede inspeccionar cuentas, bloques, transacciones, chats, delegados y el estado del nodo; enviar transferencias de ADM y mensajes cifrados; funcionar como puente JSON-RPC local para servicios escritos en cualquier lenguaje; y firmar transacciones localmente para que las frases de recuperación nunca se envíen a nodos ADAMANT. Este último punto es importante: Console está diseñado alrededor de la firma local. Su aplicación prepara una acción localmente, Console la firma localmente, y solo la transacción firmada se envía a la red.

### Novedades en la v3.1.0

El objetivo principal de esta versión es la compatibilidad con ADAMANT Node v0.10.0. Los cambios notables incluyen soporte para las respuestas actualizadas del nodo y el comportamiento de consultas, una actualización a `adamant-api` v3, nuevo soporte para `node status`, ayudantes expandidos para chats y transacciones, soporte para `returnUnconfirmed` en búsquedas de transacciones, búsqueda de delegados por nombre de usuario, clave pública o dirección ADAMANT, filtros de transferencia directa actualizados con `includeDirectTransfers`, ejemplos mejorados de ayuda en CLI, cobertura expandida de métodos JSON-RPC, una referencia de API generada con un nuevo sitio de documentación de Console, y un paquete npm publicado con procedencia mediante Trusted Publishing. El entorno de ejecución compatible ahora es Node.js 22.13.0 o superior.

Instale o actualice:

```bash
npm install -g adamant-console
```

Luego verifique su configuración local:

```bash
adm client version
adm node status
```

### Caso de uso: Un bot de operaciones cripto para flujos de trabajo de equipo

Un equipo que gestiona servicios que dependen de pagos en ADM o de la disponibilidad del nodo puede usar ADAMANT Console como un pequeño puente local detrás de un bot. Un bot de Telegram, Discord o Slack puede llamar comandos de Console o métodos JSON-RPC para responder preguntas sobre el estado del nodo, estado de transacciones, saldos de billetera y pagos entrantes no confirmados.

Ejemplos de verificaciones con CLI:

```bash
adm node status
adm get address U123456789
adm get transaction 123456789 returnUnconfirmed=1
adm get transactions recipientId=U123456789,limit=10
```

Esto es útil para escritorios de soporte, canales de monitoreo, operaciones de tesorería y respuesta interna a incidentes. El bot no necesita conocer en detalle el protocolo ADAMANT; simplemente llama a Console, analiza el JSON y presenta mensajes de estado claros a los usuarios.

### Caso de uso: Licencias o control de acceso basado en ADM

Otro caso de uso práctico es la gestión ligera de licencias. Una aplicación autohospedada, herramienta de trading, panel de análisis o servicio de automatización puede desbloquear acceso premium cuando un usuario envía ADM a una dirección de pago. El backend asigna una dirección de depósito al usuario, monitorea transacciones entrantes, verifica el monto del pago y el estado de la transacción, activa el acceso automáticamente y opcionalmente envía un mensaje cifrado de ADAMANT como recibo.

Un servicio puede consultar transacciones así:

```bash
adm get transactions recipientId=U123456789,limit=20,returnUnconfirmed=1
```

O enviar un mensaje de confirmación:

```bash
adm send message U123456789 "Your subscription is active"
```

Para aplicaciones más grandes, el mismo flujo puede ejecutarse a través de JSON-RPC, de modo que el backend principal pueda escribirse en PHP, Python, Go, Ruby, Java o cualquier otro lenguaje que pueda realizar solicitudes HTTP. Console se convierte en el puente ADAMANT local.

### Caso de uso: Depósitos y retiros rápidos de ADM mediante JSON-RPC para exchanges

Los exchanges y servicios custodios a menudo necesitan una interfaz simple y predecible para depósitos y retiros. ADAMANT Console puede ejecutarse como un servidor JSON-RPC local:

```bash
adm rpc server
```

Por defecto, escucha en el puerto RPC configurado, comúnmente `5080`. Ejecute el servidor JSON-RPC solo en infraestructura de confianza, detrás de un cortafuegos o red privada. Si el servidor tiene acceso a frases de recuperación, trátelo como infraestructura de firma.

Verifique el estado del nodo:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"nodeStatus","params":[],"id":1}'
```

Genere una cuenta de depósito:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"accountNew","params":[],"id":2}'
```

Guarde las credenciales generadas de forma segura. No registre frases de recuperación ni claves privadas.

Monitoree depósitos:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactionsReceivedByAddress","params":["U123456789"],"id":3}'
```

Para escaneos de transacciones más flexibles:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactions","params":["recipientId=U123456789","limit=20","returnUnconfirmed=1"],"id":4}'
```

Su backend de exchange puede conciliar depósitos por dirección, ID de transacción, monto, marca de tiempo y política de confirmación.

Procese retiros:

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"sendTokens","params":{"address":"U987654321","amount":"10ADM","passphrase":"your local passphrase"},"id":5}'
```

Para sistemas de producción, las frases de recuperación deben provenir de un almacenamiento seguro de secretos locales, no de registros, capturas de pantalla, salidas de CI ni historial de shell compartido.

### Por qué esta versión es importante

ADAMANT Console es intencionalmente ligero. No intenta reemplazar un SDK completo ni un backend personalizado. En cambio, ofrece a desarrolladores y operadores una herramienta práctica para scripts rápidos, firma local, integraciones con bots, automatización de exchanges, verificación de pagos, monitoreo operativo y acceso JSON-RPC desde pilas que no usan JavaScript. Con la v3.1.0, esta herramienta ahora está alineada con ADAMANT Node v0.10.0 y la pila actual de la API JavaScript de ADAMANT.

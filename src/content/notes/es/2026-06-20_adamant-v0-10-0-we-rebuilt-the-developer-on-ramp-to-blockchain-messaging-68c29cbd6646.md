---
title: "ADAMANT v0.10.0: Una rampa de acceso reconstruida para desarrolladores hacia el mensajería en blockchain"
slug: "adamant-v0-10-0-we-rebuilt-the-developer-on-ramp-to-blockchain-messaging-68c29cbd6646"
description: "La mensajería descentralizada solo importa si los desarrolladores pueden construir sobre ella. Con ADAMANT Node v0.10.0, la experiencia para desarrolladores ha sido renovada por completo."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-v0-10-0-we-rebuilt-the-developer-on-ramp-to-blockchain-messaging-68c29cbd6646"
publishedAt: "2026-06-20T16:19:49.523Z"
author: "massivedev0 (Theo Bitner)"
authorUrl: "https://medium.com/@vr.dev0"
sourceAccount: "massive"
coverImage: "/images/engineering-notes/medium/68c29cbd6646/001-1-ujeffbtelp0ew-8wechc8g-png.webp"
cardSpan: "full"
originalId: "medium:68c29cbd6646"
locale: "es"
placeholder: false
---

La mensajería descentralizada solo importa si los desarrolladores realmente pueden construir sobre ella. Junto con ADAMANT Node **v0.10.0**, toda la experiencia para desarrolladores ha sido renovada: una nueva especificación de API, documentación reescrita, una red local que puedes levantar en minutos y una testnet recién reiniciada. El objetivo es hacer que la integración con el ecosistema de mensajería en blockchain de ADAMANT sea rápida, predecible y agradable, ya sea que estés construyendo una billetera, un bot, un servicio de notificaciones o algo completamente nuevo.

### Una especificación de API moderna e interactiva

El contrato de API ahora vive como una especificación limpia **OpenAPI 3.2**, publicada como una interfaz Swagger UI interactiva en [schema.adamant.im](https://schema.adamant.im/). El esquema fue auditado de extremo a extremo contra el nodo en vivo, por lo que lo que lees es exactamente lo que la red devuelve realmente: cuentas, transacciones, chats, delegados, bloques, almacenamiento clave-valor y puntos finales del nodo, todo en una referencia exploratoria.

Los desarrolladores pueden probar solicitudes directamente en el navegador. La especificación incluye selección en vivo de servidores: la interfaz hace ping a cada nodo público, muestra su versión actual de API y selecciona automáticamente un nodo principal saludable, por lo que las llamadas de "pruébalo" funcionan inmediatamente. Puedes buscar entre cada operación por ruta, método, nombre o resumen, y como la fuente de verdad es un documento OpenAPI real, puedes generar clientes tipados (por ejemplo, TypeScript) directamente desde él. El cliente [adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient) de ADAMANT hace exactamente esto.

### Mayor visibilidad del estado del nodo

Varias adiciones en v0.10.0 son campos pequeños con grandes beneficios ergonómicos. Las transacciones ahora incluyen un campo `timestampMs` que proporciona marcas de tiempo con precisión de milisegundos junto con el `timestamp` existente a nivel de segundo. Para un mensajero donde el orden es crucial, esto permite a los clientes ordenar mensajes y transferencias con precisión subsegundo. Los clientes deben preferirlo cuando esté presente y recurrir a `timestamp * 1000` en caso contrario.

La respuesta de estado del nodo ahora expone `nodeTimestampMs`, `unixTimestampMs` y un objeto `loader` que informa del progreso de sincronización (`syncing`, `consensus`, `blocks`, `blocksCount`), para que operadores y herramientas puedan evaluar el estado de salud y sincronización del nodo de un vistazo. Un nuevo punto final `GET /peers/get` permite buscar un par específico por IP y puerto, útil para construir monitores de red y herramientas de conectividad. Las consultas de chat y transacciones son más limpias gracias a nuevos parámetros `returnUnconfirmed` e `includeDirectTransfers` que dan a los clientes control preciso sobre lo que se devuelve. Estas son adiciones compatibles con versiones anteriores: las integraciones existentes siguen funcionando, y las nuevas obtienen más funcionalidades.

### Documentación desde la que realmente puedes construir

La API es solo la mitad de la historia. La documentación en [docs.adamant.im](https://docs.adamant.im/) ha sido reescrita y ampliada, con etiquetas de versión alineadas con el lanzamiento del nodo para que las guías y la red nunca se desfasen. El nuevo y ampliado contenido cubre el consenso y la validación de transacciones —cómo se acuerdan los bloques y qué hace válida una transacción—, así como la sincronización y el punto final de estado/cargador, para que entiendas exactamente lo que hace un nodo mientras se pone al día. Incluye guías de instalación (incluyendo macOS), configuración, inicio automático, arranque inicial (bootstrapping) y recuperación de nodos para ejecutar tu propio nodo, además de documentación completa sobre la semántica de `timestampMs` para que manejes el tiempo correctamente desde el primer día.

### Levanta una red en minutos: localnet + testnet

Ahora puedes levantar una red ADAMANT completa en tu propia máquina con **localnet**. Desarrolla y prueba contra una blockchain real sin tocar infraestructura pública, sin esperar confirmaciones de una red ocupada y sin gastar ADM reales. Itera rápido, reinicia libremente. Cuando estés listo para salir de tu portátil, la **testnet** pública ha sido recién reiniciada y alineada con v0.10.0: un entorno compartido y seguro para validar integraciones contra condiciones reales de red antes de pasar a mainnet. De local → testnet → mainnet ahora es un camino suave y bien documentado en lugar de un precipicio.

### Qué puedes construir

Con una API tipada, redes ejecutables y documentación real, se abren rápidamente escenarios prácticos. ADAMANT es un mensajero completamente descentralizado y cifrado de extremo a extremo sobre su propia blockchain, por lo que billeteras y mensajeros pueden enviar mensajes cifrados y valor en el mismo protocolo. Los servicios de notificación y alertas pueden enviar eventos en cadena (pagos, mensajes) a tus propias aplicaciones. Las integraciones de intercambio y trading obtienen manejo programático de cuentas, saldos y transferencias con ordenamiento preciso al milisegundo. Los bots y automatizaciones —bots de chat, bots de pagos, bots de monitoreo— todos hablan esta API, y el ecosistema de ADAMANT ya incluye bots comerciales y más. La mensajería entre máquina y máquina y para IoT gana un canal resistente a la censura y anónimo para que los dispositivos se coordinen y paguen entre sí, y la comunicación anónima sin servidores se vuelve posible allí donde no hay un servidor central al que puedan solicitar información, filtrar o cerrar.

Como los mensajes y los pagos comparten un mismo protocolo, muchos de estos casos se combinan: una billetera que chatea, un bot que paga, un dispositivo que envía mensajes y liquida —todo sobre los mismos rieles.

### Referencias

- **Referencia de API:** [schema.adamant.im](https://schema.adamant.im/)
- **Documentación:** [docs.adamant.im](https://docs.adamant.im/)
- **Código fuente del nodo:** [github.com/Adamant-im/adamant](https://github.com/Adamant-im/adamant)
- **Cliente JS:** [github.com/Adamant-im/adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient)

---
title: "ADAMANT Node v0.10.0: Una base más sólida para la comunicación descentralizada"
slug: "adamant-node-v0-10-0-a-stronger-foundation-for-decentralized-communication-bf99c758ff3a"
description: "ADAMANT Node v0.10.0 mejora el rendimiento, depuración y alineación con clientes modernos en la red descentralizada ADAMANT."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v0-10-0-a-stronger-foundation-for-decentralized-communication-bf99c758ff3a"
publishedAt: "2026-06-16T11:50:08.717Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/bf99c758ff3a/001-1-a8dezfm7vyio0a-74gwt6q-png.webp"
cardSpan: "full"
originalId: "medium:bf99c758ff3a"
locale: "es"
placeholder: false
---

La red ADAMANT funciona gracias a nodos operados por la comunidad: servidores independientes que reenvían mensajes cifrados, proporcionan APIs a mensajeros y mantienen la blockchain íntegra. ADAMANT Node v0.10.0 es una actualización sustancial que hace que esta infraestructura sea más rápida de operar, más fácil de depurar y mejor alineada con cómo funcionan realmente los clientes modernos de ADAMANT. ADAMANT no busca números de rendimiento llamativos; está construyendo una capa de confianza descentralizada para la comunicación en la que mensajeros, billeteras y bifurcaciones de comunicación pueden confiar sin sacrificar la privacidad ante un operador central.

### APIs mejores para mensajeros reales

Los clientes necesitan un ordenamiento preciso de transacciones, marcas de tiempo en milisegundos y la capacidad de mostrar mensajes no confirmados mientras una conversación aún se propaga por la red. v0.10.0 introduce `timestampMs` para ordenar transacciones con subsegundos sin romper el campo existente `timestamp`. Los endpoints de listado ahora aceptan `?returnUnconfirmed=1` para incluir transacciones del mempool cuando corresponda. Un nuevo parámetro `includeDirectTransfers` reemplaza la peculiaridad heredada `withoutDirectTransfers`, permitiendo un filtrado de chat más limpio. El campo `count` ahora se devuelve como número en lugar de cadena, simplificando el análisis del cliente en todos los endpoints de listado.

### Red más rápida y resistente

Los nodos ahora pueden mantener conexiones WebSocket entre pares, no solo HTTP. Esto reduce la latencia en la propagación de bloques y transacciones y ofrece a los operadores mayor flexibilidad en cómo sus nodos participan en la malla. Combinado con una lógica de sincronización mejorada y un pool de transacciones reescrito, el nodo maneja condiciones de red ocupadas de manera más predecible.

### Herramientas para operadores que respetan tu tiempo

Ejecutar un nodo no debería requerir un conocimiento profundo de JavaScript heredado. v0.10.0 incluye scripts modernizados de instalación y reparación para Ubuntu/Debian y CentOS/RHEL, ayudantes de localnet para desarrolladores, anulaciones de configuración para despliegues escalonados y registro estructurado con rotación, para que los operadores puedan diagnosticar problemas eficazmente. La versión también documenta prácticas de apagado ordenado: un `kill -9` forzado en un nodo en funcionamiento puede corromper los espejos de estado en memoria, por lo que v0.10.0 hace explícito el procedimiento correcto de apagado en la documentación para operadores.

### Seguridad sin drama

Esta versión migra la criptografía a enlaces `sodium-native` y refuerza la admisión de transacciones P2P. Las verificaciones de marca de tiempo que ya protegían la API Pública ahora también se aplican cuando las transacciones llegan a través del intercambio entre pares ([#246](https://github.com/Adamant-im/adamant/pull/246)), eliminando un vector real de envenenamiento del pool sin afectar las rutas de repetición del consenso. La actualización de dependencias en múltiples fases reduce la exposición a problemas conocidos en el ecosistema de Node.js.

### ¿Deben actualizar los delegados y operadores de nodos?

Recomendado, no obligatorio. v0.10.0 no introduce una bifurcación de consenso obligatoria para redes que ya están sincronizadas y funcionando normalmente; el comportamiento del protocolo basado en altura sigue siendo controlado por configuración. Sin embargo, cryptofoundry recomienda a los delegados y operadores de nodos independientes que se actualicen cuando sea práctico. Los mensajeros y APIs más recientes esperan funciones de v0.10.0 como `timestampMs`, consultas no confirmadas y transporte WebSocket. Las mejoras en instalación y registro facilitan significativamente las operaciones posteriores al despliegue, y el endurecimiento de seguridad beneficia a toda la malla incluso cuando las reglas de consenso no cambian. Permanecer en versiones muy antiguas de nodos eventualmente significa soportar clientes solos y perderse el trabajo de confiabilidad que la comunidad incluye en lanzamientos como este.

### Aspectos técnicos destacados

El entorno de ejecución ahora requiere Node.js ≥ 22.13.0; se ha eliminado el soporte para Node 18. En el lado de la API, `timestampMs`, `returnUnconfirmed`, `includeDirectTransfers` y `count` numérico son las principales adiciones. La capa P2P gana transporte de pares mediante WebSocket y verificaciones de marca de tiempo en la ruta de intercambio. Las operaciones se benefician de scripts modernizados de instalación y reparación, ayudantes de localnet, escenarios de prueba en vivo y anulaciones de configuración. Las mejoras en la experiencia del desarrollador incluyen un archivo AGENTS.md, orientación ampliada en CONTRIBUTING y registro estructurado. Se han eliminado endpoints HTTP obsoletos, y docs.adamant.im es ahora la página principal de documentación.

Las notas estructuradas completas y la lista completa de PR están disponibles en [GitHub Release v0.10.0](https://github.com/Adamant-im/adamant/releases/tag/v0.10.0). Los operadores existentes deben revisar las notas de actualización, actualizar Node.js, extraer v0.10.0 y reiniciar ordenadamente. Los nuevos operadores deben usar los scripts oficiales de instalación desde la etiqueta de lanzamiento. Los desarrolladores deben consultar [CONTRIBUTING.md](https://github.com/Adamant-im/adamant/blob/master/.github/CONTRIBUTING.md) para pruebas en localnet y escenarios en vivo.

ADAMANT es infraestructura propiedad de la comunidad. Preguntas, problemas y contribuciones son bienvenidos en [github.com/Adamant-im/adamant](https://github.com/Adamant-im/adamant).

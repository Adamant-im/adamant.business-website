---
title: "ADAMANT Exchange Bot v3.0.0"
slug: "release-adamant-exchangebot-v3-0-0-397317563"
description: "ADAMANT Exchange Bot v3.0.0 es un lanzamiento importante que moderniza el entorno de ejecución, añade protecciones de seguridad de fondos y mejora la experiencia del operador."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0"
publishedAt: "2026-09-26T16:47:34Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
repo: "adamant-exchangebot"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-exchangebot:397317563"
locale: "es"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0 es un hito importante que presenta una modernización exhaustiva de la pila de ejecución, protecciones de seguridad de fondos de nivel de consenso, una cobertura de pruebas integral y mejoras en la usabilidad para el operador.

### Modernización del entorno de ejecución y la arquitectura

Los requisitos del motor se han actualizado a la versión LTS moderna de Node.js 22.13 o superior. Las dependencias heredadas `web3-eth` y `web3-utils` han sido reemplazadas por `ethers` v6 para la gestión de Ethereum y tokens ERC-20. La creación de transacciones para Bitcoin, Dash y Dogecoin se ha actualizado a BitcoinJS-lib 7 utilizando transacciones de Bitcoin parcialmente firmadas (PSBT). Las consultas a la base de datos se han modernizado con MongoDB Driver 7, adoptando la API asíncrona basada en promesas nativas y eliminando las devoluciones de llamada (callbacks) heredadas. La conectividad de nodos se ha migrado a `adamant-api` 3.x, utilizando `AdamantApi` y `WebSocketClient`. Los módulos y opciones de configuración heredados de Lisk (LSK) se han eliminado por completo. El proyecto ha adoptado la configuración plana de ESLint 9, Prettier 3, Jest 30 y markdownlint para una modernización de las herramientas.

### Concurrencia, seguimiento de depósitos y seguridad de fondos

Se ha introducido la monitorización de depósitos en el mempool con una ventana de disputa de cinco minutos para proteger contra condiciones de carrera y exploits de doble reclamación. Se ha implementado el bloqueo por UTXO para eliminar el gasto concurrente de monedas en cadenas de bloques basadas en UTXO, incluyendo BTC, DASH y DOGE. Las solicitudes entrantes de intercambio y cancelación ahora se serializan por remitente para evitar condiciones de carrera. Se ha añadido el reconocimiento automático y el procesamiento rápido para las transacciones Dash InstantSend. Se ha introducido un mecanismo de protección `unsupportedCoinGuard` para gestionar de forma segura las transferencias de monedas no admitidas y los fallos de transporte de red.

### Comandos de chat y experiencia del operador

Se ha añadido el comando de chat `/cancel` (también reconocido como `cancel`), que permite a los usuarios cancelar intercambios pendientes que esperan la aclaración de la moneda de destino y recibir reembolsos automáticos descontando la comisión de red. Los depósitos anteriores ahora se ponen automáticamente en cola para su reembolso cuando un usuario envía una nueva transferencia mientras se encuentra en `inUpdateState`. La utilidad `formatNumber` se ha mejorado para formatear números exponenciales (`e+` y `e-`) en una representación decimal completa legible por humanos. Se ha añadido soporte para el token ERC-20 Onyxcoin (XCN) en las configuraciones y en el registro de monedas.

### Configuración y resiliencia de nodos

Se ha implementado una validación de esquema pura en `configSchema.js` con comprobaciones de inicio rápido para detectar configuraciones no válidas de inmediato. Se ha construido un `nodeClient.js` resistente con equilibrio de carga round-robin y conmutación por error automática entre múltiples puntos finales RPC y REST. Se han añadido anulaciones granulares por moneda para comisiones, límites de confirmación, límites diarios en USD y rangos de precios.

### Pruebas y documentación

Se ha añadido un conjunto de pruebas integral de 31 suites de Jest que cubren 690 pruebas unitarias, abarcando ayudantes, adaptadores criptográficos, validación de esquemas de configuración y módulos de intercambio sin dependencias externas de red o base de datos. La documentación operativa se ha ampliado con un manual de agentes de IA `AGENTS.md`, `CONTRIBUTING.md` y un `README.md` modernizado.

### Cambios importantes (Breaking changes)

La versión mínima admitida de Node.js es ahora la 22.13, lo que requiere que los operadores actualicen su entorno de ejecución. Las bibliotecas heredadas `web3-eth` y `web3-utils` han sido reemplazadas por `ethers` v6, lo que puede afectar a cualquier integración personalizada que dependa de las API de la biblioteca de Ethereum anterior. La creación de transacciones de Bitcoin, Dash y Dogecoin ahora utiliza BitcoinJS-lib 7 con PSBT, lo que modifica el flujo interno de construcción de transacciones. MongoDB Driver 7 reemplaza al controlador anterior, eliminando los patrones de consulta basados en callbacks. Todos los módulos y opciones de configuración heredados de Lisk (LSK) han sido eliminados por completo, y los operadores con configuraciones relacionadas con LSK deberán eliminar dichas entradas. La validación estricta de esquemas ahora impone un inicio rápido, lo que significa que valores de configuración no válidos que antes se toleraban ahora provocarán que el bot se niegue a iniciar.

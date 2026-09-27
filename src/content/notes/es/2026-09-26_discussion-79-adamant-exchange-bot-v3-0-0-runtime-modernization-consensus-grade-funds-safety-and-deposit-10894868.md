---
title: "ADAMANT Exchange Bot v3.0.0: Modernización del entorno de ejecución y seguridad de fondos de grado de consenso"
slug: "discussion-79-adamant-exchange-bot-v3-0-0-runtime-modernization-consensus-grade-funds-safety-and-deposit-10894868"
description: "ADAMANT Exchange Bot es un software autohospedado para realizar intercambios de criptomonedas instantáneos y anónimos dentro de chats cifrados de ADAMANT Messenger."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/79"
publishedAt: "2026-09-26T17:12:03Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10894868"
locale: "es"
placeholder: false
---

ADAMANT Exchange Bot es un software autohospedado para realizar intercambios de criptomonedas instantáneos y anónimos dentro de chats cifrados de extremo a extremo en ADAMANT Messenger. Opera billeteras calientes (hot wallets) en Bitcoin, Ethereum, Dash, Dogecoin y ADAMANT sin custodios externos ni interfaces web expuestas. La versión 3.0.0 moderniza la pila de ejecución, migra la criptografía y la integración de blockchain a bibliotecas actuales, impone invariantes de seguridad de fondos de grado de consenso mediante bloqueo de UTXO y mutex a nivel de solicitud, y añade un observador de reclamaciones de depósitos externo con una ventana de disputa de 5 minutos. La auditoría de seguridad y el mantenimiento son gestionados por cryptofoundry en colaboración con la comunidad de desarrolladores de ADAMANT.

## Modernización de la pila y la arquitectura

El código base ahora apunta a Node.js 22.13+ LTS, con motores actualizados en `package.json` y restricciones en `.nvmrc`. Las interacciones con Ethereum y ERC-20 reemplazan completamente el legado de `web3-eth` y `web3-utils` con `ethers` v6, proporcionando llamadas a contratos deterministas, estimación precisa de gas y una gestión de nonce fiable. La construcción de transacciones para Bitcoin, Dash y Dogecoin migra a transacciones de Bitcoin parcialmente firmadas (PSBT) mediante `bitcoinjs-lib` 7, eliminando el obsoleto `TransactionBuilder`. Las consultas de MongoDB 7 a través de las colecciones `payments`, `incomingtxs` y `systems` utilizan async/await nativo basado en promesas, eliminando los patrones de callback. La integración del cliente de nodo se actualiza a `adamant-api` 3.x utilizando `AdamantApi` y `WebSocketClient` con asistentes modernos de derivación de claves. El soporte para Lisk (LSK) ha sido eliminado por completo, incluyendo las dependencias `@liskhq/*`, `lsk_utils.js`, `lskBaseCoin.js` y las opciones de configuración relacionadas. Las herramientas de desarrollo adoptan la configuración plana de ESLint 9, Prettier 3 y Jest 30.

## Garantías de concurrencia e invariantes de seguridad de fondos

La operación desatendida de un exchange exige una seguridad financiera de grado de consenso: las tasas, comisiones, decimales y saldos deben ser exactos, y los pagos o reembolsos deben permanecer estrictamente idempotentes.

En cadenas basadas en UTXO, los pagos o reembolsos concurrentes suponían anteriormente un riesgo de condiciones de carrera donde múltiples transacciones intentaban gastar las mismas salidas no gastadas. La v3.0.0 introduce un mutex de memoria asíncrono en `helpers/mutex.js` y `btcBaseCoin.js` que bloquea los UTXO seleccionados durante la creación y firma de PSBT. Los UTXO permanecen bloqueados hasta que se verifica la confirmación de la transmisión en la red. Si el ensamblaje o la transmisión de la transacción fallan, los UTXO bloqueados se liberan de forma segura al grupo disponible, evitando saldos bloqueados sin riesgo de doble gasto.

Los comandos de chat entrantes, los nuevos eventos de transferencia y las solicitudes de cancelación del mismo usuario se sincronizan mediante un bloqueo mutex por remitente en `incomingTxsParser.js`, eliminando condiciones de carrera cuando los usuarios envían transferencias simultáneas o activan reembolsos durante transiciones de estado. Cada registro de pago transita por estados deterministas (`inProcessing`, `needToSendBack`, `sent`, `refunded`) persistidos en MongoDB antes de la transmisión a la red. Si el bot se reinicia o pierde la conectividad a mitad de una transferencia, los pagos pendientes se reconcilian y reanudan sin riesgo de doble gasto.

## Observador de depósitos y ciclo de vida de reclamaciones

Los depósitos externos requieren correlacionar transacciones en cadena con identidades de chat de ADAMANT. `modules/depositWatcher.js` monitorea las transacciones entrantes y no confirmadas a través de la implementación de `getPendingIncomingTransactions` de cada adaptador, sin webhooks centralizados. `modules/depositClaims.js` rastrea las reclamaciones de depósitos a lo largo de su ciclo de vida para evitar reclamaciones duplicadas del mismo hash de transacción en cadena. Una ventana de disputa obligatoria de 5 minutos protege contra reorganizaciones de blockchain, ataques de carrera y exploits de doble reclamación antes de la ejecución del pago. `modules/deepExchangeValidator.js` verifica criptográficamente los depósitos contra los registros de direcciones del almacenamiento clave-valor (KVS) de ADAMANT del remitente, con lógica de caché y reintento automático.

## UX del exchange y mejoras en comandos de chat

Los usuarios que envían un depósito sin especificar un par de intercambio pueden emitir `/cancel` (o `cancel`) en el chat para cancelar el intercambio pendiente y recibir automáticamente el depósito de vuelta, menos la comisión de transacción de red. Si un usuario con un depósito en estado `inUpdateState` envía una transferencia posterior en lugar de aclarar la moneda de destino, el bot ahora pone en cola el depósito anterior para un reembolso automático en lugar de abandonarlo. El asistente `utils.formatNumber` fue refactorizado para expandir la notación científica (`e+` / `e-`) a cadenas decimales completas legibles por humanos antes de agrupar y poner en negrita los dígitos, corrigiendo espacios mal formados o artefactos de exponente en números de gran magnitud o tokens de alta precisión decimal. Se añadió soporte nativo de configuración y registro para el token ERC-20 Onyxcoin (XCN).

## Esquema de configuración y conmutación por error entre nodos

Los archivos de configuración (`config.jsonc`, `config.default.jsonc`) se validan estrictamente contra esquemas declarativos en `modules/configSchema.js` al inicio. Las claves faltantes, las criptomonedas desconocidas en `accepted_crypto` o las monedas configuradas sin nodos activan errores inmediatos de fallo rápido (fail-fast). El cliente resiliente de múltiples nodos en `helpers/cryptos/nodeClient.js` realiza automáticamente round-robin y conmutación por error de llamadas HTTP y JSON-RPC a través de los endpoints configurados, gestionando nodos de blockchain desconectados o desincronizados. Los operadores pueden especificar anulaciones por ticker para las comisiones de red (`exchange_fee_<COIN>`), confirmaciones requeridas (`min_confirmations_<COIN>`), límites de volumen diario en USD (`daily_limit_usd_<COIN>`) y límites de precio (`fixed_buy_price_usd_<COIN>`, `min_sell_price_usd_<COIN>`).

## Pruebas y manual de operación con IA

El conjunto de pruebas comprende 31 suites de Jest y 690 pruebas unitarias que cubren los módulos principales del exchange, adaptadores de criptomonedas, esquemas de configuración y utilidades sin necesidad de nodos en vivo, MongoDB o claves privadas reales. Las convenciones del repositorio, la arquitectura técnica, las directrices de invariantes y las reglas de disciplina de cambios están formalizadas en `AGENTS.md`.

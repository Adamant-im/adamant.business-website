---
title: "Conozca adamant-api 3.0: un SDK moderno para el nodo moderno de ADAMANT"
slug: "meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
description: "El SDK JavaScript/TypeScript adamant-api lanza la versión 3.0.0, diseñado para funcionar con ADAMANT Node v0.10.0. Incluye timestamps en milisegundos, consultas más ricas y más."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
publishedAt: "2026-06-21T15:54:25.436Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3d13a9eaca0e/001-0-hkmpiqt1p-ubpghb.webp"
cardSpan: "full"
originalId: "medium:3d13a9eaca0e"
locale: "es"
placeholder: false
---

El SDK `adamant-api` JavaScript/TypeScript ha lanzado la versión 3.0.0, diseñado para funcionar perfectamente con ADAMANT Node v0.10.0. Esta versión introduce timestamps en milisegundos, parámetros de consulta más completos, respuestas consolidadas del estado del nodo y filtrado inclusivo por versión mínima. El SDK ofrece verificaciones automáticas de estado, reintentos, failover, respuestas tipadas, mensajería cifrada y suscripciones WebSocket en tiempo real.

ADAMANT es un mensajero cifrado de extremo a extremo basado en blockchain, con una billetera cripto integrada que no requiere número de teléfono ni servidor central. El SDK `adamant-api` abstrae la red en llamadas de función limpias, permitiendo a los desarrolladores crear bots descentralizados, huchas de propinas y billeteras donde los usuarios poseen su identidad y fondos.

### Novedades en la versión 3.0

Los objetos de transferencia de datos (DTO) de la API del SDK se regeneran a partir de una revisión fija de `adamant-schema`, asegurando tipado correcto para timestamps en milisegundos, datos de loader/estado y campos de transacciones no confirmadas que pueden ser nulos. Las capacidades de consulta ahora incluyen `returnUnconfirmed`, `includeDirectTransfers`, búsqueda de delegados por dirección y consultas de transacciones de múltiples tipos. Los filtros de transacción se combinan con lógica `and` por defecto, y los filtros de monto solo se aplican a transacciones de transferencia. Está disponible la construcción opcional de `timestampMs` y `getEpochTimeMs()`, aunque `timestampMs` no forma parte de los bytes firmados, dejando los hashes, IDs y firmas sin cambios.

Las mejoras de confiabilidad incluyen la detención de bucles de reintento para POST explícitamente rechazados, devolviendo errores estructurados no reintentables. Los reintentos y el failover por nodo activo se mantienen para solicitudes seguras y fallos de red. La selección de nodos con conocimiento de altura y el filtrado inclusivo por `minVersion` garantizan la comunicación con nodos saludables y actualizados.

Un cliente WebSocket real permite suscribirse a múltiples direcciones, tipos de transacciones y tipos de activos de chat sobre una única conexión. Incluye errores de conexión tipados, callbacks de reconexión, `connect()`/`disconnect()` explícitos, limpieza de escuchas y reconexión acotada.

El paquete ahora es modular por diseño. El paquete raíz se mantiene enfocado en ADM, mientras que las exportaciones por subruta proporcionan acceso a DTOs de API, transacciones, metadatos y ayudantes para BTC/ETH/DASH/DOGE tanto para CommonJS como para ESM. Los metadatos de monedas son deterministas y fijos desde `adamant-wallets`. La documentación se ha trasladado a un sitio controlado por versiones con VitePress + TypeDoc.

![Conozca adamant-api 3.0 — un SDK moderno para el nodo moderno de ADAMANT](/images/engineering-notes/medium/3d13a9eaca0e/002-0-bato9yeonu3b9-oz.webp)

### Inicio rápido

Instale el paquete e inicialice el cliente con una lista de nodos. Las verificaciones de estado, reintentos y failover se gestionan automáticamente.

```javascript
import {AdamantApi} from 'adamant-api';

const api = new AdamantApi({
  nodes: [
    'https://endless.adamant.im',
    'https://clown.adamant.im',
    'https://lake.adamant.im',
  ],
  checkHealthAtStartup: true,
  minVersion: '0.10.0', // inclusive — older nodes are excluded automatically
});

api.onReady(async () => {
  const response = await api.getBlocks();
  if (response.success) {
    console.log(response.blocks);
  } else {
    console.error(response.errorMessage);
  }
});
```

### Casos de uso

Puede crear un bot de chat descentralizado que supervise cuentas en tiempo real y responda a mensajes cifrados. El cifrado de extremo a extremo está integrado; el bot descifra los mensajes con su propia frase de acceso, y el servidor nunca almacena texto plano.

```javascript
import {AdamantApi, WebSocketClient, decodeMessage} from 'adamant-api';
import {config} from './config.js';

const api = new AdamantApi({nodes: config.nodes});

const ws = new WebSocketClient({
  admAddress: config.address,
  direction: 'incoming', // only messages sent *to* the bot
});
api.initSocket(ws);

ws.onMessage(async (tx) => {
  const text = decodeMessage(
    tx.asset.chat.message,
    tx.senderPublicKey,
    config.passphrase,
    tx.asset.chat.own_message,
  );

  if (text.trim() === '/ping') {
    await api.sendMessage(config.passphrase, tx.senderId, 'pong 🏓');
  }
});
```

Para una hucha de propinas cripto o un bot de pagos, puede reaccionar a transferencias entrantes de tokens y devolver tokens. Una única conexión WebSocket también puede supervisar muchas direcciones y filtrar por tipo, lo cual es útil para la ingesta de exchanges o paneles contables.

Si necesita una billetera ligera multi-cripto, puede derivar direcciones de BTC, ETH, DASH o DOGE a partir de la misma frase de acceso de ADAMANT sin tener que incluir múltiples stacks cripto en su bot solo para ADM. Importe exactamente lo que necesite mediante exportaciones por subruta para mantener pequeños los paquetes sin servidor.

```javascript
import {eth} from 'adamant-api/coins/eth';
import {btc} from 'adamant-api/coins/btc';

const {address: ethAddress} = eth.keys(process.env.PASSPHRASE);
const {address: btcAddress} = btc.keys(process.env.PASSPHRASE);

console.log({ethAddress, btcAddress});
```

### Migración desde la versión 2.x

Para migrar, actualice Node a la versión 22 o superior en su entorno de ejecución y CI. Revise la dirección del WebSocket, agregando `direction: 'incoming'` si su aplicación asumía solo entrantes. Actualice las importaciones de monedas a `adamant-api/coins/*`, elimine las rutas de código Lisk/Klayr y vuelva a verificar los filtros de consulta por el nuevo valor predeterminado lógico `and`, reemplazando `withoutDirectTransfers` por `includeDirectTransfers`. La firma, los IDs de transacciones y las importaciones CommonJS/ESM permanecen sin cambios.

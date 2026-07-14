---
title: "Indexador (herramienta EthSync) para Ethereum actualizado con índices adicionales"
slug: "indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
description: "Los nodos de Ethereum ofrecen APIs RPC, pero no permiten obtener fácilmente una lista de transacciones por dirección, algo común en exploradores de bloques."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
publishedAt: "2023-09-22T14:36:48.398Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/f828f2b7fdf6/001-0-2atpoq1jvo6rdiry.webp"
cardSpan: "full"
originalId: "medium:f828f2b7fdf6"
locale: "es"
placeholder: false
---

Los nodos de Ethereum proporcionan APIs RPC para muchas operaciones, pero carecen de una forma nativa para recuperar fácilmente una lista de transacciones por dirección, una funcionalidad comúnmente esperada en exploradores de bloques como Etherscan. Para solucionar esto, ADAMANT mantiene un Indexador especializado basado en Python, conocido como la herramienta EthSync, que permite consultar de forma eficiente transacciones ETH y ERC20 por dirección.

El Indexador funciona como un servicio en segundo plano que se conecta a nodos de Ethereum mediante APIs HTTP, WS o IPC, y es compatible con clientes populares como Geth y Nethermind. Los datos de transacciones recopilados se almacenan en una base de datos Postgres para garantizar durabilidad y acceso rápido, y una API PostgREST expone estos datos a aplicaciones cliente.

![Indexador (herramienta EthSync) para Ethereum actualizado con índices adicionales](/images/engineering-notes/medium/f828f2b7fdf6/002-0-9zuzrclpitfvpafs.webp)

Una mejora importante en esta versión es la introducción de índices adicionales en la base de datos. Estos índices mejoran drásticamente el rendimiento de consultas complejas, como filtrar transacciones solo de Ethereum o de tokens específicos asociados a una dirección. Por ejemplo, recuperar las últimas 25 transacciones de USDT para una dirección específica puede realizarse mediante la siguiente solicitud a la API:

```bash
curl -k -X GET “http://localhost:3000/ethtxs?and=(txto.eq.0xdac17f958d2ee523a2206206994597c13d831ec7,or(txfrom.eq.0xabfDF505fFd5587D9E7707dFB47F45AF1f03E275,contract_to.eq.000000000000000000000000abfDF505fFd5587D9E7707dFB47F45AF1f03E275))&order=time.desc&limit=25"
```

En pruebas, la mayoría de las consultas que utilizan estos nuevos índices se ejecutan en menos de 100 milisegundos, una mejora sustancial frente a los decenas de segundos necesarios sin ellos.

---
title: "Herramienta EthSync v2.1: Actualización del indexador de transacciones Ethereum"
slug: "ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
description: "La herramienta EthSync indexa transacciones Ethereum y ERC20 por dirección, ofreciendo historial de billetera similar a exploradores de bloques como Etherscan."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
publishedAt: "2022-07-06T15:40:23.802Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:6a4f00964d64"
locale: "es"
placeholder: false
---

La herramienta EthSync indexa transacciones Ethereum y ERC20 por dirección, ofreciendo un historial de billetera similar al de exploradores de bloques como Etherscan. Se ejecuta como un servicio en segundo plano que se conecta a un nodo Ethereum mediante APIs HTTP, WebSocket o IPC, compatible con Geth, Nethermind y otros nodos estándar, almacena todas las transacciones en una base de datos Postgres y expone los datos de transacción a través de una API basada en postgrest.

La versión 2.1 incluye varias mejoras. El script ahora recupera todos los datos de las transacciones en una sola solicitud al nodo Ethereum, realizando solo una solicitud adicional por transacción para obtener su estado, lo que reduce significativamente la carga en el nodo. El registro de eventos (logging) se ha ampliado, y una nueva variable de entorno `LOG_FILE` permite a los operadores especificar una ruta opcional para la salida de registros; si no se establece, la herramienta utiliza `StreamHandler`.

Esta versión también corrige problemas con las conexiones IPC y de base de datos que afectaban a versiones anteriores. Se incluyen dos nuevos scripts de prueba: `ethtest.py`, que verifica la conectividad con el nodo Ethereum, y `pgtest.py`, que comprueba la conexión con la base de datos Postgres, facilitando así la solución de problemas durante la implementación.

La herramienta EthSync forma parte del proyecto de código abierto ADAMANT y está disponible gratuitamente. La documentación completa, instrucciones de instalación y ejemplos de uso se encuentran en el [Readme](https://github.com/Adamant-im/ETH-transactions-storage#indexer-for-ethereum-to-get-transaction-list-by-eth-address) del proyecto.

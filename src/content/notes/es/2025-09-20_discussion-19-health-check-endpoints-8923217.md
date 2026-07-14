---
title: "Comprobación de Salud: Puntos de Acceso"
slug: "discussion-19-health-check-endpoints-8923217"
description: "Ver también: Comprobación de Salud: Algoritmo, Descripción General. Para la comprobación de salud, recibimos la altura actual del nodo o la marca de tiempo de actualización de un servicio."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/19"
publishedAt: "2025-09-20T16:14:17Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923217"
locale: "es"
placeholder: false
---

Ver también: [Comprobación de Salud: Algoritmo, Descripción General](https://github.com/orgs/Adamant-im/discussions/17)

Para la comprobación de salud, recibimos la altura actual del nodo o la marca de tiempo de actualización de un servicio. Recibir la versión del nodo es opcional y solo se realiza si no se requieren solicitudes adicionales.

## Puntos de Acceso para la Comprobación de Salud de Nodos y Servicios

| **Nodo o Servicio** | **Punto de Acceso para Comprobación de Salud** | **Comentarios** |
|---|---|---|
| **adm-node** (sin servicio/indexador) | `https://endless.adamant.im/api/node/status` | Incluye versión del nodo |
| **Servicio Currencyinfo** | `https://info.adamant.im/status` | Incluye versión del software |
| **btc-node** | Solicitud RPC única que combina `getblockchaininfo` y `getnetworkinfo` | Incluye versión del nodo |
| **btc-indexer** | `https://btcnode2.adamant.im/blocks/tip/height` | No hay punto de acceso para obtener la versión del Indexer |
| **eth-node** | Solicitud RPC única que combina `eth_blockNumber` y `web3_clientVersion` | Incluye versión del nodo |
| **eth-indexer** | `https://ethnode3.adamant.im/max_block` | Incluye versión del software |
| **doge-node** | Solicitud RPC única que combina `getblockchaininfo` y `getnetworkinfo` | Incluye versión del nodo |
| **doge-indexer** | `https://dogenode1.adamant.im/api/status` | Incluye versión del nodo (no del servicio/indexador) |
| **dash-node** (sin servicio/indexador) | RPC `getStatus` (combinar `getnetworkinfo` para la versión + `getblockchaininfo` para la altura) | Incluye versión del nodo |
| **lsk-node** (kly-node) | RPC `system_getNodeInfo` | Incluye versión del nodo |
| **lsk-service** (kly-service) | `https://klyservice2.adamant.im/api/v3/network/status` | Incluye versión del nodo (no del servicio/indexador) |
| **ipfs-node** | `https://ipfs4.adm.im/api/node/info` | Incluye versión del nodo; información adicional de IPFS para comprobación de salud en curso |

Para los nodos BTC y Doge, una única llamada RPC agrupada recupera tanto la información de la cadena de bloques como la de red, evitando un viaje adicional. Un ejemplo de solicitud BTC:

```
curl --data-binary '[{"jsonrpc":"1.0","id":"curltext1","method":"getblockchaininfo","params":[]}, {"jsonrpc":"1.0","id":"curltext2","method":"getnetworkinfo","params":[]}]' -H 'content-type:text/plain;' https://dogenode1.adamant.im
```

Para los nodos ETH, la llamada agrupada análoga combina `eth_blockNumber` y `web3_clientVersion`:

```
curl --data '[{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}, {"method":"web3_clientVersion","params":[],"id":2,"jsonrpc":"2.0"}]' -H "Content-Type: application/json" -X POST localhost:8545
```

La respuesta de ETH devuelve el número de bloque como un valor hexadecimal y la cadena de versión del cliente, por ejemplo `Geth/v1.13.5-stable-916d6a44/linux-amd64/go1.21.4`. Los nombres de los clientes generalmente siguen el patrón `Geth/v1.13.5` o `Nethermind/v1.22.0`.

Tenga en cuenta que algunos indexadores exponen solo la altura o el estado sin un punto de acceso para la versión, y en el caso de los servicios Doge y LSK, la versión devuelta refleja el nodo subyacente y no el software del indexador o del servicio en sí.

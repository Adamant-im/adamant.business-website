---
title: "Health Check: Endpunkte"
slug: "discussion-19-health-check-endpoints-8923217"
description: "Siehe auch: Health Check: Algorithmus, Allgemeine Beschreibung. Für den Health Check wird die aktuelle Knotenhöhe oder Zeitstempelaktualisierung empfangen. Die Knotenversion wird optional abgerufen."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/19"
publishedAt: "2025-09-20T16:14:17Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923217"
locale: "de"
placeholder: false
---

Siehe auch: [Health Check: Algorithmus, Allgemeine Beschreibung](https://github.com/orgs/Adamant-im/discussions/17)

Für den Health Check wird die aktuelle Knotenhöhe oder der Aktualisierungszeitstempel eines Dienstes empfangen. Der Empfang der Knotenversion ist optional und erfolgt nur, wenn keine zusätzlichen Anfragen erforderlich sind.

## Endpunkte für den Health Check von Knoten und Diensten

| **Knoten oder Dienst** | **Health-Check-Endpunkt** | **Kommentare** |
|---|---|---|
| **adm-node** (kein Dienst/Indexer) | `https://endless.adamant.im/api/node/status` | Beinhaltet Knotenversion |
| **Currencyinfo-Dienst** | `https://info.adamant.im/status` | Beinhaltet Softwareversion |
| **btc-node** | Einzelne RPC-Anfrage, kombiniert `getblockchaininfo` und `getnetworkinfo` | Beinhaltet Knotenversion |
| **btc-indexer** | `https://btcnode2.adamant.im/blocks/tip/height` | Kein Endpunkt zur Abrufung der Indexer-Version |
| **eth-node** | Einzelne RPC-Anfrage, kombiniert `eth_blockNumber` und `web3_clientVersion` | Beinhaltet Knotenversion |
| **eth-indexer** | `https://ethnode3.adamant.im/max_block` | Beinhaltet Softwareversion |
| **doge-node** | Einzelne RPC-Anfrage, kombiniert `getblockchaininfo` und `getnetworkinfo` | Beinhaltet Knotenversion |
| **doge-indexer** | `https://dogenode1.adamant.im/api/status` | Beinhaltet Knotenversion (nicht Dienst-/Indexer-Version) |
| **dash-node** (kein Dienst/Indexer) | `getStatus` RPC (kombiniert `getnetworkinfo` für Version + `getblockchaininfo` für Höhe) | Beinhaltet Knotenversion |
| **lsk-node** (kly-node) | `system_getNodeInfo` RPC | Beinhaltet Knotenversion |
| **lsk-service** (kly-service) | `https://klyservice2.adamant.im/api/v3/network/status` | Beinhaltet Knotenversion (nicht Dienst-/Indexer-Softwareversion) |
| **ipfs-node** | `https://ipfs4.adm.im/api/node/info` | Beinhaltet Knotenversion; zusätzliche IPFS-Informationen für Health Check in Arbeit |

Für BTC- und Doge-Knoten ruft ein einziger batched RPC-Aufruf sowohl Blockchain- als auch Netzwerkinformationen ab, wodurch ein zusätzlicher Roundtrip vermieden wird. Beispielhafte BTC-Anfrage:

```
curl --data-binary '[{"jsonrpc":"1.0","id":"curltext1","method":"getblockchaininfo","params":[]}, {"jsonrpc":"1.0","id":"curltext2","method":"getnetworkinfo","params":[]}]' -H 'content-type:text/plain;' https://dogenode1.adamant.im
```

Für ETH-Knoten kombiniert der analoge batched Aufruf `eth_blockNumber` und `web3_clientVersion`:

```
curl --data '[{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}, {"method":"web3_clientVersion","params":[],"id":2,"jsonrpc":"2.0"}]' -H "Content-Type: application/json" -X POST localhost:8545
```

Die ETH-Antwort liefert die Blocknummer als Hex-Wert und die Client-Versionszeichenfolge, beispielsweise `Geth/v1.13.5-stable-916d6a44/linux-amd64/go1.21.4`. Client-Namen folgen im Allgemeinen dem Muster `Geth/v1.13.5` oder `Nethermind/v1.22.0`.

Beachten Sie, dass einige Indexer nur Höhe oder Status ohne Versionsendpunkt bereitstellen, und im Fall der Doge- und LSK-Dienste die zurückgegebene Version den zugrundeliegenden Knoten widerspiegelt, nicht die Indexer- oder Dienstsoftware selbst.

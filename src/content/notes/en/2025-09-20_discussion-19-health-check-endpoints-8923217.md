---
title: "Health Check: Endpoints"
slug: "discussion-19-health-check-endpoints-8923217"
description: "See also: Health Check: Algorithm, General Description For the health check, we receive the current node height or the update timestamp for a service. Receiving the node version…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/19"
publishedAt: "2025-09-20T16:14:17Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923217"
locale: "en"
placeholder: false
---

See also: [Health Check: Algorithm, General Description](https://github.com/orgs/Adamant-im/discussions/17)

For the health check, we receive the current node height or the update timestamp for a service. Receiving the node version is optional and is done only if no additional requests are required.

## Node and Service Health Check Endpoints

| **Node or Service** | **Health Check Endpoint** | **Comments** |
|---|---|---|
| **adm-node** (no service/indexer) | `https://endless.adamant.im/api/node/status` | Includes node version |
| **Currencyinfo service** | `https://info.adamant.im/status` | Includes software version |
| **btc-node** | Single RPC request combining `getblockchaininfo` and `getnetworkinfo` | Includes node version |
| **btc-indexer** | `https://btcnode2.adamant.im/blocks/tip/height` | No endpoint to get Indexer's version |
| **eth-node** | Single RPC request combining `eth_blockNumber` and `web3_clientVersion` | Includes node version |
| **eth-indexer** | `https://ethnode3.adamant.im/max_block` | Includes software version |
| **doge-node** | Single RPC request combining `getblockchaininfo` and `getnetworkinfo` | Includes node version |
| **doge-indexer** | `https://dogenode1.adamant.im/api/status` | Includes node (not service/indexer) version |
| **dash-node** (no service/indexer) | `getStatus` RPC (combine `getnetworkinfo` for version + `getblockchaininfo` for height) | Includes node version |
| **lsk-node** (kly-node) | `system_getNodeInfo` RPC | Includes node version |
| **lsk-service** (kly-service) | `https://klyservice2.adamant.im/api/v3/network/status` | Includes node (not service/indexer) version |
| **ipfs-node** | `https://ipfs4.adm.im/api/node/info` | Includes node version; additional IPFS info for health check in progress |

For BTC and Doge nodes, a single batched RPC call retrieves both blockchain info and network info, avoiding an extra round trip. An example BTC request:

```
curl --data-binary '[{"jsonrpc":"1.0","id":"curltext1","method":"getblockchaininfo","params":[]}, {"jsonrpc":"1.0","id":"curltext2","method":"getnetworkinfo","params":[]}]' -H 'content-type:text/plain;' https://dogenode1.adamant.im
```

For ETH nodes, the analogous batched call combines `eth_blockNumber` and `web3_clientVersion`:

```
curl --data '[{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}, {"method":"web3_clientVersion","params":[],"id":2,"jsonrpc":"2.0"}]' -H "Content-Type: application/json" -X POST localhost:8545
```

The ETH response returns the block number as a hex value and the client version string, for example `Geth/v1.13.5-stable-916d6a44/linux-amd64/go1.21.4`. Client names generally follow the pattern `Geth/v1.13.5` or `Nethermind/v1.22.0`.

Note that some indexers expose only height or status without a version endpoint, and in the case of the Doge and LSK services the returned version reflects the underlying node rather than the indexer or service software itself.

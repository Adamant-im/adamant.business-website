---
title: "健康检查：端点"
slug: "discussion-19-health-check-endpoints-8923217"
description: "另见：健康检查：算法与通用说明。对于健康检查，我们获取当前节点高度或服务的更新时间戳。获取节点版本是可选的，仅在无需额外请求时进行。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/19"
publishedAt: "2025-09-20T16:14:17Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923217"
locale: "zh"
placeholder: false
---

另见：[健康检查：算法与通用说明](https://github.com/orgs/Adamant-im/discussions/17)

对于健康检查，我们获取当前节点高度或服务的更新时间戳。获取节点版本是可选的，仅在无需额外请求时进行。

## 节点和服务健康检查端点

| **节点或服务** | **健康检查端点** | **备注** |
|---|---|---|
| **adm-node** (无服务/indexer) | `https://endless.adamant.im/api/node/status` | 包含节点版本 |
| **Currencyinfo 服务** | `https://info.adamant.im/status` | 包含软件版本 |
| **btc-node** | 组合 `getblockchaininfo` 和 `getnetworkinfo` 的单个 RPC 请求 | 包含节点版本 |
| **btc-indexer** | `https://btcnode2.adamant.im/blocks/tip/height` | 无获取 Indexer 版本的端点 |
| **eth-node** | 组合 `eth_blockNumber` 和 `web3_clientVersion` 的单个 RPC 请求 | 包含节点版本 |
| **eth-indexer** | `https://ethnode3.adamant.im/max_block` | 包含软件版本 |
| **doge-node** | 组合 `getblockchaininfo` 和 `getnetworkinfo` 的单个 RPC 请求 | 包含节点版本 |
| **doge-indexer** | `https://dogenode1.adamant.im/api/status` | 包含节点（而非服务/indexer）版本 |
| **dash-node** (无服务/indexer) | `getStatus` RPC（组合 `getnetworkinfo` 获取版本 + `getblockchaininfo` 获取高度） | 包含节点版本 |
| **lsk-node** (kly-node) | `system_getNodeInfo` RPC | 包含节点版本 |
| **lsk-service** (kly-service) | `https://klyservice2.adamant.im/api/v3/network/status` | 包含节点（而非服务/indexer）版本 |
| **ipfs-node** | `https://ipfs4.adm.im/api/node/info` | 包含节点版本；健康检查中正在进行额外的 IPFS 信息获取 |

对于 BTC 和 Doge 节点，单个批处理的 RPC 调用即可获取区块链信息和网络信息，避免了额外的往返请求。示例 BTC 请求：

```
curl --data-binary '[{"jsonrpc":"1.0","id":"curltext1","method":"getblockchaininfo","params":[]}, {"jsonrpc":"1.0","id":"curltext2","method":"getnetworkinfo","params":[]}]' -H 'content-type:text/plain;' https://dogenode1.adamant.im
```

对于 ETH 节点，类似的批处理调用组合 `eth_blockNumber` 和 `web3_clientVersion`：

```
curl --data '[{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}, {"method":"web3_clientVersion","params":[],"id":2,"jsonrpc":"2.0"}]' -H "Content-Type: application/json" -X POST localhost:8545
```

ETH 响应以十六进制形式返回区块编号以及客户端版本字符串，例如 `Geth/v1.13.5-stable-916d6a44/linux-amd64/go1.21.4`。客户端名称通常遵循 `Geth/v1.13.5` 或 `Nethermind/v1.22.0` 的格式。

请注意，某些索引器仅暴露高度或状态，没有版本端点；而对于 Doge 和 LSK 服务，返回的版本反映的是底层节点，而非索引器或服务软件本身。

---
title: "用于以太坊的索引器（EthSync 工具）已通过附加索引更新"
slug: "indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
description: "以太坊节点提供 RPC API 支持多种操作，但缺乏按地址轻松检索交易列表的功能，而此类功能在 Etherscan 等区块浏览器中很常见。"
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
locale: "zh"
placeholder: false
---

以太坊节点为许多操作提供了 RPC API，但缺少一种原生方式来轻松按地址检索交易列表，而这是用户对 Etherscan 等区块浏览器普遍期待的功能。为解决此问题，ADAMANT 维护了一个基于 Python 的专用索引器，称为 EthSync 工具，它能够高效地按地址查询 ETH 和 ERC20 交易。

索引器作为后台服务运行，通过 HTTP、WS 或 IPC API 连接到以太坊节点，并与 Geth 和 Nethermind 等主流客户端兼容。收集到的交易数据存储在 Postgres 数据库中，以确保数据持久性和快速访问，同时通过 PostgREST API 将数据暴露给客户端应用。

![用于以太坊的索引器（EthSync 工具）已通过附加索引更新](/images/engineering-notes/medium/f828f2b7fdf6/002-0-9zuzrclpitfvpafs.webp)

本版本的一项重要升级是引入了额外的数据库索引。这些索引显著提升了复杂查询的性能，例如筛选特定地址相关的仅以太坊交易或特定代币交易。例如，使用以下 API 请求即可获取某个特定地址最近的 25 笔 USDT 交易：

```bash
curl -k -X GET “http://localhost:3000/ethtxs?and=(txto.eq.0xdac17f958d2ee523a2206206994597c13d831ec7,or(txfrom.eq.0xabfDF505fFd5587D9E7707dFB47F45AF1f03E275,contract_to.eq.000000000000000000000000abfDF505fFd5587D9E7707dFB47F45AF1f03E275))&order=time.desc&limit=25"
```

在测试中，大多数利用这些新索引的查询执行时间低于 100 毫秒，相比此前所需的数十秒有了显著改进。

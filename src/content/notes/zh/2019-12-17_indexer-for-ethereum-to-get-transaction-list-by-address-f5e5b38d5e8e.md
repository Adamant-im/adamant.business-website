---
title: "用于通过地址获取以太坊交易列表的索引器"
slug: "indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
description: "以太坊节点不原生支持按地址获取交易列表。eth listTransactions 方法长期被请求，但未列入以太坊路线图。ADAMANT 团队为此构建了开源索引器。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
publishedAt: "2019-12-17T09:47:40.803Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f5e5b38d5e8e/001-1-joo929ftoejwheza0gd8ka-png.webp"
cardSpan: "full"
originalId: "medium:f5e5b38d5e8e"
locale: "zh"
placeholder: false
---

以太坊节点不原生支持按指定地址获取交易列表。`eth_listTransactions` 方法已被长期请求，但并未列入以太坊的开发路线图，这使得应用开发者——如消息应用、区块浏览器、钱包——不得不自行构建索引层。

ADAMANT 团队开发了一个免费的开源 [Ethereum Transaction Indexer](https://github.com/Adamant-im/ETH-transactions-storage) 来填补这一空白。该索引器使用 Python 编写，作为后台服务运行，连接到以太坊节点（已在 geth 和 parity 上测试），通过 JSON RPC 获取交易，并将其（包括智能合约交易）存储在 Postgres 数据库中。再通过 Postgrest 提供 RESTful API 层，支持按地址查询，功能类似于 Etherscan 提供的服务。

### 工作原理

索引器从您指定的区块高度开始存储交易，默认每 20 秒轮询一次新区块（间隔可配置）。索引填充完成后，您可以通过 Postgrest 按地址查询交易。例如，以下请求将返回与地址 `0x6b924750e56a674a2ad01fbf09c7c9012f16f094` 相关的最近 25 笔交易，并按时间戳排序：

```
curl -k -X GET "http://localhost:3000/?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25"
```

完整 API 参考请查阅 [Postgrest 文档](https://postgrest.org/en/v5.2/api.html)。

### 部署

索引器运行于 Linux 系统（已在 Ubuntu 16 和 18 上测试）。您需要一个已同步的 geth 或 parity 节点，以及 Python、Postgresql、Postgrest 和 nginx。您可以直接运行索引器，或作为守护进程运行：

```
python3.6 you/path/to/script/ethsync.py <yourDB>
```

索引过程需要时间。要检查进度，可查询最后索引的区块，并与您节点的最新区块进行比较：

```
psql -d index -c 'SELECT MAX(block) FROM ethtxs;'
```

详细的安装和配置说明请参见 [代码仓库](https://github.com/Adamant-im/ETH-transactions-storage)。

### 公共 API

Postgrest 将 API 发布在本地端口上。如需对外公开，需配置 nginx 将请求代理至 Postgrest：

```
location /ethtxs {
    proxy_pass http://127.0.0.1:3000;
}

location /aval {
    proxy_pass http://127.0.0.1:3000;
}
```

这将提供两个端点：`/ethtxs` 用于按地址获取以太坊交易，`/aval` 用于查询服务状态。

### 实例演示

ADAMANT 节点上已部署了一个运行实例。在浏览器中打开以下 URL 可获取示例地址的最近交易：

```
https://ethnode1.adamant.im/ethtxs?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25
```

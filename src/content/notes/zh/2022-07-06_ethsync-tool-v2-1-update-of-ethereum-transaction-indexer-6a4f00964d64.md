---
title: "EthSync 工具 v2.1：以太坊交易索引器更新"
slug: "ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
description: "EthSync 工具通过地址索引以太坊和 ERC20 交易，提供类似 Etherscan 等区块浏览器的钱包历史记录。它作为后台服务运行，连接以太坊节点……"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
publishedAt: "2022-07-06T15:40:23.802Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:6a4f00964d64"
locale: "zh"
placeholder: false
---

EthSync 工具通过地址索引以太坊和 ERC20 交易，提供类似区块浏览器（如 Etherscan）的钱包历史记录。它作为后台服务运行，通过 HTTP、WebSocket 或 IPC API 连接到以太坊节点——兼容 Geth、Nethermind 和其他标准节点——将所有交易存储在 Postgres 数据库中，并通过 postgrest 驱动的 API 暴露交易数据。

版本 2.1 带来了多项改进。脚本现在通过单个请求从以太坊节点获取全部交易数据，每笔交易仅额外发起一次请求以获取其状态，显著降低了节点负载。日志功能已扩展，新增 `LOG_FILE` 环境变量，使运维人员可指定日志输出的可选文件路径；未设置时，工具将回退至 `StreamHandler`。

此版本还修复了影响早期版本的 IPC 和数据库连接问题。新增两个测试脚本：`ethtest.py` 用于验证与以太坊节点的连接，`pgtest.py` 用于检查 Postgres 数据库连接，使部署故障排查更加简便。

EthSync 工具是 ADAMANT 开源项目的一部分，可免费使用。完整文档、安装说明和使用示例见项目 [Readme](https://github.com/Adamant-im/ETH-transactions-storage#indexer-for-ethereum-to-get-transaction-list-by-eth-address)。

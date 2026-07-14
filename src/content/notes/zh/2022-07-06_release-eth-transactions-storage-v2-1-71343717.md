---
title: "ADAMANT ETH Transactions Storage v2.1"
slug: "release-eth-transactions-storage-v2-1-71343717"
description: "此维护版本减少了对以太坊节点的请求次数，并增强了应用日志记录，修复了IPC和数据库连接问题，提高了整体可靠性。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.1"
publishedAt: "2022-07-06T08:00:44Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "ETH-transactions-storage"
tag: "v2.1"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:71343717"
locale: "zh"
placeholder: false
---

此 ETH-transactions-storage 工具的维护版本减少了对以太坊节点的请求数量，并在整个应用中增加了更多日志记录。它修复了与以太坊节点的 IPC 连接以及数据库连接，提升了整体可靠性。

新增了一个 `LOG_FILE` 环境变量，允许运维人员配置日志输出的写入位置。现在还包含两个辅助脚本：用于测试以太坊节点连接的 `ethtest.py` 和用于测试 PostgreSQL 数据库连接的 `pgtest.py`。这些脚本使得在部署期间诊断连接问题变得更加容易。

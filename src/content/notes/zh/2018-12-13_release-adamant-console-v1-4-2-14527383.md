---
title: "ADAMANT Console v1.4.2"
slug: "release-adamant-console-v1-4-2-14527383"
description: "此版本的 ADAMANT Console 引入了新的 get blocks 命令，并添加了多个 JSON-RPC 方法：getBlocks、getTransactionsInBlockByHeight 和 getTransactionsInBlockById。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.4.2"
publishedAt: "2018-12-13T22:26:43Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.4.2"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:14527383"
locale: "zh"
placeholder: false
---

此版本的 ADAMANT Console 引入了一个新的 `get blocks` 命令，并添加了多个 JSON-RPC 方法：`getBlocks`、`getTransactionsInBlockByHeight` 和 `getTransactionsInBlockById`。

包含多项修复。此版本修复了在某些 Ubuntu 版本上环境变量中 `~` 扩展不正确的问题。解决了在自定义配置文件中默认参数未被覆盖的问题。此外，还修复了 `getTransactionsReceivedByAddress` 的一个问题，该问题导致其跳过带有备注的接收交易。

---
title: "ADAMANT 区块链节点更新：版本 0.8.0"
slug: "adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
description: "ADAMANT 是一个基于区块链技术构建的开源去中心化消息平台，现已发布节点版本 0.8.0。此次更新重点在于 API 增强和优化。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
publishedAt: "2023-03-20T08:43:48.499Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:35647db85081"
locale: "zh"
placeholder: false
---

ADAMANT，一个基于区块链技术构建的开源去中心化消息平台，现已发布节点版本 0.8.0。此次更新主要聚焦于 API 增强和优化，而非共识机制的更改，因此更新节点为可选操作。

## API 改进

`/api/transactions` 和 `/api/chats/get` 接口现在接受 `inId` 或 `isIn` 作为等效的查询参数。例如，`/api/chats/get?InId=U6386412615727665758` 与 `/api/chats/get?isIn=U6386412615727665758` 将产生相同的结果。此外，`/api/chats/get` 和 `/api/chatrooms` 接口中的用户 ID 现在不区分大小写，这意味着 `/api/chatrooms/U6386412615727665758` 与 `/api/chatrooms/u6386412615727665758` 被视为完全相同。

交易数据和 `POST /api/accounts/delegates` 现在接受两种格式：纯对象或嵌套在 `transaction` 属性内。以下两种格式均有效：

```bash
curl -X POST https://endless.adamant.im/api/transactions/process -H 'Content-Type: application/json' -d '{"type": 0, "amount": 100000000, ...}'
# or {"transaction": { "type": 0, "amount": 100000000, ... }}
```

`/api/states/get` 接口现在包含一个 `confirmations` 属性，同时优化了 `generatorPublicKey` 查询的性能。此外，在 `config.json` 中新增了 `cors` 选项，以便更方便地进行跨域配置。

## 错误修复与破坏性变更

此次更新修复了影响部分部署的“permission denied for schema public”错误。然而，版本 0.8.0 引入了一项破坏性变更：`/api/blocks` 接口不再返回 `count` 属性。依赖该字段的应用程序需相应地进行更新。

由于此版本未修改共识规则，现有节点可继续运行在旧版本上，不会出现兼容性问题。

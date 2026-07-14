---
title: "ADAMANT Node 中用于区块和余额的客户端 WebSocket 事件"
slug: "discussion-65-client-websocket-events-for-blocks-and-balances-in-adamant-node-10428016"
description: "ADAMANT Node 现支持两种可选的客户端 WebSocket 能力：用于成功应用并保存区块的 newBlock 事件，以及用于已确认的 balance 和 unconfirmedBalance 更新的 balances/change 事件。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/65"
publishedAt: "2026-07-14T16:18:33Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10428016"
locale: "zh"
placeholder: false
---

## 概述

ADAMANT Node 现支持两种可选的客户端 WebSocket 能力：用于成功应用并保存区块的 `newBlock` 事件，以及用于已确认的 `balance` 和 `unconfirmedBalance` 更新的 `balances/change` 事件。该实现采用 Socket.IO 而非裸 WebSocket 连接。订阅作用域限定于单个 socket，重连后必须重新订阅。

该实现解决了 [Node issue #256](https://github.com/Adamant-im/adamant/issues/256) 和 [Node issue #217](https://github.com/Adamant-im/adamant/issues/217)，相关文档见 [Adamant-im/docs#35](https://github.com/Adamant-im/docs/pull/35)，OpenAPI 配套契约见 [Adamant-im/adamant-schema#48](https://github.com/Adamant-im/adamant-schema/pull/48)。

## 新区块事件

客户端通过发送 `blocks: true` 显式启用区块通知。`newBlock` 的有效载荷包含一个精简的公共头部：区块 ID、高度、时间戳、出块人公钥、交易数量、总金额、总手续费和奖励。它有意省略了交易列表、签名和有效载荷哈希；客户端在需要时可通过 REST 请求完整区块。

```js
connection.emit('blocks', true);

connection.on('newBlock', (block) => {
  console.log('Applied block:', block);
});
```

节点仅在完整的区块应用流水线成功且区块已保存后才发出此事件。历史重放和内存表重建不会产生实时样式的区块事件。

## 余额变更事件

余额推送需要同时订阅地址和显式订阅字段。有效载荷仅包含已发生变更的被订阅字段，其值为以 1/10^8 ADM 为单位的十进制字符串。

```js
connection.emit('address', ['U1234567890123456']);
connection.emit('balances', ['balance', 'unconfirmedBalance']);

connection.on('balances/change', (account) => {
  console.log('Balance changed:', account);
});
```

`balance` 表示已确认的区块链状态。`unconfirmedBalance` 还反映节点当前的未确认交易池，并可能在交易被接受、确认、过期、回滚或重新验证时发生变化。

## 推送与性能设计

主要目标是在不将每次账户变更都转化为对所有已连接 socket 的扫描或不必要的数据库读取的前提下，添加有用的事件。专用的区块索引和按地址的余额索引仅选择感兴趣的 socket，当没有订阅者需要变更的地址和字段时，节点会跳过账户读取。区块应用和回滚会批量处理内部的余额变更，并对每个变更的地址只执行一次最终的账户读取。嵌套的批量抑制会被锁定，直到外层批量关闭，从而防止内部失败后的部分发布。失败的区块应用、失败的回滚、重放、重建以及已完成的快照截断都会抑制非持久化的余额通知。Socket 匹配、账户查询和单个 socket 推送的失败都与区块、轮次和账户处理相隔离。轮次奖励变更仅在持久化的轮次操作完成后才会发布。

这些变更不会修改共识规则、区块或交易的序列化、签名、ID、数据库模式、奖励、手续费或对等节点协议行为。

## 尽力而为的事件语义

这些事件是低延迟通知，而非持久化的事件日志。客户端在断连期间可能会错过事件，必须通过 REST 对重要状态进行对账。余额订阅不会发送初始快照，并且在快速独立更新期间，异步余额读取可能乱序完成。重复的交易和区块 ID 至少会被抑制 60 秒，定期清理会将有效窗口延长至大约两分钟。如果一个区块被回滚，并且相同的 ID 在该窗口内被重新应用，则第二次通知可能会被抑制。

当前的余额字符串表示有意与 REST 行为保持一致；超出 JavaScript 安全整数范围的精确值需要全 API 范围的协同变更，而非仅在 WebSocket 层面产生分歧。未引入任意的、静默的每 socket 订阅上限。当前 API 没有用于部分拒绝的确认机制，因此资源限制应当是一个独立的可配置、有文档的契约，并带有明确的客户端反馈。

## 验证

验证包括 226 个通过的面向特性的 Node 测试，覆盖 WebSocket、账户、交易、区块和轮次路径，以及针对快照抑制和嵌套批量丢弃的专项回归测试。更广泛的快速单元测试套件通过了 940 个测试。额外检查涵盖 ESLint、生产环境 VitePress 文档构建、OpenAPI 格式与打包验证，以及针对区块和余额推送的真实 Socket.IO 集成覆盖。不相关的长时间运行测试套件被有意跳过，因为该特性不改变共识验证、序列化、SQL、对等节点传输或 REST 端点。

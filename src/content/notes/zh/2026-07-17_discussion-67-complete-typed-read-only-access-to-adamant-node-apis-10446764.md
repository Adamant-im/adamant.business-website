---
title: "ADAMANT Node API 的完整类型化只读访问"
slug: "discussion-67-complete-typed-read-only-access-to-adamant-node-apis-10446764"
description: "adamant api SDK 现在为浏览器、监控服务、钱包、机器人及其他集成所使用的 ADAMANT Node 只读 API 提供了完整的类型化接口。消费者不再需要为 ADAMANT Node v0.10.2 引入或扩展的主要账户、区块、代表、节点、池及网络状态查询使用通用的 api.get() 调用或本地响应类型转换。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/67"
publishedAt: "2026-07-17T10:54:30Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10446764"
locale: "zh"
placeholder: false
---

`adamant-api` SDK 现在为浏览器、监控服务、钱包、机器人及其他集成所使用的 ADAMANT Node 只读 API 提供了完整的类型化接口。消费者不再需要为 ADAMANT Node v0.10.2 引入或扩展的主要账户、区块、代表、节点、池及网络状态查询使用通用的 `api.get()` 调用或本地响应类型转换。

## 覆盖范围

SDK 暴露了带有类型化分页和代表过滤的 `getTopAccounts()`。响应包含 Node 的确定性余额排序和分页元数据；`limit: 0` 请求仅返回计数元数据而不返回账户行。

```ts
const topDelegates = await api.getTopAccounts({
  limit: 50,
  offset: 0,
  isDelegate: 1,
});

const countOnly = await api.getTopAccounts({limit: 0});
```

公共选项类型现在涵盖区块列表和查找、带有单代表查找的代表列表、用户名搜索、锻造统计、投票者以及下一锻造者预测、已连接节点列表和精确节点查找、池化交易列表和查找，以及包含性的交易时间范围。这使得 SDK 可以作为只读服务的类型化边界，而不仅仅是签名和广播辅助工具。

生成的合约现在暴露 `consensusCodeName`、有效的 `consensusSchedule`、完整的区块奖励 `milestoneSchedule`，以及代表生命周期 `forged` 值（以 base-10 整数字符串表示）。运行时的 `producedblocks` 属性取代了之前生成的 `producedlocks` 拼写错误。服务可以检索公共链投影而无需在本地重新定义响应：

```ts
const [network, node] = await Promise.all([
  api.getStatus(),
  api.getNodeStatus(),
]);

console.log(network.consensusCodeName);
console.log(node.consensusSchedule, node.milestoneSchedule);
```

## 端点感知的查询语义

ADAMANT Node 交易查询语言是扁平的，而不是嵌套的布尔表达式树。它将条件序列化为一个 SQL 表达式，按查询字符串顺序排列，使用正常的 SQL 优先级，不为 `and: {}` 或 `or: {}` 对象添加括号。因此，SDK 默认将普通的顶级过滤器与 `and` 组合，在序列化期间保留 JavaScript 对象的插入顺序，并在混合的 `and` / `or` 条件使线路顺序具有语义重要性时发出警告。它将 `includeDirectTransfers`、`returnAsset` 和 `userId` 等控制限定在兼容的端点范围内，在发送请求之前移除已知不支持的控制，并且仅允许在 `/api/transactions` 上进行金额过滤，因为 Node 实际上只在该端点应用它们。这故意比将每个共享选项转发到每个端点更严格——类型化调用应该表示所选 Node 路由实际实现的行为。

## 模式来源和兼容性

`src/api/generated.ts` 是从 `Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90` 可重现地生成的。仓库使用 `npm run api-types:check` 验证生成的文件，而包消费者测试编译导出的声明并测试构建的 ESM 和 CommonJS 入口点。从 `producedlocks` 到 `producedblocks` 的修正是编译时兼容性变更；手动构造代表或状态固定装置的使用者可能需要添加新必需的字段。运行时响应处理保持直通——SDK 不会转换或拒绝较旧的 Node 响应。

## 实时状态与快照读取并存

相同的 Node v0.10.2 对齐添加了用于紧凑 `newBlock` 事件以及已确认或未确认 `balances/change` 事件的可选 WebSocket 处理器。重新连接后恢复订阅，余额值是绝对替换而非增量。这些事件补充了类型化的 REST 读取，但不替代它们：没有重放或初始余额快照，余额负载可能仅包含已更改的字段，并且在断开连接期间传递的事件不会被回填。关键客户端应在重新连接后通过 REST 对账区块和余额。

## 兼容性边界

新的顶级账户、网络状态、代表、区块和余额事件功能需要 ADAMANT Node v0.10.2。现有的交易构造、字节布局、哈希、ID、签名、加密、重试、故障转移和活动节点选择保持不变。包根仍然以 ADM 为中心；外部币种辅助工具继续使用显式子路径导出。SDK 需要 Node.js 22.12.0 或更新版本，而 ADAMANT Node v0.10.2 运营者应遵循 Node 的 22.13.0 或更新版本要求。

---
title: "adamant-api v3.2.0：专为 ADAMANT Node v0.11.0 构建，具备弹性故障转移与更安全的查询机制"
slug: "adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
description: "cryptofoundry 发布了 adamant-api v3.2.0，这是用于 ADAMANT 区块链的官方 TypeScript 和 Node.js SDK，与 ADAMANT Node v0.11.0 同步更新。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-api-v3-2-0-built-for-adamant-node-v0-11-0-resilient-failover-and-safer-queries-e657e4cd56ab"
publishedAt: "2026-11-26T07:08:23.535Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:e657e4cd56ab"
locale: "zh"
placeholder: false
---

cryptofoundry 发布了 adamant-api v3.2.0，这是用于 ADAMANT 区块链的官方 TypeScript 和 Node.js SDK，与 ADAMANT Node v0.11.0 同步更新。

直接针对原始区块链 HTTP 端点构建去中心化应用、交易机器人、浏览器或支付集成，意味着必须反复重造相同的可靠性和密码学基础设施：选择已同步的节点、在不重复交易的情况下重试瞬时故障、使用 NaCl 加密消息、签署确定性交易，以及保持 TypeScript DTO 与节点升级同步。该 SDK 开箱即用地处理了这些问题，提供零样板代码的弹性（传入一组独立运行的 HTTPS 节点列表，SDK 会监控健康状况、检查同步高度、跳过过时或正在加载的节点，并自动进行故障转移）、模块化子路径导入、通过 ADAMANT Node OpenAPI 3.2 规范生成的 DTO 实现端到端 TypeScript 安全性，以及具备断线自动恢复功能的实时 Socket.IO 订阅。

### 本地接收方与受托人公钥验证

在加密消息或为受托人投票之前，v3.2.0 会在本地验证节点返回的每个 Ed25519 公钥是否为标准的、曲线上且非小阶的 32 字节密钥，并以密码学方式推导出请求的 ADM 地址。畸形、偏离曲线、小阶（阶数为 1、2、4 和 8）或不匹配的密钥会在缓存或加密前被彻底拒绝，且受托人缓存会在每个 `AdamantApi` 实例中隔离。

### KVS 与聊天查询的关键正确性与安全性修复

在 v3.0.0 和 v3.1.0 中，`getKVS()`、`getChatTransactions()`、`getChats()` 和 `getChatMessages()` 发送了 `and:` 前缀的过滤器，v0.11.0 之前的节点会静默忽略这些过滤器，但仍返回 `success: true` 以及未过滤的记录。在 v3.2.0 中，这些方法始终发送纯过滤器名称（展平显式的 `and: { ... }` 包装器），并在客户端拒绝不支持的 `and:` 包装器和预加前缀的键。所有读取 KVS 或聊天数据的 3.x 应用程序都应升级到 v3.2.0。

### 针对 Node v0.11.0 的弹性 HTTP 429 处理

ADAMANT Node v0.11.0 默认启用了生产环境的 HTTP 和 WebSocket 反滥用限制。当节点返回 HTTP 429 时，幂等读取（GET 和 POST `/api/states/get`）会立即轮换到另一个已缓存的同步节点，同时受限节点进入有限的冷却期（最长 60 秒），以防止健康检查将流量直接导回该节点。命中受限节点的并行请求将共享一次去重后的健康扫描，而不是频繁请求 `/api/node/status` 或在活跃节点间反复切换。在单节点设置中，或者当节点的重置窗口超过 SDK 10 秒的限制等待时间时，`AdamantApiResult` 现在会公开可选的 `status`、`retryAfterMs` 和 `rateLimitScope` 字段，以便机器人能够妥善安排重试。交易发布 POST 调用在收到 HTTP 响应后绝不会自动重播。

### 更智能的启动就绪状态

与本地节点同时启动的服务经常会在节点仍在加载内存表或追赶链数据时触发 `onReady`。在 v3.2.0 中，报告 `loader.loaded: false` 或 `loader.syncing: true` 的节点将被排除在主要 API 和 WebSocket 选择之外。`onReady`（以及 `api.isReady`）会通过受限的启动重试退避机制（5秒、10秒、30秒、60秒）等待，直到可用节点真正准备好处理查询。如果所有完全同步的节点都宕机，已初始化的客户端将具备基于高度的同步回退机制。

### POST /api/states/get 与严格的 v0.11.0 类型对齐

若要查询数十或数百个 KVS 键或发送者地址而不触及 URL 长度限制，请将 `{method: 'POST'}` 传递给 `getKVS()`：

```js
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

TypeScript 接口（`ChatroomsOptions`、`ChatTransactionsOptions` 和 `KVSOptions`）现在反映了 ADAMANT Node v0.11.0 的严格查询验证，因此不支持的字段会在编译时被捕获，OpenAPI 生成器现在直接从 `Adamant-im/adamant` 同步。

### 供应链安全与 7 天隔离期

遵循 Node v0.11.0 中引入的 ADAMANT 安全策略，adamant-api 现在强制执行 7 天的发布期隔离（`pnpm-workspace.yaml` 中的 `minimumReleaseAge: 10080`），通过 `allowBuilds` 限制依赖项生命周期脚本，交付时确保 `pnpm audit` 生产环境零漏洞，并使用 GitHub Actions 可信发布来源发布到 npm。

```
npm install adamant-api@3.2.0
```

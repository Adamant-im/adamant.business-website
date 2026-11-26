---
title: "adamant-api v3.2.0：HTTP 429 故障转移、公钥验证及严格查询过滤"
slug: "discussion-85-adamant-api-v3-2-0-resilient-http-429-failover-recipient-public-key-verification-strict-ch-11403173"
description: "ADAMANT Node v0.11.0 引入了默认的 REST/WebSocket 防滥用速率限制、针对聊天和 KVS 端点的严格 AND 查询验证，以及合并的 OpenAPI 源，adamant-api 已据此更新。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/85"
publishedAt: "2026-11-26T06:52:55Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:11403173"
locale: "zh"
placeholder: false
---

随着 ADAMANT Node v0.11.0 引入了默认的 REST/WebSocket 防滥用速率限制、针对聊天和 KVS 端点的严格 AND 查询验证，并将 OpenAPI 源合并至 `Adamant-im/adamant`，`adamant-api` 已完成更新，以增强 v0.11.0 及更早版本节点在故障转移、就绪状态检查及查询序列化方面的稳健性。

## 稳健的 HTTP 429 故障转移与冷却机制

ADAMANT Node v0.11.0 强制执行基于 IP 的聚合 (`all`) 和路由类别 (`status`、`read`、`publish`) HTTP 配额，并返回 `429`、`Retry-After` / `RateLimit-Reset` 以及 `RateLimit-Scope` 响应头。

每个请求在发送前都会捕获 `targetNode = this.node`，以防止并发错误导致 `this.node` 被错误地轮换回已发生故障的节点。并发的 `updateNodes()` 调用现在共享同一个进行中的 `updateNodesPromise`，而不是提前返回；强制故障转移若加入计划内的扫描，会将其升级为带有 `failedNode` 的强制轮换。

由于 `/api/node/status` 计入上限更高的 `status` 桶（每分钟 12,000 次，而 `read` 为 3,000 次），受速率限制的节点仍能响应健康检查。`NodeManager` 现在跟踪每个节点的 429 冷却时间 (`rateLimitedUntil`，上限为 60 秒)，因此强制扫描和计划扫描都会在 2 节点及 3+ 节点池中优先选择未受速率限制的同步节点。

当没有可用的同步节点时，幂等读取会遵循 `Retry-After` / `RateLimit-Reset` 并加入最高 10 秒的抖动；如果节点的重置窗口超过该上限或重试耗尽，SDK 将立即返回，并在 `AdamantApiResult` 中包含可选元数据：

```ts
const response = await api.getBlocks();

if (!response.success) {
  if (response.status === 429 && response.retryAfterMs !== undefined) {
    console.warn(`Rate-limited (${response.rateLimitScope}), retry in ${response.retryAfterMs}ms`);
  }
}
```

非幂等的 `POST` 请求（交易提交）在收到 HTTP 响应（包括 `429`）时绝不会被重放。

## 扁平过滤器名称、严格端点类型与 POST /api/states/get

`/api/states/get`、`/api/chats/get` 和 `/api/chatrooms/*` 端点现在接收扁平化的过滤器名称。`and: { ... }` 包装器已被展平，而不支持的 `or` 包装器将在客户端被拒绝并返回 `success: false`。此更改修复了 v0.11.0 之前节点上的 #97 问题，并符合 v0.11.0 的严格验证要求。

`ChatroomsOptions`、`ChatTransactionsOptions` 和 `KVSOptions` 现在精确映射 ADAMANT Node v0.11.0 接受的字段，包括 `/api/chats/get` 和 `/api/states/get` 上的 `toHeight`，同时排除了 `/api/chatrooms/*` 上被拒绝的 height/range 字段。已弃用的 `/api/chatrooms/*` 上的 `userId` 将在运行时被剥离，并伴随专门的弃用警告。

大型 KVS 查询现在可以使用 `POST /api/states/get`：

```ts
const response = await api.getKVS(
  {
    senderIds: ['U16655734187932477074', 'U15423595369615486571'],
    keyIds: ['eth:address', 'btc:address', 'doge:address'],
    toHeight: 55_000_000,
  },
  {method: 'POST'},
);
```

`getKVS(..., {method: 'POST'})` 使用 SDK 的幂等读取重试策略，保留完整的 429 和 5xx 故障转移功能。

## 可用节点就绪状态与加载状态过滤

`NodeManager` 现在会检查 `/api/node/status` 中的 `loader.loaded` 和 `loader.syncing` 字段。处于加载中 (`loaded: false`) 或同步中 (`syncing: true`) 的节点将从活跃 API 选择和 WebSocket 连接列表中排除；不包含 `loader` 对象的节点则保持可选状态。开启 `checkHealthAtStartup: true` 后，`onReady` 将等待直到选定可用节点，而不会在初始健康扫描失败后立即触发。

## 本地接收方与代理公钥验证

`encodeMessage()` 和 `decodeMessage()` 现在会拒绝非规范、离曲线以及小阶（阶数为 1、2、4 和 8）的 Ed25519 密钥，并返回 `invalid key`。`getPublicKey()` 在发起网络请求前会在本地验证 ADM 地址，并验证节点返回的密钥是否在本地推导出所请求的地址，然后再进行缓存或返回。`sendMessage()` 在加密前会本地重新验证已解析的密钥，若不匹配则返回 `{success: false, errorMessage}`；`voteForDelegate()` 强制执行地址绑定并使用客户端特定的代理缓存。

## OpenAPI 源合并与供应链加固

`scripts/sync-api-types.mjs` 现在直接从 `Adamant-im/adamant` (`openapi/specification/openapi.yaml`) 拉取 OpenAPI 3.2 规范，生成 `RateLimitErrorResponseDto` 和 `GetKVSRequestBody`。`pnpm-workspace.yaml` 强制执行 7 天的依赖发布期限隔离 (`minimumReleaseAge: 10080`)，并明确设置 `allowBuilds`，确保生产环境审计漏洞为 0。

## 参考资料

- SDK PR (Node v0.11.0 对齐及依赖项): https://github.com/Adamant-im/adamant-api-jsclient/pull/105
- 接收方与代理公钥验证: https://github.com/Adamant-im/adamant-api-jsclient/pull/110
- 聊天与 KVS 过滤器扁平化修复: https://github.com/Adamant-im/adamant-api-jsclient/pull/101
- 可用节点 `onReady` 修复: https://github.com/Adamant-im/adamant-api-jsclient/pull/102
- ADAMANT Node v0.11.0: https://github.com/Adamant-im/adamant/pull/303
- SDK 文档: https://js.docs.adamant.im
- OpenAPI Swagger UI: https://docs.adamant.im/schema/

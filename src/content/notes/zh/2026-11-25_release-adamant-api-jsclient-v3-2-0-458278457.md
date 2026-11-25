---
title: "ADAMANT API JS Client v3.2.0"
slug: "release-adamant-api-jsclient-v3-2-0-458278457"
description: "ADAMANT API JS Client v3.2.0 是一个与 ADAMANT Node v0.11.0 配套的安全性与正确性更新版本。所有 v3.0.0 和 v3.1.0 的使用者均应升级至 v3.2.0。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.2.0"
publishedAt: "2026-11-25T15:08:18Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:458278457"
locale: "zh"
placeholder: false
---

ADAMANT API JS Client v3.2.0 是一个与 ADAMANT Node v0.11.0 配套的安全性与正确性更新版本。所有 v3.0.0 和 v3.1.0 的使用者均应升级至 v3.2.0。

## 接收方与委托人公钥验证

SDK 现在强制执行规范的 32 字节曲线内 Ed25519 验证，拒绝非规范、曲线外以及阶数为 1、2、4 和 8 的小阶 Curve25519 密钥，并在缓存或加密消息前执行本地 ADM 地址派生检查。对于无效的 ADM 地址，`getPublicKey()` 方法将不再发起网络请求并返回空字符串；当节点返回不匹配或格式错误的密钥时，该方法也会返回空字符串且不会污染缓存。`sendMessage()` 会在本地重新验证已解析的接收方密钥，若密钥无效或不匹配，则返回 `{success: false, errorMessage}` 结果；`voteForDelegate()` 则会拒绝无法通过地址绑定的委托人密钥。由 `Map` 支持的 `publicKeysCache` 在写入和读取时均会进行验证，且依赖网络的委托人缓存（`byAddress`、`byUsername`）已按每个 `AdamantApi` 实例进行隔离。

## KVS 与聊天过滤器修复

`getKVS()`、`getChatTransactions()`、`getChats()` 和 `getChatMessages()` 方法现在会发出纯过滤器名称，展平了显式的 `and: { ... }` 包装器，从而与所有 ADAMANT Node 版本中记录的节点契约保持一致。对于仅支持 AND 的端点，不受支持的 `or` 包装器以及带有 `and:` 或 `or:` 前缀的过滤器键将在客户端被拒绝，并返回 `{success: false, errorMessage}`，而不是发送旧版本节点忽略、v0.11.0+ 节点拒绝的前缀。此项已通过记录的主网 `/api/states/get` 固定测试（fixture test）进行了验证。

## 可用节点就绪状态与加载器过滤

报告 `loader.loaded: false` 或 `loader.syncing: true` 的节点将被排除在主要活跃节点选择和 WebSocket 连接列表之外，而没有 `loader` 对象的旧版节点仍保持可用资格。`onReady` 回调（以及 `api.isReady`）将保持挂起状态，直到实际选定可用节点为止；启动检查将以 5 秒、10 秒、30 秒和 60 秒的上限退避策略进行重试，即使之前的扫描抛出异常也会继续，而不是等待 5 分钟一次的周期性扫描。当已初始化且所有就绪节点均失败或低于 `minVersion` 时，SDK 仅在 10 分钟内有最近的同步高度参考且候选节点在该高度的 25 个区块范围内时，才会回退到与 `minVersion` 兼容但处于加载中/同步中的节点，并发出警告。`onReady` 回调在抛出异常时不会被重复触发，非对象响应（如 HTML 200 维护页面、null 或不完整的 `{success: true}` 状态负载）将被安全跳过。

## ADAMANT Node v0.11.0 API、OpenAPI 与 KVS POST 对齐

确定性 API DTO 生成（`scripts/sync-api-types.mjs`）已从存档的 `Adamant-im/adamant-schema` 仓库迁移至 `Adamant-im/adamant`（基于 v0.11.0 正式版主分支提交 `50568f37dc2b7da86f44991f96c40c8edde74d67` 的 `openapi/specification/openapi.yaml`），并通过 `createRequire` 读取确切的已安装工具版本。生成的 `src/api/generated.ts` 已通过 `RateLimitErrorResponseDto`、`GetKVSRequestBody` 以及更新的 `https://docs.adamant.im/` 链接重新生成。端点选项类型（`ChatroomsOptions`、新的 `ChatTransactionsOptions` 和 `KVSOptions`）已与 ADAMANT Node v0.11.0 的严格过滤器验证对齐，其中 `/api/chats/get` 和 `/api/states/get` 强制执行 `toHeight`，而 `/api/chatrooms/*` 则排除了高度/范围过滤器。`ChatroomsOptions.userId` 已弃用，并在运行时于 `/api/chatrooms/*` 上被剔除，同时提供专门的一次性弃用警告，以确保旧版调用方不会在 v0.11.0+ 节点上触发验证失败。已通过 `api.getKVS(options, {method: 'POST'})` 增加对 `POST /api/states/get` 的支持，用于处理大型 `keyIds` 或 `senderIds` 查询，并具备与 `GET` 一致的完全幂等读取故障转移功能。

## 弹性 HTTP 429 与故障转移强化

SDK 在每次请求前捕获 `targetNode`，确保并发失败不会将 `this.node` 切回已失败的节点。在面对多节点 HTTP 429 响应时，它会立即切换到另一个已缓存的、已同步且未受速率限制的节点，无需额外的 `/api/node/status` 探测；在单节点 429 响应时跳过健康扫描，并区分处理 `checkNode()` 中的 429 响应与离线节点。并发的 `updateNodes()` 扫描通过进行中的 Promise 进行去重，当请求报告节点失败时，将正在进行的计划扫描升级为强制故障转移。SDK 会在 2 节点和 3+ 节点同步集中轮换避开 `failedNode`，并跟踪每个节点的 429 冷静期（`rateLimitedUntil`，上限 60 秒），确保强制和计划健康扫描在冷静期结束前避开受限节点。它会解析 `Retry-After`（秒或 HTTP 日期）、`RateLimit-Reset` 和 `RateLimit-Scope` 标头，在存在其他同步节点时立即为幂等读取（`GET` 和 `POST /api/states/get`）进行故障转移，或在单节点上遵循带抖动的有界退避策略（最长 10 秒），避免紧密循环。可选的 `status`、`retryAfterMs` 和 `rateLimitScope` 元数据会在 `AdamantApiResult` 的 HTTP 429 失败结果中暴露，而写入类 `POST` 请求则严格保持不重试。

## 依赖安全性刷新与 7 天发布期隔离

此版本强制执行 `minimumReleaseAge: 10080`（7 天）和 `pnpm-workspace.yaml` 中的显式 `allowBuilds` 设置（`'@parcel/watcher': false`，`esbuild: true`，`unrs-resolver: true`），且无发布期豁免。直接和传递依赖项均已刷新至 7 天期限之后，包括 axios、bitcoinjs-lib、tiny-secp256k1、pbkdf2、socket.io-client、bip39、ecpair、semver、@redocly/cli、eslint、jest、prettier 和 swagger-typescript-api，将生产环境审计发现的问题从 20 个减少至 0 个。发布通过 GitHub Actions npm 可信发布（Trusted Publishing）及构建溯源完成。

## 验证

已在 Node.js v24.19.0 和 pnpm 11.13.1 上验证。完整的测试套件（`pnpm test`）涵盖 20 个套件和 333 个测试，函数覆盖率达到 100%，并通过了 `gts lint`。API 类型检查与引用的 ADAMANT 和 adamant-wallets 提交相匹配。TypeDoc 和 VitePress 文档构建通过。针对 ESM、CommonJS、实时使用者、包子路径和 TypeScript 声明的包测试均已通过。生产环境审计报告漏洞为 0，所有 893 个锁定包均已验证签名。

### 破坏性变更

`encodeMessage()` 和 `decodeMessage()` 函数现在对于非规范、曲线外以及阶数为 1、2、4 和 8 的小阶 Ed25519 密钥会抛出 `invalid key` 错误。合法的网内密钥不受影响。`getPublicKey()` 方法对于无效的 ADM 地址不再发起网络请求并返回空字符串，当节点的密钥无法派生出该地址时也会返回空字符串。`sendMessage()` 方法会拒绝此类接收方并返回 `{success: false, errorMessage}`，`voteForDelegate()` 则会拒绝无法通过地址绑定的委托人密钥。

TypeScript 查询选项收窄更改了 `ChatroomsOptions` 和 `KVSOptions`，使其不再继承 ADAMANT Node v0.11.0 拒绝的不受支持的 `TransactionQueryParameters` 字段。`getChatTransactions()` 方法现在使用 `ChatTransactionsOptions`，它是 `ChatroomsOptions` 的超集，保留了 `fromHeight`、`toHeight`、`inId` 和 `isIn`。`TransactionQueryParameters` 保持导出不变。

直接使用 `or` 包装器或带有预置 `and:` 或 `or:` 过滤器键调用 `transformTransactionQuery(query, 'states' | 'chats' | 'chatrooms')` 现在会抛出带有 `badParameter` 消息的 `Error`，而 `AdamantApi` 客户端方法则返回 `{success: false, errorMessage}`。

`getKVS()` 和 `getChatTransactions()` 上的 `toHeight` 过滤器仅由 ADAMANT Node v0.11.0+ 强制执行。旧版本节点会静默忽略 `toHeight` 并返回带有 `success: true` 的较新记录，因此依赖上限高度的调用方应设置 `minVersion: '0.11.0'`。

`/api/chatrooms/*` 上的 `userId` 字段在 `ChatroomsOptions` 中已被弃用，并在运行时被剔除并发出专门警告。调用方应仅将账户地址作为 `getChats(address)` 或 `getChatMessages(address1, address2)` 的 URL 路径参数传递。

当 `checkHealthAtStartup: true` 时，`onReady` 现在会等待，且 `api.isReady` 将保持 `false`，直到选定可用、已加载且非同步中的节点为止，并以 5 秒、10 秒、30 秒和 60 秒的退避策略重试启动检查。

当请求因 HTTP 429 失败时，`AdamantApiResult` 的 `success: false` 变体中增加了可选的 `status`、`retryAfterMs` 和 `rateLimitScope` 字段。

交易字节布局、哈希、ID、签名、加密、钱包派生和根导出保持不变。

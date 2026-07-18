---
title: "ADAMANT API JS Client v3.1.0"
slug: "release-adamant-api-jsclient-v3-1-0-355622438"
description: "本次发布为与 ADAMANT Node v0.10.2 协同的 SDK 更新，补全了类型化的只读 Node API 接口，新增可选的实时区块与余额订阅，同步了委托人与网络状态 DTO 至权威 schema，并刷新了包工具链。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.1.0"
publishedAt: "2026-07-17T10:54:11Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:355622438"
locale: "zh"
placeholder: false
---

本次发布为与 ADAMANT Node v0.10.2 协同的 SDK 更新。它补全了类型化的只读 Node API 接口，新增了可选的实时区块与余额订阅，将委托人与网络状态 DTO 同步至权威 schema，并刷新了包工具链。

## 完整的类型化只读 Node API

此版本新增了 `getTopAccounts()`，提供类型化的 `limit`、`offset` 和 `isDelegate` 选项，其中 `limit: 0` 可用于仅获取计数的元数据。它补全了区块、委托人、委托人搜索与统计、节点、池内交易以及交易时间范围的选项类型。本次发布暴露了类型化的共识代号与激活计划、区块奖励里程碑，以及委托人生涯锻造总量。同时，它还扩展了打包的消费者检查，确保新方法和响应契约在构建后的 npm 产物中得到验证。

## 端点感知的查询处理

SDK 现在将直接转账及其他控制参数限定在支持它们的端点范围内。它在请求发送前移除已知不支持的控制参数，避免其成为无效或失效的过滤器，同时保持确定性的查询字符串顺序。当混合的 `and` / `or` 条件依赖于 Node 的扁平、顺序敏感的 SQL 表达式模型时，客户端会发出警告，并将金额过滤器限制在 `/api/transactions`，因为 Node 实际上仅在该端点应用它们。

## 客户端 WebSocket 状态订阅

本次发布新增了可选的 `onNewBlock()` 订阅，用于接收新应用区块的紧凑头部信息，以及 `onBalanceChange()` 订阅，用于接收已确认余额、未确认余额或两者。余额载荷被视为当前的绝对值而非增量，并记录了部分字段传递的行为。区块和余额订阅在重新连接到相同或其他健康节点后会自动恢复。处理器失败会通过现有的 `.catch()` 路径处理，处理器可通过 `.off()` 移除。这些事件是尽力而为的实时通知，而非持久化流。当正确性依赖于完整历史时，应用程序应在断开连接后通过 REST 恢复状态。

## 权威 DTO 同步

API 类型从 `Adamant-im/adamant-schema@f35b8ddb5597a8f1a80a3a670bedb003af65ef90` 重新生成。本次发布在网络状态契约中新增了 `consensusCodeName`、`consensusSchedule` 和 `milestoneSchedule`，并新增了委托人生涯 `forged` 值，同时保留了独立的委托人搜索响应结构。它将生成的委托人属性 `producedlocks` 修正为运行时属性 `producedblocks`，并记录了下一个锻造者、委托人、节点以及池内交易的快照与过滤语义。

## 包与工具链维护

包版本设置为 `3.1.0`，并声明 Node.js `>=22.12.0`。pnpm 更新至 11.13.1，刷新了运行时和开发依赖，未新增直接依赖。已解析的锁文件图从 886 个包条目减少至 876 个。格式化已与 Prettier 3.9 对齐，本地 AI 代理和编辑器目录不纳入仓库。发布通过 npm Trusted Publishing 配合 GitHub Actions 来源证明完成。

## 兼容性说明

新的顶级账户、网络状态、委托人、区块和余额事件功能需要 ADAMANT Node v0.10.2。交易字节布局、哈希、ID、签名、加密、根导出、节点选择、重试和故障转移行为均未变更。差异包括 17 个文件变更，1,471 行新增和 513 行删除，涵盖了类型化 API、生成 DTO、WebSocket 订阅、测试、文档、版本元数据和依赖刷新的完整 `v3.0.0..master` 历史。

## 验证

已在 Node.js 22.23.1 和 pnpm 11.13.1 上验证。所有检查均通过：`npm run compile`、`npm run typecheck`、`npm test`（19 个套件和 253 个测试通过）、`npm run lint`、`npm run test:package`（ESM、CommonJS、实时消费者、包子路径和 TypeScript 声明）、`npm run api-types:check`、`npm run metadata:check`、`npm run docs:build` 以及 `git diff --check`。生成的 API 类型与固定的 `adamant-schema` 修订版匹配，钱包元数据与 `Adamant-im/adamant-wallets@54a820b6dc5e0ec77c3a6fbac91d2f7809a2f5b7` 匹配。

### 破坏性变更

包的引擎最低要求从 Node.js `>=22` 变更为 `>=22.12.0`。同时运行 ADAMANT Node v0.10.2 的部署应使用 Node 所需的 Node.js `>=22.13.0`。使用了拼写错误的 `DelegateDto.producedlocks` 属性的 TypeScript 消费者必须迁移至 `producedblocks`。手动构造生成的委托人或网络状态 DTO 的消费者可能需要提供新增的必填字段。传递了与端点不兼容的查询控制参数的 TypeScript 调用者必须使用目标端点对应的选项类型。

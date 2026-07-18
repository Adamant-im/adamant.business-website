---
title: "ADAMANT 文档与 Schema：Top Accounts、客户端 WebSocket 事件及共识可见性"
slug: "discussion-68-docs-and-schema-top-accounts-client-websocket-events-and-consensus-visibility-10447246"
description: "ADAMANT 文档与 schema 仓库已与当前节点 API 表面对齐。所有变更均为新增且向后兼容——无共识分叉或线路格式破坏。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/68"
publishedAt: "2026-07-17T12:40:07Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10447246"
locale: "zh"
placeholder: false
---

ADAMANT 文档与 schema 仓库已与当前节点 API 表面对齐。所有变更均为新增且向后兼容——无共识分叉或线路格式破坏。在线文档可访问 `https://docs.adamant.im`，OpenAPI 包可访问 `https://schema.adamant.im`。

## Top Accounts API

`GET /api/accounts/top` 现已纳入公共契约。排序是确定性的：`balance DESC`，其次 `address ASC`。该端点支持 `limit` 与 `offset` 分页、可选的 `isDelegate` 过滤、响应元数据（`count`），以及 `limit=0` 用于仅返回计数的请求。旧版 `topAccounts` 配置开关已移除——该端点在每个节点上均已注册。

## 客户端 WebSocket：`newBlock` 与 `balances/change`

客户端 Socket.IO 接口新增了可选的紧凑 `newBlock` 事件以及字段级 `balances/change` 载荷，可包含 `balance`、`unconfirmedBalance` 或两者。订阅按 `address`、`types`、`assetChatTypes`、`balances` 和 `blocks` 进行索引。投递仍为尽力而为且非持久化：消费者必须重新连接、重新订阅，并通过 REST 对关键状态进行对账。OpenAPI 包在 `x-client-websocket` 下对此进行了文档说明，并在 `specification/websocket/` 中提供了专用 schema。

## 状态计划与委托人的 `forged`

公共状态 API 现在暴露了有效的共识激活计划以及完整的区块奖励里程碑计划，包括 `consensusCodeName`、`consensusSchedule.activationHeights` 和 `milestoneSchedule`（包含 `offset`、`distance` 和 `milestones`）。委托人列表与查询响应现在包含生命周期 `forged`，以基础单位的十进制整数字符串表示。下一出块人预测在轮次边界处使用下一个区块高度。schema 还将 `producedlocks` 更正为 `producedblocks`，并补全了对等节点、排队与未确认交易、委托人搜索及 `orderBy` 的查询参数覆盖。

## Blocks API 对齐

`GET /api/blocks` 的查询语义现已与实际节点行为对齐。`numberOfTransactions=0` 可正常工作，`orderBy`、金额过滤以及排序后的 `offset` 均已准确记录。schema 新增了完整的参数覆盖，并在 `BlockInfoDto` 上添加了 `generatorPublicKey`。文档中不正确的 `timestampMs` 示例已被移除。

## 运维恢复：内存表检查点

持久化的轮转 `mem_*` 检查点已记录用于崩溃恢复。该功能由 `loading.memCheckpoints.enabled` 控制，默认开启。文档涵盖了 SHA-256 校验、失败即终止的恢复、回退至完整的确定性重建、存储影响，以及优雅关闭行为（`SIGINT`/`SIGTERM` → 等待 `Cleaned up successfully`）。检查点作为本地恢复缓存；规范区块仍为唯一可信来源。

## 发布背景

这些更新面向 ADAMANT 节点 `v0.10.2`。下游消费者——尤其是 `adamant-api-jsclient`——应从更新后的 OpenAPI 包重新生成类型。相关 pull request 涵盖 [docs](https://github.com/Adamant-im/docs/pull/39)、[schema](https://github.com/Adamant-im/adamant-schema/pull/53) 和 [node](https://github.com/Adamant-im/adamant) 仓库。

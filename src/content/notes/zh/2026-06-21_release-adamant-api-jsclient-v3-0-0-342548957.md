---
title: "ADAMANT API JS Client v3.0.0"
slug: "release-adamant-api-jsclient-v3-0-0-342548957"
description: "ADAMANT API JS Client v3.0.0，与 ADAMANT Node v0.10.0 协同发布。更新 HTTP 和 WebSocket 客户端，引入模块化包结构，提升重试与故障转移能力，增加确定性元数据，并采用 VitePress 文档站点。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v3.0.0"
publishedAt: "2026-06-21T15:22:41Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
repo: "adamant-api-jsclient"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-api-jsclient:342548957"
locale: "zh"
placeholder: false
---

# ADAMANT API JS Client v3.0.0

这是与 ADAMANT Node v0.10.0 协同发布的一次重大 SDK 版本更新。本次发布更新了适用于当前节点 API 的 HTTP 和 WebSocket 客户端，引入了稳定的模块化包边界，改进了重试和故障转移行为，增加了确定性生成的元数据，并用源代码控制的 VitePress 与 TypeDoc 站点取代了原有的 Wiki 优先文档体系。

## ADAMANT Node v0.10.0 支持

本次发布基于固定的 `adamant-schema` 版本重新生成了 API DTO，包括毫秒级时间戳、加载器与状态数据、数值计数以及可为空的未确认交易字段。新增了当前交易和聊天查询参数，例如 `returnUnconfirmed`、`includeDirectTransfers`、通过地址查找委托人，以及多类型交易查询功能。交易查询过滤器现在默认使用逻辑 `and` 组合，金额过滤器仅作用于转账交易。SDK 新增了可选的 `timestampMs` 交易构造参数和 `getEpochTimeMs` 方法；由于 `timestampMs` 不参与签名字节、哈希、ID 和签名的计算，因此这些值保持不变。健康检查已更新以支持整合后的节点状态响应，并支持包含最小节点版本的过滤功能。

## 可靠性与 WebSocket 行为

客户端不再对明确拒绝的 POST 响应进行重试，而是返回结构化的、不可重试的 HTTP 错误，避免无限循环。对于无 HTTP 响应的安全请求和网络故障，仍保留重试和活动节点故障转移机制。WebSocket 订阅现在支持多个地址、多种交易类型和聊天资产类型，并提供交易与消息的便捷处理器、连接与重连回调、显式的连接与断开方法、类型化的连接错误、监听器清理以及有界重连处理机制。

## 模块化 SDK 与 npm 包

包的根目录仍聚焦于 ADM，防止加载特定币种的实现。新增了子路径导出，用于 ADM、API DTO、交易、元数据以及 BTC、ETH、DASH 和 DOGE 的辅助工具，同时保留对 CommonJS 和 ESM 的支持。确定性钱包元数据从固定的 `adamant-wallets` 版本同步。移除了 Lisk 和 Klayr 的代码与依赖，标准化了支持的外部币种派生与地址验证功能。本版本要求 Node.js 22 或更高版本，采用 pnpm 工作区元数据，现代化了 TypeScript 与依赖项，并增加了消费者级别的 tarball 测试。

## 自 v2.4.0 起保留的 API 修复

本次发布修复了委托人投票和健康检查的行为。允许信号消息使用字符串载荷，并仅对携带金额的消息类型进行金额验证。交易 ID 现在以字符串形式表示，并导出了验证工具函数。

## 文档、自动化与维护

文档通过 VitePress 站点提供，包含由 TypeDoc 生成的 API 参考和使用指南。发布内容包括 GitHub Pages 文档工作流（含 CNAME）、更新的 README 和 CONTRIBUTING 文件、确定性的 schema 与元数据同步检查、自定义 Jest 运行器、包消费者测试、覆盖率扩展以及模块边界测试。代码检查和 TypeScript 配置已迁移到当前工具链，过时文件已被移除。

### 重大变更

WebSocket 订阅现在默认为 `allDirections`。此前客户端仅通过硬编码的 `recipientId === admAddress` 过滤器传递入站交易；现在默认情况下会同时发出入站和出站交易。如需恢复旧行为，请在 WebSocket 客户端选项中传入 `direction: 'incoming'`。需要 Node.js 22 或更高版本。币种辅助工具必须从明确路径导入（如 `adamant-api/coins/btc`），不再从包根目录导出。已移除 Lisk 和 Klayr 支持。交易查询过滤器现在默认使用逻辑 `and`，金额过滤器仅适用于转账交易。建议使用者检查已弃用的 `withoutDirectTransfers` 用法，并迁移到 `includeDirectTransfers`。

交易字节布局、签名、ID 和签名语义保持不变。打包的 tarball 测试覆盖了 CommonJS 和 ESM 使用者。

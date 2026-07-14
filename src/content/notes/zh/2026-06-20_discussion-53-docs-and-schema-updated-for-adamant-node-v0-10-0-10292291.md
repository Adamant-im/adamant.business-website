---
title: "ADAMANT Node v0.10.0 的文档与 Schema 已更新"
slug: "discussion-53-docs-and-schema-updated-for-adamant-node-v0-10-0-10292291"
description: "随着 ADAMANT Node v0.10.0 发布，面向开发者的堆栈也同步更新，包括 API 规范、文档、本地网络和重启的测试网。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/53"
publishedAt: "2026-06-20T18:25:34Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10292291"
locale: "zh"
placeholder: false
---

随着 **ADAMANT Node v0.10.0** 的发布，面向开发者的堆栈已全面更新，以与节点保持同步：API 规范（`adamant-schema`）和文档（`adamant-docs`）均已升级，并新增了本地网络支持和全新重启的测试网。以下是为所有在 ADAMANT 上进行开发的人员准备的简要摘要。

## adamant-schema（API 规范）

规范已从 **OpenAPI 3.0.3 → 3.2.0** 升级，版本与 `0.10.0` 保持一致，并已根据运行中的节点进行审计。交易现在支持 **`timestampMs`**，在原有的秒级 `timestamp` 基础上提供毫秒级时间戳。节点状态响应更加丰富，新增了 **`nodeTimestampMs`**、**`unixTimestampMs`**，以及一个 **`loader`** 对象，用于暴露 `syncing`、`consensus`、`blocks` 和 `blocksCount` 等信息。

新增 **`GET /peers/get`** 端点，可通过 IP 和端口查询对等节点。新的查询参数 **`returnUnconfirmed`** 和 **`includeDirectTransfers`** 取代了已弃用的 `withoutDirectTransfers`。测试网节点已添加到服务器列表中。

位于 [schema.adamant.im](https://schema.adamant.im) 的交互式 Swagger UI 现在支持实时操作搜索、按节点的健康检查（带 API 版本标签），并可自动选择健康的主网节点。工具链已升级至 Node.js 22、TypeScript 和 Express 5，并为使用者重新生成了类型化的客户端路径。

## adamant-docs（文档）

API 参考文档已更新至 **v0.10.0**，并在侧边栏中添加了版本标签，确保文档与网络始终保持一致。新增页面涵盖 **共识与交易验证**、**同步机制** 以及 **loader / 节点状态** 端点。**`timestampMs`** 的语义已实现端到端文档化，**peers** API 文档也已同步更新。

**run-your-own-node** 指南已扩展，涵盖安装（包括 macOS）、配置、自动启动、引导（bootstrap）和节点恢复。现在还提供了专门用于运行 **localnet** 和加入 **testnet** 的独立页面。

## 本地网络与测试网

**localnet** 允许你在本地部署完整的 ADAMANT 网络，以便在不接触公共基础设施的情况下进行开发和测试。**testnet** 已重启并与 v0.10.0 对齐，使你能够在真实网络条件下验证集成，再部署至主网。这两者共同实现了 **local → testnet → mainnet** 路径的平滑过渡，并提供完整文档支持。

## 相关资源

- API 参考：https://schema.adamant.im
- 文档：https://docs.adamant.im
- 节点源码：https://github.com/Adamant-im/adamant
- API 规范仓库：https://github.com/Adamant-im/adamant-schema
- 文档仓库：https://github.com/Adamant-im/docs
- JS 客户端：https://github.com/Adamant-im/adamant-api-jsclient

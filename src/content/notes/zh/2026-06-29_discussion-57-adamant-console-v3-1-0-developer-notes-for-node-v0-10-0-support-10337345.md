---
title: "ADAMANT Console v3.1.0：支持 Node v0.10.0 的开发者说明"
slug: "discussion-57-adamant-console-v3-1-0-developer-notes-for-node-v0-10-0-support-10337345"
description: "ADAMANT Console v3.1.0 支持 ADAMANT Node v0.10.0，更新了 CLI、JSON-RPC 和本地 JavaScript 集成的开发接口。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/57"
publishedAt: "2026-06-29T08:48:18Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10337345"
locale: "zh"
placeholder: false
---

ADAMANT Console v3.1.0 引入了对 ADAMANT Node v0.10.0 的支持，并更新了 CLI、JSON-RPC 和本地 JavaScript 集成的开发接口。此版本主要面向将 Console 用作本地签名工具、脚本 CLI 或轻量级 JSON-RPC 桥接器的开发者和运维人员。

Console 现在使用 `adamant-api` v3 版本，与 ADAMANT Node v0.10.0 的响应和查询行为保持一致。支持的运行时为 Node.js 22.13.0 或更高版本。CLI、JSON-RPC 和 JavaScript 封装方法已统一为一致的 Console 行为。新增的 `node status` 命令和封装器提供了节点状态支持，而聊天辅助功能已扩展，涵盖聊天室、聊天消息和旧版聊天交易。交易查询现在支持 v0.10 的查询选项（如 `returnUnconfirmed`），而代表（delegate）查询可接受用户名、公钥或 ADAMANT 地址。对于直传聊天过滤器，API 现在优先使用 `includeDirectTransfers`，但为了向后兼容，旧的 `withoutDirectTransfers` 输入仍会被标准化处理。公共封装器现在包含 JSDoc 注释和生成的 API 参考页面，npm 包通过 GitHub Actions OIDC 和 npm Trusted Publishing 发布，具备可验证来源。

要全局安装或更新，请使用 npm：

```sh
npm install -g adamant-console
```

该包导出 `adm` 二进制文件以执行常见操作：

```sh
adm client version
adm node status
adm get transaction 123456789 returnUnconfirmed=1
adm get chats U123456789 includeDirectTransfers=1
```

升级时，通过 JSON-RPC 使用 Console 的服务应审查扩展后的方法接口和响应处理逻辑。依赖交易或聊天响应的代码应针对其所依赖的 v0.10.0 字段进行测试，特别是未确认交易数据、聊天直传包含情况以及 `timestampMs`。对于新的 JavaScript 服务，建议直接使用 `adamant-api` 以获得完整的协议支持，仅在需要 Console 兼容的 CLI/RPC 行为或本地操作脚本时才使用 `adamant-console` 封装器。

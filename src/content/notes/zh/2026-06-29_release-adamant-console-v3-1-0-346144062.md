---
title: "ADAMANT Console v3.1.0"
slug: "release-adamant-console-v3-1-0-346144062"
description: "ADAMANT Console v3.1.0 为 ADAMANT Node v0.10.0 更新控制台，改进 CLI、JSON-RPC、文档和验证工具链。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v3.1.0"
publishedAt: "2026-06-29T08:31:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:346144062"
locale: "zh"
placeholder: false
---

ADAMANT Console v3.1.0 更新了适用于 ADAMANT Node v0.10.0 的控制台，并刷新了 CLI、JSON-RPC、JavaScript 包装器、文档以及验证工具链。此版本通过 `adamant-api` v3 增加了对 ADAMANT Node v0.10.0 响应和查询的支持。同时还引入了节点状态、聊天室/消息、聊天交易、交易 `returnUnconfirmed`、代表节点查询以及直接转账查询处理的更新。已更新软件包元数据和依赖项，并新增了 VitePress 文档站点、自动生成的 TypeDoc API 参考文档，以及在发布时自动部署到 GitHub Pages 的功能。其他改进包括 CLI 帮助示例、扩展的 JSON-RPC 覆盖范围、公开 API 的 JSDoc、美化输出 JSON 的语法高亮，以及对 API 包装器、CLI 帮助行为、配置/客户端元数据、提示历史记录和日志功能的测试覆盖率提升。

可通过以下命令执行验证：
@@CODEBLOCKn@@
### 破坏性变更
现在需要 Node.js 22.13.0 或更高版本才能运行 ADAMANT Console。

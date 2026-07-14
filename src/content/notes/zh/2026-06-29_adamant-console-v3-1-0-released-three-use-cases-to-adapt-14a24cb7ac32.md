---
title: "ADAMANT Console v3.1.0：CLI 和 JSON-RPC 使用场景"
slug: "adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
description: "ADAMANT Console v3.1.0 现已在 GitHub 和 npm 发布。此版本与 ADAMANT Node v0.10.0 保持一致，并优化了 CLI 使用、JSON-RPC 集成和本地 JavaScript 封装的开发体验。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
publishedAt: "2026-06-29T08:58:40.394Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/14a24cb7ac32/001-0-1kktbaowg0a7u8mr.webp"
cardSpan: "full"
originalId: "medium:14a24cb7ac32"
locale: "zh"
placeholder: false
---

ADAMANT Console v3.1.0 现已在 GitHub 和 npm 发布。此版本使 Console 与 ADAMANT Node v0.10.0 保持一致，并优化了 CLI 使用、JSON-RPC 集成以及本地 JavaScript 封装的开发体验。它适用于在脚本、机器人、交易所基础设施、内部工具、监控仪表盘或支付自动化中使用 ADAMANT 的用户。

### 什么是 ADAMANT Console？

ADAMANT Console 是一个用于与 ADAMANT 区块链交互的命令行和 JSON-RPC 工具。它可以检查账户、区块、交易、聊天、代表节点（delegates）和节点状态；发送 ADM 转账和加密消息；作为本地 JSON-RPC 桥接服务，供任何语言编写的服务调用；并在本地签名交易，确保助记词（passphrases）永远不会发送到 ADAMANT 节点。最后这一点至关重要：Console 的设计基于本地签名。您的应用程序在本地准备操作，Console 在本地完成签名，仅将已签名的交易提交至网络。

### v3.1.0 版本更新内容

本次发布的主要目标是与 ADAMANT Node v0.10.0 兼容。主要变更包括：支持节点更新后的响应和查询行为，升级至 `adamant-api` v3，新增 `node status` 支持，扩展聊天和交易辅助功能，交易查询支持 `returnUnconfirmed`，支持通过用户名、公钥或 ADAMANT 地址查找代表节点，更新直接转账过滤器 `includeDirectTransfers`，改进 CLI 帮助示例，扩展 JSON-RPC 方法覆盖范围，生成包含新 Console 文档网站的 API 参考文档，以及通过可信发布（Trusted Publishing）发布带有来源证明的 npm 包。当前支持的运行环境为 Node.js 22.13.0 或更高版本。

安装或更新：

```bash
npm install -g adamant-console
```

然后检查本地配置：

```bash
adm client version
adm node status
```

### 使用场景：用于团队工作流的加密操作机器人

对于依赖 ADM 支付或节点可用性的服务团队，可以将 ADAMANT Console 用作机器人背后的轻量本地桥接工具。Telegram、Discord 或 Slack 机器人可调用 Console 命令或 JSON-RPC 方法，查询节点健康状况、交易状态、钱包余额以及未确认的入账支付。

示例 CLI 检查命令：

```bash
adm node status
adm get address U123456789
adm get transaction 123456789 returnUnconfirmed=1
adm get transactions recipientId=U123456789,limit=10
```

这对支持团队、监控频道、财务操作和内部事件响应非常有用。机器人无需详细了解 ADAMANT 协议；它只需调用 Console，解析 JSON 输出，并向用户呈现清晰的状态信息。

### 使用场景：基于 ADM 的应用授权或访问控制

另一个实用场景是轻量级授权机制。一个自托管的应用、交易工具、分析仪表盘或自动化服务，可以在用户向指定支付地址发送 ADM 后解锁高级功能。后端为用户分配一个存款地址，监控入账交易，确认支付金额和交易状态，自动激活访问权限，并可选择发送一条加密的 ADAMANT 消息作为收据。

服务可以这样查询交易：

```bash
adm get transactions recipientId=U123456789,limit=20,returnUnconfirmed=1
```

或发送确认消息：

```bash
adm send message U123456789 "Your subscription is active"
```

对于大型应用，相同流程可通过 JSON-RPC 实现，使主后端可用 PHP、Python、Go、Ruby、Java 或任何能发起 HTTP 请求的语言编写。此时 Console 成为本地 ADAMANT 桥接服务。

### 使用场景：通过 JSON-RPC 实现交易所的快速 ADM 存取款

交易所和托管服务通常需要一个简单、可预测的接口来处理存取款。ADAMANT Console 可作为本地 JSON-RPC 服务器运行：

```bash
adm rpc server
```

默认情况下，它监听配置的 RPC 端口，通常为 `5080`。请仅在受信任的基础设施上运行 JSON-RPC 服务器，并置于防火墙或私有网络之后。如果服务器可访问助记词，请将其视为签名基础设施进行安全管理。

检查节点状态：

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"nodeStatus","params":[],"id":1}'
```

生成存款账户：

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"accountNew","params":[],"id":2}'
```

安全存储生成的凭据。切勿记录助记词或私钥。

监控存款：

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactionsReceivedByAddress","params":["U123456789"],"id":3}'
```

更灵活的交易扫描方式：

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactions","params":["recipientId=U123456789","limit=20","returnUnconfirmed=1"],"id":4}'
```

您的交易所后端可通过地址、交易 ID、金额、时间戳和确认策略来核对存款。

处理取款：

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"sendTokens","params":{"address":"U987654321","amount":"10ADM","passphrase":"your local passphrase"},"id":5}'
```

对于生产系统，助记词应来自安全的本地密钥存储，而非日志、截图、CI 输出或共享的 shell 历史记录。

### 此版本发布的重要性

ADAMANT Console 故意设计得轻量。它并不试图取代完整的 SDK 或自定义后端。相反，它为开发者和运维人员提供了一个实用工具，用于快速脚本、本地签名、机器人集成、交易所自动化、支付检查、运维监控，以及非 JavaScript 技术栈对 JSON-RPC 的访问。随着 v3.1.0 的发布，该工具现已与 ADAMANT Node v0.10.0 及当前 ADAMANT JavaScript API 技术栈保持一致。

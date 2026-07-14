---
title: "ADAMANT v0.10.0：重构的区块链消息开发者接入方案"
slug: "adamant-v0-10-0-we-rebuilt-the-developer-on-ramp-to-blockchain-messaging-68c29cbd6646"
description: "ADAMANT Node v0.10.0 重新设计了开发者体验：全新 API 规范、可快速启动的本地网络、重启的测试网，助力开发者高效构建。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-v0-10-0-we-rebuilt-the-developer-on-ramp-to-blockchain-messaging-68c29cbd6646"
publishedAt: "2026-06-20T16:19:49.523Z"
author: "massivedev0 (Theo Bitner)"
authorUrl: "https://medium.com/@vr.dev0"
sourceAccount: "massive"
coverImage: "/images/engineering-notes/medium/68c29cbd6646/001-1-ujeffbtelp0ew-8wechc8g-png.webp"
cardSpan: "full"
originalId: "medium:68c29cbd6646"
locale: "zh"
placeholder: false
---

去中心化消息只有在开发者真正能够在其上构建应用时才具有意义。伴随 ADAMANT Node **v0.10.0** 的发布，整个开发者体验已全面重构：全新的 API 规范、重写的文档、可在几分钟内启动的本地网络，以及全新重启的测试网。我们的目标是让集成 ADAMANT 区块链消息生态变得快速、可预测且愉悦——无论你正在开发钱包、机器人、通知服务，还是其他全新应用。

### 现代化、交互式 API 规范

API 接口现以清晰的 **OpenAPI 3.2** 规范形式发布，并通过 [schema.adamant.im](https://schema.adamant.im/) 提供交互式 Swagger UI 界面。该规范已与运行中的节点进行端到端审计，因此你所看到的内容即网络实际返回的结果——账户、交易、聊天、代表节点、区块、键值存储及节点接口，全部集中在一个可探索的参考文档中。

开发者可直接在浏览器中尝试请求。规范内置实时服务器选择功能：UI 会自动探测所有公开节点，显示其当前 API 版本，并自动选择一个健康的主网节点，使“尝试”功能开箱即用。你可通过路径、方法、名称或摘要搜索所有操作。由于其真实来源为标准 OpenAPI 文档，你可以直接从中生成类型化客户端（例如 TypeScript）。ADAMANT 自有的 [adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient) 正是基于此方式实现。

### 更深入的节点洞察

v0.10.0 版本中的多个新增字段虽小，但显著提升了使用体验。交易现在包含 `timestampMs` 字段，提供毫秒级时间戳，与原有的秒级 `timestamp` 并存。对于消息顺序至关重要的通信场景，客户端可据此以亚秒级精度对消息和转账进行排序。客户端应优先使用 `timestampMs`，若不存在则回退至 `timestamp * 1000`。

节点状态响应现在公开 `nodeTimestampMs`、`unixTimestampMs`，以及一个 `loader` 对象，用于报告同步进度（`syncing`、`consensus`、`blocks`、`blocksCount`），使运维人员和工具可快速判断节点健康状况与同步状态。新增的 `GET /peers/get` 接口可通过 IP 和端口查询特定对等节点，适用于构建网络监控和连接性工具。得益于新增的 `returnUnconfirmed` 和 `includeDirectTransfers` 参数，聊天和交易查询更加清晰，客户端可精确控制返回内容。这些均为向后兼容的增强：现有集成可继续运行，新集成则获得更丰富的功能支持。

### 可用于实际开发的文档

API 本身只是故事的一半。[docs.adamant.im](https://docs.adamant.im/) 上的文档已全面重写并扩展，并与节点版本打标对齐，确保指南与网络始终保持一致。新增和扩展的内容涵盖共识机制与交易验证——区块如何达成一致、交易有效性的判定标准——以及同步机制和 loader/status 接口，让你能准确理解节点在同步过程中的行为。文档还包括安装指南（含 macOS）、配置、自动启动、引导启动和节点恢复，帮助你顺利运行自己的节点。同时提供 `timestampMs` 语义的完整说明，确保你从第一天起就能正确处理时间。

### 几分钟内启动网络：localnet + testnet

你现在可以在自己的机器上快速搭建一个完整的 ADAMANT 网络，即 **localnet**。你可以在不接触公共基础设施、无需等待繁忙网络确认、也不消耗真实 ADM 的情况下，基于真实区块链进行开发和测试。快速迭代，自由重置。当你准备超越本地开发时，公共 **testnet** 已随 v0.10.0 全新重启——这是一个共享的安全环境，可在主网上线前，基于真实网络条件验证你的集成。从本地 → 测试网 → 主网，现在是一条平滑且文档完备的路径，而非一道难以跨越的悬崖。

### 你可以构建什么

凭借类型化 API、可运行网络和真实文档，多种实际应用场景迅速成为可能。ADAMANT 是一个基于自身区块链的完全去中心化、端到端加密的通信工具，因此钱包和通信应用可在同一协议下发送加密消息和价值。通知与告警服务可将链上事件（如支付、消息）推送到你自己的应用中。交易与交易所集成可通过毫秒级精确排序，实现程序化账户、余额和转账管理。机器人与自动化工具——聊天机器人、支付机器人、监控机器人——均可通过此 API 实现，而 ADAMANT 生态已包含交易机器人等更多应用。机器对机器（M2M）与物联网（IoT）通信获得了一条抗审查、匿名的通信通道，设备可在此协调并相互支付。在无需中心服务器的场景中，可实现真正匿名且无服务器的通信，避免中心服务器被传唤、泄露或关闭的风险。

由于消息与支付共享同一协议，许多上述场景可融合实现：一个能聊天的钱包、一个会付款的机器人、一个既能通信又能结算的设备——全部运行在同一基础设施上。

### 参考资料

- **API 参考：** [schema.adamant.im](https://schema.adamant.im/)
- **文档：** [docs.adamant.im](https://docs.adamant.im/)
- **节点源码：** [github.com/Adamant-im/adamant](https://github.com/Adamant-im/adamant)
- **JS 客户端：** [github.com/Adamant-im/adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient)

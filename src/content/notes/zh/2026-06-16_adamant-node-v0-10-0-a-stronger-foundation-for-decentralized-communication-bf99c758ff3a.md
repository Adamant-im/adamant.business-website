---
title: "ADAMANT Node v0.10.0：去中心化通信的更坚实基础"
slug: "adamant-node-v0-10-0-a-stronger-foundation-for-decentralized-communication-bf99c758ff3a"
description: "ADAMANT 网络由社区运营的节点驱动，v0.10.0 版本提升了性能、调试性和与现代客户端的兼容性。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v0-10-0-a-stronger-foundation-for-decentralized-communication-bf99c758ff3a"
publishedAt: "2026-06-16T11:50:08.717Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/bf99c758ff3a/001-1-a8dezfm7vyio0a-74gwt6q-png.webp"
cardSpan: "full"
originalId: "medium:bf99c758ff3a"
locale: "zh"
placeholder: false
---

ADAMANT 网络运行在社区运营的节点上——这些独立服务器负责转发加密消息、为信使应用提供 API，并确保区块链的诚实性。ADAMANT Node v0.10.0 是一次重大升级，使该基础设施运行更快、更易于调试，并更好地适配现代 ADAMANT 客户端的实际工作方式。ADAMANT 并不追求表面的吞吐量数字；它正在构建一个去中心化的通信信任层，供信使、钱包和通信分叉使用，而无需向中心化运营商牺牲隐私。

### 更适合真实信使的 API

客户端需要精确的交易排序、毫秒级时间戳，并能在聊天消息仍在网络中传播时显示未确认消息。v0.10.0 提供了 `timestampMs`，以支持亚秒级交易排序，同时不破坏现有的 `timestamp` 字段。列表接口现在接受 `?returnUnconfirmed=1` 参数，以便在适当时包含内存池中的交易。新的 `includeDirectTransfers` 参数取代了旧有的 `withoutDirectTransfers` 行为，使聊天过滤更清晰。`count` 字段现在以数字而非字符串形式返回，简化了客户端在所有列表接口中的解析逻辑。

### 更快、更具弹性的网络

节点现在不仅可以使用 HTTP，还可以在对等节点间维持 WebSocket 连接。这减少了区块和交易传播的延迟，并为节点运营者提供了更多参与网络拓扑的灵活性。结合改进的同步逻辑和重写的交易池，节点在高负载网络条件下表现更稳定、更可预测。

### 尊重您时间的运营工具

运行节点不应要求您深入了解遗留的 JavaScript。v0.10.0 提供了面向 Ubuntu/Debian 和 CentOS/RHEL 的现代化安装与修复脚本、供开发者使用的 localnet 辅助工具、支持分阶段上线的配置覆盖功能，以及带轮转的结构化日志，帮助运营者高效诊断问题。本次发布还记录了优雅关闭的最佳实践——对正在运行的节点强制执行 `kill -9` 可能会破坏内存中的状态镜像，因此 v0.10.0 在运营文档中明确指出了正确的关闭流程。

### 无戏剧性的安全强化

本次发布将加密模块迁移至 `sodium-native` 绑定，并加强了 P2P 交易准入控制。原本已保护公共 API 的时间戳检查，现在也适用于通过节点八卦（gossip）接收到的交易（[#246](https://github.com/Adamant-im/adamant/pull/246)），在不触及共识重放路径的前提下，消除了一种现实中的交易池污染攻击向量。多阶段的依赖更新减少了 Node.js 生态中已知问题的暴露风险。

### 委托人和节点运营者是否必须升级？

推荐但非强制。v0.10.0 并未为已同步且正常运行的网络引入新的强制共识分叉；基于区块高度的协议行为仍由配置驱动。然而，cryptofoundry 建议委托人和独立节点运营者在条件允许时进行升级。较新的信使和 API 依赖 v0.10.0 的功能，如 `timestampMs`、未确认查询和 WebSocket 传输。安装与日志的改进显著降低了日常运维的复杂度，而安全强化即使在共识规则不变的情况下，也能使整个网络受益。长期停留在旧版本节点上，最终将导致仅能支持旧客户端，并错过社区在本次发布中带来的可靠性提升。

### 技术亮点

运行时现在要求 Node.js ≥ 22.13.0；已停止支持 Node 18。在 API 层面，`timestampMs`、`returnUnconfirmed`、`includeDirectTransfers` 和数值型 `count` 是主要新增功能。P2P 层新增了 WebSocket 节点传输和八卦路径上的时间戳准入检查。运维方面受益于现代化的安装与修复脚本、localnet 辅助工具、实时测试场景和配置覆盖功能。开发者体验改进包括新增 AGENTS.md 文件、扩展的 CONTRIBUTING 指南和结构化日志。已弃用的 HTTP 接口已被移除，docs.adamant.im 现在是官方文档中心。

完整的结构化更新日志和 PR 列表详见 [GitHub Release v0.10.0](https://github.com/Adamant-im/adamant/releases/tag/v0.10.0)。现有运营者应查阅升级说明，升级 Node.js，拉取 v0.10.0 版本并优雅重启。新运营者应使用发布标签中的官方安装脚本。开发者应参考 [CONTRIBUTING.md](https://github.com/Adamant-im/adamant/blob/master/.github/CONTRIBUTING.md) 进行 localnet 和实时场景测试。

ADAMANT 是社区拥有的基础设施。欢迎在 [github.com/Adamant-im/adamant](https://github.com/Adamant-im/adamant) 提出问题、报告问题或贡献代码。

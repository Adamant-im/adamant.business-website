---
title: "ADAMANT Forging Pool v3.1.0：更安全的奖励、更简便的运维、更优的监控"
slug: "forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
description: "ADAMANT Forging Pool v3.1.0 建议所有矿池运营者升级，改进奖励计算与支付可靠性，强化账务逻辑，现代化运行环境，简化日常操作。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
publishedAt: "2026-07-01T18:03:33.378Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:c77f450abf44"
coverImage: "/images/engineering-notes/medium/c77f450abf44/001-5ca73690a5.webp"
locale: "zh"
placeholder: false
---

ADAMANT Forging Pool v3.1.0 是建议所有矿池运营者进行的升级版本。它改进了奖励计算和支付的可靠性，强化了账务逻辑，现代化了运行时环境，并简化了日常运维操作。

### 此版本发布的重要性

一个锻造矿池的核心职责是准确计算投票者奖励并安全支付。v3.1.0 正是聚焦于此。奖励与支付流程经过全面审查和加固，以降低在重试、部分失败以及存储奖励值等边缘情况下的风险。待支付奖励在记账前会被标准化，每位投票者的奖励进度现在也得到更安全的追踪，即使发生崩溃或重试也不会意外重复更新奖励。这使得该版本对重视支付准确性和长期稳定运行的运营者尤为重要。

### v3.1.0 新增功能

本次最大的基础设施变更是迁移到 MongoDB 支持的存储，为矿池运营者提供了更稳健的存储层，用于存储区块、投票者、交易、奖励历史及运营数据。对于现有矿池，v3.1.0 包含了从旧版 LowDB 数据迁移的工具，因此运营者可以在不丢失历史奖励状态的前提下完成升级。

![Forging Pool v3.1.0：更安全的奖励、更简便的运维、更优的监控](/images/engineering-notes/medium/c77f450abf44/002-a7aa0fc331.webp)

本版本还增加了更安全的奖励分发与支付记账机制、重试安全的奖励进度追踪、改进的支付与区块处理日志、用于外部监控的 `/api/health` 端点、可选的委托人密码加密支持、`adm-pool` CLI 命令（用于加密、解锁、锁定和状态查询）、仪表板按地址或名称过滤功能、表格中更清晰的投票者/委托人显示、更新的文档，以及 Node.js 22.13.0+ 的运行时基线。

### 为运营者提供更强的安全性

矿池运营者现在可以使用操作员密码对委托人密码进行加密。这是可选功能，因此现有的明文密码配置仍被支持，但新工作流为运营者提供了更安全的生产路径。启用加密密码后，矿池可处于锁定状态启动。区块同步、仪表板和公共 API 仍可正常使用，而支付和 ADM 通知将在操作员解锁矿池前保持暂停。这意味着服务器在恢复或重启时不会立即暴露支付能力。

### 更简便的运维与监控

新的 `adm-pool` CLI 为运营者提供了对最敏感运行时操作的简单命令：

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```

运营者不再需要手动在配置文件或进程日志中处理每一个敏感状态变更，而是拥有了专用的控制工作流。新增的 `/api/health` 端点为监控工具（如 Zabbix、自定义仪表板或 uptime 检查）提供了无需密钥的状态快照。结合 MongoDB 存储和更清晰的日志，这使得矿池在长期运行中更易于观察、调试和维护。

### 建议升级

强烈建议所有 ADAMANT Forging Pool 运营者升级至 v3.1.0，尤其是那些运行着定期支付奖励的生产矿池的用户。升级前，运营者应备份其配置和奖励历史，检查 MongoDB 设置，在现有数据副本上测试迁移过程，并在迁移后验证支付设置。

发布版本：[https://github.com/Adamant-im/pool/releases/tag/v3.1.0](https://github.com/Adamant-im/pool/releases/tag/v3.1.0)
代码仓库：[https://github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)

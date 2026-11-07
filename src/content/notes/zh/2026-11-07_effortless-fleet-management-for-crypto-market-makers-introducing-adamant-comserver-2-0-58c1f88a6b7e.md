---
title: "ADAMANT ComServer 2.0：面向自托管加密货币做市商的集群化管理方案"
slug: "effortless-fleet-management-for-crypto-market-makers-introducing-adamant-comserver-2-0-58c1f88a6b7e"
description: "随着代币项目和流动性提供商的发展，单一的中心化交易所已难以满足深度订单簿、紧凑点差和健康交易量的需求。ADAMANT ComServer 2.0 引入了集群化管理功能，旨在解决多机器人实例运维的复杂性。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/effortless-fleet-management-for-crypto-market-makers-introducing-adamant-comserver-2-0-58c1f88a6b7e"
publishedAt: "2026-11-07T10:12:13.811Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:58c1f88a6b7e"
coverImage: "/images/engineering-notes/medium/58c1f88a6b7e/001-5aba38788d.webp"
locale: "zh"
placeholder: false
---

随着代币项目和流动性提供商的发展，仅依靠单一中心化交易所已难以维持深度的订单簿、紧凑的点差以及健康的交易量。专业的做市业务通常需要跨交易所部署多个机器人实例。ADAMANT Trade Bot 通信服务器 (ComServer) v2.0.0 旨在解决管理这些机器人集群时的运维痛点，通过统一且经过身份验证的命令中心，取代了繁琐的手动 SSH 会话、日志检查和临时脚本。

## 集群化编排

ComServer 是一个自托管的中继守护进程，通过经过身份验证的 Socket.IO 通道连接各个 ADAMANT 交易机器人。运维人员可以通过单一通信中心管理整个集群，而无需单独与每个机器人进行交互。

若要快速概览所有已连接交易所的余额，只需一条命令即可：

```
/remote balances all
```

ComServer 会将请求路由至每个交易所账户对应的机器人，汇总响应内容，并按交易所和报价币种优先级返回确定性排序的资产摘要。

同步调整策略同样简便。市场波动或重大公告往往要求对所有机器人进行快速参数变更。例如，使用 `/remote make price 1.1 USDT in 5 days -all` 可协调所有机器人向目标价格靠拢；`/remote enable pw 1.00–1.10 USDT -all` 可在所有订单簿中强制执行更紧凑的点差区间；`/remote make volume +25% -all` 则可实现全集群范围内的流动性深度扩展。为了实现精确控制，运维人员还可以通过唯一标识符或明确的部分 ID 来定位特定机器人，而非进行广播。

## 2.0.0 版本更新内容

2.0.0 版本经过了彻底重构，重点关注传输安全性、运维弹性和软件极简主义。

### 传输安全

由于 ComServer 负责中继下单、查询余额等敏感运维指令，传输安全至关重要。传输协议现已升级为 **AES-256-GCM** 认证加密，取代了传统的 AES-256-CTR 模式。每个数据帧均使用临时的 96 位随机数 (nonce) 进行加密，并针对篡改、伪造和比特翻转攻击进行了校验。

通信密钥通过 HKDF 从共享的 `SECRET_KEY` 动态派生，确保了服务器与机器人之间严格的角色分离。附加认证数据 (AAD) 将发送方身份、角色和毫秒级时间戳以加密方式绑定到每个有效载荷中，从而阻止跨机器人帧反射攻击。高吞吐量的分桶式 `ReplayCache` 可追踪容量高达 100,000 帧的一次性随机数；若缓存因遭受攻击达到上限，系统会安全地拒绝新帧而非驱逐旧帧，从而消除了任何重放窗口。客户端身份验证在 Socket.IO 中间件内完成，在建立 Socket 连接之前即会拦截未经授权或格式错误的握手请求。

### 依赖精简

依赖树得到了彻底优化。总包数量从 615 个减少至 141 个，清除了 32 个历史安全公告（包括 2 个严重漏洞和 19 个高危漏洞），将漏洞数量降至零。

### 工程与运维

运行时环境要求 Node.js 22.13+，采用纯原生 ES 模块、依赖注入且无全局状态。当活跃机器人在网络中断后重新连接时，ComServer 会立即清理残留的僵尸 Socket，确保命令不会路由至已断开的连接。待处理命令队列上限设为 1,000 个并发请求，以防止负载过高导致内存耗尽。PM2 生命周期处理通过 `ecosystem.config.cjs` 预先配置，支持优雅的信号处理 (SIGINT, SIGTERM) 和彻底的命令计时器销毁。代码库包含 182 个测试用例，涵盖单元测试、集成测试和进程生命周期阶段，并使用带有 TypeScript 类型检查的 JSDoc。

## 自托管主权

ADAMANT 做市软件和 ComServer 完全运行在运维人员自己的硬件或私有云上。任何交易数据、私钥或运维指令都不会触及第三方服务器。ComServer 在提供机构级交易台统一集群控制能力的同时，保留了开源自托管软件的安全模型：掌握私钥，掌控代币，自主运维基础设施。

ADAMANT ComServer v2.0.0 现已面向 ADAMANT Trade Bot 高级版用户开放。

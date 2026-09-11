---
title: "Currencyinfo 4.2.0：面向加密货币与法币的自托管参考汇率服务"
slug: "currencyinfo-4-2-0-reliable-reference-rates-now-built-for-everyone-953c0ea815f7"
description: "每一个钱包、浏览器、支付服务、会计工具和投资组合应用最终都会面临同一个问题：该资产当前的价值是多少？难点不在于发起 API 调用，而在于如何选择可信来源、标准化不同市场的数据、应对限额与中断、剔除错误数据、保存历史记录并解释价格变动的原因。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/currencyinfo-4-2-0-reliable-reference-rates-now-built-for-everyone-953c0ea815f7"
publishedAt: "2026-09-10T20:41:57.667Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:953c0ea815f7"
coverImage: "/images/engineering-notes/medium/953c0ea815f7/001-b82653a311.webp"
locale: "zh"
placeholder: false
---

每一个钱包、浏览器、支付服务、会计工具和投资组合应用最终都会面临同一个问题：该资产当前的价值是多少？难点不在于发起 API 调用，而在于如何选择可信来源、标准化不同市场的数据、应对限额与中断、剔除错误数据、保存历史记录并解释价格变动的原因。Currencyinfo 正是为解决这些问题而设计。在 4.2.0 版本中，它不再仅仅作为 ADAMANT 的内部组件，而是转型为一个通用的、开源的、自托管的参考汇率服务，旨在为所有构建加密货币和法币数据应用的用户提供支持。

参考汇率不应是一个来自单一提供商的神秘数字，而应是由你所掌控的规则所产生的可观测结果。

## 多源聚合

单源定价在提供商限流、下架市场、更改格式、区域不可用或报告异常值之前都很方便。Currencyinfo 4.2.0 可以交叉验证多达十个独立提供商的数据，并将它们的报价转化为一个可配置的参考汇率。

此版本新增了四个无需密钥的连接器：CoinPaprika、CoinLore、Binance 和 ExchangeRate-API。加上 Currency API，默认配置现在拥有五个无需 API 凭证即可工作的来源。CoinGecko 仍可通过 Demo 密钥使用；CoinMarketCap 和 ExchangeRate.host 支持已认证的配置；MOEX 则提供了另一种专业化选项。CryptoCompare 因兼容性原因被保留，但现已被弃用并默认禁用，因为其新访问权限需要订阅。

不同提供商在资产覆盖范围、更新频率、区域可用性、配额和市场假设方面各不相同。Currencyinfo 将这些差异明确化，并让操作员能够控制这些因素如何影响最终汇率。

## 从报价到可信汇率

数据流水线分为五个阶段。首先，按各自的时间表轮询来源；其次，验证过程会标准化交易对并剔除零值或非有限的交叉汇率；接着，聚合过程会检测偏差、应用分组与权重，并使用 `minSources` 来决定交易对是否有足够的支撑数据以供发布；随后，历史记录会将快照存储在操作员自己的 MongoDB 中；最后，REST API 通过专门的端点提供当前汇率和历史汇率。

![Currencyinfo 4.2.0: Reliable Reference Rates, Now Built for Everyone](/images/engineering-notes/medium/953c0ea815f7/002-5f5d5df734.webp)

简短的描述背后隐藏了多项实用的控制功能。权威来源组可以与回退组分离；权重和合并策略可以定义如何组合提供商数据；确定性的基础货币三角测量可以在无法获取直接报价时推导出交易对；通过 `rateLifetime` 进行的新鲜度处理可以防止陈旧的观测数据被误认为是最新数据。

最重要的是，`minSources` 现在具备了新鲜度感知能力。如果一个已配置的提供商停止提供可用数据，它将不再仅仅因为存在于配置中就被计入。该服务仅在存在足够的*当前*证据时发布，并在证据不足时以可预测的方式降级。韧性并非假装每个提供商都始终健康，而是清楚哪些证据是当前的、哪些是缺失的，并明确系统下一步该做什么。

## 面向操作员的改进

Currencyinfo 4.2.0 还增强了端点背后的核心部分。三个按日期排序的行情索引使得大规模历史查询更加实用。在包含约 2.38 亿条文档的发布验证数据集中，一个典型的交易对与范围查询从 22.8 秒缩短至 8 毫秒。实际结果取决于硬件、数据分布、缓存状态和查询形态，但方向很明确：积累的历史数据现在在运维上更易于使用。

该服务已迁移至 Node.js 22.12 或更高版本，并将平台更新为 NestJS 12、Mongoose 9、Zod 4、TypeScript 6 和 Jest 30。完整的测试套件涵盖了 28 个套件和 266 个测试用例。

容器分发现在作为一流的发布方式。镜像已为 linux/amd64 和 linux/arm64 发布，包含 OCI 元数据、SBOM 和构建来源证明。运行时以非 root 用户身份运行，生产镜像中移除了包管理器，日志使用受限权限，敏感值被屏蔽，且 CI 流水线包含漏洞扫描。

对于新部署，最快捷的路径是使用公共镜像：

```
docker pull ghcr.io/adamant-im/currencyinfo:4.2.0
```

![Currencyinfo 4.2.0: Reliable Reference Rates, Now Built for Everyone](/images/engineering-notes/medium/953c0ea815f7/003-4f3ec4075a.webp)

## 清晰的边界

Currencyinfo 产生的是参考汇率，它不是交易所执行馈送、高频市场数据终端，也不是具有保证 SLA 的托管 API。自托管赋予了你对配置、历史记录、隐私和可用性的控制权；同时也意味着你需要负责监控部署情况，并遵守每个上游提供商的条款、限制和再分发规则。

从 4.1.2 升级需要提前规划。旧的存量配置可能启用了现在需要凭证的提供商，因此操作员在启动 4.2.0 之前应禁用这些来源、添加密钥或采用新的无密钥默认设置。大型现有历史数据库也应带外构建三个新索引：在 NVMe 存储上测量耗时约 17 分钟，在 SATA 上约 50 分钟。存储的文档格式保持兼容，这使得回滚操作非常简单。

需要注意的一项行为修正：历史记录过滤器现在使用记录的 BASE/QUOTE 交易对顺序。之前通过反转交易对来补偿的客户端应移除该变通方案。未知的查询参数现在会返回 HTTP 400 错误，而不是被静默忽略。

ADAMANT 仍然是该项目的使用者，并在生产环境中应用 Currencyinfo，同时继续引领其开发。但该项目并不局限于 ADAMANT。它同样适用于独立的钱包、区块浏览器、支付后端、会计系统或任何希望拥有可检查、可配置且可本地运行的汇率服务的基础设施运营商。

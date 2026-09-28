---
title: "ADAMANT Exchange Bot v3.0.0：ADAMANT Messenger 内的自托管匿名加密货币兑换工具"
slug: "we-just-released-a-new-anonymous-crypto-exchanger-inside-adamant-messenger-101f65fdb01f"
description: "ADAMANT Exchange Bot v3.0.0 将聊天窗口转变为自托管的即时加密货币兑换平台，提供更强的资金安全控制、现代化的运行时环境以及更流畅的操作体验。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/we-just-released-a-new-anonymous-crypto-exchanger-inside-adamant-messenger-101f65fdb01f"
publishedAt: "2026-09-27T13:54:25.207Z"
author: "Alex Web3"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:101f65fdb01f"
coverImage: "/images/engineering-notes/medium/101f65fdb01f/001-91e1d37743.webp"
locale: "zh"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0 将聊天窗口转变为自托管的即时加密货币兑换平台，提供更强的资金安全控制、现代化的运行时环境以及更流畅的操作体验。加密货币兑换不再意味着必须依赖账户、仪表板、浏览器会话或将托管权交给第三方。通过 ADAMANT Exchange Bot，兑换流程直接在 ADAMANT Messenger 内完成：用户在聊天中发送一种资产，指定想要兑换的资产，机器人即可完成报价、验证和支付。

这是对兑换引擎的一次全面现代化升级，重点关注安全性、可靠性以及实际操作中的易用性。

### 该兑换工具的独特之处

大多数兑换产品都始于 Web 端：涉及账户、表单、会话、浏览器指纹识别以及庞大的攻击面。而 ADAMANT Exchange Bot 则运行在聊天窗口中。该产品流程中没有 Web 界面、无需用户注册，也不包含 KYC（了解你的客户）环节。操作员在自己的基础设施上运行机器人，并完全掌控自己的热钱包。

兑换请求直接在聊天中进行，界面简单且直观，操作员能够掌控基础设施和资金，且攻击面较传统的 Web 兑换平台大幅减小。对于重视隐私、简洁性和自托管的社区而言，这种模式具有显著优势。

### v3.0.0 的新特性

在用户端，机器人现在变得更加包容，日常使用也更加实用。新增的 `/cancel` 命令允许用户在机器人等待确认时取消待处理的兑换，并自动退还扣除网络费用后的余额。针对已放弃或中断的兑换流程，处理机制也得到了改进，从而减少了因存款过期而导致用户和操作员陷入僵局的情况。

在操作员端，配置要求更加严格，启动检查更加清晰，系统韧性也得到了增强。机器人会对配置进行更严格的验证，一旦发现无法安全运行的设置，会立即停止。此外，它还通过在多个 RPC 或 REST 端点之间自动故障转移，更稳健地处理节点连接问题。

### 为真实资金而生，而非演示流程

当软件涉及加密货币转移时，“基本能用”是远远不够的。微小的竞态条件或不明确的交易所有权规则都可能导致真实的资金损失。v3.0.0 的很大一部分改进旨在提升资金安全。

此版本引入了更具防御性的存款跟踪和认领模型，包括支持内存池（mempool）监控和争议处理。针对比特币类链的每 UTXO 锁定机制防止了并发支出，而针对发送者的请求序列化则消除了聊天层面上关于兑换和取消请求的竞态条件。对于 Dash，机器人现在支持 InstantSend 处理，能够更快地识别符合条件的转账。针对不支持的币种场景和传输层失败，系统也加入了更明确的保护措施，确保系统以更可控、更易于审查的方式处理异常。

### 现代化的技术基础

v3.0.0 是一次重大的技术更新。项目迁移到了当前的 Node.js 基准，并更新了关键的区块链和基础设施库：Node.js 22.13+、用于以太坊和 ERC-20 处理的 ethers v6、用于比特币、Dash 和狗狗币交易构建并支持 PSBT 的 bitcoinjs-lib v7、MongoDB Driver 7 以及 adamant-api 3.x。代码检查、格式化和测试工具也进行了现代化升级。移除了不再符合项目方向的旧组件，包括对 Lisk 的旧支持。

这一点至关重要，因为长期的加密货币基础设施需要一个开发者能够维护、审计和扩展的基础，而无需背负多年的技术债务。

### 支持的资产与兑换流程

ADAMANT Exchange Bot 支持涉及 ADM、BTC、ETH、DASH、DOGE、USDT、USDC、DAI 以及 ERC-20 代币的兑换。

兑换流程设计得非常直观：用户在 ADAMANT Messenger 中与机器人交互，发送源资产，指定目标资产，机器人处理其余步骤——报价、验证、确认跟踪、支付，或者在无法安全完成时进行退款。这种简洁的表面之下，是由模块化的处理管道支撑的：消息解析、报价生成、深度区块链验证、确认跟踪、支付处理、退款处理以及最终结算检查。

### 更完善的测试与文档

v3.0.0 附带了大幅扩展的自动化测试套件，涵盖了兑换管道、加密货币适配器、配置验证和辅助逻辑。该项目目前在数十个测试套件中拥有数百个单元测试，且在测试运行期间不依赖实时区块链或真实数据库。文档和贡献者指南也已更新，以便操作员和开发者能够更快地理解系统并更安全地进行操作。

发布说明：[https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0](https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0)
ADAMANT Messenger：[https://adamant.im](https://adamant.im)

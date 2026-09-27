---
title: "ADAMANT Exchange Bot v3.0.0"
slug: "release-adamant-exchangebot-v3-0-0-397317563"
description: "ADAMANT Exchange Bot v3.0.0 是一个重要的里程碑版本，全面升级了运行时栈，引入了共识级资金安全保护机制，并大幅提升了测试覆盖率与操作体验。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0"
publishedAt: "2026-09-26T16:47:34Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
repo: "adamant-exchangebot"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-exchangebot:397317563"
locale: "zh"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0 是一个重要的里程碑版本，全面升级了运行时栈，引入了共识级资金安全保护机制，大幅提升了测试覆盖率，并优化了操作员的使用体验。

### 运行时与架构现代化

引擎要求已更新至现代 LTS Node.js 22.13 或更高版本。原有的 `web3-eth` 和 `web3-utils` 依赖项已被替换为用于以太坊及 ERC-20 代币管理的 `ethers` v6。比特币、Dash 和狗狗币的交易构建已升级至使用 PSBT（部分签名比特币交易）的 BitcoinJS-lib 7。数据库查询已通过 MongoDB Driver 7 完成现代化改造，采用了原生的基于 Promise 的异步 API，并移除了旧有的回调函数。节点连接已迁移至 `adamant-api` 3.x，并使用 `AdamantApi` 和 `WebSocketClient`。所有旧版 Lisk (LSK) 模块及配置选项已被彻底移除。项目现已采用 ESLint 9 平面配置、Prettier 3、Jest 30 和 markdownlint 等现代工具链。

### 并发、存款追踪与资金安全

引入了内存池（Mempool）存款监控功能，并设置了五分钟的争议窗口，以防止竞态条件和双重申领攻击。针对 BTC、DASH 和 DOGE 等 UTXO 区块链实现了基于 UTXO 的锁定机制，消除了并发币种支出问题。传入的兑换和取消请求现在按发送者进行序列化，以防止竞态条件。增加了对 Dash InstantSend 交易的自动识别与快速处理路径。引入了 `unsupportedCoinGuard` 安全防护机制，以优雅地处理不支持的代币转账及网络传输故障。

### 聊天命令与操作员体验

新增了 `/cancel` 聊天命令（亦可识别为 `cancel`），允许用户取消等待目标币种确认的待处理兑换，并获得扣除网络费用后的自动退款。当用户在 `inUpdateState` 状态下发送新转账时，之前的存款现在会自动进入退款队列。`formatNumber` 工具已增强，可将指数计数法（`e+` 和 `e-`）转换为人类可读的完整十进制表示。配置和币种注册表中已添加对 Onyxcoin (XCN) ERC-20 代币的支持。

### 配置与节点弹性

在 `configSchema.js` 中实现了纯模式验证，并增加了快速失败的启动检查，以便立即检测无效配置。构建了具备弹性的 `nodeClient.js`，支持在多个 RPC 和 REST 端点之间进行轮询和自动故障转移。针对手续费、确认数限制、每日美元限额及价格区间，增加了精细化的分币种覆盖配置。

### 测试与文档

新增了包含 31 个 Jest 测试套件的综合测试体系，涵盖 690 个单元测试，涉及辅助工具、加密适配器、配置模式验证及兑换模块，且无需依赖外部网络或数据库。操作文档已得到扩展，包括 `AGENTS.md` AI 代理手册、`CONTRIBUTING.md` 以及现代化的 `README.md`。

### 重大变更

最低支持的 Node.js 版本现为 22.13，操作员需升级其运行时环境。旧版 `web3-eth` 和 `web3-utils` 已被 `ethers` v6 取代，这可能会影响依赖先前以太坊库 API 的任何自定义集成。比特币、Dash 和狗狗币的交易构建现使用基于 PSBT 的 BitcoinJS-lib 7，这改变了内部交易构建流程。MongoDB Driver 7 取代了之前的驱动程序，移除了基于回调的查询模式。所有旧版 Lisk (LSK) 模块及配置选项已被完全移除，拥有 LSK 相关配置的操作员需删除这些条目。严格的模式验证现在强制执行快速失败启动，这意味着此前被容忍的无效配置值现在会导致机器人拒绝启动。

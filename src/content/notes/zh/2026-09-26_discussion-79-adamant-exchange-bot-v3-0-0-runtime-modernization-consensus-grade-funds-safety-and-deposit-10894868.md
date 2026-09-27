---
title: "ADAMANT Exchange Bot v3.0.0：运行时现代化与共识级资金安全"
slug: "discussion-79-adamant-exchange-bot-v3-0-0-runtime-modernization-consensus-grade-funds-safety-and-deposit-10894868"
description: "ADAMANT Exchange Bot 是一款自托管软件，用于在端到端加密的 ADAMANT Messenger 聊天中运行即时、匿名的加密货币交易所。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/79"
publishedAt: "2026-09-26T17:12:03Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10894868"
locale: "zh"
placeholder: false
---

ADAMANT Exchange Bot 是一款自托管软件，用于在端到端加密的 ADAMANT Messenger 聊天中运行即时、匿名的加密货币交易所。它在比特币、以太坊、Dash、Dogecoin 和 ADAMANT 上运行热钱包，无需第三方托管人，也无需暴露 Web 界面。3.0.0 版本实现了运行时栈的现代化，将加密和区块链集成迁移至当前库，通过 UTXO 和请求级互斥锁强制执行共识级资金安全不变量，并增加了具有 5 分钟争议窗口的外部存款申诉监控器。安全审计和维护由 cryptofoundry 与 ADAMANT 开发者社区合作处理。

## 栈与架构现代化

代码库现已适配 Node.js 22.13+ LTS，并更新了 `package.json` 中的引擎要求和 `.nvmrc` 约束。以太坊和 ERC-20 的交互已完全用 `ethers` v6 取代了过时的 `web3-eth` 和 `web3-utils`，从而实现了确定性的合约调用、精确的 Gas 估算和可靠的 Nonce 管理。比特币、Dash 和 Dogecoin 的交易构建已通过 `bitcoinjs-lib` 7 迁移至部分签名比特币交易 (PSBT)，移除了已弃用的 `TransactionBuilder`。`payments`、`incomingtxs` 和 `systems` 集合中的 MongoDB 7 查询现在使用原生的基于 Promise 的 async/await，消除了回调模式。Node 客户端集成已升级至使用 `adamant-api` 3.x，并结合了现代密钥派生辅助工具的 `AdamantApi` 和 `WebSocketClient`。对 Lisk (LSK) 的旧版支持已被完全清除，包括 `@liskhq/*` 依赖项、`lsk_utils.js`、`lskBaseCoin.js` 及相关配置选项。开发工具采用了 ESLint 9 平面配置、Prettier 3 和 Jest 30。

## 并发保证与资金安全不变量

无人值守的交易所运营要求具备共识级的财务安全性：费率、手续费、小数位数和余额必须精确，且支付或退款必须严格保持幂等性。

在基于 UTXO 的链上，并发支付或退款曾存在竞态条件风险，即多笔交易可能尝试花费相同的未花费输出。v3.0.0 在 `helpers/mutex.js` 和 `btcBaseCoin.js` 中引入了异步内存互斥锁，在 PSBT 创建和签名期间锁定选定的 UTXO。UTXO 将保持锁定状态，直到网络确认广播。如果交易组装或广播失败，锁定的 UTXO 将安全地释放回可用池，从而在不冒双花风险的情况下防止余额停滞。

来自同一用户的聊天指令、新转账事件和取消请求通过 `incomingTxsParser.js` 中的每个发送者互斥锁进行同步，消除了用户在状态转换期间同时发送转账或触发退款时的竞态条件。每条支付记录在传输到网络之前，都会通过确定性状态（`inProcessing`、`needToSendBack`、`sent`、`refunded`）转换并持久化到 MongoDB。如果机器人在传输过程中重启或失去连接，待处理的支付将进行对账并恢复，且不会发生双花。

## 存款监控与申诉生命周期

外部存款需要将链上交易与 ADAMANT 聊天身份相关联。`modules/depositWatcher.js` 通过每个适配器的 `getPendingIncomingTransactions` 实现监控未确认和传入的交易，无需中心化 Webhook。`modules/depositClaims.js` 在整个生命周期内跟踪存款申诉，以防止对同一链上交易哈希进行重复申诉。强制性的 5 分钟争议窗口可防止区块链重组、竞态攻击和双重申诉攻击，然后再执行支付。`modules/deepExchangeValidator.js` 会根据发送者的 ADAMANT 键值存储 (KVS) 地址记录对存款进行加密验证，并包含缓存和自动重试逻辑。

## 交易所用户体验与聊天指令增强

未指定交易对即发送存款的用户可以在聊天中输入 `/cancel`（或 `cancel`）来取消待处理的交易所，并自动收回存款（扣除网络交易费）。如果存款处于 `inUpdateState` 的用户发送了后续转账而未明确目标货币，机器人现在会将之前的存款排队等待自动退款，而不是直接放弃。`utils.formatNumber` 辅助工具经过重构，在进行数字分组和加粗之前，将科学计数法（`e+` / `e-`）扩展为人类可读的完整十进制字符串，修复了高量级数字或高精度代币上格式错误的空格或指数伪影。增加了对 Onyxcoin (XCN) ERC-20 代币的原生配置和注册支持。

## 配置模式与多节点故障转移

配置文件（`config.jsonc`、`config.default.jsonc`）在启动时会根据 `modules/configSchema.js` 中的声明式模式进行严格验证。缺失的键、`accepted_crypto` 中未知的加密货币或未配置节点的币种将触发立即失败错误。`helpers/cryptos/nodeClient.js` 中的弹性多节点客户端会自动在配置的端点之间轮询并进行 HTTP 和 JSON-RPC 调用故障转移，以处理离线或不同步的区块链节点。运营商可以为网络费 (`exchange_fee_<COIN>`)、所需确认数 (`min_confirmations_<COIN>`)、每日美元交易量限制 (`daily_limit_usd_<COIN>`) 和定价限制 (`fixed_buy_price_usd_<COIN>`、`min_sell_price_usd_<COIN>`) 指定特定于币种的覆盖设置。

## 测试与 AI 操作手册

测试套件包含 31 个 Jest 测试套件和 690 个单元测试，涵盖了核心交易所模块、加密货币适配器、配置模式和实用程序，无需实时节点、MongoDB 或真实的私钥。存储库约定、技术架构、不变量准则和变更纪律规则均已在 `AGENTS.md` 中正式确定。

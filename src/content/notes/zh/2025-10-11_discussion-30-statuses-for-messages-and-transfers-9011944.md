---
title: "ADAMANT 中的消息和转账状态"
slug: "discussion-30-statuses-for-messages-and-transfers-9011944"
description: "ADAMANT 区分消息传递状态和加密货币转账状态。消息在 ADAMANT 区块链内追踪，而转账则在其代币的原生区块链上验证。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/30"
publishedAt: "2025-10-11T18:08:05Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9011944"
locale: "zh"
placeholder: false
---

ADAMANT 区分消息传递状态和加密货币转账状态。消息在 ADAMANT 区块链内进行追踪，而转账则在其对应代币的原生区块链上进行验证。一项核心隐私原则是：ADAMANT 永远不会为消息实现“已读”状态，因为这会泄露接收者的活动信息。

## 消息状态

由于入站消息直接从区块链读取，因此始终被视为已送达，不会显示任何状态。出站消息经历三个阶段：**发送中**（待处理）、**已送达节点**（节点已接受该交易）和**在区块链中**（在区块确认后额外增加的确认状态）。为了保证流畅的用户界面体验，从“发送中”到“已送达”的过渡必须快速完成。状态会在聊天列表和单个聊天窗口中同步更新。

当启用套接字（sockets）时，一旦交易到达节点，套接字会立即返回未确认的交易。此时，`block_timestamp`、`height`、`blockId` 和 `confirmations` 等字段为 `null`。套接字会复制 REST API 的响应——消息通过套接字即时到达，而 REST 每约 10 秒（`SOCKET_ENABLED_TIMEOUT`）提供一次更新，作为可靠性备用机制。ADAMANT 故意不使用“已送达接收方”状态，因为这违背了隐私理念，并且在接收方离线时技术上不可靠。

如果发送到节点失败或区块链拒绝该交易，消息将被标记为**未发送**。

## 加密货币转账状态

对于所有加密货币转账，ADAMANT 会在代币自身的区块链中显示交易状态。这适用于入站和出站转账。工作流程为：`待处理 → 已注册 → 成功 / 失败 / 不一致`。

转账开始时为**待处理**（正在发送或检查中）。一旦节点确认交易存在，状态变为**已注册**。随后 ADAMANT 会继续检查，直到达到最终状态：**成功**（网络已确认）、**失败**（网络已拒绝）或**不一致**（检测到数据不匹配）。每种币种的交易检查规则在 [`adamant-wallets`](https://github.com/Adamant-im/adamant-wallets/#info-for-updating-in-chat-coin-transfer-tx-statuses) 仓库的 `txFetchInfo` 中定义。该规范在 [AIP-12](https://aips.adamant.im/AIPS/aip-12) 中有详细说明。

对于 ADM 转账，状态随交易直接提供：如果 `confirmations > 0`，则标记为成功；如果 `confirmations = 0`，则保持为待处理或已注册。

### 后台状态检查机制

对于非 ADM 区块链，状态检查需要额外的节点或 API 请求。ADAMANT 使用一种后台机制，仅检查用户可见的交易，并在收到最终状态后停止检查。检查频率取决于交易的新旧程度（新交易 vs. 旧交易），系统对“待处理”交易限制检查次数，但对“已注册”交易允许无限次尝试。仅在有网络连接且相关币种节点可用时才执行检查，避免在离线状态下浪费尝试。

如果一笔交易刚从应用广播，或其时间戳在当前时间的 *X* 分钟阈值范围内，则被分类为**新交易**，否则为**旧交易**。该阈值可以是静态常量，也可以按币种计算：

```js
const isNew = (admTransferTimestamp) =>
  Date.now() - admTransferTimestamp < newPendingTxFetchAttempts * newPendingTxFetchInterval;
```

这种区分确保新交易被更频繁地检查，而旧交易则以较低频率验证。

### 示例：比特币转账

来自 `adamant-wallets` 的常量：

```jsonc
"txFetchInfo": {
    "newPendingInterval": 10000,
    "oldPendingInterval": 3000,
    "registeredInterval": 40000,
    "newPendingAttempts": 20,
    "oldPendingAttempts": 3
}
```

对于**新的待处理**交易，应用每 10 秒检查一次（`newPendingInterval`），最多尝试 20 次（`newPendingAttempts`），总时间窗口约为 200 秒。如果节点检测到该交易（即使为 0 确认），状态变为**已注册**。如果所有尝试后仍未被发现，则标记为**失败**。

对于**已注册**的交易，应用每 40 秒检查一次（`registeredInterval`），无限次尝试，直到交易被确认（≥1 确认）或节点返回错误。

用户可以通过点击聊天中的状态图标手动重新检查交易，这会将其重置为待处理并触发新的验证周期。交易状态不会本地存储；当使用密码、PIN 或指纹登录时，状态将从头开始重新检查。

## 不一致检测

当记录在 ADAMANT 消息中的数据与从代币区块链检索到的数据不匹配时，转账将被标记为**不一致**。如果出现以下任一情况，即视为不匹配：金额差异超过 ~0.1–0.5%、发送方地址不同、接收方地址不同，或消息时间戳与区块链交易时间戳相差超过 3 小时。

还有两个特殊情形。如果币种不受支持（例如 `xrp_transaction`），应用无法验证转账，并显示提示信息表明该加密货币不受支持。如果检测到重复的交易哈希——即相同的 TX 哈希已出现在已加载的交易中——则将转账标记为不一致，以防止单笔链上交易在聊天中被多次计数。

不一致原因的优先级如下：错误的交易哈希、重复交易、发送方地址不匹配、接收方地址不匹配、金额错误、无法获取发送方地址、无法获取接收方地址、显著的时间戳差异以及通用检查失败。每种原因在适当时均包含欺诈警告。

## UI 演示

以下截图展示了 ADAMANT PWA 和 iOS 客户端中的转账状态变化过程。

**DASH 聊天内 PWA-dev v4.9.0 — 2025-03-04**

| 确认转账后（约 10 秒） | 聊天中显示为待处理 | 交易详情 — 待处理（约 2 分钟） |
|---|---|---|
| ![Discussion screenshot 1](/images/engineering-notes/github/discussions/9011944/001-61b4f6c1.webp) | ![Discussion screenshot 2](/images/engineering-notes/github/discussions/9011944/002-711b6dcc.webp) | ![Discussion screenshot 3](/images/engineering-notes/github/discussions/9011944/003-6eb732d9.webp) |

| 已确认但无详情（约 5 秒） | 已确认并显示详情 — 最终状态 | |
|---|---|---|
| ![Discussion screenshot 4](/images/engineering-notes/github/discussions/9011944/004-fcf2d419.webp) | ![Discussion screenshot 5](/images/engineering-notes/github/discussions/9011944/005-4e0f54a4.webp) | |

**DASH 聊天内 iOS v3.11.0 — 2025-03-04**

| 确认后（约 3 秒） | 聊天中显示为待处理 | 交易详情 — 待处理（约 2 分钟） |
|---|---|---|
| ![Discussion screenshot 6](/images/engineering-notes/github/discussions/9011944/006-ac6db431.webp) | ![Discussion screenshot 7](/images/engineering-notes/github/discussions/9011944/007-a6e778a1.webp) | ![Discussion screenshot 8](/images/engineering-notes/github/discussions/9011944/008-f5034347.webp) |

| 已确认并显示详情 — 最终状态 | | |
|---|---|---|
| ![Discussion screenshot 9](/images/engineering-notes/github/discussions/9011944/009-b08299f4.webp) | | |

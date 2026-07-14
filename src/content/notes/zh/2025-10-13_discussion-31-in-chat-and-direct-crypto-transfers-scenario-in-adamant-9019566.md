---
title: "在 ADAMANT 中进行聊天内和直接加密货币转账"
slug: "discussion-31-in-chat-and-direct-crypto-transfers-scenario-in-adamant-9019566"
description: "ADAMANT Messenger 支持在聊天中和钱包界面直接进行无缝加密货币转账，所有操作均记录在交易历史中。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/31"
publishedAt: "2025-10-13T05:01:20Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9019566"
locale: "zh"
placeholder: false
---

ADAMANT Messenger 支持在聊天中和钱包界面直接进行无缝加密货币转账，所有操作均记录在交易历史中。

### 聊天内加密货币转账

发送前，应用会通过健康检查验证用户的 ADM 余额、网络连接、ADM 节点可用性以及加密货币节点的可用性。如果任一检查失败，应用将显示错误并允许重试。

交易流程首先在本地生成加密货币交易和 ADM 交易。对于使用 nonce 的链（如 ETH），应用会验证本地存储，确保相同 nonce 的交易尚未成功。对于不使用 nonce 的链（如 BTC、DOGE 或 DASH），它会检查本地存储并查询区块链以确认是否存在待处理交易。如果发现待处理或已成功的重复交易，流程将终止。

接下来，ADM 交易被发送到 ADM 节点。如果被接受，该交易将被添加到聊天中，应用仍停留在发送界面。加密货币交易随后被存储在本地数据库中，并在交易历史中以“待处理”状态显示。应用依赖本地存储的时间戳进行排序，直到实际区块链时间戳可用为止。这种即时显示对于非 ADM 币种转账至关重要，因为币种节点尚未返回数据，但用户需要即时反馈。

随后，加密货币交易被发送到币种节点。任何正向响应都会将交易标记为待处理，用户将被导航至聊天或交易详情界面。如果发送失败，将显示 Snackbar 错误提示，用户可重试，这将生成一个全新的交易。如果用户未重试即返回聊天，失败的交易仍会出现在聊天和历史记录中，因为 ADM 消息已经发送。交易更新将在后台持续进行。

在发送加密货币交易之前先生成 ADM 交易，可确保加密货币转账不会在未记录到聊天中的情况下发出，防止用户在未察觉的情况下花费加密货币并误重复发送。

### 直接加密货币转账（钱包界面）

从钱包界面发起的直接转账与聊天内转账流程相同，但有几处例外：跳过 ADM 余额检查、ADM 节点检查以及 ADM 交易创建。完成后，用户将被重定向至交易历史界面而非聊天界面。

### 交易历史

交易历史结合了本地存储的交易和从区块链节点 API 同步的数据。本地存储的交易即使在应用重启后仍保留，但必须在登出或重新登录时清除，以防止显示其他账户的历史记录。这种组合提供了用户转账的准确且实时的概览。在可能的情况下，应用使用本地计算和检查来生成交易、余额、nonce、重复性及时间戳，以确保响应迅速的用户体验，无需等待网络请求。

![Discussion screenshot 1](/images/engineering-notes/github/discussions/9019566/001-90a49183.webp)

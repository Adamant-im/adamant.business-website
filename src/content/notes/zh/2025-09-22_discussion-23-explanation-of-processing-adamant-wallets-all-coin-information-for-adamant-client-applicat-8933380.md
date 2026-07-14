---
title: "处理 adamant-wallets：ADAMANT 客户端应用的币种与代币信息"
slug: "discussion-23-explanation-of-processing-adamant-wallets-all-coin-information-for-adamant-client-applicat-8933380"
description: "adamant-wallets 仓库整合了所有 ADAMANT 客户端应用的币种和代币信息。客户端负责正确处理这些数据，并为开发者提供统一、便捷的结构。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/23"
publishedAt: "2025-09-22T12:54:29Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8933380"
locale: "zh"
placeholder: false
---

`adamant-wallets` 仓库整合了所有 ADAMANT 客户端应用的币种和代币信息。客户端应用负责正确处理这些数据，并为开发者提供方便、统一的结构。提议的结构并非完美——代币信息从不同文件夹合并而来——但其他方案也有各自的权衡，因此此处不建议进行结构性更改。

## 术语说明

**crypto** 是涵盖币（coins）和代币（tokens）的通用术语。每种 crypto 都有名称（例如 Bitcoin）和代码或符号（例如 BTC）。**币（coin）** 是指存在于自己区块链上的 crypto，例如 `ADM`、`BTC`、`DOGE`、`DASH` 或 `KLY`。**代币（token）** 是指存在于某条区块链之上的 crypto，例如在以太坊或币安智能链上的 `STORJ` 或 `USDT`。

每条区块链都有一种 **主币（main coin）**，它为该链上的所有代币共享通用属性，并用于支付转账手续费。例如，在以太坊上转账 USDT 需要以 `ETH` 支付费用。每条区块链还定义了一种 **代币类型（token type）** —— 以太坊使用 `ERC20`，币安智能链使用 `BEP20`。一个代币可以存在于多条区块链上（**多链代币**）：USDT 既可以是以太坊上的 `ERC20`，也可以是币安智能链上的 `BEP20`。这是同一个代币，具有相同的价值和基本信息，但存储和转账发生在不同的链上。

## 基本结构

每种 crypto 都存在于 `/general` 文件夹中。代币还会额外存在于 `/blockchains` 文件夹中。例如，`/general/USDT/info.json` 存储关于 USDT 的通用信息，而 `/blockchains/ethereum/USDT/info.json` 存储以太坊上 USDT 的特定信息。`/blockchains/{chain}/info.json` 文件存储该链上所有代币共享的链特定信息，并定义主币链接及其基础属性。

### 代币的属性来源

任何区块链上的任何代币都有四个属性来源，按优先级从高到低合并：

1. `/blockchains/ethereum/USDT/info.json` — 特定区块链上的特定代币
2. `/blockchains/ethereum/info.json` — 该区块链上代币的共享信息
3. `/general/ethereum/info.json` — 来自主币区块链的信息
4. `/general/USDT/info.json` — 代币的通用信息

例如，以太坊上的 USDT 会合并所有四个来源，其中来源 (1) 覆盖 (2)，依此类推。

## 在应用中创建币和代币

要创建币，应用会遍历 `/general` 中的所有 crypto，并读取每个 `/general/{crypto}/info.json`。如果 `status` 不是 active，或 `type` 不是 `coin`，则跳过该条目。如果 `createCoin = true`，则创建一个币对象，作为区块链条目显示，且无代币类型——例如 `ADM` 和 `BTC`。

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8933380/001-fafd0ecc.webp)

![Discussion screenshot 2](/images/engineering-notes/github/discussions/8933380/002-cebba626.webp)

要创建代币，应用会遍历 `/blockchains` 中的所有区块链（例如 `ethereum`、`binanceSmartChain`），并读取链级别的 `info.json`。如果其 `status` 不是 active，则跳过该区块链，并记录 `mainCoin`。然后读取 `/general/{mainCoin}/info.json` 获取主币的通用信息。对于该区块链文件夹中的每个代币，读取 `/general/{token}/info.json` —— 如果文件缺失或 `type` 不是 `token`，则跳过 —— 然后读取 `/blockchains/{blockchain}/{token}/info.json`，如果 `status` 不是 active 也跳过。最后，按优先级合并所有四个来源，并创建一个代币对象，显示其代币类型（例如 `ERC20`、`BEP20`）。示例包括 `USDT`、`USDC` 和 `DAI`。

![Discussion screenshot 3](/images/engineering-notes/github/discussions/8933380/003-f4329279.webp)

![Discussion screenshot 4](/images/engineering-notes/github/discussions/8933380/004-a0d74d6b.webp)

## Crypto 的数据对象

解析 `adamant-wallets` 后，应用会持有一个包含所有链上币和代币信息的数据对象。由于属性已经合并，获取数据变得非常直接：

```js
// Inside token-related methods
let property = coinInfo.property

// Outside, referencing by token and chain
let property = coinInfo["USDT"]["ethereum"].property
```

这确保了 ADAMANT 应用能够一致地处理多条区块链和代币。

---
title: "ADAMANT 中的首个稳定币：Stably 推出的 USDS"
slug: "the-first-stablecoin-in-adamant-meet-usds-by-stably-42106aae239"
description: "ADAMANT 钱包集成代币后，稳定币的需求显而易见。稳定币可保值，适用于日常区块链资产交易及商品和服务支付。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/the-first-stablecoin-in-adamant-meet-usds-by-stably-42106aae239"
publishedAt: "2019-08-02T11:09:24.464Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/42106aae239/001-0-wizmb-2p-jaeiioj.webp"
cardSpan: "full"
originalId: "medium:42106aae239"
locale: "zh"
placeholder: false
---

将代币集成到 ADAMANT 后，明显看出钱包中需要一种稳定币。稳定币能够保持价值稳定，适用于日常区块链资产交易以及支付商品和服务。在评估了多个选项后，ADAMANT 选择了 StableUSD（USDS）作为其首个稳定币。

### 关于 StableUSD

USDS 由加拿大公司 Stably Blockchain Labs, Inc. 发行。每个 USDS 代币都由储备中的 1 美元一对一支持，因此其价值与美元挂钩。StableUSD 在 Bittrex 和 Binance 上交易，并作为 Binance DEX 上的主要稳定币。该代币存在于两个网络上：以太坊（USDS）和币安链（USDSB）。ADAMANT 集成了以太坊版本的 USDS。

选择 Stably 团队的部分原因在于他们对新技术持开放态度，并愿意合作，这与一些较成熟的稳定币发行方形成了对比——后者不太愿意参与合作。双方的合作路线图将首先实现 USDS 在钱包中的存储和聊天内转账，随后将其集成到 ADAMANT 内部服务中，例如内置的加密货币交易所。

### Messenger 中的 USDS

Web 应用用户可直接在 ADAMANT 中使用 USDS 钱包。用户可以在聊天中向联系人转账 USDS，并将其用于支付。

![ADAMANT 中的 USDS 钱包](/images/engineering-notes/medium/42106aae239/002-1-ykzho7rrajzcrnwtdkn40w-png.webp)

发送 USDS 的费用以以太坊网络的燃料代币 Ether（ETH）支付。这种方法使钱包能够准确计算要发送的 USDS 数量，并简化了用户的手续费计算。

![在 ADAMANT 中发送 USDS](/images/engineering-notes/medium/42106aae239/003-0-ovcrx5nnfyucgphs.webp)

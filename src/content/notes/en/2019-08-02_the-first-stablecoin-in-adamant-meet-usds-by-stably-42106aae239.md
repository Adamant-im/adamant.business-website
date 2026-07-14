---
title: "The First Stablecoin in ADAMANT: USDS by Stably"
slug: "the-first-stablecoin-in-adamant-meet-usds-by-stably-42106aae239"
description: "Integrating tokens into ADAMANT made clear that a stablecoin was needed in the wallet. Stablecoins preserve value and are useful for daily trading of blockchain assets as well a…"
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
locale: "en"
placeholder: false
---

Integrating tokens into ADAMANT made clear that a stablecoin was needed in the wallet. Stablecoins preserve value and are useful for daily trading of blockchain assets as well as paying for goods and services. ADAMANT selected StableUSD (USDS) as its first stablecoin after evaluating several options.

### About StableUSD

USDS is issued by Stably Blockchain Labs, Inc., a Canadian company. Each USDS token is backed one-to-one by a US dollar held in reserve, so its value tracks the US dollar. StableUSD trades on Bittrex and Binance and serves as the primary stablecoin on Binance DEX. The coin exists on two networks: Ethereum (USDS) and Binance Chain (USDSB). ADAMANT integrated the Ethereum version.

The Stably team was chosen in part for their openness to new technologies and willingness to collaborate, in contrast to more established stablecoin issuers that were reluctant to engage. The cooperation roadmap begins with wallet storage and in-chat transfers of USDS, followed by integration into internal ADAMANT services such as the built-in cryptocurrency exchangers.

### USDS in the Messenger

Web app users have access to a USDS wallet directly within ADAMANT. Users can transfer USDS in chats to contacts and use it for payments.

![USDS wallet in ADAMANT](/images/engineering-notes/medium/42106aae239/002-1-ykzho7rrajzcrnwtdkn40w-png.webp)

The fee for sending USDS is paid in Ether (ETH), the gas token of the Ethereum network. This approach lets the wallet accurately determine the amount of USDS to send and simplifies fee calculations for the user.

![Sending USDS in ADAMANT](/images/engineering-notes/medium/42106aae239/003-0-ovcrx5nnfyucgphs.webp)

---
title: "In-chat transfers for Binance Coin now supported in ADAMANT"
slug: "in-chat-transfers-for-binance-coin-is-now-supported-3b494b812e62"
description: "ADAMANT is a decentralized messaging platform with integrated cryptocurrency transfer functionality, not merely a messenger. Following the completion of in chat Ethereum transfe…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/in-chat-transfers-for-binance-coin-is-now-supported-3b494b812e62"
publishedAt: "2018-09-20T07:18:50.354Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3b494b812e62/001-0-n7sxgkakooow6ma9.webp"
cardSpan: "full"
originalId: "medium:3b494b812e62"
locale: "en"
placeholder: false
---

ADAMANT is a decentralized messaging platform with integrated cryptocurrency transfer functionality, not merely a messenger. Following the completion of in-chat Ethereum transfers earlier in the year, the platform now supports in-chat Binance Coin (BNB) transfers as well.

Binance Coin is a token launched by Binance, the world's largest cryptocurrency exchange, and can be used to obtain privileges on that platform. Supporting BNB serves as a starting point toward broader ERC20 token integration within ADAMANT. The choice of Binance Coin was also informed by the fact that the ADM token is in the process of being listed on exchanges, and this integration helps the team better understand exchange mechanics.

![In-chat transfers for Binance Coin is now supported](/images/engineering-notes/medium/3b494b812e62/002-1-lw2mpy0kvqgsvgs68oubog-png.webp)

### How in-chat BNB transfers work

To send BNB in-chat, you first need to top up your BNB wallet within ADAMANT Messenger. This can be done by transferring BNB from any other wallet (such as MyEtherWallet) or from an exchange like Binance. Your Binance Coin wallet address is available on the "Wallet" tab, where you can copy it by tapping the copy icon.

![In-chat transfers for Binance Coin is now supported](/images/engineering-notes/medium/3b494b812e62/003-1-cktw266pvgmcz6vcdip4g-png.webp)

To make a transfer, open a chat with the intended recipient, click the plus sign to the left of the message input field, choose "Send BNB," enter the amount, and confirm the transaction.

An important technical note: because BNB is an ERC20 token, transfers require Ether to pay network fees. You must hold some ETH in your ADAMANT wallet to complete BNB transfers.

### Security

Binance Coin support is implemented with the same security principles as Ethereum support. Only the user owns their wallets within their ADAMANT account — the platform does not custody funds. The team has completed an internal security audit and launched a security contest, with an independent external audit planned as the next step.

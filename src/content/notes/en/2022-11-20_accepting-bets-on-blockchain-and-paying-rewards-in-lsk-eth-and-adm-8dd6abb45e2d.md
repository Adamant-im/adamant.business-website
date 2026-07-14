---
title: "Accepting Bets on Blockchain and Paying Rewards in LSK, ETH, and ADM"
slug: "accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
description: "The ADAMANT Bet Bot is an anonymous, blockchain proven betting application that processes bets and automatically pays rewards. A typical setup involves betting on a cryptocurren…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
publishedAt: "2022-11-20T13:10:11.915Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8dd6abb45e2d/001-0-l0olsfjrwmjzcc-3.webp"
cardSpan: "full"
originalId: "medium:8dd6abb45e2d"
locale: "en"
placeholder: false
---

The ADAMANT Bet Bot is an anonymous, blockchain-proven betting application that processes bets and automatically pays rewards. A typical setup involves betting on a cryptocurrency price such as Bitcoin. With the v2.0 update, the bot now supports bets and payouts in Lisk (LSK) alongside ADM and Ethereum.

The bot accepts bets in cryptocurrency directly from ADAMANT Messenger wallets, with all betting and payment activity proven by blockchain transactions. Users who accurately predict the Bitcoin price—or other cryptocurrency prices—can earn rewards. Because the betting bot is open source, anyone can deploy their own instance to accept bets on the price of any cryptocurrency, not just Bitcoin.

## How to Make a Bet on the Bitcoin Price

To place a bet, you create an anonymous wallet in ADAMANT, top up the balance, and send a bet to the bot. The bot accepts bets on the Bitcoin (BTC) exchange rate. A new round begins every Sunday at 10:00 UTC, with bets for the current round accepted from Sunday through Thursday. Bets placed on Friday or Saturday—within 48 hours of the round's end—are counted toward the next round.

The acceptable prediction error is ±500 USD. For example, if you bet on a rate of $9,500 and the actual rate is $9,900, you still qualify as a winner. The minimum bet is 0.1 USD, and the minimum payout is also 0.1 USD. For full details, send `/help` to the Bet bot in ADAMANT.

To place a bet, top up the cryptocurrency you want to use (ADM, LSK, or ETH), open the Bet bot dialogue in ADAMANT, and send `/rates BTC` to check the current exchange rate. Then send the desired bet amount to the bot with your predicted price in the transaction comment—for instance, sending 250 ADM with "11300" as the comment bets that the Bitcoin rate at the round's end will be $11,300. When the round concludes, the bot reports the actual rate and pays rewards to winners.

![Accepting bets on Blockchain, and paying rewards in LSK, ETH and ADM](/images/engineering-notes/medium/8dd6abb45e2d/002-0-yhlmw4fu3ffrh8-l.webp)

## v2.0.2 Release Notes

The v2.0.2 release adds Lisk support, enables socket connections, updates dependencies, and includes refactoring and bug fixes.

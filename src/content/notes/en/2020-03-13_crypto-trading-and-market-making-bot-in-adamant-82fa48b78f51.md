---
title: "Crypto Trading and Market Making Bot in ADAMANT"
slug: "crypto-trading-and-market-making-bot-in-adamant-82fa48b78f51"
description: "The ADAMANT trading bot supports a range of cryptocurrency exchanges. It can be used for manual or automated trading, with a current emphasis on filling order books and generati…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/crypto-trading-market-making-bot-in-adamant-82fa48b78f51"
publishedAt: "2020-03-13T11:21:13.547Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/82fa48b78f51/001-0-o1ekf2vkjogaqiht.webp"
cardSpan: "full"
originalId: "medium:82fa48b78f51"
locale: "en"
placeholder: false
---

The ADAMANT trading bot supports a range of cryptocurrency exchanges. It can be used for manual or automated trading, with a current emphasis on filling order books and generating trading volume rather than speculative profit.

### Realistic expectations for trading bots

Trading bots are not guaranteed profit generators. The probability of success is roughly even, and anyone claiming a bot will definitely produce profit is not being honest. Companies sell trading bots rather than trading with them because cryptocurrency trading carries significant risk regardless of whether a bot or manual methods are used. The ADAMANT bot's profit-oriented trading features are currently limited; the primary use case is market making.

### Why market making matters

A large share of trading volume on cryptocurrency exchanges is artificial. Small token projects listed on smaller exchanges face zero trading volume because even top coins struggle to attract volume. Without visible volume, users are reluctant to buy and other exchanges refuse listings. Project operators must therefore create trading volume and fill order books themselves, paying exchange fees in the process.

### How the bot works

The trading bot is a persistent server-side program. After installation, you configure the target exchange and trading pair. The bot monitors incoming commands, executes trades according to your configured strategy, and sends notifications for all operations. Commands are issued through ADAMANT Messenger, which means you need two ADM accounts: one for yourself as the administrator and one for the bot.

### Requirements to get started

You need basic familiarity with Linux and Node.js, along with a minimal virtual server from any cloud hosting provider. Running a full ADAMANT node is not required. You must create two ADAMANT accounts: your personal account, whose address goes into the `admin_accounts` config field, and the bot's account, whose `passPhrase` is set in the config. Each message sent to the bot costs 0.001 ADM, and free ADM tokens are available through the ADAMANT bounty program in quantities sufficient for years of use.

On the exchange side, you need API keys for your exchange account, which are created in the exchange's API settings. Fund the trading pair balances on the exchange and ensure the order book for your chosen pair has at least one bid and one ask before launching the bot. Finally, install the bot, adjust the config file, and run it.

### Commands

The bot accepts commands via ADAMANT Messenger. Use `/help` to see available commands, and refer to the full command reference for details.

![Crypto trading & Market making bot in ADAMANT](/images/engineering-notes/medium/82fa48b78f51/002-0-mvxlgzjz2pq3e6dl.webp)

### Setup and source code

The bot is open source with installation instructions available on GitHub. Detailed setup guidance for less experienced users is provided on the project website.

Cryptocurrency trading involves substantial risk. You alone are responsible for your trading decisions. ADAMANT also offers other bots for different use cases.

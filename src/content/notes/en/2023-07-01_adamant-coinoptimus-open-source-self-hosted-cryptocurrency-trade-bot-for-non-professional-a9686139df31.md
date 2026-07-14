---
title: "ADAMANT CoinOptimus: Open-Source Self-Hosted Cryptocurrency Trade Bot"
slug: "adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-a9686139df31"
description: "ADAMANT CoinOptimus is a self hosted cryptocurrency trade bot aimed at non professional traders who want automation without surrendering control of their keys to third party ser…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-traders-a9686139df31"
publishedAt: "2023-07-01T12:39:55.877Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/a9686139df31/001-0-ygfhry-dhfu9rszm.webp"
cardSpan: "full"
originalId: "medium:a9686139df31"
locale: "en"
placeholder: false
---

ADAMANT CoinOptimus is a self-hosted cryptocurrency trade bot aimed at non-professional traders who want automation without surrendering control of their keys to third-party services. Because it runs on your own server, privacy-conscious users retain full custody of exchange API credentials. The bot also suits casual crypto enthusiasts and, thanks to its ladder/grid strategy, project owners or market makers looking to fill order books and improve liquidity.

The bot is built on Node.js and runs continuously on a VPS. You configure the target exchange and trading pair in a `config.jsonc` file, supply exchange API keys (ideally trade-only, no withdrawal rights), and manage the bot by sending slash-prefixed commands through ADAMANT Messenger. Real-time trade notifications can be delivered to ADAMANT Messenger, Slack, and Discord. From its first release, CoinOptimus supports Binance, Bitfinex, P2PB2B, Azbit, and StakeCube.

### Ladder/Grid Strategy

CoinOptimus primarily uses an Optimal Ladder/Grid strategy. The bot places multiple buy and sell orders starting from the spread. When the closest order fills, it places a matching order on the opposite side, following the principle of buying lower than it sells and selling higher than it buys. This approach performs best in volatile markets.

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/002-0-tfo-ftrmwbt1zl7r.webp)

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/003-0-2twg79hid4ph-cia.webp)

### Installation and Configuration

CoinOptimus targets Ubuntu 18–22 and CentOS 8, with dependencies on Node.js v16+ and MongoDB v6+. Installation involves cloning the [GitHub repository](https://github.com/Adamant-im/adamant-coinoptimus) and running `npm install`. Configuration is done via `config.jsonc`, where you specify the bot's ADAMANT passphrase, the admin account address allowed to issue commands, exchange details, and API keys. When updating the source via git, review changes in the default config and reflect them in your `config.jsonc`, then restart the bot.

### Usage via ADAMANT Messenger

The bot uses ADAMANT blockchain accounts identified by public addresses and secured with 12-word passphrases. After installation, you send commands through ADAMANT Messenger. For example, `/buy ADM/USDT amount=200 price=0.005` places a buy order for 200 ADM at 0.005 USDT. To start the Ladder strategy with 6 orders, a 3% price step, and roughly 100 USDT per order, use `/start ld 100 USDT 6 3%`. The full command reference is in the [CoinOptimus Wiki](https://github.com/Adamant-im/adamant-coinoptimus/wiki).

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/004-0-jinplg771dicgjt7.webp)

### Disclaimer

CoinOptimus is not a guaranteed profit machine. Use it at your own risk.

---
title: "CoinOptimus Trading Bot Updated to v2.0.0"
slug: "open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
description: "ADAMANT CoinOptimus, a self hosted cryptocurrency trading bot designed for non professional traders, has been updated to version 2.0.0. The release includes refactoring, bug fix…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-coinoptimus-trading-bot-updated-to-v2-0-0-816935470693"
publishedAt: "2024-04-03T11:29:39.685Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/816935470693/001-1-yi0sr85whds3uma4ith6na-png.webp"
cardSpan: "full"
originalId: "medium:816935470693"
locale: "en"
placeholder: false
---

ADAMANT CoinOptimus, a self-hosted cryptocurrency trading bot designed for non-professional traders, has been updated to version 2.0.0. The release includes refactoring, bug fixes, and five new commands: `/fill`, `/stats`, `/deposit`, `/account`, and `/info`.

### New Commands

The `/fill` command fills an order book with a series of orders in a single step.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/002-0-p-pmlz9g0oqkhlzh.webp)

The `/stats` command shows trading pair statistics including prices, lows, highs, trading volume, the order book's highest bid, lowest ask, spread, and order book liquidity.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/003-1-ghu8f-ht7mxhagdmaqo1ag-png.webp)

The `/deposit` command returns an address to top up an exchange account across different chains.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/004-0-j-uwsyddj1i6k3d7.webp)

The `/account` command shows trading fees and monthly trading volume for the bot's account, where available.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/005-0-vfvn8x-wf1ohwg8a.webp)

The `/info` command displays all available information for a specific coin and chain.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/006-0-n5uqmmhtmdcwjbe3.webp)

### How CoinOptimus Works

CoinOptimus is a Node.js application that runs continuously on a server or VPS. You configure it with an exchange, a trading pair, and API keys from your exchange account. The bot manages trading strategies and places orders based on commands you send via ADAMANT Messenger, responding accordingly.

The bot primarily uses the Optimal Ladder/Grid Trade Strategy, placing multiple buy and sell orders with prices starting from the spread. When the closest order to the spread gets filled, the bot adds a similar order on the opposite side, following the principle of buying lower than it sells and selling higher than it buys. This approach is especially effective in volatile markets.

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/007-0-twtuzn4rmej2q4s8.webp)

![Open-source CoinOptimus trading bot updated to v2.0.0](/images/engineering-notes/medium/816935470693/008-0-ruyx47yeeapvvo4r.webp)

Setup instructions are available in the [repository README](https://github.com/Adamant-im/adamant-coinoptimus#usage-and-installation). CoinOptimus is not a guaranteed profit machine; use it at your own risk.

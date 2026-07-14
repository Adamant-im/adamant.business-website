---
title: "Market-making bot v7.0.0: request caching, new commands, and database configuration"
slug: "new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
description: "The ADAMANT market making bot is a free, open source, self hosted tool for cryptocurrency projects and exchanges. It creates trade volume, maintains spread and liquidity, sets a…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-update-v7-0-0-of-market-making-bot-for-cryptocurrency-projects-122fa85f6829"
publishedAt: "2025-02-23T06:05:24.786Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/122fa85f6829/001-0-eevpacxefsrwodwf.webp"
cardSpan: "full"
originalId: "medium:122fa85f6829"
locale: "en"
placeholder: false
---

The ADAMANT market-making bot is a free, open-source, self-hosted tool for cryptocurrency projects and exchanges. It creates trade volume, maintains spread and liquidity, sets a price range, and builds a live-like dynamic order book. Version 7.0.0 introduces request caching, several new commands, database configuration, and a round of bug fixes and refactoring.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/002-0-vbzoksgzwcabzz-z.webp)

### Request caching

Exchange APIs restrict request rates, and during active market-making the bot can hit `429 Rate limit exceeded` errors. This interrupts trading and, in some cases, may lead the exchange to block the account.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/003-0-sgbs6ithtx73pqm2.webp)

The new caching feature addresses this by combining the results of queries for balances, order books, and open orders within a short interval of roughly one to two seconds. Previously a paid module, caching is now available to all users.

### New commands

The `/help` command now reports basic information about the bot software and its configuration. Several additional commands have been added for inspecting exchange state and managing individual orders:

`/orderbook [pair] [count]` returns current bids and asks from the order book.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/005-0-cu4bhsoehypr6ini.webp)

`/trades [pair] [count]` returns the most recent trades.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/006-0-syt1bu8k15rurvv0.webp)

`/ticker [pair]` provides ticker data in JSON format, similar to `/rates`.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/007-0-uvfrkvq-y40vijsu.webp)

`/order {orderId}` retrieves details for a specific order by ID.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/008-0-m50bnrxoc27z38oc.webp)

`/cancel {orderId}` cancels a specific order by ID and returns its details.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/009-0-um38pjzfvcanrry7.webp)

### Database configuration

You can now set database parameters in the config file, including the database name. This makes it possible to run multiple bot instances on a single server. Trading can consume significant CPU and RAM, so check resource load before running several instances side by side.

To configure the database, edit `config.jsonc` and adjust the `db` parameters:

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/010-0-yfdntcpmwdyzvj8c.webp)

This change is backward compatible; if the config is not updated, the bot uses default database parameters.

### Connector fixes and other improvements

The Azbit and P2B connectors received fixes for `getOrderDetails()`, including workarounds for imperfections in both exchange APIs. The Command, Order book, and Trader modules were refactored, and TypeScript types were added as part of ongoing code-quality work. Dependencies were updated, logging was improved, and several minor bugs were fixed.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/011-0-la8ixtoq1x1d6nbm.webp)

The bot continues to provide informative notifications so operators can monitor trading activity.

![New update v7.0.0 of Market-making bot for cryptocurrency projects](/images/engineering-notes/medium/122fa85f6829/012-0-bb8s0ouz9vefnxus.webp)

The release and full changelog are available on GitHub: [v7.0.0](https://github.com/Adamant-im/adamant-tradebot/releases/tag/v7.0.0).

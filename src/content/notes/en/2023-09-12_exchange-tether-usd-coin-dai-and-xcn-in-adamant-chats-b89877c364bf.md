---
title: "Exchange Tether, USD Coin, DAI and XCN in ADAMANT chats"
slug: "exchange-tether-usd-coin-dai-and-xcn-in-adamant-chats-b89877c364bf"
description: "The ADAMANT Exchanger bot now supports ERC20 tokens alongside its existing cryptocurrency options. In addition to ADM, BTC, DASH, DOGE, ETH, and LSK, users can exchange Tether (…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/exchange-tether-usd-coin-dai-and-xcn-in-adamant-chats-b89877c364bf"
publishedAt: "2023-09-12T11:44:07.868Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b89877c364bf/001-1-vosdpbswphxo57go9nrwxa-png.webp"
cardSpan: "full"
originalId: "medium:b89877c364bf"
locale: "en"
placeholder: false
---

The ADAMANT Exchanger bot now supports ERC20 tokens alongside its existing cryptocurrency options. In addition to ADM, BTC, DASH, DOGE, ETH, and LSK, users can exchange Tether (USDT), USD Coin (USDC), DAI, and Onyxcoin (XCN) directly within ADAMANT chats.

![Exchange Tether, USD Coin, DAI and XCN in ADAMANT chats](/images/engineering-notes/medium/b89877c364bf/002-0-ewiwfv0ogqnfwi-m.webp)

The Exchanger is open source, so anyone can run their own exchange bot instance. The in-chat crypto transfer feature built into ADAMANT apps handles the integration, letting users exchange supported cryptocurrencies without leaving the chat interface.

To use the Exchanger, open a conversation with the bot at ID `U5149447931090026688`, which is already in your chat list. Send `/help` to receive details on transaction procedures and fees. To preview an exchange without committing funds, send a command such as `/test 0.1 ETH to XCN`. Once satisfied with the conditions, proceed with the exchange directly in the chat.

All transactions and communications remain confidential within ADAMANT's privacy model. The addition of new tokens does not alter this commitment.

Release v2.6.0 of the exchange bot adds support for USDT, USDC, DAI, and XCN, along with bug fixes and dependency updates. The source is available on [GitHub](https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v2.6.0).

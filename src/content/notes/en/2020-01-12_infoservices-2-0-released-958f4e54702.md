---
title: "InfoServices 2.0 released"
slug: "infoservices-2-0-released-958f4e54702"
description: "ADAMANT InfoServices has been updated to version 2.0, bringing several new features and stability improvements. The service now collects rates from CryptoCompare and Coingecko f…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/infoservices-2-0-released-958f4e54702"
publishedAt: "2020-01-12T12:25:26.832Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/958f4e54702/001-0-zxv8izxs4xnlu4e.webp"
cardSpan: "full"
originalId: "medium:958f4e54702"
locale: "en"
placeholder: false
---

ADAMANT InfoServices has been updated to version 2.0, bringing several new features and stability improvements. The service now collects rates from CryptoCompare and Coingecko for crypto tickers, while minimizing Coinmarketcap API calls to optimize usage. Reliability is further enhanced with error notifications delivered via ADAMANT and Slack, alongside general operation logging. A new config reader allows for more granular settings within the configuration file. The update encompasses 15 changed files, 462 insertions, and 75 deletions.

As a free and open-source crypto and fiat currency rates provider, ADAMANT InfoServices aggregates data from MOEX, Coinmarketcap, CryptoCompare, and Coingecko. It calculates cross-rates and exposes the information through an API. For crypto developers, self-hosting this service provides a more dependable solution for retrieving quotes compared to relying on third-party endpoints.

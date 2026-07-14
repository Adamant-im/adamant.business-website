---
title: "Arbitrage Feature for Market-Making"
slug: "arbitrage-feature-for-market-making-39e5515a470b"
description: "The ADAMANT Trading and Market making bot now supports an arbitrage feature. Token owners can set up price watching on other exchanges and trade pairs using the /enable pw comma…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/arbitrage-feature-for-market-making-39e5515a470b"
publishedAt: "2021-01-24T16:41:51.417Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/39e5515a470b/001-0-vcyqehma-vfieqdv-png.webp"
cardSpan: "full"
originalId: "medium:39e5515a470b"
locale: "en"
placeholder: false
---

The ADAMANT Trading and Market-making bot now supports an arbitrage feature. Token owners can set up price watching on other exchanges and trade pairs using the `/enable pw` command.

When a market maker trades a token across multiple pairs or exchanges, they can designate a leading trading pair within a numerical range and target the remaining pairs to it. Upon receiving a price range from another trading pair, the bot will either place direct bids and asks under the *strict* policy or estimate real prices under the *smart* policy. For example, based on a given order book, the *strict* policy might yield a 0.0122–0.0128 range, while the *smart* policy yields a wider 0.0114–0.0133 range.

---
title: "ADAMANT Market-making Software Updated to v6.1.0"
slug: "open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
description: "ADAMANT's open source market making application is a self hosted tool for cryptocurrency projects and exchanges designed to create trade volume, maintain spread and liquidity, a…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
publishedAt: "2024-08-17T10:04:57.129Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8b8ed9a261c8/001-0-3n-a6wrdfj1fhgin.webp"
cardSpan: "full"
originalId: "medium:8b8ed9a261c8"
locale: "en"
placeholder: false
---

ADAMANT's open-source market-making application is a self-hosted tool for cryptocurrency projects and exchanges designed to create trade volume, maintain spread and liquidity, and build a dynamic order book. The base version is free, with advanced features available as paid modules. The project recently released version 6.1.0, bringing several functional and stability improvements.

![Open-source Market-making software for cryptocurrency projects updated to v6.1.0](/images/engineering-notes/medium/8b8ed9a261c8/002-0-1vbp44c85yvdelg.webp)

A key update in this release is the enhancement of the Price Watcher module. It now includes a mechanism to verify whether a token's price is current, which helps prevent market-making decisions based on stale data. The codebase has also undergone significant refactoring to improve overall stability, performance, and maintainability as projects scale.

New `dev` and `clear_db` settings have been introduced. The `dev` setting streamlines testing and development, while `clear_db` provides a quick way to clear the database, useful for resetting environments. Dependencies have been updated to ensure compatibility with the latest libraries, improving security and performance.

Additional improvements include minor bug fixes, newly integrated manual tests to verify installations before deployment, and an overhauled README with updated installation and usage guides. The release and changelog are available on the ADAMANT GitHub repository.

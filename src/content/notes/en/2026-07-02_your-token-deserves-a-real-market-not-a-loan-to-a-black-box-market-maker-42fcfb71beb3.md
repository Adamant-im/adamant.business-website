---
title: "Self-Hosted Market Making for CEX-Listed Tokens with ADAMANT v9.0.0"
slug: "your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
description: "After a CEX listing, token issuers often face a thin order book, wide spreads, and a chart that punishes small trades. The conventional fix is to loan tokens and share API keys…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
publishedAt: "2026-07-02T07:55:48.528Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/42fcfb71beb3/001-1-abbad98f8omjn6vedmkhag-png.webp"
cardSpan: "full"
originalId: "medium:42fcfb71beb3"
locale: "en"
placeholder: false
---

After a CEX listing, token issuers often face a thin order book, wide spreads, and a chart that punishes small trades. The conventional fix is to loan tokens and share API keys with a third-party market maker running on opaque infrastructure. ADAMANT Market-Making Software v9.0.0 offers an alternative: a self-hosted, self-controlled market-making stack you install like normal software—no git clone required, no custody handover.

### The model: self-hosted, self-controlled

Traditional market making typically involves sending tokens to a third party, sharing API keys with a black box, and hoping the book looks healthy—and that you can get your assets back. ADAMANT flips this model so that you run the market-making stack on your own server, with your own exchange account and your own keys.

![Your Token Deserves a Real Market — Not a Loan to a Black-Box Market Maker](/images/engineering-notes/medium/42fcfb71beb3/002-1-ej9ccmio-dhslxvzftc6xw-png.webp)

Comparison for Custody MM and ADAMANT's Market-making Software

### What v9 does for your chart

The free open-source edition focuses on the problems that matter right after listing. It builds the order book by filling gaps so the book does not look abandoned, maintains tighter bid/ask spreads to reduce a toxic first impression, and provides depth so small trades do not whip price. It watches price ranges you define and applies volume policies across spread, order book, depth, and optimal modes. Monitoring is transparent—balances, orders, and stats are available via command-based control through ADAMANT Messenger, with no public admin panel exposed by default.

Supported CEX connectors in the OSS build include Azbit, P2PB2B, StakeCube, Coinstore, FameEX, and NonKYC. Premium and custom connector options are available for additional exchanges.

### Getting started (npm path)

You need a Linux server or Mac (or any machine offering npm), Node.js 22+, MongoDB, and a CEX API key for your own account.

![Your Token Deserves a Real Market — Not a Loan to a Black-Box Market Maker](/images/engineering-notes/medium/42fcfb71beb3/003-1-duiackkmcteg8he9ccmqdq-png.webp)

Official npm registry

Install the package globally and create a working directory:

```bash
npm install -g adamant-tradebot
mkdir my-mm && cd my-mm
```

The CLI command is `mm`. Configure the bot with an interactive wizard, then run a health check:

```bash
mm init    # interactive wizard - exchange, pair, API keys
mm doctor  # checks config, MongoDB, exchange API
```

No tokens leave your exchange to fund a market maker. You only connect your API credentials to your bot on your own machine. Start and check status:

```bash
mm on
mm status
```

Send `/balances` to your bot from your ADM admin account and you are live. Stop anytime with `mm off`, and read logs with `mm logs`.

### Docker alternative

You can also pull the published image from GitHub Container Registry:

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

MongoDB runs in Compose alongside the app, with config and logs kept in local volumes you control.

### Why v9 is a milestone

Before v9, getting started meant cloning a repo and wiring dependencies yourself—fine for developers, but friction for founders who just want a healthier book. v9.0.0 ships proper distribution via npm and GHCR, a `mm` CLI with `init`, `on`, `off`, `doctor`, `status`, `logs`, and `config` commands, CI publishing for npm and Docker on every GitHub Release, a refactored engine covering the trader, order book builder, liquidity provider, and price watcher, plus Jest test suites and documentation.

ADAMANT is an open-source crypto project with a decade of public development.

### Who this is for

This software is aimed at token issuers after a CEX listing with a weak or empty book, teams that cannot afford six-figure retainers plus token loans, founders who do not trust handing keys to opaque third parties, and projects that want transparency—the ability to read the code, watch the logs, and own the kill switch. Premium modules exist for advanced strategies, a web UI, additional exchanges, or hands-on setup. The free OSS version is deliberately useful on its own.

### A note on responsibility

Market making must follow exchange rules and applicable law. ADAMANT provides software, not custody or execution on your behalf. You configure it, you run it, and you remain responsible for how it is used.

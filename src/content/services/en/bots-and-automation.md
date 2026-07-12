---
title: Crypto Bots & Automation
description: Self-hosted bots, monitoring, alerting, and execution tools. You keep the keys, strategy, and responsibility.
cta: I want a crypto bot
layoutStyle: accordion
proofLinks:
  - label: adamant-2fa
    url: https://github.com/Adamant-im/adamant-2fa
  - label: adamant-exchangebot
    url: https://github.com/Adamant-im/adamant-exchangebot
---

A bot is a small program with access to money. That framing drives every decision we make: minimal key permissions, boring reliability, and full source code in your hands. We ship the software — you keep the keys, strategy, and responsibility.

## What we automate

- **Notification and alerting bots** — Telegram and ADAMANT bots that watch balances, node health, exchange order state, or on-chain transfers and page a human before a problem becomes a loss
- **Execution helpers** — semi-automated workflows where the bot prepares a transaction or order and a person approves it; useful for treasury operations and OTC settlement
- **Operational dashboards** — a single view over the wallets, nodes, and bots your team already runs, instead of eight browser tabs and a spreadsheet
- **In-chat services** — bots living inside encrypted ADAMANT chat: exchange flows, payouts, support queues, and access control
- **AI-assisted tooling** — LLM-backed summarizers and triage helpers, always behind senior engineering review and never with direct key access

## How we keep bots from becoming incidents

Most bot horror stories come from the same three mistakes: API keys with withdrawal rights, retry loops that double-spend, and silence when something breaks. Our standard practice:

- Exchange keys scoped to the minimum permission set the workflow needs — trade-only or read-only wherever possible
- Idempotent operations and explicit state, so a restart never repeats a transfer
- Rate-limit budgets and circuit breakers around every external API
- Alerting on the bot itself — a bot that stops silently is worse than no bot
- Deployment on your servers, with logs and metrics your team can read

## Case: blockchain-verified 2FA

[adamant-2fa](https://github.com/Adamant-im/adamant-2fa) delivers one-time codes through the ADAMANT messenger instead of SMS. Delivery is verified on-chain and cannot be SIM-swapped. We build similar verification flows for products where email and SMS are not acceptable attack surfaces.

## Case: exchange inside an encrypted chat

[adamant-exchangebot](https://github.com/Adamant-im/adamant-exchangebot) runs a full exchange workflow — quotes, deposits, payouts — inside end-to-end encrypted chat. The same pattern adapts to payouts, faucets, bounty payments, and internal token distribution in your own stack.

## Where the line is

We do not run strategies on your behalf, do not hold your keys, and do not promise trading profits. If a request boils down to "make a bot that prints money," we will say no and explain why — and then propose the automation that actually saves your team engineering hours.

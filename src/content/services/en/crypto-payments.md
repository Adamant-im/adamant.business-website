---
title: Crypto Payments & Licensing
description: Non-custodial crypto payments, subscriptions, license keys, and access automation for SaaS and software products.
cta: Build my crypto payment solution
layoutStyle: cards
proofLinks:
  - label: adamant-payment
    url: https://github.com/Adamant-im/adamant-payment
---

Accepting crypto should not turn your product company into a custody business. We build payment and licensing systems where funds go straight to addresses you control, and the software's job stays narrow: detect payment, verify it, unlock access, keep records.

## Three flows we build most often

**One-time purchase → license key.** A customer pays in ADM, BTC, ETH, or stablecoins; the system watches the address, waits for the confirmation depth you configure, then issues and delivers a signed license key. No processor between you and the funds.

**Subscriptions without stored cards.** Renewal invoices generated per period, grace windows, automatic downgrade on lapse. Crypto has no "charge the card on file" — we design the reminder and renewal flow around that honestly instead of pretending otherwise.

**Access automation.** A payment unlocks a Telegram group, Discord role, ADAMANT chat, API token, or feature flag — and revokes it when the subscription lapses. The dull parts (revocation, partial payments, refund bookkeeping) are where homemade systems break, so that is where we spend the effort.

## What the architecture looks like

- Watch-only address monitoring — the payment server never holds spending keys
- Configurable confirmation depth per chain and per amount
- Signed webhooks into your backend, with replay protection
- Reconciliation reports so accounting can match every payment to an invoice
- Self-hosted deployment: your database, your customer records, your uptime

## Reference platform

[adamant-payment](https://github.com/Adamant-im/adamant-payment) is our crypto-first platform for payments, subscriptions, and software license management. It is the starting point we fork and adapt — your project begins from running code, not a blank repository.

## What to prepare before you start

- The chains and tokens you actually want to accept (fewer is better at launch)
- Where funds should land — cold wallet, multisig, or per-invoice addresses
- What a payment unlocks, and what must happen when it expires
- Your invoicing and record-keeping needs, so reports come out right from day one

We build, deploy, and maintain these systems in production — not slide decks.

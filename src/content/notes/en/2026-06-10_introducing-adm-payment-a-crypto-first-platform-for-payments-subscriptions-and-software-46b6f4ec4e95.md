---
title: "Introducing ADM-Payment: A Crypto-First Platform for Payments, Subscriptions, and Software Licensing"
slug: "introducing-adm-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-46b6f4ec4e95"
description: "Introducing ADM Payment Monetizing software should not require a fragile chain of disconnected services. For many products—especially in Web3, trading, SaaS, automation, and sel…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-a-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-licensing-46b6f4ec4e95"
publishedAt: "2026-06-10T16:33:29.168Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/46b6f4ec4e95/001-1-ikwbquslxdsnxlvmcfgy5a-png.webp"
cardSpan: "full"
originalId: "medium:46b6f4ec4e95"
locale: "en"
placeholder: false
---

### Introducing ADM-Payment

Monetizing software should not require a fragile chain of disconnected services. For many products—especially in Web3, trading, SaaS, automation, and self-hosted infrastructure—the real challenge is not just accepting a payment but managing the full commercial flow: authentication, checkout, billing logic, subscriptions, license delivery, license validation, admin operations, user management, renewals, trials, and product access.

ADAMANT Payment (*ADM-Payment*) is a universal crypto-first self-hosted platform for payments, subscriptions, and software license management. It is currently released as a work in progress with a ready beta version. The platform is designed as an independent product, not tied to ADAMANT Messenger or any single application. The first internal integration target is ADAMANT Tradebot WebUI subscriptions, but the platform is built for a much wider range of products including bots, SaaS platforms, desktop applications, Web3 services, private tools, commercial APIs, and self-hosted software.

### Why It Was Built

Most modern software monetization stacks were designed around traditional fiat payments first. That works for many businesses, but becomes limiting when the product is crypto-native, global, self-hosted, privacy-aware, or sold to users who prefer not to rely on traditional banking rails. A typical setup may require separate services for authentication, payments, subscriptions, and license keys, plus custom scripts for product access, an admin panel built from scratch, and webhooks, callbacks, database glue, and manual support workflows.

ADM-Payment brings these parts together into one coherent platform. A product owner can define plans, accept crypto payments, issue licenses, manage users, and let external software validate access through an API—without rebuilding the entire monetization layer repeatedly.

### Core Modules

The platform combines authentication, billing, crypto payments, trials and paid licenses, subscriptions, promo and manual licenses, a user-facing web portal, an admin dashboard, a license validation API, product branding, internationalization, and operational security features in one self-hostable solution.

Payments are crypto-first by design, not a late add-on. The current scope includes Bitcoin payments through self-hosted BTCPay Server, native ADAMANT payments with unique deposit addresses and on-chain watching, and a development provider for testing flows. The architecture is designed so that additional payment providers (Ethereum, ERC20, stablecoins, and others) and chains can be added later without rewriting the billing core.

![Sign in with Ethereum wallet](/images/engineering-notes/medium/46b6f4ec4e95/002-1-uvvnwb38hzdf94wtr5rkra-png.webp)

![Accepting payments in crypto](/images/engineering-notes/medium/46b6f4ec4e95/003-1-18j1i2bwffpurrfyebeoqg-png.webp)

For users, ADM-Payment provides a clear web interface for sign-in, catalog browsing, checkout, and license management. For product owners, it provides an admin dashboard to manage accounts, licenses, invoices, wallets, plans, and access rights. For external software, it provides API-based license validation, so a bot, SaaS backend, relay, desktop app, or other product can programmatically check whether a user has active access.

### Target Use Cases

ADM-Payment is a monetization layer, not just a payment page. It is especially useful for trading bots and automation tools that need license-based access, subscription plans, per-market or per-exchange restrictions, and private deployments. A trading bot developer can create plans such as Basic, Pro, or Enterprise; users pay in crypto, receive licenses, and the bot validates access through the API. Licenses can be scoped by product-specific parameters such as exchange and trading pair, enabling precise access control beyond a simple paid-or-not-paid model.

For SaaS products with crypto-native users, ADM-Payment provides a way to accept crypto, manage subscriptions, and control access without depending entirely on traditional payment processors. Desktop applications and private tools can use it as a licensing and billing backend by calling the validation API to check whether a license is active. Web3 services benefit from crypto-oriented authentication flows, including ADM and Ethereum wallet sign-in alongside classic email-based login. Self-hosted commercial products can deploy and adapt the platform to their own rules instead of depending on a closed licensing SaaS.

The platform supports trial logic with automatic enrollment while enforcing rules such as one trial per defined scope. It also includes paid, trial, promo, and manual license types, giving operators flexibility without direct database edits. Branding can be configured through environment variables, and the data model uses generic product slugs instead of hardcoded ADAMANT-specific assumptions, making it suitable for white-label deployments across multiple products.

### Technical Architecture

ADM-Payment is built as a modern monorepo using `pnpm` and Turborepo. The v1.0.0 scope includes a Fastify 5 API backend, Prisma ORM, PostgreSQL database, React 18 frontend with Vite, separate user web app and admin app, shared packages for common logic, JWT sessions with refresh cookies, ADM message-code authentication, Ethereum SIWE authentication, email and password authentication, Turnstile captcha, BTCPay Server integration for Bitcoin payments, a native ADAMANT payment provider with unique deposit addresses and on-chain watcher, idempotent webhooks, an admin API key, optional 2FA, IP and fingerprint lockout, audit logging, i18n localization, and GitHub Actions CI for install, Prisma generation, build, lint, and typecheck.

The architecture separates user-facing and admin-facing areas. External products interact with the platform through API endpoints to validate licenses or check subscription status. This API-first approach means ADM-Payment is not only a checkout page but a backend service that other software can rely on.

Security controls are built into the architecture level: separate user and admin areas, protected authentication flows, access control, secure license validation APIs, an admin API key, optional ADM and ETH 2FA, captcha support, IP and fingerprint lockout, and audit logging. Wallet-based authentication lets users authenticate through crypto identity flows instead of being forced into email-only accounts, while email and password login remains available for traditional users.

### Current Status

ADM-Payment is a work in progress with a ready beta version. The foundation is already usable, but the product is still being improved with ongoing flow polishing, documentation expansion, and real integration feedback collection. The current release direction includes the v1.0.0 platform foundation, with the first production integration focused on ADAMANT Tradebot WebUI subscriptions. The roadmap includes more payment providers, more chains, OpenAPI documentation, subscription renewal automation, and third-party product integrations.

### Screenshots

![User interface: Sign in options](/images/engineering-notes/medium/46b6f4ec4e95/004-1-cqwvqqbxknkp-uvuuknxrq-png.webp)

![User interface: Subscription plans](/images/engineering-notes/medium/46b6f4ec4e95/005-1-t37cypcdhaysabgjilzivg-png.webp)

![User interface: Licenses](/images/engineering-notes/medium/46b6f4ec4e95/006-1-3kfx3yvszqtpokjjjvsexa-png.webp)

![Admin dashboard: Accounts](/images/engineering-notes/medium/46b6f4ec4e95/007-1-bp6rl5dl-yi5cq0-elmo1q-png.webp)

![Admin dashboard: Licenses](/images/engineering-notes/medium/46b6f4ec4e95/008-1-wpdhnvtgoltez8bgcjxjyg-png.webp)

![Admin dashboard: Invoices](/images/engineering-notes/medium/46b6f4ec4e95/009-1-o-3ouw6yormfxhtyk3npbw-png.webp)

![Admin dashboard: Manual license issue (option)](/images/engineering-notes/medium/46b6f4ec4e95/010-1-kg3c6muwymo6kftbchh2jg-png.webp)

![Admin dashboard: ADM payments](/images/engineering-notes/medium/46b6f4ec4e95/011-1-ypzmklcvz81nqi7rh7fyrg-png.webp)

![Admin dashboard: BTC payments](/images/engineering-notes/medium/46b6f4ec4e95/012-1-pygj4qnhxawlioosdttx5a-png.webp)

---
title: "ADAMANT Payment v1.0 — Crypto-First Platform for Payments, Subscriptions, and License Management"
slug: "discussion-47-adamant-payment-v1-0-universal-crypto-first-platform-for-payments-subscriptions-and-licens-10234312"
description: "ADAMANT Payment (adamant payment) is a new infrastructure piece for the ADAMANT ecosystem and for any product that needs crypto native monetization without stitching together mu…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/47"
publishedAt: "2026-06-10T14:30:29Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10234312"
locale: "en"
placeholder: false
---

**ADAMANT Payment** (`adamant-payment`) is a new infrastructure piece for the ADAMANT ecosystem and for any product that needs crypto-native monetization without stitching together multiple third-party services. It replaces the legacy `adamant-client-auth` approach with a modern, product-neutral platform: authentication, billing, crypto payments, subscriptions, license management, a user portal, and an admin console in one self-hostable solution.

The first integration target is the ADAMANT Tradebot WebUI subscription (scenario B): users buy a subscription or trial on adamant-payment, receive a scoped license token, and the bot connects outbound to the public WebUI relay. The platform is not tied to Tradebot — it is designed as a standalone product for bots, SaaS, desktop apps, and Web3 services.

## Architecture and Key Strengths

The platform is built for cryptocurrency payments from the start, not as a secondary add-on. It is a natural fit for Web3 projects, trading bots, SaaS products, and software sold to a global audience. Initial payment support includes Bitcoin (via BTCPay Server) and ADM (native, using unique deposit addresses with on-chain watchers), with a dev provider for testing. Webhooks are idempotent, and unique `externalId`/txid values ensure payment correctness — paid licenses are issued or extended on settlement.

Auth, billing, crypto payments, subscriptions, license management, the user portal, and the admin panel are combined in one solution, eliminating the need to glue multiple third-party services together. The platform can automatically issue licenses after payment, manage expiration dates, subscriptions, plans, and product access. External applications validate licenses through the REST API under `/v1/...`, which lets products check license status, subscription validity, and user access programmatically.

Users can sign in with a traditional email account or through cryptographic authentication using an ADM or ETH wallet sign-in (SIWE). This is especially useful for Web3 users, as the platform can operate without mandatory email-based identity. JWT sessions with refresh cookies support browser-based applications.

The solution ships with a user-facing interface and an admin dashboard. Customers manage payments, licenses, and subscriptions; product owners manage users, orders, plans, and access rights. The admin panel supports ADM 2FA and ETH 2FA, Turnstile captcha, IP and fingerprint lockout, and audit logging. In production, the admin panel runs on a separate origin.

`adamant-payment` is not tied to ADAMANT Messenger or any specific application. White-label branding is available via `BRAND_*` environment variables, and the data model uses generic product slugs. Unlike Stripe, Paddle, Lemon Squeezy, or traditional licensing SaaS, it can be adapted to your own rules, crypto payment flows, pricing models, and products. It deploys on your own infrastructure (PostgreSQL, Node.js) with full control over users, payment logic, licenses, and business data. Docker Compose is provided for Postgres, with no mandatory cloud SaaS dependencies.

## v1.0 Scope

The v1.0 release covers the core monetization flow: user registration, payment, access delivery, subscription renewal, administration, and product integration. Authentication supports ADM message code, Ethereum (SIWE), and email plus password. Billing includes a catalog, a 14-day trial (once per exchange and pair globally), paid, promo, and manual licenses, with hot-reload of `config/` for plans and promo codes. The admin panel provides stats, account management, licenses, invoices, and ADM/BTC wallet views, with API key authentication and optional 2FA. Internationalization covers English and Russian at launch, with extensible i18n in `packages/shared`.

The technology stack uses pnpm with Turborepo, Fastify 5, Prisma, PostgreSQL, and React 18 (Vite). CI runs on GitHub Actions covering install, Prisma generate, build, lint, and typecheck.

## Product and Integration Requirements

Product neutrality is a core requirement: no hardcoded Tradebot or ADAMANT branding exists in DB enums; everything is configurable per deployment. License scope is one license per exchange and pair, with trial once per scope globally. Multi-identity auth ensures ADM, ETH, and email coexist. Operator security mandates the admin panel on a separate origin in production, with API key, optional 2FA, captcha, lockout, and audit trail.

For ecosystem integration, the Tradebot WebUI (scenario B) relay validates licenses via the adamant-payment API, with the bot using an outbound connection model. The Tradebot API on branch `refactor/new-webui-api` consumes license validation, and the Tradebot WebUI on branch `refactor/new-stack` provides the public WebUI and relay. New `PaymentProvider` implementations (for example, additional chains) can be added without rewriting the billing core.

## Release Criteria

The v1.0.0 release will be published and tagged as a GitHub Release. CI must be green on `dev` and the release PR to `main`. Documentation covers auth, billing, payments, admin security, branding, database, and BTCPay setup. Smoke tests cover auth flows, trial claim, checkout-to-license, admin panels, and the license validation endpoint.

## Post-v1 Roadmap

Planned work includes subscription renewal automation (BTCPay creates invoices only; renewal logic lives in adamant-payment), additional payment providers and chains, OpenAPI documentation for the public API, and third-party product integrations beyond Tradebot.

Release tracking: [Adamant-im/adamant-payment#1](https://github.com/Adamant-im/adamant-payment/issues/1).

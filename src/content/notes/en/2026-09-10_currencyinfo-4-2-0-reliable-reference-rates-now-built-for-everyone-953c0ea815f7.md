---
title: "Currencyinfo 4.2.0: Self-Hosted Reference Rates for Crypto and Fiat"
slug: "currencyinfo-4-2-0-reliable-reference-rates-now-built-for-everyone-953c0ea815f7"
description: "Every wallet, explorer, payment service, accounting tool, and portfolio app eventually asks the same question: what is this asset worth right now? The difficult part is not maki…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/currencyinfo-4-2-0-reliable-reference-rates-now-built-for-everyone-953c0ea815f7"
publishedAt: "2026-09-10T20:41:57.667Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:953c0ea815f7"
coverImage: "/images/engineering-notes/medium/953c0ea815f7/001-b82653a311.webp"
locale: "en"
placeholder: false
---

Every wallet, explorer, payment service, accounting tool, and portfolio app eventually asks the same question: what is this asset worth right now? The difficult part is not making one API call. It is deciding which source to trust, normalising unlike markets, surviving quotas and outages, rejecting bad data, preserving history, and explaining why the number changed. Currencyinfo is designed to do that work — and with 4.2.0, it is no longer presented as an internal ADAMANT component. It is a universal, open-source, self-hosted reference-rate service for anyone building with crypto and fiat data.

A reference rate should not be a mysterious number borrowed from a single provider. It should be an observable result produced by rules you control.

## Multi-source aggregation

Single-source pricing is convenient until that source throttles requests, drops a market, changes its format, becomes unavailable in your region, or reports an outlier. Currencyinfo 4.2.0 can cross-check up to ten independent providers and turn their quotes into one configurable reference rate.

The release adds four keyless connectors: CoinPaprika, CoinLore, Binance, and ExchangeRate-API. Together with Currency API, the default configuration now has five sources that work without API credentials. CoinGecko remains available with a Demo key; CoinMarketCap and ExchangeRate.host support authenticated setups; MOEX provides another specialised option. CryptoCompare is retained for compatibility but is now deprecated and disabled by default because new access requires a subscription.

Providers differ in asset coverage, update frequency, regional availability, quotas, and market assumptions. Currencyinfo makes those differences explicit, then gives operators the controls to decide how they should affect the final rate.

## From quotes to a defensible rate

The pipeline moves through five stages. Sources are polled on their own schedules. Validation normalises pairs and rejects zero or non-finite cross rates. Aggregation detects divergence, applies groups and weights, and uses `minSources` to decide whether a pair has enough support to publish. History stores snapshots in the operator's own MongoDB. Finally, a REST API exposes current and historical rates through focused endpoints.

![Currencyinfo 4.2.0: Reliable Reference Rates, Now Built for Everyone](/images/engineering-notes/medium/953c0ea815f7/002-5f5d5df734.webp)

That short description hides several useful controls. Authoritative source groups can be separated from fallback groups. Weights and merge strategies can express how providers should be combined. Deterministic base-coin triangulation can derive a pair when a direct quote is unavailable. Freshness handling through `rateLifetime` prevents stale observations from silently looking current.

Most importantly, `minSources` is now freshness-aware. A configured provider that has stopped delivering usable data no longer counts merely because it exists in the configuration. The service publishes when enough *current* evidence exists, and degrades predictably when it does not. Resilience is not pretending every provider is always healthy; it is knowing which evidence is current, which is missing, and what your system should do next.

## Operator-focused improvements

Currencyinfo 4.2.0 also strengthens the parts that sit behind the endpoint. Three date-ordered ticker indexes make history queries more practical at scale. In the release validation dataset of roughly 238 million documents, one representative pair-and-range query improved from 22.8 seconds to 8 milliseconds. Real results depend on hardware, data distribution, cache state, and query shape, but the direction is clear: accumulated history is now far easier to use operationally.

The service has moved to Node.js 22.12 or newer and updates its platform to NestJS 12, Mongoose 9, Zod 4, TypeScript 6, and Jest 30. The completed test suite covers 28 suites and 266 tests.

Container distribution is now a first-class release surface. Images are published for linux/amd64 and linux/arm64 with OCI metadata, an SBOM, and build provenance. The runtime is non-root, package managers are removed from the production image, logs use restrictive permissions, secret-shaped values are redacted, and the CI pipeline includes vulnerability scanning.

For a new deployment, the shortest path is the public image:

```
docker pull ghcr.io/adamant-im/currencyinfo:4.2.0
```

![Currencyinfo 4.2.0: Reliable Reference Rates, Now Built for Everyone](/images/engineering-notes/medium/953c0ea815f7/003-4f3ec4075a.webp)

## Clear boundaries

Currencyinfo produces reference rates. It is not an exchange execution feed, a high-frequency market-data terminal, or a hosted API with a guaranteed SLA. Self-hosting gives you control over configuration, history, privacy, and availability; it also makes you responsible for monitoring your deployment and respecting each upstream provider's terms, limits, and redistribution rules.

Upgrading from 4.1.2 deserves planning. Older stock configurations may enable providers that now require credentials, so operators should disable those sources, add keys, or adopt the new keyless defaults before starting 4.2.0. Large existing history databases should also build the three new indexes out of band: the release measurements took about 17 minutes on NVMe storage and 50 minutes on SATA. Stored document formats remain compatible, which keeps rollback straightforward.

One behavioural correction to note: history filters now use the documented BASE/QUOTE pair order. Clients that previously compensated by reversing pairs should remove that workaround. Unknown query parameters are also rejected with HTTP 400 instead of being silently ignored.

ADAMANT remains visible because it uses Currencyinfo in production and continues to steward its development. But the project is not limited to ADAMANT. It is equally relevant to an independent wallet, a block explorer, a payment backend, an accounting system, or an infrastructure operator who wants a rate service that can be inspected, configured, and run locally.

---
title: "ADAMANT Explorer v2.0.0: Vue 3, hardened API boundaries, and resilient live monitoring"
slug: "discussion-71-adamant-explorer-v2-0-0-vue-3-hardened-api-boundaries-and-resilient-live-monitoring-10539851"
description: "ADAMANT Explorer v2.0.0 is the first stable release since v1.3.0, consolidating 218 commits and 491 changed files into a major frontend, backend, live monitoring, security, and…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/71"
publishedAt: "2026-08-02T13:46:45Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10539851"
locale: "en"
placeholder: false
---

ADAMANT Explorer v2.0.0 is the first stable release since v1.3.0, consolidating 218 commits and 491 changed files into a major frontend, backend, live-monitoring, security, and operations update while preserving existing public routes and deep links.

## Frontend architecture

The legacy AngularJS, Bootstrap 3, and Webpack application has been replaced with Vue 3 single-file components, Pinia for shared network state, Vue Router 5 with URL compatibility, and Vite 8 for builds. Framework-independent utilities live in `src/lib/` and can be tested directly in Node.js.

All main views were rebuilt: home, blocks, transactions, addresses, delegates, Top Accounts, Reserved Wallets, Delegate Monitor, Network Monitor, and Activity Graph. The UI now includes persistent light and dark themes, responsive tables and transaction cards, accessible controls, deterministic transaction ordering, and full-precision ADM presentation where ledger accuracy matters.

## ADAMANT Node and API boundary

All ADAMANT Node interaction now goes through `adamant-api` 3.1.0 in a dedicated request-adapter layer. The backend adds startup-readiness gating, node failover, normalized SDK failures, bounded pagination, strict route/query validation, and separate request, normalization, and response-assembly layers.

The Explorer exposes only 12 same-origin routes required by its UI plus `GET /api/networkHealth`. Sixteen unsupported legacy endpoints, arbitrary transaction-filter passthrough, wildcard CORS, and obsolete Market Watcher routes were removed. This reduced surface is an implementation boundary for the Explorer UI, not a general-purpose public API. External applications should use `adamant-api-jsclient`. Operational monitoring can use `GET /api/networkHealth`, which reports coherent `live`, `degraded`, `critical`, or `unavailable` states.

## Live monitoring and cache consistency

The four public Socket.IO namespaces—Header, Delegate Monitor, Network Monitor, and Activity Graph—now use serialized polling, lifecycle generations, bounded retries, and stale-callback protection. Block-driven refreshes replace fixed freshness delays for open Home and Blocks views. REST hydration and bounded confirmation back compact WebSocket block notifications. Delegate schedule, forging-state, reward, fee, and round-boundary calculations are now stable, with coherent rolling block and peer statistics and optional Redis persistence. Cache identity correctly handles new blocks and same-height fork replacements.

GeoJS peer geo-location is bounded with cached normalization and hostname-only degradation. A validated, cached, timeout-bound, per-IP-limited OpenStreetMap tile proxy supports both clearnet and Tor deployments. Redis remains recommended for response caching and persisted statistics, but Redis failures no longer take down core HTTP or static serving.

## Security and privacy hardening

The public request and browser boundaries now include exact API surface enforcement before cache and ADAMANT readiness work, strict validation for addresses, uint64 identifiers, pagination, routes, methods, and filters, and an in-process fixed-window API limiter with proxy-aware client identity and a fail-closed overflow bucket. Security headers, a constrained Content Security Policy, stable public errors, explicit HTTP timeouts, and query-string-minimized access logs are applied. Network Monitor values from nodes and peers are text-only rendered and validated. Graceful degradation covers Redis, Node, exchange-rate, geo-location, and tile-provider failures.

The repository includes a versioned threat model and security and reliability review. Security was audited by cryptofoundry.

## Runtime and deployment changes

Operators upgrading from v1.3.0 should note that Node.js `^22.18.0 || >=24.11.0` is required, and configured ADAMANT Nodes must run v0.10.2 or newer. A new `config.jsonc` should be prepared from `config.default.jsonc`, paying attention to `nodes_adm`, `trustedProxies`, `redis`, `geoLocation`, `exchangeRates`, and `log_level`. Freegeoip has been replaced by optional GeoJS integration; disabling geo-location retains peer and hostname data without provider-derived map data. Reverse proxies and firewalls must allow the same-origin `/osm-tiles/` path. Generated `public/` assets are not committed and must be built during deployment with `npm run build`. `npm run dev` starts the backend and Vite together; `npm run dev:frontend` starts Vite only.

## Validation

The released source tree passed ESLint and Prettier checks, a production build with 6,337 transformed modules, 226 Node-only unit tests, 41 live ADAMANT Testnet API tests, and full and production-only dependency audits with zero reported vulnerabilities. Browser smoke checks across 13 routes at desktop, tablet, and mobile resolutions produced no console errors or horizontal overflow.

The complete release is available in [GitHub Releases](https://github.com/Adamant-im/adamant-explorer/releases/tag/2.0.0).

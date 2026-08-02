---
title: "ADAMANT Explorer v2.0.0"
slug: "release-adamant-explorer-2-0-0-363589536"
description: "ADAMANT Explorer v2.0.0 is the first stable release since v1.3.0. It modernizes the Explorer frontend, backend, live monitoring, security boundaries, dependencies, tests, and op…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-explorer/releases/tag/2.0.0"
publishedAt: "2026-08-01T17:56:02Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-explorer"
tag: "2.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-explorer:363589536"
locale: "en"
placeholder: false
---

ADAMANT Explorer v2.0.0 is the first stable release since v1.3.0. It modernizes the Explorer frontend, backend, live monitoring, security boundaries, dependencies, tests, and operational documentation while preserving existing public page URLs and deep links.

The frontend has been rebuilt on Vue 3, Pinia, Vue Router 5, and Vite 8, replacing the previous AngularJS, Bootstrap 3, and Webpack stack. All public Explorer pages now feature responsive desktop, tablet, and mobile layouts with persistent light and dark themes, accessible controls, mobile transaction cards, safer tooltips, and improved copy feedback. Contextual transaction semantics have been added for transfers, votes and unvotes, DApp operations, exchange activity, and welcome bonuses.

On the backend, ADAMANT Node access has been rebuilt around `adamant-api` 3.1.0 with readiness gating, failover, bounded pagination, normalized errors, and separated request and handler layers. The 12 same-origin routes required by the Explorer UI are retained, and a new `GET /api/networkHealth` route has been added. Strict route and query validation, deterministic transaction ordering, corrected transfer filtering, top-account pagination, live confirmations, and full-precision ADM formatting are now in place. Redis is optional for core serving while resilient API caching and rolling block and peer statistics are preserved.

Live monitoring has been stabilized across the Header, Delegate Monitor, Network Monitor, and Activity Graph Socket.IO lifecycles with serialized polling and bounded retries. Block-driven page refreshes and bounded REST confirmation for compact WebSocket block notifications have been added. Delegate schedules, forging states, rewards, fees, peer statistics, version ordering, and round-boundary behavior have all been improved. The Freegeoip integration has been replaced with optional GeoJS peer geo-location, and a same-origin, validated, cached, and rate-limited OpenStreetMap tile proxy has been introduced.

Security and reliability improvements include the removal of wildcard CORS and 16 unsupported legacy Explorer API endpoints. Proxy-aware API rate limiting, validated trusted proxies, security headers, a constrained CSP, stable errors, and explicit HTTP timeouts have been added. Request logs are minimized by excluding query strings, and untrusted Node, peer, proxy, Redis, geo-location, and browser-origin data is validated. A repository threat model, security and reliability review, and extensive unit coverage for public boundaries and live-monitor state have been added.

The supported runtime has been updated to Node.js `^22.18.0 || >=24.11.0`. Express, Redis, Socket.IO, Axios, Vue, Vite, Pinia, Vue Router, ESLint, Mocha, Chai, Supertest, and remaining dependencies have been updated. Legacy Grunt, Protractor, Cucumber, Jenkins, Travis, Webpack/Babel, and obsolete Market Watcher and exchange integrations have been removed. 43 Node-only unit-test modules have been added, live Testnet fixtures refreshed, and API, security, scheduling, data-shaping, and frontend utility coverage expanded. The `README.md` has been refreshed with current contributor and AI-agent operating guides.

Validation included passing ESLint, Prettier checks, a production build with 6,337 modules transformed, a unit suite of 226 tests, a live Testnet API suite of 41 tests on the released source tree, a dependency audit reporting 0 vulnerabilities, and browser smoke checks covering 13 routes at desktop, tablet, and mobile resolutions without console errors or horizontal overflow.

### Breaking changes

Node.js must be upgraded to `^22.18.0 || >=24.11.0`. The deployment configuration should be created from the new `config.default.jsonc`, reviewing `nodes_adm`, `trustedProxies`, `redis`, `geoLocation`, `exchangeRates`, and `log_level`. ADAMANT Node v0.10.2 or newer is required, and multiple independently operated HTTPS nodes are preferred. The removed Freegeoip integration should be replaced with the optional GeoJS configuration; disabling geo-location keeps peer and hostname data available without maps or country flags. External consumers of removed Explorer API routes should migrate to `adamant-api-jsclient`, and `GET /api/networkHealth` should be used for operational monitoring. The same-origin `/osm-tiles/` path must be allowed in reverse-proxy and firewall rules. The ignored `public/` bundle should be built during deployment with `npm run build`. For development, use `npm run dev` for the combined backend and Vite stack or `npm run dev:frontend` for Vite only. Existing Explorer page routes and deep links remain compatible, and Redis is recommended but no longer required for core HTTP and static serving.

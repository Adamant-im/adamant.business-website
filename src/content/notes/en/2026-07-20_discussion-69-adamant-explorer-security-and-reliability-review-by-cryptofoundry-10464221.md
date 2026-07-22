---
title: "ADAMANT Explorer security and reliability review"
slug: "discussion-69-adamant-explorer-security-and-reliability-review-by-cryptofoundry-10464221"
description: "ADAMANT Explorer has completed a focused security and reliability review of its public HTTP surface, ADAMANT Node boundary, Redis cache behavior, Socket.IO lifecycle, reverse pr…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/69"
publishedAt: "2026-07-20T20:32:14Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10464221"
locale: "en"
placeholder: false
---

ADAMANT Explorer has completed a focused security and reliability review of its public HTTP surface, ADAMANT Node boundary, Redis cache behavior, Socket.IO lifecycle, reverse-proxy trust, and browser rendering. The hardening was merged in [adamant-explorer#37](https://github.com/Adamant-im/adamant-explorer/pull/37) and closes issues [#23](https://github.com/Adamant-im/adamant-explorer/issues/23), [#25](https://github.com/Adamant-im/adamant-explorer/issues/25), and [#33](https://github.com/Adamant-im/adamant-explorer/issues/33). The review covered Express middleware ordering, public API exposure, validation, rate limiting, reverse-proxy trust, ADAMANT Node responses as an untrusted data boundary, Redis cache correctness and failure behavior, Socket.IO polling and reconnects, browser rendering of Node- and peer-controlled values, optional dependency failures, exchange-rate continuity, operational health reporting, and repository threat modeling.

## Public HTTP and API boundary

Explorer now exposes only the 12 same-origin API routes required by its UI, plus `GET /api/networkHealth`. Sixteen legacy route registrations and wildcard CORS were removed. Requests are checked against an exact API surface before Redis lookup or ADAMANT readiness checks, preventing removed endpoints from being revived through stale cache entries. Public query parameters now use strict validation and bounded pagination. The application applies a proxy-aware, in-process fixed-window limit of 300 API requests per minute per client, with bounded identity storage and a fail-closed overflow bucket. Reverse-proxy trust is explicit and validated. Security headers, a constrained Content Security Policy, stable error responses, HTTP timeouts, and data-minimized request logging further reduce the exposed attack surface.

## Availability and state correctness

`GET /api/networkHealth` reports coherent `live`, `degraded`, `critical`, or `unavailable` states, returning HTTP `503` only when no coherent Node snapshot can be produced. Redis and optional external-service failures no longer take down core HTTP and static serving. Cache identity is block-sensitive where required, and the exchange-rate refresh path preserves usable last-known values while avoiding overlapping refreshes. Socket.IO polling is serialized, lifecycle-aware, and bounded during upstream failures. Generation tracking, explicit timer ownership, and stale-callback suppression prevent disconnected or restarted namespaces from continuing obsolete work.

## Untrusted data and browser safety

ADAMANT Node and peer payloads remain untrusted until normalized or validated. Network Monitor values are rendered as text, while route targets, CSS-derived values, and coordinates are constrained before use. Frontend and backend API paths now share one source of truth to prevent contract drift.

## Compatibility and integration impact

The retained Explorer API is an implementation detail of the web UI, not a general-purpose integration API. External applications should use [adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient) for direct ADAMANT Node integration. Operators can use `GET /api/networkHealth` for Explorer monitoring. Existing frontend routes and deep links remain compatible. Deployments behind a reverse proxy must configure `trustedProxies` to match the actual topology. HTTPS Nodes are preferred; one legacy plaintext HTTP fallback remains for compatibility.

## Scope and follow-up

This was a repository code and architecture audit of Explorer and its runtime trust boundaries, not a cryptographic-protocol or blockchain-consensus audit. The rate limiter is intentionally per process, so multi-replica deployments should also enforce an aggregate limit at the edge. A [repository threat model](https://github.com/Adamant-im/adamant-explorer/blob/dev/adamant-explorer-threat-model.md) and the full [security and reliability review](https://github.com/Adamant-im/adamant-explorer/blob/dev/security_best_practices_report.md) are available. Open follow-up items include [optional peer-IP privacy controls](https://github.com/Adamant-im/adamant-explorer/issues/20), [major frontend dependency upgrades](https://github.com/Adamant-im/adamant-explorer/issues/34), [ADAMANT Node response-schema validation](https://github.com/Adamant-im/adamant-explorer/issues/35), and [outage retry and log coalescing](https://github.com/Adamant-im/adamant-explorer/issues/36).
